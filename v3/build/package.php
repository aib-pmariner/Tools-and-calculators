<?php

// generates bootstrappable payload

isset($_GET['module']) ? $module = $_GET['module'] : $module = "roi";

$dirs = array_filter(glob('*'), 'is_dir');

require "../php/lib/JShrink/Minifier.php";

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



if(in_array($module, $dirs)){

	$loaderjs =  file_get_contents("loaderjs.txt");
	$loaderTailjs =  file_get_contents("loadertailjs.txt");
	$page = file_get_contents("../html/".$module."/index.html");
	$search = array('<div', '</div>', '<table', '</table>', '<span', '</span>', '<input', '</input>', '<select', '</select>', '<option', '</option>');
	$replace = array('<_d', '</_d>', '<_t', '</_t>', '<_sp', '</_sp>', '<_ip', '</_ip>', '<_sl', '</_sl>', '<_op', '</_op>');

	$encoded_page = str_replace($search, $replace, $page);
	$lines = explode("\n", $encoded_page);

	$encoded_array = array();

	foreach ($lines as $k=>$v){
		$encoded_array[] = trim($v);	
	}

	$encoded_json = json_encode($encoded_array);

	$js = file_get_contents("../js/".$module."/main.js");
	$jsinclude = file_get_contents("../js/functions.js");
	$css = file_get_contents("../css/".$module."/style.css");


	$minifiedcss = str_replace('; ',';',str_replace(' }','}',str_replace('{ ','{',str_replace(array("\r\n","\r","\n","\t",'  ','    ','    '),"",preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!','',$css)))));

	$minifiedCode = \JShrink\Minifier::minify($jsinclude.$js);
}else{
	
	$minifiedcss = "''";
	$encoded_json = "{}";
	$minifiedCode = "''";
}	


echo $loaderjs;
echo "var css = '".$minifiedcss."';";
echo "var encodedMarkup = ".$encoded_json.";";
//echo "<script>".$jsinclude."</script>\r\n"; 
echo $minifiedCode;
echo ";\r\n";
echo $loaderTailjs;
echo "})";



?>