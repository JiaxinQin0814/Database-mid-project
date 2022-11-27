//此类为业务公共方法
//2015年9月22日10:31:45

//设置下拉框的选中 2015-10-09 liut
function setSelected(sel) {
    var selected = sel.attr("value") == null ? "" : sel.attr("value");
    sel.val(selected);
}