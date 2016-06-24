var newsApi   = require('../../api/home/news');
var videosApi = require('../../api/home/videos');
var path      = require('path');
var config = require('../../../express.config');
var utils = require('../../common/utils');

// var loger = require('../../common/logHelper').log;

// 数据验证：https://github.com/eisneim/validate-chain
// var VC = require("validate-chain");

var homeAdminController = {
	home:function(req, res, next){
		res.sendFile(path.join(__dirname, '../../views/pages/home_admin/index.html'));
	},
	login:function(req, res, next){
		res.sendFile(path.join(__dirname, '../../views/pages/home_admin/login.html'));
	},
	doLogin:function(req, res, next){
		var uName = req.body.uName;
		var uPwd = req.body.uPassword;

		if(uName === config.uName && uPwd === config.uPassword){
			// 写入session 与 cookie
			req.session.uName = uName;
			res.cookie('token', utils.encrypt(uName, config.session_secret), { expires: new Date(Date.now() + 300000), httpOnly: true });
			res.send({status:'0'});
		}else{
			res.send({status:'1', errmsg:'用户名或密码错误！'});
		}

	},
	doLogout:function(req, res, next){
		req.session.uName = '';
		res.clearCookie('token');
		res.redirect('/home/login');
	}
}
module.exports = homeAdminController;