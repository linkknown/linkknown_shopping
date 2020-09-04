package com.linkknown.shopping.util;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Random;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

/**
 * 加密算法
 */
public class EncryptUtil {

    /**
     * AES加密+Base64转码
     *
     * @param decryptStr 明文（16进制）
     * @param key  密钥
     * @return
     */
    public static String encrypt(String decryptStr, String key) {
        byte[] keyb = null;
        try {
            keyb = key.getBytes("utf-8");
        } catch (UnsupportedEncodingException e1) {
            e1.printStackTrace();
        } // 明文
        SecretKeySpec sKeySpec = new SecretKeySpec(keyb, "AES");
        Cipher cipher = null;
        try {
            cipher = Cipher.getInstance("AES");
        } catch (NoSuchAlgorithmException | NoSuchPaddingException e) {
            e.printStackTrace();
        }
        try {
            cipher.init(Cipher.ENCRYPT_MODE, sKeySpec);
        } catch (InvalidKeyException e) {
            e.printStackTrace();
        }
        byte[] buf = null;
        String encryptStr = "";
        try {
            buf = cipher.doFinal(decryptStr.getBytes("utf-8"));
            // byte加密后
            encryptStr = Base64.getEncoder().encodeToString(buf);// 密文用base64加密
        } catch (IllegalBlockSizeException | BadPaddingException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return encryptStr;
    }

    /**
     * Base64解码 + AES解码
     *
     * @param encryptStr 密文 （16进制）
     * @param key  密钥
     * @return
     */
    public static String decrypt(String encryptStr, String key){
        byte[] keyb = null;
        try {
            keyb = key.getBytes("utf-8");
        } catch (UnsupportedEncodingException e1) {
            e1.printStackTrace();
        }
        byte[] buf = Base64.getDecoder().decode(encryptStr);
        SecretKeySpec sKeySpec = new SecretKeySpec(keyb, "AES");
        Cipher cipher = null;
        try {
            cipher = Cipher.getInstance("AES");
        } catch (NoSuchAlgorithmException | NoSuchPaddingException e) {
            e.printStackTrace();
        }
        try {
            cipher.init(Cipher.DECRYPT_MODE, sKeySpec);
        } catch (InvalidKeyException e) {
            e.printStackTrace();
        }
        byte[] buf2 = null;
        String decryptStr = "";
        try {
            buf2 = cipher.doFinal(buf);
            // byte加密后
            decryptStr = new String(buf2,"utf-8");
        } catch (IllegalBlockSizeException | BadPaddingException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return decryptStr;
    }

    // length用户要求产生字符串的长度
    public static String getRandomKey(int length) {
        String str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random=new Random();
        StringBuffer sb=new StringBuffer();
        for(int i=0;i<length;i++){
            int number=random.nextInt(62);
            sb.append(str.charAt(number));
        }
        return sb.toString();
    }

    public static String urlDecode (String param) {
        try {
            param = URLDecoder.decode(param, "utf-8");
            param = param.replace(" ", "+");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return param;
    }

//    public static void main(String[] args) {
//        System.out.println(getRandomKey(16));
//    }
}
