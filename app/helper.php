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