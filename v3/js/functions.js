// jQuery animate numbers extension - namespaced
!function(e){e.fn.animateNumbers=function(t,a,n,l){return this.each(function(){var i=e(this),r=i.is("input"),v=parseInt(r?i.val().replace(/,/g,""):i.text().replace(/,/g,"")),u=/(\d)(?=(\d\d\d)+(?!\d))/g;a=void 0===a?!0:a,r&&"number"===i[0].type&&(a=!1),e({value:v}).animate({value:t},{duration:void 0===n?1e3:n,easing:void 0===l?"swing":l,step:function(){r?i.val(Math.floor(this.value)):i.text(Math.floor(this.value)),a&&(r?i.val(i.val().replace(u,"$1,")):i.text(i.text().replace(u,"$1,")))},complete:function(){(parseInt(i.text())!==t||parseInt(i.val())!==t)&&(r?i.val(t):i.text(t),a&&(r?i.val(i.val().replace(u,"$1,")):i.text(i.text().replace(u,"$1,"))))}})})}}($jQ);

// jQuery cookie extension - Namespaced
$jQ.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = $jQ.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};


var  addToProfile = function(key, val){
             // TODO: Add arbitrary value to profile
            profileObj.key = val;
    },

    profileBuild = function () {
            // TODO: Stash state in a cookie
    },

    showLeadForm = function () {
            $jQ('.form-lightbox').fadeIn();
            $jQ('.lead-form').fadeIn();
    },

    hideLeadForm = function () {
            $jQ('.form-lightbox').fadeOut();
            $jQ('.lead-form').fadeOut();
    },

    submitLeadForm = function () {
            // TODO: create new Marketo Lead and attach form state as a serialized object
    },

    validText = function (txt, length) {
        return txt.length > length;
    },

    validTel = function (phone) {
        return /^[0-9\+\(\)\/]{10}\d+$/.test(phone);
    },

    validEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },

    validateForm = function (form, step) {

        var formScreen = $jQ(".farketo-step.step-" + step),
            stepElements = formScreen.find($jQ("input")),
            errMsg = false,
            formElement,
            formVal,
            label;

        $jQ.each(stepElements, function () {
            formElement = $jQ(this);
            formVal = $jQ(this).val();
            label = $jQ("label[for='" + $jQ(this).attr('id') + "']").text();
            formElement.removeClass("farketo-incomplete");

            switch (formElement.attr("type")) {
                case "text":
                    if (!validText(formVal, 2)) {
                        errMsg = label + " field hasn't been completed"; 
                        formElement.addClass("farketo-incomplete");
                    }
                    break;

                case "email":
                    if (!validEmail(formVal)) {
                        errMsg = label + " requires a valid email address";
                        formElement.addClass("farketo-incomplete");
                    }
                    break;

                case "tel":
                    if (!validTel(formVal)) {
                        errMsg = label + " requires a valid phone number";
                        formElement.addClass("farketo-incomplete");
                    }
                    break;
            }

            if(errMsg !== false){
                $jQ("#button-step-" + step).addClass("inactive"); 
            }else{
                $jQ("#button-step-" + step).removeClass("inactive");
            }
        });

        return errMsg;
    },

    getToken = function(){   
        return $jQ.ajax({
            type: "GET",
            url: "http://www.aibgraduation.com/rest/jsonp_auth.php",           
            dataType: "jsonp"                  
         });
    },
        
    associateLead = function(id, updateData, access_token){
        
    // associate updated data with a Marketo lead

        if($jQ.cookie('_mkto_trk') != null){     
            cookie = $jQ.cookie('_mkto_trk').replace("id:", "").replace("&", "%26");             
            updateData.marketo[0].endPoint = endpointDomain + ".mktorest.com/rest/v1/leads/" + id +  "/associate.json?access_token=" + access_token +  "&cookie=" + cookie;
            //updateData.marketo[0].action = "associate";
            
            var url = 'http://www.aibgraduation.com/rest/associate_lead.php';               

            return $jQ.ajax({
                  url: url,
                  type: 'POST',
                  data : updateData,
                  dataType: "json",      
                  success: function(d){               
                    //console.log(d);
                  },

            });         


        }else{
            return false;
        }
    },

    debounce = function (func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments,
                later = function () {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                },
                callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },

    calcTax = function (salary) {
        var taxDeducted = 0,
            i;

        for (i = 0; i < taxRates.length; i = i + 1) {
            if (salary <= taxRates[i].max && salary > taxRates[i].min) {
                taxDeducted = ((salary - (taxRates[i].min - 1)) * taxRates[i].rate / 100) + taxRates[i].fixed;
                taxDeducted += salary * 0.02;                
            }
        }

        return Math.floor(taxDeducted);
    },

    calcFEE2 = function (salary) {       
        var repayment = 0,
            hf, min, max, i;

        for (i = 0; i < feeHelpRates.length; i = i + 1) {
            min = parseInt(feeHelpRates[i].min, 10);
            max = parseInt(feeHelpRates[i].max, 10);

            if (salary <= max && salary > min) {
                repayment = Math.floor((feeHelpRates[i].rate * salary) / 100);

            }
        }
        return repayment;  // single value
    }, 

    calcFEE = function (salary) {
        var repayment = 0,
            rate,
            hf, min, max, i;

        for (i = 0; i < feeHelpRates.length; i = i + 1) {
            min = parseInt(feeHelpRates[i].min, 10);
            max = parseInt(feeHelpRates[i].max, 10);

            if (salary <= max && salary > min) {
                repayment = Math.floor((feeHelpRates[i].rate * salary) / 100);
                rate = feeHelpRates[i].rate;
            }
        }
        return {
            "repayment": repayment,
            "rate": rate  // object containing value and rate
        };
    },      


    numberWithCommas = function (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    array_sum = function (arr) {
        var b = arr.reduce(function (a, b) {
            if (!isNaN(a) && !isNaN(b)) {
                return parseInt(a, 10) + parseInt(b, 10);
            } else {
                return 0;
            }
        }, 0);
        return b;
    },

    msieversion = function() 
    {
        var ua = window.navigator.userAgent,
        msie = ua.indexOf("MSIE ");
        if(msie < 0){msie = ua.indexOf("Trident/") > 0;}              
       
        if(msie == true){
             return 11; // Edge  
        }  
        else if (msie > 0) // If Internet Explorer, return version number
        {
            return( parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) );
        }
        else  // If another browser, return 0
        {
            return -1;
        }

        return false;
    };



    String.prototype.hashCode = function() {
      var hash = 0, i, chr;
      if (this.length === 0) {return hash};
      for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return Math.abs(hash);
    }; 
