<?php
header("Content-Type:application/json;charset=utf-8");
@$did=$_REQUEST["did"];
require_once('init.php');
$sql="SELECT e.enum,e.ename,e.avatar,e.eduty,p.dname FROM pri_emp e,pri_depart p WHERE e.did=$did AND e.estate=1 AND p.did=$did";
echo json_encode(sql_execute($sql));