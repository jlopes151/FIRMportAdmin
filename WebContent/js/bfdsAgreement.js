if (typeof bfdsmgr == 'undefined') {
    bfdsmgr = {};
}

bfdsmgr.agree = (function() {
	/*
	 * The _MOUNT is the attach point found at the bottom of the view page
	 */
    var _MOUNT = "currentAgreement";
    var _grid = null;
    var _rowClassName = null;
    var isSystem 	= false;
    var isMaxDsc    = true;
    
    return {
        // initializes the header text of the filtered grid
        initializeFilteredGrid: function(){
        	var layout = new Array(
                {field: "agre_typ_cd", name: "Type", width: "40px", headerClasses: "bfdsmgrBoldText"},
                {field: "agre_eff_dt", name: "Effective Date", width: "40px", headerClasses: "bfdsmgrBoldText"},
                {field: "agre_term", name: "Term", width: "60px", headerClasses: "bfdsmgrBoldText"},
                {field: "agre_parties", name: "Parties", width: "50px", headerClasses: "bfdsmgrBoldText"},
                {field: "agre_state_cd", name: "State Law", width: "20px", headerClasses: "bfdsmgrBoldText"},
                {field: "fee_agre", name: "Fee", width: "50px", headerClasses: "bfdsmgrBoldText"},
                {field: "agre_id", name: "Hidden Id", width: "60px", hidden: true, headerClasses: "bfdsHidden"},
                {field: "firm_mgmt_co_id", name: "Hidden Id", width: "60px", hidden: true, headerClasses: "bfdsHidden"}
            );

            var url = 'showAllAgreements';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){
                        _grid = new FilteredPagedGrid({
			                        pageSize: 3,
			                        attachPoint: document.getElementById(_MOUNT),
			                        structure: layout,
			                        defaultSort: 'agre_typ_cd',
			                        filterLabel: 'Type',
			                        data: data,
			                        filterColumn: 'agre_typ_cd',
			                        width: "800px",
			                        className: "pagedGridBorder"
			                    });
		                $('#loading').addClass('bfdsHidden');
		                $('#title').removeClass('bfdsHidden');
                }
            });            
        },
        
        activateEditPage: function(data){
        	window.parent.setFieldPage('editAgreementPage');
        },
                        
        // adds an alert
        addAgreement: function(){
        	// start validation here
	            var newAgreement = {
            		agre_eff_dt: $('#agre_eff_dtInput').val(),
            		agre_term: $('#agre_termInput').val(),
            		agre_parties: $('#agre_partiesInput').val(),
            		agre_state_cd: $('#agre_state_cdDD').val(),
            		fee_agre: $('#fee_agreInput').val()
	            };
	            if(confirm("Are you sure you want to add this Agreement?")) {           	
	                $.post('addAgreement',
	                		bfdsmgr.util.flattenObject(newAgreement),
	                        function (data) {
	                            if(data.true_false){
	                                $('#successMessage').html('You have successfully added the Agreement.');
	                                $('#success').removeClass('bfdsHidden');
	                            } else {
	                                $('#successMessage').html('There was an error adding the Agreement.');
	                                $('#success').removeClass('bfdsHidden');
	                            }
	                        },
	                        'json');
	            }
	       // validation else or end     
        },

        agreeTypeDialog: function(){
          	$('#agreeTypeDialog').dialog({ height: 400, 
        	  							   width: 400, 
        	  							   maxHeight: 400, 
        	  							   modal: true, 
               							   buttons: { "Ok": function() { 
															var value = '';
															var nxtRdbBt = 0;
															
									 							while(true){
									 								if(document.getElementById('agreeTypeRdb' + nxtRdbBt) != null){
									 									if(document.getElementById('agreeTypeRdb' + nxtRdbBt).checked){
									 										value = document.getElementById('agreeTypeRdb' + nxtRdbBt).value;
									 										break;
									 									}
									 								}else{
									 									break;
									 								}
									 								nxtRdbBt++;
									 							}
									 							
									 						if(value.length > 0){	
									 							var newAgreeType = {
									 									sel_agretype: value
									 						     };
							 						             $.post('agreeSaveAgreType',
							 						             		bfdsmgr.util.flattenObject(newAgreeType),
							 						                    function (data) {
							 						            	 		if(data.true_false){
							 						            	 			isAgreeType = true;
							 						            	 		}else{
							 						            	 			isAgreeType = false;
							 						            	 		}
							 						                    },
							 						                    'json');
									 						}else{
									 							alert('No Agreement Type selected, you must select one type!');
			 						            	 			isAgreementType = false;
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
        	  						     width: 400, 
        	  						     maxHeight: 400, 
        	  						     modal: true, 
             							 buttons: { "Ok": function() {
								 							var nxtRdb = 0;
								 							var foundThese = '';
								 							var outPut = '';
								 							var lstComma = 0;
								 							
								 							while(true){
								 								if(document.getElementById('companyRdb' + nxtRdb) != null){
								 									if(document.getElementById('companyRdb' + nxtRdb).checked){
								 										foundThese += document.getElementById('companyRdb' + nxtRdb).value + ',';
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
									 							
									 							var newCompany = {
									 					        		sel_company: outPut
									 						     };
							 						             $.post('agreeSaveCompany',
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
             							 						alert('No company selected, you must select one!');
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
        
        deleteAgreement: function(id){
	         if(confirm("Are you sure you want to delete this Agreement?")) {
	             $.post('deleteAgreement',
	                    {alert_id: id},
	                    function(data){
	                         bfdsmgr.alert.deleteAgreementSuccess(data);
	                    },
	                    'json');
	         }
	    },
	
	    deleteAgreementSuccess: function(data){
	        if (data.true_false){
	             $('#success').html('Agreement Successfully Deleted');
	        } else {
	             $('#success').html('FAIL! Agreement Not Deleted');
	        }
	         $('#eventLookup').val('');
	    },
     
        editAgreementPage: function(){
            $.ajax({
                 type: "GET",
                 url: 'editAgreement',
                 dataType: "json",
                 cache: false,
                 success: function(data){
                	 
                    bfdsmgr.alert.editAgreementMgmtCo();

                	var numRdbx = $('#alertTypeDialog > input').size();                	
                	// loop the check box values setting matches
                	for(var rdbx=0; rdbx < numRdbx; rdbx++){
                    	if($('#alertTypeRdb' + rdbx).val() == data.alert_typ_cd){
                    		$('#alertTypeRdb' + rdbx).prop('checked', true);
                    	}                		
                	}
                    $('#alert_dscInput').val(bfdsmgr.util.trim(data.alert_dsc));
             		$('#alert_titleInput').val(bfdsmgr.util.trim(data.alert_title));
             		
                 }
             });
        },
        	
        getAgreeType: function(_val){
            $.ajax({
                type: "GET",
                url: 'getAgreeTypes',
                dataType: "json",
                cache: false,
                success: function(data){               

                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<input id=agreeTypeRdb' + st + ' name=agreeTypeRdb value=' + data[st].agre_typ_cd + ' type="radio">' + 
                    				data[st].agre_typ_dsc + '</input><br/>').appendTo($('#agreeTypeDialog')).get(0);
                    	}else{
                    		if(_val == bfdsmgr.util.trim(data[st].agre_typ_cd)){
                        		$('<input id=agreeTypeRdb' + st + ' name=agreeTypeRdb value=' + data[st].agre_typ_cd + ' type="radio" selected>' + 
                        				data[st].agre_typ_dsc + '</input><br/>').appendTo($('#agreeTypeDialog')).get(0);
                    		}else{
                        		$('<input id=agreeTypeRdb' + st + ' name=agreeTypeRdb value=' + data[st].agre_typ_cd + ' type="radio">' + 
                        				data[st].agre_typ_dsc + '</input><br/>').appendTo($('#agreeTypeDialog')).get(0);
                    		}
                    	}                		
                	}
                	
                }
            });        	
        },
               
        getCompany: function(_val){
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
                    		if(_val == bfdsmgr.util.trim(data[st].mgmt_co_id)){
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
            		$('<option value=>-- Select State --</option>').appendTo($('#agre_state_cdDD')).get(0);
                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<option value=' + data[st].state_cd + '>' + data[st].state_dsc + '</option>').appendTo($('#agre_state_cdDD')).get(0);
                    	}else{
                    		if(_val == bfdsmgr.util.trim(data[st].state_cd)){
                        		$('<option value=' + data[st].state_cd + ' selected>' + data[st].state_dsc + '</option>').appendTo($('#agre_state_cdDD')).get(0);
                    		}else{
                        		$('<option value=' + data[st].state_cd + '>' + data[st].state_dsc + '</option>').appendTo($('#agre_state_cdDD')).get(0);
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
							 						             $.post('agreeSaveSystem',
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
								 								alert('No System selected, you must select one!');
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
 
        setSearchInput : function(agre_id, firm_mgmt_co_id){
            var srchData = {
        		agre_id: agre_id,
        		firm_mgmt_co_id: firm_mgmt_co_id
            };
        	$.post('setAgreementRowToEdit',
        		bfdsmgr.util.flattenObject(srchData),
                function (data) {        	
                    if(!data.true_false){
        	            $('#success').removeClass('bfdsHidden');
        				$('#successMessage').html('Error: failed to find the alert');
                    }                    
                },
                'json');
        },
        
        /*
         * set the short name record to edit, a change in the table member list
         * may cause this to be out of sync
         * This is getting the shor name in the table row
         */
        setRowToEdit: function(data){
        	var agre_id;
        	var firm_mgmt_co_id;

        	if(navigator.appName == 'Netscape'){
            	agre_id = escape(data.cells[6].childNodes[0].wholeText);
            	firm_mgmt_co_id = escape(data.cells[7].childNodes[0].wholeText);
        		
        	}else{
            	agre_id = escape(data.cells[6].innerHTML);
            	firm_mgmt_co_id = escape(data.cells[7].innerHTML);
        	}
        	
        	this.setSearchInput(agre_id, firm_mgmt_co_id);
        	$('tr').removeClass('gridRowHighlight');
        	data.className = "gridRowHighlight";
        },
        
	    updateAgreement: function(){
	         var newAgreement = {
	        	alert_dsc: $('#alert_dscInput').val()
	         };
	         if(confirm("Are you sure you want to update this Agreement?")) { 
	        	 /*
	        	  *  The updated company selections are set when the user select ok
	        	  *  on the company dialog. the same for the alert type dialog.
	        	  *  
	        	  *  The title and system value are not to be changed so only the description
	        	  *  is changed, The changes to the comany and alert type are set in the 
	        	  *  controller 
	        	  *  
	        	  */ 
	             $.post('updateAgreement',
	             		bfdsmgr.util.flattenObject(newAgreement),
	                     function (data) {
	                         if(data.true_false){
	                	         $('#successMessage').html('You have successfully updated the Agreement.');
	                	         $('#success').removeClass('bfdsHidden');
	                         } else {
	                	         $('#successMessage').html('Fail! There has been an error.');
	                	         $('#success').removeClass('bfdsHidden');
	                         }
	                     },
	                     'json');
	         }
	    },

        validateTitle: function(){
    		if(!$('#alert_titleInput').val().length > 0){
    			isTitle = false;
    		}else{
    			isTitle = true;
    		}
        },
        
        validateSubmit: function(){
        	var errorMsg;
        	if(isSystem && isCompany && isAgreementType && isMaxDsc && isTitle){
                return true;      		
        	}else{
        		errorMsg = '<ul>';
        		// let the user know which field failed
        		if(!isSystem){
        			errorMsg += '<li>A system was not selected.</li>';
        		}
        		if(!isCompany){
        			errorMsg += '<li>A Company was not selected.</li>';
        		}
        		if(!isAgreementType){
        			errorMsg += '<li>A Agreement Type was not selected.</li>';
        		}
        		if(!isMaxDsc){
        			errorMsg += '<li>The description is too long.</li>';
        		}        		
        		if(!isTitle){
        			errorMsg += '<li>A title is required..</li>';
        		}
        		errorMsg += '</ul>';	

        		$('#successMessage').html(errorMsg);
                $('#success').removeClass('bfdsHidden');
                return false;      		
        	}
        }
        
    };
})();