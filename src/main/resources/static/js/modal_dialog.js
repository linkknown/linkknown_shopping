function showConfirmDialog (confirmText, successFunc, refuseFunc) {
    $(".modalDiv .modalShade").removeClass('hide');
    $(".modalDiv .modalDialog").removeClass('hide');
    $("body").css('overflow', 'hidden');

    var htmlStr = "<div style='margin-top: 30px;padding: 10px 30px;font-size: 24px;'>" + confirmText + "</div>"
        + "<div style='position: absolute;bottom: 0;text-align: center;padding: 20px;width: 100%;box-sizing: border-box;'>"
            + "<button class='button_submit modalDialog_submit'>确定</button>"
            + "<button class='button_refuse modalDialog_refuse'>取消</button>"
        + "</div>";

    $(".dialogContent").html(htmlStr);

    $(".modalDialog_submit").click(function () {
        successFunc();

        $(".dialogClose").trigger('click');
    });
    $(".modalDialog_refuse").click(function () {
        refuseFunc();

        $(".dialogClose").trigger('click');
    });
}

$(".dialogClose").click(function () {
    $(".modalShade").addClass('hide');
    $(".modalDialog").addClass('hide')
    $("body").css('overflow', 'visible');
});