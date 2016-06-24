
var createLog4jsConfig = function(debug){
    var debugCategory = !!debug ? 'console' : '';
    var log4jsCon = {
        "appenders": [
            { 
                "type": "console",
                "category": "console"
            },{
                "type": debugCategory ||  "dateFile",
                "filename": "./logs/access/access.log",
                "pattern": "yyyy-MM-dd.log",
                "alwaysIncludePattern": false,
                "maxLogSize": 1024,
                "backups": 3,
                "category": "access"
            },{
                "type":  debugCategory || "dateFile",
                "filename": "./logs/console/debug.log",
                "pattern": "_yyyy-MM-dd.log",
                "alwaysIncludePattern": false,
                "maxLogSize": 1024,
                "backups": 3,
                "category":"cDebug"
            },{
                "type": debugCategory || "dateFile",
                "filename": "./logs/console/info.log",
                "pattern": "_yyyy-MM-dd.log",
                "alwaysIncludePattern": false,
                "maxLogSize": 1024,
                "backups": 3,
                "category": "cInfo"
            },{
                "type":  debugCategory || "dateFile",
                "filename": "./logs/console/wran.log",
                "pattern": "_yyyy-MM-dd.log",
                "alwaysIncludePattern": false,
                "maxLogSize": 1024,
                "backups": 3,
                "category": "cWarn"
            },{
                "type":  debugCategory || "dateFile",
                "filename": "./logs/console/error.log",
                "pattern": "_yyyy-MM-dd.log",
                "alwaysIncludePattern": false,
                "maxLogSize": 1024,
                "backups": 3,
                "category": "cErr"
            }
        ],
        "levels":{ 
            "access": "INFO", 
            "cDebug": "DEBUG",
            "cInfo": "INFO",
            "cWarn": "WARN",
            "cErr": "ERROR"
        },
        "replaceConsole": !!debug
    }
    return log4jsCon;
}

module.exports = createLog4jsConfig;

 