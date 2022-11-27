$(function () {
    //标签页
    $("#tf_tab_menu>li").each(function (index) {
        $(this).click(function () {
            $("#tf_tab_menu>li.t-tabFocus").removeClass("t-tabFocus");
            $(this).addClass("t-tabFocus")
            $("#tf_tab_content>li:eq(" + index + ")").show().siblings().hide();
        });
    });

    //时间轴
    //            $(".vertical-axis .bPoint .list").each(function (e, target) {
    //                var $target = $(target),
    //                        $ul = $target.find("ul");
    //                $target.height($ul.outerHeight()), $ul.css("position", "absolute");
    //            });

    $(".vertical-axis .bPoint>h2").click(function (e) {
        e.preventDefault();
        //判断节点是否打开
        if ($(this).parent().find(".bPoint-list").is(":hidden")) {
            $(this).parent().find(".bPoint-list").show(500);
            $(this).parent().addClass("bPoint-hover");
            if ($(this).parent().hasClass("bPoint-open1")) {//如果是蓝色，切换蓝色样式
                $(this).parent().addClass("bPoint-open1-hover").removeClass("bPoint-open1");
            }
            if ($(this).parent().hasClass("bPoint-open2")) {//如果是橙色，切换橙色样式
                $(this).parent().addClass("bPoint-open2-hover").removeClass("bPoint-open2");
            }
        } else {
            $(this).parent().find(".bPoint-list").hide(500);
            if ($(this).parent().hasClass("bPoint-open1-hover")) {//如果是蓝色，切换蓝色样式
                $(this).parent().addClass("bPoint-open1").removeClass("bPoint-open1-hover");
            }
            if ($(this).parent().hasClass("bPoint-open2-hover")) {
                $(this).parent().addClass("bPoint-open2").removeClass("bPoint-open2-hover");
            }
            if ($(this).parent().hasClass("bPoint-hover")) {
                $(this).parent().removeClass("bPoint-hover");
            }

        }
    });
});
function show_box(obj) {
    var $ui = $(obj).parent();
  //  $(obj).css("color","#3192cb");
    $ui.find('.overFlowDropdownleft').show();
}
function hide_box(obj) {
    var $ui = $(obj).parent();
   // $(obj).css("color","#3192cb");
    $ui.bind('mouseleave', function () {
        $ui.find('.overFlowDropdownleft').hide();
    });
}