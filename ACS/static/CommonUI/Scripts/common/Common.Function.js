//此类为JS公共方法，与业务无关
//2015-09-15 10:13:53 Joe

$(function () {
    //全选，表格菜单的全选功能，checkbox的ID要一致
    //$('#cbQuanXuan').on('click', function () {
    //    var that = this;
    //    $(this).closest('table').find('tr td:first-child :checkbox')
	//	.each(function () {
	//	    this.checked = that.checked;
	//	});
    //});


    //全选，表格菜单的全选功能 - 获取Table中Checkbox实现全选（原方法不适用一个页面多个Table使用全选功能） wangyk 2015-12-22
    $('table input[type=checkbox]').on('click', function () {
        var that = this;
        var TableID = $(this).attr("parentTableID");
        $("#"+TableID).closest('table').find('tr td:first-child :checkbox')
		.each(function () {
		    this.checked = that.checked;
		});
    });



    //限制搜索框输入特殊字符
    $("input[type=search]").keypress(function (evt) {
        evt = (evt) ? evt : window.event
        var specialKey = "#$%\^*\'\"\+";//Specific Key list
        var realkey = String.fromCharCode(evt.keyCode);
        var flg = false;
        flg = (specialKey.indexOf(realkey) >= 0);
        if (flg) {
            showPromptModel('请勿输入特殊字符#$%\^*\'\"\+');
            return false;
        }
    });


    //限制文本框输入特殊字符
    $("input[type=text]").keypress(function (evt) {
        evt = (evt) ? evt : window.event
        var specialKey = "#$%\^*\'\"\+";//Specific Key list
        var realkey = String.fromCharCode(evt.keyCode);
        var flg = false;
        flg = (specialKey.indexOf(realkey) >= 0);
        if (flg) {
            showPromptModel('请勿输入特殊字符#$%\^*\'\"\+');
            return false;
        }
    });
})

//获取URL参数值
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

//设置URL参数值
function setUrlParam(name, value) {
    var url = location.href;
    var pattern = name + '=([^&]*)';
    var replaceText = name + '=' + value;
    if (url.match(pattern)) {
        var tmp = '/(' + name + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
    } else {
        if (url.match('[\?]')) {
            return url + '&' + replaceText;
        } else {
            return url + '?' + replaceText;
        }
    }
    return url + '\n' + name + '\n' + value;
}

//根据参数列表拼接url参数 2015-10-22 17:09:59 liut
//params：url参数列表，形如：
//{"ID":"#searchForm #ID","DESCRIPTION":"#searchForm #DESCRIPTION"};
function joinUrlParams(params) {
    var str = '';
    if (params != null) {
        for (var key in params) {
            str += key + '=' + escape(ReplaceChar($(params[key]).val())) + '&';
        }
        str = str.substring(0, str.length - 1);
    }
    return str;
}

//过滤特殊字符
function ReplaceChar(s) {
    var pattern = new RegExp("[`~!@#$%^&*()+=|{}':;',//[//].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]")
    var rs = "";
    try {
        for (var i = 0; i < s.length; i++) {
            rs = rs + s.substr(i, 1).replace(pattern, '');
        }
    }
    catch (err) {
        showPromptModel('参数错误');
        return false;
    }
    return rs;
}
//设置菜单树展开层级
function expandLevel(treeObj, node, level) {
    var childrenNodes = node.children;
    for (var i = 0; i < childrenNodes.length; i++) {
        treeObj.expandNode(childrenNodes[i], true, false, false);
        level = level - 1;
        if (level > 0) {
            expandLevel(treeObj, childrenNodes[i], level);
        }
    }
}


