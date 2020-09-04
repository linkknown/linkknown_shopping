package com.linkknown.shopping.controller;

import com.linkknown.shopping.common.JsonResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

// 参考文章： https://blog.csdn.net/qq_32662595/article/details/90519752
@Controller
@RequestMapping("/file")
public class FileController {

    @ResponseBody
    @RequestMapping("/upload")
    public Object upload (HttpServletRequest request) {
        JsonResult result = new JsonResult();
        result.getData().put("filepath", "https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg");
        return result;
    }
}
