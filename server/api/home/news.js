var registerService = require('../registerService');
var Promise = global.Promise || require('Promise');
var _ = require('lodash');

var articleServiceConfig = {
	serviceName: 'yike.api.xxxxxx',
	actions: {
		getArticlesList: 'Integer index, Integer length, Byte status,Byte tag',
		queryById: 'Long id',
		insert: 'Articles articles',
		update: 'Articles articles',
		countArticles: 'Byte status,Byte tag',
		delete: 'Long id',
		updateStatus: 'Long id, Byte status'
	}
};

var articleService = registerService(articleServiceConfig);

module.exports = _.assign(articleService, {
	getArticlesList4Page:function(pms){
		if(!_.isObject(pms) || _.isUndefined(pms.status) || _.isUndefined(pms.tag))  return '缺少必要参数';

		return Promise.all([
			articleService.getArticlesList(pms),
			articleService.countArticles(pms)
		]).then(function(dataArr){
			return {
				list: dataArr[0],
				count: dataArr[1]
			};
		});
	}
});