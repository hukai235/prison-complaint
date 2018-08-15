<?php
  header("Content-Type:application/json;charset=utf-8");
  //功能:新增部门信息
  //1:加载init.php 文件
  require_once("init.php");
  @$dname=$_REQUEST["dname"];
  @$isShow=$_REQUEST["isShow"];
  @$dstate=$_REQUEST["dstate"];
  @$role_id=$_REQUEST["role_id"];
  //2:创建SQL语句
  $sql="INSERT INTO pri_depart VALUES(null,'$dname',$isShow,$dstate,$role_id)";
  //3:发送sql语句
  $result = mysqli_query($conn,$sql);
  //4:判断返回结果
  //5:输出json
  if($result==true){
    echo '{"code":1,"msg":"新增成功"}';
  }else{
    echo '{"code":-1,"msg":"新增失败 "}';
  }  
?>