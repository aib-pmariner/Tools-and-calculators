<?php
// return json from HTML

$page = file_get_contents("../html/roi/index.html");

$search = array('<div', '</div>', '<table', '</table>', '<span', '</span>', '<input', '</input>', '<select', '</select>', '<option', '</option>');
$replace = array('<_d', '</_d>', '<_t', '</_t>', '<_s', '</_s>', '<_ip', '</_ip>', '<_sl', '</_sl>', '<_op', '</_op>');

$encoded_page = str_replace($search, $replace, $page);
$lines = explode("\n", $encoded_page);

$encoded_array = array();

foreach ($lines as $k=>$v){
	$encoded_array[] = trim($v);	
}

$encoded_json = json_encode($encoded_array);

var_dump($encoded_json);


//print_r($encoded_array)






?>