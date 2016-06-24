var Service = require('node-zookeeper-dubbo');
var json2java = require('../common/json2java');
var loger = require('../common/logHelper').log;
var zkConfig = require('../../express.config').zk;


var creatService = function(serviceName){
	var opt = {
	  env: zkConfig.env,
	  conn: zkConfig.conn, 
	  path: serviceName, 
	  version: zkConfig.version
	}

	return new Service(opt);
}

var registerService = function(serviceCofig){
	var s = {};
	var service = creatService(serviceCofig.serviceName);
	var actions = serviceCofig.actions;

	for(var i in actions){
		s[i] = (function(i, service, json2java){
			return function(pms){
				var javaObj = json2java(actions[i], pms);

				return service.excute(i, javaObj).then(function(data){
					var res;
					try{
						res = JSON.parse(data);
					}catch(e){
						res = data;
					}
					return res;
				});
			}
		})(i, service, json2java);
	}

	return s;
}

module.exports = registerService;

