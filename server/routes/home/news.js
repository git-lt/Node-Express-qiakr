var newsApi = require('../../api/home/news');
var utils = require('../../common/utils');
var _ = require('lodash');

// 数据验证：https://github.com/eisneim/validate-chain
// var VC = require("validate-chain");

module.exports = {
	getList:function(req, res, next){
		var tag = req.body.tag || '0';
		var index = req.body.index || 0;
		var length = req.body.length || 6;

		var pms = {
			index:index,
			length:length,
			status:0,
			tag:~~tag
		};

		newsApi.getArticlesList4Page(pms).then(function(data){
			res.send({status: '0', result: data, tag:tag+''});
		}).catch(function(err){
			res.send({status: '1', errmsg:err});
		});
	},
	getDetail:function(req, res, next){
		var id = req.body.id;
		if(!_.isUndefined(id)){
			var pms ={
				id: ~~id
			};
			newsApi.queryById(pms)
			.then(function(data){
				res.send({status: '0', data: data});
			}).catch(function(err){
				res.send({status: '1', errmsg:err});
			});
		}else{
			res.send({status: '1', errmsg:'缺少必要参数'});
		}
	},
	create:function(req, res, next){
		var pms = req.body;

		pms = utils.xss(pms);

		newsApi.insert(pms)
			.then(function(data){
				res.send({status:'0', result: data})
			})
			.catch(function(err){
				res.send({status: '1', errmsg:err});
			});
	},
	del:function(req, res, next){
		var id = req.body.id;

		if(!_.isUndefined(id)){
			var pms = { id: id };

			newsApi.delete(pms)
				.then(function(data){
					res.send({status:'0', result: data})
				})
				.catch(function(err){
					res.send({status: '1', errmsg:err});
				})
		}else{
			res.send({status: '1', errmsg:'缺少必要参数'});
		}
	},
	updateStatus:function(req, res, next){
		var id = req.body.id;
		var status = req.body.status;

		if(!_.isUndefined(id) && !_.isUndefined(status)){
			var pms = { id: Number(id), status: Number(status) };

			newsApi.updateStatus(pms)
				.then(function(data){
					res.send({status:'0', result: data})
				})
				.catch(function(err){
					res.send({status: '1', errmsg:err});
				})
		}else{
			res.send({status: '1', errmsg:'缺少必要参数'});
		}
	},
	update:function(req, res, next){
		var pms = xss(req.body);
		var id = req.body.id;

		if(!_.isUndefined(pms)){
			newsApi.update(pms)
				.then(function(data){
					res.send({status:'0', result: data})
				})
				.catch(function(err){
					res.send({status: '1', errmsg:err});
				})
		}else{
			res.send({status: '1', errmsg:'缺少必要参数'});
		}
	}
}
