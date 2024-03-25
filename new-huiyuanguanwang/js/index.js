
$(function () {

    $('#itcast').fullpage({

        navigation: true,
        // navigationPosition:screenLeft,
        // sectionsColor: ['#f9dd67', '#84a2d4', '#ef674d', '#ffeedd', '#cf4759',],
        afterLoad: function (a, index) {
            // $.fn.fullpage.moveTo(4);
            if (index == 1) {
                $('.nav1').css({ "font-weight": "600", 'font-size': '1.25rem' }).siblings('li').css({ "font-weight": "400", 'font-size': '1rem' });
            } else if (index == 2) {
                $('.nav2').css({ "font-weight": "600", 'font-size': '1.25rem' }).siblings('li').css({ "font-weight": "400", 'font-size': '1rem' });
            } else if (index == 3) {
                $('.nav2').css({ "font-weight": "600", 'font-size': '1.25rem' }).siblings('li').css({ "font-weight": "400", 'font-size': '1rem' });
            } else if (index == 4) {
                $('.nav3').css({ "font-weight": "600", 'font-size': '1.25rem' }).siblings('li').css({ "font-weight": "400", 'font-size': '1rem' });
            } else {
                $('.nav4').css({ "font-weight": "600", 'font-size': '1.25rem' }).siblings('li').css({ "font-weight": "400", 'font-size': '1rem' });
            }
        }
    });
    $('.nav1').click(function () {
        $(this).css({ "font-weight": "600", 'font-size': '1.25rem' }).siblings('li').css({ "font-weight": "400", 'font-size': '1rem' });
        $.fn.fullpage.moveTo(1);
    })
    $('.nav2').click(function () {
        $(this).css({ "font-weight": "600", 'font-size': '1.25rem' }).siblings('li').css({ "font-weight": "400", 'font-size': '1rem' });
        $.fn.fullpage.moveTo(2);

    })
    $('.nav3').click(function () {
        $(this).css({ "font-weight": "600", 'font-size': '1.25rem' }).siblings('li').css({ "font-weight": "400", 'font-size': '1rem' });
        $.fn.fullpage.moveTo(4);

    })
    $('.nav4').click(function () {
        $(this).css({ "font-weight": "600", 'font-size': '1.25rem' }).siblings('li').css({ "font-weight": "400", 'font-size': '1rem' });
        $.fn.fullpage.moveTo(5);

    })

    $(".address").click(function () {
        window.location.href = "http://beian.miit.gov.cn"
    });


    $(".section1-button").on({
        mouseover: function () {
           //鼠标移入回调
            $(".exhibition").show();
        },
        mouseout: function () {
            //鼠标移出回调
            $(".exhibition").hide();
        }
    });
    $(".section1-buttons").on({
        mouseover: function () {
           //鼠标移入回调
            $(".exhibitions").show();
        },
        mouseout: function () {
            //鼠标移出回调
            $(".exhibitions").hide();
        }
    });


})


var i=0,timer;
var sum = $(".image li").length;
$(function(){
    $(".image li").eq(0).show();
    
    $(".box").hover(function(){
        $(".arrow").show();
        clearInterval(timer);
    },function(){
        $(".arrow").hide();
        iLunbo();
    })
    iLunbo();
    
    $(".arrow").hover(function(){
        clearInterval(timer);
    });
    /*左箭头控制轮播*/
    $(".left").click(function(){
        clearInterval(timer);
        if(i==0){
            i=sum;
        }
        i--;
        startLunbo();
        iLunbo();
    });
    
    /*右箭头控制轮播*/
    $(".right").click(function(){
        clearInterval(timer);
        if(i==sum-1){
            i=-1;
        }
        i++;
        startLunbo();
        iLunbo();
    });
    
    /*提示信息变换*/
    $(".num>li").hover(function(){
        clearInterval(timer);
        i=$(this).index();
        console.log(i);
        startLunbo();
    });
});

/*自动轮播*/
function iLunbo(){
    timer = setInterval(function(){
        i++;
        if(i==sum-1){
            i=-1;
        }
        startLunbo();
    },2000)
}

/*图片轮播和提示信息*/
function startLunbo(){
    if(i==6){
        i=0;
    }
    $(".image>li").eq(i).fadeIn().siblings().fadeOut();
    $(".num>li").eq(i).addClass("current").siblings().removeClass("current");
}

function aa() {
    var lIndex = 0;
    $(".r-arr").click(function () {
        // 当被点击时，执行下面事件

        if (lIndex < 4) {
            lIndex++; // lIndex = lIndex + 1;
        } else {
            lIndex = 0;
        }

        // (lIndex<4)?(lIndex++):(lIndex=0);


        $(".but ul li").eq(lIndex).addClass("hover").siblings().removeClass("hover");
        $(".pic img").eq(lIndex).fadeIn().siblings().fadeOut(); // 选中除了前面的图片的其他所有图片让其隐藏;fadeIn,fadeOut(慢慢淡入淡出)
    });


    $(".l-arr").click(function () {
        if (lIndex > 0) {
            lIndex--;
        } else {
            lIndex = 4;
        }
        $(".but ul li").eq(lIndex).addClass("hover").siblings().removeClass("hover");
        $(".pic img").eq(lIndex).fadeIn().siblings().fadeOut(); // siblings().hide选中除了前面的图片的其他所有图片让其隐藏;fadeIn,fadeOut(慢慢淡入淡出默认400毫秒；可以fadeOut（300）自己定义)
    });


    $(".but ul li").click(function () {
        $(this).addClass("hover").siblings().removeClass("hover");
        var nIndex = $(this).index();
        $(".pic img").eq(nIndex).fadeIn(300).siblings().fadeOut(300);
        lIndex = nIndex;
    });


    function dingshi() {
        setInterval(function () {
            (lIndex < 4) ? (lIndex++) : (lIndex = 0);
            $(".but ul li").eq(lIndex).addClass("hover").siblings().removeClass("hover");
            $(".pic img").eq(lIndex).fadeIn().siblings().fadeOut();
        }, 1600);
    };
    dingshi(); //执行
}

aa()



