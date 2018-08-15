/*导航栏时间显示 */
function getCurrentTime(){
    var date=new Date();
    var week=["日","一","二","三","四","五","六"]
    function pad0(val){return val<10?(val="0"+val):val;}
    var y=date.getFullYear();
    //获取月份的值，如果月份小于10，用0补齐至两位
    var M=pad0(date.getMonth()+1);
    var d=pad0(date.getDate());
    var day=week[date.getDay()];
    var h=date.getHours();
    var am=h<12?"上午":"下午";
    //如果h>12,就改为h-12；
    h>12&&(h-=12);
    h=pad0(h);
    var m=pad0(date.getMinutes());
    var s=pad0(date.getSeconds());        
    var currentTime= y+"年"+M+"月"+d+"日"+"&nbsp;&nbsp;&nbsp;"+"星期"+day+"&nbsp;&nbsp;&nbsp;"+am+h+":"+m+":"+s;
    $("#showCurrentTime").html(currentTime);
};
getCurrentTime();
setInterval(getCurrentTime,1000);
$(".my-back").click(function(){
    history.go(-1);
})
