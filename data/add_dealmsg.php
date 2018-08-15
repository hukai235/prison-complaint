<?php
header("Content-Type:application/json;charset=utf-8");
require_once('init.php');
@$comp_type=$_REQUEST["comp_type"];
@$mid=$_REQUEST["mid"];
@$msg=$_REQUEST["msg"];
if($comp_type==3){
 $sql="UPDATE enforce_msg SET result='$msg',isdeal=1 WHERE emid=$mid";
}else{
 $sql="UPDATE coll_msg SET result='$msg',isdeal=1 WHERE cmid=$mid";
};
$result=mysqli_query($conn,$sql);
if($result){
 echo '{"code":1, "msg":"处理意见已提交"}';
}else{
 echo '{"code":0, "msg":"处理意见提交失败"}';
};