/**
 * Created by cxy on 2015/12/1.
 */


$(document).ready(function ($) {
    /*单选框*/
    $(".t-radio").on("click", function () {
        $(this).addClass("t-radio-on").siblings().removeClass("t-radio-on");
    })
    /*复选框*/
    $(".t-check").on("click", function () {
        //   $(this).hasClass("t_check_on")? $(this).removeClass("t_check_on"):$(this).addClass("t_check_on");
        //或者这么写(对添加和移除所有 <p> 元素的 'main' 类进行切换)
        $(this).toggleClass("t-check-on");
    })

});

//查询面板关闭隐藏
/* obj :查询按钮  t_searchPannel_id： 查询面板id  t_searchPannel_box_hide_id：隐藏条件组id
 btnSearch_id ： 查询按钮id  tbGrid_id： 对应表格id
*/
function getParent(element) {
    return $(element).parent();
}
function queryTermOpens(obj, tbGrid_id) {
    var t_searchPannel_id, t_searchPannel_box_hide_id, btnSearch_id, btnReset_id, tbGrid_id, DATAURL;
    var divp = $(obj).parent().parent().parent();
    t_searchPannel_id = divp.find("[name=t-searchPannel1]").attr("id");
    t_searchPannel_box_hide_id = divp.find("[name=t_searchPannel_box_hide]").attr("id");
    btnSearch_id = divp.find("[name=btnSearch]").attr("id");
    btnReset_id = divp.find("[name=btnReset]").attr("id");
    DATAURL = $('#' + tbGrid_id).attr("DATAURL");
    queryTermOpen(obj, t_searchPannel_id, t_searchPannel_box_hide_id, btnSearch_id,btnReset_id, tbGrid_id, DATAURL);
}

//查询面板关闭隐藏
/* obj :查询按钮  t_searchPannel_id： 查询面板id  t_searchPannel_box_hide_id：隐藏条件组id
 btnSearch_id ： 查询按钮id  tbGrid_id： 对应表格id
*/
function queryTermOpen(obj, t_searchPannel_id, t_searchPannel_box_hide_id, btnSearch_id, btnReset_id, tbGrid_id, DATAURL) {
    //将全文搜索值设为空
    var url = DATAURL;
    $("#" + tbGrid_id + "_filter").find("input").each(function (index, element) {
        $(element).val("");
    });
    if ($("#" + t_searchPannel_box_hide_id).is(":hidden") == true) {
        //DTServer.Flag true 查询 flase 自动查询
        DTServer.Flag = true;
        $("#" + tbGrid_id).DataTable().ajax.url(url);//重载url
        //查询条件显示时操作
        $("#" + t_searchPannel_box_hide_id).show();
        $(obj).children("i").removeClass("fa fa-sort-desc").addClass("fa fa-sort-asc");
        $(obj).css("padding-top", "6px");
        $("#" + tbGrid_id + "_filter").hide();//全文搜索栏隐藏
        $("#" + btnSearch_id).show();//查询按钮显示
        $("#" + btnReset_id).show();//重置按钮显示
        $("#" + t_searchPannel_id).css("float", "left").css("width", "100%");//控制查询条件和操作按钮不换行
    } else {
        //DTServer.Flag true 查询 flase 自动查询
        DTServer.Flag = false;
        $("#" + tbGrid_id).DataTable().ajax.url(url + "_Search");//重载url
        $("#" + t_searchPannel_box_hide_id).hide();
        $(obj).children("i").removeClass("fa fa-sort-asc").addClass("fa fa-sort-desc");
        $(obj).css("padding-top", "0px");
        $("#" + tbGrid_id + "_filter").show();
        $("#" + btnSearch_id).hide();
        $("#" + btnReset_id).hide();
        $("#" + t_searchPannel_id).css("float", "right").css("width", "auto");//控制查询条件和操作按钮不换行
        ResetControlValue();
    }
}

//查询面板关闭隐藏 静态页面用
/* obj :查询按钮  t_searchPannel_id： 查询面板id  t_searchPannel_box_hide_id：隐藏条件组id
 btnSearch_id ： 查询按钮id  tbGrid_id： 对应表格id
 */
