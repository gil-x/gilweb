<?php

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("HTTP/1.1 418 I'm a teapot");
    exit();
}

$EMAIL_TO = '???@gmail.com';
$EMAIL_FROM = '???@gil-web.com';

$errorId = 0;
$errorEmail = 0;
$errorSpam = 0;
$errorMessage = 0;

function cleanInput($data) {
    if (empty($data)) {
        return '';
    }
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    $data = filter_var($data, FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW | FILTER_FLAG_STRIP_HIGH);
    return $data;
}

function setIfExist($value, $setTo, $default = null) {
    return !empty($value) ? $setTo : $default;
}

function prefixItem($item, $prefix) {
    if (empty($item)) {
        return '';
    }
    return $prefix . $item;
}

$firstname = prefixItem(cleanInput($_POST["firstname"]), 'Prénom: ');
$lastname  = prefixItem(cleanInput($_POST["lastname"]), 'Nom: ');
$company   = prefixItem(cleanInput($_POST["company"]), 'Société: ');
$website   = prefixItem(cleanInput($_POST["website"]), 'Site Web Actuel: ');

if (empty($firstname) && empty($lastname) && empty($company) && empty($website)) {
    $errorId = 1;
}

$email = setIfExist($_POST["email"], filter_var($_POST["email"], FILTER_VALIDATE_EMAIL), false);
if ($email === false) {
    $errorEmail = 2;
}

if (!empty($_POST["personnal"])) {
    $errorSpam = 0;
}

$message = prefixItem(cleanInput($_POST["message"]), 'Message:'."\n");

if (strlen($message) === 0) { // Actually, lets see spams...
    $errorMessage = 4;
}

$errorForm = $errorId + $errorEmail + $errorSpam + $errorMessage;

if ($errorForm > 0) {
    echo('Error ' . $errorForm);
    exit();
}

$subject = [];
if ($_POST["estimate"]) {
    array_push($subject, "Demande de devis");
}
if ($_POST["collaboration"]) {
    array_push($subject, "Collaboration");
}
if ($_POST["copyright"]) {
    array_push($subject, "Droits d'auteur");
}
if ($_POST["question"]) {
    array_push($subject, "Question");
}
if ($_POST["other"]) {
    array_push($subject, "Autre");
}
if ($_POST["personnal"]) {
    $subject = [];
    array_push($subject, "SPAM");
}

$subject = "Nouveau message " . implode(" | ", $subject);

$body = [];
array_push($body, $firstname);
array_push($body, $lastname);
array_push($body, $company);
array_push($body, $website);
array_push($body, $email);
array_push($body, $message);

$body = implode("\n", $body);

if (mail($EMAIL_TO, $subject, $body, 'From: ' . $EMAIL_FROM) === false) {
    echo('Error Unknown');
    exit();
}

echo "Success";
?>