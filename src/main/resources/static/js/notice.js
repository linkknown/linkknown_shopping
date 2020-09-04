function showNotice (text, noticeClass) {
    noticeClass = noticeClass || "noticeSuccess";
    $(".noticeDiv").html(text);
    $(".noticeDiv").removeClass("noticeSuccess").removeClass("noticeError");
    $(".noticeDiv").addClass(noticeClass);
    $(".noticeDiv").removeClass('notice_hide');

    var timeoutHandler = setTimeout(function () {
        clearTimeout(timeoutHandler);
        $(".noticeDiv").addClass('notice_hide');
    }, 3000);
}

function showNoticeSuccess (text) {
    showNotice(text, 'noticeSuccess');
}

function showNoticeError (text) {
    showNotice(text, 'noticeError');
}