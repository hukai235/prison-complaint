<?php
header("Content-Type:application/json;charset=utf-8");
require_once('init.php');
$output=[
    "enfo_type"=>null,
    "enfo_addr"=>null,
    "enfo_id"=>null
];
$sql="SELECT * FROM data_info WHERE type='执法类型'";
$output["enfo_type"]=sql_execute($sql);
$sql="SELECT * FROM data_info WHERE type='执法地点'";
$output["enfo_addr"]=sql_execute($sql);
$sql="SELECT * FROM data_info WHERE type='执法评价意见'";
$output["enfo_id"]=sql_execute($sql);
echo json_encode($output);