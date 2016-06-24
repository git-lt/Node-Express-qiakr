var registerService = require('../registerService');
var _ = require('lodash');

var videoServiceConfig = {
	serviceName:'yike.api.xxxxxxx',
	actions:{
		createQiakrVideo: 'String videoPic, String videoUrl, String mainTitle, String viceTitle, String courseTag, String teacher, String duringTime, String supplierLevel, BigDecimal courseFee, String courseDescription, Byte type, Byte status, Short sort',
		updateQiakrVideo: 'Long id, String videoPic, String videoUrl, String mainTitle, String viceTitle, String courseTag, String teacher, String duringTime, String supplierLevel, BigDecimal courseFee, String courseDescription, Byte type, Byte status, Short sort',
		deleteQiakrVideoById: 'Long id',
		getQiakrVideoById: 'Long qiakrVideoId',
		getQiakrVideoList: 'Byte type, String fuzzyName, Integer index, Integer length, Byte status',
		countQiakrVideoList: 'Byte type, String fuzzyName, Byte status',
		publishQiakrVideo: 'Long qiakrVideoId, Byte status'
	}
};

var videoService = registerService(videoServiceConfig);

module.exports = _.assign(videoService, {
	getQiakrVideoList4Page:function(pms){
		if(!_.isObject(pms) || _.isUndefined(pms.type) || _.isUndefined(pms.status) ||  _.isUndefined(pms.fuzzyName)) return '缺少必要参数';

		return Promise.all([
			videoService.getQiakrVideoList(pms),
			videoService.countQiakrVideoList(pms)
		]).then(function(dataArr){
			return {
				list: dataArr[0],
				count: dataArr[1]
			};
		});
	}
});