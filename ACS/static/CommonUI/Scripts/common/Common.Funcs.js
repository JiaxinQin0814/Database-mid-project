//全局的ajax访问，处理ajax清求时sesion超时 
$.ajaxSetup({
    contentType: "application/x-www-form-urlencoded;charset=utf-8",
    complete: function (XMLHttpRequest, textStatus) {
        var sessionstatus = XMLHttpRequest.getResponseHeader("sessionstatus");  // 通过XMLHttpRequest取得响应头，sessionstatus， 
        if (sessionstatus == "timeout") {
            // 如果超时就处理 ，指定要跳转的页面 
            window.location.href="/Default/Login";
        }
    }
});

/// <reference path="_references.js" />
//showvalue数组 在开始阶段 插入值 在页面加载之后取值并赋值
var orgID = [];
(function (window, $) {
    var func = window.func || (window.func = {});
   
    $.extend(func, {
        //添加
        grid_add: function (dialog) {
            $(dialog).dialog('open')
                     .dialog('setTitle', '添加');
            $(dialog + " form").formReset();
        },
        //编辑
        grid_edit: function (index, grid, dialog) {
            //layer.load(2);
            //var table = $(grid).DataTable();
            //var tds = table.row($(a).closest('tr')).data();
            //var id = $.trim(tds.ID);


            ////ID不允许修改
            //$(dialog + ' #ID').attr("readonly", "true");
            //$('#editModalLabel').text('编辑');


            //$(dialog).modal();
            //$(dialog).on('shown.bs.modal', function () {
            //    // 执行一些动作...
            //    layer.closeAll('loading');
            //})
            //$(dialog).dialog('open')
            //         .dialog('setTitle', '编辑');
            //var row = $(grid).datagrid('getRows')[index];
            //if (row) {
            //    $(dialog + " form").formReset().form("load", row);
            //}
        },
        //删除
        grid_delete: function (index, grid, url) {
            $.messager.confirm("提示信息", "确认删除该条记录吗？", function (result) {
                if (result) {
                    var row = $(grid).datagrid('getRows')[index];
                    //"notice", "info", "success", or "error
                    $.post(url, { data: JSON.stringify(row) }, function (data) {
                        //$.pnotify({ text: '删除成功', type: 'success', delay: 2000 });
                    }, "json");
                }
            });
        },
        //按照键值列的值来实现删除逻辑
        data_delete: function (index, grid, url) {
            $.messager.confirm("提示信息", "确认删除该条记录吗？", function (result) {
                if (result) {
                    var row = $(grid).datagrid('getRows')[index];
                    //if (row == undefined) {
                    //    //func.data_notify('操作提示：', '对不起，页面处理发生异常，请重新刷新试试!', 'error');

                    //    return;
                    //}



                    $.post(url, { data: row.Key }, function (backdata) {
                        if (backdata != undefined && backdata.Result != undefined && backdata.Result == true) {

                            //func.data_notify('操作提示：', '删除成功!', 'success');
                            //$(grid).datagrid('unselectRow', index);
                            //重载当前页面数据
                            //$(grid).datagrid('reload');

                        } else {
                            //func.data_notify('操作提示：', '对不起，后台处理异常，请刷新页面!', 'error');
                        }
                    }, "json");
                }
            });
        },
        //屏幕居中显示提示消息
        data_notify: function (title, text, type) {

            //var modal_overlay;
            //$.pnotify({
            //    title: title,
            //    text: text,
            //    type: type,
            //    delay: 2000,
            //    history: false,
            //    stack: false,
            //    before_open: function (pnotify) {
            //        // 定位到屏幕居中的位置
            //        pnotify.css({
            //            "top": ($(window).height() / 2) - (pnotify.height() / 2),
            //            "left": ($(window).width() / 2) - (pnotify.width() / 2)
            //        });
            //        // Make a modal screen overlay.
            //        if (modal_overlay)
            //            modal_overlay.fadeIn("fast");
            //        else
            //            modal_overlay = $("<div />", {
            //                "class": "ui-widget-overlay",
            //                "css": {
            //                    "display": "none",
            //                    "position": "fixed",
            //                    "top": "0",
            //                    "bottom": "0",
            //                    "right": "0",
            //                    "left": "0"
            //                }
            //            }).appendTo("body").fadeIn("fast");
            //    },
            //    before_close: function () {
            //        modal_overlay.fadeOut("fast");
            //    }
            //});
        },
        //保存数据
        submitData: function (dialog, grid) {
            var $form = $(dialog + " form");
            $form.submit();
            $(dialog).dialog("close");
            $(grid).datagrid("reload");
            //amplify.publish("dialog.method", "close");
            //amplify.publish("grid.method", "reload");
        },
        //mode 0:dialog 1:location
        data_opreation: function (mode, url, dialog, title) {
            if (mode == 0) {
                $(dialog + " iframe").attr("src", url);
                $(dialog).dialog('open')
                         .dialog('setTitle', title);
                //amplify.publish("dialog.method", "open", url);
            }
            else if (mode == 1) {
                location = url;
            }
        },
        //获取单个表单的实体数据
        getRemoteData: function (url) {
            $(document).ready(function () {
                var urlpath = url;
                if (!(urlpath == undefined || urlpath == "")) {
                    $.ajax({
                        url: urlpath,
                        type: "post",
                        cache: false,
                        //    async:"false",
                        dataType: "JSON",
                        success: function (msg) {
                            var CallBackData = msg;
                            //var strCB = CallBackData.join(",");
                            
                            if (CallBackData == undefined || CallBackData == "") {
                                return;
                            }
                            var jsonObj = CallBackData;//eval("(" + CallBackData + ")");
                            if (jsonObj != undefined) {
                               // var datatype = jsonObj.Datatype;
                                func.bindForm(jsonObj);//(jsonObj.Value);
                            } else {
                                func.data_notify("操作提示", "远程返回JSON解析异常！", "error");
                            }
                        },
                        error: function (msg) {
                            func.data_notify("操作提示", "远程数据请求异常: " + msg, "error");
                        }
                    });
                }
            });
        },
        //提取url中以字符'?'后一位开始的所有参数
        seekUrlPara: function (url) {
            if (url == undefined || url == "") {
                return "";
            }
            var urlpath = "";
            if (typeof (url) == "object") {
                urlpath = url.toString();
            } else {
                urlpath = url;
            }
            var whArray = urlpath.split('?');
            if (whArray == undefined || whArray.length < 2) {
                return "";
            }
            return whArray[1];
        },
        //通过参数名称来解析url地址中的参数值
        seekParameter: function (url, paraname) {
            if (url == undefined || url == "" || paraname == undefined || paraname == "") {
                return -1;
            }
            var urlpath = "";
            if (typeof (url) == "object") {
                urlpath = url.toString();
            } else {
                urlpath = url;
            }
            var action = -1;
            //?????????????????????
            //以?分割数组抽取
            var whArray = urlpath.split('?');
            for (var i = 0; i < whArray.length; i++) {
                //&&&&&&&&&&&&&&&
                //以&分割数组抽取,此种场景为当地址参数为多个的情形
                //?para=xxx&para2=yyy&para3=zzz
                var yhArray = whArray[i].split('&');
                if (yhArray.length == 1) {
                    //此时，如果地址参数只有一个参数的情形
                    //?para=xxx
                    //===============
                    //以=分割数组抽取
                    if (yhArray == undefined || yhArray[0] == undefined || yhArray[0].indexOf('=') == -1) { continue; }
                    var dhArray = yhArray[0].split('=');
                    if (dhArray == undefined || dhArray.length == 1) { continue; }
                    for (var k = 0; k < dhArray.length; k++) {
                        if (dhArray[k] == paraname) {
                            action = dhArray[k + 1];
                            break;
                        }
                    }
                    //退出条件
                    if (action != -1) {
                        break;
                    }
                    //===============
                    continue;
                }
                for (var j = 0; j < yhArray.length; j++) {
                    //===============
                    //以=分割数组抽取
                    var dhArray = yhArray[j].split('=');
                    if (dhArray.length == 1) { continue; }
                    for (var k = 0; k < dhArray.length; k++) {
                        if (dhArray[k] == paraname) {
                            action = dhArray[k + 1];
                            break;
                        }
                    }
                    //退出条件
                    if (action != -1) {
                        break;
                    }
                    //===============
                }
                //退出条件
                if (action != -1) {
                    break;
                }
                //&&&&&&&&&&&&&&&
            }
            //?????????????????????
            return action;
        },
        //针对简单表单注册提交事件,submitJson
        registerPageInit: function (frmID) {
            
            //解析页面初始参数,目前这里只支持一个form的情况
            if (frmID == undefined || frmID == "") {
                var express = "";
                var frmArray = document.forms;
                //遍历找出form的属性
                for (var i = 0; i < frmArray.length; i++) {
                    express = "$(\"#" + frmArray[i].id + "\").submitJson();";
                    eval(express);
                    //alert(express);
                }
            } else {
                
                express = "$(\"#" + frmID + "\").submitJson();";
                eval(express);
                //alert(express);
            }
        },
        //绑定所有的表单控件
        bindForm: function (objects) {           
            // for (var c in objects) {
            objects = eval(objects);

            for (var item in objects) {
                func.bindFormEle(item, objects[item]);
            }
           
                //for (var items in o)
                //{
                //    func.bindFormEle(items, objects[items]);
                //}
                
            //}
        },
        //下拉多选框cID ID
        //checkbox验证  返回true 有选择项 false 无选择项
        validataCheckbox: function (cID) {
            var d = cID + "M";            
            var flag = false;
            var inputname = "input[name='" + d + "']";
            $(inputname).each(function () {
                if (this.type == "checkbox" && this.checked) {
                    flag = true;
                    return true;
                }
            });
            if (!flag) {
                var sid = "#" + cID + "div";
                layer.tips('此内容为必填项,请输入！', sid, {
                    tipsMore: true
                });
            }
            return flag;
        },
        //绑定下拉框
        getSelectJson: function (selectElement) {
            var url = $(selectElement).attr("DATAURL");
            if (url == "" || url == undefined) {
                return;
            }
            $.ajax({
                type: $(selectElement).attr("types"),
                url: $(selectElement).attr("DATAURL"),
                dataType: "json",
                cache: "false",
                async: $(selectElement).attr("async"),
                success: function (data) {
                    var valueFiled = "ID";
                    var textFiled = "DESCRIPTION";
                    var CallBackData = data["data"];
                    $(selectElement).empty();
                    if ($(selectElement).attr("selectAll") == "true") {
                        $(selectElement).append("<option selected='selected' value=''>请选择</option>"); //为Select追加一个Option(下拉项)   
                    }
                    for (var i = 0; i < CallBackData.length; i++) {
                        for (var item in CallBackData[i]) {
                            if (item == $(selectElement).attr("textFiled")) {  //item 表示Json串中的属性，如'name'  
                                //获取textFiled 
                                var jText = CallBackData[i];//CallBackData[i]所对应的value
                                textFiled = jText[item];
                            }
                            else if (item == $(selectElement).attr("valueFiled")) {
                                //获取valueFiled
                                var jValue = CallBackData[i];//CallBackData[i]所对应的value
                                valueFiled = jValue[item];
                            }
                            if (valueFiled != "ID" && textFiled != "DESCRIPTION") {
                                $("<option value='" + valueFiled + "'>" + textFiled + "</option>").appendTo($(selectElement));
                                valueFiled = "ID";
                                textFiled = "DESCRIPTION";
                            }
                        }
                        //调用下拉格式
                        if (CallBackData.length - 1 == i) {
                            if (valueFiled == "ID" && textFiled == "DESCRIPTION")
                            {
                                return true;
                            }
                            $(selectElement).append("<option  value='" + valueFiled + "'>" + textFiled + "</option>");
                        }

                    }
                }
            });
        },
        //遍历html元素
        reSource: function () {
            //清空数组
            orgID.length = 0;
            var obj = document.getElementsByTagName("*");
            for (var i = 0; i < obj.length; i++) {
                //alert(obj[i].tagName);//标签名称
                switch (obj[i].tagName)
                {
                    case "SELECT":
                        //下拉多选控件
                        if (obj[i].tagName == "SELECT") {
                            if (obj[i].className == "build-select-all-select") {
                                func.GetSelect("#" + obj[i].id);
                            }
                            else {
                                var id = "#" + obj[i].id;
                                func.getSelectJson(id);
                            }
                        }
                        break;
                    case "DIV":
                        var id = "#" + obj[i].id;
                        if ($(id).attr("showvalue") == "true") {
                            orgID.push(id);
                        }
                        break;
                }
                
            }
        },
        //加载之后取值并赋值
        onlaodvalue: function () {
            for (var i = 0; i < orgID.length; i++) {
                var showVal = orgID[i];
                var DATAURL = $(showVal).attr("DATAURL");
                $.ajax({
                    type: $(showVal).attr("types"),
                    cache: false,
                    async: "false",
                    dataType: "JSON",
                    url: DATAURL,
                    success: function (msg) {
                        var CallBackData = msg["data"];
                        for (var i = 0; i < CallBackData.length; i++) {
                            for (var item in CallBackData[i]) {
                                var chiElement = showVal + " [name=" + item + "]";
                                if (chiElement == undefined || chiElement == "") return true;
                                var eID = "#" + $(chiElement).attr("ID");
                                var jText = CallBackData[i];//CallBackData[i]所对应的value                        
                                var count = 0;
                                var AllElemt = $(chiElement).each(function () {
                                    if ($(this)[count].tagName == undefined) return true;
                                    switch ($(this)[count].tagName) {
                                        //如果是INPUT 则直接赋值
                                        case "INPUT":
                                            var eType = $(this)[count].type;
                                            switch (eType) {
                                                case "text": $(eID).val(jText[item]); break;
                                                case "checkbox": jText[item] == "true" ? $(eID).attr("checked", "checked") : $(eID).attr("checked", false); break;
                                            }
                                            break;
                                        case "LABEL": $(eID).html(jText[item]); break;
                                    }
                                    count++;
                                });
                            }
                        }
                    },
                    error: function (msg) {
                        showPromptModel(msg);
                    }
                });
            }
        },
        //获取Select元素的结果
        GetSelect: function (selectElement) {
            $.ajax({
                type: $(selectElement).attr("types"),
                cache: false,
                dataType: "JSON",
                url: $(selectElement).attr("DATAURL"),
                success: function (msg) {
                    var valueFiled = "ID";
                    var textFiled = "DESCRIPTION";
                    var CallBackData = msg["data"];
                    for (var i = 0; i < CallBackData.length; i++) {
                        for (var item in CallBackData[i]) {
                            if (item == $(selectElement).attr("textFiled")) {  //item 表示Json串中的属性，如'name'  
                                //获取textFiled 
                                var jText = CallBackData[i];//CallBackData[i]所对应的value
                                textFiled = jText[item];
                            }
                            else if (item == $(selectElement).attr("valueFiled")) {
                                //获取valueFiled
                                var jValue = CallBackData[i];//CallBackData[i]所对应的value
                                valueFiled = jValue[item];
                            }
                            if (valueFiled != "ID" && textFiled != "DESCRIPTION") {
                                $("<option value='" + valueFiled + "'>" + textFiled + "</option>").appendTo($(selectElement));
                                valueFiled = "ID";
                                textFiled = "DESCRIPTION";
                            }
                        }
                        //调用下拉格式
                        if (CallBackData.length - 1 == i) {
                            multiselect(selectElement);
                        }
                    }
                },
                error: function (msg) {
                    showPromptModel(msg);
                }
            });
        },
        //找到对应的控件赋值
        bindFormEle: function (key, value) {
            //此处假设模拟一个表单，如果有存在多个表单，需要迭代解析每一个表单
            var frm = document.forms[0];
            //----------------------------------------------------------------
            for (var i = 0; i < frm.length; i++) {
                if (frm[i].id == key) {
                    var express = "";
                    //此处需要注意，不同的控件类型值不同，数据绑定的方式可能会有差异，数据类型，可以通过扩展函数类型的方式来处理
                    if (frm[i].className != undefined && frm[i].className != "") {
                        //按照easyui的特性来赋值
                        if (frm[i].className.indexOf("easyui-combobox") > -1) {
                            //按照combobox赋值语法构建赋值表达式
                            express = "$(\"#" + key + "\").combobox('setValue','" + value + "');";
                            //$('#cc').combobox('setValue', '001');
                        } else if (frm[i].className.indexOf("easyui-datebox") > -1) {
                            //按照datebox赋值语法构建赋值表达式
                            express = "$(\"#" + key + "\").datebox('setValue','" + value + "');";
                        } else {
                            //默认按照jquery默认方式赋值
                            express = "$(\"#" + key + "\").val('" + value + "');";
                        }
                    } else {
                        express = "$(\"#" + key + "\").val('" + value + "');";
                    }
                    //alert("express:" + express + " .class : " + frm[i].className);
                    eval(express);
                    return;
                }
            }
            //----------------------------------------------------------------
        },
        //警报框
        //alert: $.messager.alert || window.alert,
        //确认框
        //confirm: $.messager.confirm || window.confirm,
        //提示框
        //prompt: $.messager.prompt || window.prompt,
        //进度框
       // progress: $.messager.progress,
        //属性参数格式可能为 params='p1,p2:abc,p3:@userid'
        bulidBehaviorUrl: function (baseurl, behaviorname, params) {
            var obj = {};
            var par = null;
            var url = baseurl + "?behaviorname=" + behaviorname;
            var array = (params || "").split(",");
            $.each(array, function (i, item) {
                par = (item || "").split(":");
                if (par.length == 1) {
                    par[1] = CONFIG[par[0]] || $("#pageParams").find("[name=" + par[0] + "]").val();
                }
                else if (par.length == 2 && /^@/.test(par[1])) {
                    par[1] = par[1].replace(/^@/, '');
                    par[1] = CONFIG[par[1]] || $("#pageParams").find("[name=" + par[1] + "]").val();
                }
                obj[par[0]] = par[1];


            });
            url += "&beparameters=" + JSON.stringify(obj);
            return url;
        },
        dateHourDiff: function (date1, date2) {
            try {
                var dt1 = new Date(Date.parse(date1.replace(/-/g, '/')));
                var dt2 = new Date(Date.parse(date2.replace(/-/g, '/')));
                return Math.round((dt2.getTime() - dt1.getTime()) / (1000 * 60 * 60));
            }
            catch (e) {
                return;
            }
        },
        dateMinDiff: function (date1, date2) {
            try {
                var dt1 = new Date(Date.parse(date1.replace(/-/g, '/')));
                var dt2 = new Date(Date.parse(date2.replace(/-/g, '/')));
                return Math.round((dt2.getTime() - dt1.getTime()) / (1000 * 60));
            }
            catch (e) {
                return;
            }
        }
    });
})(window, window.jQuery);

