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

    $result = $link->query("SELECT * FROM `star` WHERE `email` = '$email' AND `name` = '$name' ");


    if (mysqli_num_rows($result) > 0 ) {
      $roger = true;
  } else {
      $roger = false;
  }
  
  echo json_encode($roger);