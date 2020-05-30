<?php
function startsWith($haystack, $needle)
{
$length = strlen($needle);
return (substr($haystack, 0, $length) === $needle);
}

function endsWith($haystack, $needle)
{
$length = strlen($needle);
if ($length == 0) {
return true;
}

return (substr($haystack, -$length) === $needle);
}

function replaceFirst($from, $to, $content)
{
    $from = '/'.preg_quote($from, '/').'/';

    return preg_replace($from, $to, $content, 1);
}

function sortArrayByArray(array $array, array $orderArray) {
    $ordered = [];

    foreach ($orderArray as $entry) {
        if (in_array($entry, $array)) {
            array_push($ordered, $entry);
        }
    }

    foreach ($array as $entry) {
        if (!in_array($entry, $ordered)) {
            array_push($ordered, $entry);
        }
    }

    return array_merge($ordered);
}

function getFullURL(){
    return (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
}