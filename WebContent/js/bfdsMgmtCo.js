if (typeof bfdsmgr == 'undefined') {
    bfdsmgr = {};
}

bfdsmgr.mgmtco = (function() {
	/*
	 * The _MOUNT is the attach point found at the bottom of the view page
	 */
    var _MOUNT = "currentMgmtCo";
    var _grid = null;
    var _rowClassName = null;
    var _previousRow;
    
    return {
        // initializes the filtered grid of By Month
        initializeFilteredGrid: function(){
        	var layout = new Array(
                    {field: "ta2000_co_cd", name: "Company", width: "100px", headerClasses: "bfdsmgrBoldText"},
                    {field: "ta2000_sys_cd", name: "System", width: "100px", headerClasses: "bfdsmgrBoldText"},
                    {field: "mgmt_co_long_nm", name: "Long Name", width: "140px", headerClasses: "bfdsmgrBoldText"},
                    {field: "mgmt_co_short_nm", name: "Short Name", width: "100px", headerClasses: "bfdsmgrBoldText"},
                    {field: "relationship_mgr_nm", name: "Relationship Manager Name", width: "200px", headerClasses: "bfdsmgrBoldText"},
                    {field: "fund_sponsor_cd", name: "Fund Sponsor", width: "100px", headerClasses: "bfdsmgrBoldText"}
                );        	
            var url = 'mgmtShowAll';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){               	
                    _grid = new FilteredPagedGrid({
		                        pageSize: 25,
		                        attachPoint: document.getElementById(_MOUNT),
		                        structure: layout,
		                        defaultSort: 'ta2000_co_cd',
		                        filterLabel: 'Company',
		                        data: data,
		                        filterColumn: 'ta2000_co_cd',
		                        width: "800px",
		                        className: "pagedGridBorder"
		                    });
                    $('#loading').addClass('bfdsHidden');
                    $('#title').removeClass('bfdsHidden');
                }
            });
        },

        activateEditPage: function(data){
        	window.parent.setFieldPage('editMgmtCoPage');
        },        
                                        
        addMgmtCo: function(){
            var newMgmtCo = {
            		ta2000_co_cd: $('#ta2000_co_cdDD').val(),
            		ta2000_sys_cd: $('#ta2000_sys_cdDD').val(),
            		mgmt_co_long_nm: $('#mgmt_co_long_nmInput').val(),
            		mgmt_co_short_nm: $('#mgmt_co_short_nmInput').val(),
            		relationship_mgr_nm: $('#relationship_mgr_nmInput').val(),
            		fund_sponsor_cd: $('#fund_sponsor_cdDD').val()            		
            };
            if(this.validateFields()){
	            if(confirm("Are you sure you want to add this Management Company?")) {           	
	                $.post('addMgmtCo',
	                        bfdsmgr.util.flattenObject(newMgmtCo),
	                        function (data, textStatus) {
	                            if(data.true_false){
	                            	bfdsmgr.mgmtco.addMgmtCoSuccess(data);
	                            } else {
	                            	bfdsmgr.mgmtco.addMgmtCoFail(data);
	                            }
	                        },
	                        'json');
	            }
            }
        },

