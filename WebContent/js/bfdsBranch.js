if (typeof bfdsmgr == 'undefined') {
    bfdsmgr = {};
}

bfdsmgr.branch = (function() {
	/*
	 * The _MOUNT is the attach point found at the bottom of the view page
	 */
    var _MOUNT = "currentBranch";
    var _grid = null;
    var _rowClassName = null;
    var isBranchType  = false;
    var isSystem 	= false;
    var isBranch 	= false;
    var isMaxDsc    = true;
    var isTitle     = false;
    
    return {
        // initializes the header text of the filtered grid
        initializeFilteredGrid: function(){
        	var layout = new Array(
                {field: "short_nm", name: "System", width: "60px", headerClasses: "bfdsmgrBoldText"},
                {field: "branch_cd", name: "Branch", width: "60px", headerClasses: "bfdsmgrBoldText"},
                {field: "branch_address1", name: "Address1", width: "100px", headerClasses: "bfdsmgrBoldText"},
                {field: "branch_address2", name: "Address2", width: "100px", headerClasses: "bfdsmgrBoldText"},
                {field: "branch_city", name: "City", width: "60px", headerClasses: "bfdsmgrBoldText"},
                {field: "branch_state_cd", name: "State", width: "30px", headerClasses: "bfdsmgrBoldText"},
                {field: "branch_zip_cd", name: "Zip", width: "10px", headerClasses: "bfdsmgrBoldText"},
                {field: "firm_id", name: "Hidden Id", width: "60px", hidden: true, headerClasses: "bfdsHidden"},
                {field: "branch_id", name: "Hidden Id", width: "60px", hidden: true, headerClasses: "bfdsHidden"}
            );

            var url = 'showAllBranches';
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
			                        defaultSort: 'branch_cd',
			                        filterLabel: 'Branch',
			                        data: data,
			                        filterColumn: 'branch_cd',
			                        width: "800px",
			                        className: "pagedGridBorder"
			                    });
		                $('#loading').addClass('bfdsHidden');
		                $('#title').removeClass('bfdsHidden');
                }
            });            
        },
        
        activateEditPage: function(data){
        	window.parent.setFieldPage('editBranchPage');
        },
                        
        // adds an branch
        addBranch: function(){
	            var newBranch = {
	            	branch_cd: $('#branch_cdInput').val(),
	            	branch_address1: $('#branch_address1Input').val(),
	            	branch_address2: $('#branch_address2Input').val(),
	            	branch_city: $('#branch_cityInput').val(),
	            	branch_state_cd: $('#branch_state_cdInput').val(),
	            	branch_zip_cd: $('#branch_zip_cdInput').val(),
	            };
	            if(confirm("Are you sure you want to add this Branch?")) {           	
	                $.post('addBranch',
	                		bfdsmgr.util.flattenObject(newBranch),
	                        function (data) {
	                            if(data.true_false){
	                                $('#successMessage').html('You have successfully added the Branch.');
	                                $('#success').removeClass('bfdsHidden');
	                            } else {
	                                $('#successMessage').html('There was an error adding the Branch.');
	                                $('#success').removeClass('bfdsHidden');
	                            }
	                        },
	                        'json');
	            }
        },

        deleteBranch: function(id){
	         if(confirm("Are you sure you want to delete this branch?")) {
	             $.post('deleteBranch',
	                    {branch_id: id},
	                    function(data){
	                         bfdsmgr.branch.deleteBranchSuccess(data);
	                    },
	                    'json');
	         }
	    },
	
	    deleteBranchSuccess: function(data){
	        if (data.true_false){
	             $('#success').html('Branch Successfully Deleted');
	        } else {
	             $('#success').html('FAIL! Branch Not Deleted');
	        }
	         $('#eventLookup').val('');
	    },
     
        editBranch: function(){
            $.ajax({
                 type: "GET",
                 url: 'editBranch',
                 dataType: "json",
                 cache: false,
                 success: function(data){

                	$('#branch_address1Input').val(data.branch_address1);
             		$('#branch_address2Input').val(data.branch_address2);
             		$('#branch_cityInput').val(data.branch_city);
             		$('#branch_state_cdInput').val(data.branch_state_cd);
             		$('#branch_zip_cdInput').val(data.branch_zip_cd);
             		
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
							 						             $.post('branchSaveSystem',
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
 
        setSearchInput : function(firm_id, branch_id){
            var srchData = {
            		firm_id: firm_id,
            		branch_id: branch_id
            };
        	$.post('setBranchRowToEdit',
        		bfdsmgr.util.flattenObject(srchData),
                function (data) {        	
                    if(!data.true_false){
        	            $('#success').removeClass('bfdsHidden');
        				$('#successMessage').html('Error: failed to find the branch');
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
        	var firm_id;
        	var branch_id;

        	if(navigator.appName == 'Netscape'){
            	firm_id = escape(data.cells[7].childNodes[0].wholeText);
            	branch_id = escape(data.cells[8].childNodes[0].wholeText);
        	}else{
            	firm_id = escape(data.cells[7].innerHTML);
            	branch_id = escape(data.cells[8].innerHTML);
        	}
        	this.setSearchInput(firm_id, branch_id);
        	$('tr').removeClass('gridRowHighlight');
        	data.className = "gridRowHighlight";
        },
        
	    updateBranch: function(){
	         var newBranch = {
           	branch_address1: $('#branch_address1Input').val(),
           	branch_address2: $('#branch_address2Input').val(),
           	branch_city: $('#branch_cityInput').val(),
           	branch_state_cd: $('#branch_state_cdInput').val(),
           	branch_zip_cd: $('#branch_zip_cdInput').val(),
	         };
	         if(confirm("Are you sure you want to update this Branch?")) { 
	             $.post('updateBranch',
	             		bfdsmgr.util.flattenObject(newBranch),
	                     function (data) {
	                         if(data.true_false){
	                	         $('#successMessage').html('You have successfully updated the Branch.');
	                	         $('#success').removeClass('bfdsHidden');
	                         } else {
	                	         $('#successMessage').html('Fail! There has been an error.');
	                	         $('#success').removeClass('bfdsHidden');
	                         }
	                     },
	                     'json');
	         }
	    },

        validateSubmit: function(){
        	var errorMsg;
        	if(isSystem && isCompany && isBranchType && isMaxDsc && isTitle){
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
        		if(!isBranchType){
        			errorMsg += '<li>A Branch Type was not selected.</li>';
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