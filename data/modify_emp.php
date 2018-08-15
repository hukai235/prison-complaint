<?php
  header("Content-Type:application/json;charset=utf-8");
  //功能:更新指定人员信息
  //1:加载init.php 文件
  require_once("init.php");
  @$enum = $_REQUEST["enum"];
  @$did=$_REQUEST["did"];
  @$eduty=$_REQUEST["eduty"];
  @$avatar=$_REQUEST["avatar"];
  @$role_no=$_REQUEST["role_no"];
  //2:创建SQL语句
  $count=0;
  $sql = "UPDATE pri_emp SET did=$did,eduty='$eduty',avatar='$avatar' WHERE enum = $enum";
  //3:发送sql语句
  $result = mysqli_query($conn,$sql);
  //4:判断返回结果
  //5:输出json
  if($result){
    $count++;
  };
  $sql="UPDATE user_role_tb SET role_no=$role_no WHERE enum=$enum";
  $result = mysqli_query($conn,$sql);
  if($result){
    $count++;
  };
  if($count==2){
    echo '{"code":1,"msg":"修改成功"}';
  }else{
    echo '{"code":-1,"msg":"修改失败 "}';
  }  
?>