//此类为公共的弹窗js 
//2015年9月25日14:33:45 liut

//点各种操作，显示弹出框 liut 2015/09/25
//说明：使用该方法时，这里所用到的元素id和属性
//      在页面上要有定义，在自己的js里要有setText方法
//id【可选】：modal的id，缺省值为“editModal”,tID tableID 
function showOperationDialog(a, id) {
    //layer.msg('加载中……', { icon: 16 });
    layer.load(2);
    var modalId = id == null ? "editModal" : id;
    var operate = $(a).attr("operate");
    setButton(operate, modalId);
    //页面多个table
    var tID = $(a).attr("TGRIDS");
    setText(operate, a, tID);
    switch (operate) {
        case "create":
            $('#' + modalId + ' #ID').removeAttr("readonly");
            $('#editModalLabel').text('新增');
            break;
        case "edit":
            //ID不允许修改
            $('#' + modalId + ' #ID').attr("readonly", "true");
            $('#editModalLabel').text('编辑');
            break;
        case "view":
            $('#editModalLabel').text('详情');
            break;
        default:
            return;
    }
    $('#' + modalId).modal({ backdrop: 'static', keyboard: false });
    //$('#' + modalId).on('shown.bs.modal', function () {
    //  执行一些动作...
    layer.closeAll('loading');
    // })
}

//设置按钮
function setButton(operate, modalId) {
    if (operate == "view") {
        //多选框
        $(".btn-group button").attr("disabled", "true");
        $('#' + modalId + ' input').attr("disabled", "true");
        $('#' + modalId + ' select').attr("disabled", "true");
        $('#' + modalId + ' textarea').attr("disabled", "true");
        $('#' + modalId + ' .modal-footer button').hide();
    }
    else {
        //多选框
        $(".btn-group button").removeAttr("disabled");
        $('#' + modalId + ' input').removeAttr("disabled");
        $('#' + modalId + ' select').removeAttr("disabled");
        $('#' + modalId + ' textarea').removeAttr("disabled");
        $('#' + modalId + ' .modal-footer button').show();
    }
}

//点击删除时，显示弹出框
function showRemoveDialog(obj) {

    var del_flag = $(obj).attr('del_flag');
    var grid_id = $(obj).attr('grid_id');
    var table_name = $(obj).attr('table_name');
    var col_name = $(obj).attr('col_name');

    var col_value = '';
    var flag = $(obj).attr('flag');
    switch (flag) {
        //行删除
        case 'Del':
            col_value = "'" + $(obj).attr("col_value") + "'";
            break;

        //批量删除
        case 'DelAll':
            $('#' + grid_id + ' tbody tr td:first-child :checkbox:checked').each(function (index, obj) {
                col_value += "\'" + obj.value + "\',";
            });
            col_value = col_value.substring(0, col_value.length - 1);
            break;
    }

    if (col_value == '') {
        showPromptModel('请选择最少一条数据！');
        return;
    }

    switch (del_flag) {
        case 'P':
            $('#removeForm #BehaviorName').val('Common_Delete_Physical');
            break;
        case 'L':
            $('#removeForm #BehaviorName').val('Common_Delete_Logical');
            break;
    }
    $('#removeForm #TableName').val(table_name);
    $('#removeForm #ColName').val(col_name);
    $('#removeForm #ColValue').val(col_value);
    $('#removeModal').modal({ backdrop: 'static', keyboard: false });
}

//点击删除时，显示弹出框(用于编辑窗体中的附件列表)
//王永康 2016-02-22
function showRemoveDialogOther(obj) {
    var id = '';
    var flag = $(obj).attr('flag');
    if (flag == 'Del') {
        id = "'" + $(obj).attr("fid") + "'";
    } else if (flag == 'DelAll') {
        id = ArrayTfmToString();
    }
    if (id == '') {
        showPromptModel('请选择最少一条数据！');
        return;
    }
    $('#removeFormOther #FID').val(id);
    $('#removeModalOther').modal();
    $('#ISDELETE').val('delete');
}


function showPromptModel(cons,type) {
    var s = '';
    s += '<div class="modal fade" id="Prompt" tabindex="-1" role="dialog">';
    s += '<div class="modal-dialog" role="document">';
    s += '<div class="modal-content">';
    s += '<div class="modal-header t-modal-header">';
    s += '<button type="button" class="close t-modal-close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    if (type == 1)
    {
        s += '<h4 class="modal-title t-modal-title">提示</h4>';
    }
    else
    {
        s += '<h4 class="modal-title t-modal-title">警告</h4>';
    }
    s += '</div>';
    s += '<div class="modal-body"><i class="fa fa-info-circle t-modal-warn-icon"></i><span class="t-modal-warn-content">' + cons;
    s += '</span></div>';
    s += '<div class="modal-footer"><button type="button" class="t-button" data-dismiss="modal">确定</button></div>';
    s += '</div>';
    s += '</div>';
    s += '</div>';
    $('#WarningBox').empty().append(s)
    //设置模态框可拖动
    $('[role="dialog"]').draggable({
        handle: ".modal-header",
        cursor: 'move',
        refreshPositions: false
    });
    //设置模态框弹出垂直居中
    function centerModals() {
        $('[role="dialog"]').each(function (i) {
            var $clone = $(this).clone().css('display', 'block').appendTo('body'); var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
            top = top > 0 ? top : 0;
            $clone.remove();
            $(this).find('.modal-content').css("margin-top", top - 20);
        });
    }
    $('[role="dialog"]').on('show.bs.modal', centerModals);
    $('#Prompt').modal({ backdrop: 'static', keyboard: false });


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

//权限不足，模态框
function ShowAuthDialog() {
    showPromptModel("权限不足！如有需要，请联系系统管理员。");
}

//电子签名，模态框
function ShowSignatureDialog(obj) {
    var imgID = $(obj).attr('img');
    $("#ImgID").val(imgID);
    $('#SignatureModal').modal();
}

//查询条件重置
function ResetControlValue() {
    $('#searchForm select').val("");
    $('#searchForm input[type=text]').val("");
}

//公共弹出框居中设置，必须渲染之后调用Liuxx2016/3/29
function DoailMiddle() {
    //设置模态框可拖动
    $('[role="dialog"]').draggable({
        handle: ".modal-header",
        cursor: 'move',
        refreshPositions: false
    });
    $('[role="dialog"]').on('show.bs.modal', centerModals);
    $('#DvConfirm').modal({ backdrop: 'static', keyboard: false });
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