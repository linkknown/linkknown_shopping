// 写cookies, 一个小时过期
function setCookie(name, value, expireMillTime) {
    expireMillTime = expireMillTime || 60 * 60 * 1000;
    var exp = new Date();
    exp.setTime(exp.getTime() + expireMillTime);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}

//读取 cookies
function getCookie(name) {
    var reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    var arr=document.cookie.match(reg);
    if(arr && arr.length > 1) {
        return unescape(arr[2]);
    }
    return null;
}

//删除 cookies
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) {
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    }
}