window.onload = function () {
    //加载之后取值并赋值
    func.onlaodvalue();
}


//将分钟转换为10:10
function changeMinute(num) {
    var msg = "";
    if (num < 60) {
        msg = "00:" + (num < 10 ? ("0" + num) : num);
    }
    else {
        var h = parseInt(num / 60);
        var m = num - h * 60;
        msg = h + ":" + (m < 10 ? ("0" + m) : m);
    }
    return msg;
}
//技术等级排序
var _techLevel = {
    'F0': 0, 'F1': 1, 'F2': 2, 'F3': 3, 'F4': 4,
    'F5': 5, 'M': 6, 'J': 7, 'A1': 8, 'A2': 9, 'TA': 10, 'TB': 11, 'TC': 12
};
function techLevelSorter(a, b) {
    a = _techLevel[a];
    b = _techLevel[b];
    if (a < b)
        return 1;
    else
        return -1;
}

//正常TABEL加载数据
function showTableTh(ithis, json, i) {
    var html = "";
    $(ithis).find("th[bindcol]").each(function () {
        if (typeof ($(this).attr("bindcol")) != "undefined" && typeof ($(this).attr("controlType")) == "undefined") {
            html += "<td>" + json[i][$(this).attr("bindcol")] + "</td>";
        }
    });
    $(ithis).find("th[controlType]").each(function () {
        if (typeof ($(this).attr("controlType")) != "undefined") {
            html += "<td><input name='" + json[i]["id"] + "' type ='" + $(this).attr("controlType") + "' /></td>";
        }
    });
    return html;
}

