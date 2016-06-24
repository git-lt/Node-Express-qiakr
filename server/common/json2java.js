/**
 * [将JSON对象转换为Java对象]
 * @param  {[String]} javaArgs [格式：Integer index, Integer length, Byte status]
 * @param  {[JsonObject]} jsonPms  [格式：{index:0, lenght:12}]
 * @return {[Array]}          [返回一个数据]
 * // j = 'Integer length, Byte status' => {'length':Integer, status:'Byte'}
 */

var java = require('js-to-java');

module.exports = function(javaArgs, jsonPms){
	var t, res;
	
	res = javaArgs.split(',').map(function(v, i){
		t = v.trim().split(' ');
		return {name: t[1], type: t[0]}; 
	}).map(function(v, i){
		if( typeof jsonPms[v.name] === 'undefined' ){
			return java[v.type](null);
		}else{
			if(jsonPms[v.name]!==''){
				return java[v.type] ? java[v.type](jsonPms[v.name]):java('com.test.Object', jsonPms[v.name]);
			}else{
				return java[v.type] ? java[v.type](null):java('com.test.Object', null);
			}
		}
	})

	return res;
}