var newsApi = require('../../api/home/news');
// var loger = require('../../common/logHelper').log;

// 数据验证：https://github.com/eisneim/validate-chain
// var VC = require("validate-chain");

var homeController = {
	home:function(req, res, next){
		res.render('home/index', {title: '首页', layout:'home'});
	},
	product:function(req, res, next){
		res.render('home/product', {title: '产品介绍', layout:'home'});
	},
	facilitator:function(req, res, next){
		res.render('home/facilitator', {title: '服务商', layout:'home'});
	},
	news:function(req, res, next){
		var pms = {
			index:  ~~req.body.index || 0,
			length: ~~req.body.length || 6,
			status: 0,
			tag: ~~req.params.tag || 0
		};
		// 获取数据
		newsApi.getArticlesList4Page(pms).then(function(data){
			res.render('home/news', {
				title:'洽客动态', 
				data: data.list,
				count: data.count,
				layout:'home', 
				tag: pms.tag
			});
		}).catch(function(err){
			next(err);
		});
	},
	newsDetail:function(req, res, next){
		var id = req.params.id;
		var tag = ~~req.params.tag;

		if(id !== undefined){
			var pms ={ id: ~~id };
			newsApi.queryById(pms).then(function(data){
				res.render('home/newsDetail', {title:'洽客动态', tag: tag, data:data, layout:'home'});
			}).catch(function(err){
				next(err);
			});
		}else{
			next();
		}
	},
	about:function(req, res, next){
		res.render('home/about', {title:'关于我们', layout:'home'});
	},
	join:function(req, res, next){
		res.render('home/join', {title:'加入我们', layout:'home'});
	},
	qa:function(req, res, next){
		res.render('home/qa', {title:'常见问题', layout:'home'});
	}
}

module.exports = homeController;