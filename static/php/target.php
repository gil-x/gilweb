<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstname = htmlspecialchars($_POST["firstname"], ENT_QUOTES, 'UTF-8');
    $lastname = htmlspecialchars($_POST["lastname"], ENT_QUOTES, 'UTF-8');
    $company = htmlspecialchars($_POST["company"], ENT_QUOTES, 'UTF-8');
    $website = htmlspecialchars($_POST["website"], ENT_QUOTES, 'UTF-8');
    $email = isset($_POST["email"]) ? filter_var($_POST["email"], FILTER_VALIDATE_EMAIL) : "null";
    $message = htmlspecialchars($_POST["message"], ENT_QUOTES, 'UTF-8');

    $estimate = isset($_POST["estimate"]) ? "Demande de devis" : null;
    $collaboration = isset($_POST["collaboration"]) ? "Collaboration" : null;
    $copyright = isset($_POST["copyright"]) ? "Droits d'auteur" : null;
    $question = isset($_POST["question"]) ? "Question" : null;
    $other = isset($_POST["other"]) ? "Autre" : null;
    $spamDetected = isset($_POST["personnal"]) ? true : false;

    $errorId = 0;
    $errorEmail = 0;
    $errorSpam = 0;

    $object = [];

    if (empty($firstname) && empty($lastname) && empty($company) && empty($website)) {
        $errorId = 1;
    }

    if (!$email) {
        $errorEmail = 2;
    }

    if ($spamDetected) {
        $errorSpam = 4;
    }

    $errorForm = $errorId + $errorEmail + $errorSpam;

    if ($spamDetected) {

        header("Location: joker.html");
        exit();

    } elseif ($errorForm > 0) {

            echo  "Error" . $errorForm;
            
        } else {

            if ($estimate) {
                array_push($object, $estimate);
            }
            if ($collaboration) {
                array_push($object, $collaboration);
            }
            if ($copyright) {
                array_push($object, $copyright);
            }
            if ($question) {
                array_push($object, $question);
            }
            if ($other) {
                array_push($object, $other);
            }

            $to = "xxx@gmail.com";
            $subject = "Nouveau message " . implode(" | ", $object);
            $messageBody = "Prénom: $firstname\nNom: $lastname\nSociété: $company\nSite Web Actuel: $website\nEmail: $email\nMessage:\n$message";
            $headers = "From: xxx@gil-web.com";
            mail($to, $subject, $messageBody, $headers);
            echo "Success";
    }
    
} else {
    header("Location: joker.html");
    exit();
}

?>