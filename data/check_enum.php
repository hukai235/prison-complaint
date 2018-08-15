<?php
header("Content-Type:application/json;charset=UTF-8");
require("init.php");
@$enum=$_REQUEST["enum"];
$sql="SELECT * FROM pri_emp WHERE enum='$enum'";
$result=sql_execute($sql);
if($result==null){
  echo '{"code":-1,"msg":"警号可用"}';
}else{ 
  echo '{"code":1,"msg":"警号已存在系统"}';
}
?>