$(function () {

        $("tr:nth-child(odd)").css("background", "#f9f9f9");
        $("tr:nth-child(even)").css("background", "#ececec");
        $(".t-table1 tr").mouseover(function () {
            $(this).css("background", "#badbff");
        });
        $(".t-table1 tr").mouseout(function () {
            $("tr:nth-child(odd)").css("background", "#f9f9f9");
            $("tr:nth-child(even)").css("background", "#ececec");
        });
});