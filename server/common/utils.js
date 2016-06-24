var crypto = require('crypto');
var xss = require('xss');
var _ = require('lodash');

var utils= {
	encrypt: function(str, secret) {
		var cipher = crypto.createCipher('aes192', secret);
		var enc = cipher.update(str, 'utf8', 'hex');
		enc += cipher.final('hex');
		return enc;
	},
	decrypt: function(str, secret){
		var decipher = crypto.createDecipher('aes192', secret);
		var dec = decipher.update(str, 'hex', 'utf8');
		dec += decipher.final('utf8');
		return dec;
	},
	xss:function(o){
		if(_.isPlainObject(o) || _.isArray(o)){
			o = _.mapValues(o, function(v){
				return _.isString(v) ? xss(v) : v;
			})

			return o;
		}
		
		if(_.isString(o)){
			return xss(o);
		}
		return o;
	}
}

module.exports = utils