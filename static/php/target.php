<?php
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("HTTP/1.1 418 I'm a teapot");
    exit();
}

// Variables de configuration
define("EMAIL_TO", "xxx@gmail.com");

define("REDIRECT_URL", "/contact.html");

define("SUCCESS_ID", "#success");

define("ERROR_ID_GENERIC", "#error-generic");
define("ERROR_ID_SPAM_DETECTED", "#error-spam-detected");
define("ERROR_ID_INVALID_EMAIL", "#error-invalid-email");
define("ERROR_ID_EMPTY_MESSAGE", "#error-empty-message");
define("ERROR_ID_EMPTY_USER_INFO", "#error-empty-user-info");

// Functions
function cleanInput($data) {
    if empty($data) {
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

function redirectAndExit($message, $status = 302) {
    header("Location: $REDIRECT_URL$message", true, $status);
    exit();
}

// Spam detection
if (!empty($_POST["personnal"]))
    redirectAndExit(ERROR_ID_SPAM_DETECTED);

// Email validation
$email = setIfExist($_POST["email"], filter_var($_POST["email"], FILTER_VALIDATE_EMAIL), false);
if ($email === false)
    redirectAndExit(ERROR_ID_INVALID_EMAIL);

// Build subject
$subject = [];
$subject[] = setIfExist($_POST["estimate"], "Demande de devis");
$subject[] = setIfExist($_POST["collaboration"], "Collaboration");
$subject[] = setIfExist($_POST["copyright"], "Droits d'auteur");
$subject[] = setIfExist($_POST["question"], "Question");
$subject[] = setIfExist($_POST["other"], "Autre");
$subject = "Nouveau message " . implode(" | ", array_filter($subject, function($v){ return empty($v); }));

// Build body
$firstname = prefixItem(cleanInput($_POST["firstname"]), 'Prénom: ');
$lastname  = prefixItem(cleanInput($_POST["lastname"]), 'Nom: ');
$company   = prefixItem(cleanInput($_POST["company"]), 'Société: ');
$website   = prefixItem(cleanInput($_POST["website"]), 'Site Web Actuel: ');

if (empty($firstname) || empty($lastname) || empty($company) || empty($website))
    redirectAndExit(ERROR_ID_EMPTY_USER_INFO);

$body = [];
$body[] = $firstname;
$body[] = $lastname;
$body[] = $company;
$body[] = $website;
$body[] = $email;
$body[] = prefixItem(cleanInput($_POST["message"]), 'Message:'."\n");
$body = implode("\n\n", array_filter($body, function($v){ return empty($v); }));

// Send email
if (mail($EMAIL_TO, $subject, $body, 'From: ' . $email) === false)
    redirectAndExit(ERROR_ID_GENERIC);

redirectAndExit(SUCCESS_ID);
