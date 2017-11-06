
var init = function(){
     
    var screen = 0,
        profileObj = {},
        dataPoints = [],
        dataPointsBase = [],
        cpi = 1.5,
        chart = "",
        chrt,      
        bookCost = 0,
        examCost = 0,
        totalFEERepayment = 0,
        totalCost = subjectCost + bookCost + examCost,
        upFrontCost = totalCost,
        yearsToRepay = 0,
        screenCount = $jQ('.screen-container .screen').length,


        tooltipContents = function (d) {
            var mkup = "";
            mkup += "<h4>Year " + d[0].x + "</h4>";
            mkup += "<p>CPI indexed salary $" + d[0].value + "</p>";
            mkup += "<p>MBA boosted salary $" + d[1].value + "</p>";
            return mkup;
        },      

        curSalary = function () {
            var cs = 0;           
            if($jQ("#salary")[0] != undefined){
                salaryNumber = $jQ("#salary")[0].value.replace("$", '').replace(",", '');

                if (salaryNumber === "") {
                    salaryNumber = $jQ("#salary").attr("placeholder").replace("$", '').replace(",", '');
                }
                cs = parseInt(salaryNumber, 10);
            }    
            return cs;
        },

        updateCurrentSalary = function () {
            $jQ("#currentSalary1").text("$" + numberWithCommas(curSalary()));
            $jQ("#currentSalary2").text("$" + numberWithCommas(curSalary()));
        },        

        calculateDataPoints = function () {

            var yearsWorking = parseInt($jQ("#YearsWorking").val(), 10),
            startSalary = 0,
            ROI = 0,
            paymentLeft = totalCost,
            cp,
            yearSalary,
            salaryPostMBA,
            FEErate,
            FEEdeducted,
            totalFEECost = 0,
           
            yearsToRepay = 0,
            startSalary = curSalary(),
            yearSalary = startSalary,
            salaryPostMBA = startSalary;

            dataPointsBase = []; 
            dataPoints = [];

            dataPointsBase[0] = "Salary + CPI";
            dataPointsBase[1] = startSalary;
            dataPoints[0] = "Pre-tax salary with MBA";
            dataPoints[1] = startSalary;


            // Base + CPI salary series
            for (cp = 1; cp < yearsWorking + 1; cp = cp + 1) {
                yearSalary += (yearSalary * cpi / 100);
                dataPointsBase[cp + 1] = Math.floor(yearSalary);
            }

            for (cp = 1; cp < yearsWorking + 2; cp = cp + 1) {

                if (cp === 1) {
                    salaryPostMBA = startSalary;
                    FEErate = 0;
                }

                if (cp > 9) {
                    salaryPostMBA += (salaryPostMBA * (mbaBonus[10]));
                } else {
                    salaryPostMBA += (salaryPostMBA * (mbaBonus[cp - 1]));
                }

                FEErate = 0;
                FEEdeducted = 0;

                if (cp > 1) {
                    totalFEERepayment += FEEdeducted;
                    dataPoints[cp] = Math.floor(salaryPostMBA - FEEdeducted);

                } else {
                    dataPoints[cp] = Math.floor(salaryPostMBA);
                    if ($jQ("#studyfee").val() === "upfront") {
                        dataPoints[cp] = Math.floor(salaryPostMBA - totalCost);
                        totalFEERepayment = totalCost;
                    }
                }

                ROI += (dataPoints[cp] - dataPointsBase[cp]);
            }


            $jQ("#totalFeeRepayment").text("$" + numberWithCommas(Math.floor(totalFEERepayment)));
            $jQ("#noMBASalary").text("$" + numberWithCommas(parseInt(dataPointsBase[dataPointsBase.length - 1], 10)));
            $jQ("#MBASalary").text("$" + numberWithCommas(parseInt(dataPoints[dataPoints.length - 1], 10)));
            $jQ('.roi-figure').animateNumbers(ROI, 500);

        },


        loadNewData = function () {

            calculateDataPoints();
           
            chart.flush();
            
            chart.load({
                columns: [
                    dataPoints,
                    dataPointsBase
                ]
            });


            totalFEERepayment = 0;
            var noMBAAmount = parseInt(dataPointsBase[dataPointsBase.length - 1], 10) - parseInt(dataPointsBase[1], 10),
                MBAAmount = parseInt(dataPoints[dataPoints.length - 1], 10) - parseInt(dataPoints[1], 10);
            if ($jQ("#studyfee").val() === "upfront") {
                MBAAmount -= totalCost;
            }

            $jQ("#noMBAAmount").text("$" + numberWithCommas(noMBAAmount));
            $jQ("#MBAAmount").text("$" + numberWithCommas(MBAAmount));
            updateCurrentSalary();
        },

        ROIChart = function () {
            calculateDataPoints();
            if (chart === "") {
                chart = window.c3.generate({

                    bindto: "#roi-chart",
                    data: {
                        columns: [
                        dataPointsBase,
                        dataPoints
                    ],
                        type: 'spline'
                    },
                    color: {
                    },
                    grid: {
                        y: {
                        }
                    },
                    axis: {
                        x: {
                            label: "year"
                        },
                        y: {
                            label: "AUD$"
                        }
                    },
                    tooltip: {
                        contents: tooltipContents
                    }
                });
            }
            return chart;
        },

       screenGrab = function (element, sendinfo) {

         /* remove fills to tidy up screen capture */
        $jQ("svg g.c3-chart-line path").attr("fill", "none");
        $jQ("svg g.c3-axis path").attr("fill", "none");
        $jQ("svg g.c3-axis path").attr("stroke", "#666");

        $jQ("#button-sendemail").attr("value", "SENDING...");

        var data = sendinfo;
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
                        emailObj.roiSalary = data.salary; 
                        emailObj.roiWorkYears = data.workyears;
                        emailObj.roiImage = d.imageurl;
                        emailObj.roiAge = data.age;
                        
                        obj.formFields = emailObj;
                        obj.formId = 1151;
                        obj.command = "load";

                        // this actually submits the form remotely if all hidden fields are populated
                        frame.contentWindow.postMessage(obj, '*'); 
                       
                        try{
                            dataLayer.push({
                                'event': 'roicalc-email'
                            }); 
                        }catch(e){
                            console.log("GTA Datalayer not loaded");
                        }                           
                    }
                });
            }
        }); 
    };

    window.addEventListener("message", function(event) {                
        var data = event.data;
        console.log(data);
    });

    $jQ("select").change(function (s) {
        var val = $jQ(this).val(),
            source = s.target.id;

        updateCurrentSalary();

        if (source === "YearsWorking") {
            //loadNewData();
            $jQ(".screen-pad.final .result-0 > h4").text("over " + val + " years");
            $jQ("#totalIncreaseText").text("Total increase in earnings after " + $jQ("#YearsWorking").val() + " years");
            $jQ("#totalSalaryText").text("Salary after " + $jQ("#YearsWorking").val() + " years");
            $jQ(".roi-summary h4").text("over " + $jQ("#YearsWorking").val() + " years");

            debounce(loadNewData(), 250);
        }

    });    
   

    $jQ('#disclaimer-button').click(function () {
        $jQ(this).find(".arr").toggleClass("open");
        $jQ(".terms-overlay").toggleClass("closed");
    });
    
    $jQ("#formbegone").click(function(){
         $jQ(".lead-form").fadeOut(300);
         $jQ(".form-lightbox").hide();
    });
    
    $jQ("#call-button").click(function(){
         $(".form-lightbox").show();
         $(".lead-form").fadeIn(300);
    });    
       
    $jQ("#sendtome").click(function(){
        $jQ(".email-box").toggleClass("expanded");
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
            
            data.to = email;            
            data.salary =  curSalary();
            data.workyears =  parseInt($jQ("#YearsWorking").val(), 10);
            data.age =  $jQ("#Age").val();

            data.title = 'Here is your Agile MBA Return on Investment calculation';
            data.subject = 'Here is your Agile MBA Return on Investment calculation, if you have any questions about studying the MBA through AIB you can call us on <b>1300 304 820</b>';
            screenGrab($jQ("#screen-grab")[0], data);
        }
    });
    
    $jQ(".lead-form-close").click(function(){
        $jQ(".form-lightbox").hide();
        $jQ(".lead-form").fadeOut(300);
    });


    $jQ('.screen-container').css('width', (screenCount * 100) + '%');
    $jQ('.screen-container .screen').css('width', (100 / screenCount) + '%');   

    $jQ("#salary").on("keyup", function () {
        debounce(loadNewData(), 250);
    })

   // $jQ('#mkto-sonar').attr("src", "/custom/files/docs/sonar-form-roi.htm"); 

   $jQ('#mkto-sonar').attr("src", "//ww2.aib.edu.au/sonar/leadforms/roi/");

    var chart = new ROIChart();

    loadNewData();   
   
    
}
