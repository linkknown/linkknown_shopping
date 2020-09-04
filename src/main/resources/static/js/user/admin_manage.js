initCheckedMenu();

function initCheckedMenu (menuName) {
    menuName = menuName || sessionStorage.getItem("menuName") || $("#manage_content aside ul li:first").attr("for");
    $("#manage_content section .content_area .content_box").hide();
    $("#manage_content section .content_area .content_box[class='content_box " + menuName + "']").show();

    if (menuName === "good_audit") {
        initDataForGoodList("2", ".good_audit");
    } else if (menuName === "good_audit2") {
        initDataForGoodList("3", ".good_audit2");
    } else if (menuName === "good_list") {
        initDataForGoodList("1,4", ".good_list");
    }
}

function initDataForGoodList (good_status, listNode) {
    $.ajax({
        url: '/good/good_list',
        method: 'post',
        data: {'good_status': good_status},
        success: function (result) {
            if (result.status === "SUCCESS") {
                renderDataForGoodList(result.data, listNode);
            }
        }
    });
}

function renderGoodImages (goodImages) {
    var htmlStr = "<ul class='good_images'>";
    goodImages.split(",").forEach(function (good_image) {
        htmlStr += "<li><img src='" + good_image + "' style='width: 100%;height: 100%;'></li>";
    });
    htmlStr += "</ul>";
    return htmlStr;
}

function renderGoodStatus (goodStatus) {
    // 商品状态 1、审核成功,已发布 2、发布成功,未审核 3、初审成功,待复审 4、商品下架
    if (goodStatus === 1) {
        return "<span style='color: green;font-weight: bold;'>发布成功</span>";
    } else if (goodStatus === 2) {
        return "<span style='color: blue;font-weight: bold;'>待审核</span>";
    } else if (goodStatus === 3) {
        return "<span style='color: blue;font-weight: bold;'>待复审</span>";
    } else if (goodStatus === 4) {
        return "<span style='color: gray;font-weight: bold;'>已下架</span>";
    }
    return "";
}

function renderDataForGoodList (data, listNode) {
    var htmlStr = "";
    for (var i=0; i<data.good_list.length; i++) {
        var good = data.good_list[i];
        htmlStr += "<div class='good_list_item_box'>"
                + "<span class='width_50p'>商品名称：" + good.goodName + "</span>"
                + "<span class='width_50p'>商品价格：¥ " + good.goodPrice + "</span>"
                + "<span class='width_100p'>商品描述：" + good.goodDesc + "</span>"
                + "<span class='width_100p'>商品图片：<div style='display: inline-block;vertical-align: top;'>" + renderGoodImages(good.goodImages) + "</div></span>"
                + "<span class='width_50p'>商品状态：" + renderGoodStatus(good.goodStatus) + "</span>";

        // 商品状态 1、审核成功,已发布 2、发布成功,未审核 3、初审成功,待复审 4、商品下架
        if (good.goodStatus === 1) {
            htmlStr += "<span class='width_100p' style='text-align: center;' good_id='" + good.id + "' good_status='" + good.goodStatus+ "'>"
                    + "<button class='button_submit'>下架</button>"
                + "</span>"
        } else if (good.goodStatus === 2 || good.goodStatus === 3) {
            htmlStr += "<span class='width_100p' style='text-align: center;' good_id='" + good.id + "' good_status='" + good.goodStatus+ "'>"
                    + "<button class='button_submit'>同意</button>"
                    + "<button class='button_refuse'>拒绝</button>"
                + "</span>"
        }
        htmlStr += "</div>";
    }
    $(listNode + " .list_data").html(htmlStr);

    var warning_info = "";
    var new_good_status = 0;
    $(".good_list_item_box .button_submit").click(function () {
        var good_id = $(this).parent().attr("good_id");
        var good_status = $(this).parent().attr("good_status");
        // 商品状态 1、审核成功,已发布 2、发布成功,未审核 3、初审成功,待复审 4、商品下架
        if (good_status == 1) {
            warning_info = "确认要下架该商品吗？";
            new_good_status = 4;
        } else if (good_status == 2) {
            warning_info = "该商品符号上线要求，确认要提交初审吗？";
            new_good_status = 3;
        } else if (good_status == 3) {
            warning_info = "该商品符号上线要求，确认要提交复审吗？";
            new_good_status = 1;
        }
        updateGoodStatus(good_id, warning_info, new_good_status);
    });
    $(".good_list_item_box .button_refuse").click(function () {
        var good_id = $(this).parent().attr("good_id");
        var good_status = $(this).parent().attr("good_status");
        // 商品状态 1、审核成功,已发布 2、发布成功,未审核 3、初审成功,待复审 4、商品下架
        if (good_status == 2) {
            warning_info = "该商品不符号上线要求，确认要下架吗？";
            new_good_status = 4;
        } else if (good_status == 3) {
            warning_info = "该商品不符号上线要求，确认要下架吗？";
            new_good_status = 4;
        }
        updateGoodStatus(good_id, warning_info, new_good_status);
    });
}

