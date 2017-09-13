$(document).ready(function () {
    var windowHeight = $(window).height(),
        $body = $("body");
    $body.css("height", windowHeight);
    $("body").on("touchstart", function(e) {
        //手指放在屏幕时触发
        //  e.preventDefault();
            startX = e.originalEvent.changedTouches[0].pageX,
            startY = e.originalEvent.changedTouches[0].pageY;
    });
    $("body").on("touchend", function(e){

        //手指离开屏幕时触发
        //  e.preventDefault();
            moveEndX = e.originalEvent.changedTouches[0].pageX,
            moveEndY = e.originalEvent.changedTouches[0].pageY,
            X = moveEndX - startX,
            Y = moveEndY - startY;

            if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {
                //向右滑动
                // alert("left 2 right");
                $("[class=select]").prev().trigger("click");
            } else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
                //向左滑动
                // alert("right 2 left");
                    $("[class=select]").next().trigger("click");
            }
    });
})

