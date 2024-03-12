<?php
    header('Content-Type:application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Credentials: true');

    $_POST = json_decode(file_get_contents('php://input'), true);

    $razd = $_POST['razd'];
    $sort = $_POST['sort'];
    $email = $_POST['email'];

    require 'connect.php';

            if ($razd === 'all') {
                if ($sort === 'New ones first') {
                    $result = $link->query("SELECT * FROM `cards`  ORDER BY `id` DESC");
                }  
                if ($sort === 'The old ones first') {
                    $result = $link->query("SELECT * FROM `cards` ORDER BY `id` ASC");
                }  
                if ($sort === 'Cheaper at first') {
                    $result = $link->query("SELECT * FROM `cards` ORDER BY `money`+0 ASC");
                }  
                if ($sort === 'More expensive at first') {
                    $result = $link->query("SELECT * FROM `cards` ORDER BY `money`+0 DESC");
                }
                if ($sort === 'Favorites') {
                    $result = $link->query("SELECT * FROM `cards` LEFT JOIN `star` ON `title` = `name` WHERE `email` = '$email'");
                }
              } else {
                  if ($sort === 'New ones first') {
                    $result = $link->query("SELECT * FROM `cards` WHERE `raz` = '$razd' ORDER BY `id` DESC");
                }  
                if ($sort === 'The old ones first') {
                    $result = $link->query("SELECT * FROM `cards` WHERE `raz` = '$razd' ORDER BY `id` ASC");
                }  
                if ($sort === 'Cheaper at first') {
                    $result = $link->query("SELECT * FROM `cards` WHERE `raz` = '$razd' ORDER BY `money`+0 ASC");
                }  
                if ($sort === 'More expensive at first') {
                    $result = $link->query("SELECT * FROM `cards` WHERE `raz` = '$razd' ORDER BY `money`+0 DESC");
                }
                if ($sort === 'Favorites') {
                    $result = $link->query("SELECT * FROM `cards` LEFT JOIN `star` ON `title` = `name` WHERE `email` = '$email' AND `raz` = '$razd'");
                }
              }




    $dbdata = array();

    while ( $row = $result->fetch_assoc())  {
    $dbdata[]=$row;
    }

    echo json_encode($dbdata);