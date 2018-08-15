<?php
header("Content-Type:application/json;charset=utf-8");
require_once("init.php");
@$enum=$_REQUEST["enum"];
@$role_no=$_REQUEST["role_no"];
$output=[
 "comps"=>null,
 "evals"=>null,
 "enfos"=>null
];
if($role_no==1 || $role_no==2){
 // 查询角色为系统管理员或监狱长时，未处理的各项投诉与评价
 // 投诉警察
 $sql="SELECT COUNT(*) FROM coll_msg WHERE type=1 AND isdeal=0";
 $result=mysqli_query($conn,$sql);
 $row=mysqli_fetch_row($result);
 $output["comps"]=$row[0];
 // 评价警察
 $sql="SELECT COUNT(*) FROM coll_msg WHERE type=2 AND isdeal=0";
 $result=mysqli_query($conn,$sql);
 $row=mysqli_fetch_row($result);
 $output["evals"]=$row[0];
 // 执法评价
 $sql="SELECT COUNT(*) FROM enforce_msg WHERE isdeal=0";
 $result=mysqli_query($conn,$sql);
 $row=mysqli_fetch_row($result);
 $output["enfos"]=$row[0];
}else if($role_no==3 || $role_no==4 || $role_no==5){
 // 查询角色为分管副监狱长时的所负责辖区内未处理的投诉评价
 // 投诉警察
 $sql="SELECT COUNT(*) FROM coll_msg m, pri_depart p,pri_emp e WHERE m.type=1 AND m.isdeal=0 AND p.role_id=$role_no AND e.did=p.did AND e.enum=m.poli_num";
 $result=mysqli_query($conn,$sql);
 $row=mysqli_fetch_row($result);
 $output["comps"]=$row[0];
 // 评价警察
 $sql="SELECT COUNT(*) FROM coll_msg m, pri_depart p,pri_emp e WHERE m.type=2 AND m.isdeal=0 AND p.role_id=$role_no AND e.did=p.did AND e.enum=m.poli_num";
 $result=mysqli_query($conn,$sql);
 $row=mysqli_fetch_row($result);
 $output["evals"]=$row[0];
 // 执法评价
 $sql="SELECT COUNT(*) FROM enforce_msg m, pri_depart p,pri_emp e WHERE m.isdeal=0 AND p.role_id=$role_no AND e.did=p.did AND e.enum=m.poli_num";
 $result=mysqli_query($conn,$sql);
 $row=mysqli_fetch_row($result);
 $output["enfos"]=$row[0];
}else if($role_no==6){
 // 查询角色为分管副监狱长时的所负责辖区内未处理的投诉评价
 // 先查找出对应的部门id
 $sql="SELECT did FROM pri_emp WHERE enum=$enum";
 $result=mysqli_query($conn,$sql);
 $row=mysqli_fetch_row($result);
 $did=$row[0];
  // 投诉警察
 $sql="SELECT COUNT(*) FROM coll_msg m,pri_emp e WHERE m.type=1 AND m.isdeal=0  AND e.did=$did AND e.enum=m.poli_num";
 $result=mysqli_query($conn,$sql);
 $row=mysqli_fetch_row($result);
 $output["comps"]=$row[0];
 // 评价警察
$sql="SELECT COUNT(*) FROM coll_msg m,pri_emp e WHERE m.type=2 AND m.isdeal=0  AND e.did=$did AND e.enum=m.poli_num";
 $result=mysqli_query($conn,$sql);
 $row=mysqli_fetch_row($result);
 $output["evals"]=$row[0];
 // 执法评价
 $sql="SELECT COUNT(*) FROM enforce_msg m,pri_emp e WHERE m.isdeal=0 AND e.did=$did AND e.enum=m.poli_num";
 $result=mysqli_query($conn,$sql);
 $row=mysqli_fetch_row($result);
 $output["enfos"]=$row[0];
}else if($role_no==7){
 // 查询角色为普通员工时，自己未处理的新增的投诉评价
  // 投诉警察
 $sql="SELECT COUNT(*) FROM coll_msg WHERE type=1 AND isdeal=0  AND poli_num=$enum";
 $result=mysqli_query($conn,$sql);
 $row=mysqli_fetch_row($result);
 $output["comps"]=$row[0];
 // 评价警察
$sql="SELECT COUNT(*) FROM coll_msg WHERE type=2 AND isdeal=0  AND poli_num=$enum";
 $result=mysqli_query($conn,$sql);
 $row=mysqli_fetch_row($result);
 $output["evals"]=$row[0];
 // 执法评价
 $sql="SELECT COUNT(*) FROM enforce_msg WHERE isdeal=0 AND poli_num=$enum";
 $result=mysqli_query($conn,$sql);
 $row=mysqli_fetch_row($result);
 $output["enfos"]=$row[0];
};
echo json_encode($output);