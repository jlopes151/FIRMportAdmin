if (typeof bfdsmgr == 'undefined') {
    bfdsmgr = {};
}

bfdsmgr.firmmgmtco = (function() {
	/*
	 * The _MOUNT is the attach point found at the bottom of the view page
	 */
    var _MOUNT = "currentFirmAndMgmtCo";
    var _grid = null;
    var _rowClassName = null;
    
    return {
        /*
         *  initializes the filtered grid the fields in the layout must match the fields of the FirmAndMgmtco model
         */
        initializeFilteredGrid: function(){
        	var layout = new Array(
                    {field: "system", name: "Firm", width: "160px", headerClasses: "bfdsmgrBoldText"},
                    {field: "company", name: "MgmtCo", width: "160px", headerClasses: "bfdsmgrBoldText"},
                    {field: "firm_id", name: "Hidden", width: "0px", hidden: true, headerClasses: "bfdsmgrBoldText"},
                    {field: "mgmt_co_id", name: "Hidden", width: "0px", hidden: true, headerClasses: "bfdsmgrBoldText"},
                    {field: "group", name: "Group", width: "160px", headerClasses: "bfdsmgrBoldText"},
                    {field: "ta2000_dealr_num", name: "TA2000 Dealer Number", width: "160px", headerClasses: "bfdsmgrBoldText"},
                    {field: "active_ind", name: "Active Indicator", width: "200px", headerClasses: "bfdsmgrBoldText"},
                    {field: "active_dt", name: "Active Date", width: "140px", headerClasses: "bfdsmgrBoldText"},
                    {field: "inactive_dt", name: "Inactive Date", width: "140px", headerClasses: "bfdsmgrBoldText"},
                    {field: "vision_ind", name: "Vision Indicator", width: "140px", headerClasses: "bfdsmgrBoldText"},
                    {field: "fan_mail_ind", name: "Fan Mail Indicator", width: "140px", headerClasses: "bfdsmgrBoldText"},
                    {field: "omnibus_conversion_dt", name: "Omnibus Conversion Date", width: "140px", headerClasses: "bfdsmgrBoldText"},
                    {field: "omniserv_ind", name: "Omniserve Indicator", width: "140px", headerClasses: "bfdsmgrBoldText"},
                    {field: "asof_trad_window", name: "ASOF Trade Window", width: "140px", headerClasses: "bfdsmgrBoldText"},
                    {field: "omnibus_trad_proc_cd", name: "Omnibus Trade Proc", width: "140px", headerClasses: "bfdsmgrBoldText"},
                    {field: "batch_typ_cd", name: "Batch Type", width: "140px", headerClasses: "bfdsmgrBoldText"},
                    {field: "settlement_typ_cd", name: "Settlement Type", width: "140px", headerClasses: "bfdsmgrBoldText"},
                    {field: "post_settlement_chng_ind", name: "Post Settlement Change Indicator", width: "140px", headerClasses: "bfdsmgrBoldText"},
                    {field: "ptf_acat_trnsfr_ind", name: "ptf Acat Transfer Indicator", width: "140px", headerClasses: "bfdsmgrBoldText"},
                    {field: "dst_vho_ind", name: "Dst Vho Indicator", width: "140px", headerClasses: "bfdsmgrBoldText"}
                );
        	
           /*
            *  the user must get the firm_id & mgmtco_id before adding an new xref using the search fields
            *  the add submit is disabled until they do. The user must mouse out each of the search fields 
            */ 
           $('#submitFirmnMgmtCo').attr('disabled', true);
           
           var url = 'showAllTA2000SubFirm';
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
		                        defaultSort: 'firm_id',
		                        filterLabel: 'Firm',
		                        data: data,
		                        filterColumn: 'firm_id',
		                        width: "800px",
		                        className: "pagedGridBorder"
		                    });
	                    $('#loading').addClass('bfdsHidden');
	                    $('#title').removeClass('bfdsHidden');
                }
            });
        },

        /*
         * the firm & mgmt co id's are collected on the controller.
         */
        addFirmAndMgmtCo: function(){
            var newFirmMgmtCo = {
        		group: $('#groupInput').val(),
        		ta2000_dealr_num: $('#ta2000_dealr_numInput').val(),
        		active_ind: $('#active_indInput').val(),
        		active_dt: $('#active_dtInput').val(),
        		inactive_dt: $('#inactive_dtInput').val(),
        		vision_ind: $('#vision_indInput').val(),
        		fan_mail_ind: $('#fan_mail_indInput').val(),
        		omnibus_conversion_dt: $('#omnibus_conversion_dtInput').val(),
        		omniserv_ind: $('#omniserv_indInput').val(),
        		asof_trad_window: $('#asof_trad_windowInput').val(),
        		omnibus_trad_proc_cd: $('#omnibus_trad_proc_cdDD').val(),
        		batch_typ_cd: $('#batch_typ_cdDD').val(),
        		settlement_typ_cd: $('#settlement_typ_cdDD').val(),
        		post_settlement_chng_ind: $('#post_settlement_chng_indInput').val(),
        		ptf_acat_trnsfr_ind: $('#ptf_acat_trnsfr_indInput').val(),
        		dst_vho_ind: $('#dst_vho_indInput').val()
            };
        	Ok = this.validateNwFrmNdMgmtCXrf();
        	if(Ok){
	            if(confirm("Are you sure you want to add this Firm & Management Company data?")) {           	
	                $.post('addFirmAndMgmtCo',
	                    bfdsmgr.util.flattenObject(newFirmMgmtCo),
	                    function (data) {
	                        if(data.true_false){
	                        	bfdsmgr.firmmgmtco.addFirmAndMgmtCoSuccess(data);
	                        } else {
	                        	bfdsmgr.firmmgmtco.addFirmAndMgmtCoFail(data);
	                        }
	                    },
	                    'json');
	            }// end of confirm if
        	}// end of validation if
        },

        addFirmAndMgmtCoSuccess: function(data){
            $('#successMessage').html('You have successfully added the Management Company.');
            $('#success').removeClass('bfdsHidden');
        },

        addFirmAndMgmtCoFail: function(data){
            $('#successMessage').html("Fail! This Firm & Management Company entry was not created");
            $('#success').removeClass('bfdsHidden');
        },

        /*
         * don't submit the url until both fields have data
         * these two checks are in place to check from the systems input 
         * or from the company input, meaning if the user starts from either
         * input the other is checked for not empty
         */
        checkSystem: function(){
            if( $("#systemInput").val() != '' && $("#companyInput").val() != '' ){
            	bfdsmgr.firmmgmtco.getMgmtcoId();            	
            }
        },
        
        checkCompany: function(){
            if( $("#systemInput").val() != '' && $("#companyInput").val() != '' ){
            	bfdsmgr.firmmgmtco.getMgmtcoId();            	
            }
        },
        
        getMgmtcoId: function(){
            var newFirmMgmt = {
            		system: $('#systemInput').val(),
            		company: $('#companyInput').val()
            };
            $.get('showSingleMgmtCo',
                bfdsmgr.util.flattenObject(newFirmMgmt),
                function (data) {
                    if(!data.error && (data.length > 0)){
			     		$('#mgmtcoIdInput').val(data[0].mgmt_co_id);
			     		bfdsmgr.firmmgmtco.validateAdd();
				    	$("#systemInput").css('border-color','');
				    	$("#companyInput").css('border-color','');
			            $('#success').addClass('bfdsHidden');
                    } else {
				    	$("#systemInput").css('border-color','red');
				    	$("#companyInput").css('border-color','red');
			            $('#success').removeClass('bfdsHidden');
		                $('#successMessage').html("Fail! This Firm or Company entries are not valid!");
		                $('#submitFirmnMgmtCo').attr('disabled', true);            
                    }
                },
                'json');
        },
        
        /*
         * Confirm the existense of a firm, use its firm id
         */
        getFirmId: function(){
            var newSystem = {
            		shortName: $('#shortNameInput').val()
            };
            $.get('showSingleFirm',
                bfdsmgr.util.flattenObject(newSystem),
				function (data) {
				    if(!data.error && (data.length > 0)){
			     		$('#firmIdInput').val(data[0].firm_id);
			     		bfdsmgr.firmmgmtco.validateAdd();
				    	$("#shortNameInput").css('border-color','');
			            $('#success').addClass('bfdsHidden');
				    } else {
				    	// highlight the short name field in red
				    	$("#shortNameInput").css('border-color','red');
			            $('#success').removeClass('bfdsHidden');
		                $('#successMessage').html("Fail! This Short Name entry was not valid!");
		                $('#submitFirmnMgmtCo').attr('disabled', true);            
				    }
				},
				'json');
        },
        
        // from Utility mapper
        getBatchType: function(_val){
            var url = 'getBatchType';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){               

                	// make the user select a state
            		$('<option value=>-- Select --</option>').appendTo($('#batch_typ_cdDD')).get(0);
                	for(var mco=0; mco < data.length; mco++){
                    	if (typeof _val == 'undefined') {
                    		$('<option value=' + data[mco].batch_typ_cd + '>' + data[mco].batch_typ_dsc + '</option>').appendTo($('#batch_typ_cdDD')).get(0);
                    	}else{
                    		if(_val == bfdsmgr.util.trim(data[mco].batch_typ_cd)){
                        		$('<option value=' + data[mco].batch_typ_cd + ' selected>' + data[mco].batch_typ_dsc + '</option>').appendTo($('#batch_typ_cdDD')).get(0);
                    		}else{
                    			$('<option value=' + data[mco].batch_typ_cd + '>' + data[mco].batch_typ_dsc + '</option>').appendTo($('#batch_typ_cdDD')).get(0);
                    		}
                    	}
                	}
                }
            });        	
        },
        
        getOmnibusTradProc: function(_val){
            var url = 'getOmnibusTradProc';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){               

                	// make the user select a state
            		$('<option value=>-- Select --</option>').appendTo($('#omnibus_trad_proc_cdDD')).get(0);
                	for(var mco=0; mco < data.length; mco++){
                    	if (typeof _val == 'undefined') {
                    		$('<option value=' + data[mco].omnibus_trad_proc_cd + '>' + 
                    				data[mco].omnibus_trad_proc_dsc + '</option>').appendTo($('#omnibus_trad_proc_cdDD')).get(0);
                    	}else{
                    		if(_val == bfdsmgr.util.trim(data[mco].omnibus_trad_proc_cd)){
                        		$('<option value=' + data[mco].omnibus_trad_proc_cd + ' selected>' + 
                        				data[mco].omnibus_trad_proc_dsc + '</option>').appendTo($('#omnibus_trad_proc_cdDD')).get(0);
                    		}else{
                    			$('<option value=' + data[mco].omnibus_trad_proc_cd + '>' + 
                    					data[mco].omnibus_trad_proc_dsc + '</option>').appendTo($('#omnibus_trad_proc_cdDD')).get(0);
                    		}
                    	}
                	}
                }
            });        	
        },
                
        getSettlementType: function(_val){
            var url = 'getSettlementType';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){               

                	// make the user select a state
            		$('<option value=>-- Select --</option>').appendTo($('#settlement_typ_cdDD')).get(0);
                	for(var mco=0; mco < data.length; mco++){
                    	if (typeof _val == 'undefined') {
                    		$('<option value=' + data[mco].settlement_typ_cd + '>' + 
                    				data[mco].settlement_typ_dsc + '</option>').appendTo($('#settlement_typ_cdDD')).get(0);
                    	}else{
                    		if(_val == bfdsmgr.util.trim(data[mco].settlement_typ_cd)){
                        		$('<option value=' + data[mco].settlement_typ_cd + ' selected>' + 
                        				data[mco].settlement_typ_dsc + '</option>').appendTo($('#settlement_typ_cdDD')).get(0);
                    		}else{
                    			$('<option value=' + data[mco].settlement_typ_cd + '>' + 
                    					data[mco].settlement_typ_dsc + '</option>').appendTo($('#settlement_typ_cdDD')).get(0);
                    		}
                    	}
                	}
                }
            });        	
        },
        
        setupEventHandlers: function(){
        	$('#shortNameInput').mouseout(function(){
        		bfdsmgr.firmmgmtco.getFirmId();        		
        	});
        	$('#systemInput').mouseout(function(){
        		bfdsmgr.firmmgmtco.checkSystem();        		
        	});
        	$('#companyInput').mouseout(function(){
        		bfdsmgr.firmmgmtco.checkCompany();        		
        	});
        },

    // The following code to be reused as needed
        
        /*
         * validate the add and edit firn & mgmt co page
         * 
         *  Have to take another look at the Agreement approach 
         *  Taking this approach to illimate the need to set some event handler
         *  in the field it self
         *  The field validation occurs before the confirm submit
         */
        validateNwFrmNdMgmtCXrf: function(){
        	var errorMsg;
        	// list all the fields to be validated
        	var isgroup;
        	var isActiveInd;
        	var isFanMailInd;
        	var isOmniservInd;
        	var isPstSttlmntChngInd;
        	var isVisionInd;
        	var isptf_acat_trnsfr_ind;
        	var isdst_vho_ind;
        	var isdealer_num;
        	var isasof_trad_window;
        	var isomnibus_trad_proc_cdDD;
        	var isbatch_typ_cdDD;
        	var issettlement_typ_cdDD;
        	var errSet = false;
        	
        	isgroup  = this.group();
        	isActiveInd  = this.active_ind();
        	isFanMailInd = this.fan_mail_ind();
        	isOmniservInd = this.omniserv_ind();
        	isPstSttlmntChngInd = this.pst_sttlmnt_chng_ind();
        	isVisionInd = this.vision_ind();
        	isptf_acat_trnsfr_ind = this.ptf_acat_trnsfr_ind();
        	isdst_vho_ind = this.dst_vho_ind();
        	isdealer_num = this.dealer_num();
        	isasof_trad_window = this.asof_trad_window();
        	isomnibus_trad_proc_cdDD = this.omnibus_trad_proc_cdDD();
        	isbatch_typ_cdDD = this.batch_typ_cdDD();
        	issettlement_typ_cdDD = this.settlement_typ_cdDD();
        	
			errorMsg = '<div style="text-align:left"><ul>';
			
			/*
			 * Set the error message for the individual fields then display
			 * a message for all that are in error at once. 
			 */
        	if(!isgroup)
        	{
        		errorMsg += '<li>The Group field is invalid, a group is required.</li>';
				errSet = true;
			}

        	if(!isActiveInd)
        	{
        		errorMsg += '<li>The Active Indicator field is invalid, correct values are YES, NO, UNK or an empty field.</li>';
				errSet = true;
			}

        	if(!isFanMailInd)
        	{
        		errorMsg += '<li>The Fan Mail Indicator field is invalid, correct values are YES, NO, N/A or an empty field.</li>';
				errSet = true;
			}

        	if(!isOmniservInd)
        	{
        		errorMsg += '<li>The Omniserv Indicator field is invalid, correct values are YES, NO, N/A or an emptry field.</li>';
				errSet = true;
			}

        	if(!isPstSttlmntChngInd)
        	{
        		errorMsg += '<li>The Post Settlement Change Indicator field is invalid, correct values are YES, NO, N/A or an empty field.</li>';
				errSet = true;
			}

        	if(!isVisionInd)
        	{
        		errorMsg += '<li>The Vision Indicator field is invalid, correct values are YES, NO, N/A or an empty field.</li>';
				errSet = true;
			}

        	if(!isptf_acat_trnsfr_ind)
        	{
        		errorMsg += '<li>The PTF ACAT Trnsfr Indicator field is invalid, correct values are YES, NO, N/A or an empty field.</li>';
				errSet = true;
			}

        	if(!isdst_vho_ind)
        	{
        		errorMsg += '<li>The DST VHO Indicator field is invalid, correct values are YES, NO, N/A or an empty field.</li>';
				errSet = true;
			}

        	if(!isdealer_num){
        		errorMsg += '<li>The Dealer Number field is invalid, Numeric values are required.</li>';
				errSet = true;
        	}
/*
 * The user may not know the value a blank is ok otherwise a digit        	
*/        	
        	if(!isasof_trad_window){
        		errorMsg += '<li>The AS OF TRADE WINDOW field is invalid, Numeric values are required.</li>';
				errSet = true;
        	}
        	if(!isomnibus_trad_proc_cdDD){
        		errorMsg += '<li>No Omnibus Trade procedure selected, a selection is required.</li>';
				errSet = true;
        	}
        	
        	if(!isbatch_typ_cdDD){
        		errorMsg += '<li>No Batch type selected, a selection is required.</li>';
				errSet = true;
        	}
        	
        	if(!issettlement_typ_cdDD){
        		errorMsg += '<li>No Settlement type selected, a selection is required.</li>';
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
        
        group: function(){
        	var str = $('#groupInput').val(); 
        	return str.length > 0;
        },
        
        active_ind: function(){
        	var str = $('#active_indInput').val();
        	if((str.length == 0) || (bfdsmgr.util.isYesNoUNK(str))){
        		return true;
        	}else{
        		return false;
        	}        	
        },
        
        fan_mail_ind: function(){
        	var str = $('#fan_mail_indInput').val();
        	if((str.length == 0) || (bfdsmgr.util.isYesNo(str))){
        		return true;
        	}else{
        		return false;
        	}        	
        },
        
        omniserv_ind: function(){
        	var str = $('#omniserv_indInput').val();
        	if((str.length == 0) || (bfdsmgr.util.isYesNo(str))){
        		return true;
        	}else{
        		return false;
        	}        	
        },
        
        pst_sttlmnt_chng_ind: function(){
        	var str = $('#post_settlement_chng_indInput').val();
        	if((str.length == 0) || (bfdsmgr.util.isYesNo(str))){
        		return true;
        	}else{
        		return false;
        	}        	
        },
        
        vision_ind: function(){
        	var str = $('#vision_indInput').val();
        	if((str.length == 0) || (bfdsmgr.util.isYesNo(str))){
        		return true;
        	}else{
        		return false;
        	}        	
        },
        
        ptf_acat_trnsfr_ind: function(){
        	var str = $('#ptf_acat_trnsfr_indInput').val();
        	if((str.length == 0) || (bfdsmgr.util.isYesNo(str))){
        		return true;
        	}else{
        		return false;
        	}        	
        },
        
        dst_vho_ind: function(){
        	var str = $('#dst_vho_indInput').val();
        	if((str.length == 0) || (bfdsmgr.util.isYesNo(str))){
        		return true;
        	}else{
        		return false;
        	}        	
        },
                
        dealer_num: function(){
        	var str = $('#ta2000_dealr_numInput').val();
        	if((str.length > 0) || (bfdsmgr.util.isDigit(str))){
        		return true;
        	}else{
        		return false;
        	}        	
        },
        
        asof_trad_window: function(){
        	if(bfdsmgr.util.isBlank($('#asof_trad_windowInput').val())){ return true; }
        	if(bfdsmgr.util.isDigit($('#asof_trad_windowInput').val())){ return true; }
        	return false;
        },
        
        omnibus_trad_proc_cdDD: function(){
        	return $('#omnibus_trad_proc_cdDD').val().length != 0;
        },
        
        batch_typ_cdDD: function(){        	
        	return $('#batch_typ_cdDD').val().length != 0;
        },
        
        settlement_typ_cdDD: function(){
        	return $('#settlement_typ_cdDD').val().length != 0;
        },
        
    // All fields are required
        validateAdd: function() {
            if( $("#firmIdInput").val() == '' || $("#mgmtcoIdInput").val() == '' )
            {
                $('#submitFirmnMgmtCo').attr('disabled', true);
            } else {
                $('#submitFirmnMgmtCo').attr('disabled', false);
            }
        },
        
        resetErrorMsg: function(){
            $('#successMessage').addClass('bfdsHidden');
        },

        editFirmAndMgmtCo: function(){
                $.ajax({
                     type: "GET",
                     url: 'editFirmAndMgmtCo',
                     dataType: "json",
                     cache: false,
                     success: function(data){
                  		$('#companyInput').val(bfdsmgr.util.trim(data.mgmt_co_long_nm));
                 		$('#systemInput').val(bfdsmgr.util.trim(data.long_nm));
                 		$('#firmIdInput').val(data.firm_id);
                		$('#mgmtcoIdInput').val(data.mgmt_co_id);
                		$('#groupInput').val(bfdsmgr.util.trim(data.group));
                		$('#ta2000_dealr_numInput').val(bfdsmgr.util.trim(data.ta2000_dealr_num));
                		$('#active_indInput').val(bfdsmgr.util.trim(data.active_ind));
                		$('#active_dtInput').val(bfdsmgr.util.trim(data.active_dt));
                		$('#inactive_dtInput').val(bfdsmgr.util.trim(data.inactive_dt));
                		$('#vision_indInput').val(bfdsmgr.util.trim(data.vision_ind));
                		$('#fan_mail_indInput').val(bfdsmgr.util.trim(data.fan_mail_ind));
                		$('#omnibus_conversion_dtInput').val(bfdsmgr.util.trim(data.omnibus_conversion_dt));
                		$('#omniserv_indInput').val(bfdsmgr.util.trim(data.omniserv_ind));
                		$('#asof_trad_windowInput').val(bfdsmgr.util.trim(data.asof_trad_window));
            			bfdsmgr.firmmgmtco.getOmnibusTradProc(bfdsmgr.util.trim(data.omnibus_trad_proc_cd));
            			bfdsmgr.firmmgmtco.getBatchType(bfdsmgr.util.trim(data.batch_typ_cd));
            			bfdsmgr.firmmgmtco.getSettlementType(bfdsmgr.util.trim(data.settlement_typ_cd));
                		$('#post_settlement_chng_indInput').val(bfdsmgr.util.trim(data.post_settlement_chng_ind));
                		$('#ptf_acat_trnsfr_indInput').val(bfdsmgr.util.trim(data.ptf_acat_trnsfr_ind));
                		$('#dst_vho_indInput').val(bfdsmgr.util.trim(data.dst_vho_ind));                		                 		
                     }
                 });
         },

        updateFirmAndMgmtCo: function(){
            var newFirmMgmtCo = {
            		group: $('#groupInput').val(),
            		ta2000_dealr_num: $('#ta2000_dealr_numInput').val(),
            		active_ind: $('#active_indInput').val(),
            		active_dt: $('#active_dtInput').val(),
            		inactive_dt: $('#inactive_dtInput').val(),
            		vision_ind: $('#vision_indInput').val(),
            		fan_mail_ind: $('#fan_mail_indInput').val(),
            		omnibus_conversion_dt: $('#omnibus_conversion_dtInput').val(),
            		omniserv_ind: $('#omniserv_indInput').val(),
            		asof_trad_window: $('#asof_trad_windowInput').val(),
            		omnibus_trad_proc_cd: $('#omnibus_trad_proc_cdDD').val(),
            		batch_typ_cd: $('#batch_typ_cdDD').val(),
            		settlement_typ_cd: $('#settlement_typ_cdDD').val(),
            		post_settlement_chng_ind: $('#post_settlement_chng_indInput').val(),
            		ptf_acat_trnsfr_ind: $('#ptf_acat_trnsfr_indInput').val(),
            		dst_vho_ind: $('#dst_vho_indInput').val()
            };
        	Ok = this.validateNwFrmNdMgmtCXrf();
        	if(Ok){
	            if(confirm("Are you sure you want to update this Firm and Management Company data?")) { 
	                $.post('updateFAMgmtCo',
	                    bfdsmgr.util.flattenObject(newFirmMgmtCo),
	                    function (data) {
	                        if(data.true_false){
	                        	bfdsmgr.firmmgmtco.updateFirmAndMgmtCoSuccess(data);
	                        } else {
	                        	bfdsmgr.firmmgmtco.updateFirmAndMgmtCoFail(data);
	                        }
	                    },
	                    'json');                    
	            }// end of confirm if
        	}// end of validation if
        },
        
      updateFirmAndMgmtCoSuccess: function(data){
          $('#successMessage').html('You have successfully updated the Firm and Management Company record.');
          $('#success').removeClass('bfdsHidden');
      },

      updateFirmAndMgmtCoFail: function(data){
          $('#successMessage').html("Fail! This Firm and Management Company entry was not updated");
          $('#success').removeClass('bfdsHidden');
      },

      /*
       * Moved the Firm & Mgmt Co delete to the Firms js.
       * Making an attempt to move all Firm releated items to the Firm
       * JS, Controller, Mapper and Service 
       */
      /*
       * Delete Firm & Mgmt Co record
       * For the moment the FirmAndMgmtController is handling this
       */
      deleteFirmAndMgmtCo: function(id){
          if(confirm("Are you sure you want to delete this Firm and MgmtCo record?")) {
              $.post('deleteFirmAndMgmtCo',
                      function(data){
                  		if(data.true_false){
                  			bfdsmgr.firm.deleteFirmAndMgmtCoSuccess(data);
                  		}else{
                  			bfdsmgr.firm.deleteFirmAndMgmtCoFailure(data);
                  		}
                      },
                      'json');
          }
      },

      deleteFirmAndMgmtCoSuccess : function(data){
		$('#success').html('Firm And MgmtCo record Successfully Deleted');
		$('#success').removeClass('bfdsHidden');
      },

      deleteFirmAndMgmtCoFailure : function(data){
        $('#success').html('Failed to delete Firm And MgmtCo record ' + '\n' + data.message);
        $('#success').removeClass('bfdsHidden');
      },


      /*
       * this function uses user input to search for the Firm, MgmtCo xref record
       * the Spring handler uses the short name to get the Firm id and the Sys, Comp
       * string to get the MgmtCo id, Then uses those to get the Firm and MgmtCo 
       * xref record.
       */
      setSearchInput : function(shortname, system, company){
          var newFAMSearch = {
            shortname: shortname,
          	system: system,
          	company: company
          };
      	$.post('setFAMCoToSearch',
          		bfdsmgr.util.flattenObject(newFAMSearch),
                  function (data) {
          	
                      if(!data.true_false){
                          bfdsmgr.firm.searchFirmFail(data);
                      }
                      
                  },
                  'json');
      },
      
      searchFirmFail: function(data){
          $('#successMessage').html("Fail! This Firm was not found");
          $('#success').removeClass('bfdsHidden');
      },

      /*
       * The record has been created so this function sets the row to edit it only needs the
       * firm and mgmtco ids for the table row
       */
      setRowToEdit : function(data){
      	var _firmId;;
      	var _mgmtcoId;

      	if(navigator.appName == 'Netscape'){
          	_firmId   = escape(data.cells[2].childNodes[0].wholeText);
          	_mgmtcoId = escape(data.cells[3].childNodes[0].wholeText);
      	}else{
          	_firmId   = escape(data.cells[2].innerHTML);
          	_mgmtcoId = escape(data.cells[3].innerHTML);
      	}

        var newFirm = {
        		firmId: _firmId,
        		mgmtcoId: _mgmtcoId
            };
        	$.post('setFAMCoRowToEdit',
            		bfdsmgr.util.flattenObject(newFirm),
                    function (data) {
            	
                        if(!data.true_false){
                            $('#successMessage').html("Fail! This Firm & Company record was not found");
                            $('#success').removeClass('bfdsHidden');
                        }
                        
                    },
                    'json');
                            	
	    	$('tr').removeClass('gridRowHighlight');
	    	data.className = "gridRowHighlight";
	  },

	  activateEditPage: function(data){
		  window.parent.setFieldPage('editFrmNMgmtCoPage');
	  }
            
    };
})();