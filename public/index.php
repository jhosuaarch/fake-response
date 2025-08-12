<?php

function generateRandomString($length = 32) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    $randomString = '';
    
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    
    return $randomString;
}

$x1 = $_GET['x1'];
$x2 = $_GET['x2'];

if (isset($x1) && isset($x2)) {
    $string = generateRandomString();
    $hash = md5($string);
    $result = $hash . ";" . $x1 . ";" . "2025-09-08 16:06:02";
    $reponse = base64_encode($result);
    echo $reponse;
} else {
    echo "Please provide both x1 and x2 parameters.";

}
?>
