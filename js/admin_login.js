//模块一，完成用户登录
$("#btn1").click(e=>{
  e.preventDefault();
  var n=$("#enum").val();
  var p=$("#epwd").val();
  $.ajax({
    type:"GET",
    url:"data/login_do.php",
    data:{enum:n,epwd:p},
    success:function(data){
      if(data.code>0){
        sessionStorage.setItem("enum",n);
        sessionStorage.setItem("avatar",data.avatar);
        sessionStorage.setItem("role_no",data.role_no);
        location.href="admin_infodeal.html";
      }else{
        alert("用户名或密码错误！");
      };
    }
  });
});