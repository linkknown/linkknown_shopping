package com.linkknown.shopping.util;

import com.linkknown.shopping.common.Constants;
import com.linkknown.shopping.controller.UserController;
import com.linkknown.shopping.model.User;
import net.sf.json.JSONObject;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

/**
 * 登录工具类
 */
public class LoginUtil {

    public static User parseUserInfo(HttpServletRequest request) {
        User user = new User();
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (Constants.TOKEN_STRING.equalsIgnoreCase(cookie.getName())) {

                String tokenString = EncryptUtil.urlDecode(cookie.getValue());
                String text = EncryptUtil.decrypt(tokenString, UserController.chiperKey);
                JSONObject object = JSONObject.fromObject(text);
                user.setId(object.getInt("user_id"));
                user.setUserName(object.getString("username"));
            }
        }
        return user;
    }
}
