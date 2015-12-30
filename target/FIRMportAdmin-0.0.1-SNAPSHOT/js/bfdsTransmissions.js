if (typeof bfdsmgr == 'undefined') {
    bfdsmgr = {};
}

bfdsmgr.trans = (function() {
	/*
	 * The _MOUNT is the attach point found at the bottom of the view page
	 */
    var _MOUNT = "currentTrans";
    var _grid = null;
    var _rowClassName 	 = null;
    var isSystem 		 = false;
    var isCompany 		 = false;
    var istTransFileType = false;
    var isMaxDsc    	 = true;
    var istPosFileSched  = false;
    
    return {
        // initializes the header text of the filtered grid
        initializeFilteredGrid: function(){
        	var layout = new Array(
                {field: "mgmt_co_short_nm", name: "Company", width: "40px", headerClasses: "bfdsmgrBoldText"},
                {field: "short_nm", name: "System", width: "40px", headerClasses: "bfdsmgrBoldText"},
                {field: "trans_file_typ_cd", name: "File Type", width: "40px", headerClasses: "bfdsmgrBoldText"},
                {field: "pos_file_sched_cd", name: "Pos File Schedule", width: "40px", headerClasses: "bfdsmgrBoldText"},
                {field: "trans_id", name: "Hidden Id", width: "60px", hidden: true, headerClasses: "bfdsHidden"},
                {field: "firm_mgmt_co_id", name: "Hidden Id", width: "60px", hidden: true, headerClasses: "bfdsHidden"}
            );

            var url = 'showAllTrans';
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
			                        defaultSort: 'trans_file_typ_cd',
			                        filterLabel: 'File Type',
			                        data: data,
			                        filterColumn: 'trans_file_typ_cd',
			                        width: "800px",
			                        className: "pagedGridBorder"
			                    });
		                $('#loading').addClass('bfdsHidden');
		                $('#title').removeClass('bfdsHidden');
                }
            });            
        },
        
        /*
         * adds an Transmission - no data to pass here, already done through the dialogs.
         * just need to confirm and collect the data in the controller
         */
        addTransmission: function(){
        	if(this.validateSubmit()){
	            if(confirm("Are you sure you want to add this Transmission?")) {           	
	                $.post('addTransmission',
	                        function (data) {
	                            if(data.true_false){
	                                $('#successMessage').html('You have successfully added the Transmission.');
	                                $('#success').removeClass('bfdsHidden');
	                            } else {
	                                $('#successMessage').html('There was an error adding the Transmission.');
	                                $('#success').removeClass('bfdsHidden');
	                            }
	                        },
	                        'json');
	            }
        	}            
        },

        clearForm: function() {
            $(':input')
                .not(':button')
                .val('');

            $('#submitAlert').attr('disabled', true);
        },

        /*
         * only allowing edit of file type or schedule
         */
        editTransmission: function(){
            $.ajax({
                 type: "GET",
                 url: 'editTransmission',
                 dataType: "json",
                 cache: false,
                 success: function(data){

                	 bfdsmgr.trans.editFileType(data);
                	 bfdsmgr.trans.editPosFileSched(data);
                	
                 },
                 error: function(data){
                	 alert('Si some thing happened');
                 }
             });
        },

        editFileType: function(data){
        	var numFileTypeRdbx = $('#transFileTypeDialog > input').size();                	
        	// loop the check box values setting matches
        	for(var rdbx=0; rdbx < numFileTypeRdbx; rdbx++){
            	if($('#transFileTypeRdb' + rdbx).val() == data.trans_file_typ_cd){
            		$('#transFileTypeRdb' + rdbx).prop('checked', true);
            	}                		
        	}        	
        },
        
        editPosFileSched: function(data){
        	var numFileSchedRdbx = $('#posFileSchedDialog > input').size();                	
        	// loop the check box values setting matches
        	for(var rdbx=0; rdbx < numFileSchedRdbx; rdbx++){
            	if($('#posFileSchedRdb' + rdbx).val() == data.pos_file_sched_cd){
            		$('#posFileSchedRdb' + rdbx).prop('checked', true);
            	}                		
        	}
        },
        
        deleteTransmission: function(id){
	         if(confirm("Are you sure you want to delete this alert?")) {
	             $.post('deleteAlert',
	                    {alert_id: id},
	                    function(data){
	                         bfdsmgr.alert.deleteAlertSuccess(data);
	                    },
	                    'json');
	         }
	    },
	
	    updateTransmission: function(){
	         if(confirm("Are you sure you want to update this Transmission?")) { 
	             $.post('updateTransmission',
	                     function (data) {
	                         if(data.true_false){
	                	         $('#successMessage').html('You have successfully updated the Transmission.');
	                	         $('#success').removeClass('bfdsHidden');
	                         } else {
	                	         $('#successMessage').html('Fail! There has been an error.');
	                	         $('#success').removeClass('bfdsHidden');
	                         }
	                     },
	                     'json');
	         }
	    },

        getTransFileType: function(_val){
            $.ajax({
                type: "GET",
                url: 'getTransFileType',
                dataType: "json",
                cache: false,
                success: function(data){               

                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<input id=transFileTypeRdb' + st + ' name=transFileType value=' + data[st].trans_file_typ_cd + ' type="radio">' + data[st].trans_file_typ_dsc + '</input><br/>').appendTo($('#transFileTypeDialog')).get(0);
                    	}else{
                    		if(_val == bfdsmgr.util.trim(data[st].alert_typ_cd)){
                        		$('<input id=transFileTypeRdb' + st + ' name=transFileType value=' + data[st].trans_file_typ_cd + ' type="radio" selected>' + data[st].trans_file_typ_dsc + '</input><br/>').appendTo($('#transFileTypeDialog')).get(0);
                    		}else{
                        		$('<input id=transFileTypeRdb' + st + ' name=transFileType value=' + data[st].trans_file_typ_cd + ' type="radio">' + data[st].trans_file_typ_dsc + '</input><br/>').appendTo($('#transFileTypeDialog')).get(0);
                    		}
                    	}                		
                	}
                	
                }
            });        	
        },
                       
        getPosFileSched: function(_val){
            $.ajax({
                type: "GET",
                url: 'getPosFileSched',
                dataType: "json",
                cache: false,
                success: function(data){               

                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<input id=posFileSchedRdb' + st + ' name=posFileSched value=' + data[st].pos_file_sched_cd + ' type="radio">' + data[st].pos_file_sched_dsc + '</input><br/>').appendTo($('#posFileSchedDialog')).get(0);
                    	}else{
                    		if(_val == bfdsmgr.util.trim(data[st].alert_typ_cd)){
                        		$('<input id=posFileSchedRdb' + st + ' name=posFileSched value=' + data[st].pos_file_sched_cd + ' type="radio" selected>' + data[st].pos_file_sched_dsc + '</input><br/>').appendTo($('#posFileSchedDialog')).get(0);
                    		}else{
                        		$('<input id=posFileSchedRdb' + st + ' name=posFileSched value=' + data[st].pos_file_sched_cd + ' type="radio">' + data[st].pos_file_sched_dsc + '</input><br/>').appendTo($('#posFileSchedDialog')).get(0);
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
                    		if(_val == bfdsmgr.util.trim(data[st].firm_id)){
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
							 						             $.post('transSaveSystem',
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
 
		companyDialog: function(){
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
									 							// remove the trailing comma
									 							lstComma = foundThese.lastIndexOf(',');
									 							outPut = foundThese.substring(0, lstComma);
									 							
									 							var newCompany = {
									 									sel_company: outPut
									 						     };
							 						             $.post('transSaveCompany',
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
        
        transFileTypeDialog: function(){
			$('#transFileTypeDialog').dialog({ height: 400, 
            							width: 200, 
            							maxHeight: 400, 
            							modal: true,
            							buttons: { "Ok": function() { 
															var value = '';
															var nxtRdbBt = 0;
															
								 							while(true){
								 								if(document.getElementById('transFileTypeRdb' + nxtRdbBt) != null){
								 									if(document.getElementById('transFileTypeRdb' + nxtRdbBt).checked){
								 										value = document.getElementById('transFileTypeRdb' + nxtRdbBt).value;
								 										break;
								 									}
								 								}else{
								 									break;
								 								}
								 								nxtRdbBt++;
								 							}
								 							
								 							if(value.length > 0){
									 							var newSystem = {
									 									sel_transfiletype: value
									 						     };
							 						             $.post('transSaveTransFileType',
							 						             		bfdsmgr.util.flattenObject(newSystem),
							 						                    function (data) {
							 						            	 		if(data.true_false){
							 						            	 			istTransFileType = true;
							 						            	 		}else{
							 						            	 			isTransFileType = false;
							 						            	 		}
							 						                    },
							 						                    'json');
								 							}else{
								 								alert('No Trans File Type selected, you must select atleast one!');
								 								istTransFileType = false;
								 							}
								 							
															$(this).dialog("close"); 
															},
            									   "Close": function() { 
            										   						$(this).dialog("close"); 
            										   				   }
            									 } 							
            							});
		},
 
		posFileSchedDialog: function(){
			$('#posFileSchedDialog').dialog({ height: 400, 
				width: 200, 
				maxHeight: 400, 
				modal: true,
				buttons: { "Ok": function() { 
									var value = '';
									var nxtRdbBt = 0;
									
		 							while(true){
		 								if(document.getElementById('posFileSchedRdb' + nxtRdbBt) != null){
		 									if(document.getElementById('posFileSchedRdb' + nxtRdbBt).checked){
		 										value = document.getElementById('posFileSchedRdb' + nxtRdbBt).value;
		 										break;
		 									}
		 								}else{
		 									break;
		 								}
		 								nxtRdbBt++;
		 							}
		 							
		 							if(value.length > 0){
			 							var newPosFileSched = {
			 									sel_positionfilesched: value
			 						     };
	 						             $.post('transSavePositionFileSched',
	 						             		bfdsmgr.util.flattenObject(newPosFileSched),
	 						                    function (data) {
	 						            	 		if(data.true_false){
	 						            	 			istPosFileSched = true;
	 						            	 		}else{
	 						            	 			isPosFileSched = false;
	 						            	 		}
	 						                    },
	 						                    'json');
		 							}else{
		 								alert('No Pos File Schedule selected, you must select atleast one!');
				            	 			isPosFileSched = false;
		 							}
		 							
									$(this).dialog("close"); 
									},
						   "Close": function() { 
							   						$(this).dialog("close"); 
							   				   }
						 } 							
				});
        },
        
        validateSubmit: function(){
        	var errorMsg;
        	if(isSystem && isCompany && istTransFileType && istPosFileSched){
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
        		if(!istTransFileType){
        			errorMsg += '<li>A transmission file type was not selected.</li>';
        		}
        		if(!istPosFileSched){
        			errorMsg += '<li>A position file schedule was not selected.</li>';
        		}
        		errorMsg += '</ul>';	

        		$('#successMessage').html(errorMsg);
                $('#success').removeClass('bfdsHidden');
                return false;      		
        	}
        },
        
        setSearchInput : function(trans_id, firm_mgmt_co_id){
            var srchData = {
        		trans_id: trans_id,
        		firm_mgmt_co_id: firm_mgmt_co_id
            };
        	$.post('setTransmissionRowToEdit',
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
        	var trans_id;
        	var firm_mgmt_co_id;

        	if(navigator.appName == 'Netscape'){
            	trans_id = escape(data.cells[4].childNodes[0].wholeText);
            	firm_mgmt_co_id = escape(data.cells[5].childNodes[0].wholeText);
        	}else{
            	trans_id = escape(data.cells[4].innerHTML);
            	firm_mgmt_co_id = escape(data.cells[5].innerHTML);
        	}
        	this.setSearchInput(trans_id, firm_mgmt_co_id);
        	$('tr').removeClass('gridRowHighlight');
        	data.className = "gridRowHighlight";
        },
        
        activateEditPage: function(data){
        	window.parent.setFieldPage('editTransmissionPage');
        }
                        
    };
})();