package com.linkknown.shopping.model;

import lombok.Data;

/**
 * 购物车类
 */
@Data
public class Cart {
    // 购物车 id
    private int id;
    // 用户 id
    private int userId;
    // 商品 id
    private int goodId;
    // 商品数量
    private int goodNumber;
    // 商品单价
    private double goodPrice;
    // 商品总价
    private double goodSumPrice;
}
