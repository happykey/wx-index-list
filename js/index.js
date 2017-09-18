var cot;
$(document).ready(function () {
    //列表渲染
    $.getJSON("./data/data.json",function (data) {
        var  ctc = new Vue({
            el:"#page__bd",
            data:{
                num: '3',
                content:data.list
            },
            methods:{
              getDetail:function (n) {
                $(".part").fadeOut("slow",function () {
                  $("header").addClass("head-fix-top");
                  $(".intro").addClass("intro-relative").fadeIn();
                });
                cot.update(n)
              }
            },
            mounted:function () {

                $(".img_play").click(function(){
                  $(this).toggleClass("img_stop")
                }),

                $(".video").on("click",function (e) {
                  e.preventDefault();
                  /*************** Html video script ***************/
                  var objects = ['video', 'object'];
                  for (var i = 0; i < objects.length; i++) {
                    if ($(objects[i]).length > 0) {
                      $(objects[i]).wrap("<div class='embed-responsive embed-responsive-16by9'></div>");
                      $(objects[i]).addClass('embed-responsive-item');
                    }
                  }
                  var pathName = $(this).attr("href")
                  // var pathName = window.location.pathname;
                  var fileName = pathName.split('/')[pathName.split('/').length - 1]

                  //点击小图标触发视频的点击时间
                  /*
                  *
                  * */
                  /*************** QiniuPlayer script ***************/
                  var options = {
                    controls: true,
                    url: 'https://v.storage.histomed.com/' + fileName.split('.')[0] + '.mp4',
                    preload: true,
                    autoplay: false,
                    poster:'https://v.storage.histomed.com/poster.jpeg',
                    type:'mp4',
                  };
                  var player = new QiniuPlayer('demo-video', options);
                  var $timeRange = $('.time-range');
                  $timeRange.on('click', function () {
                    // console.log("aa")
                    var time = $(this)[0].innerText.split(':');
                    var timeRange = Number(time[0]) * 3600 + Number(time[1]) * 60 + Number(time[2])
                    player.currentTime(timeRange, player);
                  });
                  wx.config({
                    appId: 'wx3d217570b080c004',
                    timestamp: sign.timestamp,
                    nonceStr: sign.nonceStr,
                    signature: sign.signature,
                    jsApiList: [
                      // 所有要调用的 API 都要加到这个列表中
                      'onMenuShareTimeline',
                      'onMenuShareAppMessage',
                      'onMenuShareQQ'
                    ]
                  });

                  var shareTitle = '衡道医学病理直播课';
                  var shareDesc = '衡道医学病理直播课视频回放-' + fileName.split('.')[0].substr(5);
                  var shareLink = 'https://www.histomed.com/video-test/videos/' + fileName.split('.')[0] + '.html';
                  var imageUrl = 'https://www.histomed.com/env.jpg';

// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
// 所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数>中。
                  wx.ready(function(){

                    // 分享到朋友圈
                    wx.onMenuShareTimeline({
                      title: shareTitle, // 分享标题
                      link: shareLink, // 分享链接
                      imgUrl: imageUrl, // 分享图标
                      success: function () {
                        // 用户确认分享后执行的回调函数
                      },
                      cancel: function () {
                        // 用户取消分享后执行的回调函数
                      }
                    });

                    // 分享给朋友
                    wx.onMenuShareAppMessage({
                      title: shareTitle, // 分享标题
                      desc: shareDesc, // 分享描述
                      link: shareLink, // 分享链接
                      imgUrl: imageUrl, // 分享图标
                      success: function () {
                        // 用户确认分享后执行的回调函数
                      },
                      cancel: function () {
                        // 用户取消分享后执行的回调函数
                      }
                    });
                  });


                })
            }
        });
      //点击列表显示对应的detail信息
      $.getJSON("./data/details.json", function (data) {
        cot = new Vue({
          el:".intro",
          data:{
            i:0,
            detaile:data.page
          },
          methods:{
            update:function (n) {
              this.i=n //n为父级列表项点击对应的index值
            }
          },
          mounted:function () {
            //点击详情页显示列表页
            $(".head").click(function () {
              $(".intro").fadeOut("slow",function () {
                $(".part").fadeIn();
                $("header").removeClass("head-fix-top");
                $(".intro").removeClass("intro-relative");
              });
            });
            $(".time-range").click(function () {
            })
          }
        })
      });
    })

    //分页
    $("#change i").eq(0).addClass("select")//刷新时首先加载的是第一个圈的样式
    $("#change i").click(function(){
        $(this).addClass("select").siblings().removeClass("select");
        var wid=parseInt($('.content_0').css("width"));
        var i=parseInt($(this).index());
        var len=-parseInt(wid*i);
        // console.log(wid,i);
        switch (i){
            case 0:
                $(".info ul").css({
                    "transform":"translateX(0px)",
                    "transition":"transform 0.5s linear"
                });
                    break;
            case 1:
                $(".info ul").css({
                    "transform":"translateX("+len+"px)",
                    "transition":"transform 0.5s linear"
                });
                    break;
            case 2:
                $(".info ul").css({
                    "transform":"translateX("+len+"px)",
                    "transition":"transform 0.5s linear"
                });
                    break;
            case 3:
              $(".info ul").css({
                "transform":"translateX("+len+"px)",
                "transition":"transform 0.5s linear"
              });
              break;
        }
    })

})