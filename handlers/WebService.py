#!/usr/bin/python
#encoding:utf-8
import tornado.web
import traceback
from models.Fijibook_MySQLdb import Fijibook_MySQLdb
from handlers.BaseHandler import BaseHandler
from VerificationCode import VerificationCode
import StringIO
import datetime
import sys
import json

class indexHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        #print 'index'
        user = self.get_current_user()
        print user, 'login at', datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        sys.stdout.flush()
        today = datetime.datetime.now().strftime('%Y-%m-%d')
        time = datetime.datetime.now().strftime('%H:%M:%S')
        time = ' '+time
        recSumRec = Fijibook_MySQLdb().getUserRecSum(user)
        userSumRec = Fijibook_MySQLdb().getUserSum()
        newTimeRec = Fijibook_MySQLdb().getNewestRecTime(user)
        tableRec = Fijibook_MySQLdb().getRecord(user, today)
        expenseTypesRec = Fijibook_MySQLdb().getExpenseTypes(user)
        incomeTypesRec = Fijibook_MySQLdb().getIncomeTypes(user)
        todayIn=Fijibook_MySQLdb().getTodayInSum(user)
        todayOut=Fijibook_MySQLdb().getTodayOutSum(user)
        monthIn=Fijibook_MySQLdb().getMonthInSum(user)
        monthOut=Fijibook_MySQLdb().getMonthOutSum(user)
        # tableRec = Fijibook_MySQLdb().getTable()
        if recSumRec['code'] or userSumRec['code'] or newTimeRec['code'] or expenseTypesRec['code'] or incomeTypesRec['code']:
            self.render('index.html', user=user, recSum=0,
                        userSum=-1, newTime=-1,
                        thead=['时间', '位置', '金额',  '分类', '备注'],today=today, time=time,
                        tbody=[], expensebody=expenseTypesRec['result'], incomebody=incomeTypesRec['result'],
                        todayIn=todayIn['result'][0][0], todayOut=todayOut['result'][0][0], monthIn=monthIn['result'][0][0], monthOut=monthOut['result'][0][0])
            print('Table is empty. Or error getting recSum or userSum or newTime or table. \
            code : [recSum, userSum, newTime, table, types]'
                       + str(recSumRec) + str(userSumRec) + str(newTimeRec) + str(tableRec) + str(expenseTypesRec) + str(incomeTypesRec))
        else:
            try:
                tbody = tableRec['result']
            except KeyError:
                tbody = (('No record. Please add ', ' ', ' ', ' ', ' '), )
            self.render('index.html', user=user, recSum=recSumRec['result'][0][0],
                        userSum=userSumRec['result'][0][0], newTime=newTimeRec['result'][0][0],
                        today=today, time=time,
                        thead=['时间', '位置', '金额',  '分类', '备注'],
                        tbody=tbody,
                        expensebody=expenseTypesRec['result'],
                        incomebody=incomeTypesRec['result'],
                        todayIn=todayIn['result'][0][0], todayOut=todayOut['result'][0][0], monthIn=monthIn['result'][0][0], monthOut=monthOut['result'][0][0])

    @tornado.web.authenticated
    def post(self):
        user = self.get_secure_cookie('user')
        time = self.get_argument('time')
        money = self.get_argument('money')
        location = self.get_argument('inputLocation')
        remark = self.get_argument('remark')
        type = self.get_argument('type')
        moneySel = self.get_argument('moneySel')
        if moneySel == 'expenses':
            money = -float(money)
        lng = self.get_argument('lng')
        lat = self.get_argument('lat')
        rec = Fijibook_MySQLdb().saveBalance(user=user, time=time, money=money, location=location, remark=remark, type=type, lng=lng, lat=lat)
        if rec['code']:
            self.write(rec)
        self.redirect('/index')

class loginHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('login.html', info='')

    def post(self):
        user = self.get_argument('user')
        passwd = self.get_argument('passwd')
        rec = Fijibook_MySQLdb().login(user, passwd)
        #print rec
        if rec['code'] == 0:
            self.set_secure_cookie("user", user)
            #self.set_secure_cookie("passwd", passwd, expires_days=None)
            self.redirect('/index')

        else:
            self.render('login.html', info='Unmatched user and password, please try again.')

class registerHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('register.html', info='', isCorrect='')

    def post(self):
        user = self.get_argument('user')
        passwd = self.get_argument('passwd')
        verificationCode = self.get_argument('verificationCode')
        correctCode = self.get_secure_cookie("verificationCode")
        #print correctCode,verificationCode
        if verificationCode.upper() != correctCode.upper():
            self.render('register.html', info='', isCorrect='wrong verification code')
        else:
            rec = Fijibook_MySQLdb().addUser(user, passwd)
            #print rec
            if rec['code'] == 0:
                self.set_secure_cookie("user", user)
                #self.set_secure_cookie("passwd", passwd, expires_days=None)
                # res = Fijibook_MySQLdb().createUserTable(user)
                # if not res['code']:
                #     print("Error creating '%s' table!"%user)
                self.redirect('/index')
            else:
                self.render('register.html', info='Unknown error!.', isCorrect='')

class VerificationImgHandler(BaseHandler):
    def get(self):
        #get img
        image, code = VerificationCode().createImg()
        #save code to cookie
        self.set_secure_cookie("verificationCode", code)
        #save to stringio
        msstream = StringIO.StringIO()
        image.save(msstream, 'jpeg')
        #get data from stringio
        img_data = msstream.getvalue()
        msstream.close()
        #set content type
        self.set_header('Content-type', 'image/jpg')
        self.set_header('Content-length', len(img_data))
        #response write
        self.write(img_data)

class LogoutHandler(BaseHandler):
    def get(self):
        #print self.get_argument("logout", None)
        self.clear_cookie("user")
        self.redirect("/index")
        #if (self.get_argument("logout", None)):


class MapHandler(BaseHandler):
    def get(self):
        self.render('map.html')

class JSMapHandler(BaseHandler):
    def get(self):
        self.render('map1.html')


class POIHandler(BaseHandler):
    def get(self):
        self.render('POI.html')

class RecordHandler(BaseHandler):
    def get(self):
        mydate = self.get_argument('myDate')
        user = self.get_current_user()
        # today = datetime.datetime.now().strftime('%Y-%m-%d')
        time = datetime.datetime.now().strftime('%H:%M:%S')
        #print mydate, user
        recordRec = Fijibook_MySQLdb().getRecord(user, mydate)
        todayIn=0
        todayOut=0
        try:
            record = recordRec['result']
            for each in recordRec['result']:
                if each[2]>0:
                    todayIn = todayIn + each[2]
                elif each[2]<0:
                    todayOut = todayOut + each[2]
            # print todayOut, todayIn
        except KeyError:
            record = (('No record. Please add ', ' ', ' ', ' ', ' '), )


        recordTmp = {'todayIn': todayIn, 'todayOut' : todayOut, 'record': record, 'time' : time}
        recordJson = json.dumps(recordTmp)
        self.write(recordJson)

    def post(self):
        user = self.get_current_user()
        time = self.get_argument('time')
        money = self.get_argument('money')
        money = float(money)
        remark = self.get_argument('remark')
        type = self.get_argument('type')
        moneySel = self.get_argument('moneySel')
        #print user, time, money, remark, type, moneySel
        if moneySel == 'expenses':
            money = -(money)
        res = Fijibook_MySQLdb().updateRecord(user, time, money, remark, type)
        #if res['code']:
            #print 'update record failed!'

    def delete(self):
        user = self.get_current_user()
        time = self.get_argument('time')
        #print user, time
        res = Fijibook_MySQLdb().delRecord(user, time)
        if res['code']:
            self.write('delete record failed!')
class FBAAIndexHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        user = self.get_current_user()
        sys.stdout.flush()
        res = Fijibook_MySQLdb().getActivity(user)
        endedAct=[]
        actingAct=[]
        if res['code']==1:#查询出错
            self.write('get activity failed!')
        elif res['code']==2:  #没查到记录
            self.render('FBAAIndex.html', user=user, actingAct=({'name': '还不快创建一个~', 'friends': ''},), endedAct=({'name': '没有活动哦~', 'friends': ''},))
        elif res['code']==0:#查到了记录
            # print res['result']
            for act in res['result']:
                if act[2] == 1:
                    endedAct.append({'name': act[0], 'friends': ('参与者：'+act[1])})
                elif act[2] == 0:
                    actingAct.append({'name': act[0], 'friends': ('参与者：'+act[1])})
            # print endedAct
            # print actingAct
            self.render('FBAAIndex.html', user=user, actingAct=actingAct, endedAct=endedAct)

class FBAAHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        user = self.get_current_user()
        expenseTypesRec = Fijibook_MySQLdb().getExpenseTypes(user)
        incomeTypesRec = Fijibook_MySQLdb().getIncomeTypes(user)
        sys.stdout.flush()
        activity = self.get_argument('activity')
        if activity=='new':
            print 'new'
            self.render('FBAA.html', user=user, isbusy='false', friends=user, activity='', tbody='', thead='',
                            expensebody=expenseTypesRec['result'],
                            incomebody=incomeTypesRec['result'],)
        else:
            receive=Fijibook_MySQLdb().getActBalance(user, activity)
            if receive['code']:  #查询出错
                self.write('get activity balance failed!')
            else:       #查到了记录
                #print recive
                print receive['result']
                self.render('FBAA.html', user=user, isbusy='true', friends=receive['result'][0][4], activity=receive['result'][0][3], tbody=receive['result'],
                            thead=['时间', '位置', '金额', '活动', '参与者', '付款人', '分类', '备注'],
                                expensebody=expenseTypesRec['result'],
                                incomebody=incomeTypesRec['result'],)
    @tornado.web.authenticated
    def post(self):
        user = self.get_current_user()
        activity = self.get_argument('activity')
        friends = self.get_argument('friends')
        goal = self.get_argument('goal')
        if goal == 'FBAA':
            res = Fijibook_MySQLdb().saveActivity(activity, friends, user)
            if res['code']:
                self.write('save activity failed!')
        elif goal == 'balance':
            money = self.get_argument('money')
            payer = self.get_argument('payer')
            location = self.get_argument('inputLocation')
            remark = self.get_argument('remark')
            type = self.get_argument('type')
            lng = self.get_argument('lng')
            lat = self.get_argument('lat')
            (rec,rec1) = Fijibook_MySQLdb().saveActBalance(user=user, money=money, location=location, remark=remark, type=type, lng=lng, lat=lat, activity=activity, friends=friends,payer=payer)
            if rec1['code'] or rec['code']:
                self.write(rec1,rec)
            # self.redirect('/FBAA')
    @tornado.web.authenticated
    def delete(self):
        user = self.get_current_user()
        activity = self.get_argument('activity')
        res = Fijibook_MySQLdb().squareActivity(activity, user)
        if res['code']:
            self.write('square up failed!')

class ChartHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        user = self.get_current_user()
        bill=Fijibook_MySQLdb().getTable(user)
        if bill['code']==0:
            self.render('charts.html', user=user, thead=['时间', '位置', '金额',  '大类', '小类', '备注'],
                        tbody=bill['result'])
        elif bill['code']==1:
            self.write('Get bill failed!'+bill['result'])
        elif bill['code']==2:
            self.render('charts.html', user=user, thead=['时间', '位置', '金额',  '大类', '小类', '备注'],
                        tbody=(('No Record!', '', '',  '', '', '', '', ''),))