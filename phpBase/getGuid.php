<?php
    header('Content-Type:application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Credentials: true');

    $_POST = json_decode(file_get_contents('php://input'), true);

    require 'connect.php';

    $art = $_POST['prop'];


      $result = $link->query("SELECT * FROM `guides` WHERE `name` = '$art'");


    $dbdata = array();
  
    while ( $row = $result->fetch_assoc())  {
      $dbdata[]=$row;
    }
  
   echo json_encode($dbdata);