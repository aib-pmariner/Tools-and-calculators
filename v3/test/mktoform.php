<?php
isset($_GET['formId']) ? $formId = $_GET['formId'] : $formId = -1;
?>

<html>
	<head>
	</head>
	<body>
		
		<script src="//app-sn03.marketo.com/js/forms2/js/forms2.min.js"></script>
		<form style="background-color:#ccaacc" id="mktoForm_<?php echo $formId ?>"  style="display:block"></form>		
		<script>MktoForms2.loadForm("//app-sn03.marketo.com", "895-KSX-008", <?php echo $formId ?>)</script>
		
		<?php 
		echo "<script> var formId =".$formId."; </script>\r\n";
		?>

		<script>
			
		window.addEventListener("message", function(event) { 
			
			var data = event.data;	
			var command = data.command;			
			var formFields = data.formFields;
			var frm = event.target.MktoForms2.getForm(formId);
			var response = {};  			
			
			if(typeof formFields != "undefined"){
				frm.addHiddenFields(formFields);
				try{
					window.setTimeout(function(){frm.submit()}, 500);  
				}catch(e){
					response.msg = "error";
					parent.window.postMessage(response, '*'); 
				}
			}else{
				response.msg = "No form field values were supplied";
				parent.window.postMessage(response, '*'); 
			}	
			
			frm.onSuccess(function(values, followUpUrl) {
               response.msg = "updated";
               parent.window.postMessage(response, '*'); 
               return false;
            });		
		    
		}); 

		</script>
	</body>
</html>	