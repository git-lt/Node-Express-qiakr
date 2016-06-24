// checkBrowser
!(function(){
    function addLoadEvent(func) {
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
            window.onload = func;
        } else {
            window.onload = function() {
                if (oldonload) {
                    oldonload();
                }
                func();
            }
        }
    }
    addLoadEvent(function(){
        outdatedBrowser({
            bgColor: '#f25648',
            color: '#ffffff',
            lowerThan: 'transform',
            languagePath: ''
        })
    });
})();

// Utils
!(function($, window, undefined){

    var headerAnimate=function(){
      if($('.navbar').offset().top > 50){
        $('.navbar-fixed-top').addClass('top-nav-collapse');
      }else{
        $('.navbar-fixed-top').removeClass('top-nav-collapse');
      }
    }
    
    window.Utils = {
      fixedHeader:function(){
        $(window).off('scroll', headerAnimate);
        $('.navbar-fixed-top').addClass('top-nav-collapse');
      },
      realseHeader:function(){
        $(window).on('scroll', headerAnimate);
        headerAnimate();
      },
      getLocalTime:function(ms,day){
        ms = Number(ms);
        var _date = new Date(ms);
        var year=_date.getFullYear(),
              month=_date.getMonth()+1,
              date=_date.getDate(),
              hour=_date.getHours(),
              minute=_date.getMinutes(),
              second=_date.getSeconds();
          return year+"-"+(month<10 ? ("0"+month) : month)+"-"+(date<10 ? ("0"+date) : date);
      },
      resetScrollOffset:function(){
        $("html,body").animate({scrollTop:0},100)
      },
      getCookie:function(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
          return unescape(arr[2]); 
        else 
          return null; 
      },
      setCookie:function(name, value, days){
        var Days = days || 30; 
        var exp = new Date(); 
        exp.setTime(exp.getTime() + Days*24*60*60*1000); 
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
      },
      delCookie:function(name){
        var exp = new Date(); 
        exp.setTime(exp.getTime() - 1); 
        var cval=this.getCookie(name); 
        if(cval!=null) 
            document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
      },
      addFavor:function($btn) {
        $btn.on('click', function(){
            var url = window.location;  
            var title = $('title').text();  
            var ua = navigator.userAgent.toLowerCase();  
            if (ua.indexOf("360se") > -1) {  
                alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！"); 
            }else if (ua.indexOf("msie 8") > -1) {  
                window.external.AddToFavoritesBar(url, title); //IE8  
            }else if (document.all) {  
            try{  
             window.external.addFavorite(url, title);  
            }catch(e){  
             alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');  
            }  
            }else if (window.sidebar) {  
                window.sidebar.addPanel(title, url, "");  
            }else {  
                alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');  
            } 
        })
      }
    }
})(jQuery, window, undefined);

// helper
template.helper('dayTime', function (date, format) {
  if(!date) return "";
    format = qk_Utils.getLocalTime(date);
    return format;
});

template.helper('getTags', function (v) {
  if(!v) return "暂无";
  var tags = v.split('_').map(function(d){
    return '<span class="video-tag-item">'+d+'</span>';
  });
  return tags.join('');
});

template.helper('getLevel', function (v) {
  if(!v) return "暂无";
  var tag = ['primary', 'success', 'info'];
  var tags = v.split('_').map(function(d){
    var tagStyle = d=='基础商家'?tag[0]:d=='VIP商家'?tag[1]:tag[2];
    return '<span class="label label-'+tagStyle+'">'+d+'</span>&emsp;';
  });
  return tags.join('');
});



  
