/**菜单跳转**/
function rightMain(url){
	$('#rightMain').attr('src', url);
}

/** 异步加载栋号列表 * */
function getFyDhListByFyXqCode() {
	var fyXq = $("#fyXq").val();
	if (fyXq == "" || fyXq == null) {
		$("#fyDh").html('<option value="">--请选择--</option>');
	} else {
		/** 异步加载栋号列表 * */
		$.ajax({
			type : "POST",
			url : "getFyDhListByFyXqCode.action",
			data : {
				"fyXqCode" : fyXq
			},
			dataType : "json",
			success : function(data) {
				// 如果返回数据不为空，更改“房源信息”
				if (data == null || data == '') {// 如果为空
					alert("该小区下暂无栋号列表，请联系\n管理员维护数据哦！！！");
					$("#fyDh").html('<option value="">--请选择--</option>');
				} else {
					var str = '<option value="">--请选择--</option>';
					// 将返回的数据赋给zTree
					for (var i = 0; i < data.length; i++) {
						str += '<option value="' + data[i].weiduID + '">'
								+ data[i].weiduName + '</option>';
					}
					// alert(str);
					$("#fyDh").html(str);
				}
			}
		});
	}
}

/*
 * 是否全选
 */
function selectOrClearAllCheckbox(obj) {
	var checkStatus = $(obj).attr("checked");
	if (checkStatus == "checked") {
		$("input[type='checkbox']").attr("checked", true);
	} else {
		$("input[type='checkbox']").attr("checked", false);
	}
}

/** 日期函数，加几天，减几天 **/
function getNextDay(dd, dadd) {
	// 可以加上错误处理
	var a = new Date(dd);
	a = a.valueOf();
	a = a + dadd * 24 * 60 * 60 * 1000;
	a = new Date(a);
	var m = a.getMonth() + 1;
	if (m.toString().length == 1) {
		m = '0' + m;
	}
	var d = a.getDate();
	if (d.toString().length == 1) {
		d = '0' + d;
	}
	return a.getFullYear() + "-" + m + "-" + d;
}

/** table鼠标悬停换色* */
$(function() {
	// 如果鼠标移到行上时，执行函数
	
	
	
	$(".table tr").mouseover(function() {
		$(this).css({background : "#CDDAEB"});
		$(this).children('td').each(function(index, ele){
			$(ele).css({color: "#1D1E21"});
		});
	}).mouseout(function() {
		$(this).css({background : "#FFF"});
		$(this).children('td').each(function(index, ele){
			$(ele).css({color: "#909090"});
		});
	});
});



//弹框数据赋值设置，如果想要进行鼠标悬停显示，将click改为mouseover
$("#demo3 tbody").on("click", "tr", function() {
	var data = new Array;
	var td = $(this).find("td");
	/*for (var i = 0; i < td.length; i++) {
		$('#tables').text(td.eq(i).text());
		
	}*/
	
	/*$('#tkid').text("ID:"+td.eq(4).text());
	$('#tkauthorId').text("填写人ID:"+td.eq(5).text());*/
	if(td!=null || td!=""){
	$('#tkunit').text("xx:"+td.eq(0).text());
	$('#tkregin').text("xx:"+td.eq(1).text());
	$('#tklinkman').text("xx:"+td.eq(2).text());
	$('#tkcontactNumber').text("xx:"+td.eq(3).text());	
	$('#diceng').css("display", "");
	}
})
//鼠标移除后弹框消失
/*$("#demo3 tbody").on("mouseout", "tr", function() {
	$('#diceng').css("display", "none");
})*/

//窗口关闭按钮
$("#header-right").click(function(){
	$('#diceng').css("display", "none");
})