function queryTermOpenCxy(obj, t_searchPannel_id, t_searchPannel_box_hide_id, btnSearch_id, tbGrid_id, DATAURL) {

    //将全文搜索值设为空
    //var url = DATAURL;
    $("#" + tbGrid_id + "_filter").find("input").each(function (index, element) {
        $(element).val("");
    });
    if ($("#" + t_searchPannel_box_hide_id).is(":hidden") == true) {

        //DTServer.Flag true 查询 flase 自动查询
        //DTServer.Flag = true;
        //  $("#" + tbGrid_id).DataTable().ajax.url(url);//重载url
        //查询条件显示时操作
        $("#" + t_searchPannel_box_hide_id).show();
        $(obj).children("i").removeClass("fa fa-sort-desc").addClass("fa fa-sort-asc");
        $(obj).css("padding-top", "6px");
        $("#" + tbGrid_id + "_filter").hide();//全文搜索栏隐藏
        $("#" + btnSearch_id).show();//查询按钮显示

        $("#btnReset").show();//查询按钮显示
        $("#" + t_searchPannel_id).css("float", "left").css("width", "100%");//控制查询条件和操作按钮不换行
    } else {
        //DTServer.Flag true 查询 flase 自动查询
        //DTServer.Flag = false;
        //  $("#" + tbGrid_id).DataTable().ajax.url(url+"_Search");//重载url
        $("#" + t_searchPannel_box_hide_id).hide();
        $(obj).children("i").removeClass("fa fa-sort-asc").addClass("fa fa-sort-desc");
        $(obj).css("padding-top", "0px");
        $("#" + tbGrid_id + "_filter").show();
        $("#" + btnSearch_id).hide();
        $("#btnReset").hide();//查询按钮显示
        $("#" + t_searchPannel_id).css("float", "right").css("width", "auto");//控制查询条件和操作按钮不换行
    }
}


//全选、取消全选
function allSelect(tbGrid_id,tcheckId) {
    if ($("#" + tbGrid_id + " #"+tcheckId).is(":checked")) {
        $("#" + tbGrid_id + " [name=tcheckbox]:checkbox").prop("checked", true);
    } else {
        $("#" + tbGrid_id + " [name=tcheckbox]:checkbox").prop("checked", false);
    }
}

//全选、取消全选
function allSelectCancel(tbGrid_id) {
    if ($("#" + tbGrid_id + " #selectAll").is(":checked")) {
        $("#" + tbGrid_id + "[name=t_checks]:checkbox").prop("checked", true);
        $(".t-check-all").addClass("t-check-all-on");
        $(".t-check").addClass("t-check-on");

    } else {
        $("#" + tbGrid_id + "[name=t_checks]:checkbox").prop("checked", false);
        //$(".t_check").addClass("t_check_on");
        //$(this).removeClass("t_check_on");
        $("#" + tbGrid_id + "[name=t_checks]:checkbox").removeClass("t-check-on");

        $(".t-check-all").removeClass("t-check-all-on");
        $(".t-check").removeClass("t-check-on");
    }
}
function eidtPageSize(size) {
    alert("每页显示" + size + "条");
}
//模态框禁用滚动条
$(function () {
    var Modal = {};
    //解决Modal弹出时页面左右移动问题
    Modal.adjustBody_beforeShow = function () {
        var body_scrollHeight = $('body')[0].scrollHeight;
        var docHeight = document.documentElement.clientHeight;
        if (body_scrollHeight > docHeight) {
            $('body').css({
                'overflow': 'hidden',
                'margin-right': '15px'
            });
            $('.modal').css({ 'overflow-y': 'scroll' })
        } else {
            $('body').css({
                'overflow': 'auto',
                'margin-right': '0'
            });
            $('.modal').css({ 'overflow-y': 'auto' })
        }
    }
    Modal.adjustBody_afterShow = function () {
        var body_scrollHeight = $('body')[0].scrollHeight;
        var docHeight = document.documentElement.clientHeight;
        if (body_scrollHeight > docHeight) {
            $('body').css({
                'overflow': 'auto',
                'margin-right': '0'
            });
        } else {
            $('body').css({
                'overflow': 'auto',
                'margin-right': '0'
            });
        }
    }
    $('.t-modal').modal('hide');
    $('.t-modal').on('show.bs.modal', function (event) {
        Modal.adjustBody_beforeShow();
    });
    $('.t-modal').on('hidden.bs.modal', function (event) {
        Modal.adjustBody_afterShow();
    });
});
//全屏
function launchFullscreen() {
    var element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else {
        //浏览器不支持全屏API或已被禁用
    }

}
//退出全屏
function exitFullscreen() {
    var elem = document;
    if (elem.webkitCancelFullScreen) {
        elem.webkitCancelFullScreen();
    } else if (elem.mozCancelFullScreen) {
        elem.mozCancelFullScreen();
    } else if (elem.cancelFullScreen) {
        elem.cancelFullScreen();
    } else if (elem.exitFullscreen) {
        elem.exitFullscreen();
    } else {
        //浏览器不支持全屏API或已被禁用
    }
}