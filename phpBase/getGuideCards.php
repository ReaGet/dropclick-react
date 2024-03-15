<?php
  header('Content-Type:application/json');
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
  header('Access-Control-Allow-Credentials: true');

  $_POST = json_decode(file_get_contents('php://input'), true);

  $email = "";
  $guideId = "";

  if (isset($_POST['email'])) {
    $email = $_POST['email'];
  }

  if (isset($_POST['guideId'])) {
    $guideId = $_POST['guideId'];
  }

  require 'connect.php';

  if ($guideId) {
    $result = $link->query("SELECT * FROM `cards` WHERE `id` = '$guideId'");
  } else {
    $result = $link->query("SELECT * FROM `cards`");
  }

  $dbdata = array();

  while ($row = $result->fetch_assoc())  {
    $progress = getProgressIfEmailExists($email, $row["title"]);
    $isFavorite = getFavoriteIfEmailExists($email, $row["title"]);
    $info = getAdditionalInfo($row["title"]);

    $data = [
      "id" => $row["id"],
      "title" => $row["title"],
      "time" => $row["time"],
      "price" => $row["invest"],
      "thumbnailUrl" => $row["img"],
      "twitter_score" => $row["tw"],
      "category" => $row["raz"],
      "progress" => $progress,
      "isFavorite" => $isFavorite,
      "date" => $info["date"]
    ];

    if ($guideId) {
      $data["content"] = $info["content"];
      $data["links"] = $info["links"];
      $dbdata = $data;
    } else {
      $dbdata[] = $data;
    }
  }

  echo json_encode($dbdata);

  function getProgressIfEmailExists($email, $title) {
    global $link;

    if (!$email || !$title) {
      return 0;
    }
    
    $result = $link->query("SELECT count(*) FROM `done` WHERE `name` = '$title' AND `email` = '$email'");
    $tasksCount = getGuideTasksCount($title);

    $doneTasks = intval($result->fetch_row()[0]);
    return $doneTasks / $tasksCount * 100;
  }
  
  function getGuideTasksCount($title) {
    global $link;
    $result = $link->query("SELECT count(*) FROM `guidrus` WHERE `name` = '$title'"); 
    return intval($result->fetch_row()[0]);
  }

  function getFavoriteIfEmailExists($email, $title) {
    global $link;

    if (!$email || !$title) {
      return 0;
    }

    $result = $link->query("SELECT * FROM `star` WHERE `email` = '$email' AND `name` = '$title' ");

    return mysqli_num_rows($result) > 0;
  }

  function getAdditionalInfo($title) {
    global $link;

    if (!$title) {
      return 0;
    }

    $result = $link->query("SELECT * FROM `guidesrus` WHERE `name` = '$title'");
    $info = [
        "content" => "",
        "date" => "",
        "links" => []
    ];

    while ( $row = $result->fetch_assoc())  {
        $info["content"] = $row["description"];
        $info["date"] = $row["date"];
        $info["links"] = [
            [ "url" => $row["website"], "icon" => "website" ],
            [ "url" => $row["twitter"], "icon" => "twitter" ],
            [ "url" => $row["telegram"], "icon" => "telegram" ],
            [ "url" => $row["discord"], "icon" => "discord" ],
        ];
    }

    return $info;
  }
?>