$(window).scroll(function() {
    // 为了保证兼容性，这里取两个值，哪个有值取哪一个
    // scrollTop就是触发滚轮事件时滚轮的高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop < 20) {
        $("nav").addClass("nav_theme_default");
        $("nav").removeClass("nav_theme_white");
    } else {
        $("nav").addClass("nav_theme_white");
        $("nav").removeClass("nav_theme_default");
    }
});

$(".site_label").click(function () {
    window.location.href = "/";
});

$(".header_icon").click(function () {
    window.location.href = "/user/index";
});

$(".gotoCart").click(function () {
    if (checkHasLogin()) {
        window.location.href = "/cart/detail";
    } else {
        window.location.href = "/user/login";
    }
});

$(".gotoOrderList").click(function () {
    if (checkHasLogin()) {
        window.location.href = "/order/list";
    } else {
        window.location.href = "/user/login";
    }
});