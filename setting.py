#!/usr/bin/python
#encoding:utf-8

## Copyright (C), 2015-2017, ****.
## project name:    pgx_WebService
## Author:          hjx
## Version:         0.2
## Date:            2015-07-24
## Description:
## History:         0.2
##   1. Date:
##      Author:    hjx
##      Modification:
##   2. ...


from handlers.WebService import indexHandler, loginHandler, LogoutHandler, ProfileHandler, \
    JSMapHandler, registerHandler, POIHandler, VerificationImgHandler, RecordHandler, FBAAHandler, FBAAIndexHandler, ChartHandler, AvatarHandler
#
# from handlers.WebService import indexHandler, loginHandler, LogoutHandler, MapHandler, JSMapHandler, registerHandler,


urls = [
    ('/', indexHandler),
    ('/login', loginHandler),
    ('/logout', LogoutHandler),
    ('/index', indexHandler),
    ('/register', registerHandler),
    ('/profile', ProfileHandler),
    # ('/jsmap', JSMapHandler),
    # ('/poi', POIHandler),
    ('/verificationimg', VerificationImgHandler),
    ('/avatar', AvatarHandler),
    ('/record', RecordHandler),
    ('/FBAA', FBAAHandler),
    ('/FBAAIndex', FBAAIndexHandler),
    ('/charts', ChartHandler),
    ]

