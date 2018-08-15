//防止用户非法使用主页
$(()=>{
  var eno=sessionStorage.getItem("enum");
  var avatar=sessionStorage.getItem("avatar");
  var role_no=sessionStorage.getItem("role_no");
  if(!eno){
    location.href="admin_login.html";
  }else if(role_no!=1 && role_no!=2){
    location.href="admin_login.html";
  }else{
    $("[data-src=image]").attr("src",avatar);
    $(".enum-show").html(eno);
  };
});
