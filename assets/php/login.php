<?php

session_start();
$errors = [];
$data = [];

if (empty($_POST['email'])) {
    $errors['email'] = 'Email jest wymagany';
}

if (empty($_POST['pass'])) {
    $errors['pass'] = 'Hasło jest wymagane';
}

if(!empty($_POST['email']) && !empty($_POST['pass'])){
  $servername = "localhost";
  $username = "user";
  $password = "dupa123";
  $database = "platforma";

    // Create connection
  $conn = new mysqli($servername, $username, $password, $database);

  $sql_query = "SELECT * from users where email like '{$_POST['email']}';";
  $result = $conn->query($sql_query);

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if($row["password"]==$_POST['pass']){
      $_SESSION["id"] = $row["id"];
      $_SESSION["email"] = $row["email"];
      $_SESSION["joined"] = $row["joined"];
      $_SESSION["admin"] = $row["admin"];
    } else {
      $errors['user'] = "Złe hasło";
    }
  } else {
    $errors['user'] = "Nie istnieje użytkownik o podanym adresie email";
  }
  $conn->close();
}

if (!empty($errors)) {
  $data['success'] = false;
  $data['errors'] = $errors;
} else {
  $data['success'] = true;
  $data['message'] = 'Success!';
}

echo json_encode($data);
?>