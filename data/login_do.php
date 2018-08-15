<?php
header("Content-Type:application/json;charset=UTF-8");
require("init.php");
@$enum=$_REQUEST["enum"];
@$epwd=$_REQUEST["epwd"];
$enum=intval($enum);
$sql="SELECT e.avatar,r.role_no FROM pri_emp e,user_role_tb r WHERE e.enum=$enum AND e.epwd='$epwd' AND e.estate=1 AND r.enum=$enum";
$result=mysqli_query($conn,$sql);
if(!$result){
  echo '{"code":-2,"msg":"用户名或者密码不正确"}';
}else{
  $row=mysqli_fetch_assoc($result);
  if(!$row){
    echo '{"code":-1,"msg":"用户名或者密码不正确"}';
  }else{
    $avatar=$row["avatar"];
    $role_no=$row["role_no"];
    echo '{"code":1,"avatar":"'.$avatar.'","role_no":'.$role_no.'}';
  };
};
?>