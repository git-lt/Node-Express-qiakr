
// 给模板扩展block语法
var blocks = {};

var helpers = {
	active: function(text, targetText){
		return text === targetText ? 'active':'';
	},
	block: function(name){
		var val = (blocks[name] || []).join('\n');
	    blocks[name] = [];
	    return val;
	},
	extend: function(name, context){
		var block = blocks[name];
	    if (!block) {
	        block = blocks[name] = [];
	    }

	    block.push(context.fn(this));
	},
	compare: function(left, operator, right, options){
		if (arguments.length < 3) {
           throw new Error('Handlerbars Helper "compare" needs 2 parameters');
         }
         var operators = {
           '==':     function(l, r) {return l == r; },
           '===':    function(l, r) {return l === r; },
           '!=':     function(l, r) {return l != r; },
           '!==':    function(l, r) {return l !== r; },
           '<':      function(l, r) {return l < r; },
           '>':      function(l, r) {return l > r; },
           '<=':     function(l, r) {return l <= r; },
           '>=':     function(l, r) {return l >= r; },
           'typeof': function(l, r) {return typeof l == r; }
         };

         if (!operators[operator]) {
           throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
         }

         var result = operators[operator](left, right);

         if (result) {
           return options.fn(this);
         } else {
           return options.inverse(this);
         }
	}
}

module.exports = helpers;