/**
 * [项目启动文件]
 */
define(function(){
  var CONF, pageVM, page;

  CONF={
    apiGetList:'/api/video/getList',
    apiDelete:'/api/video/del',
    apiUpdateStatus: '/api/videl/updateStatus'
  }

  page = {
    init:function(){
      this.tabEv();
      this.delEv();
      this.pubAndCancelEv();

      this.getListData();
    },
    tabEv:function(){
      var _this = this;
      $('#supplierLevelBox').on('click', 'a', function(){
        var $this = $(this);
        if(!$this.hasClass('current')){
          $this.addClass('current').siblings().removeClass('current');
          _this.getListData();
        }
      })
    },
    getListData:function(){
      var pms = {
        index: 0,
        length: 20,
        tag:$('#supplierLevelBox a.current').data('tag')+'',
      }

      var $tbdBox = $('#videosTbd'),
          $pageBox = $('#videosPagesNumBox'),
          $tblBox = $('#videosTbl'),
          tplId = 'videosTblListTpl',
          $total = $('#videosTblTotal'),
          url = CONF.apiGetList;

      $tblBox.uiLoading('lg');

      $.post(url, pms)
        .done(function(data){
          if(data.status==='0'){
            var listData = data.result.voList,
                count = data.result.count;

            $total.text(count);

            if(count>0){
              $tbdBox.html(template(tplId, {data: listData}));

              $pageBox.pagination({
                totalData:count,
                showData:30,
                coping:true,
                callback:function(i){
                  pms.index = (i-1)*pms.length;
                  $tbl.uiLoading('lg');

                  $.post(url, pms)
                    .done(function(data){
                      $tbdBox.html(template(tplId, {data: data.result.voList}));
                      $tbl.uiLoading('lg');
                    });
                }
              });
            }else{
              $tbdBox.html('<tr><td colspan="7"><p class="p20 c-8 text-center"> 未查询到相关数据 </p></td></tr>');
              $pageBox.html('');
            }
          }else{
            toastr.error(data.errmsg || ERRMSG['100']);
          }
        })
        .always(function(){
          $tblBox.uiLoading('lg');
        })
    },
    delEv:function(){
      $('#videosTbd').on('click', '.delete', function(){
        var id = $(this).data('id');
        var $tr = $(this).closest('tr');

        Util.confirm("是否确认删除？",function(){
          $.post(CONF.apiDelete, {id:id})
            .done(function(data){
              if(data.status === '0'){
                toastr.success('操作成功');
                $tr.fadeOut(function(){
                  $tr.remove();
                });
              }else{
                toastr.error(data.errmsg || ERRMSG['100']);
              }
            })
        });

      })
    },
    pubAndCancelEv:function(){
      $('#videosTbd').on('click', '.publish', function(){
        var $this = $(this);
        var id = $this.data('id');
        var status = $this.data('status');
        var isPub = status === 2;

        status = status === 2 ? 1 :  2;

        $.post(CONF.apiUpdateStatus, {id:id, status:status+''})
          .done(function(data){
            if(data.status === '0'){
              toastr.success(isPub?'发布成功':'取消成功');
              $this.text(isPub ? '取消发布': '发布上线');
            }else{
              toastr.error(data.errmsg || ERRMSG['100']);
            }
          })
      })
    }
  }

  return {
    init: function(){
      page.init();
    }
  }


})


