var express      = require('express');
var path         = require('path');
var config       = require('./express.config');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var oneapm       = require("oneapm");
var favicon      = require('serve-favicon');
var errorhandler = require('errorhandler');
var viewHelper   = require('./server/middlerware/viewHelper');

// var template = require('art-template');

var env          = process.env.NODE_ENV || 'development';

// var Promise = global.Promise || require('promise');
// var mongoose = require('mongoose');
// var RedisStore = require('connect-redis')(express);

var app = express();
app.locals.config = config;

// 数据库设置
// 
// MongoDB
// mongoose.connect(config.db);
// mongoose.connection.on("error", function (error) {
//     console.log("数据库连接失败：" + error);
// });
// mongoose.connection.on("open", function () {
//     console.log("------数据库连接成功！------");
// });

// Redis
// var options = {
//      "host": "127.0.0.1",
//      "port": "6379",
//      "ttl": 60 * 60 * 24 * 30,   //Session的有效期为30天
// };

// 端口
var port = config.port;
app.set('port', port || 3001);
app.set('env', env);

// 指定favicon.icon
app.use(favicon(__dirname + '/favicon.ico'));

// 设置动态页目录 与 渲染引擎
app.set('views', __dirname + '/server/views/pages/');
app.set('view engine', 'jade');


// 处理请求参数
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 处理cookie
app.use(cookieParser(config.session_secret));

// 日志记录
// require('./server/common/logHelper').use(app);

// 指定静态资源目录
app.use(express.static(path.join(__dirname, 'static')));

// 处理session
app.use(session({
    secret: config.session_secret,
    cookie: {maxAge: 1200000},
    resave: false,
    saveUninitialized: true,
}));

// 注册路由
app.use(viewHelper());
app.use(require('./server/routes/home'));


if(env === 'development'){
	app.use(errorhandler());
}else{
	// 404
	app.use('*', function logErrors(req, res, next){
		res.status(404);

		if (req.method === 'GET') {
			res.render('404', {title: '404'});
		}else {
		  res.send({
		      status: '1',
		      code: 404,
		      errmsg: 'Not found'
		  });
		}
	});

	// 500
	app.use(function respondError(err, req, res, next) {
		var status, errmsg;
		status = err.status || 500;
		res.status(status);
		errmsg = err.message || 'oo there was a problem!';

		if(req.method === 'GET'){
			res.render('500', {
			    title: err.name,
			    status: status,
			    message: errmsg
			});
		}else{
			res.type('txt').send(errmsg + '\n');
		}
	});
}

app.listen(app.get('port'), function(){
  console.log('server running at port:'+port);
});

module.exports = app;


