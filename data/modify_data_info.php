<?php
header("Content-Type:application/json;charset=UTF-8");
require("init.php");
@$id=$_REQUEST["id"];
@$mxname=$_REQUEST["mxname"];
$sql="UPDATE data_info SET mxname='$mxname' WHERE id=$id";
$result=mysqli_query($conn,$sql);
if($result){
  echo '{"code":1,"msg":"修改成功"}';
}else{
  echo '{"code":-1,"msg":"修改失败"}';
};