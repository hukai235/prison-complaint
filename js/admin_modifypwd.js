//加载基础页面
$(()=>{
  var eno=sessionStorage.getItem("enum");
  var avatar=sessionStorage.getItem("avatar");
  var role_no=sessionStorage.getItem("role_no");
  if(!eno){
      location.href="admin_login.html";
  }else{
      $("[data-src=image]").attr("src",avatar);
      $(".enum-show").html(eno);
  };
  if(role_no!=1 && role_no!=2){
   $("#sidebar-menu").children().last().siblings().css("display","none");
  }else{
   $("#sidebar-menu").children().last().siblings().css("display","block");
  };
  // 判断旧登录密码是否输入正确
  $("#oldPwd").blur((e)=>{
   var oldpwd=$(e.target).val();
   var $msgSpan=$(e.target).parent().next().children();
   if(!oldpwd){
    $msgSpan.html("*旧登录密码不能为空！");
    $msgSpan.removeClass("msg-succ");
   }else{
    $.get("data/login_do.php",{enum:eno,epwd:oldpwd})
      .then(data=>{
        if(data.code<0){
         $msgSpan.html("*旧登录密码输入错误！");
         $msgSpan.removeClass("msg-succ");
        }else{
         $msgSpan.html("");
         $msgSpan.addClass("msg-succ");
        };
      });
   }
  });
  // 判断输入的新登录密码长度是否至少6位
  $("#newPwd").blur((e)=>{
   var newPwd=$(e.target).val();
   var $msgSpan=$(e.target).parent().next().children();
   if(!newPwd){
    $msgSpan.html("*新登录密码不能为空！");
    $msgSpan.removeClass("msg-succ");
   }else{
    var msg=/^.{6,}$/;
    if(!msg.test(newPwd)){
     $msgSpan.html("*密码长度至少6位！");
     $msgSpan.addClass("error-msg");
     $msgSpan.removeClass("msg-succ");
    }else{
     $msgSpan.html("");
     $msgSpan.removeClass("error-msg").addClass("msg-succ");
    };
   };   
  });
  // 判断再次输入的新密码两次是否一致
  $("#surePwd").blur((e)=>{
   var surePwd=$(e.target).val();
   var newPwd=$("#newPwd").val();
   var $msgSpan=$(e.target).parent().next().children();
   if(surePwd!==newPwd){
    $msgSpan.html("*两次密码输入不一致");
    $msgSpan.removeClass("msg-succ");
   }else{
    $msgSpan.html("");
    $msgSpan.addClass("msg-succ");
   }
  });
  $("#sure-btn").click((e)=>{
   e.preventDefault();
   var newPwd=$("#newPwd").val();
   var spans=$("#mpwdContainer span.msg-succ");
   var count=0;
   for(var span of spans){
    count++;
   };
   if(count==3){
    $.get("data/modify_pwd.php",{enum:eno,newPwd:newPwd})
      .then(data=>{
       if(data.code>0){
        alert("密码修改成功!");
       };
      });
   };
  });
})
  