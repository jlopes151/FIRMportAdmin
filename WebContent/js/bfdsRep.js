if (typeof bfdsmgr == 'undefined') {
    bfdsmgr = {};
}

bfdsmgr.rep = (function() {
	/*
	 * The _MOUNT is the attach point found at the bottom of the view page
	 */
    var _MOUNT = "currentRep";
    var _grid = null;
    var _rowClassName = null;
    var isSystem 	= false;
    var isCompany 	= false;
    var isRepType = false;
    var isMaxDsc    = true;
    var isTitle     = false;
    
    return {
        // initializes the header text of the filtered grid
        initializeFilteredGrid: function(){
        	var layout = new Array(
                {field: "rep_first_nm", name: "First Name", width: "40px", headerClasses: "bfdsmgrBoldText"},
                {field: "rep_last_nm", name: "Last Name", width: "40px", headerClasses: "bfdsmgrBoldText"},
                {field: "rep_num", name: "Number", width: "40px", headerClasses: "bfdsmgrBoldText"},
                {field: "firm_id", name: "Hidden Id", width: "60px", hidden: true, headerClasses: "bfdsHidden"},
                {field: "rep_id", name: "Hidden Id", width: "60px", hidden: true, headerClasses: "bfdsHidden"}
            );

            var url = 'showAllReps';
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
			                        defaultSort: 'rep_first_nm',
			                        filterLabel: 'First Name',
			                        data: data,
			                        filterColumn: 'rep_first_nm',
			                        width: "800px",
			                        className: "pagedGridBorder"
			                    });
		                $('#loading').addClass('bfdsHidden');
		                $('#title').removeClass('bfdsHidden');
                }
            });            
        },
        
        // adds an alert
        addRep: function(){
        	if(this.validateSubmit()){
	            var newRep = {
            		rep_first_nm: $('#rep_first_nameInput').val(),
            		rep_last_nm: $('#rep_last_nmInput').val(),
            		rep_num: $('#rep_numInput').val()
	            };
	            if(confirm("Are you sure you want to add this Rep?")) {           	
	                $.post('addRep',
	                		bfdsmgr.util.flattenObject(newRep),
	                        function (data) {
	                            if(data.true_false){
	                                $('#successMessage').html('You have successfully added the Rep.');
	                                $('#success').removeClass('bfdsHidden');
	                            } else {
	                                $('#successMessage').html('There was an error adding the Rep.');
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

            $('#submitRep').attr('disabled', true);
        },

        editRepPage: function(){
            $.ajax({
                 type: "GET",
                 url: 'editRep',
                 dataType: "json",
                 cache: false,
                 success: function(data){
                	 
                    bfdsmgr.alert.editRepMgmtCo();

                	var numRdbx = $('#alertTypeDialog > input').size();                	
                	// loop the check box values setting matches
                	for(var rdbx=0; rdbx < numRdbx; rdbx++){
                    	if($('#alertTypeRdb' + rdbx).val() == data.alert_typ_cd){
                    		$('#alertTypeRdb' + rdbx).prop('checked', true);
                    	}                		
                	}
                    $('#alert_dscInput').val(data.alert_dsc);
             		$('#alert_titleInput').val(data.alert_title);
             		
                 }
             });
        },

        /*
         * getting the companies assinged to this alert
         */
        editRepMgmtCo: function(){
            $.ajax({
                type: "GET",
                url: 'editRepMgmtCo',
                dataType: "html", // just using html to return a string
                cache: false,
                success: function(data){
                	
                	// split the returned company list into an array
                	var str = data.split(' ');
                	// get the number of check box in the company dialog
                	var numChkbx = $('#companyDialog > input').size();
                	
                	// loop the check box values setting matches
                	for(var st=0; st < str.length; st++){
                    	for(var chbx=0; chbx < numChkbx; chbx++){
	                    	if($('#companyChkBx' + chbx).val() == str[st]){
	                    		$('#companyChkBx' + chbx).prop('checked', true);
	                    	}                		
                    	}
                	}
                	                	
                }
            });        	
        },
        	
        deleteRep: function(id){
	         if(confirm("Are you sure you want to delete this alert?")) {
	             $.post('deleteRep',
	                    {alert_id: id},
	                    function(data){
	                         bfdsmgr.alert.deleteRepSuccess(data);
	                    },
	                    'json');
	         }
	    },
	
	    deleteRepSuccess: function(data){
	        if (data.true_false){
	             $('#success').html('Rep Successfully Deleted');
	        } else {
	             $('#success').html('FAIL! Rep Not Deleted');
	        }
	         $('#eventLookup').val('');
	    },
     
	    updateRep: function(){
	         var newRep = {
	        	alert_dsc: $('#alert_dscInput').val()
	         };
	         if(confirm("Are you sure you want to update this Rep?")) { 
	        	 /*
	        	  *  The updated company selections are set when the user select ok
	        	  *  on the company dialog. the same for the alert type dialog.
	        	  *  
	        	  *  The title and system value are not to be changed so only the description
	        	  *  is changed, The changes to the comany and alert type are set in the 
	        	  *  controller 
	        	  *  
	        	  */ 
	             $.post('updateRep',
	             		bfdsmgr.util.flattenObject(newRep),
	                     function (data) {
	                         if(data.true_false){
	                	         $('#successMessage').html('You have successfully updated the Rep.');
	                	         $('#success').removeClass('bfdsHidden');
	                         } else {
	                	         $('#successMessage').html('Fail! There has been an error.');
	                	         $('#success').removeClass('bfdsHidden');
	                         }
	                     },
	                     'json');
	         }
	    },

        setSearchInput : function(rep_id, firm_id){
            var srchData = {
            		rep_id: rep_id,
            		firm_id: firm_id
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
        	var rep_id;
        	var firm_id;

        	if(navigator.appName == 'Netscape'){
            	rep_id = escape(data.cells[3].childNodes[0].wholeText);
            	firm_id = escape(data.cells[4].childNodes[0].wholeText);
        	}else{
            	rep_id = escape(data.cells[3].innerHTML);
            	firm_id = escape(data.cells[4].innerHTML);
        	}
        	this.setSearchInput(rep_id, firm_id);
        	$('tr').removeClass('gridRowHighlight');
        	data.className = "gridRowHighlight";
        },
        
        activateEditPage: function(data){
        	window.parent.setFieldPage('editRepPage');
        }
                        
    };
})();