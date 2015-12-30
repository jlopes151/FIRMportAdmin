if (typeof bfdsmgr == 'undefined') {
    bfdsmgr = {};
}

bfdsmgr.excptn = (function() {
	/*
	 * The _MOUNT is the attach point found at the bottom of the view page
	 */
    var _MOUNT = "currentExceptions";
    var _grid = null;
    var _rowClassName = null;
    
    return {
        /*
         * using the field_cd + firm_mgmt_co_id to identify a single row to edit
         */
        initializeFilteredGrid: function(){
        	var layout = new Array(
                {field: "field_cd", name: "Field", width: "40px", headerClasses: "bfdsmgrBoldText"},
                {field: "firm_mgmt_co_id", name: "Hidden Id", width: "60px", hidden: true, headerClasses: "bfdsHidden"},
                {field: "mgmt_co_short_nm", name: "Company", width: "40px", headerClasses: "bfdsmgrBoldText"},
                {field: "short_nm", name: "System", width: "40px", headerClasses: "bfdsmgrBoldText"},
                {field: "excep_dsc", name: "Exception Description", width: "380px", headerClasses: "bfdsmgrBoldText"}
            );

            var url = 'showAllExceptions';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){
                        _grid = new FilteredPagedGrid({
			                        pageSize: 15,
			                        attachPoint: document.getElementById(_MOUNT),
			                        structure: layout,
			                        defaultSort: 'field_cd',
			                        filterLabel: 'Field cd',
			                        data: data,
			                        filterColumn: 'field_cd',
			                        width: "800px",
			                        className: "pagedGridBorder"
			                    });
		                $('#loading').addClass('bfdsHidden');
		                $('#title').removeClass('bfdsHidden');
                }
            });            
        },
        
        activateEditPage: function(data){
        	window.parent.setFieldPage('editExceptionsPage');
        },
                        
        // adds an Exceptions
        addException: function(){
            var newExceptions = {
            		excep_dsc: $('#excptn_dscInput').val(),
            };
            if(confirm("Are you sure you want to add this Exception?")) {           	
                $.post('addException',
                		bfdsmgr.util.flattenObject(newExceptions),
                        function (data) {
                            if(data.true_false){
                            	bfdsmgr.excptn.addExceptionsSuccess(data);
                            } else {
                                bfdsmgr.excptn.addExceptionsFail(data);
                            }
                        },
                        'json');
            }
        },

        addExceptionsSuccess: function(data){
            $('#successMessage').html('You have successfully added the Exception.');
            $('#success').removeClass('bfdsHidden');
        },

        addExceptionsFail: function(data){
            $('#successMessage').html("Fail! This Exceptions was not created.<br/>" + data.message);
            $('#success').removeClass('bfdsHidden');
        },

		companyDialog: function(){
          	$('#companyDialog').dialog({ height: 400, 
        	  						     width: 200, 
        	  						     maxHeight: 400, 
        	  						     modal: true, 
             							 buttons: { "Ok": function() {
								 							var nxtChkBx = 0;
								 							var foundThese = '';
								 							var outPut = '';
								 							var lstComma = 0;
								 							
								 							while(true){
								 								if(document.getElementById('companyRdb' + nxtChkBx) != null){
								 									if(document.getElementById('companyRdb' + nxtChkBx).checked){
								 										foundThese += document.getElementById('companyRdb' + nxtChkBx).value + ',';
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
									 							
									 							var newCompanies = {
									 					        		sel_company: outPut
									 						     };
							 						             $.post('excptnSaveCompany',
							 						             		bfdsmgr.util.flattenObject(newCompanies),
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
        
        deleteException: function(data){
        	$.post('deleteException',
                    function (data) {        	
                        if(data.true_false){
            				$('#successMessage').html('You have deleted the Exception, company cross reference.');
            	            $('#success').removeClass('bfdsHidden');
                        }else{
            				$('#successMessage').html('Error: failed to delete the Exception, company cross reference.' + '\n' + data.message);
            	            $('#success').removeClass('bfdsHidden');
                        }                    
                    },
                    'json');
        },

        // sets the edit event view from the filter grid
        editExceptionsPage: function(){
               $.ajax({
                    type: "GET",
                    url: 'editExceptions',
                    dataType: "json",
                    cache: false,
                    success: function(data){
                    	$('#excptn_dscInput').val(data.excep_dsc);
                    }
                });
        },
        
        fieldDialog: function(){
			$('#fieldDialog').dialog({ height: 400, 
            							width: 400, 
            							maxHeight: 400, 
            							modal: true,
            							buttons: { "Ok": function() { 
															var value = '';
															var nxtRdbBt = 0;
															
								 							while(true){
								 								if(document.getElementById('fieldRdb' + nxtRdbBt) != null){
								 									if(document.getElementById('fieldRdb' + nxtRdbBt).checked){
								 										value = document.getElementById('fieldRdb' + nxtRdbBt).value;
								 										break;
								 									}
								 								}else{
								 									break;
								 								}
								 								nxtRdbBt++;
								 							}
								 							
								 							if(value.length > 0){
									 							var newField = {
									 					        	sel_field: value
									 						     };
							 						             $.post('excptnSaveField',
							 						             		bfdsmgr.util.flattenObject(newField),
							 						                    function (data) {
							 						            	 		if(data.true_false){
							 						            	 			isSystem = true;
							 						            	 		}else{
							 						            	 			isSystem = false;
							 						            	 		}
							 						                    },
							 						                    'json');
								 							}else{
								 								alert('No Field selected, you must select atleast one!');
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
         
        getFields: function(_val){
            $.ajax({
                type: "GET",
                url: 'getFields',
                dataType: "json",
                cache: false,
                success: function(data){               

                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<input id=fieldRdb' + st + ' name=fieldRdb value=' + data[st].field_cd + ' type="radio">' + data[st].field_dsc + '</input><br/>').appendTo($('#fieldDialog')).get(0);
                    	}else{
                    		if(_val == bfdsmgr.util.trim(data[st].field_cd)){
                        		$('<input id=fieldRdb' + st + ' name=fieldRdb value=' + data[st].field_cd + ' type="radio" selected>' + data[st].field_dsc + '</input><br/>').appendTo($('#fieldDialog')).get(0);
                    		}else{
                        		$('<input id=fieldRdb' + st + ' name=fieldRdb value=' + data[st].field_cd + ' type="radio">' + data[st].field_dsc + '</input><br/>').appendTo($('#fieldDialog')).get(0);
                    		}
                    	}                		
                	}
                	
                }
            });        	
        },
        
        // now call Firms url in the UtilController
        getSystem: function(_val){
            $.ajax({
                type: "GET",
                url: 'getSystem',
                dataType: "json",
                cache: false,
                success: function(data){               

                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<input id=systemRdb' + st + ' name=systemRdb value=' + data[st].firm_id + ' type="radio">' + 
                    				data[st].short_nm + '</input><br/>').appendTo($('#systemDialog')).get(0);
                    	}else{
                    		if(_val == bfdsmgr.util.trim(data[st].alert_typ_cd)){
                        		$('<input id=systemRdb' + st + ' name=systemRdb value=' + data[st].firm_id + ' type="radio" selected>' + 
                        				data[st].short_nm + '</input><br/>').appendTo($('#systemDialog')).get(0);
                    		}else{
                        		$('<input id=systemRdb' + st + ' name=systemRdb value=' + data[st].firm_id + ' type="radio">' + 
                        				data[st].short_nm + '</input><br/>').appendTo($('#systemDialog')).get(0);
                    		}
                    	}                		
                	}
                	
                }
            });        	
        },
        
        // now call System url in the UtilController
        getCompany: function(data){
            $.ajax({
                type: "GET",
                url: 'getCompany',
                dataType: "json",
                cache: false,
                success: function(data){               

                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<input id=companyRdb' + st + ' name=companyRdb value=' + data[st].mgmt_co_id + ' type="radio">' +
                    				data[st].ta2000_sys_cd + '</input><br/>').appendTo($('#companyDialog')).get(0);
                    	}else{
                    		if(_val == bfdsmgr.util.trim(data[st].alert_typ_cd)){
                        		$('<input id=companyRdb' + st + ' name=companyRdb value=' + data[st].mgmt_co_id + ' type="radio" selected>' + 
                        				data[st].ta2000_sys_cd + '</input><br/>').appendTo($('#companyDialog')).get(0);
                    		}else{
                        		$('<input id=companyRdb' + st + ' name=companyRdb value=' + data[st].mgmt_co_id + ' type="radio">' + 
                        				data[st].ta2000_sys_cd + '</input><br/>').appendTo($('#companyDialog')).get(0);
                    		}
                    	}                		
                	}
                	
                }
            });        	
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
							 						             $.post('excptnSaveSystem',
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
         
        // update an Exceptions
        updateException: function(){
            var newExceptions = {
            		excep_dsc: $('#excptn_dscInput').val(),
            };
            if(confirm("Are you sure you want to update this Exception?")) {           	
                $.post('updateException',
                		bfdsmgr.util.flattenObject(newExceptions),
                        function (data) {
                            if(data.true_false){
                            	bfdsmgr.excptn.updateExceptionsSuccess(data);
                            } else {
                                bfdsmgr.excptn.updateExceptionsFail(data);
                            }
                        },
                        'json');
            }
        },

        updateExceptionsSuccess: function(data){
            $('#successMessage').html('You have successfully updated the Exception.');
            $('#success').removeClass('bfdsHidden');
        },

        updateExceptionsFail: function(data){
            $('#successMessage').html("Fail! This Exceptions was not updated.<br/>" + data.message);
            $('#success').removeClass('bfdsHidden');
        },
        
        setSearchInput : function(field_cd, firm_mgmt_co_id){
            var srchData = {
        		field_cd: field_cd,
        		firm_mgmt_co_id: firm_mgmt_co_id
            };
        	$.post('setExceptionRowToEdit',
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
        	var field_cd;
        	var firm_mgmt_co_id;
        	
        	if(navigator.appName == 'Netscape'){
	        	field_cd = escape(data.cells[0].childNodes[0].wholeText);
	        	firm_mgmt_co_id = escape(data.cells[1].childNodes[0].wholeText);
        	}else{
	        	field_cd = escape(data.cells[0].innerHTML);
	        	firm_mgmt_co_id = escape(data.cells[1].innerHTML);
        	}
        	this.setSearchInput(field_cd, firm_mgmt_co_id);
        	$('tr').removeClass('gridRowHighlight');
        	data.className = "gridRowHighlight";
        },
        
    };
})();