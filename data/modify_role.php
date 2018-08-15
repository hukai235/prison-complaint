<?php
header("Content-Type:application/json;charset=UTF-8");
require("init.php");
@$role_no=$_REQUEST["role_no"];
@$role_name=$_REQUEST["role_name"];
$sql="UPDATE role_tb SET role_name='$role_name' WHERE role_no=$role_no";
$result=mysqli_query($conn,$sql);
if($result){
  echo '{"code":1,"msg":"修改成功"}';
}else{
  echo '{"code":-1,"msg":"修改失败"}';
};