//此类为公共的弹窗js 
//2015年9月25日14:33:45 liut

//点各种操作，显示弹出框 liut 2015/09/25
//说明：使用该方法时，这里所用到的元素id和属性
//      在页面上要有定义，在自己的js里要有setText方法
//id【可选】：modal的id，缺省值为“editModal”,tID tableID 
//function showOperationDialog(a, id) {
//    //layer.msg('加载中……', { icon: 16 });
//    layer.load(2);
//    var modalId = id == null ? "editModal" : id;
//    var operate = $(a).attr("operate");
//    setButton(operate, modalId);
//    //页面多个table
//    var tID = $(a).attr("TGRIDS");
//    setText(operate, a, tID);
//    switch (operate) {
//        case "create":
//            $('#' + modalId + ' #ID').removeAttr("readonly");
//            $('#editModalLabel').text('新增');
//            break;
//        case "edit":
//            //ID不允许修改
//            $('#' + modalId + ' #ID').attr("readonly", "true");
//            $('#editModalLabel').text('编辑');
//            break;
//        case "view":
//            $('#editModalLabel').text('详情');
//            break;
//        default:
//            return;
//    }
//    $('#' + modalId).modal();
//    $('#' + modalId).on('shown.bs.modal', function () {
//       //  执行一些动作...
//        layer.closeAll('loading');
//    })
//}
//静态页面用，不需要加载
function showOperationDialog(a, id) {
    layer.load(2);
    $('#' + id).modal();
    DoailMiddle();
    layer.closeAll('loading');
}
//function showOperationDialog(a, id) {
//    $('#' + modalId).modal();
//}
//设置按钮
function setButton(operate, modalId) {
    if (operate == "view") {
        $('#' + modalId + ' input').attr("disabled", "true");
        $('#' + modalId + ' select').attr("disabled", "true");
        $('#' + modalId + ' textarea').attr("disabled", "true");
        $('#' + modalId + ' .modal-footer button').hide();
    }
    else {
        $('#' + modalId + ' input').removeAttr("disabled");
        $('#' + modalId + ' select').removeAttr("disabled");
        $('#' + modalId + ' textarea').removeAttr("disabled");
        $('#' + modalId + ' .modal-footer button').show();
    }
}
//点击删除时，显示弹出框
function showPromptDialog(obj){
    layer.alert(obj, {
        skin: 'layui-layer-lan'
        ,closeBtn: 0
//                ,shift: 4 //动画类型
    });
}
//点击删除时，显示弹出框
function showRemoveDialog(obj, controller, action) {
    if (controller != undefined && action != undefined) {
        var url = $('#removeForm').attr("action");
        url = url.substring(0, url.substring(0, url.lastIndexOf('/') - 1).lastIndexOf('/')) + '/' + controller + '/' + action;
        $('#removeForm').attr("action", url);
    }
    //请求路径JHD
    var DATAURL = $(obj).attr('DATAURL');
    if (DATAURL != undefined && DATAURL != "")
    {
        $('#removeForm').attr("action", DATAURL);
    }
    //tableid JHD
    var tgrids = $(obj).attr('TGRIDS');
    var id = '';
    var flag = $(obj).attr('flag');
    if (flag == 'Del') {
        id = "'" + $(obj).attr("fid") + "'";
    } else if (flag == 'DelAll') {
        id = ArrayTfmToString(tgrids);
    }
    if (id == '') {
        showPromptModel('请选择最少一条数据！');
        return;
    }

    $('#removeForm #ID').val(id);
    $('#removeModal').modal();
}

//得到的id集合拼接成string An
function ArrayTfmToString(tgrids) {
    var getChecks=" tbody tr td:first-child :checkbox:checked";
    if (tgrids != "" && tgrids!=undefined)
    {
        //当页面有多个table时
        getChecks="#"+tgrids+getChecks;
    }
    else
    {
        getChecks = "#tbGrid" + tgrids + getChecks;
    }
    var cbs = $(getChecks);
    var s = '';
    cbs.each(function (index, obj) {
        s += "'" + obj.value + "',"; //如果选中，将value添加到变量s中 
    });
    s = s.substring(0, s.length - 1);
    return s;
}

function showPromptModel(a) {
    var s = '';
    s += '<div class="modal fade" id="Prompt" tabindex="-1" role="dialog">';
    s += '<div class="modal-dialog" role="document">';
    s += '<div class="modal-content">';
    s += '<div class="modal-header t-modal-header">';
    s += '<button type="button" class="close t-modal-close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    s += '<h4 class="modal-title t-modal-title">删除</h4>';
    s += '</div>';
    s += '<div class="modal-body"><i class="fa fa-info-circle t-modal-warn-icon"></i><span class="t-modal-warn-content">' + a;
    s += '</span></div>';
    s += '<div class="modal-footer"> <button type="button" class="t-button" data-dismiss="modal">取消 </button>' +
        ' <button type="button" class="t-button" >确定 </button></div>';
    s += '</div>';
    s += '</div>';
    s += '</div>';
    $('#WarningBox').empty().append(s)
    $('#Prompt').modal();
}

//select控件，左右互传
function MoveItem(originalID, newID) {
    var op = $("#" + originalID + "  option:selected").text();
    var flag = 0;
    $("#" + newID + " option").each(function () {
        if ($(this).text() == op) {
            flag = 1;
        }
    });
    if (flag == 0) {
        $("#" + originalID + "  option:selected").appendTo($("#" + newID));
        $("#" + newID + " option").each(function () {
            $(this).attr("selected", false);
        });
    }
}

//权限不足，提示框
function ShowAuthDialog() {
    showPromptModel("权限不足！如有需要，请联系系统管理员。");
}
//bootstrap 模态框垂直居中问题
//function centerModals() {
//    $('#addModal').each(function(i) {
//        var $clone = $(this).clone().css('display', 'block').appendTo('body'); var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
//        top = top > 0 ? top : 0;
//        $clone.remove();
//        $(this).find('.modal-content').css("margin-top", top-20);
//    });
//}
//$('#addModal').on('show.bs.modal', centerModals);
//$(window).on('resize', centerModals);
////bootstrap 模态框拖拽问题
//$("#addModal").draggable({
//    handle: ".modal-header",
//    cursor: 'move',
//    refreshPositions: false
//});
function DoailMiddle() {


    //$(".modal-dialog").wrap("<div style='width: 100%;position: absolute; top: 0;bottom: 0 ' id='modalDragDiv' ></div>");
    //设置模态框可拖动
    $('[role="dialog"]').draggable({
        handle: ".modal-header",
        cursor: 'move',
        refreshPositions: false,
        //containment: "#modalDragDiv",
        // scroll: false
        //snapMode: "inner"
    });
    $('[role="dialog"]').on('show.bs.modal', centerModals);

}

//设置模态框弹出垂直居中
function centerModals() {
    $('[role="dialog"]').each(function (i) {
        var $clone = $(this).clone().css('display', 'block').appendTo('body'); var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-content').css("margin-top", top - 20);
    });
}