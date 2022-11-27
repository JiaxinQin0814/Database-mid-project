
//2015-09-25 17:44:10 Joe

//客户端分页
//  var columnDefs = [{ "targets": [0, 4], "orderable": false, "className": "text-center" }];
//  CommonDataTableClient("#tbGrid", columnDefs);
function CommonDataTableClient(gridID, columnDefs) {
    $(gridID).DataTable({
        "columnDefs": columnDefs,
        "order": [],
        //"dom": "<'row'<'col-sm-12't>>" + "<'row'<'col-sm-8'i><'col-sm-4'p>>",
        "dom": '<"top">rft<"bottom"lip><"clear">',
        "pagingType": "full_numbers",
        "lengthMenu": [5, 10, 20, 50],
        "language": {
            "emptyTable": "无记录",
            "zeroRecords": "没有找到记录",
            "lengthMenu": "每页 _MENU_ 条 ",
            "info": "显示第 _START_ 至 _END_ 条记录，共 _TOTAL_ 条",
            "infoEmpty": "无记录",
            "infoFiltered": "(从 _MAX_ 条记录过滤)",
            "paginate": {
                "first": "首页",
                "last": "末页",
                "next": "下一页",
                "previous": "上一页"
            },
            'search': '搜索:'
        }
    });
}

//服务端分页
//filters：查询条件,形如：{"ID":"#searchForm #ID","DESCRIPTION":"#searchForm #DESCRIPTION"};
//修改：2015-10-22 17:45:10 liut
var DTServer = {};
var DT = [];
function CreateDTServer() {
    DTServer.GridID = '#tbGrid';
    DTServer.Url = '/Common/QueryDataForServerPaging';
    DTServer.Columns = '';
    DTServer.Filters = '';
    DTServer.Order = [];
    DTServer.Search = true;
    DTServer.Sign = true;//标志是否有Filters查询框
    DTServer.SearchInput = '';
    DTServer.Height = $(window).height() - 250 + "px";
    DTServer.Flag = false;
    DTServer.LengthMenu = [10, 20, 50, 100];

    //左边分页-开始
    DTServer.bLengthChange = true;
    DTServer.ordering = true;
    DTServer.info = true;
    //左边分页-结束


    DTServer.Paginate = {
        "first": "首页",
        "last": "末页",
        "next": "下一页",
        "previous": "上一页"
    };
    DTServer.CreateRow = "";
}
DTServer.LoadData = function () {
    var Filters = this.Filters;
    var SearchInput = this.SearchInput;
    var Sign = this.Sign;
    $(this.GridID).DataTable({
        "destroy": true,
        "serverSide": true,

        "scrollCollapse": "true",
        "ajax": {
            "url": DTServer.Url,
            "contentType": "application/json",
            "data": function (d) {
                var searchs = d["search"];
                var searchValue = "";
                if (searchs != "" && searchs != undefined) {
                    searchValue = searchs["value"];
                }
                var params = 'paramsTable=' + JSON.stringify(d);

                //DTServer.Flag true 精确查询 flase 模糊查询
                if (DTServer.Flag != undefined && !DTServer.Flag && SearchInput != "") {

                    var str = '';
                    if (SearchInput != null) {
                        for (var key in SearchInput) {
                            str += key + '=' + escape(searchValue) + '&';
                        }
                        str = str.substring(0, str.length - 1);
                    }
                    //没有Filters查询框，又需要Filters查询条件
                    if (Sign == false) {
                        params += "&" + joinUrlParams(Filters);
                    }
                    params += "&" + str;
                } else
                    if (DTServer.Flag && Filters != "") {
                        params += "&" + joinUrlParams(Filters);
                    }
                    else if (!DTServer.Search && Filters != "") {
                        params += "&" + joinUrlParams(Filters);
                    }
                return params;
            }
        },
        "dataSrc": "data",
        "columns": this.Columns,
        "order": this.Order,
        "bFilter": this.Search,

        //左边分页-开始
        "bLengthChange": this.bLengthChange,
        "ordering": this.ordering,
        "info": this.info,
        //左边分页-结束

        "sPaginationType": "bootstrap",
        //"dom": "<'row'<'col-sm-12't>>" + "<'row'<'col-sm-4'i><'col-sm-8'p>>",
        "dom": '<"top">rft<"bottom"lip><"clear">',
        "pagingType": "full_numbers",
        "lengthMenu": this.LengthMenu,
        "language": {
            "emptyTable": "无记录",
            "zeroRecords": "没有找到记录",
            "lengthMenu": "每页 _MENU_ 条",
            "info": "显示第 _START_ 至 _END_ 条记录，共 _TOTAL_ 条",
            "infoEmpty": "无记录",
            "infoFiltered": "(从 _MAX_ 条记录过滤)",
            "search": "搜索:",
            "paginate": this.Paginate
        },
        "createdRow": this.CreateRow
    });
}

