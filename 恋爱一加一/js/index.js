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

})