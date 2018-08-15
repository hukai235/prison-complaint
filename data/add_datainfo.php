<?php
  header("Content-Type:application/json;charset=utf-8");
  require_once("init.php");
  @$type=$_REQUEST["type"];
  @$mxname=$_REQUEST["mxname"];
  //2:创建SQL语句
  $sql="INSERT INTO data_info VALUES(null,'$type','$mxname')";
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