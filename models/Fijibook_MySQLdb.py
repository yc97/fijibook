#encoding:utf-8
#!/usr/bin/python
__author__ = 'stevewong'

from DB_MySQL import MySQLDatabase
from IDatabase import Defaults
import traceback

class Fijibook_MySQLdb(MySQLDatabase):
    def __init__(self):
        try:
            super(Fijibook_MySQLdb, self).__init__(dbName='MySQL', database='fijibook')
        except Exception as e:
            print traceback.format_exc()

    def getBalance(self, user):
        usertable = 'balance'
        cmd = "select money from %s where user = '%s' and AA=0" % (usertable, user)
        return self.execute(cmd)

    def saveBalance(self, user, time, money, location='', remark='', type='', lng='', lat=''):
        usertable = 'balance'
        cmd1 = "insert into %s (`user`, `money`, `time`, `location`, `remark`, `type`, `lng`, `lat`, `AA`) \
                values('%s', %f, '%s', '%s', '%s', '%s', '%s', '%s',0)" \
               % (usertable, user, float(money), time, location, remark, type, lng, lat)
        rec = self.execute(cmd1)
        self.db.commit()
        return rec

    def addUser(self, user, password):
        try:
            cmd0 = "select * from User where user = '%s'" % (user)
            rec0 = self.execute(cmd0)
            if rec0['code'] == 0:#成功执行，说明记录已存在
                return {'code': 3, 'info': 'Error! User exists!'}
            elif rec0['code'] == 2:
                #记录不存在，可以插入
                cmd1 = """INSERT INTO User(user, passwd)\
                        VALUES('%s', md5('%s')) """\
                                % (user, password)
                #print cmd1
                rec1 = self.execute(cmd1)
                #print rec1
                if not rec1['code']:#成功执行
                    return {'code': 0, 'info': 'Insert user OK!'}
                else:
                    return rec1
            else:#code==1,其他错误
                return rec0
        except Exception as e:
            return {'code': 1, 'info': 'Error! from AddUser: ' + e.message}

    def getUserId(self, user):
        try:
            cmd0 = "select id from User where user = '%s'" % (user)
            rec0 = self.execute(cmd0)
            if rec0['code'] == 0:#成功执行
                return rec0
            else:#code==1,其他错误
                return {'code': 1, 'info': 'Error! User not exists!'}
        except Exception as e:
            return {'code': 1, 'info': 'Error! from getUserId: ' + e.message}

    def delUser(self, user):
        try:
            cmd = "delete from User \
                where user = '%s'" % (user)
            dict_res = self.execute(cmd)
            #print dict_res
            if dict_res['code'] == 2:#执行失败,说明记录不存在
                return {'code': 2, 'info': 'User not exist!'}
            elif dict_res['code'] == 0:#执行成功
                return {'code': 0, 'info': 'Delete user OK!'}
            return dict_res
        except Exception as e:
            return {'code': 1, 'info': 'Error! from delUser: ' + e.message}

    def login(self, user, password):
        try:
            cmd = "select user, passwd from User \
                where user = '%s' and passwd = md5('%s')" % (user, password)
            rec = self.execute(cmd)
            if not rec['code']:
                return {'code': 0, 'info': 'Login OK!', 'user': rec['result'][0][0]}
            else:
                return rec
        except Exception as e:
            return {'code': 1, 'info': 'Error! from login: ' + e.message}

    def getUserSum(self):
        cmd = "select count(*) from `User`"
        return self.execute(cmd)

    def getRecSum(self):
        usertable = 'balance'
        cmd = "select count(*) from %s"% usertable
        return self.execute(cmd)

    def getUserRecSum(self, user):
        usertable = 'balance'
        cmd = "select count(*) from %s where user = '%s'"% (usertable, user)
        return self.execute(cmd)

    def getNewestRecTime(self, user):
        usertable = 'balance'
        cmd = "select max(time) from %s where `user` = '%s'"% (usertable, user)
        return self.execute(cmd)

    def getTable(self, user):
        # usertable = 'balance'
        try:
            cmd = "select b.time,CONCAT_WS(',',SUBSTRING_INDEX(SUBSTRING_INDEX(b.location, ',', 2),',',-1),SUBSTRING_INDEX(b.location, ',', -1)),b.money,t.toptype,b.type,b.remark, b.lng,b.lat FROM balance b,type t where b.type=t.subtype and b.user='%s'and b.AA=0 ORDER BY b.TIME DESC" % (user)
            return self.execute(cmd)
        except e:
            return {'code': 1, 'result': 'error', 'info': 'Error! From getTable: ' + e.message}

    def getUserTable(self, user):
        usertable = 'balance'
        cmd = "select `time`, `location`,`money`, `type` ,`remark` from %s where `user` = '%s' and AA=0" % (usertable, user)
        return self.execute(cmd)

    # def createUserTable(self, user):
    #     usertable = user + '_balance'
    #     cmd = "create table %s like balance" % str(usertable)
    #     return self.execute(cmd)
    def getExpenseTypes(self, user):
        cmd = "select `subtype` from type where user in ('all','%s') and inex='expenses'" % user
        return self.execute(cmd)

    def getIncomeTypes(self, user):
        cmd = "select `subtype` from type where user in ('all','%s') and inex='income'" % user
        return self.execute(cmd)

    def getRecord(self, user, mydate):
        cmd = "SELECT DATE_FORMAT(TIME,'%%T') time24,CONCAT_WS(',',SUBSTRING_INDEX(SUBSTRING_INDEX(location, ',', 2),',',-1),SUBSTRING_INDEX(location, ',', -1)),money,TYPE,remark FROM balance " \
              "WHERE `TIME` >= '%s 00:00:00'AND `TIME` < DATE_ADD('%s',INTERVAL '1' day) AND `user` ='%s' and AA=0 ORDER BY TIME ASC"% (mydate, mydate, user)
        return self.execute(cmd)

    def updateRecord(self, user, time, money, remark, type):
        cmd = "UPDATE balance SET `money`=%f,`remark`='%s',`type`='%s' WHERE `time`='%s'AND `user`='%s' "%(money, remark, type, time, user)
        return self.execute(cmd)

    def delRecord(self, user, time):
        cmd = "DELETE FROM balance WHERE `time`='%s'AND `user`='%s';"%(time, user)
        return self.execute(cmd)

    def getTodayInSum(self, user):
        cmd = "SELECT ROUND(SUM(money),2) FROM balance WHERE user='%s' AND to_days(time) = to_days(now()) AND money>0 and AA=0"%(user)
        return self.execute(cmd)

    def getTodayOutSum(self, user):
        cmd = "SELECT ROUND(SUM(money),2) FROM balance WHERE user='%s' AND to_days(time) = to_days(now()) AND money<0 and AA=0"%(user)
        return self.execute(cmd)

    def getMonthInSum(self, user):
        cmd = "SELECT ROUND(SUM(money),2) FROM balance WHERE user='%s' AND DATE_FORMAT(time,'%%Y%%m')=DATE_FORMAT(CURDATE(),'%%Y%%m') AND money>0 and AA=0"%(user)
        return self.execute(cmd)

    def getMonthOutSum(self, user):
        cmd = "SELECT ROUND(SUM(money),2) FROM balance WHERE user='%s' AND DATE_FORMAT(time,'%%Y%%m')=DATE_FORMAT(CURDATE(),'%%Y%%m') AND money<0 and AA=0"%(user)
        return self.execute(cmd)

    def saveActivity(self, activity, friends, user):
        cmd = "insert into FBAA (`user`, `activity`, `friends`, `payer`, `status`, `ip`) \
                values('%s', '%s', '%s', '', 0, 0)" \
               % (user, activity, friends,)
        return self.execute(cmd)

    # def getSelActivity(self, user, activity):
    #     try:
    #         cmd = "select status,friends from FBAA where activity='%s' and ip=0 and user='%s'" % (activity, user)
    #         return self.execute(cmd)
    #     except e:
    #         return {'code': 1, 'result': 'error', 'info': 'Error! from checkActivity: ' + e.message}

    def getActivity(self, user):
        try:
            cmd = "select activity,friends,status from FBAA where ip=0 and user='%s'" % user
            return self.execute(cmd)
        except e:
            return {'code': 1, 'result': 'error', 'info': 'Error! from getActivity: ' + e.message}

    def saveActBalance(self, user, money, location, remark, type, lng, lat, activity, friends, payer):
        try:
            cmd1 = "insert into balance (`user`, `money`, `time`, `location`, `remark`, `type`, `lng`, `lat`, `AA`) \
                values('%s', %f, now(), '%s', '%s', '%s', '%s', '%s',1)" \
               % (user, -float(money), location, remark, type, lng, lat)
            rec1 = self.execute(cmd1)
            cmd = "insert into FBAA (`user`, `activity`, `friends`, `payer`, `status`, `ip`) values('%s', '%s', '%s', '%s',0,(SELECT LAST_INSERT_ID()))"%( user,activity,friends,payer)
            rec = self.execute(cmd)
            self.db.commit()
            return (rec1,rec)
        except e:
            return {'code': 1, 'result': 'error', 'info': 'Error! from saveActBalance: ' + e.message}

    def getActBalance(self, user, activity):
        try:
            cmd = "SELECT b.time,SUBSTRING_INDEX(b.location, ',', -1),ROUND((-b.money),2),f.activity,f.friends,f.payer,b.type,b.remark,f.status FROM balance AS b INNER JOIN FBAA AS f ON b.id=f.ip where b.user='%s' and f.user='%s' and f.activity='%s'" % (user, user, activity)
            return self.execute(cmd)
        except e:
            return {'code': 1, 'result': 'error', 'info': 'Error! from getActBalance: ' + e.message}

    def squareActivity(self, activity, user):
        try:
            cmd = "update FBAA set status=1 where activity='%s' and user='%s'" % (activity, user)
            return self.execute(cmd)
        except e:
            return {'code': 1, 'result': 'error', 'info': 'Error! from checkActivity: ' + e.message}

if __name__ == '__main__':
    Defaults.config_path = '../config/data.conf'
    print Fijibook_MySQLdb().addUser('luke', 'jmb12e')


