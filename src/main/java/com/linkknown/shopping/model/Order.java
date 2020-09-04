package com.linkknown.shopping.model;

import lombok.Data;

import java.util.List;

/**
 * 订单类
 */
@Data
public class Order {
    // 订单 id
    private String id;
    // 订单状态 1、待付款 2、待收货 3、待评价 4、已取消
    private int orderStatus;
    // 用户 id
    private int userId;
    // 订单总金额
    private double orderSumPrice;
    // 订单子项
    private List<OrderItem> orderItems;
    // 支付倒计时
    private long payCountDownTime;
}

