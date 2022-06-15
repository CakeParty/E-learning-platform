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
    $errors['user'] = "Podany email został już zarejestrowany";
  } else {
    $date = strval(date("d-m-Y"));
    $sql_query = "INSERT INTO `users`(`password`, `email`, `admin`, `joined`) VALUES ('{$_POST['pass']}','{$_POST['email']}', 'false', '{$date}')";
    if ($conn->query($sql_query) === FALSE) {
      echo("Error description: " . $conn -> error);
      $errors['user'] = "Błąd rejestracji, proszę spróbować później";
    } else {
      $sql_query = "SELECT * from users where email like '{$_POST['email']}';";
      $result = $conn->query($sql_query);
      $row = $result->fetch_assoc();
      $_SESSION["id"] = $row["id"];
      $_SESSION["email"] = $row["email"];
      $_SESSION["joined"] = $row["joined"];
      $_SESSION["admin"] = $row["admin"];
    }
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