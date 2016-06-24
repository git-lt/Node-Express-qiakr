require.config({
  baseUrl:'/home_admin/modules',
  paths: {
    utils:'qk.utils',
    jquery: "//res.qiakr.com/plugins/jquery/jquery-2.0.0.min",
    mmRouter:"//res.qiakr.com/plugins/avalon/mmRouter.min",
    mmHistory:"//res.qiakr.com/plugins/avalon/mmHistory.min",
    cookie: "//res.qiakr.com/plugins/jquery/jquery.cookie.min",
    common:'//res.qiakr.com/plugins/admin/qk.common-1.0.0.min',
    bootstrap: "//res.qiakr.com/plugins/bootstrap/bootstrap3.0.3.min",
    select2:'//res.qiakr.com/plugins/select2/select2-4.0.3.min',
    select2_3:'//res.qiakr.com/plugins/select2/select2-3.5.2.min',
    avalon:"//res.qiakr.com/plugins/avalon/avalon.shim.min",
    moment:'//res.qiakr.com/plugins/moment/moment-2.10.6.min',
    maxlength:"//res.qiakr.com/plugins/bootstrap/bootstrap-maxlength.min",
    tagsinput:"//res.qiakr.com/plugins/bootstrap/bootstrap-tagsinput.min",
    webuploader: "//res.qiakr.com/plugins/webuploader/webuploader-0.1.5.min",
    daterangepicker: "//res.qiakr.com/plugins/daterangepicker/daterangepicker.min",
    niceV:'//res.qiakr.com/plugins/validator/jquery.validator-0.7.3.min',
    validate:'//res.qiakr.com/plugins/validate/jquery.validate.min',
    toastr : "//res.qiakr.com/plugins/toastr/toastr",
    swiper:'//res.qiakr.com/plugins/swiper/swiper-3.0.7.min',
    charcount:'//res.qiakr.com/plugins/charcount/jquery.charcount.min',
    qrcode:'//res.qiakr.com/plugins/qrcode/qrcode.min',
    kindeditor:'//res.qiakr.com/plugins/kindeditor/kindeditor-full.min',
    dialog: "//res.qiakr.com/plugins/dialog/dialog-6.0.5.min",
    template: "//res.qiakr.com/plugins/artTemplate/artTemplate.min",
    datePicker:'//res.qiakr.com/plugins/datePicker/jquery.datePicker.min',
    xss:'//res.qiakr.com/plugins/xss/xss.min',

    fileUploader: 'c-fileUploader'
  },
  shim:{
    bootstrap: {deps:['jquery']},
    common:{deps:['jquery']},
    cookie:{deps:['jquery']},
    select2:{deps:['jquery']},
    select2_3:{deps:['jquery']},
    niceV:{deps:['jquery']},
    validate:{deps:['jquery']},
    maxlength:{deps:['jquery']},
    tagsinput:{deps:['jquery']},
    summernote:{deps:['jquery']},
    jqueryui:{deps:['jquery']},
    charcount:{deps:['jquery']},
    kindeditor:{deps:['webuploader']},
    daterangepicker:{deps:['jquery']},
    dialog: {deps:['jquery']},
  },
  debug:true,
  charset: 'utf-8'
});


/**
 * GLOBAL CONFIG
 */
var GLOBAL_CONFIG={
  host:location.hostname.indexOf("qiakr") >-1 ? "http://"+location.hostname+"/" : "http://"+location.hostname+"/xmall/",
  cdn:"https://qncdn.qiakr.com/",
  cdnPrivate:"http://export.qiakr.com/",
  uploadServer:location.protocol==="https:" ? 'https://up.qbox.me/' : 'http://up.qiniu.com/',
  defaultAavatar:'https://qncdn.qiakr.com/mall/default-photo.png',
  defaultProduct:'https://qncdn.qiakr.com/admin/placeholer_300x300.gif',
  defaultVideo:'https://qncdn.qiakr.com/website/video_pic_ph.jpg',
};

var ERRMSG={
  '100':'服务器繁忙，请稍候再试!'
};



