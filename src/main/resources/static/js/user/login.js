
$(".gotoIndex").click(function () {
    window.location.href = "/";
});

$(".login_content input[name='username']").bind('keypress', function (event) {
    // 去除表单输入的空格
    $(".login_content input[name='username']").val($(".login_content input[name='username']").val().replace(/\s+/g,""));

    if (event.keyCode === 13 || event.keyCode === 32) {
        let username = $(".login_content input[name='username']").val();
        let passwd = $(".login_content input[name='passwd']").val();
        verifyLoginForm(username, passwd);
    }
});
$(".login_content input[name='passwd']").bind('keypress', function (event) {
    // 去除表单输入的空格
    $(".login_content input[name='passwd']").val($(".login_content input[name='passwd']").val().replace(/\s+/g,""));

    if (event.keyCode === 13 || event.keyCode === 32) {
        submitLoginForm();
    }
});
$(".login_content .login_btn").click(function () {
    submitLoginForm();
});

function submitLoginForm() {
    let username = $(".login_content input[name='username']").val();
    let passwd = $(".login_content input[name='passwd']").val();
    if (verifyLoginForm(username, passwd)) {
        $.ajax({
            url: '/user/post_login',
            method: 'post',
            data: {'username': username, 'passwd': passwd},
            success: function (result) {
                if (result.status === "SUCCESS") {

                    showNoticeSuccess("登录成功");

                    sessionStorage.setItem('tokenString', result.data.tokenString);
                    sessionStorage.setItem('headerIcon', result.data.headerIcon);
                    sessionStorage.setItem('expireMillTime', result.data.expireMillTime);
                    sessionStorage.setItem('username', result.data.username);

                    // cookie 30 min 过期
                    setCookie('tokenString', result.data.tokenString, 30 * 60 * 1000);

                    setTimeout(function () {
                        window.location.href = "/";
                    }, 1000);
                }
            }
        });
    }
}

function verifyLoginForm (username, passwd) {
    var flag = true;
    if (checkEmpty(username)) {
        flag = false;
        $(".login_content .checkerror_username").html("用户名不能为空！");
    } else {
        $(".login_content .checkerror_username").html("");
    }
    if (checkEmpty(passwd)) {
        flag = false;
        $(".login_content .checkerror_passwd").html("密码不能为空！");
    } else {
        $(".login_content .checkerror_passwd").html("");
    }
    return flag;
}

function getVerifyCode () {
    $(".verify_code_img").prop('src','/user/get_verify_code?a='+new Date().getTime());
}



$(".regist_content input[name='username']").bind('keypress', function (event) {
    // 去除表单输入的空格
    $(".regist_content input[name='username']").val($(".regist_content input[name='username']").val().replace(/\s+/g,""));

    if (event.keyCode === 13 || event.keyCode === 32) {
        let username = $(".regist_content input[name='username']").val();
        let passwd = $(".regist_content input[name='passwd']").val();
        let verify_code = $(".regist_content input[name='verify_code']").val();
        verifyRegistForm(username, passwd, verify_code);
    }
});
$(".regist_content input[name='passwd']").bind('keypress', function (event) {
    // 去除表单输入的空格
    $(".regist_content input[name='passwd']").val($(".regist_content input[name='passwd']").val().replace(/\s+/g,""));

    if (event.keyCode === 13 || event.keyCode === 32) {
        let username = $(".regist_content input[name='username']").val();
        let passwd = $(".regist_content input[name='passwd']").val();
        let verify_code = $(".regist_content input[name='verify_code']").val();
        verifyRegistForm(username, passwd, verify_code);
    }
});
$(".regist_content input[name='verify_code']").bind('keypress', function (event) {
    // 去除表单输入的空格
    $(".regist_content input[name='verify_code']").val($(".regist_content input[name='verify_code']").val().replace(/\s+/g,""));

    if (event.keyCode === 13 || event.keyCode === 32) {
        submitRegistForm();
    }
});

$(".regist_content .regist_btn").click(function () {
    submitRegistForm();
});

function verifyRegistForm (username, passwd, verify_code) {
    var flag = true;
    if (checkEmpty(username)) {
        flag = false;
        $(".regist_content .checkerror_username").html("用户名不能为空！");
    } else {
        $(".regist_content .checkerror_username").html("");
    }
    if (checkEmpty(passwd)) {
        flag = false;
        $(".regist_content .checkerror_passwd").html("密码不能为空！");
    } else {
        $(".regist_content .checkerror_passwd").html("");
    }
    if (checkEmpty(verify_code)) {
        flag = false;
        $(".regist_content .checkerror_verify_code").html("验证码不能为空！");
    } else {
        $(".regist_content .checkerror_verify_code").html("");
    }
    return flag;
}

function submitRegistForm() {
    let username = $(".regist_content input[name='username']").val();
    let passwd = $(".regist_content input[name='passwd']").val();
    let verify_code = $(".regist_content input[name='verify_code']").val();
    if (verifyRegistForm(username, passwd, verify_code)) {
        $.ajax({
            url: '/user/post_regist',
            method: 'post',
            data: {'username': username, 'passwd': passwd, 'verify_code': verify_code},
            success: function (result) {
                if (result.status === "SUCCESS") {
                    showNoticeSuccess("注册成功！");

                    setTimeout(function () {
                        $(".gotoLogin").trigger('click');
                    }, 1000);

                } else {
                    if (result.data.check_verify_code_error == true) {
                        $(".regist_content .checkerror_verify_code").html("验证码错误！");
                    }
                }
            }
        });
    }
}

$(".gotoRegist").click(function () {
    $(".login_area").hide();

    $(".regist_area").show();
    $(".regist_area").addClass("rotate_anim");
});

$(".gotoLogin").click(function () {
    $(".regist_area").hide();

    $(".login_area").show();
    $(".login_area").addClass("rotate_anim");
});

