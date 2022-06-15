<?php

session_start();
$errors = [];
$data = [];

$test_id = $_POST['test_id'];
unset($_POST['test_id']);
$max_points = $_POST['grid_hidden'];
unset($_POST['grid_hidden']);

$post_keys = array_keys($_POST);

$total_points = 0;

for ($id = 0; $id <= (count($_POST)-1); $id++) {
  
  $value = $_POST[$post_keys[$id]];

  if(is_array($value)){

    $checkbox = 0;
    $req_points = intval(substr($value[0],0 ,1));

    foreach ($value as $inner_value) {
      $checkbox += intval(substr($inner_value,-1));
    }

    if ($checkbox == $req_points){
      $total_points+=1;
      $data[$post_keys[$id]]=1;
    } else {
      $data[$post_keys[$id]]=0;
    }

  } else {
    $data[$post_keys[$id]]=intval($value);
    $total_points+=$value;
  }
}

$servername = "localhost";
$username = "user";
$password = "dupa123";
$database = "platforma";

$conn = new mysqli($servername, $username, $password, $database);
$percent = ($total_points/$max_points)*100;

$sql_query = "INSERT INTO `wyniki`(`user_id`, `points`, `max_points`, `percent`, `test_id`) VALUES ('{$_SESSION['id']}','{$total_points}','{$max_points}', '{$percent}','{$test_id}')";
$result = $conn->query($sql_query);

if (!$result) {
  $data['success'] = false;
} else {
  $data['success'] = true;
}
$conn->close();

echo json_encode($data);
?>