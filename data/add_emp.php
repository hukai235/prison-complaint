<?php
  header("Content-Type:application/json;charset=utf-8");
  //功能:新增人员信息
  //1:加载init.php 文件
  require_once("init.php");
  @$enum=$_REQUEST["enum"];
  @$ename=$_REQUEST["ename"];
  @$did=$_REQUEST["did"];
  @$eduty=$_REQUEST["eduty"];
  @$card_ID=$_REQUEST["card_ID"];
  @$estate=$_REQUEST["estate"];
  @$avatar=$_REQUEST["avatar"];
  @$create_time=$_REQUEST["create_time"];
  @$role_no=$_REQUEST["role_no"];
  if(!$card_ID){
    $card_ID=null;
  };
  $count=0;
  //2:创建SQL语句
  $sql="INSERT INTO pri_emp VALUES($enum,'$ename','$eduty','$avatar',$did,'$card_ID','123456',$estate,$create_time)";
  //3:发送sql语句
  $result = mysqli_query($conn,$sql);
  //4:判断返回结果
  //5:输出json
  if($result){
    $count++;
  };
  $sql="INSERT INTO user_role_tb VALUES($enum,$role_no)";
  $result = mysqli_query($conn,$sql);
  if($result){
    $count++;
  };
  if($count==2){
    echo '{"code":1,"msg":"新增成功"}';
  }else{
    echo $sql;
    echo '{"code":-1,"msg":"新增失败 "}';
  }
?>