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
                // update: function (x) {
                //     this.num = x;
                // }
            }
        })

        //分页
        // var page = new Vue({
        //     el:"#change",
        //     data: {
        //         flag: 1 //切换列表页后按钮的样式改变
        //     },
        //     methods: {
        //         select: function (num) {
        //             this.flag = num
        //         },
        //         getNum:function (x) {
        //             ctc.update(x)
        //         }
        //     }
        // })
    })

    //分页
    $("#change i").eq(0).addClass("select")//刷新时首先加载的是第一个圈的样式
    $("#change i").click(function(){
        $(this).addClass("select").siblings().removeClass("select");
        var wid=parseInt($('.content').css("width"));
        var i=parseInt($(this).index());
        var len=-parseInt(wid*i);
        // console.log(wid,i);
        switch (i){
            case 0:
                $("ul").css({
                    "transform":"translateX(0px)",
                    "transition":"transform 0.5s linear"
                });
                    break;
            case 1:
                $("ul").css({
                    "transform":"translateX("+len+"px)",
                    "transition":"transform 0.5s linear"
                });
                    break;
            case 2:
                $("ul").css({
                    "transform":"translateX("+len+"px)",
                    "transition":"transform 0.5s linear"
                });
                    break;
        }
    })
})