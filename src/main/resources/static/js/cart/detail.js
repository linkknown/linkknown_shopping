// 加载购物车信息
initCartInfo();

function initCartInfo () {
    $.ajax({
        url: '/cart/query_cart_info',
        method: 'post',
        data: {},
        success: function (result) {
            if (result.status === "SUCCESS") {
                renderCartUI(result.data.carts, result.data.goods);
            }
        }
    });
}

function renderLiNode ($liNode, cart, goods) {
    for (let i=0; i< goods.length; i++) {
        if (cart.goodId === goods[i].id) {
            var good = goods[i];

            $liNode.find(".good_image").attr('src', good.goodImages.split(",")[0]);
            $liNode.find(".operate_btn").attr('cart_id', cart.id);
            $liNode.find(".good_image").attr('good_id', good.id);
            $liNode.find(".good_name").html(good.goodName);
            $liNode.find(".buy_number").html(cart.goodNumber);
            $liNode.find(".good_price").html("¥ " + cart.goodPrice);
            $liNode.find(".good_sum_price").html("¥ " + cart.goodSumPrice);
        }
    }
}

function renderCartUI(carts, goods) {
    for (var i=0; i<carts.length; i++) {
        $templateNode = $(".good_area ul li:eq(1)");

        // 复制模板
        $(".good_area ul").append($templateNode.prop('outerHTML'));
        // 更新数据
        renderLiNode($(".good_area ul li:last"), carts[i], goods);
    }
    $(".good_area ul li:gt(1)").css('display', 'block');

    $(".good_area ul li:gt(1) img").click(function () {
        window.location.href = "/good/detail?good_id=" + $(this).attr("good_id");
    });

    $(".good_area ul li:gt(1) .operate_btn.remove").click(function () {
        removeFromCart($(this).attr('cart_id'));
    });

    // 等数据加载完成后添加点击事件
    $(".good_area ul li:gt(1) input[type='checkbox']").click(function () {
        // var checkedAllFlag = true;
        // var checkboxNodes = $(".good_area ul li:gt(1) input[type='checkbox']");
        //
        // for (var i=0; i<checkboxNodes.length; i++) {
        //     var checkboxNode = checkboxNodes[i];
        //     if (!checkboxNode.checked) {
        //         checkedAllFlag = false;
        //         break;
        //     }
        // }
        // $(".selectAll").prop('checked', checkedAllFlag);

        // 改进写法
        let checkedAllFlag = $(".good_area ul li:gt(1) input[type='checkbox']:checked").length === $(".good_area ul li:gt(1) input[type='checkbox']").length;
        $(".selectAll").prop('checked', checkedAllFlag);


        // 使用 attr 有 bug
        // prop()是 jQuery 1.6 开始新增了一个方法,官方建议具有 true 和 false 两个属性的属性,
        // 如 checked, selected 或者 disabled 使用 prop(),其他的使用 attr().
        // $(".selectAll").attr('checked', checkedAllFlag);

        refreshSubmitBtnState();
    });
}

$(".selectAll").click(function () {
    // 获取当前全选、全不选的状态
    var checked = this.checked;
    // 设置状态
    $("input[type='checkbox']").prop('checked', checked);

    refreshSubmitBtnState();
});

// 更新提交按钮状态
function refreshSubmitBtnState () {
    if ($(".good_area ul li:gt(1) input[type='checkbox']:checked").length > 0) {
        $(".button_submit").removeClass("button_disable");
    } else {
        $(".button_submit").addClass("button_disable");
    }
}

function removeFromCart (cart_id) {
    $.ajax({
        url: '/cart/delete',
        method: 'post',
        data: {'cart_id': cart_id},
        success: function (result) {
            if (result.status === "SUCCESS") {
                showNoticeSuccess("移除成功！");

                // 1s 后刷新页面
                setTimeout(function () {
                    window.location.reload();
                }, 1000);
            }
        }
    });
}

$(".button_submit").click(function () {
    if ($(this).hasClass('button_disable')) {
        return;
    }
    // 获取商品 id 和商品数量

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