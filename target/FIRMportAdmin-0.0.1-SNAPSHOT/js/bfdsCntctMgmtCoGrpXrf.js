if (typeof bfdsmgr == 'undefined') {
    bfdsmgr = {};
}

bfdsmgr.contacts = (function() {
	/*
	 * The _MOUNT is the attach point found at the bottom of the view page
	 */
    var _MOUNT = "currentCntctMgmtCoGrpXrf";
    var _grid = null;
    var _rowClassName = null;
    var isSystem 	= false;
    
    return {
        // initializes the header text of the filtered grid
        initializeFilteredGrid: function(){
        	var layout = new Array(
                {field: "cntct_first_nm", name: "First Name", width: "30px", headerClasses: "bfdsmgrBoldText"},
                {field: "cntct_last_nm", name: "Last Name", width: "30px", headerClasses: "bfdsmgrBoldText"},
                {field: "mgmt_co_short_nm", name: "Company", width: "30px", headerClasses: "bfdsmgrBoldText"},
                {field: "cntct_grp_cd", name: "Group", width: "40px", headerClasses: "bfdsmgrBoldText"},
                {field: "cntct_id", name: "Hidden Id", width: "0px", hidden: true, headerClasses: "bfdsHidden"},
                {field: "mgmt_co_id", name: "Hidden Id", width: "0px", hidden: true, headerClasses: "bfdsHidden"}
            );

            var url = 'showAllCntctMgmtCoGrpXrf';
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
        	window.parent.setFieldPage('editCntctMgmtCoGrpXrfPage');
        },
        
        /*
         *  adds an Contact Company Group Xrf no data to pass it's already in the controller
         */ 
        addCntctMgmtCoGrpXrf: function(){
            if(confirm("Are you sure you want to add this Contact Company Group Xrf?")) {           	
                $.post('addCntctMgmtCoGrpXrf',
                         function (data) {
                            if(data.true_false){
                            	bfdsmgr.contacts.addCntctMgmtCoGrpXrfSuccess(data);
                            } else {
                                bfdsmgr.contacts.addCntctMgmtCoGrpXrfFail(data);
                            }
                        },
                        'json');
            }
        },

        addCntctMgmtCoGrpXrfSuccess: function(data){
            $('#successMessage').html('You have successfully added the Contact Company Group Xrf.');
            $('#success').removeClass('bfdsHidden');
        },

        addCntctMgmtCoGrpXrfFail: function(data){
            if(data.duplicate){
                $('#successMessage').html('Fail! This Contact Company Group Xrf already exists.');
            } else {
                $('#successMessage').html("Fail! This Contact Company Group Xrf was not created");
            }
            $('#success').removeClass('bfdsHidden');
        },

		companyDialog: function(){
          	$('#companyDialog').dialog({ height: 400, 
        	  						     width: 300, 
        	  						     maxHeight: 400, 
        	  						     modal: true, 
             							 buttons: { "Ok": function() {
								 							var nxtRdBx = 0;
								 							var foundThese = '';
								 							var outPut = '';
								 							var lstComma = 0;
								 							
								 							while(true){
								 								if(document.getElementById('companyRdb' + nxtRdBx) != null){
								 									if(document.getElementById('companyRdb' + nxtRdBx).checked){
								 										foundThese += document.getElementById('companyRdb' + nxtRdBx).value + ',';
								 									}
								 								}else{
								 									break;
								 								}
								 								nxtRdBx++;
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
        
        contactDialog: function(){
          	$('#contactDialog').dialog({ height: 400, 
        	  						     width: 200, 
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
        
        // cntct_first_nm
        cntct_first_nm: function(){
        	var Ok = false;
            if($('#cntct_first_nmInput').val().length > 0){
            	$('#cntct_first_nmInput').css('border-color', '');
            	OK = true;
            }else{
            	// flag the field
            	$('#cntct_first_nmInput').css('border-color', 'red');
            	OK = false;
            }
        	return Ok;
        },
                        
        // cntct_last_nm
        cntct_last_nm: function(){
        	var Ok = false;
            if($('#cntct_last_nmInput').val().length > 0){
            	$('#cntct_last_nmInput').css('border-color', '');
            	OK = true;
            }else{
            	// flag the field
            	$('#cntct_last_nmInput').css('border-color', 'red');
            	OK = false;
            }
        	return Ok;
        },
                        
        // cntct_title
        cntct_title: function(){
        	var Ok = false;
            if($('#cntct_titleInput').val().length > 0){
            	$('#cntct_titleInput').css('border-color', '');
            	OK = true;
            }else{
            	// flag the field
            	$('#cntct_titleInput').css('border-color', 'red');
            	OK = false;
            }
        	return Ok;
        },
                        
        // cntct_city
        cntct_city: function(){
        	var Ok = false;
            if($('#cntct_cityInput').val().length > 0){
            	$('#cntct_cityInput').css('border-color', '');
            	OK = true;
            }else{
            	// flag the field
            	$('#cntct_cityInput').css('border-color', 'red');
            	OK = false;
            }
        	return Ok;
        },
                        
        // cntct_state_cd
        cntct_state_cd: function(){
        	var Ok = false;
            if($('#cntct_state_cdDD').val().length > 0){
            	$('#cntct_state_cdDD').css('border-color', '');
            	OK = true;
            }else{
            	// flag the field
            	$('#cntct_state_cdDD').css('border-color', 'red');
            	OK = false;
            }
        	return Ok;
        },
                        
        // cntct_state_cd
        cntct_state_cd: function(){
        	var Ok = false;
            if($('#cntct_state_cdInput').val().length > 0){
            	$('#cntct_state_cdInput').css('border-color', '');
            	OK = true;
            }else{
            	// flag the field
            	$('#cntct_state_cdInput').css('border-color', 'red');
            	OK = false;
            }
        	return Ok;
        },
                        
        // cntct_zip_cd
        cntct_zip_cd: function(){
        	var Ok = false;
            if($('#cntct_zip_cdInput').val().length > 0){
            	$('#cntct_zip_cdInput').css('border-color', '');
            	OK = true;
            }else{
            	// flag the field
            	$('#cntct_zip_cdInput').css('border-color', 'red');
            	OK = false;
            }
        	return Ok;
        },
                        
        // cntct_verified_dt
        cntct_verified_dt: function(){
        	var Ok = false;
        	if(bfdsmgr.util.isDate($('#cntct_verified_dtInput').val())){
            	$('#cntct_verified_dtInput').css('border-color', '');
            	OK = true;
            }else{
            	// flag the field
            	$('#cntct_verified_dtInput').css('border-color', 'red');
            	OK = false;
            }
        	return Ok;
        },
        
        editContactMgmtcoGrpXrfPage: function(){
            $.ajax({
                 type: "GET",
                 url: 'editCntctMgmtCoGrpXrf',
                 dataType: "json",
                 cache: false,
                 success: function(data){

                 	var numRdBx = $('#companyDialog > input').size();                	
                 	// loop the check box values setting matches
                 	for(var rdbx=0; rdbx < numRdBx; rdbx++){
                     	if($('#companyRdb' + rdbx).val() == data.mgmt_co_id){
                     		$('#companyRdb' + rdbx).prop('checked', true);
                     	}                		
                 	}
                 	
                 	var numRdbx = $('#groupDialog > input').size();                	
                 	// loop the check box values setting matches
                 	for(var rdbx=0; rdbx < numRdbx; rdbx++){
                     	if($('#groupRdb' + rdbx).val() == data.cntct_grp_cd){
                     		$('#groupRdb' + rdbx).prop('checked', true);
                     	}                		
                 	}
                 	
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
                    		if(_val == bfdsmgr.util.trim(data[st].cntct_id)){
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
        
        getCntCtCompany: function(_val){
	            $.ajax({
	                type: "GET",
	                url: 'getCntCtCompany',
	                dataType: "json",
	                cache: false,
	                success: function(data){               
	
	                	for(var st=0; st < data.length; st++){
	                    	if (typeof _val == 'undefined') {
	                    		$('<input id=companyRdb' + st + ' name=companyRdb value=' + data[st].mgmt_co_id + ' type="radio">' +
	                    				data[st].mgmt_co_short_nm + ' - ' + data[st].mgmt_co_long_nm + '</input><br/>').appendTo($('#companyDialog')).get(0);
	                    	}else{
	                    		if(_val == bfdsmgr.util.trim(data[st].mgmt_co_id)){
	                        		$('<input id=companyRdb' + st + ' name=companyRdb value=' + data[st].mgmt_co_id + ' type="radio" selected>' + 
	                        				data[st].mgmt_co_short_nm + ' - ' + data[st].mgmt_co_long_nm + '</input><br/>').appendTo($('#companyDialog')).get(0);
	                    		}else{
	                        		$('<input id=companyRdb' + st + ' name=companyRdb value=' + data[st].mgmt_co_id + ' type="radio">' + 
	                        				data[st].mgmt_co_short_nm + ' - ' + data[st].mgmt_co_long_nm + '</input><br/>').appendTo($('#companyDialog')).get(0);
	                    		}
	                    	}                		
	                	}
	                	
	                }
	            });        	
        },
        
        getCntctGroup: function(_val){
            $.ajax({
                type: "GET",
                url: 'getCntctGroup',
                dataType: "json",
                cache: false,
                success: function(data){               

                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<input id=groupRdb' + st + ' name=groupRdb value=' + data[st].cntct_grp_cd + ' type="radio">' +
                    				data[st].cntct_grp_dsc + '</input><br/>').appendTo($('#groupDialog')).get(0);
                    	}else{
                    		if(_val == bfdsmgr.util.trim(data[st].cntct_grp_cd)){
                        		$('<input id=groupRdb' + st + ' name=groupRdb value=' + data[st].cntct_grp_cd + ' type="radio" selected>' + 
                        				data[st].cntct_grp_dsc + '</input><br/>').appendTo($('#groupDialog')).get(0);
                    		}else{
                        		$('<input id=groupRdb' + st + ' name=groupRdb value=' + data[st].cntct_grp_cd + ' type="radio">' + 
                        				data[st].cntct_grp_dsc + '</input><br/>').appendTo($('#groupDialog')).get(0);
                    		}
                    	}                		
                	}
                	
                }
            });        	
        },
    
		groupDialog: function(){
          	$('#groupDialog').dialog({ height: 400, 
        	  						     width: 300, 
        	  						     maxHeight: 400, 
        	  						     modal: true, 
             							 buttons: { "Ok": function() {
								 							var nxtRdb = 0;
								 							var foundThese = '';
								 							var outPut = '';
								 							var lstComma = 0;
								 							
								 							while(true){
								 								if(document.getElementById('groupRdb' + nxtRdb) != null){
								 									if(document.getElementById('groupRdb' + nxtRdb).checked){
								 										foundThese += document.getElementById('groupRdb' + nxtRdb).value + ',';
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
									 							
									 							var newGroup = {
									 					        		sel_group_id: outPut
									 						     };
							 						             $.post('saveCntctGroup',
							 						             		bfdsmgr.util.flattenObject(newGroup),
							 						                    function (data) {
							 						            	 		if(data.true_false){
							 						            	 			isGroup = true;
							 						            	 		}else{
							 						            	 			isGroup = false;
							 						            	 		}
							 						                    },
							 						                    'json');
             							 					}else{
             							 						alert('No group selected, you must select atleast one!');
             							 						isGroup = false;
             							 					}
								 							
								 							$(this).dialog("close"); 
								 						 },
     									   			"Close": function() { 
     									   									$(this).dialog("close"); 
     									   								}
     									          } 							
        	  						     });
        },
        
        /*
        	update a Contact Group Xref
        	There are only two items to update the Company and Group both
        	have been stored in the controller. This call collects those
        	changes and performs the MyBatis update
        */
        updateCntctMgmtCoGrpXrf: function(){
	            if(confirm("Are you sure you want to update this Contact Group Xref?")) {           	
	                $.post('updateCntctMgmtCoGrpXrf',
	                        function (data) {
	                            if(data.true_false){
	                            	bfdsmgr.contacts.updateContactSuccess(data);
	                            } else {
	                                bfdsmgr.contacts.updateContactFail(data);
	                            }
	                        },
	                        'json');
	            }
        },

        updateContactSuccess: function(data){
            $('#successMessage').html('You have successfully updated the Contact Group Xref.');
            $('#success').removeClass('bfdsHidden');
        },

        updateContactFail: function(data){
            $('#successMessage').html("Fail! This Contact Group Xref was not updated!");
            $('#success').removeClass('bfdsHidden');
        },

        setSearchInput : function(_cntct_id, _mgmt_co_id, _cntct_grp_cd){
            var srchData = {
            	cntct_id: _cntct_id,
            	mgmt_co_id: _mgmt_co_id,
            	cntct_grp_cd: _cntct_grp_cd
            };
        	$.post('setCntctGrpXrefRowToEdit',
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
        	var cntct_grp_cd;

        	if(navigator.appName == 'Netscape'){
        		cntct_grp_cd = escape(data.cells[3].childNodes[0].wholeText);
            	cntct_id     = escape(data.cells[4].childNodes[0].wholeText);
        		mgmt_co_id   = escape(data.cells[5].childNodes[0].wholeText);
        	}else{
            	cntct_id   = escape(data.cells[3].innerHTML);
            	cntct_id   = escape(data.cells[4].innerHTML);
            	mgmt_co_id = escape(data.cells[5].innerHTML);
        	}
        	this.setSearchInput(cntct_id, mgmt_co_id, cntct_grp_cd);
        	$('tr').removeClass('gridRowHighlight');
        	data.className = "gridRowHighlight";
        },
        
        // system select
        system_select: function(){
        	var Ok = false;
            if(isSystem){
            	$('#systemSubmit').css('border-color', '');
            	OK = true;
            }else{
            	// flag the field
            	$('#systemSubmit').css('border-color', 'red');
            	OK = false;
            }
        	return Ok;
        },
                        
        validateFields: function(){
        	var Ok = true;
        	if((this.system_select() == true ) &&
        	   (this.cntct_first_nm() == true ) &&
        	   (this.cntct_last_nm() == true ) &&
        	   (this.cntct_title() == true ) &&
        	   (this.cntct_city() == true ) &&
        	   (this.cntct_state_cd() == true ) &&
        	   (this.cntct_zip_cd() == true ) &&
        	   (this.cntct_verified_dt() == true )){
        		Ok = true;
        	}else{ 
        		Ok = false;}
        	
            return Ok;        	
        }        
                        
    };
})();