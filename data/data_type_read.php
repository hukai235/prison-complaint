<?php
header("Content-Type:application/json;charset=utf-8");
require_once("init.php");
// 读取数据字典中所有的数据类型
$sql="SELECT DISTINCT type FROM data_info";
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($rows);