package com.linkknown.shopping.model;

import lombok.Data;

@Data
public class Good {

    // 商品 id
    private int id;
    // 商品名称
    private String goodName;
    // 商品价格
    private double goodPrice;
    // 商品状态 1、审核成功,已发布 2、发布成功,未审核 3、初审成功,待复审 4、商品下架
    private int goodStatus;
    // 商品图片,多个图片用逗号分隔,最多支持 5 张图片
    private String goodImages;
    // 购买人数
    private int buyNumber;
    // 商品描述
    private String goodDesc;
}
