<?php
  header('Content-Type:application/json');
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
  header('Access-Control-Allow-Credentials: true');

  $_POST = json_decode(file_get_contents('php://input'), true);

  $email = $_POST['email'];

  require 'connect.php';

  $result = $link->query("SELECT * FROM `cards`");

  $dbdata = array();

  while ($row = $result->fetch_assoc())  {
    $progress = getProgressIfEmailExists($email, $row["title"]);
    $isFavorite = getFavoriteIfEmailExists($email, $row["title"]);
    $dbdata[]= [
      "id" => $row["id"],
      "title" => $row["title"],
      "time" => $row["time"],
      "price" => $row["invest"],
      "thumbnailUrl" => $row["img"],
      "twitter_score" => $row["tw"],
      "category" => $row["raz"],
      "progress" => $progress,
      "isFavorite" => $isFavorite,
    ];
  }

//   {
//     "id": "8",
//     "raz": "Testnet",
//     "title": "Bracket Labs",
//     "description": "Bracket Labs \u2014 \u043f\u0440\u043e\u0435\u043a\u0442, \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0441\u043e\u0437\u0434\u0430\u0435\u0442 \u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0435 \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u044b \u0441 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u0435\u043c \u0437\u0430\u0435\u043c\u043d\u044b\u0445 \u0441\u0440\u0435\u0434\u0441\u0442\u0432 \u0432 \u0441\u0435\u0442\u0438.",
//     "time": "8 \u043c\u0438\u043d\u0443\u0442",
//     "money": "2 $",
//     "img": "https:\/\/sun9-66.userapi.com\/impg\/p1w04VfMxKOJ0fBgf_4zZovah1ReguoFo6zxGA\/NH26VTMU4No.jpg?size=400x400&quality=95&sign=259d1729549ea5ca548c8a4101f8f995&type=album",
//     "invest": "2",
//     "tw": "9",
//     "fire": "",
//     "whath": "",
//     "stong": ""
// }

  echo json_encode($dbdata);

  function getProgressIfEmailExists($email, $title) {
    global $link;

    if (!$email || !$title) {
      return 0;
    }
    $result = $link->query("SELECT count(*) FROM `done` WHERE `name` = '$title' AND `email` = '$email'");

    $row = $result->fetch_row();
    return $row[0];
  }

  function getFavoriteIfEmailExists($email, $title) {
    global $link;

    if (!$email || !$title) {
      return 0;
    }

    $result = $link->query("SELECT * FROM `star` WHERE `email` = '$email' AND `name` = '$title' ");

    return mysqli_num_rows($result) > 0;
  }
?>