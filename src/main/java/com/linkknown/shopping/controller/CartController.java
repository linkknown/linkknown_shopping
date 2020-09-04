package com.linkknown.shopping.controller;

import com.linkknown.shopping.common.JsonResult;
import com.linkknown.shopping.model.Cart;
import com.linkknown.shopping.model.Good;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.linkknown.shopping.util.LoginUtil;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/cart")
public class CartController {

    @ResponseBody
    @RequestMapping("/add")
    public Object add (HttpServletRequest request) {
        JsonResult result = new JsonResult();
        int user_id = LoginUtil.parseUserInfo(request).getId();
        // 商品 id
        String good_id = request.getParameter("good_id");
        // 商品 数量
        String good_number = request.getParameter("good_number");
        // 商品单价和商品总价需要查数据库,不能从前端接收

        return result;
    }

    @RequestMapping("/detail")
    public Object detail () {
        return "/cart/detail.html";
    }

    @ResponseBody
    @RequestMapping("/query_cart_info")
    public Object queryCartInfo (HttpServletRequest request) {
        JsonResult result = new JsonResult();

        List<Cart> carts = new ArrayList<>();
        for (int i=0; i<5; i++) {
            Cart cart = new Cart();
            cart.setId(i);
            cart.setUserId(1);
            cart.setGoodId(1);
            cart.setGoodNumber(5);
            cart.setGoodPrice(9.99);
            cart.setGoodSumPrice(49.95);
            carts.add(cart);
        }
        List<Good> goods = new ArrayList<>();
        for (int i=0; i<20; i++) {
            Good good = new Good();
            good.setId(1);
            good.setGoodName("商品" + i);
            good.setGoodPrice(100);

            good.setGoodStatus(1);

            good.setGoodDesc("特斯拉(Tesla)，是一家美国电动汽车及能源公司，产销电动汽车、太阳能板、及储能设备。 总部位于帕洛阿托（Palo Alto） [1]  ，2003年7月1日，由马丁·艾伯哈德和马克·塔彭宁共同创立，创始人将公司命名为“特斯拉汽车”，以纪念物理学家尼古拉·特斯拉。2004年埃隆·马斯克进入公司并领导了A轮融资。");
            good.setBuyNumber(100);

            good.setGoodImages("https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg,"
                    + "https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg,"
                    + "https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg,"
                    + "https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg,"
                    + "https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg");

            goods.add(good);
        }

        // 购物车信息
        result.getData().put("carts", carts);
        // 购物车关联的商品信息
        result.getData().put("goods", goods);
        return result;
    }

    @ResponseBody
    @RequestMapping("/delete")
    public Object delete (HttpServletRequest request) {
        JsonResult result = new JsonResult();
        int user_id = LoginUtil.parseUserInfo(request).getId();
        // 购物车 id
        String cart_id = request.getParameter("cart_id");

        return result;
    }
}
