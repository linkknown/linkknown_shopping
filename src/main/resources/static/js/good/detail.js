// 加载最近浏览商品信息
initRecentlyView();

// 加载当前商品信息
initGoodInfo();

function initRecentlyView () {
    $.ajax({
        url: '/good/recently_view',
        method: 'post',
        data: {},
        success: function (result) {
            if (result.status === "SUCCESS") {
                var htmlStr = "";
                result.data.goods.forEach(function (good, index) {
                    htmlStr += "<li>"
                        + "<div style='position: relative;'>"
                                + "<span class='good_id' hidden>" + good.id + "</span>"
                                + "<img src='" + good.goodImages.split(",")[0] + "' style='vertical-align: bottom;'/>"
                                + "<div class='good_price' style='vertical-align: bottom;'> ¥ " + good.goodPrice + "</div>"
                            + "</div>\n"
                            + "<div class='good_name'>" + good.goodName + "</div>"
                        + "</li>"
                });
                $("ul.recently_view").html(htmlStr);

                // 添加点击事件
                $("ul.recently_view li").click(function () {
                    let good_id = $(this).find(".good_id").html();
                    showGoodDetail(good_id);
                });
            }
        }
    });
}

function showGoodDetail (good_id) {
    window.location.href = "/good/detail?good_id=" + good_id;
}

function initGoodInfo () {
    let good_id = $("#good_id").html();

    $.ajax({
        url: '/good/get_good_info',
        method: 'post',
        data: {good_id: good_id},       // 与等价 {good_id}
        success: function (result) {
            if (result.status === "SUCCESS") {
                // 显示商品信息
                showGoodInfo(result.data.good);
            }
        }
    });
}

// 显示商品信息
function showGoodInfo(good) {
    let good_images = good.goodImages.split(",");
    $(".good_main_info .good_image img").attr('src', good_images[0]);

    $(".good_main_info .good_images ul li").each(function (index, liNode) {
        if (index < good_images.length) {
            $(liNode).find("img").attr('src', good_images[index]);
        } else {
            $(liNode).remove();
        }
    });

    $(".good_main_info .good_name").html(good.goodName);
    $(".good_main_info .good_price").html("¥ " + good.goodPrice);
    $(".good_main_info .good_desc").html(good.goodDesc);

    $(".good_main_info").show();
}

$(".operate_add").click(function () {
    var buy_amount = $(".good_main_info > div:nth-child(2) .buy_amount input").val();
    $(".good_main_info > div:nth-child(2) .buy_amount input").val(Number(buy_amount) + 1);
});
$(".operate_sub").click(function () {
    var buy_amount = $(".good_main_info > div:nth-child(2) .buy_amount input").val();
    if (Number(buy_amount) > 1) {
        $(".good_main_info > div:nth-child(2) .buy_amount input").val(Number(buy_amount) - 1);
    }
});

$(".gotoIndex").click(function () {
    window.location.href = "/";
});

$(".button_submit:eq(0)").click(function () {
    // 登录判断
    // 发送请求添加购物车信息
    $.ajax({
        url: '/cart/add',
        method: 'post',
        data: {},
        success: function (result) {
            if (result.status === "SUCCESS") {
                showNoticeSuccess("添加成功！");

                setTimeout(function () {
                    window.location.href = "/cart/detail";
                }, 1000);
            }
        }
    });
});
$(".button_submit:eq(1)").click(function () {
    $.ajax({
        url: '/order/create_order',
        method: 'post',
        data: {},
        success: function (result) {
            if (result.status === "SUCCESS") {
                showNoticeSuccess("订单已生成！");

                setTimeout(function () {
                    window.location.href = "/order/pay?order_id=" + result.data.order_id;
                }, 1000);
            }
        }
    });
});