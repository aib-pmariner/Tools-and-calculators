<?php

require "../php/lib/JShrink/Minifier.php";



$js = file_get_contents("../js/roi/main.js");
$jsinclude = file_get_contents("../js/functions.js");
$css = file_get_contents("../css/roi/style.css");
$page = file_get_contents("../html/roi/index.html");
$header = file_get_contents("../html/template/header.html");

$minifiedcss = str_replace('; ',';',str_replace(' }','}',str_replace('{ ','{',str_replace(array("\r\n","\r","\n","\t",'  ','    ','    '),"",preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!','',$css)))));

$minifiedCode = \JShrink\Minifier::minify($jsinclude.$js);


echo $header."\r\n";
echo "<style>".$minifiedcss."</style>\r\n";
echo $page."\r\n";
//echo "<script>".$jsinclude."</script>\r\n"; 
echo "<script>".$minifiedCode."</script>\r\n"; 



?>