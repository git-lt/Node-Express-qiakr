var path = require('path');
var fs = require('fs');
var debug = require('../../express.config').debug;

var log4js = require('log4js'),
    mass_fs = require('mass_fs'),
    logConfig = require("../../log4js.config")(debug),
    helper = {};

// 创建日志目录
mass_fs.mkdirSync('./logs/access');
mass_fs.mkdirSync('./logs/console');

// 规则配置
log4js.configure(logConfig);

// 请求日志
helper.use = function (app) {
    app.use(log4js.connectLogger(log4js.getLogger('access'), {
        level:'auto',
        format:':status :method :url :response-timems'
    }));
};

// 控制台日志
helper.log = {
    info: function(msg){ log4js.getLogger('cInfo').info(msg || '') },
    warn: function(msg){ log4js.getLogger('cWarn').warn(msg || '') },
    error: function(msg){ log4js.getLogger('cErr').error(msg || '') },
    debug: function(msg){ log4js.getLogger('cDebug').debug(msg || '') }
};

module.exports = helper;