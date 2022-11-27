/// <reference path="_references.js" />

(function (window, undefined) {

    var controlHooks = window.controlHooks || (window.controlHooks = {});

    $.extend(controlHooks, {
        //多选列表控件
        selectList: {
            get: function (elem) {
                return $(elem).selectList("getValue");
            },
            set: function (elem, value) {
                $(elem).selectList("setValue", value);
            }
        },
        //条件组合
        combination: {
            get: function (elem) {
                if (elem.getValue) {
                    return elem.getValue();
                }
            },
            set: function (elem, value) {
                if (elem.setValue) {
                    elem.setValue(value);
                }
            },
            valid: function (elem) {
                if (elem.valid) {
                    return elem.valid();
                }
            }
        },
        F4F5AirlineLiecseCheckReult: {
            get: function (elem) {
                if (elem.getValue) {
                    return elem.getValue();
                }
            },
            set: function (elem, value) {
                if (elem.setValue) {
                    elem.setValue(value);
                }
            }
        },
        F4F5AirlineLicEvaluation: {
            get: function (elem) {
                if (elem.getValue) {
                    return elem.getValue();
                }
            },
            set: function (elem, value) {
                if (elem.setValue) {
                    elem.setValue(value);
                }
            }
        },

        //注册控件方法
        register: function (name, methods) {
            if (!this[name]) {
                this[name] = methods;
            }
            else {
                var control = this[name];
                for (var m in methods) {
                    if (!control[m]) {
                        control[m] = methods[m];
                    }
                }
            }
        }
    });

    $.fn.extend({
        //将form转换为具有状态显示的ajax表单
        //服务器必须返回FeedbackModel
        submitForm: function (url, onSuccess, validate, dataFunc) {
            var _submitForm = function (event) {
                //这句话里判断event不是原始事件（因为有的浏览器会拦不住原始事件），
                //且没有被阻止过（有的浏览器事件被阻止了还是会触发后边的事件）
                //&& event.originalEvent 
                if ($(this).valid() && !event.isDefaultPrevented()) {
                    if (validate && !validate()) {
                        event.preventDefault();
                        return false;
                    };
                   // var submitStatus = $.pnotify({ text: '正在进行' });
                    //submitStatus.success = false;

                    $.ajax({
                        url: url || $(this).attr("action"),
                        type: "POST",
                        data: dataFunc ? $(this).serialize() + "&" + dataFunc() : $(this).serialize(),
                        success: function (data, textStatus, jqXHR) {
                            if (data.Result) {
                                //submitStatus.pnotify({ text: "操作成功！", type: "success" });
                               // submitStatus.success = true;
                                if (onSuccess) {
                                    onSuccess(data);
                                }
                            }
                            else {
                               // submitStatus.pnotify({ text: "正在进行保存,请耐心等等程序运行完成" || textStatus, type: 'error' });
                            }
                        },
                        error: function () {
                            //submitStatus.pnotify_remove();
                        },
                        complete: function () {
                            //setTimeout(function () {
                            //    if (submitStatus.success) {
                            //        submitStatus.pnotify_remove();
                            //    }
                            //}, 1000);
                        }
                    });
                }
                event.preventDefault();
                return false;
            };

            $(this).unbind("submit");
            $(this).unbind("submit", $(this).data("handler"));
            $(this).bind("submit", _submitForm);
            $(this).data("handler", _submitForm);
        },

        //将表单JSON序列化提交
        submitJson: function (url, onSuccess, validate, dataFunc) {
            var _submitJson = function (event) {
                var $form = $(this);
                
                //这句话里判断event不是原始事件（因为有的浏览器会拦不住原始事件），
                //且没有被阻止过（有的浏览器事件被阻止了还是会触发后边的事件）
                //&& event.originalEvent
                //$form.valid() 原始验证方法
                if ($form.formValid() && !event.isDefaultPrevented()) {
                    if (validate && !validate()) {
                        event.preventDefault();
                        return false;
                    };
                   //var submitStatus = $.pnotify({ text: '正在进行' });
                   // submitStatus.success = false;

                    var json = $.extend(true, $form.data("formdata"),
                                              $form.serializeObject(),
                                              dataFunc && dataFunc());
                    var s = json;
                    $.ajax({
                        url: url || $form.attr("action"),
                        type: "POST",
                        data: { data: JSON.stringify(json) },
                        success: function (data, textStatus, jqXHR) {
                           
                            if (data.Result) {
                                //submitStatus.pnotify({ text: "操作成功！", type: "success" });
                                //submitStatus.success = true;  
                                //"#ShowModal" true 可以回调 否则不可以
                                if (($("#ShowModal").val() != undefined && $("#ShowModal").val() != "" && $("#ShowModal").val() == "true") || $("#ShowModal").val() == undefined)
                                {
                                    //提交成功后回调
                                    Reload();
                                }
                                if (onSuccess) {
                                    onSuccess(data);
                                }
                            }
                            else {
                                //submitStatus.pnotify({ text: "操作失败" || textStatus, type: 'error' });

                            }
                        },
                        error: function () {
                            //submitStatus.pnotify_remove();
                        },
                        complete: function () {
                            if ($form.returnurl) {
                                window.location.href = $form.returnurl;
                            }
                            //setTimeout(function () {
                            //    if (submitStatus.success) {
                            //        submitStatus.pnotify_remove();
                            //    }
                            //}, 1000);
                        }
                    });
                }
                event.preventDefault();
                return false;
            };

            $(this).unbind("submit");
            $(this).unbind("submit", $(this).data("handler"));
            $(this).bind("submit", _submitJson);
            $(this).data("handler", _submitJson);
        },
        //序列化表单为数组
        _serializeArray: function () {
            var rCRLF = /\r?\n/g,
	        rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	        rselectTextarea = /^(?:select|textarea)/i;
            rmultiple = /^(?:build-select-all-select)/i;
            return this.map(function () {
                return this.elements ? $.makeArray(this.elements) : this;
            })
                //filter() 方法将匹配元素集合缩减为匹配指定选择器的元素。
		    .filter(function () {
		        return this.name && !this.disabled &&
				       (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type) || rmultiple.test(this.className));
		    })
                //函数用于从匹配元素中删除符合指定表达式的元素，并以jQuery对象的形式返回保留的元素。
            .not(function () {
                return $(this).parentsUntil(this.form, "[controlname]").length > 0;
            })
                //函数用于向当前匹配元素中添加符合指定表达式的元素，并以jQuery对象的形式返回。
            .add("[controlname]", this)
                //函数用于处理当前jQuery对象匹配的所有元素，并将处理结果封装为新的数组。返回封装该数组的jQuery对象。
		    .map(function (i, elem) {
		        var val = $(this).value();
		        if ($(elem).attr("multiple") == "multiple")
		        {
		            val = val.join(",");
		        }
		        return val == null ? null : {
		            name: elem.name || elem.id,
		            operator: $(this).attr("operator") ||
						      (elem.type == "select-one" && "eq") ||
							  (elem.type == "select-multiple" && "containedin") ||
							  "substringof",
		            value: !$.isArray(val) ?
						   val.replace(rCRLF, "\r\n") :
						   $.map(val, function (v, i) {
						       if (typeof v === "string") {
						           return v.replace(rCRLF, "\r\n");
						       }
						       return v;
						   })
		        };
		    }).get();
        },
        //序列化表单为JSON
        serializeObject: function () {
            var obj = {};
            $.each(this._serializeArray(), function (i, item) {
                var keys = item['name'].split('.');
                var o = obj;
                $.each(keys, function (_i, key) {
                    if (_i == keys.length - 1) {
                        if (o[key] == undefined) {
                            o[key] = item['value'] || '';
                        }
                        else {
                            if (!$.isArray(o[key])) {
                                o[key] = [o[key]];
                            }
                            o[key].push(item['value'] || '');
                        }
                    }
                    else if (o[key] == undefined) {
                        o[key] = {};
                    }
                    o = o[key];
                });
            });
            return obj;
        },
        //绑定搜索表单
        searchForm: function (grid) {
            var $form = this;
            if (!grid) {
                grid = $form.attr("for");
            }
            $form.unbind().bind("submit", function (event) {
                var formData = $form._serializeArray();
                if (typeof grid == "string" || grid.nodeType) {
                    $.extend($(grid).datagrid("options").queryParams, {
                        RuleString: JSON.stringify(formData)
                    });
                    $(grid).datagrid("reload");
                }
                event.preventDefault();
                return false;
            });
        },
        //重置验证
        resetValid: function () {
            var $form = this.closest('form');
            //reset jQuery Validate's internals
            $form.validate().resetForm();

            //reset unobtrusive validation summary, if it exists
            $form.find("[data-valmsg-summary=true]")
            .removeClass("validation-summary-errors")
            .addClass("validation-summary-valid")
            .find("ul").empty();

            //reset unobtrusive field level, if it exists
            $form.find("[data-valmsg-replace]")
            .removeClass("field-validation-error")
            .addClass("field-validation-valid")
            .empty();

            return $form;
        },
        //表单验证
        formValid: function () {
            var $form = this;
            if ($form.valid()) {
                var hooks, result = true;
                $form.find("[controlname]").each(function () {
                    hooks = controlHooks[$(this).attr("controlname")];
                    if (hooks && "valid" in hooks) {
                        hooks.valid(this) || (result = false);
                    }
                });
                return result;
            }
            return false;
        },
        //重置表单
        formReset: function (valid) {
            var $form = this.closest('form');
            $form[0].reset();
            if (valid == undefined || valid) {
                $form.resetValid();
            }
            return $form;
        },
        //表单数据载入
        formLoad: function (data, callback) {
            var $form = this;
            var form = this[0]; //form element,可能需要找出有效表单元素
            var _checkField = function (name, val) {
                var rr = $form.find(':radio[name="' + name + '"], :checkbox[name="' + name + '"]');
                rr.prop('checked', false);
                rr.each(function () {
                    var f = $(this);
                    if (f.val() == String(val) || $.inArray(f.val(), $.isArray(val) ? val : [val]) >= 0) {
                        f.prop('checked', true);
                    }
                });
                return rr;
            }
            var _loadCombo = function (name, val) {
                var cc = ['combobox', 'combotree', 'combogrid', 'datetimebox', 'datebox', 'combo'];
                var c = $form.find('[comboName="' + name + '"]');
                if (c.length) {
                    for (var i = 0; i < cc.length; i++) {
                        var type = cc[i];
                        if (c.hasClass(type + '-f')) {
                            if (c[type]('options').multiple) {
                                c[type]('setValues', val);
                            } else {
                                c[type]('setValue', val);
                            }
                            return;
                        }
                    }
                }
            }
            var _load = function (_data) {
                if (!$.isArray(_data)) {
                    $form.data("formdata", _data); //缓存form数据
                }
                for (var n in _data) {
                    var val = _data[n];
                    var $control = _checkField(n, val);
                    if (!$control.length) {
                        $control = $("[name=" + n + "],:not(label)[id=" + n + "]", form);
                        $control.length ? $control.value(val)
                                        : $("label[id=" + n + "]").text(val);
                    }
                    _loadCombo(n, val); //for easyui
                }
                if (callback && $.isFunction(callback)) {
                    callback.call(this, _data);
                }
            };

            if (typeof data == 'string') {
                $.ajax({
                    url: data,
                    type: "POST",
                    dataType: "json",
                    success: function (d) {
                        _load(d);
                    }
                });
            }
            else {
                _load(data);
            }
        },
        
        bindSelect: function (data, addEmpty) {
            var self = $(this).empty();
            self.append($.map(data, function (v) {
                return "<option value='" + v["Value"] + "' "
                + (v["Selected"] ? "selected" : "") + " >" + v["Text"] + "</option>";
            }).join(''));
            if (addEmpty) {
                self.prepend("<option value=''>-请选择-</option>");
            }
        },
        //自定义jquery赋值取值方法
        value: function (value) {
            var hooks, isFunction, elem = this[0];

            if (!arguments.length) {
                if (elem) {
                    hooks = controlHooks[this.attr("controlname")];
                    if (hooks && "get" in hooks) {
                        return hooks.get(elem, "value");
                    }
                    return this.val();
                }
            }

            isFunction = jQuery.isFunction(value);

            return this.each(function (i) {
                var val,
				_self = jQuery(this);

                if (isFunction) {
                    val = value.call(this, i, _self.value());
                } else {
                    val = value;
                }

                if (val == null) {
                    val = "";
                } else if (typeof val === "number") {
                    val += "";
                } else if (jQuery.isArray(val)) {
                    val = jQuery.map(val, function (value) {
                        return value == null ? "" : value + "";
                    });
                }

                hooks = controlHooks[_self.attr("controlname")];
                if (hooks && "set" in hooks) {
                    hooks.set(this, val, "value")
                }
                else {
                    _self.val(val);
                }
            });
        }
    });

    /** 
    * jquery中各个事件执行顺序如下：
    * ajaxStart(全局事件)
    * beforeSend(局部事件)
    * ajaxSend(全局事件)
    * success(局部事件)
    * ajaxSuccess(全局事件)
    * error(局部事件)
    * ajaxError (全局事件)
    * complete(局部事件)
    * ajaxComplete(全局事件)
    * ajaxStop(全局事件)
    */
    //#region 注册全局ajax函数,若要屏蔽
    //将局部参数global设置为false即可
    $.ajaxSetup({
        async: true,
        global: true,
        type: "POST"
    });

    var gloabStatus = null;
    //ajax请求发送前
    $(document).ajaxStart(function () {
        /*$.pnotify({
        type: 'notice',
        text: '正在进行...'
        });*/
    });

    //ajax请求成功
    $(document).ajaxSuccess(function (event, xhr, options) {
        if (options.global) {
            var users = event.currentTarget.cookie;
            if (users.length > 0) {
                var userName = '';
                if (typeof (CONFIG) != 'undefined') {
                    userName = CONFIG["username"];
                }
                var ajaxUrl = options.url;
                var ajaxFun = "";
                var ajaxParams = "";
                var params = "";
                if (ajaxUrl.indexOf('?') > -1) {
                    var ajaxArr = options.url.split('?');
                    ajaxUrl = ajaxArr[0];
                    if (ajaxArr[1].indexOf('&') > -1) {
                        ajaxFun = ajaxArr[1].split('&')[0].split('=')[1];
                        ajaxParams = ajaxArr[1].split('&')[1].split('=')[1];
                        if (ajaxParams.indexOf("{") > -1 && ajaxParams.indexOf("}") > -1) {
                            ajaxParams = ajaxParams.substring(2, ajaxParams.length - 2);
                            var paramArr = ajaxParams.split(',');
                            for (var i = 0; i < paramArr.length; i++) {
                                if (paramArr[i].indexOf(':') > -1) {
                                    var p_arr = paramArr[i].split(':');
                                    var p_key = p_arr[0].substring(1, p_arr[0].length - 1);
                                    var p_value = p_arr[1].substring(1, p_arr[1].length - 1);
                                    params += p_key + "@" + p_value + "|";
                                }
                            }
                        }
                    }
                    else {
                        ajaxFun = ajaxArr[1].split('=')[1];
                    }
                }               
            }
        }
    });

    //ajax出错显示
    $(document).ajaxError(function (event, jqXHR, ajaxSettings, thrownError) {
        //switch (jqXHR.status) {
        //    case 403:
        //        {
        //            break;
        //            $.pnotify({
        //                title: "登录超时!",
        //                type: "error",
        //                text: "登录超时，请重新登录！"
        //            });
        //        }
        //    case 0: //未被始化 
        //        {
        //            break;
        //        }
        //    case 200:
        //        {
        //                                $.pnotify({
        //                                    title: "由于以下原因未导入成功，请认真检查模板数据是否正确",
        //                                    type: "html",
        //                                    width: "600px",
        //                                    text: (function () {
        //                                        var $div = $("<div></div>")
        //                                                         .text(jqXHR.responseText.substring(0, jqXHR.responseText.indexOf('{')))
        //                                                         .css({
        //                                                             "max-height": "400px",
        //                                                             "overflow-y": "auto",
        //                                                             "overflow-x": "hidden",
        //                                                             "margin-top": "10px",
        //                                                             "color": "blue"
        //                                                         });
        //                                        var html = $div[0].outerHTML;
        //                                        $div.remove();
        //                                        $div = null;
        //                                        return html;
        //                                    })()
        //                                });
        //            alert(jqXHR.responseText.substring(0, jqXHR.responseText.indexOf('{')));
        //            break;
        //        }
        //    default:
        //        {
        //            //xmp直接输出html代码
        //            $.pnotify({
        //                title: "请求出错了！！!",
        //                type: "error",
        //                width: "800px",
        //                text: "请求地址：<font color='blue'>" + ajaxSettings.url + "</font>\n\r" +
        //                      "事件类型：<font color='blue'>" + event.type + "</font>\n\r" +
        //                      "错误信息：<font color='blue'>" + thrownError + "</font>\n\r" +
        //                      "错误详情：" + (function () {
        //                          var $div = $("<div></div>")
        //                                     .text(jqXHR.responseText)
        //                                     .css({
        //                                         "max-height": "400px",
        //                                         "overflow-y": "auto",
        //                                         "overflow-x": "hidden",
        //                                         "color": "blue"
        //                                     });
        //                          var html = $div[0].outerHTML;
        //                          $div.remove();
        //                          $div = null;
        //                          return html;
        //                      })()
        //            });
        //            break;
        //        }
        //}
    });
    //#endregion

    $(document).ready(function () {
        if ($.inArray($("#pageParams input[name=action]").val(), ["edit", "init"]) > -1) {
            $.each(document.forms, function (i, form) {
                var $form = $(form);
                //                if (!$form.attr("isAutoLoad")) {
                if ($form.attr("behaviorname")) {
                    var url = func.bulidBehaviorUrl("../GHPQ/Load",
                              $form.attr("behaviorname"),
                              $form.attr('behaviorparams'));
                    $form.formLoad(url);
                }
                //                }
            })
        }
    });

    //form表单验证移除提示信息
    $("form").find("input, select, textarea")
             .not(":submit, :reset, :image, [disabled]")
             .on({
                 "mouseover": function () {
                     $(this).siblings(".field-validation-error").show();
                 },
                 "mouseout": function () {
                     $(this).siblings(".field-validation-error").hide();
                 }
             });
})(window);



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


