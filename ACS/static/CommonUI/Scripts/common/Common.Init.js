initTabs =function(tabsId) {
    $("#" + tabsId + "_menu>li").each(function (index) {
        $(this).click(function () {
            $("#" + tabsId + "_menu>li.t-tabFocus").removeClass("t-tabFocus");
            $(this).addClass("t-tabFocus")
            $("#" + tabsId + "_content>li:eq(" + index + ")").show().siblings().hide();
        });
    });
};
