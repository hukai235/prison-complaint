<?php
header("Content-Type:application/json;charset=utf-8");
require_once('init.php');
@$comp_name=$_REQUEST["comp_name"];
@$comp_ID=$_REQUEST["comp_ID"];
@$comp_date=$_REQUEST["comp_date"];
@$enfo_type=$_REQUEST["enfo_type"];
@$enfo_part=$_REQUEST["enfo_part"];
@$enfo_poli=$_REQUEST["enfo_poli"];
@$enfo_date=$_REQUEST["enfo_date"];
@$enfo_addr=$_REQUEST["enfo_addr"];
@$enfo_id=$_REQUEST["enfo_id"];
@$enfo_msg=$_REQUEST["enfo_msg"];
@$issign=$_REQUEST["issign"];
$sql="INSERT INTO enforce_msg VALUES(null,'$comp_name','$comp_ID',$comp_date,$enfo_type,$enfo_part,$enfo_poli,$enfo_date,$enfo_addr,$enfo_id,'$enfo_msg',$issign,0,null)";
$result=mysqli_query($conn,$sql);
if($result){
    echo '{"code":1,"msg":"执法评价信息提交成功"}';
}else{
    echo '{"code":0,"msg":"执法评价信息提交失败"}';
};