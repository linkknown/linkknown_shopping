// 已经提取到公共文件 header.js
// $(window).scroll(function() {
//     // 为了保证兼容性，这里取两个值，哪个有值取哪一个
//     // scrollTop就是触发滚轮事件时滚轮的高度
//     var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//     if (scrollTop < 20) {
//         $("nav").addClass("nav_theme_default");
//         $("nav").removeClass("nav_theme_white");
//     } else {
//         $("nav").addClass("nav_theme_white");
//         $("nav").removeClass("nav_theme_default");
//     }
// })
//
//
// $(".header_icon").click(function () {
//     window.location.href = "/user/index";
// });
//
// $(".gotoCart").click(function () {
//     if (checkHasLogin()) {
//         window.location.href = "/cart/detail";
//     } else {
//         window.location.href = "/user/login";
//     }
// });


$("#quick_login .right .close").click(function () {
    $("#quick_login").hide(1);
});

// 加载热门商品
initHotGood();

function initHotGood () {
    $.ajax({
        url: '/good/query_hot_good',
        method: 'post',
        data: {},
        success: function (result) {
            if (result.status === "SUCCESS") {
                // 获取模板节点
                var $templateNode = $(".good_type_hot li:eq(0)");

                var htmlStr = "";
                result.data.goods.forEach(function (good) {

                    $templateNode.find(".good_info .good_id").html(good.id);
                    $templateNode.find(".good_info .good_name").html(good.goodName);
                    $templateNode.find(".good_image").attr("src", good.goodImages.split(",")[0]);
                    $templateNode.find(".good_info .good_price").html("¥ " + good.goodPrice);
                    $templateNode.find(".good_info .good_desc").html(good.goodDesc);
                    $templateNode.find(".good_hidden .good_desc_hidden").html(good.goodDesc);
                    $templateNode.find(".good_info .buy_number").html(good.buyNumber);

                    htmlStr += $templateNode.prop('outerHTML');
                });
                $(".good_type_hot").html(htmlStr);
                $(".good_type_hot li").css('display', 'inline');

                // 添加点击事件
                $(".good_type_hot li").click(function () {
                    let good_id = $(this).find(".good_info .good_id").html();
                    showGoodDetail(good_id);
                });
            }
        }
    });
}

function showGoodDetail (good_id) {
    window.location.href = "/good/detail?good_id=" + good_id;
}
