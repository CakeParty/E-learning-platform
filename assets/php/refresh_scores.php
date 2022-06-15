<?php

session_start();

$data = [];
IF(!empty($_SESSION['id'])){
  $data['id'] = $_SESSION['id'];
  $data['email'] = $_SESSION['email'];
  $data['joined'] = $_SESSION['joined'];
  $data['admin'] = $_SESSION['admin'];
  $data['success'] = true;

  $scores = [];
  $status = [];

  $servername = "localhost";
  $username = "user";
  $password = "dupa123";
  $database = "platforma";

  $conn = new mysqli($servername, $username, $password, $database);

  $test_count = $_POST['test_count'];
  $test_succ = 0;

  for ($x = 1; $x <= $test_count; $x++) {
    
    $sql_query = "SELECT `id`, `user_id`, `points`, `max_points`, `test_id`, MAX(`percent`) AS 'max' FROM `wyniki` WHERE test_id = {$x} AND user_id = {$data['id']};";
    $result = $conn->query($sql_query);
    
    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      if(!empty($row['id'])){
        array_push($scores, strval($row['max'])." %");
        if($row['max']>50){
          array_push($status, "zaliczony <i class='bi bi-check-circle' style='color: green'></i>");
           $test_succ+=1;
        } else {
          array_push($status, "nie zaliczony <i class='bi bi bi-x-circle' style='color: red'></i>");
        }
      } else {
        array_push($scores, "Brak zarejestrowanych podejść");
        array_push($status, "brak");
      }   
    } else {
      array_push($scores, "Brak zarejestrowanych podejść");
      array_push($status, "brak");
    }
  }

  $conn->close();
  $data['scores'] = $scores;
  $data['status'] = $status;
  $data['test_succ'] = $test_succ;
  $data['test_count'] = $test_count;
  
} else {
  $data['success'] = false;
}

echo json_encode($data);

?>