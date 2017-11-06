var init = function() {

    var screen = 0,
        freeTime = 0,       
        slideRanges = [
            [4, 7, 0, 2, 9],
            [0, 7, 6, 3, 6],
            [7, 0, 0, 8, 8],
            [0, 0, 0, 0, 0]
        ],

        
        setSliderClass = function(cls){
            $jQ(".study-time-wrap").removeClass("amber").removeClass("warning").removeClass("green").addClass(cls);
            $jQ(".study-hours").removeClass("amber").removeClass("warning").removeClass("green").addClass(cls);
            $jQ(".study-text").removeClass("amber").removeClass("warning").removeClass("green").addClass(cls);
            $jQ(".study-bar-wrap").removeClass("amber").removeClass("warning").removeClass("green").addClass(cls);
           
            $.each($jQ(".selecta"), function() {
                var range = $jQ($jQ(this).find('[id^=slider]'));
                range.removeClass("amber").removeClass("warning").removeClass("green").addClass(cls);
                hiddenSlider = range.parent().find(".hidden-slider");
                hiddenSlider.removeClass("amber").removeClass("warning").removeClass("green").addClass(cls);
            });
           
            $jQ(".study-tick").fadeOut(300);
        },


        checkStudyHours = function(hrs) {
             if (hrs < 22 && hrs > 10) {
                setSliderClass("amber");
            }else if(hrs < 11) {
                setSliderClass("warning");               
            } else {
               setSliderClass("green");         
            }
        },        
       
        
        fixInputAndChangeEvents = function() {
            var currentSlider,
            fireChange = function(e) {
              var changeEvent = document.createEvent('Event');
              changeEvent.initEvent('change', true, true);

              changeEvent.forceChange = true;
              currentSlider.dispatchEvent(changeEvent);
            }
        },

        calculateStudyHours = function() {
            var hoursRequired = 21.5,
                committedHours = 0,
                availableStudyHours = 0,
                studyAtWork = 0;


            $.each($jQ('[id^=slider]'), function(e) {
                committedHours += ($jQ(this).val() * 10) / 10;
            });

            availableStudyHours = committedHours;

            $jQ("#studyhours").text(parseInt(availableStudyHours, 10) + " hrs");
            checkStudyHours(parseInt(availableStudyHours, 10));
            $jQ("#study-bar").css("width", (10 + ((availableStudyHours - 2) / hoursRequired  * 100))  + "%");

        },      
       

        setRangeText = function(rangeObj, textObj) {           
            
            var hiddenSlider, rangePercent;
            textObj.attr("value", rangeObj.val());
            calculateStudyHours();
            hiddenSlider = rangeObj.parent().find(".hidden-slider");
            hiddenSlider.find(".slider-value").html(rangeObj.val());
            rangePercent =  rangeObj.val() / rangeObj[0].max * 91;          
            hiddenSlider.find(".slider-knob").css("left", rangePercent + "%");         

        },

        addRangeEvents = function() {            
          
            $.each($jQ(".selecta"), function() {
              
                var range = $jQ($jQ(this).find('[id^=slider]')),
                    txt = $jQ($jQ(this).find('[id^=txt]'));

                setRangeText(range, txt);
                
                range.on("input", function() {                   
                    setRangeText(range, txt);                   
                });

                range.on("change", function() {
                    $jQ(".selecta").css("background", "#eee");                     
                    setRangeText(range, txt);                     
                });
            });
        },

        setSliders = function(i) {

            $.each($jQ('[id^=slider]'), function(j) {
                $jQ(this).val(slideRanges[i][j]);
            });

            $.each($jQ('[id^=txt]'), function(j) {               
                $jQ(this).attr("value", slideRanges[i][j]);
            });

            calculateStudyHours();
        },
     

        screenGrab = function (element, sendinfo) {

            var data = sendinfo;
            $("#button-sendemail").attr("value", "SENDING...");

            $.each($(".selecta input"), function(){
                $(this).hide();
            });

            // clone avaible study time calc header

            var studyHead = $("#available-time").html();
            console.log(studyHead);
            var studyHeadClass =  $("#available-time").attr("class").replace("study-time-wrap", "");
            $(".study-time-grab").empty().html(studyHead);           
            $(".study-time-grab").addClass(studyHeadClass);

            $.each($(".hidden-slider"), function(){
                $(this).addClass("shown");
            });

            window.html2canvas(element, {
                allowTaint: false,
                onrendered: function (canvas) {

                    var jpegUrl = canvas.toDataURL("image/png"),
                    jpgData = encodeURIComponent(jpegUrl); 
                    data.image = jpgData,
                    mailerURL = "//ww2.aib.edu.au/sendtome/rest/sendmecalcJSON.php";
                    $.each($(".selecta input"), function(){
                        $(this).show();
                    });

                    $.each($(".hidden-slider"), function(){
                        $(this).removeClass("shown");
                    }); 

                    var grabImage = new Image;
                    grabImage.src = jpegUrl; 

                   // $('body').append(grabImage);           
                  

                    $jQ.ajax({

                        url:  mailerURL,
                        type: "POST",
                        data: data,
                        dataType: "json",
                        cache: false,
                        success: function (d) {                        
                            $jQ(".email-box").removeClass("expanded"); 
                            $jQ(".email-status").addClass("expanded");   

                             // empty our calc summary screengrab div    
                            $(".study-time-grab").empty();   
                            $(".study-time-grab").removeClass("shown");                                                  
                           
                            var frame = document.getElementById('sonar-form');
                            var obj = {};
                            var emailObj = {};
                            
                            emailObj.Email = data.to; 
                            emailObj.lifeFitStudyHours = data.hours;                            
                            emailObj.lifeFitImage = d.imageurl;                           
                            
                            obj.formFields = emailObj;
                            obj.formId = 1101;
                            obj.command = "load";

                            // this actually submits the form remotely if all hidden fields are populated
                            frame.contentWindow.postMessage(obj, '*'); 
                           
                            try{
                                dataLayer.push({
                                    'event': 'studybd-email'
                                }); 
                            }catch(e){
                                console.log("GTA Datalayer not loaded");
                            }                           
                        }
                    });
                }
            }); 
        };     


    checkStudyHours(0);

    window.addEventListener("message", function(event) {                
        var data = event.data;
        console.log(data);
    });

    
    $jQ(".lead-form").hide();

    $jQ(".info-button").click(function() {
        $jQ(this).parent().find(".infobox").fadeIn();
    });


    $jQ(".infobox").click(function() {
        $jQ(this).fadeOut();
    });

    $jQ(".heads-wrap .heads").click(function(i) {
        var id = $jQ(this).index();
        
        if (id !== 3) {
            setSliders(id);
        }

        $.each($jQ(".heads-wrap .heads"), function() {
            $jQ(this).removeClass("selected");
        });
        $jQ(this).addClass("selected");
    });

    $jQ(".student").click(function() {
        setSliders($jQ(this).index());
    });

    $jQ('#disclaimer-button').click(function() {
        $jQ(this).find(".arr").toggleClass("open");
        $jQ(".terms-overlay").toggleClass("closed");
    });

    $jQ("#formbegone").click(function() {
        $jQ(".lead-form").fadeOut(300);
        $jQ(".form-lightbox").hide();
    });

    $jQ("#sendtome").click(function() {
        $jQ(".email-box").toggleClass("expanded");
        $jQ("#button-sendemail").attr("value", "SEND");
        $jQ(".email-status").removeClass("expanded"); 
    });

    $jQ(".email-status").click(function() {
        //console.log("close email!");
        $jQ(this).removeClass("expanded");
    });

    $jQ("#button-sendemail").click(function() {

        var email = $jQ("#sendemail").val(),
            data = {};

        if (!validEmail(email)) {
            //errMsg = label + " requires a valid email address";
            $jQ("#sendemail").addClass("farketo-incomplete");
        } else {
            // all good... send it! 
            $jQ("#sendemail").removeClass("farketo-incomplete");

            data.firstName = "Guest";
            data.lastName = email.hashCode();
            data.to = email;
            data.title = 'Here is your "Fitting an MBA into your life" summary';
            data.subject = 'Here is your "Fitting an MBA into your life" summary, if you have any questions about studying the MBA through AIB you can call us on <b>1300 304 820</b>';
            data.hours =  $jQ("#studyhours").text();


            $.each($jQ(".heads-wrap .heads"), function() {
                $jQ(this).removeClass("selected");
            });
            $jQ($jQ(".heads-wrap .heads").get(3)).addClass("selected");
            screenGrab($jQ("#screen-grab")[0], data);

        }
    });

    var hammertime = new Hammer($jQ(".email-box")[0]);
    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
        
    hammertime.on('swiperight', function(ev) {
       
        $jQ(".email-box").removeClass("expanded");
       
    });

    var moduleHeight = $jQ(".calc-wrap").height();
    $jQ('#mkto-sonar').attr("src", "/custom/files/docs/sonar-lead-form-study-fit.htm"); 
        
    $jQ(window).scroll(function(){
       
        var moduleOffset = $jQ(".aib-interactive").offset().top;
        var windowOffset =  $jQ(window).scrollTop();         

       
        if(windowOffset >  moduleOffset  && windowOffset < (moduleOffset + moduleHeight) ){  
           
            $jQ(".aib-interactive .study-time-wrap").addClass("shown");
            $jQ(".aib-interactive .cta-block").addClass("shown");
        }else{           
           
            $jQ(".aib-interactive .study-time-wrap").removeClass("shown");
            $jQ(".aib-interactive .cta-block").removeClass("shown");
        }           
            
        
    });    

    addRangeEvents();

}

