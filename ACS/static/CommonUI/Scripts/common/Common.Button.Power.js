//按钮权限
//适用情况：talbe内的tr行的操作权限
//2016-01-08 10:28:01 Joe

function CBP_Get_Button_Power(array_button) {
    var str = '';
    $(array_button).each(function () {
        switch (this.Action) {
            case 'Show':
                if (BUTTON["Show"] == "true") {
                    str += '<i class="fa fa-eye" title="查看" onclick="' + this.Function + '"></i>';
                }
                else {
                    str += '<i class="fa fa-eye" title="查看" onclick="ShowAuthDialog()"></i>';
                }
                break;

            case 'Edit':
                if (BUTTON["Edit"] == "true") {
                    str += '<i class="fa fa-edit" title="编辑" onclick="' + this.Function + '" operate="edit"></i>';
                }
                else {
                    str += '<i class="fa fa-edit" title="编辑" onclick="ShowAuthDialog()"></i>';
                }
                break;

            case 'Delete':
                if (BUTTON["Delete"] == "true") {
                    str += '<i class="fa fa-trash" title="删除" onclick="' + this.Function + '" flag="Del" del_flag="' + this.DelFlag + '" table_name="' + this.TableName + '" col_name="' + this.ColName + '" col_value="' + this.ColValue + '"></i>';
                }
                else {
                    str += '<i class="fa fa-trash" title="删除" onclick="ShowAuthDialog()"></i>';
                }
                break;

            case 'AuthorizeOne':
                if (BUTTON["AuthorizeOne"] == "true") {
                    str += '<i class="fa fa-exchange" title="'+this.Title+'" onclick="' + this.Function + '"></i>';
                }
                else {
                    str += '<i class="fa fa-exchange" title="' + this.Title + '" onclick="ShowAuthDialog()"></i>';
                }
                break;

            case 'AuthorizeTwo':
                if (BUTTON["AuthorizeTwo"] == "true") {
                    str += '<i class="fa fa-plus-square" title="' + this.Title + '" onclick="' + this.Function + '"></i>';
                }
                else {
                    str += '<i class="fa fa-plus-square" title="' + this.Title + '" onclick="ShowAuthDialog()"></i>';
                }
                break;
            case 'SetOne':
                if (BUTTON["SetOne"] == "true") {
                    str += '<i class="glyphicon glyphicon-cog"  title="' + this.Title + '"  onclick="' + this.Function + '"></i>';
                }
                else {
                    str += '<i class="glyphicon glyphicon-cog"  title="' + this.Title + '" onclick="ShowAuthDialog()"></i>';
                }
                break;

            case 'SetTwo':
                if (BUTTON["SetTwo"] == "true") {
                    str += '<i class="glyphicon glyphicon-list-alt"  title="' + this.Title + '"  onclick="' + this.Function + '"></i>';
                }
                else {
                    str += '<i class="glyphicon glyphicon-list-alt"  title="' + this.Title + '"  onclick="ShowAuthDialog()"></i>';
                }
                break;
        }
    })
    return str;
}