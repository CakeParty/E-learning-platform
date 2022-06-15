<?php

$data = [];
session_start();
$file_name = $_FILES['file']['name'];
$data_json = file_get_contents('../lessons/less.json');
$json_arr = json_decode($data_json, true);
$change = 0;

foreach ($json_arr as $key => $value) {
  if($key == $_POST['less_id']){
    $json_arr[$key]['content'] = $_POST['content'];
    $json_arr[$key]['link'] = $_POST['link'];
    $json_arr[$key]['nazwa'] = $_POST['topic'];
    $json_arr[$key]['file'] = "./assets/lessons/".$file_name;
    $change = 1;
  }
}

if($change == 0){
  $json_arr[$_POST['less_id']] = array('content'=>$_POST['content'], 'link'=>$_POST['link'], 'nazwa'=>$_POST['topic'], 'file'=>"./assets/lessons/".$file_name);
}

file_put_contents('../lessons/less.json', json_encode($json_arr));
$data['success'] = true;
echo json_encode($data);

?>