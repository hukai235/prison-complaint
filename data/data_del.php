<?php
header("Content-Type:aplication/json;charset=utf-8");
require_once("init.php");
@$id=$_REQUEST["id"];
$sql="DELETE FROM data_info WHERE id=$id";
$result=mysqli_query($conn,$sql);
if($result){
  echo '{"code":1,"msg":"删除成功"}';
}else{
  echo '{"code":-1,"msg":"删除失败"}';
};