///////////////////////////////////////////////    
//
//  【表单专用，勿改】
//
//   功能：合并表格     
//   参数：tb－－需要合并的表格ID     
//   参数：colLength－－需要对前几列进行合并，比如，     
//   想合并前两列，后面的数据列忽略合并，colLength应为2     
//   缺省表示对全部列合并      
///////////////////////////////////////////////
function uniteTable(tb, colLength) {
    //   检查表格是否规整     
    //if (!checkTable(tb)) return;  
    var i = 0;
    var j = 0;
    var rowCount = tb.rows.length; //   行数
    if (rowCount != 0) {
        var colCount = tb.rows[0].cells.length; //   列数     
        var obj1 = null;
        var obj2 = null;
        //为每个单元格命名     
        for (i = 0; i < rowCount; i++) {
            for (j = 0; j < tb.rows[i].cells.length; j++) {
                tb.rows[i].cells[j].id = "tb__" + i.toString() + "_" + j.toString();
            }
        }
        //合并行     
        for (i = 0; i < colCount; i++) {
            if (i == colLength) break;
            obj1 = document.getElementById("tb__0_" + i.toString())
            for (j = 1; j < rowCount; j++) {
                obj2 = document.getElementById("tb__" + j.toString() + "_" + i.toString());
                if (obj1.innerHTML == obj2.innerHTML) {
                    // obj1.rowSpan++;
                    // alert(obj1.rowSpan++);
                    obj2.parentNode.removeChild(obj2);
                    obj1.rowSpan++;

                } else {
                    obj1 = document.getElementById("tb__" + j.toString() + "_" + i.toString());
                }
            }
        }
    }
 
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



function NewGuid() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
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
        alert("");
    };
}
//小数转百分比方法
Number.prototype.toPercent = function (n) {
    n = n || 0;
    if (isNaN(this)) {
        return "-";
    }
    var flag = (Math.round(this * Math.pow(10, n + 2)) / Math.pow(10, n)).toFixed(n);
    if (flag == "Infinity") {
        return "-";
    }
    return flag + '%';
}



