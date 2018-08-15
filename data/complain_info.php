<?php
header("Content-Type:application/json;charset=utf-8");
@$enum=$_REQUEST["enum"];
@$title=$_REQUEST["title"];
$output=[
  "data"=>null,
  "complainMsg"=>null
];
require_once('init.php');
$sql="SELECT *,(SELECT dname FROM pri_depart WHERE did=did limit 0,1) as dname FROM pri_emp WHERE enum=$enum";
$output["data"]=sql_execute($sql);
if($title=="投诉警察"){ 
  $selMsg="投诉警察意见";
}else if($title="评价警察"){
  $selMsg="满意度评价";
};
$sql="SELECT * FROM data_info WHERE type='$selMsg'";
$output["complainMsg"]=sql_execute($sql);
echo json_encode($output);