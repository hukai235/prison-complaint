<?php
header("Content-Type:application/json;charset=UTF-8");
require_once('init.php');
 //4:获取参数pno 当前页码
  @$pno = $_REQUEST["pno"];
  @$pageSize=$_REQUEST["pageSize"];
  //5:如果当前页码参数不存在则显示第一页
  if(!$pno){
    $pno = 1;
  }else{
    $pno = intval($pno);//将字符串数据转换整数js parseInt()
  }
  //如果每个页面大小不知道，默认为每页显示10条数据
  if(!$pageSize){
      $pageSize=5;
  }else{
      $pageSize=intval($pageSize);
  }
  //6:创建数组  拼装返回结果
  //总记录数  总页数  当前页  当前页数据
  $output = ["recodeCount"=>0,     //满足条件的总记录数
            "pageCount"=>0,        //总页数
            "pno"=>$pno,           //当前数据所有页码
            "data"=>null,          //当前页中的数据
            "pageSize"=>$pageSize, //每个页大小
            ];
 //7:查询总记录数与总页
  $sql = "SELECT COUNT(*) FROM role_tb";
  $result = mysqli_query($conn,$sql);
  $row = mysqli_fetch_row($result);
  $output["recodeCount"]=intval($row[0]);
  $output["pageCount"]=ceil($output["recodeCount"]/$output["pageSize"]);
  $start = ($output["pno"]-1)*$output["pageSize"];
  $count = $output["pageSize"];
  $sql=" SELECT * FROM role_tb  LIMIT $start,$count";
  $result = mysqli_query($conn,$sql);
  $rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
  $output["data"]=$rows;  
 echo json_encode($output);
?>