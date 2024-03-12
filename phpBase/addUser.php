<?php
    header('Content-Type:application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Credentials: true');

    $_POST = json_decode(file_get_contents('php://input'), true);

    require 'connect.php';

    $email = $_POST['email'];
    $count = $_POST['count'];

    if (! empty( $email ) AND ! empty( $count )) {
      $result = $link->query("SELECT * FROM `users` WHERE `email` = '$email' AND `count` = '$count'");
      if (!mysqli_fetch_array($result)) {
         $sql = "INSERT INTO `users` (`email`, `count`) VALUES ('$email', '$count')";
      } else {
        echo "Уже есть такой";
      }
        
    }
  
  if ($link->query($sql) === TRUE) {
     echo "Запись добавлена";
  } else {
     echo "Ошибка: " . $sql . "<br>" . $link->error;
  }
