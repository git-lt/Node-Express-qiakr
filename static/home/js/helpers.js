var jHelper = {
	dayTime:function (date, format) {
	    if(!date) return "";
		format = Utils.getLocalTime(date);
		return format;
  	},
  	getTags:function (v) {
	    if(!v) return "暂无";
	    var tags = v.split('_').map(function(d){
	      return '<span class="video-tag-item">'+d+'</span>';
	    });
	    return tags.join('');
	},
	getLevel:function (v) {
	    if(!v) return "暂无";
	    var tag = ['primary', 'success', 'info'];
	    var tags = v.split('_').map(function(d){
	    var tagStyle = d=='基础商家'?tag[0]:d=='VIP商家'?tag[1]:tag[2];
	    	return '<span class="label label-'+tagStyle+'">'+d+'</span>&emsp;';
	    });
	    return tags.join('');
	 }

}