//临时需要-王永康 2016-01-11
DTServer.LoadData2 = function () {
    var Filters = this.Filters;
    var SearchInput = this.SearchInput;
    var Sign = this.Sign;
    $(this.GridID).DataTable({
        "destroy": true,
        "serverSide": true,
        //"scrollY": this.Height,2016-01-11

        "scrollCollapse": "true",
        "ajax": {
            "url": DTServer.Url,
            "contentType": "application/json",
            "data": function (d) {
                var searchs = d["search"];
                var searchValue = "";
                if (searchs != "" && searchs != undefined) {
                    searchValue = searchs["value"];
                }
                var params = 'paramsTable=' + JSON.stringify(d);

                //DTServer.Flag true 查询 flase 自动查询
                if (DTServer.Flag != undefined && !DTServer.Flag && SearchInput != "") {

                    var str = '';
                    if (SearchInput != null) {
                        for (var key in SearchInput) {
                            str += key + '=' + escape(searchValue) + '&';
                        }
                        str = str.substring(0, str.length - 1);
                    }
                    //没有Filters查询框，又需要Filters查询条件
                    if (Sign == false) {
                        params += "&" + joinUrlParams(Filters);
                    }
                    params += "&" + str;
                } else if ((DTServer.Flag || !DTServer.Search) && Filters != "") {
                    params += "&" + joinUrlParams(Filters);
                }
                return params;
            }
        },
        "dataSrc": "data",
        "columns": this.Columns,
        "order": this.Order,
        "bFilter": this.Search,
        //左边分页-开始
        "bLengthChange": this.bLengthChange,
        "ordering": this.ordering,
        "info": this.info,
        //左边分页-结束
        "sPaginationType": "bootstrap",
        "dom": '<"top">rft<"bottom"lip><"clear">',
        "pagingType": "full_numbers",
        "lengthMenu": this.LengthMenu,
        "language": {
            "emptyTable": "无记录",
            "zeroRecords": "没有找到记录",
            "lengthMenu": "每页 _MENU_ 条",
            "info": "显示第 _START_ 至 _END_ 条记录，共 _TOTAL_ 条",
            "infoEmpty": "无记录",
            "infoFiltered": "(从 _MAX_ 条记录过滤)",
            "search": "搜索:",
            "paginate": this.Paginate
        },
        "createdRow": this.CreateRow
    });
}

function LoadForGrid(GID) {
    if (!DTServer.Flag) {
        $(GID).DataTable().ajax.url(DTServer.Url + "_Search");
        $(GID).DataTable().ajax.reload();
    }
}

//选中单行 2015-10-19 liut
//tbId：表Id 
//select【可选】：选中时执行的函数 
//cancel【可选】：取消选中时执行的函数
function SelectSingleRow(tbId, select, cancel) {
    $('#' + tbId + ' tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            if (cancel != null) {
                cancel(this);
            }
        }
        else {
            $(this).addClass('selected').siblings().removeClass("selected");
            if (select != null) {
                select(this);
            }
        }
    });
}