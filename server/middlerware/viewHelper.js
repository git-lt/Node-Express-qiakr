/**
 * Module dependencies.
 */
var url = require('url'), 
    moment = require('moment'),
    _ = require('lodash'),
    qs  = require('querystring');

moment.locale('zh-cn');

/**
 * Helpers method
 */

function helpers (name) {
  return function (req, res, next) {
    res.locals.req = req;
    // res.locals.NODE_ENV = env;
    res.locals.moment = moment;
    res.locals['_'] = _;

    res.locals.obj2UrlPms =  obj2UrlPms;
    /**
     * Render mobile views
     */
    var ua = req.header('user-agent');
    var fs = require('fs');

    res._render = res.render;
    req.isMobile = /mobile/i.test(ua);

    // res.render = function (template, locals, cb) {
    //   var view = template + '.m.' + req.app.get('view engine');
    //   var file = req.app.get('views') + '/' + view;

    //   if (/mobile/i.test(ua) && fs.existsSync(file)) {
    //     res._render(view, locals, cb);
    //   } else {
    //     res._render(template, locals, cb);
    //   }
    // };

    next();
  };
}

module.exports = helpers;

/**
 * Strip script tags
 */

function stripScript (str) {
  return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}



 function obj2UrlPms(obj){
    var str=[];
    for(var i in obj){
        _.isUndefined(obj[i]) && (obj[i]='');
        str.push(i+'='+obj[i]);
    }
    return str.join('&');
}