// The following code to be reused as needed
        
        // sets the add mgmtco success view
        addMgmtCoSuccess: function(data){
            $('#successMessage').html('You have successfully added the Management Company.');
            $('#success').removeClass('bfdsHidden');
        },

        // sets the add mgmtco fail view
        addMgmtCoFail: function(data){
            $('#successMessage').html('Fail! This Management Company already exists.');
            $('#success').removeClass('bfdsHidden');
        },

        // sets the edit page
        editMgmtCoPage: function(){
               $.ajax({
                    type: "GET",
                    url: 'editMgmtCo',
                    dataType: "json",
                    cache: false,
                    success: function(data){                    	
                		$('#mgmt_co_idHidden').val(data.mgmt_co_id);
                		$('#ta2000_co_cdDD').val(data.ta2000_co_cd);
                		$('#ta2000_sys_cdDD').val(data.ta2000_sys_cd);
                		$('#mgmt_co_long_nmInput').val(bfdsmgr.util.trim(data.mgmt_co_long_nm));
                		$('#mgmt_co_short_nmInput').val(bfdsmgr.util.trim(data.mgmt_co_short_nm));
                		$('#relationship_mgr_nmInput').val(bfdsmgr.util.trim(data.relationship_mgr_nm));
                		$('#fund_sponsor_cdDD').val(data.fund_sponsor_cd);            		
                    }
                });
        },

        // delete MgmtCo
        deleteMgmtCo : function(id){
            if(confirm("Are you sure you want to delete this MgmtCo?")) {
                $.post('deleteMgmtCo',
	                    function(data){
	                        bfdsmgr.mgmtco.deleteMgmtCoSuccess(data);
	                    },
	                    'json');
            }
        },

        deleteMgmtCoSuccess : function(data){
            if (!data.error){
                $('#success').html('MgmtCo Successfully Deleted');
            } else {
                $('#success').html('FAIL! MgmtCo Not Deleted');
            }
            $('#mgmtCoLookup').val('');
        },

        setSearchInput : function(company, system){
            var newFirm = {
            	system: system,
            	company: company
            };
        	$.post('setMgmtCoRowToEdit',
            		bfdsmgr.util.flattenObject(newFirm),
                    function (data) {
            	
                        if(!data.error){
                            bfdsmgr.mgmtco.searchMgmtCoFail(data);
                        }
                        
                    },
                    'json');
        },
        
        searchMgmtCoFail: function(data){
            $('#successMessage').html("Fail! This MgmtCo was not found");
            $('#success').removeClass('bfdsHidden');
        },

        /*
         * set the short name record to edit, a change in the table member list
         * may cause this to be out of sync
         * This is getting the company and system in the table row
         */
        setRowToEdit : function(data){
        	var _company;
        	var _system;
 
        	if(navigator.appName == 'Netscape'){
            	_company = escape(data.cells[0].childNodes[0].wholeText);
            	_system  = escape(data.cells[1].childNodes[0].wholeText);
        	}else{
            	_company = escape(data.cells[0].innerHTML);
            	_system  = escape(data.cells[1].innerHTML);
        	}
        	this.setSearchInput(_company, _system);
        	$('tr').removeClass('gridRowHighlight');
        	data.className = "gridRowHighlight";
        },

        updateMgmtCo: function(){
            var newMgmtCo = {
            		ta2000_co_cd: $('#ta2000_co_cdDD').val(),
            		ta2000_sys_cd: $('#ta2000_sys_cdDD').val(),
            		mgmt_co_long_nm: $('#mgmt_co_long_nmInput').val(),
            		mgmt_co_short_nm: $('#mgmt_co_short_nmInput').val(),
            		relationship_mgr_nm: $('#relationship_mgr_nmInput').val(),
            		fund_sponsor_cd: $('#fund_sponsor_cdDD').val()            		
            };
            if(this.validateFields()){
	            if(confirm("Are you sure you want to update this Management Company?")) {           	
	                $.post('updateMgmtCo',
	                        bfdsmgr.util.flattenObject(newMgmtCo),
	                        function (data) {
	                            if(data.true_false){
	                            	bfdsmgr.mgmtco.updateMgmtCoSuccess(data);
	                            } else {
	                            	bfdsmgr.mgmtco.updateMgmtCoFail(data);
	                            }
	                        },
	                        'json');
	            }
            }
        },

        // sets the update mgmtco success view
        updateMgmtCoSuccess: function(data){
            $('#successMessage').html('You have successfully updated the Management Company.');
            $('#success').removeClass('bfdsHidden');
        },

        // sets the add mgmtco fail view
        updateMgmtCoFail: function(data){
            $('#successMessage').html("Fail! This Management Company was not updated");
            $('#success').removeClass('bfdsHidden');
        },

        validateFields: function(){
        	
        	var isTA2000CoCd;
        	var isTA2000SysCd;
        	var isMgmtCoLongNm;
        	var isMgmtCoShortNm;
        	var isFundSponsorCd;
        	
            var errSet = false;

			errorMsg = '<div style="text-align:left"><ul>';

			isTA2000CoCd = this.ta2000_co_cd();
			isTA2000SysCd =  this.ta2000_sys_cd();
			isMgmtCoLongNm = this.mgmt_co_long_nm();
			isMgmtCoShortNm = this.mgmt_co_short_nm();
			isFundSponsorCd = this.fund_sponsor_cd();
			
			if(!isTA2000CoCd){
        		errorMsg += '<li>The Company field is invalid, a valid entry is required.</li>';
				errSet = true;
        	}
        	
			if(!isTA2000SysCd){
        		errorMsg += '<li>The System field is invalid, a valid entry is required.</li>';
				errSet = true;
        	}
        	
			if(!isMgmtCoLongNm){
        		errorMsg += '<li>The Long name is invalid, a valid entry is required.</li>';
				errSet = true;
        	}
        	
			if(!isMgmtCoShortNm){
        		errorMsg += '<li>The Short name is invalid, a valid entry is required.</li>';
				errSet = true;
        	}
        	
			if(!isFundSponsorCd){
        		errorMsg += '<li>The Fund Sponsor field is invalid, a valid entry is required.</li>';
				errSet = true;
        	}
        	
    		errorMsg += '</ul></div>';
    		/*
    		 * This will help if I need to display the message in a dialog as opposed
    		 * a block under the input fields
    		 */
        	if(errSet){
        		$('#successMessage').html(errorMsg);
                $('#success').removeClass('bfdsHidden'); 
                return false;
        	}
        	
        	return true;        	
        },
        
        ta2000_co_cd: function(){        	
        	return !bfdsmgr.util.isBlank($('#ta2000_co_cdDD').val());
        },
        
        ta2000_sys_cd: function(){
        	return !bfdsmgr.util.isBlank($('#ta2000_sys_cdDD').val());
        },
        
        mgmt_co_long_nm: function(){
        	return !bfdsmgr.util.isBlank($('#mgmt_co_long_nmInput').val());
        },
        
        mgmt_co_short_nm: function(){
        	return !bfdsmgr.util.isBlank($('#mgmt_co_short_nmInput').val());
        },
        
        fund_sponsor_cd: function(){
        	return !bfdsmgr.util.isBlank($('#fund_sponsor_cdDD').val());
        }
        
    };
})();