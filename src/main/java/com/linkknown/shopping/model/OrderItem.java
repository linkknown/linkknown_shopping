package com.linkknown.shopping.model;

import lombok.Data;

@Data
public class OrderItem {
    // 商品 id
    private int goodId;
    // 商品名称
    private String goodName;
    // 商品图片
    private String goodImages;
    // 商品数量
    private int goodNumber;
    // 商品单价
    private double goodPrice;
    // 商品总价
    private double goodSumPrice;
}
