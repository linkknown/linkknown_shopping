$(".classify > span").click(function () {
    let order_status = $(this).attr('order_status');

    initOrderList(order_status);

    $(".classify > span").removeClass("current");
    $(this).addClass("current");
});


initOrderList(0);

// 加载订单列表数据
function initOrderList (order_status) {
    $.ajax({
        url: '/order/post_list',
        method: 'post',
        data: {'order_status': order_status},
        success: function (result) {
            if (result.status === "SUCCESS") {
                renderOrderUI(result.data.orders);
            }
        }
    });
}

function renderOrderUI(orders) {
    // 重新添加前先清空旧的数据
    $(".order_list > ul > li:gt(0)").remove();

    for (var i=0; i< orders.length; i++) {
        $templateNode = $(".order_list > ul > li:eq(0)");

        // 复制模板
        $(".order_list ul").append($templateNode.prop('outerHTML'));
        // 更新数据
        renderLiNode($(".order_list ul li:last"), orders[i]);
    }
    $(".order_list ul li:gt(0)").css('display', 'block');

    $(".order_list ul li:gt(0) img").click(function () {
        window.location.href = "/good/detail?good_id=" + $(this).attr("good_id");
    });
}

function renderLiNode ($liNode, order) {
    for (var i=0; i< order.orderItems.length; i++) {
        var orderItem = order.orderItems[i];

        $templateNode = $liNode.find(".good_item");
        // 复制模板
        $liNode.find(".column:eq(0)").append($templateNode.prop('outerHTML'));
        // 更新数据
        $liNode.find(".good_item:last").find("img").attr("src", orderItem.goodImages.split(",")[0]);
        $liNode.find(".good_item:last").find("img").attr("good_id", orderItem.goodId);
        $liNode.find(".good_item:last").find(".good_name").html(orderItem.goodName);
        $liNode.find(".good_item:last").find(".good_price").html("单价：¥ " + orderItem.goodPrice);
        $liNode.find(".good_item:last").find(".good_sum_price").html("总价：¥ " + orderItem.goodSumPrice);
    }

    $liNode.find(".order_id").html(order.id);
    $liNode.find(".order_sum_price").html("¥ " + order.orderSumPrice);
    $liNode.find(".user_name").html(sessionStorage.getItem("username"));

    // 1、待付款 2、待收货 3、待评价 4、已取消
    if (order.orderStatus === 1) {
        $liNode.find(".order_status").html("<span class='waitPay'>待付款</span>");

        $liNode.find(".payCountDownTime").html("<span>" + order.payCountDownTime + "</span>");

        var payCountDownTime = order.payCountDownTime;
        var handler = setInterval(function () {
            payCountDownTime -= 1000;
            if (payCountDownTime > 0) {
                $liNode.find(".payCountDownTime").html("<span>支付倒计时：" + formateCutTime(payCountDownTime) + "</span>");
            } else {
                clearInterval(handler);
            }
        }, 1000);

        $($liNode).find(".payOperate").show();
    } else if (order.orderStatus === 2) {
        $liNode.find(".order_status").html("<span class='waitReceive'>待收货</span>");
    } else if (order.orderStatus === 3) {
        $liNode.find(".order_status").html("<span class='waitComment'>待评价</span>");
        $($liNode).find(".commentOperate").show();
    } else if (order.orderStatus === 4) {
        $liNode.find(".order_status").html("<span class='cancelled'>已取消</span>");
    }

    $liNode.find(".good_item:gt(0)").css('display', 'flex');
}

function formateCutTime(time){
    var h=Math.floor(time/1000/60/60%24);
    var m=Math.floor(time/1000/60%60);
    var s=Math.floor(time/1000%60);

    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    return h + ":" + m + ":" + s;
}

function checkTime(i){
    if(i<10) {
        i = "0" + i;
    }
    return i;
}