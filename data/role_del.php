<?php
header("Content-Type:aplication/json;charset=utf-8");
require_once("init.php");
@$role_no=$_REQUEST["role_no"];
$sql="DELETE FROM role_tb WHERE role_no=$role_no";
$result=mysqli_query($conn,$sql);
if($result){
  echo '{"code":1,"msg":"删除成功"}';
}else{
  echo '{"code":-1,"msg":"删除失败"}';
};