<?php

session_start();

$data = [];
IF(empty($_SESSION['id'])){
  $data['success'] = true;
} else {
  $data['success'] = false;
}

echo json_encode($data);

?>