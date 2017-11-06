<?php

// generates bootstrappable payload

error_reporting(E_ALL);
ini_set('display_errors', 1);

//isset($_GET['module']) ? $module = $_GET['module'] : $module = "roi";

$module = basename(__DIR__);


require "../../php/lib/JShrink/Minifier.php";

$loaderjs =  "";
$loaderTailjs =  "";


function getHeadInserts($html){
	$inserts = array();
	$dom = new DOMDocument;
	$dom->loadHTML($html);
	$nodes = $dom->getElementsByTagName("script");
	foreach ($nodes as $node)
	{
	  $attributes = $node->attributes;
	  foreach ( $attributes as $attr )
	  {
	    if ( $attr->name == "src" ){
	    	$inserts[] = $attr->value;
	  	}
	  }
	} 
	return $inserts;
}



$loaderjs =  file_get_contents("loaderjs.txt");
$loaderTailjs =  file_get_contents("loadertailjs.txt");
$page = file_get_contents("../../html/".$module."/index.html");
$search = array('<div', '</div>', '<table', '</table>', '<span', '</span>', '<input', '</input>', '<select', '</select>', '<option', '</option>', 'class');
$replace = array('<_d', '</_d>', '<_t', '</_t>', '<_sp', '</_sp>', '<_ip', '</_ip>', '<_sl', '</_sl>', '<_op', '</_op>', '_cl');

$encoded_page = str_replace($search, $replace, $page);
$lines = explode("\n", $encoded_page);

$encoded_array = array();

foreach ($lines as $k=>$v){
	$encoded_array[] = trim($v);	
}

$encoded_json = json_encode($encoded_array);

$js = file_get_contents("../../js/".$module."/main.js");
$jsconstants = file_get_contents("../../js/constants.js");
$jsinclude = file_get_contents("../../js/functions.js");
$css = file_get_contents("../../scss/".$module."/main.css");

$minifiedcss = str_replace('; ',';',str_replace(' }','}',str_replace('{ ','{',str_replace(array("\r\n","\r","\n","\t",'  ','    ','    '),"",preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!','',$css)))));

$minifiedCode = \JShrink\Minifier::minify($jsconstants.$jsinclude.$js);


echo $loaderjs;
echo "var css = '".$minifiedcss."';";
echo "var encodedMarkup = ".$encoded_json.";";
//echo "<script>".$jsinclude."</script>\r\n"; 
echo $minifiedCode;
echo ";\r\n";
echo $loaderTailjs;
echo "})";


?>