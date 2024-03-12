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

    $result = $link->query("SELECT count(*) FROM `done` WHERE `name` = '$name' AND `email` = '$email'");

    $row = $result->fetch_row();
    $count = $row[0];

  echo json_encode($count);