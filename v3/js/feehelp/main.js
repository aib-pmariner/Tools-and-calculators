var init = function () {
   var bookCost = 0,
        examCost = 0,
        totalFEERepayment = 0,
        chrt,
        chart,
        subjectCost = 0,
        totalCost = subjectCost + bookCost + examCost,
        upFrontCost = totalCost,
        dataPointFEE = [],
        dataPointSalary = [],
        dataPointMBABonus = [],
        dataPointPAYG = [],
        feeDeductions = [0, 2950],
        yearsToRepay = 0,
        screenCount = $jQ('.screen-container .screen').length,
        endpointDomain = "https://504-vsv-078", 

    screenGrab = function (element, sendinfo) {

        var data = sendinfo;
        $jQ("#button-sendemail").attr("value", "SENDING...");

        window.html2canvas(element, {
            allowTaint: false,
            onrendered: function (canvas) {              

                var jpegUrl = canvas.toDataURL("image/png"),
                jpgData = encodeURIComponent(jpegUrl); 
                data.image = jpgData,
                mailerURL = "//ww2.aib.edu.au/sendtome/rest/sendmecalcJSON.php";

            
                $jQ.ajax({

                    url:  mailerURL,
                    type: "POST",
                    data: data,
                    dataType: "json",
                    cache: false,
                    success: function (d) {                        
                        $jQ(".email-box").removeClass("expanded"); 
                        $jQ(".email-status").addClass("expanded");                                            
                       
                        var frame = document.getElementById('sonar-form');
                        var obj = {};
                        var emailObj = {};                              
                        
                        emailObj.Email = data.to;
                        emailObj.feeHelpSalary = data.salary;                      
                        emailObj.feeHelpImage = d.imageurl;                      
                        
                        obj.formFields = emailObj;
                        obj.formId = 1104;
                        obj.command = "load";

                        // this actually submits the form remotely if all hidden fields are populated
                        frame.contentWindow.postMessage(obj, '*'); 
                       
                        try{
                            dataLayer.push({
                                  'event': 'feehelp-email'
                            }); 
                        }catch(e){
                            console.log("GTA Datalayer not loaded");
                        }                           
                    }
                });
            }
        }); 
    },   
  
   
    curSalary = function (ignoreCPI, year) {
        var cs = 0,
            mult = 1,
            sal = 0;

        if ($jQ("#salary")[0].value === "") {
           
            cs = Math.floor($jQ("#salary").attr("placeholder").replace( /^\D+/g, '').replace(",","") * mult);
        } else {
            sal = Math.floor($jQ("#salary")[0].value.replace( /^\D+/g, '').replace(",",""));
            cs = Math.floor(sal * mult);
        }      

        return cs;
    },

    payWeeks = function(){
        var selected = 1,
        weeks = [52.14, 26.07, 12];

        $jQ.each($jQ("#pay-period-select .pay-period-button"), function(i){
            if($jQ(this).hasClass("selected")) selected = i;
        })      
        return weeks[selected];
       
    },

    updateTable = function () {
        var salary = curSalary(false, 0),
        FEE = calcFEE(salary),
        repayment = FEE.repayment,
        rate = FEE.rate,
        takeHomePay,
        FEEHelpPay,
        payChange,
        weeks,
        yearsToRepay = Math.ceil(totalCost / repayment);
        
      
        if (yearsToRepay > 10000000) {
            yearsToRepay = 1;
        }

        
        $jQ(".calc-rates .calc-right h3").text(rate + "%");
        if (rate === 0) {
            $jQ(".calc-rates .calc-left h3").text("Unknown");
        } else {
            $jQ(".calc-rates .calc-left h3").text(yearsToRepay + "yrs");
        }

        takeHomePay = Math.floor((salary - calcTax(salary)) / payWeeks());
        FEEHelpPay = Math.floor((salary - calcTax(salary) - repayment) / payWeeks());
        payChange = FEEHelpPay - takeHomePay; 
       

        $jQ(".calc-feehelp .calc-left h3").text("$" +  numberWithCommas(takeHomePay) );
        $jQ(".calc-feehelp .calc-right h3").text( "$" + numberWithCommas(FEEHelpPay) + "(" + payChange + ")" );
        $jQ(".calc-totals .calc-left h3").text("$" + numberWithCommas(repayment));
        $jQ(".calc-totals .calc-right h3").text("$" + numberWithCommas(totalCost));      
        
    },     
        
    downloadClick = function () {
        var data = {};
       
        data.firstName = $jQ("#firstName").val();
        data.lastName = $jQ("#lastName").val();
        data.to = $jQ("#Email").val();

        if (validateForm($jQ(".lead-form"), 0) === false) {
           
            screenGrab($jQ("#screen-grab")[0], data);
        }
    }; 

    window.addEventListener("message", function(event) {                
        var data = event.data;
        console.log(data);
    });   
   
    
   
    $jQ('.screen-container').css('width', (screenCount * 100) + '%');
    $jQ('.screen-container .screen').css('width', (100 / screenCount) + '%');
    $jQ('.form-lightbox').hide();
   

    $jQ('#pay-period-select .pay-period-button').click(function(){
        $.each($jQ('#pay-period-select .pay-period-button'), function(){
            $jQ(this).removeClass("selected");
        })
        $jQ(this).addClass("selected");
        updateTable();       
    })
               

    $jQ('#disclaimer-button').click(function () {
        $jQ(this).find(".arr").toggleClass("open");
        $jQ(".terms-overlay").toggleClass("closed");
    });    
  
    
    $jQ("#sendtome").click(function(){
        $jQ(".email-box").toggleClass("expanded");
        $jQ("#button-sendemail").attr("value", "SEND");
        $jQ(".email-status").removeClass("expanded"); 
    });
    
    $jQ("#button-sendemail").click(function(){       
      
        var email = $jQ("#sendemail").val(),
        data = {};
        
        if (!validEmail(email)) {
            //errMsg = label + " requires a valid email address";
            $jQ("#sendemail").addClass("farketo-incomplete");
         }else{
            // all good... send it! 
            $jQ("#sendemail").removeClass("farketo-incomplete");
           
            data.firstName = "Guest";
            data.lastName = email.hashCode();
            data.to = email;
            data.salary =  curSalary();
           
            data.title = 'Here is your FEE Help Calculation';
            data.subject = 'Here is your FEE Help Calculation, if you have any questions about studying the MBA through AIB you can call us on <b>1300 304 820</b>';
            screenGrab($jQ("#screen-grab")[0], data);
         }
    });    
  

    $jQ("#salary").on("keyup", function () {       
        debounce(updateTable(calcFEE(curSalary(false))), 350);
    }); 

}