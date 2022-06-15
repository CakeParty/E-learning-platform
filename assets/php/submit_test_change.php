<?php

$data = [];
session_start();

$data_json = file_get_contents('../lessons/tests.json');
$json_arr = json_decode($data_json, true);
unset($json_arr[$_POST['test_id']]);

$q_num = 0;
$json_arr2 = [];

foreach($_POST as $key => $value){
  if (str_contains($key, 'question_')) { 
    $q_num++;
  }
}

if($q_num>0){

  $data_json2 = file_get_contents('../lessons/less.json');
  $json_arr3 = json_decode($data_json2, true);

  for ($x = 0; $x <= $q_num; $x++) {
    
    if($x==0){
      $json_arr2[$_POST['test_id']][$x]['title'] = "Test rozdziału: ".$json_arr3['lesson_'.explode("_", $_POST['test_id'])[1]]['nazwa'];
    } else {
      
      $ans_num = 0;
      foreach($_POST as $key => $value){
        if (str_contains($key, 'q_'.$x.'_ans') && strlen("$key") < 10) { 
          $ans_num++;
        }
      }

      $json_arr2[$_POST['test_id']][$x]['question'] = $_POST['question_'.$x];
      $json_arr2[$_POST['test_id']][$x]['type'] = $_POST['q_'.$x.'_type'];
      if($_POST['q_'.$x.'_type']=="checkbox"){    
        if(is_array($_POST['t_'.explode("_",$_POST['test_id'])[1].'_q_'.$x.'_ans'])){
          $json_arr2[$_POST['test_id']][$x]['ans_num'] = count($_POST['t_'.explode("_",$_POST['test_id'])[1].'_q_'.$x.'_ans']);
        } else {
          $json_arr2[$_POST['test_id']][$x]['ans_num'] = "1";
        } 
      }

      $answers = []; 
      for ($y = 0; $y < $ans_num; $y++) {
        
        $answers[$y]['text'] = $_POST['q_'.$x.'_ans_'.$y];

        if($_POST['q_'.$x.'_type']=="checkbox"){
          
          if(is_array($_POST['t_'.explode("_",$_POST['test_id'])[1].'_q_'.$x.'_ans'])){
            
            if(in_array('q_'.$x.'_ans_'.$y, array_values($_POST['t_'.explode("_",$_POST['test_id'])[1].'_q_'.$x.'_ans']))){
              $answers[$y]['correct'] = "1";
            } else {
              $answers[$y]['correct'] = "0";
            }
          } else {
            if($_POST['t_'.explode("_",$_POST['test_id'])[1].'_q_'.$x.'_ans'] == 'q_'.$x.'_ans_'.$y){
              $answers[$y]['correct'] = "1";
            } else {
              $answers[$y]['correct'] = "0";
            }
          }
        } else {
          if($_POST['t_'.explode("_",$_POST['test_id'])[1].'_q_'.$x.'_ans'] == 'q_'.$x.'_ans_'.$y){
            $answers[$y]['correct'] = "1";
          } else {
            $answers[$y]['correct'] = "0";
          }
        }
       
      }
      $json_arr2[$_POST['test_id']][$x]['answers'] = $answers;
    }
  }

  file_put_contents('../lessons/tests.json', json_encode(array_merge($json_arr,$json_arr2)));
  $data['success'] = true;
} else {
  $data['success'] = false;
}
echo json_encode($data);

?>