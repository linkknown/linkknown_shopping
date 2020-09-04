package com.linkknown.shopping.controller;

import com.linkknown.shopping.common.JsonResult;
import com.linkknown.shopping.model.Good;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Controller
@RequestMapping("/good")
public class GoodController {

    @RequestMapping("/detail")
    public ModelAndView detail (HttpServletRequest request) {
        String good_id = request.getParameter("good_id");
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("/good/detail");

        modelAndView.addObject("good_id", good_id);
        return modelAndView;
    }

    @ResponseBody
    @RequestMapping("/good_add")
    public Object goodAdd (HttpServletRequest request) {
        String good_name = request.getParameter("good_name");
        String good_price = request.getParameter("good_price");
        String good_desc = request.getParameter("good_desc");
        String good_images = request.getParameter("good_images");
        JsonResult result = new JsonResult();
        return result;
    }

    @ResponseBody
    @RequestMapping("/good_list")
    public Object goodList (HttpServletRequest request) {
        String good_status = request.getParameter("good_status");

        List<Good> goodList = new ArrayList<>();

        for (int i=0; i<20; i++) {
            Good good = new Good();
            good.setId(i);
            good.setGoodName("商品" + i);
            good.setGoodPrice(100);
            good.setGoodDesc("特斯拉(Tesla)，是一家美国电动汽车及能源公司，产销电动汽车、太阳能板、及储能设备。 总部位于帕洛阿托（Palo Alto） [1]  ，2003年7月1日，由马丁·艾伯哈德和马克·塔彭宁共同创立，创始人将公司命名为“特斯拉汽车”，以纪念物理学家尼古拉·特斯拉。2004年埃隆·马斯克进入公司并领导了A轮融资。");
            good.setBuyNumber(100);

            if ("1,4".equals(good_status)) {
                good.setGoodStatus(new Random().nextInt(2) == 0 ? 1 : 4);
            } else if ("2".equals(good_status)) {
                good.setGoodStatus(2);
            } else if ("3".equals(good_status)) {
                good.setGoodStatus(3);
            }
            good.setGoodImages("https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg,"
                    + "https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg,"
                    + "https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg");
            goodList.add(good);
        }

        JsonResult result = new JsonResult();
        result.getData().put("good_list", goodList);
        return result;
    }

    @ResponseBody
    @RequestMapping("/update_good_status")
    public Object updateGoodStatus (HttpServletRequest request) {
        String good_id = request.getParameter("good_id");
        String new_good_status = request.getParameter("new_good_status");
        // 提交原因,记录日志,用于追溯操作日志
        String reason = request.getParameter("reason");

        JsonResult result = new JsonResult();
        return result;
    }

    @ResponseBody
    @RequestMapping("/query_hot_good")
    public Object queryHotGood (HttpServletRequest request) {
        List<Good> goodList = new ArrayList<>();

        for (int i=0; i<20; i++) {
            Good good = new Good();
            good.setId(i);
            good.setGoodName("商品" + i);
            good.setGoodPrice(100);

            good.setGoodStatus(1);

            good.setGoodDesc("特斯拉(Tesla)，是一家美国电动汽车及能源公司，产销电动汽车、太阳能板、及储能设备。 总部位于帕洛阿托（Palo Alto） [1]  ，2003年7月1日，由马丁·艾伯哈德和马克·塔彭宁共同创立，创始人将公司命名为“特斯拉汽车”，以纪念物理学家尼古拉·特斯拉。2004年埃隆·马斯克进入公司并领导了A轮融资。");
            good.setBuyNumber(100);

            good.setGoodImages("https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg,"
                    + "https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg,"
                    + "https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg");
            goodList.add(good);
        }

        JsonResult result = new JsonResult();
        result.getData().put("goods", goodList);
        return result;
    }

    @ResponseBody
    @RequestMapping("/recently_view")
    public Object recentlyView (HttpServletRequest request) {
        List<Good> goodList = new ArrayList<>();

        for (int i=0; i<5; i++) {
            Good good = new Good();
            good.setId(i);
            good.setGoodName("商品" + i);
            good.setGoodPrice(100);

            good.setGoodStatus(1);

            good.setGoodDesc("特斯拉(Tesla)，是一家美国电动汽车及能源公司，产销电动汽车、太阳能板、及储能设备。 总部位于帕洛阿托（Palo Alto） [1]  ，2003年7月1日，由马丁·艾伯哈德和马克·塔彭宁共同创立，创始人将公司命名为“特斯拉汽车”，以纪念物理学家尼古拉·特斯拉。2004年埃隆·马斯克进入公司并领导了A轮融资。");
            good.setBuyNumber(100);

            good.setGoodImages("https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg,"
                    + "https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg,"
                    + "https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg");
            goodList.add(good);
        }

        JsonResult result = new JsonResult();
        result.getData().put("goods", goodList);
        return result;
    }

    @ResponseBody
    @RequestMapping("/get_good_info")
    public Object getGoodInfo (HttpServletRequest request) {
        String good_id = request.getParameter("good_id");

        Good good = new Good();
        good.setId(Integer.parseInt(good_id));
        good.setGoodName("商品" + Integer.parseInt(good_id));
        good.setGoodPrice(100);

        good.setGoodStatus(1);

        good.setGoodDesc("特斯拉(Tesla)，是一家美国电动汽车及能源公司，产销电动汽车、太阳能板、及储能设备。 总部位于帕洛阿托（Palo Alto） [1]  ，2003年7月1日，由马丁·艾伯哈德和马克·塔彭宁共同创立，创始人将公司命名为“特斯拉汽车”，以纪念物理学家尼古拉·特斯拉。2004年埃隆·马斯克进入公司并领导了A轮融资。");
        good.setBuyNumber(100);

        good.setGoodImages("https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg,"
                + "https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg,"
                + "https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg,"
                + "https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg,"
                + "https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg");

        JsonResult result = new JsonResult();
        result.getData().put("good", good);
        return result;
    }
}



