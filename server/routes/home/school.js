var videoApi = require('../../api/home/videos');
var loger = require('../../common/logHelper').log;
var _ = require('lodash');
var Promise = global.Promise || require('promise');


var schoolController = {
	school:function(req, res, next){
		var pms = {
			index:0,
			length:6,
			fuzzyName:'',
			status:2
		};

		Promise.all([
			videoApi.getQiakrVideoList4Page(_.assign(pms, {type:1})),
			videoApi.getQiakrVideoList4Page(_.assign(pms, {type:2})),
			videoApi.getQiakrVideoList4Page(_.assign(pms, {type:3})),
			videoApi.getQiakrVideoList4Page(_.assign(pms, {type:4})),
			videoApi.getQiakrVideoList4Page(_.assign(pms, {type:''})),
		]).then(function(datas){
			var nData = _.chunk(datas, 4);
			nData[0][0].title = '新手商家-认知';
			nData[0][1].title = '新手商家-操作';
			nData[0][2].title = '进阶商家';
			nData[0][3].title = '关于导购';
			res.render('home/school', {title:'首页', listData: nData[0], topData:nData[1]});
		}).catch(function(errs){
			next(errs);
		});
	},
	video:function(req, res, next){
		var pms = {
			index: ~~req.query.index || 0,
			length: ~~req.query.length || 6,
			fuzzyName: req.query.fuzzyName || '',
			type: ~~req.params.type || '',
			status: 2
		};

		// 获取数据
		videoApi.getQiakrVideoList4Page(pms)
			.then(function(data){
				res.render('home/videos', {
					title:'在线教程', 
					data: data.list, 
					type: pms.type, 
					count: data.count
				});
			}).catch(function(err){
				next(err);
			});
	},
	videoDetail:function(req, res, next){
		var id = ~~req.params.id;
		var type = ~~req.params.type;
		if(id !== undefined){
			var pms ={
				qiakrVideoId: id
			};

			videoApi.getQiakrVideoById(pms)
				.then(function(data){
					res.render('home/videoDetail', {type:type, data: data});
				})
				.catch(function(err){
					next(err);
				});
		}else{
			next();
		}
	}
}

module.exports = schoolController;