//正常TABEL加载数据
function showTableThtop(ithis, json, i) {
    var html = "";
    $(ithis).find("tr").eq(0).children().each(function () {
        if (typeof ($(this).attr("bindcol")) != "undefined" && typeof ($(this).attr("controlType")) == "undefined") { //过滤控件
            if ($(this).attr("bindcol") == "FREMARK") {
                html += "<td>&nbsp;</td>";
            } else {
                html += "<td>" + json[i][$(this).attr("bindcol")] + "</td>";
            }
        } else if (typeof ($(this).attr("controlType")) != "undefined") {
            if ($(this).attr("controlType") == "textbox") {
                html += "<td><input type='hidden' name='id' value='" + json[i]["id"] + "'/><input style='width:350px;' name='" + $(this).attr("bindcol") + "' type ='" + $(this).attr("controlType") + "' /></td>";
            } else if ($(this).attr("controlType") == "hidden") {
                html += "<td style='display:none;'><input name='" + $(this).attr("bindcol") + "' type ='" + $(this).attr("controlType") + "' value='" + json[i][$(this).attr("bindcol")] + "' /></td>";
            } else {
                html += "<td><input name='" + $(this).attr("bindcol") + "' type ='" + $(this).attr("controlType") + "' /></td>";
            }
        } else if (typeof ($(this).attr("colSpan")) != "undefined") {
            var icount = parseInt($(this).attr("colSpan"));
            var pthis = this;
            var pcont = 0;
            //            $(pthis).parent().find("th[colSpan]").each(function () {
            //                if (this == pthis) {
            //                    return false;
            //                }
            //                pcont += parseInt($(this).attr("colSpan"));
            //            });
            $(this).parent().next().children().each(function (n) {
                if (n >= pcont && n < (icount + pcont)) {
                    if (typeof ($(this).attr("bindcol")) != "undefined" && typeof ($(this).attr("controlType")) == "undefined") {
                        html += "<td>" + json[i][$(this).attr("bindcol")] + "</td>";
                    } else if (typeof ($(this).attr("controlType")) != "undefined") {
                        if ($(this).attr("controlType") == "radio") {
                            html += "<td><input name='" + $(this).attr("bindcol") + "_" + json[i]["id"] + "' value='" + $(this).attr("value") + "' type ='" + $(this).attr("controlType") + "' /></td>";
                        } else if ($(this).attr("controlType") == "hidden") {
                            html += "<td style='display:none;'><input name='" + $(this).attr("bindcol") + "' type ='" + $(this).attr("controlType") + "' value='" + json[i][$(this).attr("bindcol")] + "' /></td>";
                        } else {
                            html += "<td><input name='" + $(this).attr("bindcol") + "' type ='" + $(this).attr("controlType") + "' /></td>";
                        }
                    }
                }
            });
        }
    });
    return html;
}

