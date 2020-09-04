package com.linkknown.shopping.model;

import lombok.Data;

@Data
public class User {
    // 用户 id
    private int id;
    private String userName;
    private String passwd;
    private String headerIcon;
}
