<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">		
		<style>
			body{margin:10px; padding:10px;}
		</style>
		<!-- <link href="https://fonts.googleapis.com/css?family=Ropa+Sans" rel="stylesheet"> -->
		<link href="../../scss/feehelp/main.css" rel="stylesheet"> 		
		<script src="//code.jquery.com/jquery-1.12.4.min.js"></script>
		<script src="dependencies.js"></script>

		<script type="text/javascript">
		
		for(var i = 0; i< styles.length; i++){
		   	var dep = styles[i];
		   	lnk = document.createElement("link");
		   	lnk.rel = "stylesheet";
		   	lnk.href = dep; 
		   	(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(lnk);
		}

		</script>	

	</head>
	<body onload="init()">
		<?php include "../../html/timetostudy/index.html" ?>
	
		<script type="text/javascript">
			var $jQ = $; 
		</script>
		<script src="../../js/constants.js"></script>
		<script src="../../js/functions.js"></script>
		<script src="../../js/timetostudy/main.js"></script>
	</body
</html>	

