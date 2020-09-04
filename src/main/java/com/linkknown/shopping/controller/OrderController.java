package com.linkknown.shopping.controller;

import com.linkknown.shopping.common.JsonResult;
import com.linkknown.shopping.model.Order;
import com.linkknown.shopping.model.OrderItem;
import com.linkknown.shopping.util.LoginUtil;
import com.sun.org.apache.xpath.internal.operations.Or;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Controller
@RequestMapping("/order")
public class OrderController {

    @RequestMapping("/list")
    public String list() {
        return "/order/list.html";
    }

    @ResponseBody
    @RequestMapping("/post_list")
    public Object postList (HttpServletRequest request) {
        JsonResult result = new JsonResult();
        int user_id = LoginUtil.parseUserInfo(request).getId();
        // 订单状态
        String order_status = request.getParameter("order_status");

        List<Order> orders = new ArrayList<>();
        for (int i=0; i< 10; i++) {
            Order order = new Order();

            order.setId("202010011212004" + i);
            if ("1234".contains(order_status)) {
                order.setOrderStatus(Integer.parseInt(order_status));
            } else {
                order.setOrderStatus(new Random().nextInt(4) + 1);
            }

            order.setUserId(user_id);
            order.setPayCountDownTime(3600 * 1000);
            order.setOrderSumPrice(250.80);

            List<OrderItem> orderItems = new ArrayList<>();
            for (int j=0; j<5; j++) {
                OrderItem orderItem = new OrderItem();

                orderItem.setGoodId(i);
                orderItem.setGoodName("商品" + j);
                orderItem.setGoodImages("https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg,"
                        + "https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg,"
                        + "https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg,"
                        + "https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg,"
                        + "https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg");
                orderItem.setGoodNumber(5);
                orderItem.setGoodPrice(9.99);
                orderItem.setGoodSumPrice(49.95);

                orderItems.add(orderItem);
            }

            order.setOrderItems(orderItems);

            orders.add(order);
        }

        result.getData().put("orders", orders);

        return result;
    }

    @RequestMapping("/pay")
    public String pay () {
        return "/order/pay.html";
    }

    @ResponseBody
    @RequestMapping("/create_order")
    public Object createOrder (HttpServletRequest request) {
        JsonResult result = new JsonResult();

        result.getData().put("order_id", "2020100112120041");
        return result;
    }

}
