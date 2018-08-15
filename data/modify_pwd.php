<?php
header("Content-Type:application/json;charset=utf-8");
require_once("init.php");
@$enum=$_REQUEST["enum"];
@$newPwd=$_REQUEST["newPwd"];
$sql="UPDATE pri_emp SET epwd='$newPwd' WHERE enum=$enum";
$result=mysqli_query($conn,$sql);
if($result){
 echo '{"code":1, "msg":"密码更新成功"}';
}else{
 echo '{"code":0, "msg":"密码更新失败"}';
};