/**
 * Utils / Filters / Components Config
 */
define(['common','cookie','validate','avalon'],function(){
	/**
	 * Utils
	 */
	var Utils={
	    chartsDataFormat:function(list){
	        var res = {};
	        for(var i in list[0]){
	            res[i] = [];
	        }
	        $.each(list,function(i,e){
	            for(var i in e){
	                res[i].push(e[i]);
	            }
	        });
	        return res;
	    },
	    obj2UrlPms:function(obj){
	        var str=[];
	        for(var i in obj){
	            str.push(i+'='+obj[i]);
	        }
	        return str.join('&');
	    },
	    getLocalTime:function(ms,day){
	        if(!ms){
	            return "";
	        }
	        var _date = new Date(ms);
	        var year=_date.getFullYear(),
	            month=_date.getMonth()+1,
	            date=_date.getDate(),
	            hour=_date.getHours(),
	            minute=_date.getMinutes(),
	            second=_date.getSeconds();
	        return year+"-"+(month<10 ? ("0"+month) : month)+"-"+(date<10 ? ("0"+date) : date)+ 
	            (!day ? (" "+(hour<10 ? ("0"+hour) : hour)+":"+(minute<10?("0"+minute):minute)+":"+(second<10?("0"+second):second)) : ""); 
	    },
	    obj2Array:function(obj){
	    	if(!obj) return [];
	    	var arr=[];
	    	for(var i in obj){
	    		arr[i] = obj[i];
	    	}
	    	return arr;
	    },
	    getUnixTime:function(localTime){
	        return !localTime ? "" : new Date(localTime.replace(/-/g,'/')).getTime();
	    },
	    getUrlParam: function(key){
	        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
	        var r = window.location.search.substr(1).match(reg);
	        return r ? decodeURIComponent(r[2]) : "";
	    },
	    QNCropSuffix:function(url, width, height, type){
	      if(!url || url.length<5 || url.indexOf('imageView2')>-1 || !width) return url;
	      var qnSuffix = 'imageView2/'+(type?type:1)+'/w/'+width;
	      if(height) qnSuffix += '/h/'+height;

	      return url.indexOf('?')>-1?url+'&'+qnSuffix:url+'?'+qnSuffix;
	    },
	    alert:function(con,_callback){
	        var d = dialog({
	            title:"系统提示",
	            id:"util-alert",
	            fixed: true,
	            content: con,
	            width:300,
	            cancel: false,
	            okValue: '确定',
	            backdropOpacity:"0.3",
	            ok: function () {
	                if(_callback){
	                    _callback(d);
	                }
	            }
	        }).showModal();
	    },
	    confirm:function(con,okCallback,cancelCallback){
	        var d = dialog({
	            title:"系统提示",
	            id:"util-confirm",
	            fixed: true,
	            content: con,
	            width:300,
	            okValue: '确定',
	            cancelValue:'取消',
	            backdropOpacity:"0.3",
	            ok: okCallback,
	            cancel:cancelCallback ? cancelCallback : function(){}
	        }).showModal();
	    },
	    getCookie:function(name){
	    	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		    if(arr=document.cookie.match(reg))
	        return decodeURI(arr[2]); 
		    else 
	        return null; 
	    },
	    setCookie:function(name, value, days){
	    	var Days = days || 30; 
		    var exp = new Date(); 
		    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
		    document.cookie = name + "="+ encodeURI(value) + ";expires=" + exp.toGMTString(); 
	    },
	    delCookie:function(name){
	    	var exp = new Date(); 
		    exp.setTime(exp.getTime() - 1); 
		    var cval=this.getCookie(name); 
		    if(cval!==null){
		    	document.cookie= name + "="+cval+";expires="+exp.toGMTString();
		    } 
	    },
	    getStrLen:function(str){
			return (str && str.length>0)?str.replace(/[^\x00-\xff]/g,"**").length/2:0;
		}
	};
	
	// avalon过滤器扩展
	(function(){
	 	avalon.filters.parseNumber= function(v, num){
		    num = typeof(num)=='undefined'? 0 : num;
		    return /^[+-]?\d+(\.\d+)?$/.test(v)? (num===0?parseInt(v):parseFloat(v).toFixed(num)) : Number(0).toFixed(num);
		};
		avalon.filters.gender= function(v){
		    if(v==='0') return '未知';
		    return v==='1'?'男':'女';
		};
		avalon.filters.formatTime= function(v){
		    return Utils.getLocalTime(v);
		};
		avalon.filters.avatar = function(url, width){
		    width = width || 80;
		    if(!url || url.length<5) return GLOBAL_CONFIG.defaultAavatar;
		    return Utils.QNCropSuffix(url.split('?')[0], width);
		};
		avalon.filters.placeholderImg= function(url, type, width, height){
			// 统一处理一下图片：空则使用占位图，使用七牛后缀 type: product / avatar / video
		    width = width || 80;
		    var placeholderImg = '';
		    switch(type){
		        case 'product': placeholderImg = GLOBAL_CONFIG.defaultProduct; break;
		        case 'avatar': placeholderImg = GLOBAL_CONFIG.defaultAavatar; break;
		        case 'video': placeholderImg = GLOBAL_CONFIG.defaultVideo; break;
		        default: placeholderImg = GLOBAL_CONFIG.defaultProduct; break;
		    }

		    if(!url || url.length<5) return placeholderImg;
		    return Utils.QNCropSuffix(url.split('?')[0], width, height);
		};
		avalon.filters.createTags = function(tags){
		    var colors = ['default','primary','success','info','warning','danger','purple','inverse','pink'];
		    tags = tags.split(',').map(function(v){
		        var i = Math.floor(Math.random()*(8+1));
		        return '<span class="label label-'+colors[i]+'">'+v+'</span>';
		    });
		    return tags.join(' ');
		};
	})();

	// artTemplate模板扩展
	(function(){
		template.helper('dateFormat', function (date, format) {
		    if(!date) return '';
		    format = Utils.getLocalTime(date);
		    return format;
		});
		template.helper('dayFormat', function (date, format) {
		    if(date){
		        format = Utils.getLocalTime(date,true);
		        return format;
		    }
		    return '';
		});
		template.helper('toFixed2', function (data, format) {
		    if(data){
		        format = data.toFixed(2);
		        return format;
		    }
		    return '0.00';
		});
		template.helper('stringify', function (data, format) {
		    format = JSON.stringify(data);
		    return format;
		});
		template.helper('placeholderImg', function (data, format) {
		    var placeholderImg = '';
		    switch(format){
		        case 'product': placeholderImg = GLOBAL_CONFIG.defaultProduct; break;
		        case 'avatar': placeholderImg = GLOBAL_CONFIG.defaultAavatar; break;
		        case 'video': placeholderImg = GLOBAL_CONFIG.defaultVideo; break;
		        default: placeholderImg = GLOBAL_CONFIG.defaultProduct; break;
		    }
		    if(!data || data.length<5) return placeholderImg;
		    return data;
		});
		// 文本截取以...表示
		template.helper('truncate', function(data, len){
			if(!data || Utils.getStrLen(data)<len) return data;
			return data.substring(0,len)+'...';
		});

		// 添加七牛的图片截取后缀
		template.helper('img7N', function(data, w, h){
			if(!data || data.length<10 || (!w && !h)) return data;
			if(!h) h = w;
			if(data.indexOf('?')>-1){
				return data.split('?')[0]+'?imageView2/1/w/'+w+'/h/'+h;
			}
			return data+'?imageView2/1/w/'+w+'/h/'+h;
		})

		template.helper('getNewsTag', function(data){
			var t = ['资讯','案例','活动'];
			return t[data] ? t[data] : t;
		})
	})();
	
	// jquery扩展
	(function(){
		$.fn.navTab = $.fn.tabs=function(callback){
			return this.each(function(){
				$(this).children('li').on('click', 'a', function(){
					var _this = $(this);
					_this.parent().siblings('li').removeClass('active').end().addClass('active');
					(typeof callback === 'function') && callback(_this);
				});
			});
		};

		$.fn.setTheadFixed = function(options){
		    var o = $.extend({},options);
		    var s = $(this);
		    var tableTop = s.offset().top-(o.leaveTop ? o.leaveTop : 60),tableLeft = s.offset().left,tableWidth = s.width();
		    var h = '<table class="fixedTable table" style="left:'+tableLeft+'px;width:'+tableWidth+'px;top:'+(o.leaveTop ? o.leaveTop : 60)+'px;display:none;"><thead><tr>';
		    s.find("thead:first").find("th:visible").each(function(i,e){
		        h += '<th style="width:'+($(e).width()+16)+'px" class="'+($(e).attr("class")||"")+'">'+$(e).html()+'</th>';
		    });
		    h += '</tr></thead></table>';
		    $(".fixedTable.table").remove();
		    s.parent().append(h);
		    $(document).on("scroll",function(){
		        if($(document).scrollTop()>=tableTop){
		            $(".fixedTable.table").show();
		            if(o.fixedFn){
		                o.fixedFn();
		            }
		        }else{
		            $(".fixedTable.table").hide();
		            if(o.unfixedFn){
		                o.unfixedFn();
		            }
		        }
		    });
		};

		$.fn.singleImgUploader = function(options){
		    var _this = $(this);
		    require(["webuploader"],function(WebUploader){
		        var imgW = options.width || "160",
		            imgH = options.height || "160";

		        var uploader = WebUploader.create({
		            auto: true,
		            swf: '//res.qiakr.com/plugins/webuploader/Uploader.swf',
		            server: GLOBAL_CONFIG.uploadServer,
		            pick:{
		                id:_this[0],
		                multiple : false
		            },
		            // runtimeOrder : "flash",
		            duplicate : true,
		            accept: {
		                title: 'Images',
		                extensions: 'gif,jpg,jpeg,png',
		                mimeTypes: 'image/*'
		            },
		            formData : {
		                'token' : $('#uptoken').val()
		            },
		            compress : {
		                width: options.limitLarger ? 1600 : 800,
		                height: options.limitLarger ? 1600 : 800,
		                quality: 90,
		                allowMagnify: true,
		                crop: false,
		                preserveHeaders: true,
		                noCompressIfLarger: true,
		                // 单位字节，如果图片大小小于此值，不会采用压缩。
		                compressSize: options.limitLarger ? 1024*1024 : 300*1024
		            }
		        });
		        uploader.on("uploadStart",function(file){
		            _this.find(".webuploader-pick").addClass("uploading").append('<div class="progressBar"><div class="progress" style="width:0%"></div></div>');
		        }).on("uploadProgress",function(file,percentage){
		            _this.find(".progress").css("width",percentage*100+'%');
		        }).on("uploadSuccess",function(file,response){
		            var url = GLOBAL_CONFIG.cdn+response.hash+"?imageView2/1/w/"+imgW+"/h/"+imgH;
		            _this.css("background-image","url("+url+")").find(".webuploader-pick").removeClass("uploading").find(".progressBar").remove();
		            if(options.resultInput){
		                options.resultInput.val(GLOBAL_CONFIG.cdn+response.hash);
		            }
		            if(options.callback){
		                options.callback(GLOBAL_CONFIG.cdn+response.hash);
		            }
		        }).on("uploadError",function(){
		            Utils.alert("上传失败，请稍后再试或刷新页面重试");
		        }).on("error",function(msg){
		            Utils.alert(msg=="Q_TYPE_DENIED" ? "文件格式不正确" : msg);
		        });
		    });
		};

		$.fn.singleFileUploader = function(options){
		    var _this = $(this);
		    require(["webuploader"],function(WebUploader){
		    	var uploader = WebUploader.create({
			        auto: true,
			        swf: '//res.qiakr.com/plugins/webuploader/Uploader.swf',
			        server: GLOBAL_CONFIG.uploadServer,
			        // runtimeOrder : "flash",
			        pick:{
			            id:_this[0],
			            multiple : false
			        },
			        duplicate : true,
			        accept: {
			            title: 'File',
			            extensions : 'csv',
			            mimeTypes: 'text/csv'
			        },
			        // formData : {"json":'{"type":3,"ext":"csv"}'}
			        formData : {
			            'token' : $('#uptokenPrivate').val()
			        }
			    });
			    uploader.on("uploadStart",function(){
			        _this.find(".webuploader-pick").addClass("uploading").append('<div class="progressBar"><div class="progress" style="width:0%"></div></div>');
			    }).on("uploadProgress",function(file,percentage){
			        _this.find(".progress").css("width",percentage*100+'%');
			    }).on("uploadSuccess",function(file,response){
			        _this.find(".webuploader-pick").removeClass("uploading").find(".progressBar").remove();
			        var url = GLOBAL_CONFIG.cdnPrivate+response.hash;
			        $("#fileUrl").val(url);
			        $("#loadedFileName").html(file.name);
			        $(".submit").removeClass("disabled");
			    }).on("uploadError",function(){
			        Utils.alert("上传失败，请稍后再试或刷新页面重试");
			    }).on("error",function(msg){
			        Utils.alert(msg=="Q_TYPE_DENIED" ? "文件格式不正确，请上传.csv文件" : msg);
			    });
		    });
		};

		$.fn.serializeObject=function(){var result={};var extend=function(i,element){var node=result[element.name];if('undefined'!==typeof node&&node!==null){if($.isArray(node)){node.push(element.value)}else{result[element.name]=[node,element.value]}}else{result[element.name]=element.value}};$.each(this.serializeArray(),extend);return result};
	})();

	jQuery.browser={};(function(){jQuery.browser.msie=false; jQuery.browser.version=0;if(navigator.userAgent.match(/MSIE ([0-9]+)./)){ jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();

	window.Utils = Utils;
	return Utils;
});