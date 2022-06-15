<?php

session_start();
$errors = [];
$data = [];

if (empty($_POST['curr_pass'])) {
  $errors['curr_pass'] = 'Nie podano obecnego hasła';
}

if (empty($_POST['new_pass'])) {
  $errors['new_pass'] = 'Nie podano nowego hasła';
}
  
if (empty($_POST['new_pass_check'])) {
  $errors['new_pass_check'] = 'Nie potwierdzono nowego hasła';
} 

if(!empty($_POST['new_pass']) && !empty($_POST['new_pass_check']) && !empty($_POST['curr_pass'])){
  if($_POST['new_pass']!=$_POST['new_pass_check']){
    $errors['new_pass_check'] = 'Hasła nie są zgodne';
  }
  
  if ($_POST['new_pass']==$_POST['curr_pass']){
    $errors['form_help2'] = 'Nowe hasło nie może być takie samo jak stare hasło';
  }
}

if (empty($errors)) {
  $servername = "localhost";
  $username = "user";
  $password = "dupa123";
  $database = "platforma";

  $conn = new mysqli($servername, $username, $password, $database);

  $sql_query = "SELECT * from users where email like '{$_POST['email']}';";
  $result = $conn->query($sql_query);


  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if($_POST['curr_pass']!=$row['password']){
      $errors['curr_pass'] = 'Podane hasło jest błędne';
    } else {
      $sql_query = "UPDATE `users` SET `password`='{$_POST['new_pass']}' WHERE users.id = '{$_SESSION['id']}';";
  
      if ($conn->query($sql_query) === FALSE) {
        $errors['form_help2'] = "Błąd połączenia, proszę spróbować później";
      }

      $conn->close();
    }
  } else {
    $errors['form_help2'] = "Błąd połączenia 2, proszę spróbować później";
  }
  
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