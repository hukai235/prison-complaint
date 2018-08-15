<?php
header("Content-Type:application/json;charset=utf-8");
require_once('init.php');
@$enum=$_REQUEST["enum"];
@$role_no=$_REQUEST["role_no"];
$searMsg="";
if(!$role_no){
  $searMsg="";  
}else{
    if($role_no==1 || $role_no==2){
        $searMsg="";
    }else if($role_no==3 || $role_no==4 || $role_no==5){
        $searMsg=" AND role_id=".$role_no;
    }else if($role_no==6 || $role_no==7){
        $sql="SELECT did FROM pri_emp WHERE enum=$enum AND estate=1";
        $result=mysqli_query($conn,$sql);
        $row=mysqli_fetch_all($result,MYSQLI_ASSOC);    
        $searMsg=" AND did=".$row[0]["did"];
    };
};
$sql="SELECT did,dname FROM pri_depart WHERE dstate=1 ".$searMsg;
echo json_encode(sql_execute($sql));