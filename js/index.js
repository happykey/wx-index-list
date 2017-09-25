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

            },
            mounted:function () {
              var fileName;
              /*************** Html video script ***************/
              // var pathName = window.location.pathname;
              var objects = ['video', 'object'];
              for (var i = 0; i < objects.length; i++) {
                if ($(objects[i]).length > 0) {
                  $(objects[i]).wrap("<div class='embed-responsive embed-responsive-16by9'></div>");
                  $(objects[i]).addClass('embed-responsive-item');
                }
              }

              var num=0;
              var options = {
                controls: true,
                // url: 'https://v.storage.histomed.com/' + fileName.split('.')[0] + '.mp4',
                url: 'https://v.storage.histomed.com/video2017_09_01.mp4',//首次加载出现是最新一期的视频
                preload: true,
                autoplay: false,
                poster:'https://v.storage.histomed.com/poster.jpeg',
                type:'mp4'
              };
              var player = new QiniuPlayer("demo-video", options);

              //点击弹出详情页
              var click_num;
              var current_num;
              getDetail=function (n) {
                $(".part").fadeOut("slow",function () {
                  $("header").addClass("head-fix-top");
                  $(".intro").addClass("intro-relative").fadeIn();
                });
                cot.update(n);
                var click_url=document.getElementsByClassName("video")[n].getAttribute("href").substring(43,53);
                 click_num=Number((click_url.split("_")[0]+click_url.split("_")[1]+click_url.split("_")[2]));
                // console.log(click_num);

                //当前播放的视频的url
                var current_url=player.currentSrc().substring(36,46);

                 current_num=Number((current_url.split("_")[0]+current_url.split("_")[1]+current_url.split("_")[2]));
                // console.log(current_num)

                //点击跳转到对应时刻
                //只有播放的视频和详情页对应上了，点击详情页的对应时刻，视频才做定位跳转
                var $timeRange = $('.time-range');
                  $timeRange.on('click', function () {
                    if (current_num === click_num) {
                        var time = $(this)[0].innerText.split(':');
                        var timeRange = Number(time[0]) * 3600 + Number(time[1]) * 60 + Number(time[2]);
                        player.currentTime(timeRange, player);
                    }
                });
              };

                  var resource_video,resource_play;
                  player.ready(function () {
                    //点击头部视频，能对应控制下面小图标的播放情况
                    player.on("click",function () {
                      console.log("aa");
                      var src=player.currentSrc();
                       resource_video=src.substring(31,46);//video播放的链接
                       resource_play=$(".video").attr("href").substring(38,53);//按钮对应的链接
                          if(player.isPaused(player)){
                            $("[href*="+resource_video+"]").find(".img_play").removeClass("img_stop")
                          }else {
                            $("[href*="+resource_video+"]").find(".img_play").addClass("img_stop")
                          }
                    })
                  });


                  var aa=[];//定义一个空数组，存储当前播放视频的url
                  $(".video").on("click",function (e) {
                      e.preventDefault();
                      if(!$(this).find(".img_play").hasClass("img_stop")){
                          $(".video").find(".img_play").removeClass("img_stop");
                          $(this).find(".img_play").addClass("img_stop");
                          //下面的pathName、fileName主要是为下面player.src配置参数
                          var pathName = $(this).attr("href");
                          fileName = pathName.split('/')[pathName.split('/').length - 1];
                          /*****************************/
                          var current_src=$(this).attr("href").substring(38,53);//点击其他列表项的href
                          var src=player.currentSrc();
                          resource_video=src.substring(31,46);//当前，也就是鼠标未点击其他列表项，video播放的链接
                          aa.push(resource_video);
                          //把最初始的链接存进数组，以后后面点了其他列表时，去除数组第一个数做比较
                          if(aa[0]!=current_src){
                              num=0;
                              aa=[];
                          }
                          //当在同一个列表项点击多次时，只改变一次src值
                          if(num==0){
                              player.src('https://v.storage.histomed.com/' + fileName.split('.')[0] + '.mp4',player);
                          }
                          player.play(player);
                      }else {
                          $(this).find(".img_play").removeClass("img_stop")
                          player.pause(player);
                      }
                      num++;
                  });



              // wx.config({
              //   appId: 'wx3d217570b080c004',
              //   timestamp: sign.timestamp,
              //   nonceStr: sign.nonceStr,
              //   signature: sign.signature,
              //   jsApiList: [
              //     // 所有要调用的 API 都要加到这个列表中
              //     'onMenuShareTimeline',
              //     'onMenuShareAppMessage',
              //     'onMenuShareQQ'
              //   ]
              // });
              var shareTitle = '衡道医学病理直播课';
              var shareDesc = '衡道医学病理直播课视频回放-' + fileName.split('.')[0].substr(5);
              var shareLink = 'https://www.histomed.com/video-test/videos/' + fileName.split('.')[0] + '.html';
              var imageUrl = 'https://www.histomed.com/env.jpg';
// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
// 所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数>中。
//               wx.ready(function(){
//                 // 分享到朋友圈
//                 wx.onMenuShareTimeline({
//                   title: shareTitle, // 分享标题
//                   link: shareLink, // 分享链接
//                   imgUrl: imageUrl, // 分享图标
//                   success: function () {
//                     // 用户确认分享后执行的回调函数
//                   },
//                   cancel: function () {
//                     // 用户取消分享后执行的回调函数
//                   }
//                 });
//
//                 // 分享给朋友
//                 wx.onMenuShareAppMessage({
//                   title: shareTitle, // 分享标题
//                   desc: shareDesc, // 分享描述
//                   link: shareLink, // 分享链接
//                   imgUrl: imageUrl, // 分享图标
//                   success: function () {
//                     // 用户确认分享后执行的回调函数
//                   },
//                   cancel: function () {
//                     // 用户取消分享后执行的回调函数
//                   }
//                 });
//               });

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
              })
            });
          }
        })
      });
    });


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