//create by cxy 2016-08
$(function () {

//初始化、
    var jsonStr={name:"",
       class:"",
        crew_startDate:"2022-08-03",
        crew_end_Date:'',
        crew_classTime_Arr:["08:40~09:20","09:30~10:10","10:20~11:00","11:20~12:00","13:40~14:20","14:40~15:20","15:40~16:20","16:40~17:20"]
};
    //生成日期控件
    initFullCalendar(jsonStr);

//获取日期
    function getdate() {
        var now = new Date();
        y = now.getFullYear();
        m = now.getMonth() + 1;
        d = now.getDay();
        m = m < 10 ? "0" + m : m;
        d = d < 10 ? "0" + d : d;
        return y + "-" + m + "-" + d;
    }


//初始化日历方法
    function initFullCalendar(jsonStr) {
        //var crew_classTime_arr=new Array();
        //var crew_classTime_Arr=new Array("08:40~09:20","09:30~10:10","10:20~11:00","11:20~12:00","13:40~14:20","14:40~15:20","15:40~16:20","16:40~17:20");

        var crew_classTime_Arr;
        var crew_startDate= getdate();
        //获取课节
        $.each(jsonStr, function(key, value) {
            crew_classTime_Arr=jsonStr["crew_classTime_Arr"];
            crew_startDate=jsonStr["crew_startDate"];
        });

        //先清空已有控件内容
        $('#calendar').fullCalendar('destroy');
        //加载日历控件
        $('#calendar').fullCalendar({
//                defaultDate: '2016-07-12',
            defaultDate: crew_startDate,
            defaultView:"agendaWeek", //默认显示周
            //        defaultView: 'timelineDay',
            height: 600,
            editable: true,
            customButtons: {
                //自定义 按钮可以添加多个，自己命名  在header 部分调用即可 比如这里的myCustomButton
                myCustomButton: {
                    text: '自定义按钮',
                    click: function() {
                        alert('点击自定义按钮!');
                    }
                }
            },
            header: {
                left: 'prev,next today, myCustomButton',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
                //right: 'month,agendaWeek,agendaDay,timelineFourDays'
            },
            //views: {
            //    timelineFourDays: {
            //        type: 'timeline',
            //        duration: { days: 4 }
            //    }
            //},

            allDaySlot:false,//是否显示全天
//          titleFormat:'MMM D YYYY',//header日期显示格式
            axisFormat: 'H:mm时',//修改日期前面显示内容默认为早上6点00分，改完后显示6:00时('H:mm时')
            slotDuration:'01:00:00', //时间间隔
//          slotLabelFormat:'HH:mm',//左侧时间格式
            slotLabelFormat:'第H课',
            // slotLabelInterval:'00:20:00',//左侧标注时间间隔

            crew_classTime_Arr:crew_classTime_Arr,
            scrollTime:'01:00:00', //滚动起始时间
            displayEventTime:false, //默认不显示事件上的时间
//          timeFormat: 'HH:mm',//事件上日期格式（默认事件不显示日期）

            minTime:'01:00:00', //最小开始时间
            maxTime:'09:00:00',//最大开始时间
            defaultTimedEventDuration:'01:00:00',//默认拖进事件 的时间间隔大小

//                    businessHours: {// 设置休息时间，不能排课的时间
//                        dow: [ 1, 2, 3, 4, 5 ],//每周日期
//                        start: '08:00', //开始
//                        end: '18:00' // 结束时间
//                    },
//                    contentHeight:500,


//                    monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
//                                monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
//                                     dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
//                                   dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
//                                  today: ["今天"],
//                                  firstDay: 1,
            buttonText: {
//                                   today: '本月',
                month: '月',
                week: '周',
                day: '日'
//                                           prev: '上一月',
//                                          next: '下一月'
            },



            //点击一天时触发
            dayClick: function (date, allDay, jsEvent, view) {
                //当前日期
                // alert(date);
//                        alert(date.format('YYYY-MM-DD'));
//                        alert(date.format('DD'));

//                        if (typeof($(this).attr("isHoliday")) == "undefined" || $(this).attr("isHoliday") == "false") {
//                            $(this).css({'background-color': '#eaf4fa'});
//                            $(this).attr("isHoliday", "true");
//                            showOperationDialog("","addModal");
//                        } else {
//                            $(this).css({'background-color': '#f8f8f8'});
//                            $(this).attr("isHoliday", "false");
//                            $(this).find("i").remove();
//                        }

//添加事件
//                        var eventData;
//                        if (title) {
//                            eventData = {
//                                title: title,
//                                start: start,
//                                end: end
//                            };
//                        }
//                        $('#calendar').fullCalendar('addEventSource',eventData);
            },
            // 当点击某一个事件时触发此操作
            eventClick: function (calEvent, jsEvent, view) {
//                        alert(calEvent.id);
                //  $(this).css('border-color', 'red');
                showOperationDialog("", "addModal");
//删除事件
//                        $('#calendar').fullCalendar('removeEvents',"test");
            },
            //当鼠标悬停在一个事件上触发此操作
            eventMouseover: function(calEvent, jsEvent, view) {
                //var fstart = $.fullCalendar.formatDate(calEvent.start, "yyyy/MM/dd HH:mm");
                //var fend = $.fullCalendar.formatDate(calEvent.end, "yyyy/MM/dd HH:mm");
                //$(this).attr('title', fstart + " - " + fend + " " + calEvent.fullname);
                //    鼠标悬浮到title的时候可以设置展现哪些信息

                $(this).attr('data-toggle', "tooltip");
                $(this).attr('data-placement', "right");
                var newTitle=calEvent.title.replace(/fc-schedule-td-p/g,"fc-schedule-td-p-title").replace("font-blue","font-white");

                //$(this).attr('title', "<h5>"+newTitle+"</h5>");
                $(this).css('font-weight', 'normal');
                //用jqueyUI 的tooltip ,图层被遮挡，改为 layer tips
                //$("[data-toggle='tooltip']").tooltip({html : true , track: true,});
                //layer.tips(newTitle,this, {
                //    tips: [2, '#3192cb']
                //});
                layer.tips(newTitle,this, {
                    tips: [2, '#3192cb']
                });
                //$("[data-toggle='tooltip']").tooltip("show");
                //            $(this).tooltip({
                //                effect: 'toggle',
                //                cancelDefault: true
                //            });

            },
            //当鼠标从一个事件上移开触发此操作
            eventMouseout: function (event, jsEvent, view) {
            },

            droppable: true, //允许拖拽放置
            //drop: function() {
            //    if ($('#drop-remove').is(':checked')) {
            //        $(this).remove();
            //    }
            //},
            //drop: function(date, allDay) {
            drop:  function( date, jsEvent, ui, resourceId ) {



                if ($('#drop-remove').is(':checked')) {
                    $(this).remove();
                }

            },
            eventReceive:function(event){
                //根据event.title内容，修改拖拽后的样式
                //alert(event.title);
                event.className.push("bg-crew-baoan");
                event.title= '<p class="fc-schedule-td-p">'+event.title+'</p>'+
                    '<p class="fc-schedule-td-p">测试拖拽</p>' +
                    '<p class="fc-schedule-td-p"><span class="font-blue">测试</span>，测试 </p>',
                    //event.title= '<p class="fc-schedule-td-p">'+event.title+'</p>' +
                    //'<p class="fc-schedule-td-p">培训楼311化妆室</p>' +
                    //'<p class="fc-schedule-td-p"><span class="font-blue">赵之静</span>，江美玲</p>',

                    $('#calendar').fullCalendar('renderEvent', event, true);//重新加载此事件
            },
            //设置title为html
            eventRender: function (event, element) {
                //titile值改为html ,直接修改后，缩放不起作用，fc-content中少了子div(.fc-bg   .fc-title fc-resizer )
                //element.html(event.title);
                element.find(".fc-title").html(event.title);//cxy修改后的，不确定会不会有其他问题


            },
            //浏览器大小改变是触发
            eventResize: function(event,dayDelta,minuteDelta,revertFunc) {

            },
            //拖拽之后触发（仅限控件内部事件）
            eventDrop: function(event,dayDelta,minuteDelta,allDay,revertFunc) {
                //alert(event.id);
            },
            //事件被拖动之后触发
            eventDragStop: function(event,jsEvent,ui,view) {
                //alert(event.id);
                 alert(123);
            },
            //事件被拖动之前触发
            eventDragStart: function(event,jsEvent,ui,view) {
                //alert(event.id);
                // alert(234);
            },
            //事件数据
            events: [
                {
                    id:'test1',
                    //resourceId: 'b',
                    title: '<p class="fc-schedule-td-p">dl</p>' +
                    '<p class="fc-schedule-td-p">立德</p>',
                    start: '2022-08-02 02:00',
                    end: '2022-08-02 03:00',
                    color: '#efffe3',
                    textColor:'#444'
                },
                {
                    id:'test2',
                    //resourceId: 'b',
                    title: '<p class="fc-schedule-td-p">ml</p>' +
                    '<p class="fc-schedule-td-p">明法</p>' +
                    '<p class="fc-schedule-td-p"><span class="font-blue">qjx</span>，qjx</p>',
                    start: '2022-08-03 01:00',
                    end: '2022-08-03 02:00',
                    overlap: false,
                    //rendering: 'background',
                    color: '#eedefb',
                    textColor:'#444'
                },
                {
                    id:'test3',
                    //resourceId: 'b',
                    title: '<p class="fc-schedule-td-p">数据库</p>' +
                    '<p class="fc-schedule-td-p">教一</p>' +
                    '<p class="fc-schedule-td-p"><span class="font-blue">杜小勇</span>，陈晋川</p>',
                    start: '2022-08-03 02:00',
                    end: '2022-08-03 03:00',
                    color: '#fcf7e5',
                    textColor:'#444'
                },
                //颜色背景设置
//                        {
//                            id: 'availableForMeeting',
//                            start: '2016-08-02 08:00',
//                            end: '2016-08-02 08:45',
//                            rendering: 'background'
//                        }

            ],

            //动态取数据例子
//                    events: function (start, end, timezone, callback) {
//                        $.ajax({
//                            type: "GET",
//                            url: '/routine/myschedules',
//                            dataType: 'json',
//                            data: {start: "" + start, end: "" + end, filter: $("#hid").val()},
//                            success: function (doc) { var events = []; for (var i = 0; i < doc.meeting.length; i++) { var m = doc.meeting[i];
//                                events.push({
//                                    key: "meeting",
//                                    id: m.id,
//                                    typeId: m.meetingType.typeId,
//                                    title: m.title,
//                                    content: "时间：" + ameutils.convertTime(m.meetingDate, "yyyy-MM-dd hh:mm:ss") + "  类型：" + m.meetingType.typeName,
//                                    start: ameutils.convertTime(m.meetingDate, "yyyy-MM-dd"),
//                                    time: ameutils.convertTime(m.meetingDate, "yyyy-MM-dd hh:mm:ss"),
//                                    backgroundColor: '#E0FFFF',
//                                    textColor: '#000000',
//                                    borderColor: '#E0FFFF',
//                                });
//                            } for (var i = 0; i < doc.outgoing.length; i++) { var o = doc.outgoing[i];
//                                events.push({
//                                    key: "outgoing",
//                                    id: o.id,
//                                    typeId: o.outgoingType.type,
//                                    title: o.title,
//                                    content: "时间：" + ameutils.convertTime(o.startTime, "yyyy-MM-dd") + "  类型：" + o.outgoingType.typeName,
//                                    start: ameutils.convertTime(o.startTime, "yyyy-MM-dd"),
//                                    time: ameutils.convertTime(o.startTime, "yyyy-MM-dd"),
//                                    backgroundColor: '#E0FFFF',
//                                    textColor: '#000000',
//                                    borderColor: '#E0FFFF',
//                                    constraint: 'availableForMeeting'  }); if (o.outgoingType.type == 10)
//                                    outgoingnum2 = outgoingnum2 + 1; else  outgoingnum1 = outgoingnum1 + 1;
//                            } var neihtml = ""; for (var i = 0; i < doc.bulletins.length; i++) { var b = doc.bulletins[i];
//                                neihtml += '<dl>';
//                                neihtml += '<dt>';
//                                neihtml += '<h4>' + b.title + '</h4>';
//                                neihtml += '<span class="f12 font-grey-silver">2015-05-18 07:13</span> </dt>';
//                                neihtml += '<dd>';
//                                neihtml += '<p>' + b.content + '</p>';
//                                neihtml += '</dd>';
//                                neihtml += '</dl>';
//                            } var waihtml = ""; for (var i = 0; i < doc.announcements.length; i++) { var a = doc.announcements[i];
//                                waihtml += '<dl>';
//                                waihtml += '<dt>';
//                                waihtml += '<h4>' + a.title + '</h4>';
//                                waihtml += '<span class="f12 font-grey-silver">2015-05-18 07:13</span> </dt>';
//                                waihtml += '<dd>';
//                                waihtml += '<p>' + a.type + '</p>';
//                                waihtml += '</dd>';
//                                waihtml += '</dl>';
//                            }
//                                $("#meetingnum").html(doc.meetingnum);
//                                $("#outgoingnum1").html(doc.outgoingnum1);
//                                $("#outgoingnum2").html(doc.outgoingnum2);
//                                $("#nei").html(neihtml);
//                                $("#wai").html(waihtml);
//                                callback(events);
//                            }
//                        });
//                    },

            //    resources: [
            //    {
            //        id: 'a',
            //        title: 'Room A'
            //    },
            //    {
            //        id: 'a1',
            //        parentId: 'a',
            //        title: 'Room A1'
            //    },
            //    {
            //        id: 'a2',
            //        parentId: 'a',
            //        title: 'Room A2'
            //    }
            //],
//                    resourceAreaWidth: '30%',
//                    resourceColumns: [
//                        {
//                            labelText: 'Room',
//                            field: 'title'
//                        },
//                        {
//                            labelText: 'Occupancy',
//                            field: 'occupancy'
//                        }
//                    ],
//                    resources: [
//                        { id: 'a', title: 'Auditorium A', occupancy: 40 },
//                        { id: 'b', title: 'Auditorium B', occupancy: 40, eventColor: 'green' },
//                        { id: 'c', title: 'Auditorium C', occupancy: 40, eventColor: 'orange' },
//                        { id: 'd', title: 'Auditorium D', occupancy: 40, children: [
//                            { id: 'd1', title: 'Room D1', occupancy: 10 },
//                            { id: 'd2', title: 'Room D2', occupancy: 10 }
//                        ] },
//                        { id: 'e', title: 'Auditorium E', occupancy: 40 },
//                        { id: 'f', title: 'Auditorium F', occupancy: 40, eventColor: 'red' },
//                        { id: 'g', title: 'Auditorium G', occupancy: 40 },
//                        { id: 'h', title: 'Auditorium H', occupancy: 40 },
//                        { id: 'i', title: 'Auditorium I', occupancy: 40 },
//                        { id: 'j', title: 'Auditorium J', occupancy: 40 },
//                        { id: 'k', title: 'Auditorium K', occupancy: 40 },
//                        { id: 'l', title: 'Auditorium L', occupancy: 40 },
//                        { id: 'm', title: 'Auditorium M', occupancy: 40 },
//                        { id: 'n', title: 'Auditorium N', occupancy: 40 },
//                        { id: 'o', title: 'Auditorium O', occupancy: 40 },
//                        { id: 'p', title: 'Auditorium P', occupancy: 40 },
//                        { id: 'q', title: 'Auditorium Q', occupancy: 40 },
//                        { id: 'r', title: 'Auditorium R', occupancy: 40 },
//                        { id: 's', title: 'Auditorium S', occupancy: 40 },
//                        { id: 't', title: 'Auditorium T', occupancy: 40 },
//                        { id: 'u', title: 'Auditorium U', occupancy: 40 },
//                        { id: 'v', title: 'Auditorium V', occupancy: 40 },
//                        { id: 'w', title: 'Auditorium W', occupancy: 40 },
//                        { id: 'x', title: 'Auditorium X', occupancy: 40 },
//                        { id: 'y', title: 'Auditorium Y', occupancy: 40 },
//                        { id: 'z', title: 'Auditorium Z', occupancy: 40 }
//                    ],
            //选择，可选择区域
            selectable: true,
            selectHelper: true,
            select: function(start, end) {
                var title = prompt('Event Title:');
                var eventData;
                if (title) {
                    eventData = {
                        title: title,
                        start: start,
                        end: end
                    };
                    $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true

                }
                $('#calendar').fullCalendar('unselect');

            }
//第二种添加
//                    select: function (start, end, jsEvent, view) {
//                        $("#calendar").fullCalendar('addEventSource', [{
//                            start: start,
//                            end: end,
//                            rendering: 'background',
//                            block: true,
//                        }, ]);
//                        $("#calendar").fullCalendar("unselect");
//                    },


//                    $('#calendar').fullCalendar('refetchEvents'); //重新获取所有事件数据
//                    selectable: true,
//                    select: function (start, end, jsEvent, view) {
//                        $("#calendar").fullCalendar('addEventSource', [{
//                            start: start,
//                            end: end,
//                            rendering: 'background',
//                            backgroundColor:'#3192cb',
//                            block: true,
//                        }, ]);
//                        $('#calendar').fullCalendar('unselect');
//                    },


//                    selectOverlap: function(event) {
//                       // return ! event.block;
//                    }
        });


//        //重新设置日历的某些属性
//        $('#calendar').fullCalendar('option', {
////                    lang: 'fr',
////                    isRTL: true,
//            slotLabelFormat:'第H课',
//        });

//判断时间是否冲突
        function isOverlapping(event){
            //var array =  $('#calendar').fullCalendar('clientEvents');

            var calendar = $('#calendar').fullCalendar('getCalendar');
            for(i in calendar){
                if(array[i].id != event.id){
                    if(!(array[i].start >= event.end || array[i].end <= event.start)){
                        return true;
                    }
                }
            }
            return false;
        }


//        $('.fc-right .fc-button-group').before('<input class="t-button w100" value="新增(自定义)"/>');
////                $(".fc-slats table tbody tr .fc-axis").each(function(){
////                    $(this).append("<p style='line-height: 15px;margin: 0;padding: 0;text-align: left'>8:00~9:00</p>")
////                });

    }

});



$(function(){
    $('#external-events .fc-event').each(function() {

        $(this).data('event', {
            title: $.trim($(this).text()),
            stick: true
        });

        $(this).draggable({
            zIndex: 999,
            revert: true,
            revertDuration: 0
        });
    });

});

