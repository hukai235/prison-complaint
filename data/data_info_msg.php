<?php
header("Content-Type:application/json;charset=utf-8");
require_once('init.php');
@$msg_id=$_REQUEST["msg_id"];
$data=[];
$msg_ids=explode("_",$msg_id);    
for($i=0;$i<count($msg_ids);$i++){
    $id=intval($msg_ids[$i]);
    $sql="SELECT mxname FROM data_info WHERE id=$id";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_row($result);
    $data[]=$row[0];
};
echo json_encode($data);