//删除方法
function deletefileupload(ithis) {
    $.ajax({
        url: ".." + $(ithis).attr("data-url"),
        async: true,
        type: "POST",
        cache: false,
        success: function (responseData) {
            if (responseData) {
                $(ithis).parent().parent().remove();
            }
            else {
                alert('数据不能被删除！');
            }
        }
    });
}

/////////////////////////////////////////     
//   功能：检查表格是否规整     
//   参数：tb－－需要检查的表格ID      
/////////////////////////////////////////
function checkTable(tb) {
    if (tb.rows.length == 0) return false;
    if (tb.rows[0].cells.length == 0) return false;
    for (var i = 0; i < tb.rows.length; i++) {
        if (tb.rows[0].cells.length != tb.rows[i].cells.length) return false;
    }
    return true;
}

//加载报表
function BindChart(data, ChartRenderID, ChartType, chartWidth, chartHeight) {
    var ChartGuid = NewGuid();
    //var ChartHeight = $("#" + ChartRenderID + "").parent().prev("div").height();
    var myChart = new FusionCharts("../Chart/" + ChartType + ".swf", ChartGuid, chartWidth, chartHeight, "0", "1");
    myChart.setDataXML(data);
    myChart.render(ChartRenderID);
}
//guID
function NewGuid() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "";
    }
    return guid;
}

