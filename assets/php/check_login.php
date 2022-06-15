<?php

session_start();

$data = [];
IF(!empty($_SESSION['id'])){
  $data['id'] = $_SESSION['id'];
  $data['email'] = $_SESSION['email'];
  $data['joined'] = $_SESSION['joined'];
  $data['admin'] = $_SESSION['admin'];
  $data['success'] = true;

} else {
  $data['success'] = false;
}

echo json_encode($data);

?>