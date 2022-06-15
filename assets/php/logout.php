<?php

session_start();

$data = [];
session_destroy();
echo json_encode($data);

?>