function updateGoodStatus (good_id, warning_info, new_good_status) {
    showConfirmDialog(warning_info,function () {
        $.ajax({
            url: '/good/update_good_status',
            method: 'post',
            data: {'good_id': good_id, 'new_good_status': new_good_status},
            success: function (result) {
                if (result.status === "SUCCESS") {
                    showNoticeSuccess("提交成功！");
                    initCheckedMenu();
                } else {
                    showNoticeError("提交失败！");
                }
            }
        });
    },function () {});
}

function cacheCheckedMenu (menuName) {
    sessionStorage.setItem("menuName", menuName);
}

$("#manage_content aside ul li").click(function () {
    let forAttr = $(this).attr("for");

    cacheCheckedMenu(forAttr);
    initCheckedMenu(forAttr);
});

$(".good_add button").click(function (event) {
    event.preventDefault();

    let good_name = $(".good_add input[name='good_name']").val();
    let good_price = $(".good_add input[name='good_price']").val();
    let good_desc = $(".good_add input[name='good_desc']").val();
    let good_images = getGoodImages();

    $.ajax({
        url: '/good/good_add',
        method: 'post',
        data: {good_name, good_price, good_desc, good_images},
        success: function (result) {
            if (result.status === "SUCCESS") {
                showNoticeSuccess("添加成功！");
                // 进行初审
                initCheckedMenu("good_audit");
            } else {
                showNoticeError("添加失败！");
            }
        }
    });
});

$(".good_add ul.good_images li").click(function () {
    $(".good_add ul.good_images input[type='file']:eq(" + $(this).attr('for') + ")").trigger('click');
});

$(".good_add ul.good_images input[type='file']").change(function () {
    var forIndex = $(this).attr('for');
    var formData = new FormData();                      // 创建一个 form 类型的数据
    formData.append('file',$(this).val());        // 获取上传文件的数据
    $.ajax({
        url: '/file/upload',
        type: 'post',
        processData: false,
        contentType: false,
        data: formData,
        success: function (result) {
            if (result.status === "SUCCESS") {
                showNoticeSuccess("文件上传成功！");

                $(".good_add ul.good_images li:eq(" + forIndex + ")").data('filepath', result.data.filepath);

                // 显示图片
                showFilePath();
            } else {
                showNoticeError("文件上传失败！");
            }
        },
        error: function () {
            showNoticeError("文件上传失败！");
        }
    })
});

function showFilePath () {
    $(".good_add ul.good_images li").each(function (index, liNode) {
        var filepath = $(this).data("filepath");
        if (filepath) {
            $(this).html("<img src='" + $(this).data("filepath") + "' style='width: 100%;height: 100%;'/>");
        }
    });
}

function getGoodImages () {
    var good_images = "";
    $(".good_add ul.good_images li").each(function (index, liNode) {
        var filepath = $(this).data("filepath");
        if (filepath) {
            good_images += filepath + ",";
        }
    });
    if (good_images.endsWith(",")) {
        good_images = good_images.substring(0, good_images.lastIndexOf(","));
    }
    return good_images;
}