<?php
header("Content-Type:application/json;charset=utf-8");
require_once('init.php');
@$comp_name=$_REQUEST["comp_name"];
@$comp_ID=$_REQUEST["comp_ID"];
@$comp_date=$_REQUEST["comp_date"];
@$poli_num=$_REQUEST["poli_num"];
@$msg_id=$_REQUEST["msg_id"];
@$has_evid=$_REQUEST["has_evid"];
@$info_from=$_REQUEST["info_from"];
@$issign=$_REQUEST["issign"];
@$type=$_REQUEST["type"];
@$isgrate=$_REQUEST["isgrate"];
if($type==1){
    $isgrate="null";
};
$sql="INSERT INTO coll_msg VALUES(null,'$comp_name','$comp_ID',$comp_date,$poli_num,'$msg_id',$has_evid,$info_from,$issign,$type,0,null,'$isgrate')";
$result=mysqli_query($conn,$sql);
// echo $sql;   
if($result){
    echo '{"code":1,"msg":"投诉/评价信息提交成功"}'; 
}else{
    echo '{"code":0,"msg":"投诉/评价信息提交失败"}';
};