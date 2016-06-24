/**
 * 验证用户登录信息
 */
var utils = require('../common/utils');
var config = require('../../express.config');

var authorize = function(req, res, next) {
	var token = req.cookies.token;
	if (!req.session.uName) {
		if(req.cookies.token){
			var uName = utils.decrypt(req.cookies.token, config.session_secret);
			if(uName === config.uName){
				next();
			}
		}
		res.redirect('/home/login');
	}else {
		next();
	}
}
module.exports = authorize;