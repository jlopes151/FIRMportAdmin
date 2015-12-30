if (typeof bfdsmgr == 'undefined') {
    bfdsmgr = {};
}

bfdsmgr.util = (function() {
    return {
        /**
         * Use in place of object to spring string.
         * Creates a flattened object suitable for posting to spring bound controller
         * @param object Object to flatten
         * @param prefix Used for recursion -- determines key values.
         * @param flatObject Used for recursion -- eventual return value
         */
        flattenObject: function(object, prefix, flatObject) {
            if (typeof flatObject == 'undefined') {
                prefix = "";
                flatObject = {};
            }
            for (var property in object) {
                var value = object[property];

                switch (typeof value) {
                    case "undefined": {
                        flatObject[prefix + property] = null;
                        break;
                    }
                    case "object": {
                        //Null is considered an object in js
                        if (value == null) {
                            flatObject[prefix + property] = null;
                            //Next handle any arrays
                        } else if (typeof value.length != 'undefined') {
                            //Iterate across array and either add the value or flatten the item and add it with the index in the name
                            for (var i = 0; i < value.length; i++) {
                                var item = value[i];
                                var itemTag = prefix + property + "[" + i + "]";
                                if (typeof item == 'object') {
                                    bfdsmgr.util.flattenObject(item, itemTag + ".", flatObject);
                                } else {
                                    flatObject[itemTag] = item;
                                }
                            }
                            //Unfortunately, JSON-lib serializes java.util.Date as it would any other object, rather than as a JSON date
                            //here we infer if the current object is the JSON representation of a java.util.Date and turn it into a date string
                            //that can be bound by the custom handler on the server. Inference is based on the assumption that a date object will
                            //have properties called time and seconds

                            //Removing for bfds Admin
                        } /*else if (value.hasOwnProperty('time') && value.hasOwnProperty('seconds')) {
                            flatObject[prefix + property] = "'" + bfdsmgr.util.utilDateToString(value) + "'";
                        }*/ else {
                            bfdsmgr.util.flattenObject(value, prefix + property + ".", flatObject);
                        }
                        break;
                    }
                    default: {
                        flatObject[prefix + property] = value;
                        break;
                    }
                }
            }
            return flatObject;
        },
        
		add: function(from, to){
			$(from + ' option:selected').appendTo(to);
			this.sortMultiSelect(from);
			this.sortMultiSelect(to);
		},
		
		addAll: function(from, to){
			$(from + ' option').attr('selected','selected');
			$(from + ' option:selected').appendTo(to);
			this.sortMultiSelect(to);
		},
		
		remove: function(from, to){
			$(to + ' option:selected').appendTo(from);
			this.sortMultiSelect(from);
			this.sortMultiSelect(to);
		},
		
		removeAll: function(from, to){
			$(to + ' option').attr('selected','');
			$(to + ' option').appendTo(from);
			this.sortMultiSelect(from);
		},
		
		sortMultiSelect: function sort_multi_select(select)
		{
			var x = jQuery(select + ' option');
			x.remove();
			x.sort(function(a,b) { a = a.firstChild.nodeValue; b = b.firstChild.nodeValue; if (a==b) return 0; return (a>b) ? 1 : -1; });
			x.appendTo(select);
		},
		
        /**
         * Gets a unique ID given the specified initial ID.
         * @param baseId
         */
        getUniqueId: function(baseId) {
            return Math.floor(Math.random() * (0 - 1000000 + 1));
        },
        
        /**
         * Appends a unique value to the URL to prevent IE caching.
         * @param url
         */
        getNocacheUrl: function(url) {
            var nonce = "nocache=" + bfdsmgr.util.getUniqueId("n");
            return url + (/\?/.test(url) ? "&" : "?") + nonce;
        },
        
        /**
         * checks if the string starts with given prefix
         * @param string string to be checked
         * @param prefix value to test
         */
        startsWith: function(string, prefix) {
            return (string.substr(0, prefix.length) === prefix);
        },
        
        isBlank: function(value){
        	// failed  	var patt1= new RegExp("\s","g");
        	var patt1= /\s/g;
        	/*
        	 *  on the Add there may be a zero length string, on the Edit
        	 *  there maybe a string of zero or more spaces. The following
        	 *  code simulate the XOR operator
        	 */
        	if( ((value.length == 0) && !(patt1.test(value)) ) || 
        			( !(value.length == 0) && (patt1.test(value)))){ 
        		return true; 
        	}
        	
        	return false;
        },
  
        /*
         * Testing for 7 char 'partial' string
         */
        isYesNo_NoBlank: function(value){
        	if(value.length > 3) { return false; }
//        	if(this.isBlank(value)){ return true; }
        	switch(this.trim(value).toUpperCase()){
        		case 'YES':
        		case 'NO':
        		case 'N/A':
        		case 'PARTIAL':
        			return true;
        			break;
        		default:
        			return false;
        			break;
        	};
        		return false;
        },

        isYesNo: function(value){
        	if(value.length > 3) { return false; }
        	if(this.isBlank(value)){ return true; }
        	switch(this.trim(value).toUpperCase()){
        		case 'YES':
        		case 'NO':
        		case 'N/A':
        		case 'UNK':
        			return true;
        			break;
        		default:
        			return false;
        			break;
        	};
        		return false;
        },

        isYesNoUNK: function(value){
        	if(value.length > 3) { return false; }
        	if(this.isBlank(value)){ return true; }
        	switch(this.trim(value).toUpperCase()){
        		case 'YES':
        		case 'NO':
        		case 'UNK':
        			return true;
        			break;
        		default:
        			return false;
        			break;
        	};
        		return false;
        },

        isDigitOrBlank: function(value){
        	if(this.isBlank(value)){ return true; }
        	var patt1 = new RegExp("[0-9]");
        	return patt1.test(value);
        },
        
        isDigitOrNA: function(value){
        	if(value.toUpperCase() == 'N/A'){return true;}
        	var patt1 = new RegExp("[0-9]");
        	return patt1.test(value);
        },
        
        isDigit: function(value){
        	var patt1 = new RegExp("[0-9]");
        	return patt1.test(value);
        },
        
        // validate the date with out the time stamp
        isDate: function(value) {
            try {
                // blank field
                if(value.length <= 0){
                    return true;
                }

                if(value.search("-") == -1){
                    return false;
                }
                
                var tempDate = value.slice(0, 10);
                // there should be only two dashes in the date string
                var SplitValue = tempDate.split("-");
                var OK = true;
                
                // SQL Server date format yyyy-mm-dd
                // Year
                if (SplitValue[0].length != 4) {
                    return false;
                }
                // Month
                if (SplitValue[1].length != 2) {
                    return false;
                }
                // Day
                if (SplitValue[2].length != 2) {
                    return false;
                }
                if (OK) {
                    var Year  = parseInt(SplitValue[0], 10);
                    var Month = parseInt(SplitValue[1], 10);
                    var Day   = parseInt(SplitValue[2], 10);

                    if(OK = ((Day > 0) && (Day <= 31))){
	                    if(OK = ((Month > 0) && (Month <= 12))){
		                    if (OK = ((Year > 1900) && (Year < 2111))) {
		                            var LeapYear = (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0));
		                            if (Month == 2) {
		                                OK = LeapYear ? Day <= 29 : Day <= 28;
		                            }else {
		                                if ((Month == 3) || (Month == 5) || (Month == 8) || (Month == 10)) {
		                                    OK = (Day > 0 && Day <= 30);
		                                }else {
		                                    OK = (Day > 0 && Day <= 31);
		                                }
		                            }
		                    } // year
	                    }// month
                    }// day                    
                }
                return OK;
            }catch (e) {
                return false;
            }
        },// isDate
        
        // validate the date with out the time stamp
        isDateNoBlank: function(value) {
            try {

            	if(value.search("-") == -1){
                    return false;
                }
                
                var tempDate = value.slice(0, 10);
                // there should be only two dashes in the date string
                var SplitValue = tempDate.split("-");
                var OK = true;
                
                // SQL Server date format yyyy-mm-dd
                // Year
                if (SplitValue[0].length != 4) {
                    return false;
                }
                // Month
                if (SplitValue[1].length != 2) {
                    return false;
                }
                // Day
                if (SplitValue[2].length != 2) {
                    return false;
                }
                if (OK) {
                    var Year  = parseInt(SplitValue[0], 10);
                    var Month = parseInt(SplitValue[1], 10);
                    var Day   = parseInt(SplitValue[2], 10);

                    if(OK = ((Day > 0) && (Day <= 31))){
	                    if(OK = ((Month > 0) && (Month <= 12))){
		                    if (OK = ((Year > 1900) && (Year < 2111))) {
		                            var LeapYear = (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0));
		                            if (Month == 2) {
		                                OK = LeapYear ? Day <= 29 : Day <= 28;
		                            }else {
		                                if ((Month == 3) || (Month == 5) || (Month == 8) || (Month == 10)) {
		                                    OK = (Day > 0 && Day <= 30);
		                                }else {
		                                    OK = (Day > 0 && Day <= 31);
		                                }
		                            }
		                    } // year
	                    }// month
                    }// day                    
                }
                return OK;
            }catch (e) {
                return false;
            }
        },// isDate
        
        trim: function(stringToTrim) {
        	return (stringToTrim != null) ? stringToTrim.replace(/^\s+|\s+$/g,"") : "";
        },
        
        ltrim: function(stringToTrim) {
        	return (stringToTrim != null) ? stringToTrim.replace(/^\s+/,"") : "";
        },
        
        rtrim: function(stringToTrim) {
        	return (stringToTrim != null) ? stringToTrim.replace(/\s+$/,"") : "";
        },
        
        setFieldColor: function(event){
        	$(event).css('background-color', lightsteelblue);
        },
        
        setFieldErrorColor: function(event){
        	$(event).css('background-color', red);
        },
        
        getUserName: function(value){
            $.ajax({
                type: "GET",
                url: 'getUserName',
                dataType: "json",
                cache: false,
                success: function(data){
                   $('#userName').val(data.userName);
                }
            });
        }
        

    };// the return
    
})();