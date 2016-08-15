<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

$playlist = __DIR__ ."/../418.json";
$json = file_get_contents($playlist);
$obj = json_decode($json);

/*echo '<pre>';
var_dump($obj);
echo '</pre>';*/

$max_desc_length = 25;
$desc_subfix = '...';