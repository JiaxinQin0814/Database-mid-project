//有搜索
$(function () {
    //初始化数据
    $('#tbGrid').dataTable({
        "dom": '<"top">rft<"bottom"lip><"clear">',
        "pagingType": "full_numbers",
        //"order": [[2, "desc"]],
        "order": [],
        // "bPaginate":false,
        //"bFilter": false,
        "sPaginationType": "bootstrap",
//                   "Search":false, //去掉搜索
        columnDefs: [{
            orderable: false,//禁用排序
            targets: [0], //指定的列禁用排序(第一列，第二列禁用[0,1])
        }],
        "bFilter": false,
        "lengthMenu": [10, 20, 50, 100, 200],
        "language": {
            "lengthMenu": "每页 _MENU_ 条 ",
            "zeroRecords": "没有找到记录",
//                    "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
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

//初始化数据
$('#tbGridNoSearch').dataTable({
    "dom": '<"top">rft<"bottom"lip><"clear">',
    "pagingType": "full_numbers",
    //"order": [[2, "desc"]],
    "order": [],
    // "bPaginate":false,
    "bFilter": false,
    "sPaginationType": "bootstrap",
//                   "Search":false, //去掉搜索
    columnDefs: [{
        orderable: false,//禁用排序
        targets: [0], //指定的列禁用排序(第一列，第二列禁用[0,1])
    }],

    "lengthMenu": [10, 20, 50, 100, 200],
    "language": {
        "lengthMenu": "每页 _MENU_ 条 ",
        "zeroRecords": "没有找到记录",
//                    "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
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

//});
////一个页面有两个表格
//$(function () {
//$('#tbGrid11').dataTable({
//    "dom": '<"top">rft<"bottom"lip><"clear">',
//    "pagingType": "full_numbers",
//    //"order": [[2, "desc"]],
//    "order": [],
//    // "bPaginate":false,
//    "sPaginationType": "bootstrap",
////                   "Search":false, //去掉搜索
//    columnDefs: [{
//        orderable: false,//禁用排序
//        targets: [0], //指定的列禁用排序(第一列，第二列禁用[0,1])
//    }],
//
//    "lengthMenu": [10, 20, 50, 100, 200],
//    "language": {
//        "lengthMenu": "每页 _MENU_ 条 ",
//        "zeroRecords": "没有找到记录",
////                    "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
//        "info": "显示第 _START_ 至 _END_ 条记录，共 _TOTAL_ 条",
//        "infoEmpty": "无记录",
//        "infoFiltered": "(从 _MAX_ 条记录过滤)",
//        "paginate": {
//            "first": "首页",
//            "last": "末页",
//            "next": "下一页",
//            "previous": "上一页"
//        },
//        'search': '搜索:'
//
//    }
//});
//});
////多人审批页面带展开功能
//$(function () {
//    //初始化数据
//    $('#tbGrid_batchExam').dataTable({
//        "dom": '<"top">rft<"bottom"lip><"clear">',
//        "pagingType": "full_numbers",
//        //"order": [[2, "desc"]],
//        //"order": [],
//        // "bPaginate":false,
//        "sPaginationType": "bootstrap",
////                   "Search":false, //去掉搜索
//        columnDefs: [{
//            orderable: false,//禁用排序
//            targets: [0], //指定的列禁用排序(第一列，第二列禁用[0,1])
//        }],
//
//        //"lengthMenu": [10, 20, 50, 100, 200],
//        "bLengthChange": false,
//        "ordering": false,
//        "info": false,
//        "bFilter": false,
//        "language": {
//            "lengthMenu": "每页 _MENU_ 条 ",
//            "zeroRecords": "没有找到记录",
////                    "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
//            "info": "显示第 _START_ 至 _END_ 条记录，共 _TOTAL_ 条",
//            "infoEmpty": "无记录",
//            "infoFiltered": "(从 _MAX_ 条记录过滤)",
//            "paginate": {
//                "first": "首页",
//                "last": "末页",
//                "next": "下一页",
//                "previous": "上一页"
//            },
//            //'search': '搜索:'
//
//        }
//    });
//});
//
//$(function () {
//    //初始化数据
//    $('#tbGrid4').dataTable({
//        "dom": '<"top">rft<"bottom"lip><"clear">',
//        "pagingType": "full_numbers",
//        //"order": [[2, "desc"]],
//        "order": [],
//        "bFilter": false,
//        "sPaginationType": "bootstrap",
////                   "Search":false, //去掉搜索
//        columnDefs: [{
//            orderable: false,//禁用排序
//            targets: [0], //指定的列禁用排序(第一列，第二列禁用[0,1])
//        }],
//
//        "lengthMenu": [10, 20, 50, 100, 200],
//        "language": {
//            "lengthMenu": "每页 _MENU_ 条 ",
//            "zeroRecords": "没有找到记录",
////                    "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
//            "info": "显示第 _START_ 至 _END_ 条记录，共 _TOTAL_ 条",
//            "infoEmpty": "无记录",
//            "infoFiltered": "(从 _MAX_ 条记录过滤)",
//            "paginate": {
//                "first": "首页",
//                "last": "末页",
//                "next": "下一页",
//                "previous": "上一页"
//            }
//
//        }
//    });
//});
//$(function () {
//    //初始化数据
//    $('#tbGrid5').dataTable({
//        "dom": '<"top">rft<"bottom"lip><"clear">',
//        "pagingType": "full_numbers",
//        //"order": [[2, "desc"]],
//        "order": [],
//        "bFilter": false,
//        "sPaginationType": "bootstrap",
////                   "Search":false, //去掉搜索
//        columnDefs: [{
//            orderable: false,//禁用排序
//            targets: [0], //指定的列禁用排序(第一列，第二列禁用[0,1])
//        }],
//
//        "lengthMenu": [10, 20, 50, 100, 200],
//        "language": {
//            "lengthMenu": "每页 _MENU_ 条 ",
//            "zeroRecords": "没有找到记录",
////                    "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
//            "info": "显示第 _START_ 至 _END_ 条记录，共 _TOTAL_ 条",
//            "infoEmpty": "无记录",
//            "infoFiltered": "(从 _MAX_ 条记录过滤)",
//            "paginate": {
//                "first": "首页",
//                "last": "末页",
//                "next": "下一页",
//                "previous": "上一页"
//            }
//
//        }
//    });
//});
//$(function () {
//    //初始化数据
//    $('#tbGrid6').dataTable({
//        "dom": '<"top">rft<"bottom"lip><"clear">',
//        "pagingType": "full_numbers",
//        //"order": [[2, "desc"]],
//        "order": [],
//        "bFilter": false,
//        "sPaginationType": "bootstrap",
////                   "Search":false, //去掉搜索
//        columnDefs: [{
//            orderable: false,//禁用排序
//            targets: [0], //指定的列禁用排序(第一列，第二列禁用[0,1])
//        }],
//
//        "lengthMenu": [10, 20, 50, 100, 200],
//        "language": {
//            "lengthMenu": "每页 _MENU_ 条 ",
//            "zeroRecords": "没有找到记录",
////                    "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
//            "info": "显示第 _START_ 至 _END_ 条记录，共 _TOTAL_ 条",
//            "infoEmpty": "无记录",
//            "infoFiltered": "(从 _MAX_ 条记录过滤)",
//            "paginate": {
//                "first": "首页",
//                "last": "末页",
//                "next": "下一页",
//                "previous": "上一页"
//            }
//
//        }
//    });
//});
//$(function () {
//    //初始化数据
//    $('#tbGrid2').dataTable({
//        "dom": '<"top">rft<"bottom"lip><"clear">',
//        "pagingType": "full_numbers",
//        //"order": [[2, "desc"]],
//        //"order": [],
//        // "bPaginate":false,
//        "sPaginationType": "bootstrap",
////                   "Search":false, //去掉搜索
//        columnDefs: [{
//            orderable: false,//禁用排序
//            targets: [0], //指定的列禁用排序(第一列，第二列禁用[0,1])
//        }],
//
//        //"lengthMenu": [10, 20, 50, 100, 200],
//        "bLengthChange": false,
//        "ordering": false,
//        "info": false,
//        "bFilter": false,
//        "language": {
//            "lengthMenu": "每页 _MENU_ 条 ",
//            "zeroRecords": "没有找到记录",
////                    "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
//            "info": "显示第 _START_ 至 _END_ 条记录，共 _TOTAL_ 条",
//            "infoEmpty": "无记录",
//            "infoFiltered": "(从 _MAX_ 条记录过滤)",
//            "paginate": {
//                "first": "首页",
//                "last": "末页",
//                "next": "下一页",
//                "previous": "上一页"
//            },
//            //'search': '搜索:'
//
//        }
//    });
//});
////只有分页
//$(function () {
//    //初始化数据
//    $('#tbGrid3').DataTable({
//        "columnDefs": [{
//            orderable: false,//禁用排序
//            targets: [0], //指定的列禁用排序(第一列，第二列禁用[0,1])
//        },
//            {
//                "targets": [8],
//                "visible": false,
//                "searchable": false
//            },
//            {
//                "targets": [9],
//                "visible": false
//            },
//            {
//                "targets": [10],
//                "visible": false
//            },
//            {
//                "targets": [11],
//                "visible": false
//            },
//            {
//                "targets": [12],
//                "visible": false
//            },
//            {
//                "targets": [13],
//                "visible": false
//            }
//        ],
//        "dom": '<"top">rft<"bottom"lip><"clear">',
//        "pagingType": "full_numbers",
//        "order": [],
//        "sPaginationType": "bootstrap",
//
//        "lengthMenu": [10, 20, 50, 100, 200],
//        "language": {
//            "lengthMenu": "每页 _MENU_ 条 ",
//            "zeroRecords": "没有找到记录",
////                    "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
//            "info": "显示第 _START_ 至 _END_ 条记录，共 _TOTAL_ 条",
//            "infoEmpty": "无记录",
//            "infoFiltered": "(从 _MAX_ 条记录过滤)",
//            "paginate": {
//                "first": "首页",
//                "last": "末页",
//                "next": "下一页",
//                "previous": "上一页"
//            },
//            'search': '搜索:'
//
//        }
//    });
//});
//
//$(function () {
//    //初始化数据
//    $('#tbGrid2b').dataTable({
//        "dom": '<"top">rft<"bottom"lip><"clear">',
//        "pagingType": "full_numbers",
//        //"order": [[2, "desc"]],
//        //"order": [],
//        // "bPaginate":false,
//        "sPaginationType": "bootstrap",
////                   "Search":false, //去掉搜索
//        columnDefs: [{
//            orderable: false,//禁用排序
//            targets: [0], //指定的列禁用排序(第一列，第二列禁用[0,1])
//        }],
//
//        "lengthMenu": [10, 20, 50, 100, 200],
//        //"bLengthChange": false,
//        "ordering": false,
//        "info": false,
//        "bFilter": false,
//        "language": {
//            "lengthMenu": "每页 _MENU_ 条 ",
//            "zeroRecords": "没有找到记录",
////                    "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
//            "info": "显示第 _START_ 至 _END_ 条记录，共 _TOTAL_ 条",
//            "infoEmpty": "无记录",
//            "infoFiltered": "(从 _MAX_ 条记录过滤)",
//            "paginate": {
//                "first": "首页",
//                "last": "末页",
//                "next": "下一页",
//                "previous": "上一页"
//            },
//            //'search': '搜索:'
//
//        }
//    });
});