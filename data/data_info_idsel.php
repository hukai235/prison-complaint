<?php
header("Content-Type:application/json;charset=utf-8");
require_once('init.php');
@$id=$_REQUEST["id"];
$sql="SELECT * FROM data_info WHERE id=$id";
echo json_encode(sql_execute($sql));