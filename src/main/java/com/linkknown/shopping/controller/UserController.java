package com.linkknown.shopping.controller;

import com.linkknown.shopping.common.Constants;
import com.linkknown.shopping.common.JsonResult;
import com.linkknown.shopping.common.VerifyCodeImage;
import com.linkknown.shopping.util.EncryptUtil;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class UserController {

    // 秘钥，使用 EncryptUtil 类的 public static String getRandomKey(int length) 生成
    public static String chiperKey = "hjet8moFJkl49lvd";

    @RequestMapping("/index")
    public String index() {
        boolean adminFlag = true;
        if (adminFlag) {
            return "/user/admin_manage.html";
        } else {
            return "/user/user_manage.html";
        }
    }

    @RequestMapping("/login")
    public String login() {
        return "/user/login.html";
    }

    @ResponseBody
    @RequestMapping("/post_login")
    public Object postLogin(HttpServletRequest request) {
        String username = request.getParameter("username");
        String passwd = request.getParameter("passwd");

        JsonResult result = new JsonResult();
        // 30 分钟过期
        long expireMillTime = new Date().getTime() + 30 * 60 * 1000;
        JSONObject object = new JSONObject();
        object.put("user_id", 1);
        object.put("username", username);
        object.put("expireMillTime", expireMillTime);
        String tokenString = EncryptUtil.encrypt(object.toString(), chiperKey);
        result.getData().put(Constants.TOKEN_STRING, tokenString);
        result.getData().put("headerIcon", "https://img2.taoshouyou.com/img/2020-07-24/25/21090c04f7708bcc15e3fb6ee5a3e2fc.jpg");
        result.getData().put("username", username);
        result.getData().put("expireMillTime", expireMillTime);
        return result;
    }

    @RequestMapping("/get_verify_code")
    @ResponseBody
    public void getVerifyCode(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 用我们的验证码类,生成验证码类对象
        VerifyCodeImage verifyCodeImage = new VerifyCodeImage();
        //获取验证码
        BufferedImage image = verifyCodeImage.getImage();
        //将验证码的文本存在 session 中
        request.getSession().setAttribute("verify_code", verifyCodeImage.getText());
        // 将验证码图片响应给客户端
        verifyCodeImage.output(image, response.getOutputStream());
    }

    @ResponseBody
    @RequestMapping("/post_regist")
    public Object postRegist(HttpServletRequest request) {
        JsonResult result = new JsonResult();

        String username = request.getParameter("username");
        String passwd = request.getParameter("passwd");
        String verify_code = request.getParameter("verify_code");

        String verifyCodeText = (String) request.getSession().getAttribute("verify_code");
        if (StringUtils.isEmpty(verify_code) || StringUtils.isEmpty(verifyCodeText) || !verify_code.equalsIgnoreCase(verifyCodeText)) {
            result.setStatus(JsonResult.STATUS_FAILED);
            result.getData().put("check_verify_code_error", true);
        }
        return result;
    }

}
