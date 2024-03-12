<?php
    header('Content-Type:application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Credentials: true');

    $_POST = json_decode(file_get_contents('php://input'), true);

    require 'connect.php';

    $email = $_POST['email'];
    $name = $_POST['name'];

    if (! empty( $email ) AND ! empty( $name )) {
      $result = $link->query("SELECT * FROM `star` WHERE `email` = '$email' AND `name` = '$name'");
      if (!mysqli_fetch_array($result)) {
         $sql = "INSERT INTO `star` (`email`, `name`) VALUES ('$email', '$name')";
      } else {
         $sql = "DELETE FROM `star` WHERE `email` = '$email' AND `name` = '$name'";
      }
        
    }
  
  if ($link->query($sql) === TRUE) {
     echo "Запись добавлена";
  } else {
     echo "Ошибка: " . $sql . "<br>" . $link->error;
  }
