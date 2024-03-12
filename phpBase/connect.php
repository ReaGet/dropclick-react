<?php
// $host = 'localhost';  // Хост, у нас все локально
// $user = 'u2494062_default';    // Имя созданного вами пользователя
// $pass = 'NXD4m6gXkxC04TbF'; // Установленный вами пароль пользователю
// $db_name = 'u2494062_default';   // Имя базы данных
$host = 'mysql';  // Хост, у нас все локально
$user = 'root';    // Имя созданного вами пользователя
$pass = 'qwerty'; // Установленный вами пароль пользователю
$db_name = 'dropclick-react';   // Имя базы данных
$link = mysqli_connect($host, $user, $pass, $db_name); // Соединяемся с базой

   
// Ругаемся, если соединение установить не удалось
if (!$link) {
  echo 'Не могу соединиться с БД. Код ошибки: ' . mysqli_connect_errno() . ', ошибка: ' . mysqli_connect_error();
  exit;
}