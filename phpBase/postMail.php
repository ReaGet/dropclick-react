<?php

header('Content-Type:application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

$_POST = json_decode(file_get_contents('php://input'), true);

$code = $_POST['code'];
$email = $_POST['email'];

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
 
require_once 'PHPMailer/Exception.php';
require_once 'PHPMailer/PHPMailer.php';
require_once 'PHPMailer/SMTP.php';
 
// Для более ранних версий PHPMailer
//require_once '/PHPMailer/PHPMailerAutoload.php';
 
$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';
 
// Настройки SMTP
$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPDebug = 0;
 
$mail->Host = 'ssl://smtp.gmail.com';
$mail->Port = 465;
$mail->Username = 'dred.kill.kikan93@gmail.com';
$mail->Password = 'uucj yvqk nhbm zbjc';
 
// От кого
$mail->setFrom('dred.kill.kikan93@gmail.com', 'DropClick');		
 
// Кому
$mail->addAddress($email, 'DropClick пользователь!');
 
// Тема письма
$mail->Subject = 'Код подтверждения регистрации';
 
// Тело письма
$body = '<p>Ваш код:</p>' .$code;
$mail->msgHTML($body);
 
$mail->send();