<?php
header("Content-Type:application/json;charset=utf-8");
require_once('init.php');
@$pno = $_REQUEST["pno"];
@$pageSize=$_REQUEST["pageSize"];
@$comp_type=$_REQUEST["comp_type"];
@$start_date=$_REQUEST["start_date"];
@$end_date=$_REQUEST["end_date"];
@$sear_enum=$_REQUEST["sear_enum"];
@$did=$_REQUEST["did"];
@$isdeal=$_REQUEST["isdeal"];
@$role_no=$_REQUEST["role_no"];
@$enum=$_REQUEST["eno"];
if(!$pno){
  $pno = 1;
}else{
  $pno = intval($pno);//将字符串数据转换整数js parseInt()
};
//如果每个页面大小不知道，默认为每页显示5条数据
if(!$pageSize){
    $pageSize=5;
}else{
    $pageSize=intval($pageSize);
};
function selMsg($sql1,$sql2){
  //6:创建数组  拼装返回结果
  //总记录数  总页数  当前页  当前页数据
  global $pno;
  global $pageSize;
  global $conn;
  $output = ["recodeCount"=>0,     //满足条件的总记录数
          "pageCount"=>0,        //总页数
          "pno"=>$pno,           //当前数据所有页码
          "data"=>null,          //当前页中的数据
          "pageSize"=>$pageSize, //每个页大小
          ];  
  //7:查询总记录数与总页
  $sql = $sql1;
  // echo $sql;
  $result = mysqli_query($conn,$sql);
  $row = mysqli_fetch_row($result);
  if($row[0]==0){
        $output["data"]=[];        
  }else{
    $output["recodeCount"]=intval($row[0]);
    $output["pageCount"]=ceil($output["recodeCount"]/$output["pageSize"]);
    $start = ($output["pno"]-1)*$output["pageSize"];
    $count = $output["pageSize"];
    $sql=$sql2." LIMIT $start,$count";
    // echo $sql;
    $result = mysqli_query($conn,$sql);
    $rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
    $output["data"]=$rows;
  };
  return json_encode($output);
};
//判断执法类型为执法评价的情况
$dateSear="";
$enumSear="";
$partSear="";
$isdealSear="";
if($comp_type==3){
  if($start_date==""){
    $dateSear="  eval_date<".$end_date;
  }else{
    $dateSear="  eval_date<".$end_date." AND eval_date>".$start_date;
  };
  if($sear_enum!=""){
    $enumSear=" AND poli_num=".$sear_enum;
  };
  if($isdeal!=""){
    $isdealSear=" AND isdeal=".$isdeal;
  };
  $sqlMsg1="SELECT COUNT(*) FROM enforce_msg WHERE ".$dateSear.$enumSear.$isdealSear;
  $sqlMsg2="SELECT m.emid,m.eval_name,m.eval_ID,m.eval_date,m.enfo_type,m.poli_num,m.enfo_date,m.enfo_addr,m.enfo_msg,m.issign,m.isdeal,m.result,d.dname,e.ename,i.mxname FROM enforce_msg m,pri_depart d,pri_emp e,data_info i WHERE ".$dateSear.$enumSear.$isdealSear." AND m.enfo_id=i.id ";
  if($role_no==7){
      $sql1=$sqlMsg1." AND poli_num=$enum";
      $sql2=$sqlMsg2." AND m.poli_num=$enum AND e.enum=$enum AND e.did=d.did ORDER BY m.isdeal"; 
      echo selMsg($sql1,$sql2);
  };
  if($did==""){    
    if($role_no==1 || $role_no==2){
        $sql1=$sqlMsg1;
        $sql2=$sqlMsg2." AND e.enum=m.poli_num AND m.enfo_part=d.did ";
        echo selMsg($sql1,$sql2);
    }else if($role_no==3 || $role_no==4 || $role_no==5){
        $sql1="SELECT COUNT(*) FROM enforce_msg m,pri_depart d WHERE ".$dateSear.$enumSear.$isdealSear." AND d.role_id=$role_no AND m.enfo_part=d.did";
        $sql2=$sqlMsg2." AND e.enum=m.poli_num AND m.enfo_part=d.did AND d.role_id=$role_no  ORDER BY m.isdeal";
        echo selMsg($sql1,$sql2);
    }else if($role_no==6){
        $sql="SELECT did FROM pri_emp WHERE enum=$enum";
        $result = mysqli_query($conn,$sql);
        $row = mysqli_fetch_row($result);
        $r_did=intval($row[0]);
        $sql1=$sqlMsg1." AND enfo_part=$r_did ";
        $sql2=$sqlMsg2." AND e.enum=m.poli_num AND m.enfo_part=$r_did  AND d.did=m.enfo_part ORDER BY m.isdeal";
        echo selMsg($sql1,$sql2);
    };
  }else{
    $sql1=$sqlMsg1." AND enfo_part=$did ";
    $sql2=$sqlMsg2." AND e.enum=m.poli_num AND m.enfo_part=$did AND m.enfo_id=i.id  AND d.did=m.enfo_part ORDER BY m.isdeal";
    echo selMsg($sql1,$sql2);
  };
}else{
  if($start_date==""){
    $dateSear="  comp_date<".$end_date;
  }else{
    $dateSear="  comp_date<".$end_date." AND comp_date>".$start_date;
  };
  if($sear_enum!=""){
    $enumSear=" AND poli_num=".$sear_enum;
  };
  if($isdeal!=""){
    $isdealSear=" AND isdeal=".$isdeal;
  };
  $sqlMsg1="SELECT COUNT(*) FROM coll_msg WHERE ".$dateSear.$enumSear.$isdealSear." AND type=$comp_type ";
  $sqlMsg2="SELECT m.cmid,m.comp_name,m.comp_ID,m.comp_date,m.poli_num,m.has_evid,m.info_from,m.issign,m.isdeal,m.result,m.isgrate,m.msg_id,d.dname,e.ename,i.mxname FROM coll_msg m,pri_depart d,pri_emp e,data_info i WHERE ".$dateSear.$enumSear.$isdealSear." AND m.type=$comp_type ";
  if($comp_type==1){
    $sqlMsg2=$sqlMsg2." AND m.msg_id=i.id ";
  };
  if($comp_type==2){
    $sqlMsg2="SELECT m.cmid,m.comp_name,m.comp_ID,m.comp_date,m.poli_num,m.has_evid,m.info_from,m.issign,m.isdeal,m.result,m.isgrate,m.msg_id,d.dname,e.ename FROM coll_msg m,pri_depart d,pri_emp e WHERE ".$dateSear.$enumSear.$isdealSear." AND m.type=$comp_type ";
  };  
  if($role_no==7){
    $sql1=$sqlMsg1." AND poli_num=$enum ";
    $sql2=$sqlMsg2." AND m.poli_num=$enum AND e.enum=$enum AND e.did=d.did ORDER BY m.isdeal";
    echo selMsg($sql1,$sql2);
  };
  if($did==""){
    if($role_no==1 || $role_no==2){
        $sql1=$sqlMsg1;
        $sql2=$sqlMsg2." AND e.enum=m.poli_num AND e.did=d.did ORDER BY m.isdeal";
        echo selMsg($sql1,$sql2);
    }else if($role_no==3 || $role_no==4 || $role_no==5){
        $sql1="SELECT COUNT(*) FROM coll_msg m,pri_depart d,pri_emp e WHERE ".$dateSear.$enumSear.$isdealSear." AND d.role_id=$role_no AND e.did=d.did AND m.poli_num=e.enum AND type=$comp_type ";
        $sql2=$sqlMsg2." AND e.enum=m.poli_num AND e.did=d.did AND d.role_id=$role_no ORDER BY m.isdeal";
        echo selMsg($sql1,$sql2);
    }else if($role_no==6){
        $sql="SELECT did FROM pri_emp WHERE enum=$enum";
        $result = mysqli_query($conn,$sql);
        $row = mysqli_fetch_row($result);
        $r_did=intval($row[0]);
        $sql1="SELECT COUNT(*) FROM coll_msg m,pri_depart d,pri_emp e WHERE ".$dateSear.$enumSear.$isdealSear." AND e.did=$r_did AND m.poli_num=e.enum AND d.did=$r_did AND type=$comp_type ";
        $sql2=$sqlMsg2." AND e.enum=m.poli_num AND e.did=$r_did  AND d.did=$r_did ORDER BY m.isdeal";
        echo selMsg($sql1,$sql2);
    };
  }else{
    $sql1="SELECT COUNT(*) FROM coll_msg m,pri_depart d,pri_emp e WHERE ".$dateSear.$enumSear.$isdealSear." AND e.did=$did AND m.poli_num=e.enum AND d.did=$did ";
    $sql2=$sqlMsg2." AND e.enum=m.poli_num AND e.did=$did AND d.did=$did ORDER BY m.isdeal";
    echo selMsg($sql1,$sql2);
  };
};
?>