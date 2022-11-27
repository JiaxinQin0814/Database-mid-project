// JScript 文件
var x=0;    
function myRefresh()    
{    
  var httpRequest = new ActiveXObject("microsoft.xmlhttp");
  httpRequest.open("GET", "/Default/SessionExpire", false);
  httpRequest.send(null);
  x++;
  if (x < 60) //60次，也就是Session真正的过期时间是30分钟 
   {
      setTimeout("myRefresh()",30*1000); //30秒
   } 
}
myRefresh();
