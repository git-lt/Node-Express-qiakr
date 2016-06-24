var utils = require('../../common/utils');

module.exports = {
	doLogin:function(req, res, next){
		var uName = req.body.uName;
		var uPwd = req.body.uPassword;

		if(uName === config.uName && uPwd === config.uPassword){
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