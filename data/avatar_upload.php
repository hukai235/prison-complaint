<?php
  //1、获取上传文件信息并且判断是否上传文件
  @$enum=intval($_POST["enum"]);
  if(!empty($_FILES["file"])){
  //2、获取文件大小、文件名称
    $picname=$_FILES["file"]["name"];
    $picsize=$_FILES["file"]["size"];
  //3、判断文件大小不能超过2*1024*1024=2MB
    if($picsize>2*1024*1024){
      echo "图片大小不能超过2MB";
      exit;   //停止php程序执行
    };
  //4、判断文件类型 .gif .png .jpg
  //strstr("1.jpg",".");  =>.jpg
    $type=strstr($picname,".");
    if($type != ".gif" && $type != ".png" && $type != ".jpg"){
      echo "图片格式不正确，为：".$type;
      exit;
    }
  //5、创建新文件名  警号命名
    $pics=$enum.$type;
  //6、将上传临时文件移动到uploads
    $src=$_FILES["file"]["tmp_name"];
    $des="../img/avatar/".$pics;
    move_uploaded_file($src,$des);
    echo $des;
  }
?>