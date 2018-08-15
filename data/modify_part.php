<?php
  header("Content-Type:application/json;charset=utf-8");
  //功能:更新指定部门信息
  //1:加载init.php 文件
  require_once("init.php");
  @$did = $_REQUEST["did"];
  @$dname=$_REQUEST["dname"];
  @$isShow=$_REQUEST["isShow"];
  @$dstate=$_REQUEST["dstate"];
  @$role_id=$_REQUEST["role_id"];
  //2:创建SQL语句
  $sql = "UPDATE pri_depart SET dname='$dname',isShow=$isShow,dstate=$dstate,role_id=$role_id WHERE did = $did";
  //3:发送sql语句
  $result = mysqli_query($conn,$sql);
  //4:判断返回结果
  //5:输出json
  if($result==true){
    echo '{"code":1,"msg":"修改成功"}';
  }else{
    echo '{"code":-1,"msg":"修改失败 "}';
  }  
?>