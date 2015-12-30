if (typeof bfdsmgr == 'undefined') {
    bfdsmgr = {};
}

bfdsmgr.funds = (function() {
	/*
	 * The _MOUNT is the attach point found at the bottom of the view page
	 */
    var _MOUNT = "currentFunds";
    var _grid = null;
    var _rowClassName = null;
    
    return {
        // initializes the header text of the filtered grid
        initializeFilteredGrid: function(){
        	var layout = new Array(
                {field: "ta2000_co_cd", name: "Company", width: "40px", headerClasses: "bfdsmgrBoldText"},
                {field: "ta2000_sys_cd", name: "System", width: "40px", headerClasses: "bfdsmgrBoldText"},
                {field: "fund_lgl_nm", name: "Fund Legal Name", width: "260px", headerClasses: "bfdsmgrBoldText"},
                {field: "fund_tax_id", name: "Fund Tax Id", width: "160px", headerClasses: "bfdsmgrBoldText"},
                {field: "fund_id", name: "Hidden Id", width: "60px", hidden: true, headerClasses: "bfdsHidden"}
            );

            var url = 'showAllFunds';
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
	                        defaultSort: 'fund_lgl_nm',
	                        filterLabel: 'Fund Legal Name',
	                        data: data,
	                        filterColumn: 'fund_lgl_nm',
	                        width: "800px",
	                        className: "pagedGridBorder"
	                    });
	                $('#loading').addClass('bfdsHidden');
	                $('#title').removeClass('bfdsHidden');
                }
            });            
        },
        
        // adds an Funds
        addFunds: function(){
            var newFunds = {
            		/*
            		 * The params must be escaped to handle spaces otherwise 
            		 * the data is truncated, the escaped space is replaced in the handler
            		 */
            		mgmt_co_id: $('#mgmt_co_idInput').val(),
            		fund_lgl_nm: escape($('#fund_lgl_nmInput').val()),
            		fund_tax_id: escape($('#fund_tax_idInput').val()),
            };
            if(confirm("Are you sure you want to add this Fund?")) {           	
                $.post('addFund',
            		bfdsmgr.util.flattenObject(newFunds),
                    function (data) {
                        if(data.true_false){
                        	bfdsmgr.funds.addFundSuccess(data);
                        } else {
                            bfdsmgr.funds.addFundFail(data);
                        }
                    },
                    'json');
            }
        },

        addFundSuccess: function(data){
            $('#successMessage').html('You have successfully added the Fund.');
            $('#success').removeClass('bfdsHidden');
        },

        addFundFail: function(data){
            if(data.duplicate){
                $('#successMessage').html('Fail! The Fund already exists.');
            } else {
                $('#successMessage').html("Fail! The Fund was not created");
            }
            $('#success').removeClass('bfdsHidden');
        },

        clearForm: function() {

            $(':input')
                .not(':button')
                .val('');

            $('#submitFunds').attr('disabled', true);
        },

        editFundsPage: function(){
           $.ajax({
                type: "GET",
                url: 'editFund',
                dataType: "json",
                cache: false,
                success: function(data){
            		$('#ta2000_co_cdInput').val(data.ta2000_co_cd);
            		$('#ta2000_sys_cdInput').val(data.ta2000_sys_cd);
            		$('#fund_lgl_nmInput').val(data.fund_lgl_nm);
            		$('#fund_tax_idInput').val(data.fund_tax_id);
                }
            });
        },
        
        updateFunds: function(){
            var newFunds = {
        		mgmt_co_id: $('#mgmt_co_idInput').val(),
        		fund_lgl_nm: $('#fund_lgl_nmInput').val(),
        		fund_tax_id: $('#fund_tax_idInput').val(),
            };
            if(confirm("Are you sure you want to update this Fund?")) {           	
                $.post('addFunds',
            		bfdsmgr.util.flattenObject(newFunds),
                    function (data) {
                        if(!data.error){
                        	bfdsmgr.funds.updateFundSuccess(data);
                        } else {
                            bfdsmgr.funds.updateFundFail(data);
                        }
                    },
                    'json');
            }
        },
        
        updateFundSuccess: function(data){
            $('#successMessage').html('You have successfully updated the Fund.');
            $('#success').removeClass('bfdsHidden');
        },

        updateFundFail: function(data){
            $('#successMessage').html("Fail! The Fund was not updated");
            $('#success').removeClass('bfdsHidden');
        },

        // delete Firm
        deleteFund : function(){
            if(confirm("Are you sure you want to delete this Fund?")) {
                $.post('deleteFund',
                        function(data){
                            bfdsmgr.funds.deleteFundSuccess(data);
                        },
                        'json');
            }
        },

        deleteFundSuccess : function(data){
            $('#success').html('The Fund was successfully deleted');
        },
     
        doCoSrch : function(){
            var newFirm = {
            	system: $('#systemInput').val(),
            	company: $('#companyInput').val() 
            };
        	$.post('doCoSrch',
        		bfdsmgr.util.flattenObject(newFirm),
                function (data) {
	        		$('#mgmt_co_idInput').val(data.mgmt_co_id);
	        		$('#company_shortnm_lbl').val(data.mgmt_co_short_nm);
                },
                'json');
        },
        
        setSearchInput : function(data){
            var newFirm = {
            		fund_id: data
            };
        	$.post('setFundRowToEdit',
        		bfdsmgr.util.flattenObject(newFirm),
                function (data) {
        	
                    if(data.error){
                        bfdsmgr.funds.searchFirmFail(data);
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
        	var fund_id;

        	if(navigator.appName == 'Netscape'){
            	fund_id = escape(data.cells[4].childNodes[0].wholeText);
        	}else{
            	fund_id = escape(data.cells[4].innerHTML);
        	}
        	this.setSearchInput(fund_id);
        	$('tr').removeClass('gridRowHighlight');
        	data.className = "gridRowHighlight";
        },
        
        activateEditPage: function(data){
        	window.parent.setFieldPage('editFundPage');
        },
                
    };
})();