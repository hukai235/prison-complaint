<?php
  header("Content-Type:application/json;charset=utf-8");
  require_once("init.php");
  @$role_name=$_REQUEST["role_name"];
  @$create_time=$_REQUEST["create_time"];
  //2:创建SQL语句
  $sql="INSERT INTO role_tb VALUES(null,'$role_name',$create_time)";
  //3:发送sql语句
  $result = mysqli_query($conn,$sql);
  //4:判断返回结果
  //5:输出json
  if($result==true){
    echo '{"code":1,"msg":"新增成功"}';
  }else{
    echo '{"code":-1,"msg":"新增失败 "}';
  };  
?>