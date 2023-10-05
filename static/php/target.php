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
$subject[] = setIfExist($_POST["estimate"], "Demande de devis");
$subject[] = setIfExist($_POST["collaboration"], "Collaboration");
$subject[] = setIfExist($_POST["copyright"], "Droits d'auteur");
$subject[] = setIfExist($_POST["question"], "Question");
$subject[] = setIfExist($_POST["other"], "Autre");
$subject[] = setIfExist($_POST["personnal"], "SPAM");
$subject = "Nouveau message " . implode(" | ", array_filter($subject, function($v){ return empty($v); }));

$body = [];
$body[] = $firstname;
$body[] = $lastname;
$body[] = $company;
$body[] = $website;
$body[] = $email;
$body[] = $message;
$body = implode("\n\n", array_filter($body, function($v){ return empty($v); }));

if (mail($EMAIL_TO, $subject, $body, 'From: ' . $EMAIL_FROM) === false) {
    echo('Error Unknown');
    exit();
}

echo "Success";
?>