//时间 C 客户端 S 服务端 
function getTime(CS)
{
    var myDate = new Date();
    if (CS = undefined || CS == "" || CS == null)
    {        
        return myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate()
        +" "+ myDate.getHours() + ':' //获取当前小时数(0-23)
       + myDate.getMinutes() + ':' //获取当前分钟数(0-59)
       + myDate.getSeconds(); //获取当前秒数(0-59);
    }
    else
    {
        return myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate()
       + " " + myDate.getHours() + ':' //获取当前小时数(0-23)
      + myDate.getMinutes() + ':' //获取当前分钟数(0-59)
      + myDate.getSeconds(); //获取当前秒数(0-59);
    }
    
}

//设置TABLE返回值的通用方法
function setTableRelList(id) {
    var elem = document.getElementById(id);
    elem["getValue"] = function () {
        var arrays = [];
        var n = $(elem).find("tr").size();
        $(elem).find("tr").each(function (i) {
            if ($(this).hasClass("classF4SF5AirLicCheckR")) {
                var radioName = "";
                var ithis = this;
                var obj = {};
                $(this).find("input").each(function () {
                    if ($(this).attr("type") == "radio") {
                        var strs = new Array();
                        strs = $(this).attr("name").split("_"); //字符分割   
                        if (radioName != strs[0]) {
                            var chooseobject = $(ithis).find("input:radio[name^='" + strs[0] + "']:checked").val();
                            if (typeof (chooseobject) != "undefined") {
                                obj[strs[0]] = chooseobject;
                            } else {
                                obj[strs[0]] = "";
                            }
                        }
                        radioName = strs[0];
                    } else if ($(this).attr("type") == "checkbox") {
                        if ($(this)[0].checked) {
                            obj[$(this).attr("name")] = "1";
                        } else {
                            obj[$(this).attr("name")] = "0";
                        }
                    } else {
                        obj[$(this).attr("name")] = $(this).val();
                    }
                });
                arrays.push(obj);
            }
        });
        return arrays;
    };
    elem["setValue"] = function (val) {
        //alert("");
    };
}
//小数转百分比方法
Number.prototype.toPercent = function (n) {
    n = n || 0;
    return (Math.round(this * Math.pow(10, n + 2)) / Math.pow(10, n)).toFixed(n) + '%';
}

