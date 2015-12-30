if (typeof bfdsmgr == 'undefined') {
    bfdsmgr = {};
}

bfdsmgr.contacts = (function() {
	/*
	 * The _MOUNT is the attach point found at the bottom of the view page
	 */
    var _MOUNT = "currentCntctMgmtCoXrf";
    var _grid = null;
    var _rowClassName = null;
    var isSystem  = false;
    var isContact = false;
    var isCompany = false;
    var isMethod  = false;
    var isType    = false;
    
    return {
        // initializes the header text of the filtered grid
        initializeFilteredGrid: function(){
        	var layout = new Array(
                {field: "cntct_first_nm", name: "First Name", width: "30px", headerClasses: "bfdsmgrBoldText"},
                {field: "cntct_last_nm", name: "Last Name", width: "30px", headerClasses: "bfdsmgrBoldText"},
                {field: "mgmt_co_short_nm", name: "Company", width: "30px", headerClasses: "bfdsmgrBoldText"},
                {field: "pref_cntct_meth_cd", name: "Contact Method", width: "40px", headerClasses: "bfdsmgrBoldText"},
                {field: "cntct_typ_cd", name: "Type", width: "40px", headerClasses: "bfdsmgrBoldText"},
                {field: "cntct_cmnt_txt", name: "Comment", width: "120px", headerClasses: "bfdsmgrBoldText"},
                {field: "cntct_id", name: "Hidden Id", width: "0px", hidden: true, headerClasses: "bfdsHidden"},
                {field: "mgmt_co_id", name: "Hidden Id", width: "0px", hidden: true, headerClasses: "bfdsHidden"}
            );

            var url = 'showAllCntctMgmtCoXrf';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){
                        _grid = new FilteredPagedGrid({
			                        pageSize: 10,
			                        attachPoint: document.getElementById(_MOUNT),
			                        structure: layout,
			                        defaultSort: 'cntct_first_nm',
			                        filterLabel: 'First Name',
			                        data: data,
			                        filterColumn: 'cntct_first_nm',
			                        width: "800px",
			                        className: "pagedGridBorder"
			                    });
		                $('#loading').addClass('bfdsHidden');
		                $('#title').removeClass('bfdsHidden');
                }
            });            
        },
        
        activateEditPage: function(data){
        	window.parent.setFieldPage('editCntctMgmtCoXrfPage');
        },
        
        // adds an Contact
        addCntctMgmtCoXrf: function(){
	            var newContactsXrf = {
	            		cntct_cmnt_txt: $('#cntct_txtInput').val()
	            };
	            // check them fields before the add 
//	            Ok = this.validateFields();
		            if(confirm("Are you sure you want to add this Contact Xref?")) {           	
		                $.post('addContactXrf',
		                		bfdsmgr.util.flattenObject(newContactsXrf),
		                        function (data) {
		                            if(data.true_false){
		                            	bfdsmgr.contacts.addCntctMgmtCoXrfSuccess(data);
		                            } else {
		                                bfdsmgr.contacts.addCntctMgmtCoXrfFail(data);
		                            }
		                        },
		                        'json');
		            }
		            
        },

        addCntctMgmtCoXrfSuccess: function(data){
            $('#successMessage').html('You have successfully added the Contact Company Xrf.');
            $('#success').removeClass('bfdsHidden');
        },

        addCntctMgmtCoXrfFail: function(data){
            if(data.duplicate){
                $('#successMessage').html('Fail! This Contact already exists.');
            } else {
                $('#successMessage').html("Fail! This Contact was not created");
            }
            $('#success').removeClass('bfdsHidden');
        },

        contactDialog: function(){
          	$('#contactDialog').dialog({ height: 400, 
        	  						     width: 100, 
        	  						     maxHeight: 400, 
        	  						     modal: true, 
             							 buttons: { "Ok": function() {
								 							var nxtRdb = 0;
								 							var foundThese = '';
								 							var outPut = '';
								 							var lstComma = 0;
								 							
								 							while(true){
								 								if(document.getElementById('contactRdb' + nxtRdb) != null){
								 									if(document.getElementById('contactRdb' + nxtRdb).checked){
								 										foundThese += document.getElementById('contactRdb' + nxtRdb).value + ',';
								 									}
								 								}else{
								 									break;
								 								}
								 								nxtRdb++;
								 							}
								 							
								 							if(foundThese.length > 0){
									 							// remove the trailing comma
									 							lstComma = foundThese.lastIndexOf(',');
									 							outPut = foundThese.substring(0, lstComma);
									 							
									 							var newContact = {
									 					        		sel_contact_id: outPut
									 						     };
							 						             $.post('saveSelContact',
							 						             		bfdsmgr.util.flattenObject(newContact),
							 						                    function (data) {
							 						            	 		if(data.true_false){
							 						            	 			isContact = true;
							 						            	 		}else{
							 						            	 			isContact = false;
							 						            	 		}
							 						                    },
							 						                    'json');
             							 					}else{
             							 						alert('No contacts selected, you must select atleast one!');
             							 						isContact = false;
             							 					}
								 							
								 							$(this).dialog("close"); 
								 						 },
     									   			"Close": function() { 
     									   									$(this).dialog("close"); 
     									   								}
     									          } 							
        	  						     });
        },
        
		companyDialog: function(){
          	$('#companyDialog').dialog({ height: 400, 
        	  						     width: 300, 
        	  						     maxHeight: 400, 
        	  						     modal: true, 
             							 buttons: { "Ok": function() {
								 							var nxtChkBx = 0;
								 							var foundThese = '';
								 							var outPut = '';
								 							var lstComma = 0;
								 							
								 							while(true){
								 								if(document.getElementById('companyChkBx' + nxtChkBx) != null){
								 									if(document.getElementById('companyChkBx' + nxtChkBx).checked){
								 										foundThese += document.getElementById('companyChkBx' + nxtChkBx).value + ',';
								 									}
								 								}else{
								 									break;
								 								}
								 								nxtChkBx++;
								 							}
								 							
								 							if(foundThese.length > 0){
									 							// remove the trailing comma
									 							lstComma = foundThese.lastIndexOf(',');
									 							outPut = foundThese.substring(0, lstComma);
									 							
									 							var newCompany = {
									 					        		sel_company_id: outPut
									 						     };
							 						             $.post('saveCntctCompany',
							 						             		bfdsmgr.util.flattenObject(newCompany),
							 						                    function (data) {
							 						            	 		if(data.true_false){
							 						            	 			isCompany = true;
							 						            	 		}else{
							 						            	 			isCompany = false;
							 						            	 		}
							 						                    },
							 						                    'json');
             							 					}else{
             							 						alert('No company selected, you must select atleast one!');
			 						            	 			isCompany = false;
             							 					}
								 							
								 							$(this).dialog("close"); 
								 						 },
     									   			"Close": function() { 
     									   									$(this).dialog("close"); 
     									   								}
     									          } 							
        	  						     });
        },
        
        cntctMethDialog: function(){
          	$('#cntctMethDialog').dialog({ height: 175, 
        	  						     width: 100, 
        	  						     maxHeight: 400, 
        	  						     modal: true, 
             							 buttons: { "Ok": function() {
								 							var nxtRdb = 0;
								 							var foundThese = '';
								 							var outPut = '';
								 							var lstComma = 0;
								 							
								 							while(true){
								 								if(document.getElementById('cntctMthRdb' + nxtRdb) != null){
								 									if(document.getElementById('cntctMthRdb' + nxtRdb).checked){
								 										foundThese += document.getElementById('cntctMthRdb' + nxtRdb).value + ',';
								 									}
								 								}else{
								 									break;
								 								}
								 								nxtRdb++;
								 							}
								 							
								 							if(foundThese.length > 0){
									 							// remove the trailing comma
									 							lstComma = foundThese.lastIndexOf(',');
									 							outPut = foundThese.substring(0, lstComma);
									 							
									 							var newMethod = {
									 					        		sel_method_id: outPut
									 						     };
							 						             $.post('saveCntctMethod',
							 						             		bfdsmgr.util.flattenObject(newMethod),
							 						                    function (data) {
							 						            	 		if(data.true_false){
							 						            	 			isMethod = true;
							 						            	 		}else{
							 						            	 			isMethod = false;
							 						            	 		}
							 						                    },
							 						                    'json');
             							 					}else{
             							 						alert('No Method selected, you must select atleast one!');
             							 						isMethod = false;
             							 					}
								 							
								 							$(this).dialog("close"); 
								 						 },
     									   			"Close": function() { 
     									   									$(this).dialog("close"); 
     									   								}
     									          } 							
        	  						     });
        },
        
        cntctTypeDialog: function(){
          	$('#cntctTypeDialog').dialog({ height: 175, 
        	  						     width: 100, 
        	  						     maxHeight: 400, 
        	  						     modal: true, 
             							 buttons: { "Ok": function() {
								 							var nxtRdb = 0;
								 							var foundThese = '';
								 							var outPut = '';
								 							var lstComma = 0;
								 							
								 							while(true){
								 								if(document.getElementById('cntctTypeRdb' + nxtRdb) != null){
								 									if(document.getElementById('cntctTypeRdb' + nxtRdb).checked){
								 										foundThese += document.getElementById('cntctTypeRdb' + nxtRdb).value + ',';
								 									}
								 								}else{
								 									break;
								 								}
								 								nxtRdb++;
								 							}
								 							
								 							if(foundThese.length > 0){
									 							// remove the trailing comma
									 							lstComma = foundThese.lastIndexOf(',');
									 							outPut = foundThese.substring(0, lstComma);
									 							
									 							var newType = {
									 					        		sel_type: outPut
									 						     };
							 						             $.post('saveCntctType',
							 						             		bfdsmgr.util.flattenObject(newType),
							 						                    function (data) {
							 						            	 		if(data.true_false){
							 						            	 			isType = true;
							 						            	 		}else{
							 						            	 			isType = false;
							 						            	 		}
							 						                    },
							 						                    'json');
             							 					}else{
             							 						alert('No Type selected, you must select atleast one!');
             							 						isType = false;
             							 					}
								 							
								 							$(this).dialog("close"); 
								 						 },
     									   			"Close": function() { 
     									   									$(this).dialog("close"); 
     									   								}
     									          } 							
        	  						     });
        },
        
        editContactMgmtcoXrfPage: function(){
	            $.ajax({
	                 type: "GET",
	                 url: 'editContactMgmtcoXrf',
	                 dataType: "json",
	                 cache: false,
	                 success: function(data){
	
	                 	var numMthRdbx = $('#cntctMethDialog > input').size();                	
	                 	// loop the check box values setting matches
	                 	for(var rdbx=0; rdbx < numMthRdbx; rdbx++){
	                     	if($('#cntctMthRdb' + rdbx).val() == data.pref_cntct_meth_cd){
	                     		$('#cntctMthRdb' + rdbx).prop('checked', true);
	                     	}                		
	                 	}
	                 	
	                 	var numTypRdbx = $('#cntctTypeDialog > input').size();                	
	                 	// loop the check box values setting matches
	                 	for(var rdbx=0; rdbx < numTypRdbx; rdbx++){
	                     	if($('#cntctTypeRdb' + rdbx).val() == data.cntct_typ_cd){
	                     		$('#cntctTypeRdb' + rdbx).prop('checked', true);
	                     	}                		
	                 	}
	                 	
	             		$('#cntct_txtInput').val(data.cntct_cmnt_txt);
	                 	
	                 }
	             });
        },
        
        getContacts: function(_val){
            $.ajax({
                type: "GET",
                url: 'getContacts',
                dataType: "json",
                cache: false,
                success: function(data){               

                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<input id=contactRdb' + st + ' name=contactRdb value=' + data[st].cntct_id + ' type="radio">' + 
                    				data[st].cntct_first_nm + ' ' + data[st].cntct_last_nm + '</input><br/>').appendTo($('#contactDialog')).get(0);
                    	}else{
                    		if(_val == bfdsmgr.util.trim(data[st].alert_typ_cd)){
                        		$('<input id=contactRdb' + st + ' name=contactRdb value=' + data[st].cntct_id + ' type="radio" selected>' + 
                        				data[st].cntct_first_nm + ' ' + data[st].cntct_last_nm + '</input><br/>').appendTo($('#contactDialog')).get(0);
                    		}else{
                        		$('<input id=contactRdb' + st + ' name=contactRdb value=' + data[st].cntct_id + ' type="radio">' + 
                        				data[st].cntct_first_nm + ' ' + data[st].cntct_last_nm + '</input><br/>').appendTo($('#contactDialog')).get(0);
                    		}
                    	}                		
                	}
                	
                }
            });        	
        },
        
        getCntCtCompany: function(data){
	            $.ajax({
	                type: "GET",
	                url: 'getCntCtCompany',
	                dataType: "json",
	                cache: false,
	                success: function(data){               
	
	                	for(var st=0; st < data.length; st++){
	                    	if (typeof _val == 'undefined') {
	                    		$('<input id=companyChkBx' + st + ' name=companyChkBx value=' + data[st].mgmt_co_id + ' type="radio">' +
	                    				data[st].mgmt_co_short_nm + ' - ' + data[st].mgmt_co_long_nm + '</input><br/>').appendTo($('#companyDialog')).get(0);
	                    	}else{
	                    		if(_val == bfdsmgr.util.trim(data[st].mgmt_co_id)){
	                        		$('<input id=companyChkBx' + st + ' name=companyChkBx value=' + data[st].mgmt_co_id + ' type="radio" selected>' + 
	                        				data[st].mgmt_co_short_nm + ' - ' + data[st].mgmt_co_long_nm + '</input><br/>').appendTo($('#companyDialog')).get(0);
	                    		}else{
	                        		$('<input id=companyChkBx' + st + ' name=companyChkBx value=' + data[st].mgmt_co_id + ' type="radio">' + 
	                        				data[st].mgmt_co_short_nm + ' - ' + data[st].mgmt_co_long_nm + '</input><br/>').appendTo($('#companyDialog')).get(0);
	                    		}
	                    	}                		
	                	}
	                	
	                }
	            });        	
        },
        
        getCntctMethod: function(_val){
            $.ajax({
                type: "GET",
                url: 'getCntctMethod',
                dataType: "json",
                cache: false,
                success: function(data){               

                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<input id=cntctMthRdb' + st + ' name=cntctMthRdb value=' + data[st].cntct_meth_cd + ' type="radio">' + data[st].cntct_meth_dsc + '</input><br/>').appendTo($('#cntctMethDialog')).get(0);
                    	}else{
                    		if(_val == bfdsmgr.util.trim(data[st].cntct_meth_cd)){
                        		$('<input id=cntctMthRdb' + st + ' name=cntctMthRdb value=' + data[st].cntct_meth_cd + ' type="radio" selected>' + data[st].cntct_meth_dsc + '</input><br/>').appendTo($('#cntctMethDialog')).get(0);
                    		}else{
                        		$('<input id=cntctMthRdb' + st + ' name=cntctMthRdb value=' + data[st].cntct_meth_cd + ' type="radio">' + data[st].cntct_meth_dsc + '</input><br/>').appendTo($('#cntctMethDialog')).get(0);
                    		}
                    	}                		
                	}
                	
                }
            });        	
        },
        
        getCntctType: function(_val){
            $.ajax({
                type: "GET",
                url: 'getCntctType',
                dataType: "json",
                cache: false,
                success: function(data){               

                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<input id=cntctTypeRdb' + st + ' name=cntctTypeRdb value=' + data[st].cntct_typ_cd + ' type="radio">' + data[st].cntct_typ_dsc + '</input><br/>').appendTo($('#cntctTypeDialog')).get(0);
                    	}else{
                    		if(_val == bfdsmgr.util.trim(data[st].cntct_typ_cd)){
                        		$('<input id=cntctTypeRdb' + st + ' name=cntctTypeRdb value=' + data[st].cntct_typ_cd + ' type="radio" selected>' + data[st].cntct_typ_dsc + '</input><br/>').appendTo($('#cntctTypeDialog')).get(0);
                    		}else{
                        		$('<input id=cntctTypeRdb' + st + ' name=cntctTypeRdb value=' + data[st].cntct_typ_cd + ' type="radio">' + data[st].cntct_typ_dsc + '</input><br/>').appendTo($('#cntctTypeDialog')).get(0);
                    		}
                    	}                		
                	}
                	
                }
            });        	
        },
        
        setSearchInput : function(_cntct_id, _mgmt_co_id){
            var srchData = {
            	cntct_id: _cntct_id,
            	mgmt_co_id: _mgmt_co_id
            };
        	$.post('setContactXrefRowToEdit',
        		bfdsmgr.util.flattenObject(srchData),
                function (data) {        	
                    if(!data.true_false){
        	            $('#success').removeClass('bfdsHidden');
        				$('#successMessage').html('Error: failed to find the contact');
                    }                    
                },
                'json');
        },
        
        /*
         */
        setRowToEdit: function(data){
        	var cntct_id;
        	var mgmt_co_id;

        	if(navigator.appName == 'Netscape'){
	        	cntct_id = escape(data.cells[6].childNodes[0].wholeText);
	        	mgmt_co_id = escape(data.cells[7].childNodes[0].wholeText);
	        }else{
	        	cntct_id = escape(data.cells[6].innerHTML);
	        	mgmt_co_id = escape(data.cells[7].innerHTML);
	        }
        	this.setSearchInput(cntct_id, mgmt_co_id);
        	$('tr').removeClass('gridRowHighlight');
        	data.className = "gridRowHighlight";
        },
        
        // cntct_last_nm
        cntct_last_nm: function(){
            if($('#cntct_last_nmInput').val().length > 0){
            	$('#cntct_last_nmInput').css('border-color', '');
            	return true;
            }else{
            	// flag the field
            	$('#cntct_last_nmInput').css('border-color', 'red');
            	return false;
            }
        },
                        
        // cntct_title
        cntct_title: function(){
            if($('#cntct_titleInput').val().length > 0){
            	$('#cntct_titleInput').css('border-color', '');
            	return true;
            }else{
            	// flag the field
            	$('#cntct_titleInput').css('border-color', 'red');
            	return false;
            }
        },
                        
        // cntct_city
        cntct_city: function(){
            if($('#cntct_cityInput').val().length > 0){
            	$('#cntct_cityInput').css('border-color', '');
            	return true;
            }else{
            	// flag the field
            	$('#cntct_cityInput').css('border-color', 'red');
            	return false;
            }
        },
                        
        // cntct_state_cd
        cntct_state_cd: function(){
            if($('#cntct_state_cdDD').val().length > 0){
            	$('#cntct_state_cdDD').css('border-color', '');
            	return true;
            }else{
            	// flag the field
            	$('#cntct_state_cdDD').css('border-color', 'red');
            	return false;
            }
        },
                        
        // cntct_state_cd
        cntct_state_cd: function(){
            if($('#cntct_state_cdInput').val().length > 0){
            	$('#cntct_state_cdInput').css('border-color', '');
            	return true;
            }else{
            	// flag the field
            	$('#cntct_state_cdInput').css('border-color', 'red');
            	return false;
            }
        },
                        
        // cntct_zip_cd
        cntct_zip_cd: function(){
            if($('#cntct_zip_cdInput').val().length > 0){
            	$('#cntct_zip_cdInput').css('border-color', '');
            	return true;
            }else{
            	// flag the field
            	$('#cntct_zip_cdInput').css('border-color', 'red');
            	return false;
            }
        },
                        
        // cntct_verified_dt
        cntct_verified_dt: function(){
        	if(bfdsmgr.util.isDate($('#cntct_verified_dtInput').val())){
            	$('#cntct_verified_dtInput').css('border-color', '');
            	return true;
            }else{
            	// flag the field
            	$('#cntct_verified_dtInput').css('border-color', 'red');
            	return false;
            }
        },
                        
        // update a Contact
        updateCntctMgmtCoXrf: function(){
            var newContacts = {
            	cntct_cmnt_txt: $('#cntct_txtInput').val(),
            };
            // check them fields before the update 
//            Ok = this.validateFields();
	            if(confirm("Are you sure you want to update this Contact Company Xrf?")) {           	
	                $.post('updateCntctMgmtCoXrf',
	                		bfdsmgr.util.flattenObject(newContacts),
	                        function (data) {
	                            if(data.true_false){
	                                $('#successMessage').html('You have successfully updated the Contact Company Xrf.');
	                                $('#success').removeClass('bfdsHidden');
	                            } else {
	                                if(data.duplicate){
	                                    $('#successMessage').html('Fail! This Contact Company Xrf already exists.');
	                                } else {
	                                    $('#successMessage').html("Fail! This Contact Company Xrf was not updated!");
	                                }
	                                $('#success').removeClass('bfdsHidden');
	                            }
	                        },
	                        'json');
	            }
        },

        validateFields: function(){
        	if (this.cntct_title() == true )
        		if (this.cntct_verified_dt() == true ){
		 		return true;
		 	}else{ 
		 		return false;
		 	}
		 	
		},
                         
    };
})();