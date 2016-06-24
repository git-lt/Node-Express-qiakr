var videoApi = require('../../api/home/videos');
var utils = require('../../common/utils');
var _ = require('lodash');

// 数据验证：https://github.com/eisneim/validate-chain
// var VC = require("validate-chain");

module.exports = {
	getList:function(req, res, next){
		var pms = req.body;

		pms.index = pms.index || 0;
		pms.length = pms.length || 6;
		pms.status = pms.status || 0;
		pms.type = pms.type || '0';

		videoApi.getQiakrVideoList4Page(pms).then(function(data){
			res.send({status: '0', result: data, type:pms.type});
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

			videoApi.getQiakrVideoById(pms)
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

		newsApi.createQiakrVideo(pms)
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

			newsApi.deleteQiakrVideoById(pms)
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

			newsApi.publishQiakrVideo(pms)
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
			newsApi.updateQiakrVideo(pms)
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
