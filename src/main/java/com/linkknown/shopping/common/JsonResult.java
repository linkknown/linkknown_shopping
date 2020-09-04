package com.linkknown.shopping.common;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class JsonResult {
    public static final String STATUS_SUCCESS = "SUCCESS";
    public static final String STATUS_FAILED = "FAILED";

    private String status = STATUS_SUCCESS;

    private Map<String, Object> data = new HashMap<>();
}
