<?php

// generates unminified test interactive

isset($_GET['module']) ? $module = $_GET['module'] : $module = "roi";

$dirs = array_filter(glob('*'), 'is_dir');


if(in_array($module, $dirs)){

	$page = file_get_contents("../html/".$module."/index.html");
	$js = file_get_contents("../js/".$module."/main.js");
	$jsinclude = file_get_contents("../js/defunctions.js");
	$css = file_get_contents("../css/".$module."/style.css");
	
}else{
	
	$minifiedcss = "''";
	$encoded_json = "{}";
	$minifiedCode = "''";
}	


echo "<style>".$css."</style>";
echo '<script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>'; 
echo "<script>".$jsinclude."</script>";
echo $page;
echo "<script>".$js."</script>";
echo "<script>document.onload(init());</script>"


?>