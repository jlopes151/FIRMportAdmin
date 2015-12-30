if (typeof bfdsmgr == 'undefined') {
    bfdsmgr = {};
}

bfdsmgr.alert = (function() {
	/*
	 * The _MOUNT is the attach point found at the bottom of the view page
	 */
    var _MOUNT = "currentAlert";
    var _grid = null;
    var _rowClassName = null;
    var isSystem 	= false;
    var isCompany 	= false;
    var isAlertType = false;
    var isNoGlobal  = false;
    var isNoCompany = false;
        
    return {
        // initializes the header text of the filtered grid
        initializeFilteredGrid: function(){
        	var layout = new Array(
                {field: "alert_title", name: "Alert Title", width: "200px", headerClasses: "bfdsmgrBoldText"},
                {field: "alert_typ_cd", name: "Alert Type", width: "80px", headerClasses: "bfdsmgrBoldText"},
                {field: "alert_dt", name: "Alert Date", width: "80px", headerClasses: "bfdsmgrBoldText"},
                {field: "alert_dsc", name: "Alert Description", width: "450px", headerClasses: "bfdsmgrBoldText"},
                {field: "alert_id", name: "Hidden Id", width: "60px", hidden: true, headerClasses: "bfdsHidden"}
            );

            var url = 'showAllAlerts';
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
			                        defaultSort: 'alert_title',
			                        filterLabel: 'Alert Title',
			                        data: data,
			                        filterColumn: 'alert_title',
			                        width: "800px",
			                        className: "pagedGridBorder"
			                    });
		                $('#loading').addClass('bfdsHidden');
		                $('#title').removeClass('bfdsHidden');
                }
            });            
        },
        
        activateEditPage: function(data){
        	window.parent.setFieldPage('editAlertPage');
        },
                        
        // adds an alert
        addAlert: function(){
            var newAlert = {
        		alert_title: $('#alert_titleInput').val(),
        		alert_dsc: $('#alert_dscInput').val()
            };
        	if(this.validateSubmit()){
	            if(confirm("Are you sure you want to add this Alert?")) {           	
	                $.post('addAlert',
	                		bfdsmgr.util.flattenObject(newAlert),
	                        function (data) {
	                            if(data.true_false){
/*
 * Howard wants the user to return to the view, which is activated by the
 * alertNav
 */	                            	
//	                                $('#successMessage').html(data.message);
//	                                $('#success').removeClass('bfdsHidden');
	                            	window.top.location.href="alertsNav";
	                            } else {
	                                $('#successMessage').html('There was an error adding the Alert.' + '\n' + data.message);
	                                $('#success').removeClass('bfdsHidden');
	                            }
	                        },
	                        'json');
	            }
        	}            
        },

        editAlertPage: function(){
            $.ajax({
                 type: "GET",
                 url: 'editAlert',
                 dataType: "json",
                 cache: false,
                 success: function(data){
                	 
                    bfdsmgr.alert.editAlertMgmtCo();

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

        /*
         * getting the companies from the xref that are assinged to this alert
         */
        editAlertMgmtCo: function(){
            $.ajax({
                type: "GET",
                url: 'editAlertMgmtCo',
                dataType: "html", // just using html to return a string
                cache: false,
                success: function(data){
                	
                	// split the returned company list into an array
                	var str = data.split(',');
                	// get the number of check box in the company dialog
                	var numChkbx = $('#companyDialog > input').size();
                	
                	// loop the check box values setting matches
                	for(var st=0; st < str.length; st++){
                    	for(var chbx=0; chbx < numChkbx; chbx++){
	                    	if($('#companyChkBx' + chbx).val() == str[st]){
	                    		$('#companyChkBx' + chbx).attr('checked', 'true');
	                    	}                		
                    	}
                	}
                	                	
                }
            });        	
        },
        	
        deleteAlert: function(id){
	         if(confirm("Are you sure you want to delete this alert?")) {
	             $.post('deleteAlert',
	                    function(data){
	                         bfdsmgr.alert.deleteAlertSuccess(data);
	                         // Returning to the view will cause a lose of the error message. 
	                    },
	                    'json');
	         }else{
             	window.top.location.href="alertsNav";
	         }
	    },
	
	    deleteAlertSuccess: function(data){
            if (data.true_false){
                $('#successMessage').html('You have successfully deleted the alert.');
                $('#success').removeClass('bfdsHidden');
            } else {
                $('#successMessage').html('FAIL! The alert was not deleted ' + '\n' + data.message);
                $('#success').removeClass('bfdsHidden');
            }
	    },
     
        getAlertType: function(_val){
            $.ajax({
                type: "GET",
                url: 'getAlertTypes',
                dataType: "json",
                cache: false,
                success: function(data){               

                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<input id=alertTypeRdb' + st + ' name=alerttype value=' + data[st].alert_typ_cd + ' type="radio">' + data[st].alert_typ_cd + ' - ' + 
                    				data[st].alert_typ_dsc + '</input><br/>').appendTo($('#alertTypeDialog')).get(0);
                    	}else{
                    		if(_val.ToUpperCase() == bfdsmgr.util.trim(data[st].alert_typ_cd).ToUpperCase()){
                        		$('<input id=alertTypeRdb' + st + ' name=alerttype value=' + data[st].alert_typ_cd + ' type="radio" selected>' + data[st].alert_typ_cd + 
                        				data[st].alert_typ_cd + ' - ' + '</input><br/>').appendTo($('#alertTypeDialog')).get(0);
                    		}else{
                        		$('<input id=alertTypeRdb' + st + ' name=alerttype value=' + data[st].alert_typ_cd + ' type="radio">' + data[st].alert_typ_cd + 
                        				data[st].alert_typ_cd + ' - ' + '</input><br/>').appendTo($('#alertTypeDialog')).get(0);
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
                    		if(_val == bfdsmgr.util.trim(data[st].firm_id).ToUpperCase()){
                        		$('<input id=systemRdb' + st + ' name=systemRdb value=' + data[st].firm_id + ' type="radio" selected>' + data[st].short_nm + '</input><br/>').appendTo($('#systemDialog')).get(0);
                    		}else{
                        		$('<input id=systemRdb' + st + ' name=systemRdb value=' + data[st].firm_id + ' type="radio">' + data[st].short_nm + '</input><br/>').appendTo($('#systemDialog')).get(0);
                    		}
                    	}                		
                	}
                	
                }
            });        	
        },
        
        getCompany: function(data){
            $.ajax({
                type: "GET",
                url: 'getCompany',
                dataType: "json",
                cache: false,
                success: function(data){               

                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<input id=companyChkBx' + st + ' name=companyChkBx value=' + data[st].mgmt_co_id + ' type="checkbox">' +
                    				data[st].mgmt_co_short_nm + ' - ' + data[st].mgmt_co_long_nm + '</input><br/>').appendTo($('#companyDialog')).get(0);
                    	}else{
                    		if(_val.ToUpperCase() == bfdsmgr.util.trim(data[st].mgmt_co_id).ToUpperCase()){
                        		$('<input id=companyChkBx' + st + ' name=companyChkBx value=' + data[st].mgmt_co_id + ' type="checkbox" selected>' + 
                        				data[st].mgmt_co_short_nm + ' - ' + data[st].mgmt_co_long_nm + '</input><br/>').appendTo($('#companyDialog')).get(0);
                    		}else{
                        		$('<input id=companyChkBx' + st + ' name=companyChkBx value=' + data[st].mgmt_co_id + ' type="checkbox">' + 
                        				data[st].mgmt_co_short_nm + ' - ' + data[st].mgmt_co_long_nm + '</input><br/>').appendTo($('#companyDialog')).get(0);
                    		}
                    	}                		
                	}
                	
                }
            });        	
        },
        
		companyDialog: function(){
			var isAllChecked = false;

			if(isNoCompany){
				if(!confirm("Are you sure you want to add companies to this Alert?")) {
					return;
				}
			}
			isNoCompany = false;
			isNoGlobal  = true;
			
          	$('#companyDialog').dialog({ height: 400, 
        	  						     width: 400, 
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
             							 	    	            $('#success').addClass('bfdsHidden');
             							 					}else{
             							 	    	            $('#successMessage').html('No companies were selected, a global alert will be created!');
             							 	    	            $('#success').removeClass('bfdsHidden');
             							 					}
								 							// remove the trailing comma
								 							lstComma = foundThese.lastIndexOf(',');
								 							outPut = foundThese.substring(0, lstComma);
								 							
								 							var newCompanies = {
								 					        		sel_companies: outPut
								 						     };
						 						             $.post('alertSaveCompanies',
						 						             		bfdsmgr.util.flattenObject(newCompanies),
						 						                    function (data) {
						 						            	 		if(data.true_false){
						 						            	 			isCompany = true;
						 						            	 		}else{
						 						            	 			isCompany = false;
						 						            	 		}
						 						                    },
						 						                    'json');
								 							
								 							$(this).dialog("close"); 
								 					},
     									   			"Close": function() { 
     									   						$(this).dialog("close");
     									   			}
/*								 					
								 					,
     				            					"Select All": function() { 
     												  			$(this).dialog("close"); 
     				            					}
*/     				            					
     									          }// end of buttons 							
        	  						     });
        },
        
        alertTypeDialog: function(){
          	$('#alertTypeDialog').dialog({ height: 400, 
        	  							   width: 400, 
        	  							   maxHeight: 400, 
        	  							   modal: true, 
               							   buttons: { "Ok": function() { 
															var value = '';
															var nxtRdbBt = 0;
															
									 							while(true){
									 								if(document.getElementById('alertTypeRdb' + nxtRdbBt) != null){
									 									if(document.getElementById('alertTypeRdb' + nxtRdbBt).checked){
									 										value = document.getElementById('alertTypeRdb' + nxtRdbBt).value;
									 										break;
									 									}
									 								}else{
									 									break;
									 								}
									 								nxtRdbBt++;
									 							}
									 							
									 						if(value.length > 0){	
									 							var newAlertType = {
									 									sel_alerttype: value
									 						     };
							 						             $.post('saveSelectedAlertType',
							 						             		bfdsmgr.util.flattenObject(newAlertType),
							 						                    function (data) {
							 						            	 		if(data.true_false){
							 						            	 			isAlertType = true;
							 						            	 		}else{
							 						            	 			isAlertType = false;
							 						            	 		}
							 						                    },
							 						                    'json');
									 						}else{
									 							alert('No Alert Type selected, you must select atleast one type!');
			 						            	 			isAlertType = false;
									 						}
									 						
							   								$(this).dialog("close"); 
							   						   },
     									   			  "Close": function() { 
     									   				  					$(this).dialog("close"); 
     									   				  				  }
     									   			} 							
        	  							   });
        },
        
        getShortNames: function(){
    		$( "#short_nmInput" ).autocomplete({
    			source: function( request, response ) {
    				$.ajax({
    					url: "getSystem",
    					dataType: "json",
    					data: {
    						featureClass: "P",
    						style: "full",
    						maxRows: 12,
    						name_startsWith: request.term
    					},
    					success: function( data ) {
    						response( $.map( data, function( item ) {
    							var patt1=new RegExp(request.term,"gi");
     							if(patt1.test(item.short_nm)){
    								return {
    									value: item.short_nm
    								}
     							}
    						}));
    					}
    				});
    			},
    			minLength: 2,
    			select: function( event, ui ) {
    				$( "#short_nmInput" ).val(ui.item.label);
    	            $('#successMessage').html('The Admin tool needs to validate the selected Intermediary name, click the Inter button.');
    	            $('#success').removeClass('bfdsHidden');
    			},
    			open: function() {
    				$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
    			},
    			close: function() {
    				$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
    			}
    		});
        },
        
        doFirmSrch: function(data){
            $('#success').addClass('bfdsHidden');
            $.post('doFirmSrch',
                    {short_nm: $('#short_nmInput').val()},
                    function(data){
                    	if(data.true_false){
	        				isSystem = true;
	        				$('#successMessage').html('A valid Intermediary was found!');
	        	            $('#success').removeClass('bfdsHidden');
                    	}else{
	        				isSystem = false;
	        				$('#successMessage').html('Error: No valid Intermediary waa found!');
	        	            $('#success').removeClass('bfdsHidden');
                    	}
                    },
                    'json');
        },
        
	    isMaxAlertDsc: function(data){
        	var strtest = $('#alert_dscInput').val().length;

        	if( strtest <= 1000 ){
                return true;	
			}else{
                return false;	
			}        	
        },
        
        isMinAlertDsc: function(data){
        	var strtest = $('#alert_dscInput').val().length;

        	if( strtest > 0 ){
                return false;	
			}else{
                return true;	
			}        	
        },
        
        /*
         * toggle the validation of companies vs global alert
         * if the Alert is Global it can't have Companies, if it
         * has Companes it can't be global. if the user doesn't 
         * select any companies then they are trying to create a global 
         * alert and confirmation will be displayed.
         */
        setGlobalAlert: function(data){
        	/*
        	 *  check if the isNoGlobal is set to true the user must have chosen companies,
        	 *  if they confirm the global reset the isNoCompanies to true
        	 */        	
			if(isNoGlobal){
				if(!confirm("Are you sure you want to create a global Alert?")) {
					return;
				}
			}			
        	isNoGlobal  = false;
        	isNoCompany = true;
        },
        
        setSearchInput : function(data){
            var srchData = {
            		alert_id: data
            };
        	$.post('setAlertRowToEdit',
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
        	var alert_id;

        	if(navigator.appName == 'Netscape'){
        		alert_id = escape(data.cells[4].childNodes[0].wholeText);
        	}else{
        		alert_id = escape(data.cells[4].innerHTML);
        	}
        	
        	this.setSearchInput(alert_id);
        	$('tr').removeClass('gridRowHighlight');
        	data.className = "gridRowHighlight";
        },
        
	    updateAlert: function(){
			var newAlert = {
				alert_dsc: $('#alert_dscInput').val(),
				alert_title: $('#alert_titleInput').val()
			};
			
		         if(confirm("Are you sure you want to update this Alert?")) { 
		        	 /*
		        	  *  The updated company selections are set when the user select ok
		        	  *  on the company dialog. the same for the alert type dialog.
		        	  *  
		        	  *  The title and system value are not to be changed so only the description
		        	  *  is changed, The changes to the comany and alert type are set in the 
		        	  *  controller 
		        	  *  
		        	  */ 
		             $.post('updateAlert',
		             		bfdsmgr.util.flattenObject(newAlert),
		                     function (data) {
		                         if(data.true_false){
	//	                	         $('#successMessage').html('You have successfully updated the Alert.');
	//	                	         $('#success').removeClass('bfdsHidden');
	/*
	* Howard wants the user to return to the view, which is activated by the
	* alertNav
	*/	                            	
	                          	window.top.location.href="alertsNav";
		                	         
		                         } else {
		                	         $('#successMessage').html('Fail! There has been an error.');
		                	         $('#success').removeClass('bfdsHidden');
		                         }
		                     },
		                     'json');
		         }
	    },

        validateTitle: function(){
    		if($('#alert_titleInput').val().length > 0){
    			return true;
    		}else{
    			return false;
    		}
        },
        
        validateSubmit: function(){
        	var errorMsg;
            var isMaxDsc    = true;
            var isMinDsc    = false;
            var isTitle     = false;

        	if(!isNoCompany && !isNoGlobal){
        		alert('You must choose to create a Global or Non-Globl Alert!\n Click the Company or Global Alert button.');
        		return false;
        	}
        	
        	isTitle  = this.validateTitle();        	
        	isMaxDsc = this.isMaxAlertDsc();
        	isMinDsc = this.isMinAlertDsc();
        	
        	if(isSystem && isAlertType && isMaxDsc && !isMinDsc && isTitle){
                return true;      		
        	}else{
        		errorMsg = '<ul>';
        		// let the user know which field failed
        		if(!isSystem){
            		errorMsg += '<li>A Intermediary was not selected, did you click the Inter button, a selection is required.</li>';
        		}
        		
        		if(!isAlertType){
        			errorMsg += '<li>A Alert Type was not selected.</li>';
        		}
        		
        		if(!isMaxDsc){
        			errorMsg += '<li>The description is too long.</li>';
        		}
        		
        		if(isMinDsc){
        			errorMsg += '<li>A description is required.</li>';
        		}
        		
        		if(!isTitle){
        			errorMsg += '<li>A title is required.</li>';
        		}
        		errorMsg += '</ul>';	

        		$('#successMessage').html(errorMsg);
                $('#success').removeClass('bfdsHidden');
                return false;      		
        	}
        }

    };
})();