//扩展数组方法
/*
Array.prototype.in_array = function (e) {
for (i = 0; i < this.length; i++) {
if (this[i] == e)
return true;
}
return false;
}  
*/
// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function (fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//获取服务器时间
function GetSystemDate() {
    var systemDate = new Date();
    $.ajax({
        type: "Post",
        async: false,
        url: "../GHPQ/Load?behaviorname=GetSystemTimeToString",
        dataType: "json",
        success: function (data) {
            systemDate.setUTCFullYear(data.Year, parseInt(data.Month) - 1, data.Day);
            systemDate.setUTCHours(data.Hour, data.Minute, data.Second, 0);
        }
    });
    return systemDate;
}

//公共多选筐
function multiselect(selectElement) {
    if (selectElement == undefined) return;
    // Test build of multiselect.
    var build = function (select, tr) {
        select.multiselect();

        if (select.length === 0) {
            return 'Select not present anymore.';
        }

        if (select.css('display') !== 'none') {
            return 'Select still visible (expected <code>display: none;</code>).';
        }

        if ($('button.multiselect', tr).length === 0) {
            return 'Multiselect button not present.';
        }

        if ($('option', select).length !== 5) {
            return 'Not all options present anymore.';
        }

        if ($('ul.multiselect-container', tr).length === 0) {
            return 'Unordered list <code>.multiselect-container</code> not present.';
        }

        if ($('ul.multiselect-container li', tr).length !== 5) {
            return 'No list item for each option present.';
        }

        if ($('ul.multiselect-container li a', tr).length !== 5) {
            return 'Not all list items come with an anchor inside.';
        }

        return false;
    }($('#test-build-select'), $('#test-build-tr'));

    if (build) {
        $('#test-build-tr').removeClass('success').addClass('danger');
        $('#test-build-tr td').last().html(build);
    }

    // Test build with optgroups.
    var buildOptgroups = function (select, tr) {
        select.multiselect();

        if ($('optgroup', select).length !== 2) {
            return 'Optgroups not present anymore (2 expected).';
        }

        var first = $('optgroup', select).get(0);
        var second = $('optgroup', select).get(1);

        if ($('option', $(first)).length !== 2) {
            return 'First optgroup does not have 2 options.';
        }

        if ($('option', $(second)).length !== 3) {
            return 'Second optgroup does not have 3 options.';
        }

        // Check the corresponding labels.
        if ($('label.multiselect-group', tr).length !== 2) {
            return 'Expected 2 labels within the unordered list.';
        }

        // Check labeling of groups.
        var firstLabel = $('label.multiselect-group', tr).get(0);
        var secondLabel = $('label.multiselect-group', tr).get(1);

        if ($(firstLabel).text() !== $(first).prop('label')) {
            return 'First group labeled incorrectly.';
        }

        if ($(secondLabel).text() !== $(second).prop('label')) {
            return 'Second group labeled incorrectly.';
        }

        return false;
    }($('#test-build-optgroups-select'), $('#test-build-optgroups-tr'));

    if (buildOptgroups) {
        $('#test-build-optgroups-tr').removeClass('success').addClass('danger');
        $('#test-build-optgroups-tr td').last().html(build);
    }

    var buildSelected = function (select, tr) {
        select.multiselect();

        if ($('option:selected', select).length !== 1) {
            return 'Multiselect did not adopt selected options (1 selected option).';
        }

        if ($('ul.multiselect-container li.active', tr).length !== 1) {
            return 'Corresponding list item not set to <code>.active</code>.';
        }

        return false;
    }($('#test-build-selected-select'), $('#test-build-selected-tr'));

    if (buildSelected) {
        $('#test-build-selected-tr').removeClass('success').addClass('danger');
        $('#test-build-selected-tr td').last().html(buildSelected);
    }

    var buildSelectAll = function (select, tr) {
        var value = 'multiselect-select-all';
        select.multiselect({
            includeSelectAllOption: true,
            selectAllValue: value
        });

        if ($('.multiselect-container input[value="' + value + '"]', tr).length !== 1) {
            return 'Expected exactly one input with value ' + value + ' as select all option.';
        }

        return false;
    }($('#test-build-select-all-select'), $('#test-build-select-all-tr'));

    if (buildSelectAll) {
        $('#test-build-select-all-tr').removeClass('success').addClass('danger');
        $('#test-build-select-all-tr td').last().html(buildSelectAll);
    }

    var buildFilter = function (select, tr) {
        select.multiselect({
            enableFiltering: true
        });

        if ($('.multiselect-search', tr).length !== 1) {
            return 'No search input present.';
        }

    }($('#test-build-filter-select'), $('#test-build-filter-tr'));

    if (buildFilter) {
        $('#test-build-filter-tr').removeClass('success').addClass('danger');
        $('#test-build-filter-tr td').last().html(buildFilter);
    }

    // Test select.
    var select = function (selectElement, tr) {
        selectElement.multiselect();

        // Check for no selected options and no active li's.
        if ($('option:selected', selectElement).length > 0) {
            return 'There are already selected options (0 expected).';
        }

        if ($('ul.multiselect-container li.active', tr).length > 0) {
            return 'There are already active list items (0 expected).';
        }

        selectElement.multiselect('select', '1');

        if ($('option:selected', selectElement).length !== 1) {
            return 'Just selected an option - option not marked selected.';
        }

        if ($('ul.multiselect-container li.active', tr).length !== 1) {
            return 'Just selected an option - list item not set active.';
        }

        if ($('option:selected', selectElement).first().val() !== '1') {
            return 'Wrong option selected.';
        }

        selectElement.multiselect('select', ['2', '3']);

        if ($('option:selected', selectElement).length !== 3) {
            return 'Just selected two additional options - options not marked selected.';
        }

        if ($('ul.multiselect-container li.active', tr).length !== 3) {
            return 'Just selected two additional options - list items not set active.';
        }

        var second = $('option:selected', selectElement).get(1),
			third = $('option:selected', selectElement).get(2);

        if (second === undefined || second.length === 0) {
            return 'Could not get second option.';
        }

        if (third === undefined || third.length === 0) {
            return 'Could not get third option.';
        }

        if ($(second).val() !== '2' || $(third).val() !== '3') {
            return 'Wrong options selected.';
        }

        return false;
    }($('#test-select-select'), $('#test-select-tr'));

    if (select) {
        $('#test-select-tr').removeClass('success').addClass('danger');
        $('#test-select-tr td').last().html(select);
    }

    // Test deselect.
    var deselect = function (select, tr) {
        select.multiselect();

        // Check for no selected options and no active li's.
        if ($('option:selected', select).length !== 3) {
            return 'There should be 3 options selected.';
        }

        if ($('ul.multiselect-container li.active', tr).length !== 3) {
            return 'There should be 3 list items set to active.';
        }

        select.multiselect('deselect', '1');

        if ($('option:selected', select).length !== 2) {
            return 'Just deselected an option - option not marked deselected.';
        }

        if ($('ul.multiselect-container li.active', tr).length !== 2) {
            return 'Just deselected an option - list item not set inactive.';
        }

        if ($('option:selected', select).first().val() !== '2') {
            return 'Wrong option deselected.';
        }

        select.multiselect('deselect', ['2', '3']);

        if ($('option:selected', select).length > 0) {
            return 'Just deselected two additional options - options not marked deselected.';
        }

        if ($('ul.multiselect-container li.active', tr).length > 0) {
            return 'Just deselected two additional options - list items not set unactive.';
        }

        return false;
    }($('#test-deselect-select'), $('#test-deselect-tr'));

    if (deselect) {
        $('#test-deselect-tr').removeClass('success').addClass('danger');
        $('#test-deselect-tr td').last().html(deselect);
    }

    var maxHeight = function (select, tr) {

        select.multiselect({
            maxHeight: 100
        });

        var height = $('.multiselect-container', tr).css('max-height');
        if (height !== '100px') {
            return 'Max height not set correctly (set: ' + height + ').';
        }

        return false;
    }($(selectElement), $('#test-max-height-tr'));

    if (maxHeight) {
        $('#test-max-height-tr').removeClass('success').addClass('danger');
        $('#test-max-height-tr td').last().html(maxHeight);
    }
};

