<?php
    header('Content-Type:application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Credentials: true');

    $_POST = json_decode(file_get_contents('php://input'), true);

    require 'connect.php';

    $name = $_POST['name'];
    $title = $_POST['title'];
    $email = $_POST['email'];

    if (! empty( $name ) AND ! empty( $title ) AND ! empty( $email )) {
      $result = $link->query("SELECT * FROM `done` WHERE `name` = '$name' AND `title` = '$title' AND `email` = '$email'");
      if (!mysqli_fetch_array($result)) {
         $sql = "INSERT INTO `done` (`name`, `title`, `email`) VALUES ('$name', '$title', '$email')";
      } else {
         $sql = "DELETE FROM `done` WHERE `name` = '$name' AND `title` = '$title' AND `email` = '$email'";
      }
        
    }
  
  if ($link->query($sql) === TRUE) {
     echo "Запись добавлена";
  } else {
     echo "Ошибка: " . $sql . "<br>" . $link->error;
  }
