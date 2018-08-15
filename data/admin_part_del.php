<?php
  header("Content-Type:application/json;charset=utf-8");
  //功能:删除指定部门
  //1:加载init.php 文件
  require_once("init.php");
  //2:创建SQL语句
  @$did = $_REQUEST["did"];
  $sql = "UPDATE pri_depart SET dstate = 0 WHERE did = $did";
  //3:发送sql语句
  $result = mysqli_query($conn,$sql);
  //4:判断返回结果
  //5:输出json
  if($result==true){
    echo '{"code":1,"msg":"删除成功"}';
  }else{
    echo '{"code":-1,"msg":"删除失败 "}';
  }  
?>