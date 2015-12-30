if (typeof bfdsmgr == 'undefined') {
    bfdsmgr = {};
}

bfdsmgr.contacts = (function() {
	/*
	 * The _MOUNT is the attach point found at the bottom of the view page
	 */
    var _MOUNT = "currentContacts";
    var _grid = null;
    var _rowClassName = null;
    var isSystem 	= false;
    
    return {
        // initializes the header text of the filtered grid
        initializeFilteredGrid: function(){
        	var layout = new Array(
                {field: "cntct_first_nm", name: "First Name", width: "100px", headerClasses: "bfdsmgrBoldText"},
                {field: "cntct_last_nm", name: "Last Name", width: "100px", headerClasses: "bfdsmgrBoldText"},
                {field: "cntct_title", name: "Title", width: "200px", headerClasses: "bfdsmgrBoldText"},
                {field: "cntct_wrk_phn", name: "Work Phone", width: "100px", headerClasses: "bfdsmgrBoldText"},
                {field: "cntct_wrk_phn_ext", name: "Work Phone Ext", width: "90px", headerClasses: "bfdsmgrBoldText"},
                {field: "cntct_cell_phn", name: "Cell Phone", width: "100px", headerClasses: "bfdsmgrBoldText"},
                {field: "cntct_fax_num", name: "Fax Number", width: "120px", headerClasses: "bfdsmgrBoldText"},
                {field: "cntct_address1", name: "Address 1", width: "220px", headerClasses: "bfdsmgrBoldText"},
                {field: "cntct_address2", name: "Address 2", width: "220px", headerClasses: "bfdsmgrBoldText"},
                {field: "cntct_city", name: "City", width: "90px", headerClasses: "bfdsmgrBoldText"},
                {field: "cntct_state_cd", name: "State", width: "90px", headerClasses: "bfdsmgrBoldText"},
                {field: "cntct_zip_cd", name: "Zip Code", width: "90px", headerClasses: "bfdsmgrBoldText"},
                {field: "cntct_email", name: "Email Address", width: "90px", headerClasses: "bfdsmgrBoldText"},
                {field: "cntct_verified_dt", name: "Verified Date", width: "90px", headerClasses: "bfdsmgrBoldText"},
                {field: "cntct_id", name: "Hidden Id", width: "60px", hidden: true, headerClasses: "bfdsHidden"}
            );

            var url = 'showAllContacts';
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
        	window.parent.setFieldPage('editContactsPage');
        },
        
        // adds an Contact
        addContact: function(){
            var newContacts = {
            		cntct_first_nm: $('#cntct_first_nmInput').val(),
            		cntct_last_nm: $('#cntct_last_nmInput').val(),
            		cntct_title: $('#cntct_titleInput').val(),
            		cntct_wrk_phn: $('#cntct_wrk_phnInput').val(),
            		cntct_cell_phn: $('#cntct_cell_phnInput').val(),
            		cntct_fax_num: $('#cntct_fax_numInput').val(),
            		cntct_address1: $('#cntct_address1Input').val(),
            		cntct_address2: $('#cntct_address2Input').val(),
            		cntct_city: $('#cntct_cityInput').val(),
            		cntct_state_cd: $('#cntct_state_cdDD').val(),
            		cntct_zip_cd: $('#cntct_zip_cdInput').val(),
            		cntct_email: $('#cntct_emailInput').val(),
            		cntct_verified_dt: $('#cntct_verified_dtInput').val(),
            		cntct_wrk_phn_ext: $('#cntct_wrk_phn_extInput').val()
            };
            // check them fields before the add 
            Ok = this.validateFields();
            if(Ok){
	            if(confirm("Are you sure you want to add this Contact?")) {           	
	                $.post('addContact',
	                		bfdsmgr.util.flattenObject(newContacts),
	                        function (data) {
	                            if(data.true_false){
	                            	bfdsmgr.contacts.addContactSuccess(data);
	                            } else {
	                                bfdsmgr.contacts.addContactFail(data);
	                            }
	                        },
	                        'json');
	            }
            }else{
                $('#successMessage').html("Fail! There are one or more invalid fields!");
            }
        },

        addContactSuccess: function(data){
            $('#successMessage').html('You have successfully added the Contact.');
            $('#success').removeClass('bfdsHidden');
        },

        addContactFail: function(data){
            if(data.duplicate){
                $('#successMessage').html('Fail! This Contact already exists.');
            } else {
                $('#successMessage').html("Fail! This Contact was not created");
            }
            $('#success').removeClass('bfdsHidden');
        },

        // cntct_first_nm
        cntct_first_nm: function(){
            if($('#cntct_first_nmInput').val().length > 0){
            	$('#cntct_first_nmInput').css('border-color', '');
            	return true;
            }else{
            	// flag the field
            	$('#cntct_first_nmInput').css('border-color', 'red');
            	return false;
            }
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
                
        deleteContact: function(data){
        	$.post('deleteContacts',
                    function (data) {        	
                        if(data.true_false){
            				$('#successMessage').html('You have deleted the Contact.');
            	            $('#success').removeClass('bfdsHidden');
                        }else{
            				$('#successMessage').html('Error: failed to delete the Contact.' + '\n' + data.message);
            	            $('#success').removeClass('bfdsHidden');
                        }                    
                    },
                    'json');
        },
        
        deleteContactMgmtcoXref: function(data){
        	$.post('deleteContactsMgmtCoXref',
                    function (data) {        	
                        if(data.true_false){
            				$('#successMessage').html('You have deleted the Contact, Company cross reference.');
            	            $('#success').removeClass('bfdsHidden');
                        }else{
            				$('#successMessage').html('Error: failed to delete the Contact, Company cross reference.' + '\n' + data.message);
            	            $('#success').removeClass('bfdsHidden');
                        }                    
                    },
                    'json');
        },
        
        deleteContactMgmtcoGrpXref: function(data){
        	$.post('deleteContactMgmtcoGrpXref',
                    function (data) {        	
                        if(data.true_false){
            				$('#successMessage').html('You have deleted the Contact, Company, Group cross reference.');
            	            $('#success').removeClass('bfdsHidden');
                        }else{
            				$('#successMessage').html('Error: failed to delete the Contact, Company, Group cross reference.' + '\n' + data.message);
            	            $('#success').removeClass('bfdsHidden');
                        }                    
                    },
                    'json');
        },
        
        editContactPage: function(){
            $.ajax({
                 type: "GET",
                 url: 'editContact',
                 dataType: "json",
                 cache: false,
                 success: function(data){

                 	var numRdbx = $('#systemDialog > input').size();                	
                 	// loop the check box values setting matches
                 	for(var rdbx=0; rdbx < numRdbx; rdbx++){
                     	if($('#systemRdb' + rdbx).val() == data.firm_id){
                     		$('#systemRdb' + rdbx).prop('checked', true);
                     	}                		
                 	}
                 	
             		$('#cntct_first_nmInput').val(bfdsmgr.util.trim(data.cntct_first_nm));
             		$('#cntct_last_nmInput').val(bfdsmgr.util.trim(data.cntct_last_nm));
             		$('#cntct_titleInput').val(bfdsmgr.util.trim(data.cntct_title));
             		$('#cntct_wrk_phnInput').val(bfdsmgr.util.trim(data.cntct_wrk_phn));
             		$('#cntct_cell_phnInput').val(bfdsmgr.util.trim(data.cntct_cell_phn));
             		$('#cntct_fax_numInput').val(bfdsmgr.util.trim(data.cntct_fax_num));
             		$('#cntct_address1Input').val(bfdsmgr.util.trim(data.cntct_address1));
             		$('#cntct_address2Input').val(bfdsmgr.util.trim(data.cntct_address2));
             		$('#cntct_cityInput').val(bfdsmgr.util.trim(data.cntct_city));
             		
             		bfdsmgr.contacts.getStates(data.cntct_state_cd);

             		$('#cntct_zip_cdInput').val(bfdsmgr.util.trim(data.cntct_zip_cd));
             		$('#cntct_emailInput').val(bfdsmgr.util.trim(data.cntct_email));
             		$('#cntct_verified_dtInput').val(bfdsmgr.util.trim(data.cntct_verified_dt));
             		$('#cntct_wrk_phn_extInput').val(bfdsmgr.util.trim(data.cntct_wrk_phn_ext));
                 	
                 }
             });
        },
     
        /*
         * if no value is passed then the method is called from the Add page else the Edit 
         * which would have pre values
         */
        getStates: function(_val){
            var url = 'getStates';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){               
                	// make the user select a state
            		$('<option value=>-- Select --</option>').appendTo($('#cntct_state_cdDD')).get(0);
                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<option value=' + data[st].state_cd + '>' + data[st].state_dsc + '</option>').appendTo($('#cntct_state_cdDD')).get(0);
                    	}else{
                    		if(_val == bfdsmgr.util.trim(data[st].state_cd)){
                        		$('<option value=' + data[st].state_cd + ' selected>' + data[st].state_dsc + '</option>').appendTo($('#cntct_state_cdDD')).get(0);
                    		}else{
                        		$('<option value=' + data[st].state_cd + '>' + data[st].state_dsc + '</option>').appendTo($('#cntct_state_cdDD')).get(0);
                    		}
                    	}                		
                	}                	
                }
            });        	
        },
        
        getSystem: function(_val){
            $.ajax({
                type: "GET",
                url: 'getSystem',
                dataType: "json",
                cache: false,
                success: function(data){               

                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<input id=systemRdb' + st + ' name=systemRdb value=' + data[st].firm_id + ' type="radio">' + data[st].short_nm + '</input><br/>').appendTo($('#systemDialog')).get(0);
                    	}else{
                    		if(_val == bfdsmgr.util.trim(data[st].alert_typ_cd)){
                        		$('<input id=systemRdb' + st + ' name=systemRdb value=' + data[st].firm_id + ' type="radio" selected>' + data[st].short_nm + '</input><br/>').appendTo($('#systemDialog')).get(0);
                    		}else{
                        		$('<input id=systemRdb' + st + ' name=systemRdb value=' + data[st].firm_id + ' type="radio">' + data[st].short_nm + '</input><br/>').appendTo($('#systemDialog')).get(0);
                    		}
                    	}                		
                	}
                	
                }
            });        	
        },
        
        setSearchInput : function(data){
            var srchData = {
            	cntct_id: data
            };
        	$.post('setContactRowToEdit',
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
        	
        	if(navigator.appName == 'Netscape'){
        		cntct_id = escape(data.cells[14].childNodes[0].wholeText);
        	}else{
        		cntct_id = escape(data.cells[14].innerHTML);
        	}
        	this.setSearchInput(cntct_id);
        	$('tr').removeClass('gridRowHighlight');
        	data.className = "gridRowHighlight";
        },
        
        systemDialog: function(){
			$('#systemDialog').dialog({ height: 400, 
            							width: 200, 
            							maxHeight: 400, 
            							modal: true,
            							buttons: { "Ok": function() { 
															var value = '';
															var nxtRdbBt = 0;
															
								 							while(true){
								 								if(document.getElementById('systemRdb' + nxtRdbBt) != null){
								 									if(document.getElementById('systemRdb' + nxtRdbBt).checked){
								 										value = document.getElementById('systemRdb' + nxtRdbBt).value;
								 										break;
								 									}
								 								}else{
								 									break;
								 								}
								 								nxtRdbBt++;
								 							}
								 							
								 							if(value.length > 0){
									 							var newSystem = {
									 					        	sel_system: value
									 						     };
							 						             $.post('contactSaveSystem',
							 						             		bfdsmgr.util.flattenObject(newSystem),
							 						                    function (data) {
							 						            	 		if(data.true_false){
							 						            	 			isSystem = true;
							 						            	 		}else{
							 						            	 			isSystem = false;
							 						            	 		}
							 						                    },
							 						                    'json');
								 							}else{
								 								alert('No System selected, you must select atleast one!');
			 						            	 			isSystem = false;
								 							}
								 							
															$(this).dialog("close"); 
														},
														
            									   "Close": function() { 
            										   						$(this).dialog("close"); 
            										   				   }
            										   				   
            									 } 							
            							});
		},
 
        // system select
        system_select: function(){
            if($("input:checked").length > 0){
            	$('#systemSubmit').css('border-color', '');
            	return true;
            }else{
            	// flag the field
            	$('#systemSubmit').css('border-color', 'red');
            	return false;
            }
        },
        
        // update a Contact
        updateContact: function(){
            var newContacts = {
            		cntct_first_nm: $('#cntct_first_nmInput').val(),
            		cntct_last_nm: $('#cntct_last_nmInput').val(),
            		cntct_title: $('#cntct_titleInput').val(),
            		cntct_wrk_phn: $('#cntct_wrk_phnInput').val(),
            		cntct_cell_phn: $('#cntct_cell_phnInput').val(),
            		cntct_fax_num: $('#cntct_fax_numInput').val(),
            		cntct_address1: $('#cntct_address1Input').val(),
            		cntct_address2: $('#cntct_address2Input').val(),
            		cntct_city: $('#cntct_cityInput').val(),
            		cntct_state_cd: $('#cntct_state_cdDD').val(),
            		cntct_zip_cd: $('#cntct_zip_cdInput').val(),
            		cntct_email: $('#cntct_emailInput').val(),
            		cntct_verified_dt: $('#cntct_verified_dtInput').val(),
            		cntct_wrk_phn_ext: $('#cntct_wrk_phn_extInput').val()
            };
            // check them fields before the update 
            Ok = this.validateFields();
            if(Ok){
	            if(confirm("Are you sure you want to update this Contact?")) {           	
	                $.post('updateContact',
	                		bfdsmgr.util.flattenObject(newContacts),
	                        function (data) {
	                            if(data.true_false){
	                            	bfdsmgr.contacts.updateContactSuccess(data);
	                            } else {
	                                bfdsmgr.contacts.updateContactFail(data);
	                            }
	                        },
	                        'json');
	            }
            }else{
                $('#successMessage').html("Fail! There are one or more invalid fields!");
                $('#success').removeClass('bfdsHidden');
            }
        },

        updateContactSuccess: function(data){
            $('#successMessage').html('You have successfully updated the Contact.');
            $('#success').removeClass('bfdsHidden');
        },

        updateContactFail: function(data){
            $('#successMessage').html("Fail! This Contact was not updated!");
            $('#success').removeClass('bfdsHidden');
        },

        validateFields: function(){
        	if(this.system_select() == true ) 
        	   if (this.cntct_first_nm() == true )
        		   if (this.cntct_last_nm() == true )
        			   if (this.cntct_title() == true )
        				   if (this.cntct_city() == true )
        					   if (this.cntct_state_cd() == true )
        						   if (this.cntct_zip_cd() == true )
        							   if (this.cntct_verified_dt() == true ){
        		return true;
        	}else{ 
        		return false;}
        	
        },
        
                                                
    };
})();