define(['fileUploader','niceV','tagsinput','maxlength'], function(WebUploader){
	var CONF, pageVM, page, videoEditor;

	pageVM = avalon.define({
		$id:'videoCtrl',
		createData:{
			videoPic:'https://qncdn.qiakr.com/website/video_default_face.png',
			videoUrl:'',
			mainTitle:'',
			viceTitle:'',
			courseTag:'',
			teacher:'',
			duringTime:'',
			supplierLevel:'',
			courseFee:'',
			courseDescription:'',
			type:1,
			status:'2',
			id:'',
			gmtCreate:'',
			gmtUpdate:'',
			sort:0,
		}
	})

	CONF = {
		apiCreate:'/api/createQiakrVideo',
		apiUpdate:'/api/updateQiakrVideo',
		apiFileUp:'/api/fileUpload'
	}

	page = {
		init:function(){
			this.initComs();
			this.saveEv();
			this.sltChangeEv();
			this.frmValiEv();
		},
		initComs:function(){
		    var self = this;
		    $(".select2").select2();
		    $('.limit-num').maxlength({ threshold: 20 });
		    $('#courseTag').tagsinput();
		    $('#videoPicUploaderWrap').fileUploader({
		        thumbW:320,
		        thumbH:180,
		    });
		    videoEditor = KindEditor.create('#videoContentArea', {
		        width:'100%',
		        height:600,
		        items:['fontsize', 'forecolor', 'hilitecolor', 'bold','italic', 'underline', 'strikethrough', 'lineheight','fontname',  '|','imgUploader','table', 'hr', 'emoticons', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', '|', 'fullscreen'],
		        resizeType:1,
		        afterChange:function(){
		        	// pageVM.createData = this.html();
		        }
		    });
		},
		sltChangeEv:function(){
		    $('[name="type"]').on('change', function(){
		      pageVM.createData.type=$(this).val();
		    })

		    $('[name="supplierLevel"]').on('change', function(){
		      pageVM.createData.supplierLevel=$(this).val();
		    })
		},
		frmValiEv:function(){
			var self = this;

		    $('#videoFrm').on('valid.form', function(e, form){
		      var pms = $.extend({},pageVM.$model.createData), isCreate = typeof mainVM.$model.params.id === 'undefined';

		      // 处理一下标签连接符 courseTag supplierLevel
		      pms.courseTag = pms.courseTag ? pms.courseTag.split(',').join('_'):'';
		      pms.supplierLevel = $.isArray(pms.supplierLevel) ? pms.supplierLevel.join('_'):pms.supplierLevel;
		      //xss过滤
		      pms.courseDescription = avalon.filters.sanitize(pms.courseDescription);
		      var api = isCreate ? CONF.apiCreate : CONF.apiUpdate;
		      // 添加 更新ID
		      if(!isCreate) pms.qiakrVideoId = pms.id;
		      // 去掉七牛后缀
		      pms.videoPic = pms.videoPic.split('?')[0];
		     
		     console.log(pms);
		     return;
		      $.post(api,pms).done(function(data){
		        if(data.status==='0'){
		          swal({   
		            title: "干的漂亮！",   
		            text: isCreate ? "添加教程成功 :)":'修改教程成功 :)',   
		            type: "success",   
		            showCancelButton: true,   
		            confirmButtonColor: "#DD6B55",   
		            confirmButtonText: "去列表看看",   
		            cancelButtonText: isCreate ? "继续添加":'取消',   
		            closeOnConfirm: true,   
		            closeOnCancel: true 
		            }, function(isConfirm){   
		              if (isConfirm) {     
		                avalon.router.navigate('/video/list');
		                p_main.getListData();
		              } else {     
		                isCreate && p_main.frmReset();  
		              } 
		          });
		        }
		      }).fail(function(data){
		        toastr.error(data.message || '服务器繁忙，请尝试重新提交！');
		      });

		    });
		},
		saveEv:function(){
			$('#btnCreateVideo').click(function(e){
				$('#videoFrm').trigger("validate");
				e.preventDefault();
			});
		}
	}

	return {
		init: function(){
			page.init();
			avalon.scan();
		}
	}
});


// avalon.filters.getPageName = function(v){
//   return subPageName[v] || '';
// };

// avalon.filters.splitLevel = function(levels){
//   return levels.split('_').join('<br>');
// }
// avalon.filters.leveljoin = function(levels){
//   return levels.split('_').join('、');
// }

// pageVM = avalon.define({
//   $id:'mainCtr',
//   createData:{
//     videoPic:'https://qncdn.qiakr.com/website/video_default_face.png',
//     videoUrl:'',
//     mainTitle:'',
//     viceTitle:'',
//     courseTag:'',
//     teacher:'',
//     duringTime:'',
//     supplierLevel:'',
//     courseFee:'',
//     courseDescription:'',
//     type:1,
//     status:'2',
//     id:'',
//     gmtCreate:'',
//     gmtUpdate:'',
//     sort:0,
//   },
//   previewData:{},
//   createEv:function(e,id){/* 新增 或 修改 */
//     var _this = $(this);
//     $('#videoFrm').trigger("validate");
//     e.preventDefault();
//   },
//   editEv:function(e, id){/*编辑*/
//     e.preventDefault();
//     var editData = mainVM.listData.filter(function(v){
//       if(v.id == id)
//         return v;
//     })[0];

//     mainVM.createData = $.extend({}, editData.$model);

//     // 设置slt的值 
//     $('[name="type"]').val(mainVM.$model.createData.type).trigger('change');
//     var levels = mainVM.$model.createData.supplierLevel.split('_');

//     $('[name="supplierLevel"]').val(levels).trigger('change');

//     // 设置summernote的值
//     $('#summernote').summernote('code',mainVM.$model.createData.courseDescription);
//     $('#courseTag').tagsinput('add',mainVM.$model.createData.courseTag.split('_').join(','));

//     avalon.router.navigate('/video/edit/'+id);
//   }
// });

// mainVM.$watch('subPage', function(page){
//   if(page=='create'){
//     p_main && p_main.frmReset && p_main.frmReset();
//   }else if(page == 'list'){
//     p_main && p_main.getListData && p_main.getListData();
//   }
// });

// p_main = {
//   initVideo:function(){
//     this.initComs();
//     this.sltChangeEv();
//     this.frmValiEv();

//     this.typeChangeEv();
//     this.getListData();
//     this.initUploader();
//   },
//   typeChangeEv:function(){
//     var self = this;
//     $('#supplierLevelBox a').on('click',function(e){
//       mainVM.searchPms.type = $(this).data('filter');
//       $(this).addClass('current').siblings().removeClass('current');
//       self.getListData();
//     })
//   },
//   frmValiEv:function(){/*注册表单验证事件*/
//     var self = this;
//     $('#videoFrm').on('valid.form', function(e, form){
//       //这里判断，是否有id，有则为修改， 没有则为新增
//       // 判断是 新增 还是 更新
//       // 保存至服务器
//       var pms = $.extend({},mainVM.$model.createData), isCreate = typeof mainVM.$model.params.id === 'undefined';

//       // 处理一下标签连接符 courseTag supplierLevel
//       pms.courseTag = pms.courseTag ? pms.courseTag.split(',').join('_'):'';
//       pms.supplierLevel = $.isArray(pms.supplierLevel) ? pms.supplierLevel.join('_'):pms.supplierLevel;
//       //xss过滤
//       pms.courseDescription = avalon.filters.sanitize(pms.courseDescription);
//       var api = isCreate ? CONFIG.apiCreate : CONFIG.apiUpdate;
//       // 添加 更新ID
//       if(!isCreate) pms.qiakrVideoId = pms.id;
//       // 去掉七牛后缀
//       pms.videoPic = pms.videoPic.split('?')[0];
     
//       $.post(api,pms).done(function(data){
//         if(data.status==='0'){
//           swal({   
//             title: "干的漂亮！",   
//             text: isCreate ? "添加教程成功 :)":'修改教程成功 :)',   
//             type: "success",   
//             showCancelButton: true,   
//             confirmButtonColor: "#DD6B55",   
//             confirmButtonText: "去列表看看",   
//             cancelButtonText: isCreate ? "继续添加":'取消',   
//             closeOnConfirm: true,   
//             closeOnCancel: true 
//             }, function(isConfirm){   
//               if (isConfirm) {     
//                 avalon.router.navigate('/video/list');
//                 p_main.getListData();
//               } else {     
//                 isCreate && p_main.frmReset();  
//               } 
//           });
//         }
//       }).fail(function(data){
//         toastr.error(data.message || '服务器繁忙，请尝试重新提交！');
//       });

//     });
//   },
//   frmReset:function(){
//     mainVM.createData.videoPic='https://qncdn.qiakr.com/website/video_default_face.png';
//     mainVM.createData.videoUrl='';
//     mainVM.createData.mainTitle='';
//     mainVM.createData.viceTitle='';
//     mainVM.createData.courseTag='';
//     mainVM.createData.teacher='';
//     mainVM.createData.duringTime='';
//     mainVM.createData.supplierLevel='';
//     mainVM.createData.courseFee='';
//     mainVM.createData.courseDescription='';
//     mainVM.createData.type=1;
//     mainVM.createData.status='2';
//     mainVM.createData.id='';
//     mainVM.createData.gmtCreate='';
//     mainVM.createData.gmtUpdate='';
//     $('#summernote').summernote('code','');
//     $('#courseTag').tagsinput('removeAll');
//     $('[name="supplierLevel"]').val([]).trigger('change');
//   },
//   uploadImg4sum:function(files, editor){
//       var data = new FormData(),filesArr=[],$sum=$('#summernote');

//       data.append("file", files[0]);
//       $.ajax({
//           data: data,
//           type: "POST",
//           url: CONFIG.apiFileUp,
//           cache: false,
//           contentType: false,
//           processData: false,
//           success: function(data) {
//             console.log(data);
//             if(data.status==='0'){
//               $sum.summernote('insertImage', data.result.url);
//             }else{
//               toastr('上传图片失败！');
//             }
//           }
//       });
//   },
//   initComs:function(){
//     var self = this;
//     $(".select2").select2();
//     $('.limit-num').maxlength({ threshold: 20 });
//     $('#courseTag').tagsinput();
//     $('#summernote').summernote({
//       lang: 'zh-CN',
//       placeholder: '视频详情内容...',
//       minHeight: 350,
//       maxHeight: 800,
//       focus: false,
//       callbacks: {
//         onImageUpload: function(files) {
//           self.uploadImg4sum(files);
//         },
//         onChange:function(contents, $editable){
//           if(contents.lenght>2000){
//             toastr.warning('描述信息输入过长，请小于2千个字符！');
//           }
//           mainVM.createData.courseDescription = avalon.filters.sanitize(contents).substring(0, 2001);
//         }
//       }
//     });
//   },
//   sltChangeEv:function(){
//     $('[name="type"]').on('change', function(){
//       mainVM.createData.type=$(this).val();
//     })

//     $('[name="supplierLevel"]').on('change', function(){
//       mainVM.createData.supplierLevel=$(this).val();
//     })
//   },
//   initUploader:function(){
//     setTimeout(function(){
//       $('#videoPicUploaderWrap').fileUploader({
//         thumbW:320,
//         thumbH:180,
//       });
//     }, 200);
//   }
// }

// return {
//   init:function(){
//     p_main.init();
//   }
// };

// });