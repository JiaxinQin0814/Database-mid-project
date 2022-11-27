/**
 * Created by cxy on 2015/12/1.
 */
$(document).ready(function($){

    //下拉菜单用
    $(".btn-group div").click(function(){
        var ul=$(this).next();
        if(ul.css("display")=="none"){
            ul.slideDown();
        }else{
            ul.slideUp();
        }
    });

    $(".btn-group ul li").click(function(){
        var li=$(this).text();
       var selectText="<span class='selectText'>"+li+"</span><span class='fa fa-sort'></span>";
        $(this).parent().prev().first().html(li+"<span class='fa fa-sort'></span>");
        $(".dropdown-menu").hide();
    // alert( $("#sort").text());
    });
});

//下拉菜单2用
//var $$ = function (id) {
//    return document.getElementById(id);
//}
//window.onload = function () {
//    var btnSelect = $$("btn_select");
//    var curSelect = btnSelect.getElementsByTagName("span")[0];
//    var oSelect = btnSelect.getElementsByTagName("select")[0];
//    var aOption = btnSelect.getElementsByTagName("option");
//    oSelect.onchange = function () {
//        var text=oSelect.options[oSelect.selectedIndex].text;
//        curSelect.innerHTML = text;
//    }
//}