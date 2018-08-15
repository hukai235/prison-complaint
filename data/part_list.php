<?php
header("Content-Type:application/json;charset=utf-8");
require_once('init.php');
$sql="SELECT * FROM pri_depart WHERE isShow=1 AND dstate=1";
echo json_encode(sql_execute($sql));