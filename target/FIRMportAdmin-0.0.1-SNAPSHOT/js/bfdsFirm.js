if (typeof bfdsmgr == 'undefined') {
    bfdsmgr = {};
}

bfdsmgr.firm = (function() {
	/*
	 * The _MOUNT is the attach point found at the bottom of the view page
	 */
    var _MOUNT = "currentFirm";
    var _grid = null;
    var _rowClassName = null;
    var _search_nm = "";
	var _firm_id;
    var isActiveInd;
	var isNSCCMemberNum;
	var isNSCCNetworkAlpha;
    var sel_clrg_frms = '';
    var sel_firm_type = '';
    var sel_shrhldr_svc_mdl = '';
    var sel_brkrg_pltfrm = '';
    var sel_subacct_pltfrm = '';
    var sel_data_trans_mthd = '';
    var sel_omnibus_trad_proc = '';
    var sel_settlement_typ = '';
    var sel_nscc_num = '';
    var sel_nscc_alpha = '';
    var sel_pricing_source = '';
    var current_layout = 1;
	var layout;
	var layout1;
	var layout2;
	// the long view is 38, short view 5
	var _firm_id_index = 5;
    
    return {
    	/*
    	 *  initializes the header text of the filtered grid
    	 *  
    	 *  There are 0 to 38 (39 items) to the Firm grid
    	 *   
    	 */
        initializeFilteredGrid: function(){
        	layout1 = new Array(
                {field: "button", name: "Company", width: "40px", button: true, headerClasses: "bfdsmgrBoldText"}, 
                {field: "long_nm", name: "Long Name", width: "160px", headerClasses: "bfdsmgrBoldText"},
                {field: "short_nm", name: "Short Name", width: "160px", headerClasses: "bfdsmgrBoldText"},
                {field: "clearing_firm_id", name: "Clearing Firm Id", width: "200px", headerClasses: "bfdsmgrBoldText"},
                {field: "clearing_firm_num", name: "Clearing Firm Number", width: "200px", headerClasses: "bfdsmgrBoldText"},
                {field: "clearing_firm_nm", name: "Clearing Firm Name", width: "200px", headerClasses: "bfdsmgrBoldText"},
                {field: "firm_address1", name: "Firm Address 1", width: "200px", headerClasses: "bfdsmgrBoldText"},
                {field: "firm_address2", name: "Firm Address 2", width: "200px", headerClasses: "bfdsmgrBoldText"},
                {field: "firm_city", name: "Firm City", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "firm_state_cd", name: "Firm State", width: "140px", headerClasses: "bfdsmgrBoldText"}, 
                {field: "firm_website", name: "Firm Website", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "prmry_bank_nm", name: "Primary Bank Name", width: "140px", headerClasses: "bfdsmgrBoldText"}, 
                {field: "prmry_bank_address1", name: "Primary Bank Address1", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "prmry_bank_address2", name: "Primary Bank Address2", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "prmry_bank_city", name: "Primary Bank City", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "prmry_bank_state_cd", name: "Primary Bank State", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "prmry_bank_zip_cd", name: "Primary Bank Zip", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "prmry_bank_aba_num", name: "Primary Bank Aba Num", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "prmry_bank_acct_num", name: "Primary Bank Account Num", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "firm_tax_id", name: "Firm Tax Id", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "firm_typ_cd", name: "Firm Typ Cd", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "clrng_frm_ind", name: "Clrng Frm Ind", width: "140px", headerClasses: "bfdsmgrBoldText"}, 
                {field: "shrhldr_svc_mdl_cd", name: "Shrhldr Svc Mdl", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "ntwrk_mtrx_lvl_id", name: "Ntwrk Mtrx Lvl Id", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "nscc_ntwrk_alpha_cd", name: "NSCC Ntwrk Alpha", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "subacct_pltfrm_cd", name: "Sub Accountng Pltfrm", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "bin_mask", name: "Bin Mask", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "site_inspection_dt", name: "Site Inspection Dt", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "sae16_ind", name: "SAE16 Ind", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "industry_attestation_ind", name: "Industry Attestation Ind", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "mf_profile_II_ind", name: "MF Profile II Ind", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "brkrg_pltfrm", name: "Brkrg Pltfrm", width: "140px", headerClasses: "bfdsmgrBoldText"}, 
                {field: "spec_pckg_link", name: "Spec Pckg Link", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "trade_cut_off", name: "Trade Cut Off", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "firm_exit_ind", name: "Firm Exit Ind", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "omnibus_dist_mdl_cd", name: "Omnibus Dist Mdl", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "data_trans_mthd_cd", name: "Data Trans Mthd", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "nscc_member_num", name: "Nscc Member Number", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "firm_id", name: "Hidden Id", width: "60px", hidden: true, headerClasses: "bfdsHidden"} 
            );
        	
        	layout2 = new Array(
                    {field: "button", name: "Company", width: "40px", button: true, headerClasses: "bfdsmgrBoldText"}, 
                    {field: "long_nm", name: "Long Name", width: "160px", headerClasses: "bfdsmgrBoldText"},
                    {field: "nscc_member_num", name: "Nscc Member Number", width: "120px", headerClasses: "bfdsmgrBoldText"},
                    {field: "firm_typ_cd", name: "Firm Type Cd", width: "120px", headerClasses: "bfdsmgrBoldText"},
                    {field: "clrng_frm_ind", name: "Clearing Firm Indicator", width: "100px", headerClasses: "bfdsmgrBoldText"}, 
                    {field: "firm_id", name: "Hidden Id", width: "60px", hidden: true, headerClasses: "bfdsHidden"} 
                );
            
    		layout = layout2;
    		_firm_id_index = 5;
    		current_layout = 1;
            
        	var url = 'showAllFirms?search_nm=' + _search_nm;
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
		                        defaultSort: 'clearing_firm_num',
		                        filterLabel: 'Clearing Firm Number',
		                        data: data,
		                        filterColumn: 'clearing_firm_num',
		                        width: "800px",
		                        className: "pagedGridBorder"
		                    });
	                $('#loading').addClass('bfdsHidden');
	                $('#title').removeClass('bfdsHidden');
                }
            });

            /* 
        	 * disable the edit nav link until the user has selected a record
        	 * disable it again after they submit the edited record
        	 */
            $('#edit_firms',top.document).attr('disabled', true);
        },
          
        get_current_layout: function(){
        	return current_layout;
        },
        
        activateEditPage: function(data){
        	window.parent.setFieldPage('editFirmPage');
        },
        
        /*
         * Now activating the addTA2000SubFirmPage at some point a change to the
         * AddTA button on the Parent Firm view will have to be changed 
         */
        activatedoAddFrmNMgmtCoPage: function(firm_id, mgmt_co_id){
        	window.parent.setFieldPage('addTA2000SubFirmPage');
        },
        
        get_sel_clrg_frms: function(){ return $.trim(sel_clrg_frms); },
        get_sel_firm_type: function(){ return $.trim(sel_firm_type); },
        get_sel_shrhldr_svc_mdl: function(){ return $.trim(sel_shrhldr_svc_mdl); },
        get_sel_brkrg_pltfrm: function(){ return $.trim(sel_brkrg_pltfrm); },
        get_sel_subacct_pltfrm: function(){ return $.trim(sel_subacct_pltfrm); },
        get_sel_data_trans_mthd: function(){ return $.trim(sel_data_trans_mthd); },
        get_sel_omnibus_trad_proc: function(){ return $.trim(sel_omnibus_trad_proc); },
        get_sel_settlement_typ: function(){ return $.trim(sel_settlement_typ); },
        get_sel_nscc_num: function(){ return sel_nscc_num; },
        get_sel_nscc_alpha: function(){ return sel_nscc_alpha; },
        get_sel_pricing_source: function(){ return sel_pricing_source; },
        
        get_nscc_data: function(){        	

        	/*
        	 * Max 4 digit nscc number, with leading zeros
        	 */
        	sel_nscc_alpha = '';
			sel_nscc_num   = '';
			isNSCCMemberNum    = true;
			isNSCCNetworkAlpha = true;
			
			for(var nscc=1; nscc <= 10; nscc++){
				if($.trim($('#nscc_num_' + nscc).val()).toUpperCase() != 'N/A'){
	        		if($('#nscc_num_' + nscc).val().length > 0){
	        			if(bfdsmgr.util.isDigit($('#nscc_num_' + nscc).val())){
	        				if($('#nscc_alpha_' + nscc).val().toUpperCase() != 'N/A'){
	        					if(sel_nscc_alpha.search($('#nscc_alpha_' + nscc).val()) != -1){
	        						$('#nscc_alpha_' + nscc).css('background-color', '#ff6600');
	        						isNSCCNetworkAlpha = false;
	        					}
	        					sel_nscc_alpha += $('#nscc_alpha_' + nscc).val() + ',';
	        				}else{
	        					sel_nscc_alpha = '';
	        					sel_nscc_num   = '';
	        					break;
	        				}
	        				
	        				if(sel_nscc_num.search($('#nscc_num_' + nscc).val()) != -1){
	        					$('#nscc_num_' + nscc).css('background-color', '#ff6600');
	        					isNSCCMemberNum = false;
	        				}
	        				sel_nscc_num += $('#nscc_num_' + nscc).val() + ',';
	        			}else{
	    					sel_nscc_alpha = '';
	    					sel_nscc_num   = '';
	    					break;
	    				}
	        		}
				}else{
					sel_nscc_alpha = 'N/A';
					sel_nscc_num   = 'N/A';
					break;
				}
        	}
        	
        	// trim the trailing comma
			if(sel_nscc_num.search(',') != -1){
				sel_nscc_num = sel_nscc_num.substring(0, sel_nscc_num.length - 1);
			}
			if(sel_nscc_alpha.search(',') != -1){
				sel_nscc_alpha = sel_nscc_alpha.substring(0, sel_nscc_alpha.length - 1);
			}
        },
        /*
         * If all required field have been entered submit the new firm
         */
        addFirm: function(){
        	/*
        	 * Handle nscc_member_num & alpha
        	 */
        	this.get_nscc_data();
        	
            var newFirm = {
            		long_nm: $('#long_nmInput').val(),
           		    short_nm: $('#short_nmInput').val(),
           		    clrg_frms: escape(this.get_sel_clrg_frms()), 
            		firm_address1: $('#firm_address1Input').val(),
            		firm_address2: $('#firm_address2Input').val(),
            		firm_city: $('#firm_cityInput').val(),
            		firm_state_cd: $('#firm_state_cdDD').val(),
            		firm_zip_cd: $('#firm_zip_cdInput').val(),
            		firm_website: $('#firm_websiteInput').val(),
            		prmry_bank_nm: $('#prmry_bank_nmInput').val(),
            		prmry_bank_address1: $('#prmry_bank_address1Input').val(),
            		prmry_bank_address2: $('#prmry_bank_address2Input').val(),
            		prmry_bank_city: $('#prmry_bank_cityInput').val(),
            		prmry_bank_state_cd: $('#prmry_bank_state_cdDD').val(),
            		prmry_bank_zip_cd: $('#prmry_bank_zip_cdDD').val(),
            		prmry_bank_aba_num: $('#prmry_bank_aba_numInput').val(),
            		prmry_bank_acct_num: $('#prmry_bank_acct_numInput').val(),
            		firm_tax_id: $('#firm_tax_idInput').val(),
            		firm_typ_cd: escape(this.get_sel_firm_type()),            		
            		clrng_frm_ind: $('#clrng_frm_indInput').val(),
            		shrhldr_svc_mdl_cd: escape(this.get_sel_shrhldr_svc_mdl()),
            		ntwrk_mtrx_lvl_id: $('#ntwrk_mtrx_lvl_idDD').val(),
            		nscc_ntwrk_alpha_cd: this.get_sel_nscc_alpha(),
            		subacct_pltfrm_cd: escape(this.get_sel_subacct_pltfrm()),
            		bin_mask: $('#bin_maskInput').val(),
            		site_inspection_dt: $('#site_inspection_dtInput').val(),
            		sae16_ind: $('#sae16_indDD').val(),
            		industry_attestation_ind: $('#industry_attestation_indDD').val(),
            		mf_profile_II_ind: $('#mf_profile_II_indInput').val(),            		
            		brkrg_pltfrm: escape(this.get_sel_brkrg_pltfrm()),
            		spec_pckg_link: $('#spec_pckg_linkInput').val(),
            		trade_cut_off: $('#trade_cut_offInput').val(),
            		firm_exit_ind: $('#firm_exit_indInput').val(),
            		omnibus_dist_mdl_cd: escape($('#omnibus_dist_mdl_cdDD').val()),            		
            		omnibus_trad_proc_cd: escape(this.get_sel_omnibus_trad_proc()),
            		data_trans_mthd_cd: escape(this.get_sel_data_trans_mthd()),
            		nscc_member_num: this.get_sel_nscc_num(),
            		commserv_ind: $('#commserv_indDD').val(),
            		op_review_cd: escape($('#op_review_cdInput').val()),
            		op_review_dt: $('#op_review_dtInput').val(),
            		spec_pckg_ind: $('#spec_pckg_indDD').val(),
            		vision_ind: $('#vision_indDD').val(),
            		fan_mail_ind: $('#fan_mail_indDD').val(),
            		omniserv_ind: escape($('#omniserv_indDD').val()),
            		batch_typ_cd: escape($('#batch_typ_cdDD').val()),
            		dst_vho_ind: escape($('#dst_vho_indDD').val()),
            		pos_file_sched_cd: escape($('#pos_file_sched_cdDD').val()),
            		settlement_typ: escape(this.get_sel_settlement_typ()),
            		active_ind: $('#active_indInput').val(),
            		inactive_dt: $('#inactive_dtInput').val(),
            		pricing_source: escape(this.get_sel_pricing_source())
              	    };
            // checkem
            Ok = this.validateFields();
            if(Ok){
//                $('#submitFirm').attr('disabled', true);
	        	$('#msg-p').html('Are you sure you want to add this Parent Firm?');
	    		$( "#dlg-msg" ).dialog({
	    			modal: true,
	    			buttons: {
	    				Ok: function() {
	    					// Closes the Are you sure dialog
	    					$( this ).dialog( "close" );

	    					$.post('addFirm',
	    	                		bfdsmgr.util.flattenObject(newFirm),
	    	                        function (data) {
	    	                	
	    	                            if(data.true_false){
	    	                            	
	    	                            	$('#msg-p').html('You have successfully added the Parent Firm.');
	    	                        		$( "#dlg-msg" ).dialog({
	    	                        			modal: true,
	    	                        			buttons: {
	    	                        				Ok: function() {
	    	                        					$( this ).dialog( "close" );
	    	                        	            	window.top.location.href="firmsNav";
	    	                        				}
	    	                        			}
	    	                        		});
	    	                            	
	    	                            } else {
	    	                            	
	    	                            	var msg = "Fail! The Parent Firm was not created!";
	    	                            	
	    	                            	if(data.duplicate){
	    	                            		msg += data.message;
	    	                            	}
	    	                                $('#successMessage').html(msg);
	    	                                $('#success').removeClass('bfdsHidden');
	    	                            }
	    	                            
	    	                        },
   	                        'json');
	    				},
	    				Cancel: function(){
	    					$( this ).dialog( "close" );	    					
//	    	            	window.top.location.href="firmsNav";
	    				}
	    			}
	    		});	            
            } // end of Ok if
        },

        addFirmAndMgmtCoSuccess: function(data){
            $('#successMessage').html('You have successfully added the Firm & Management Company Xref.');
            $('#success').removeClass('bfdsHidden');
        },

        addFirmAndMgmtCoFail: function(data){
            $('#successMessage').html("Fail! This Firm & Management Company Xref entry was not created<br/>" + data.message);
            $('#success').removeClass('bfdsHidden');
        },

        /*
         * This allows the user to quickly select Clearing Firms from the Add or Edit Parent Firm
         * pages. The dialog is loaded with a call to getClearingFirms()
         * 
         */
        clearingFirmDialog: function(){

			$('#get_clr_firm_dialog').dialog({height: 400, 
            							width: 600,
            							maxWidth: 600,
            							minWidth: 450,
            							maxHeight: 475, 
            							minHeight: 475, 
            							modal: true,
            							buttons: { "Submit": function() {
            												var tmpStr = '';

            												$('#clr_firm_to option').each(function(){
            													tmpStr += $.trim($(this).val()) + ','; 
            												}).change();
            												            												
            												sel_clrg_frms = tmpStr.substring(0, (tmpStr.length - 1));
            												
															$(this).dialog("close");
															/*
															 * need to refresh the view to clear the cache
															 * expire or no-cache not working 
															 */
															//window.location.reload();
															if(sel_clrg_frms.length > 0){
																bfdsmgr.util.setFieldColor('#clearing_firm_idInput');
															}
														},
														
            									   "Close": function() { 
            										   						$(this).dialog("close"); 
            																//window.location.reload();
            										   				   }
            										   				   
            									 } 							
            							});
		},

		cancelFirm: function(){
        	window.top.location.href="firmsNav";
		},
		
        firmTypeDialog: function(){

			$('#get_firm_type_dialog').dialog({height: 400, 
            							width: 600,
            							maxWidth: 600,
            							minWidth: 450,
            							maxHeight: 475, 
            							minHeight: 475, 
            							modal: true,
            							buttons: { "Submit": function() { 
            												var tmpStr = '';
															
															$('#firm_typ_to option').each(function(){
																tmpStr += $.trim($(this).val()) + ','; 
															}).change();
															
															sel_firm_type = tmpStr.substring(0, tmpStr.length - 1);;
																				 															 							
															$(this).dialog("close");
															/*
															 * need to refresh the view to clear the cache
															 * expire or no-cache not working 
															 */
															//window.location.reload();
															if(sel_firm_type.length > 0){
																bfdsmgr.util.setFieldColor('#firm_typ_cdInput');
															}
														},
														
            									   "Close": function() { 
            										   						$(this).dialog("close"); 
            																//window.location.reload();
            										   				   }
            										   				   
            									 } 							
            							});
		},

		shrhldrServiceModelDialog: function(){

			$('#get_shrhldr_svc_mdl_cd_dialog').dialog({height: 400, 
            							width: 600,
            							maxWidth: 600,
            							minWidth: 450,
            							maxHeight: 475, 
            							minHeight: 475, 
            							modal: true,
            							buttons: { "Submit": function() { 
            												var tmpStr = '';
															
															$('#shrhldr_svc_mdl_to option').each(function(){
																tmpStr += $.trim($(this).val()) + ','; 
															}).change();
															
															sel_shrhldr_svc_mdl = tmpStr.substring(0, tmpStr.length - 1);
															
															if((sel_shrhldr_svc_mdl.length > 3) && 
																	(sel_shrhldr_svc_mdl.search('N/A') != -1)){
																confirm('Error: N/A plus other selection is disallowed!');
																bfdsmgr.util.removeAll('#shrhldr_svc_mdl_frm','#shrhldr_svc_mdl_to');
																sel_shrhldr_svc_mdl = '';
            												}															
																 															 							
															$(this).dialog("close");
															/*
															 * need to refresh the view to clear the cache
															 * expire or no-cache not working 
															 */
															//window.location.reload();
															if(sel_shrhldr_svc_mdl.length > 0){
																bfdsmgr.util.setFieldColor('#shrhldr_svc_mdl_cdInput');
															}
														},
														
            									   "Close": function() { 
            										   						$(this).dialog("close"); 
            																//window.location.reload();
            										   				   }
            										   				   
            									 } 							
            							});
		},

		brkrgPlatformDialog: function(){

			$('#get_brkrg_pltfrm_dialog').dialog({height: 400, 
            							width: 600,
            							maxWidth: 600,
            							minWidth: 450,
            							maxHeight: 475, 
            							minHeight: 475, 
            							modal: true,
            							buttons: { "Submit": function() {
            												var tmpStr = '';
															
															$('#brkrg_pltfrm_to option').each(function(){
																tmpStr += $.trim($(this).val()) + ','; 
															}).change();
															
															sel_brkrg_pltfrm = tmpStr.substring(0, tmpStr.length - 1);
																
															if((sel_brkrg_pltfrm.length > 3) && 
																	(sel_brkrg_pltfrm.search('N/A') != -1)){
																confirm('Error: N/A plus other selection is disallowed!');
																bfdsmgr.util.removeAll('#brkrg_pltfrm_frm','#brkrg_pltfrm_to');
																sel_brkrg_pltfrm = '';
            												}
															
															$(this).dialog("close");
															/*
															 * need to refresh the view to clear the cache
															 * expire or no-cache not working 
															 */
															//window.location.reload();
															if(sel_brkrg_pltfrm.length > 0){
																bfdsmgr.util.setFieldColor('#brkrg_pltfrmInput');
															}
														},
														
            									   "Close": function() { 
            										   						$(this).dialog("close"); 
            																//window.location.reload();
            										   				   }
            										   				   
            									 } 							
            							});
		},

		subAccountingPlatformDialog: function(){

			$('#get_subacct_pltfrm_dialog').dialog({height: 400, 
            							width: 600,
            							maxWidth: 600,
            							minWidth: 450,
            							maxHeight: 475, 
            							minHeight: 475, 
            							modal: true,
            							buttons: { "Submit": function() {
				            								var tmpStr = '';
															
															$('#subacct_pltfrm_to option').each(function(){
																tmpStr += $.trim($(this).val()) + ','; 
															}).change();
															
															sel_subacct_pltfrm = tmpStr.substring(0, tmpStr.length - 1);
															
															if((sel_subacct_pltfrm.length > 3) && 
																	(sel_subacct_pltfrm.search('N/A') != -1)){
																confirm('Error: N/A plus other selection is disallowed!');
																bfdsmgr.util.removeAll('#subacct_pltfrm_frm','#subacct_pltfrm_to');
																sel_subacct_pltfrm = '';
            												}															
								 															 							
															$(this).dialog("close");
															/*
															 * need to refresh the view to clear the cache
															 * expire or no-cache not working 
															 */
															//window.location.reload();
															if(sel_subacct_pltfrm.length > 0){
																bfdsmgr.util.setFieldColor('#subacct_pltfrm_cdInout');
															}
														},
														
            									   "Close": function() { 
            										   						$(this).dialog("close"); 
            																//window.location.reload();
            										   				   }
            										   				   
            									 } 							
            							});
		},

		dataTransmissionMethodDialog: function(){

			$('#get_data_trans_mthd_cd_dialog').dialog({height: 400, 
            							width: 600,
            							maxWidth: 600,
            							minWidth: 450,
            							maxHeight: 475, 
            							minHeight: 475, 
            							modal: true,
            							buttons: { "Submit": function() {
				            								var tmpStr = '';
															
															$('#data_trans_mthd_cd_to option').each(function(){
																tmpStr += $.trim($(this).val()) + ','; 
															}).change();
															
															sel_data_trans_mthd = tmpStr.substring(0, tmpStr.length - 1);
															
															if((sel_data_trans_mthd.length > 3) && 
																	(sel_data_trans_mthd.search('N/A') != -1)){
																confirm('Error: N/A plus other selection is disallowed!');
																bfdsmgr.util.removeAll('#data_trans_mthd_cd_frm','#data_trans_mthd_cd_to');
																sel_data_trans_mthd = '';
            												}
															
															$(this).dialog("close");
															/*
															 * need to refresh the view to clear the cache
															 * expire or no-cache not working 
															 */
															//window.location.reload();
															if(sel_data_trans_mthd.length > 0){
																bfdsmgr.util.setFieldColor('#data_trans_mthd_cd');
															}
														},
														
            									   "Close": function() { 
            										   						$(this).dialog("close"); 
            																//window.location.reload();
            										   				   }
            										   				   
            									 } 							
            							});
		},

		omnibusTradeProcedureDialog: function(){

			$('#get_omnibus_trad_proc_cd_dialog').dialog({height: 400, 
            							width: 600,
            							maxWidth: 600,
            							minWidth: 450,
            							maxHeight: 475, 
            							minHeight: 475, 
            							modal: true,
            							buttons: { "Submit": function() { 
				            								var tmpStr = '';
															
															$('#omnibus_trad_proc_cd_to option').each(function(){
																tmpStr += $.trim($(this).val()) + ','; 
															}).change();
															
															sel_omnibus_trad_proc = tmpStr.substring(0, tmpStr.length - 1);
															
															if((sel_omnibus_trad_proc.length > 3) && 
																	(sel_omnibus_trad_proc.search('N/A') != -1)){
																confirm('Error: N/A plus other selection is disallowed!');
																bfdsmgr.util.removeAll('#omnibus_trad_proc_cd_frm','#omnibus_trad_proc_cd_to');
																sel_omnibus_trad_proc = '';
            												}															
								 															 															 															 															 															 							
															$(this).dialog("close");
															/*
															 * need to refresh the view to clear the cache
															 * expire or no-cache not working 
															 */
															//window.location.reload();
															if(sel_omnibus_trad_proc.length > 0){
																bfdsmgr.util.setFieldColor('#omnibus_trad_proc_cd');
															}
														},
														
            									   "Close": function() { 
            										   						$(this).dialog("close"); 
            																//window.location.reload();
            										   				   }
            										   				   
            									 } 							
            							});
		},

		settlementTypeDialog: function(){

			$('#get_settlement_typ_cd_dialog').dialog({height: 400, 
            							width: 600,
            							maxWidth: 600,
            							minWidth: 450,
            							maxHeight: 475, 
            							minHeight: 475, 
            							modal: true,
            							buttons: { "Submit": function() { 
				            								var tmpStr = '';
															
															$('#settlement_typ_cd_to option').each(function(){
																tmpStr += $.trim($(this).val()) + ','; 
															}).change();
															
															sel_settlement_typ = tmpStr.substring(0, tmpStr.length - 1);
															
															if((sel_settlement_typ.length > 3) && 
																	(sel_settlement_typ.search('N/A') != -1)){
																confirm('Error: N/A plus other selection is disallowed!');
																bfdsmgr.util.removeAll('#settlement_typ_cd_frm','#settlement_typ_cd_to');
																sel_settlement_typ = '';
            												}															
								 															 															 															 															 															 															 															 							
															$(this).dialog("close");
															/*
															 * need to refresh the view to clear the cache
															 * expire or no-cache not working 
															 */
															//window.location.reload();
															if(sel_settlement_typ.length > 0){
																bfdsmgr.util.setFieldColor('#settlement_typ_cd');
															}
														},
														
            									   "Close": function() { 
            										   						$(this).dialog("close"); 
            																//window.location.reload();
            										   				   }
            										   				   
            									 } 							
            							});
		},

		pricingSourceDialog: function(){

			$('#get_pricing_source_dialog').dialog({height: 400, 
            							width: 600,
            							maxWidth: 600,
            							minWidth: 450,
            							maxHeight: 475, 
            							minHeight: 475, 
            							modal: true,
            							buttons: { "Submit": function() { 
				            								var tmpStr = '';
															
															$('#pricing_source_to option').each(function(){
																tmpStr += $.trim($(this).val()) + ','; 
															}).change();
															
															sel_pricing_source = tmpStr.substring(0, tmpStr.length - 1);
															
															if((sel_pricing_source.length > 3) && 
																	(sel_pricing_source.search('N/A') != -1)){
																confirm('Error: N/A plus other selection is disallowed!');
																bfdsmgr.util.removeAll('#pricing_source_frm','#pricing_source_to');
																sel_pricing_source = '';
            												}
								 															 															 															 															 															 															 															 							
															$(this).dialog("close");
															/*
															 * need to refresh the view to clear the cache
															 * expire or no-cache not working 
															 */
															//window.location.reload();
															if(sel_pricing_source.length > 0){
																bfdsmgr.util.setFieldColor('#pricing_source_cd');
															}            							
														},
														
            									   "Close": function() { 
            										   						$(this).dialog("close"); 
            																//window.location.reload();
            										   				   }
            										   				   
            									 } 							
            							});
		},

		/*
         * This allows the user to quickly select a Firm and Company from 
         * the Firm list view. The dialog is loaded with a call to getCompany() 
         * 
         */
        companyDialog: function(){

        	bfdsmgr.firm.getCompany();        	
			
        	$('#companyDialog').dialog({height: 400, 
            							width: 400, 
            							maxHeight: 400, 
            							modal: true,
            							buttons: { "Submit": function() { 
															var value = '';
															var nxtRdbBt = 0;
															
								 							while(true){
								 								if(document.getElementById('companyRdb' + nxtRdbBt) != null){
								 									if(document.getElementById('companyRdb' + nxtRdbBt).checked){
								 										value = document.getElementById('companyRdb' + nxtRdbBt).value;
								 										break;
								 									}
								 								}else{
								 									break;
								 								}
								 								nxtRdbBt++;
								 							}
								 							
								 							if(value.length > 0){								 																 							
									 							var newMgmtco = {
									 					        	mgmt_co_id: value
									 						     };
							 						             $.post('saveFirmMgmtco',
							 						             		bfdsmgr.util.flattenObject(newMgmtco),
							 						                    function (data) {
							 						            	 		if(data.true_false){
												 								bfdsmgr.firm.activatedoAddFrmNMgmtCoPage();
							 						            	 		}else{
							 						            	 			// say something about the fail to save
							 						            	 		}
							 						                    },
							 						                    'json');
								 							}else{
								 								confirm('No Company selected, you must select atleast one!');
										   						$(this).dialog("close");
																window.location.reload();
								 							}
								 															 							
															$(this).dialog("close");
															/*
															 * need to refresh the view to clear the cache
															 * expire or no-cache not working 
															 */
															//window.location.reload();
														},
														
            									   "Close": function() { 
            										   						$(this).dialog("close"); 
            																window.location.reload();
            										   				   }
            										   				   
            									 } 							
            							});
		},
		
		getClearingFirms: function(_val){
            $.ajax({
                type: "GET",
                url: 'getClearingFirms',
                dataType: "json",
                cache: false,
                success: function(data){               

                	for(var st=0; st < data.length; st++){
                   		$('<option id=clr_firm_frm' + st + ' value=' + data[st].firm_id + '>' + data[st].long_nm + '</option><br/>').appendTo($('#clr_firm_frm')).get(0);
                	}
                	
                }
            });        	
		},
 
        getExistingNsccMemberNum: function(){
            var url = 'getExistingNsccMemberNum';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "text",
                cache: false,
                success: function(data){
                	
                	var s_data = data.split(',');
                	var more = 1;

                	while(s_data.length >= more){
	                	$('#nscc_num_' + more).val($.trim(s_data[more-1]));
	                	more++;
                	}
                	
                }
            });
        },
        		
        getExistingNsccNetworkAlpha: function(){
            var url = 'getExistingNsccNetworkAlpha';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "text",
                cache: false,
                success: function(data){
                	
                	var s_data = data.split(',');
                	var more = 1;
                	
                	while(s_data.length >= more){
	                	$('#nscc_alpha_' + more).val($.trim(s_data[more-1]));		                		
	                	more++;
                	}
                	
                }
            });
        },
        		
        getExistingClearingFirms: function(){
            var url = 'getExistingClearingFirms';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "text",
                cache: false,
                success: function(data){
                	
                	var s_data = data.split(',');
                	var more = 0;
                	var ms_options = $('#clr_firm_frm option').length;
                	
                	while(s_data.length > more){
	                	for(var st=0; st < ms_options; st++){
	                		
	                		var str = $('#clr_firm_frm' + st).val();
	                		var data_str = s_data[more];
	                		
	                		// not sure how many %20 there could be
	                		while(str.search('%20') != -1){
	                			str = str.replace('%20', ' ');
	                		}
	                		
	                		// not sure how many %20 there could be
	                		while(data_str.search('%20') != -1){
	                			data_str = data_str.replace('%20', ' ');
	                		}

	                		if( $.trim(str) == $.trim(data_str) ){
	                			$('#clr_firm_frm' + st).attr('selected', true);
	                			sel_clrg_frms += $.trim(str) + ',';
	                			
	                		}
	                		
	                	}
	                	more++;
                	}
                	sel_clrg_frms = sel_clrg_frms.substring(0, (sel_clrg_frms.length - 1));
                	
                	bfdsmgr.util.add('#clr_firm_frm', '#clr_firm_to');
                }
            });
        },
        		
        /*
         * For the schema II getting all the Companies 
         */
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
                    				data[st].mgmt_co_short_nm + ' - ' + data[st].mgmt_co_long_nm + '</input><br/>').appendTo($('#companyDialog')).get(0);
                    	}else{
                    		if(_val == $.trim(data[st].mgmt_co_id)){
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
    
        /*
         * if no value is passed then the method is called from the Add page else the Edit 
         * which would have pre values
         */
        getFirmStates: function(_val){
            var url = 'getStates';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){               

                	// make the user select a state
            		$('<option value=>-- Select --</option>').appendTo($('#firm_state_cdDD')).get(0);
                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<option value=' + data[st].state_cd + '>' + data[st].state_dsc + '</option>').appendTo($('#firm_state_cdDD')).get(0);
                    	}else{
                    		if($.trim(_val.toUpperCase()).toUpperCase() == $.trim(data[st].state_cd).toUpperCase()){
                        		$('<option value=' + data[st].state_cd + ' selected>' + data[st].state_dsc + '</option>').appendTo($('#firm_state_cdDD')).get(0);
                    		}else{
                        		$('<option value=' + data[st].state_cd + '>' + data[st].state_dsc + '</option>').appendTo($('#firm_state_cdDD')).get(0);
                    		}
                    	}                		
                	}                	
                }
            });        	
        },
        
        getClearingFirmInd: function(_val){
        	for(var st=0; st < 3; st++){
        		if($.trim(_val.toUpperCase()).toUpperCase() == $.trim($('#clrng_frm_ind' + st).val()).toUpperCase()){
            		$('#clrng_frm_ind' + st).attr('selected', true);
        		}else{
            		$('#clrng_frm_ind' + st).attr('selected', false);
        		}
        	}                	            
        },
        
        getSAE16Ind: function(_val){
        	for(var st=0; st < 3; st++){
        		if($.trim(_val.toUpperCase()).toUpperCase() == $.trim($('#sae16_ind' + st).val()).toUpperCase()){
            		$('#sae16_ind' + st).attr('selected', true);
        		}else{
            		$('#sae16_ind' + st).attr('selected', false);
        		}
        	}                	            
        },
        
        getOpReview: function(_val){
        	for(var st=0; st < 4; st++){
        		if($.trim(_val.toUpperCase()) == $.trim($('#op_review_cd' + st).val())){
            		$('#op_review_cd' + st).attr('selected', true);
        		}else{
            		$('#op_review_cd' + st).attr('selected', false);
        		}
        	}        	
        },
        
        getIndustryAttestationInd: function(_val){
        	for(var st=0; st < 3; st++){
        		if($.trim(_val.toUpperCase()).toUpperCase() == $.trim($('#industry_attestation_ind' + st).val()).toUpperCase()){
            		$('#industry_attestation_ind' + st).attr('selected', true);
        		}else{
            		$('#industry_attestation_ind' + st).attr('selected', false);
        		}
        	}                	            
        },
        
        getVisionInd: function(_val){
        	for(var st=0; st < 3; st++){
        		if($.trim(_val.toUpperCase()).toUpperCase() == $.trim($('#vision_ind' + st).val()).toUpperCase()){
            		$('#vision_ind' + st).attr('selected', true);
        		}else{
            		$('#vision_ind' + st).attr('selected', false);
        		}
        	}                	            
        },
        
        getFanMailInd: function(_val){
        	for(var st=0; st < 3; st++){
        		if($.trim(_val.toUpperCase()).toUpperCase() == $.trim($('#fan_mail_ind' + st).val()).toUpperCase()){
            		$('#fan_mail_ind' + st).attr('selected', true);
        		}else{
            		$('#fan_mail_ind' + st).attr('selected', false);
        		}
        	}                	            
        },
        
        getActiveInd: function(_val){
        	for(var st=0; st < 3; st++){
        		if($.trim(_val.toUpperCase()).toUpperCase() == $.trim($('#active_ind' + st).val()).toUpperCase()){
            		$('#active_ind' + st).attr('selected', true);
        		}else{
            		$('#active_ind' + st).attr('selected', false);
        		}
        	}                	            
        },
        
        getSpecPckgInd: function(_val){
        	for(var st=0; st < 3; st++){
        		if($.trim(_val.toUpperCase()).toUpperCase() == $.trim($('#spec_pckg_ind' + st).val()).toUpperCase()){
            		$('#spec_pckg_ind' + st).attr('selected', true);
        		}else{
            		$('#spec_pckg_ind' + st).attr('selected', false);
        		}
        	}                	            
        },
        
        getCommservInd: function(_val){
        	for(var st=0; st < 3; st++){
        		if($.trim(_val.toUpperCase()).toUpperCase() == $.trim($('#commserv_ind' + st).val()).toUpperCase()){
            		$('#commserv_ind' + st).attr('selected', true);
        		}else{
            		$('#commserv_ind' + st).attr('selected', false);
        		}
        	}                	            
        },
        
        getDstVhoInd: function(_val){
        	for(var st=0; st < 3; st++){
        		if($.trim(_val.toUpperCase()).toUpperCase() == $.trim($('#dst_vho_ind' + st).val()).toUpperCase()){
            		$('#dst_vho_ind' + st).attr('selected', true);
        		}else{
            		$('#dst_vho_ind' + st).attr('selected', false);
        		}
        	}                	            
        },
        
        getOmniservInd: function(_val){
        	for(var st=0; st < 3; st++){
        		if($.trim(_val.toUpperCase()).toUpperCase() == $.trim($('#omniserv_ind' + st).val()).toUpperCase()){
            		$('#omniserv_ind' + st).attr('selected', true);
        		}else{
            		$('#omniserv_ind' + st).attr('selected', false);
        		}
        	}                	            
        },
        
        getSubFirmStates: function(_val){
            var url = 'getStates';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){               

                	// make the user select a state
            		$('<option value=>-- Select --</option>').appendTo($('#ta2000_firm_stateDD')).get(0);
                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<option value=' + escape(data[st].state_cd) + '>' + data[st].state_dsc + '</option>').appendTo($('#ta2000_firm_stateDD')).get(0);
                    	}else{
                    		if($.trim(_val.toUpperCase()).toUpperCase() == $.trim(escape(data[st].state_cd)).toUpperCase()){
                        		$('<option value=' + escape(data[st].state_cd) + ' selected>' + data[st].state_dsc + '</option>').appendTo($('#ta2000_firm_stateDD')).get(0);
                    		}else{
                        		$('<option value=' + escape(data[st].state_cd) + '>' + data[st].state_dsc + '</option>').appendTo($('#ta2000_firm_stateDD')).get(0);
                    		}
                    	}                		
                	}                	
                }
            });        	
        },
        
        getMFProfileII: function(_val){
            var url = 'getMFProfileII';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){               
                	
                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<option value=' + escape(data[st].mf_profile_II_ind) + '>' + data[st].mf_profile_II_dsc + '</option>').appendTo($('#mf_profile_II_indInput')).get(0);
                    	}else{
                    		if($.trim(_val.toUpperCase()).toUpperCase() == $.trim(escape(data[st].mf_profile_II_ind)).toUpperCase()){
                        		$('<option value=' + escape(data[st].mf_profile_II_ind) + ' selected>' + data[st].mf_profile_II_dsc + '</option>').appendTo($('#mf_profile_II_indInput')).get(0);
                    		}else{
                    			$('<option value=' + escape(data[st].mf_profile_II_ind) + '>' + data[st].mf_profile_II_dsc + '</option>').appendTo($('#mf_profile_II_indInput')).get(0);
                    		}
                    	}
                	}                	
                }
            });        	
        },
         
        getOperationalReview: function(_val){
            var url = 'getOperationalReview';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){               
                	
                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		if($.trim(unescape(data[st].op_review_cd)).toUpperCase() == "NO"){
                    			$('<option id=op_review_cd' + st + ' value=' + escape(data[st].op_review_cd) + ' selected>' + data[st].op_review_dsc + '</option>').appendTo($('#op_review_cdInput')).get(0);
                    		}else{
                    			$('<option id=op_review_cd' + st + ' value=' + escape(data[st].op_review_cd) + '>' + data[st].op_review_dsc + '</option>').appendTo($('#op_review_cdInput')).get(0);
                    		}
                    	}else{
                    		if($.trim(unescape(_val).toUpperCase()).toUpperCase() == $.trim(unescape(data[st].op_review_cd)).toUpperCase()){
                        		$('<option id=op_review_cd' + st + ' value=' + escape(data[st].op_review_cd) + ' selected>' + data[st].op_review_dsc + '</option>').appendTo($('#op_review_cdInput')).get(0);
                    		}else{
                    			$('<option id=op_review_cd' + st + ' value=' + escape(data[st].op_review_cd) + '>' + data[st].op_review_dsc + '</option>').appendTo($('#op_review_cdInput')).get(0);
                    		}
                    	}
                	}                	
                }
            });        	
        },
        
        getPrimaryBankStates: function(_val){
            var url = 'getStates';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){               
                	
                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		if($.trim(data[st].state_cd).toUpperCase() == "N/A"){
                    			$('<option value=' + escape(data[st].state_cd) + ' selected>' + data[st].state_dsc + '</option>').appendTo($('#prmry_bank_state_cdDD')).get(0);
                    		}else{
                    			$('<option value=' + escape(data[st].state_cd) + '>' + data[st].state_dsc + '</option>').appendTo($('#prmry_bank_state_cdDD')).get(0);
                    		}
                    	}else{
                    		if($.trim(_val.toUpperCase()) == $.trim(escape(data[st].state_cd)).toUpperCase()){
                        		$('<option value=' + escape(data[st].state_cd) + ' selected>' + data[st].state_dsc + '</option>').appendTo($('#prmry_bank_state_cdDD')).get(0);
                    		}else{
                    			$('<option value=' + escape(data[st].state_cd) + '>' + data[st].state_dsc + '</option>').appendTo($('#prmry_bank_state_cdDD')).get(0);
                    		}
                    	}
                	}                	
                }
            });        	
        },
        
        getFirmTypes: function(_val){
            var url = 'getFirmTypes';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){
                	
                	for(var st=0; st < data.length; st++){
                		$('<option id=firm_typ_frm' + st + ' value=' + escape(data[st].firm_typ_cd) + '>' + data[st].firm_typ_dsc + '</option>').appendTo($('#firm_typ_frm')).get(0);
                	}
                	
                }
            });        	
        },

        getExistingFirmType: function(){
            var url = 'getExistingFirmTypes';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "text",
                cache: false,
                success: function(data){

                	var s_data = data.split(',');
                	var more = 0;
                	var ms_options = $('#firm_typ_frm option').length;

                	while(s_data.length > more){
	                	for(var st=0; st < ms_options; st++){
	                		
	                		var str = $('#firm_typ_frm' + st).val();
	                		var data_str = s_data[more];
	                		
	                		// not sure how many %20 there could be
	                		
	                		while(str.search('%20') != -1){
	                			str = str.replace('%20', ' ');
	                		}
	                		
	                		// not sure how many %20 there could be
	                		while(data_str.search('%20') != -1){
	                			data_str = data_str.replace('%20', ' ');
	                		}

	                		if( $.trim(str) == $.trim(data_str) ){
	                			$('#firm_typ_frm' + st).attr('selected', true);
	                			sel_firm_type += $.trim(str) + ',';
	                		}
	                		
	                	}
	                	more++;
                	}
                	
                	sel_firm_type = sel_firm_type.substring(0, (sel_firm_type.length - 1));
                	bfdsmgr.util.add('#firm_typ_frm', '#firm_typ_to');
                }
            });
        },
        
        getOmnibusDistMdl: function(_val){
            var url = 'getOmnibusDistMdl';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){               

                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		if($.trim(data[st].omnibus_dist_mdl_cd).toUpperCase() == 'UNK'){
                    			$('<option value=' + escape(data[st].omnibus_dist_mdl_cd) + ' selected>-- Select --</option>').appendTo($('#omnibus_dist_mdl_cdDD')).get(0);
                    		}else{
                        		$('<option value=' + escape(data[st].omnibus_dist_mdl_cd) + '>' + data[st].omnibus_dist_mdl_dsc + '</option>').appendTo($('#omnibus_dist_mdl_cdDD')).get(0);
                    		}
                    	}else{
                    		if($.trim(_val.toUpperCase()) == $.trim(escape(data[st].omnibus_dist_mdl_cd)).toUpperCase()){
                        		if($.trim(data[st].omnibus_dist_mdl_cd).toUpperCase() == 'UNK'){
                        			$('<option value=' + escape(data[st].omnibus_dist_mdl_cd) + ' selected>-- Select --</option>').appendTo($('#omnibus_dist_mdl_cdDD')).get(0);
                        		}else{
                        			$('<option value=' + escape(data[st].omnibus_dist_mdl_cd) + ' selected>' + data[st].omnibus_dist_mdl_dsc + '</option>').appendTo($('#omnibus_dist_mdl_cdDD')).get(0);
                        		}
                    		}else{
                        		if($.trim(data[st].omnibus_dist_mdl_cd).toUpperCase() == 'UNK'){
                        			$('<option value=' + escape(data[st].omnibus_dist_mdl_cd) + '>-- Select --</option>').appendTo($('#omnibus_dist_mdl_cdDD')).get(0);
                        		}else{
                        			$('<option value=' + escape(data[st].omnibus_dist_mdl_cd) + '>' + data[st].omnibus_dist_mdl_dsc + '</option>').appendTo($('#omnibus_dist_mdl_cdDD')).get(0);
                        		}
                    		}
                    	}
                	}
                }
            });
        	
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

                	for(var mco=0; mco < data.length; mco++){
                    	if (typeof _val == 'undefined') {
                    		if($.trim(data[mco].batch_typ_cd).toUpperCase() == 'UNK'){
                        		$('<option value=' + escape(data[mco].batch_typ_cd) + ' selected>-- Select --</option>').appendTo($('#batch_typ_cdDD')).get(0);
                    		}else{
                        		$('<option value=' + escape(data[mco].batch_typ_cd) + '>' + data[mco].batch_typ_dsc + '</option>').appendTo($('#batch_typ_cdDD')).get(0);
                    		}
                    	}else{
                    		if($.trim(_val.toUpperCase()) == $.trim(escape(data[mco].batch_typ_cd)).toUpperCase()){
                        		if($.trim(data[mco].batch_typ_cd).toUpperCase() == 'UNK'){
                            		$('<option value=' + escape(data[mco].batch_typ_cd) + ' selected>-- Select --</option>').appendTo($('#batch_typ_cdDD')).get(0);
                        		}else{
                            		$('<option value=' + escape(data[mco].batch_typ_cd) + ' selected>' + data[mco].batch_typ_dsc + '</option>').appendTo($('#batch_typ_cdDD')).get(0);
                        		}
                    		}else{
                        		if($.trim(data[mco].batch_typ_cd).toUpperCase() == 'UNK'){
                            		$('<option value=' + escape(data[mco].batch_typ_cd) + '>-- Select --</option>').appendTo($('#batch_typ_cdDD')).get(0);
                        		}else{
                            		$('<option value=' + escape(data[mco].batch_typ_cd) + '>' + data[mco].batch_typ_dsc + '</option>').appendTo($('#batch_typ_cdDD')).get(0);
                        		}
                    		}
                    	}
                	}
                }
            });        	
        },
 
        /*
         * Set the selected Firm name in the xref page
         */
        getSystemName: function(_val){
            var url = 'getSystemName';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){               

            		$('#systemInput').val(data.long_nm);
                	
                }
            });        	
        },
 
        /*
         * Set the Company name in the xref page
         */
        getCompanyName: function(_val){
            var url = 'getCompanyName';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){               

            		$('#companyInput').val(data.mgmt_co_short_nm);

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
                	for(var st=0; st < data.length; st++){
                		$('<option id=omnibus_trad_proc_cd_frm' + st + ' value=' + escape(data[st].omnibus_trad_proc_cd) + '>' + 
                				data[st].omnibus_trad_proc_dsc + '</option>').appendTo($('#omnibus_trad_proc_cd_frm')).get(0);
                	}
                }
            });        	
        },
                
        getExistingOmnibusTradProc: function(){
            var url = 'getExistingOmnibusTradProc';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "text",
                cache: false,
                success: function(data){
                	
                	var s_data = data.split(',');
                	var more = 0;
                	var ms_options = $('#omnibus_trad_proc_cd_frm option').length;
                	
                	while(s_data.length > more){
	                	for(var st=0; st < ms_options; st++){
	                		
	                		var str = $('#omnibus_trad_proc_cd_frm' + st).val();
	                		var data_str = s_data[more];
	                		
	                		// not sure how many %20 there could be
	                		while(str.search('%20') != -1){
	                			str = str.replace('%20', ' ');
	                		}
	                		
	                		// not sure how many %20 there could be
	                		while(data_str.search('%20') != -1){
	                			data_str = data_str.replace('%20', ' ');
	                		}

	                		if( $.trim(str) == $.trim(data_str) ){
	                			$('#omnibus_trad_proc_cd_frm' + st).attr('selected', true);
	                			sel_omnibus_trad_proc += $.trim(str) + ',';
	                		}
	                		
	                	}
	                	more++;
                	}
                	
                	sel_omnibus_trad_proc = sel_omnibus_trad_proc.substring(0, (sel_omnibus_trad_proc.length - 1));
                	bfdsmgr.util.add('#omnibus_trad_proc_cd_frm', '#omnibus_trad_proc_cd_to');
                }
            });
        },
        
        getTASettlementType: function(_val){
            var url = 'getSettlementType';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){               
                	
            		$('<option value=>-- Select --</option>').appendTo($('#settlement_typ_cdDD')).get(0);
                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    			$('<option value=' + escape(data[st].settlement_typ_cd) + '>' + data[st].settlement_typ_dsc + '</option>').appendTo($('#settlement_typ_cdDD')).get(0);
                    	}else{
                    		if($.trim(_val.toUpperCase()) == $.trim(escape(data[st].shrhldr_svc_mdl_cd)).toUpperCase()){
                        		$('<option value=' + escape(data[st].settlement_typ_cd) + ' selected>' + data[st].settlement_typ_dsc + '</option>').appendTo($('#settlement_typ_cdDD')).get(0);
                    		}else{
                    			$('<option value=' + escape(data[st].settlement_typ_cd) + '>' + data[st].settlement_typ_dsc + '</option>').appendTo($('#settlement_typ_cdDD')).get(0);
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

                	for(var st=0; st < data.length; st++){
                		$('<option id=settlement_typ_cd_frm' + st + ' value=' + escape(data[st].settlement_typ_cd) + '>' + 
                				data[st].settlement_typ_dsc + '</option>').appendTo($('#settlement_typ_cd_frm')).get(0);
                	}
                }
            });        	
        },
        
        getExistingSettlementType: function(){
            var url = 'getExistingSettlementType';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "text",
                cache: false,
                success: function(data){
                	
                	var s_data = data.split(',');
                	var more = 0;
                	var ms_options = $('#settlement_typ_cd_frm option').length;
                	
                	while(s_data.length > more){
	                	for(var st=0; st < ms_options; st++){
	                		
	                		var str = $('#settlement_typ_cd_frm' + st).val();
	                		var data_str = s_data[more];
	                		
	                		// not sure how many %20 there could be
	                		while(str.search('%20') != -1){
	                			str = str.replace('%20', ' ');
	                		}
	                		
	                		// not sure how many %20 there could be
	                		while(data_str.search('%20') != -1){
	                			data_str = data_str.replace('%20', ' ');
	                		}

	                		if( $.trim(str) == $.trim(data_str) ){
	                			$('#settlement_typ_cd_frm' + st).attr('selected', true);
	                			sel_settlement_typ += $.trim(str) + ',';
	                		}
	                		
	                	}
	                	more++;
                	}
                	
                	sel_settlement_typ = sel_settlement_typ.substring(0, (sel_settlement_typ.length - 1));
                	bfdsmgr.util.add('#settlement_typ_cd_frm', '#settlement_typ_cd_to');
                }
            });
        },
        
        getPricingSource: function(_val){
            var url = 'getPricingSource';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){               

                	for(var st=0; st < data.length; st++){
                		$('<option id=pricing_source_frm' + st + ' value=' + escape(data[st].pricing_src_cd) + '>' + 
                				data[st].pricing_src_dsc + '</option>').appendTo($('#pricing_source_frm')).get(0);
                	}
                }
            });        	
        },
        
        getExistingPricingSource: function(){
            var url = 'getExistingPricingSource';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "text",
                cache: false,
                success: function(data){
                	
                	var s_data = data.split(',');
                	var more = 0;
                	var ms_options = $('#pricing_source_frm option').length;

                	while(s_data.length > more){
	                	for(var st=0; st < ms_options; st++){
	                		
	                		var str = $('#pricing_source_frm' + st).val();
	                		var data_str = s_data[more];
	                		
	                		// not sure how many %20 there could be
	                		while(str.search('%20') != -1){
	                			str = str.replace('%20', ' ');
	                		}
	                		
	                		// not sure how many %20 there could be
	                		while(data_str.search('%20') != -1){
	                			data_str = data_str.replace('%20', ' ');
	                		}

	                		if( $.trim(str) == $.trim(data_str) ){
	                			$('#pricing_source_frm' + st).attr('selected', true);
	                			sel_pricing_source += $.trim(str) + ',';
	                		}
	                		
	                	}
	                	more++;
                	}
                	
                	sel_pricing_source = sel_pricing_source.substring(0, (sel_pricing_source.length - 1));
                	bfdsmgr.util.add('#pricing_source_frm', '#pricing_source_to');
                }
            });
        },
        
        getDataTransMthd: function(_val){
            var url = 'getDataTransMthd';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){               

                	// make the user select one
                	for(var st=0; st < data.length; st++){
                		$('<option id=data_trans_mthd_cd_frm' + st + ' value=' + escape(data[st].data_trans_mthd_cd) + '>' + data[st].data_trans_mthd_dsc + '</option>').appendTo($('#data_trans_mthd_cd_frm')).get(0);
                	}
                }
            });
        	
        },
        
        getExistingDataTransMthd: function(){
            var url = 'getExistingDataTransMthd';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "text",
                cache: false,
                success: function(data){

                	var s_data = data.split(',');
                	var more = 0;
                	var ms_options = $('#data_trans_mthd_cd_frm option').length;
                	
                	while(s_data.length > more){
	                	for(var st=0; st < ms_options; st++){
	                		
	                		var str = $('#data_trans_mthd_cd_frm' + st).val();
	                		var data_str = s_data[more];
	                		
	                		// not sure how many %20 there could be
	                		while(str.search('%20') != -1){
	                			str = str.replace('%20', ' ');
	                		}
	                		
	                		// not sure how many %20 there could be
	                		while(data_str.search('%20') != -1){
	                			data_str = data_str.replace('%20', ' ');
	                		}

	                		if( $.trim(str) == $.trim(data_str) ){
	                			$('#data_trans_mthd_cd_frm' + st).attr('selected', true);
	                			sel_data_trans_mthd += $.trim(str) + ',';
	                		}
	                		
	                	}
	                	more++;
                	}
                	
                	sel_data_trans_mthd = sel_data_trans_mthd.substring(0, (sel_data_trans_mthd.length - 1));
                	bfdsmgr.util.add('#data_trans_mthd_cd_frm', '#data_trans_mthd_cd_to');
                }
            });
        },
        
        getTAShareHldrSvcMdl: function(_val){
            var url = 'getShareHldrSvcMdl';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){               

            		$('<option value=>-- Select --</option>').appendTo($('#shrhldr_svc_mdl_cdDD')).get(0);
                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    			$('<option value=' + escape(data[st].shrhldr_svc_mdl_cd) + '>' + data[st].shrhldr_svc_mdl_dsc + '</option>').appendTo($('#shrhldr_svc_mdl_cdDD')).get(0);
                    	}else{
                    		if($.trim(_val.toUpperCase()) == $.trim(escape(data[st].shrhldr_svc_mdl_cd)).toUpperCase()){
                        		$('<option value=' + escape(data[st].shrhldr_svc_mdl_cd) + ' selected>' + data[st].shrhldr_svc_mdl_dsc + '</option>').appendTo($('#shrhldr_svc_mdl_cdDD')).get(0);
                    		}else{
                    			$('<option value=' + escape(data[st].shrhldr_svc_mdl_cd) + '>' + data[st].shrhldr_svc_mdl_dsc + '</option>').appendTo($('#shrhldr_svc_mdl_cdDD')).get(0);
                    		}
                    	}
                	}
                }
            });        	
        },
        
        getShareHldrSvcMdl: function(_val){
            var url = 'getShareHldrSvcMdl';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){               

                	for(var st=0; st < data.length; st++){
                   		$('<option id=shrhldr_svc_mdl_frm' + st + ' value=' + escape(data[st].shrhldr_svc_mdl_cd) + '>' + data[st].shrhldr_svc_mdl_dsc + '</option>').appendTo($('#shrhldr_svc_mdl_frm')).get(0);
                	}
                }
            });        	
        },
        
        getExistingShareHldrSvcMdl: function(){
            var url = 'getExistingShareHldrSvcMdl';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "text",
                cache: false,
                success: function(data){

                	var s_data = data.split(',');
                	var more = 0;
                	var ms_options = $('#shrhldr_svc_mdl_frm option').length;
                	
                	while(s_data.length > more){
	                	for(var st=0; st < ms_options; st++){
	                		
	                		var str = $('#shrhldr_svc_mdl_frm' + st).val();
	                		var data_str = s_data[more];
	                		
	                		// not sure how many %20 there could be
	                		while(str.search('%20') != -1){
	                			str = str.replace('%20', ' ');
	                		}
	                		
	                		// not sure how many %20 there could be
	                		while(data_str.search('%20') != -1){
	                			data_str = data_str.replace('%20', ' ');
	                		}
	                		
	                		if( $.trim(str) == $.trim(data_str) ){
	                			$('#shrhldr_svc_mdl_frm' + st).attr('selected', true);
	                			sel_shrhldr_svc_mdl += $.trim(str) + ',';
	                		}
	                		
	                	}
	                	more++;
                	}
                	                	
                	sel_shrhldr_svc_mdl = sel_shrhldr_svc_mdl.substring(0, (sel_shrhldr_svc_mdl.length - 1));
                	bfdsmgr.util.add('#shrhldr_svc_mdl_frm', '#shrhldr_svc_mdl_to');
                }
            });
        },
        
        getSubacctPltfrmCD: function(_val){
            var url = 'getSubacctPltfrmCD';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){               

                	for(var st=0; st < data.length; st++){
                   		$('<option id=subacct_pltfrm_frm' + st + ' value=' + escape(data[st].subacct_pltfrm_cd) + '>' + data[st].subacct_pltfrm_cd + '</option>').appendTo($('#subacct_pltfrm_frm')).get(0);
                	}
                }
            });        	
        },
        
        getExistingSubacctPltfrmCD: function(){
            var url = 'getExistingSubacctPltfrmCD';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "text",
                cache: false,
                success: function(data){
                	
                	var s_data = data.split(',');
                	var more = 0;
                	var ms_options = $('#subacct_pltfrm_frm option').length;
                	
                	while(s_data.length > more){
	                	for(var st=0; st < ms_options; st++){
	                		
	                		var str = $('#subacct_pltfrm_frm' + st).val();
	                		var data_str = s_data[more];
	                		
	                		// not sure how many %20 there could be
	                		while(str.search('%20') != -1){
	                			str = str.replace('%20', ' ');
	                		}
	                		
	                		// not sure how many %20 there could be
	                		while(data_str.search('%20') != -1){
	                			data_str = data_str.replace('%20', ' ');
	                		}

	                		if( $.trim(str) == $.trim(data_str) ){
	                			$('#subacct_pltfrm_frm' + st).attr('selected', true);
	                			sel_subacct_pltfrm += $.trim(str) + ',';
	                		}
	                		
	                	}
	                	more++;
                	}
                	
                	sel_subacct_pltfrm = sel_subacct_pltfrm.substring(0, (sel_subacct_pltfrm.length - 1));
                	bfdsmgr.util.add('#subacct_pltfrm_frm', '#subacct_pltfrm_to');
                }
            });
        },
        
        getNetworkMatrixLevel: function(_val){
            var url = 'getNetworkMatrixLevel';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){               

                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		if('N/A' == $.trim(data[st].ntwrk_mtrx_lvl_id).toUpperCase()){
                    			$('<option value=' + escape(data[st].ntwrk_mtrx_lvl_id) + ' selected>' + data[st].ntwrk_mtrx_lvl_dsc + '</option>').appendTo($('#ntwrk_mtrx_lvl_idDD')).get(0);
                    		}else{
                    			$('<option value=' + escape(data[st].ntwrk_mtrx_lvl_id) + '>' + data[st].ntwrk_mtrx_lvl_dsc + '</option>').appendTo($('#ntwrk_mtrx_lvl_idDD')).get(0);
                    		}
                    	}else{
                    		if($.trim(_val.toUpperCase()) == $.trim(escape(data[st].ntwrk_mtrx_lvl_id)).toUpperCase()){
                        		$('<option value=' + escape(data[st].ntwrk_mtrx_lvl_id) + ' selected>' + data[st].ntwrk_mtrx_lvl_dsc + '</option>').appendTo($('#ntwrk_mtrx_lvl_idDD')).get(0);
                    		}else{
                    			$('<option value=' + escape(data[st].ntwrk_mtrx_lvl_id) + '>' + data[st].ntwrk_mtrx_lvl_dsc + '</option>').appendTo($('#ntwrk_mtrx_lvl_idDD')).get(0);
                    		}
                    	}
                	}
                }
            });        	
        },
        
        getBrokeragePlatform: function(_val){
            var url = 'getBrokeragePlatform';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){               

                	// make the user select one
                	for(var st=0; st < data.length; st++){
                		$('<option id=brkrg_pltfrm_frm' + st + ' value=' + escape(data[st].brkrg_pltfrm_cd) + '>' + data[st].brkrg_pltfrm_dsc + '</option>').appendTo($('#brkrg_pltfrm_frm')).get(0);
                	}
                }
            });        	
        },
        
        getExistingBrokeragePlatform: function(){
            var url = 'getExistingBrokeragePlatform';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "text",
                cache: false,
                success: function(data){
                	
                	var s_data = data.split(',');
                	var more = 0;
                	var ms_options = $('#brkrg_pltfrm_frm option').length;
                	
                	while(s_data.length > more){
	                	for(var st=0; st < ms_options; st++){
	                		
	                		var str = $('#brkrg_pltfrm_frm' + st).val();
	                		var data_str = s_data[more];
	                		
	                		// not sure how many %20 there could be
	                		while(str.search('%20') != -1){
	                			str = str.replace('%20', ' ');
	                		}
	                		
	                		// not sure how many %20 there could be
	                		while(data_str.search('%20') != -1){
	                			data_str = data_str.replace('%20', ' ');
	                		}

	                		if( $.trim(str) == $.trim(data_str) ){
	                			$('#brkrg_pltfrm_frm' + st).attr('selected', true);
	                			sel_brkrg_pltfrm += $.trim(str) + ',';
	                		}
	                		
	                	}
	                	more++;
                	}
                	
                	sel_brkrg_pltfrm = sel_brkrg_pltfrm.substring(0, (sel_brkrg_pltfrm.length - 1));
                	bfdsmgr.util.add('#brkrg_pltfrm_frm', '#brkrg_pltfrm_to');
                }
            });
        },
        
        getPosFileSched: function(_val){
            var url = 'getPosFileSched';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){               

                	for(var mco=0; mco < data.length; mco++){
                    	if (typeof _val == 'undefined') {
                    		if(data[mco].pos_file_sched_cd == 'N/A'){
                    			$('<option value=' + escape(data[mco].pos_file_sched_cd) + ' selected>' + data[mco].pos_file_sched_dsc + '</option>').appendTo($('#pos_file_sched_cdDD')).get(0);
                    		}else{
                    			$('<option value=' + escape(data[mco].pos_file_sched_cd) + '>' + data[mco].pos_file_sched_dsc + '</option>').appendTo($('#pos_file_sched_cdDD')).get(0);
                    		}
                    	}else{
                    		if($.trim(_val.toUpperCase()) == $.trim(escape(data[mco].pos_file_sched_cd)).toUpperCase()){
                        		$('<option value=' + escape(data[mco].pos_file_sched_cd) + ' selected>' + data[mco].pos_file_sched_dsc + '</option>').appendTo($('#pos_file_sched_cdDD')).get(0);
                    		}else{
                    			$('<option value=' + escape(data[mco].pos_file_sched_cd) + '>' + data[mco].pos_file_sched_dsc + '</option>').appendTo($('#pos_file_sched_cdDD')).get(0);
                    		}
                    	}
                	}
                }
            });        	
        },
 
       // clears the add firm form
        clearForm: function() {

            $(':input')
                .not(':button')
                .val('');

//            $('#submitFirm').attr('disabled', true);
        },

        editFirmPage: function(){
               $.ajax({
                    type: "GET",
                    url: 'editFirm',
                    dataType: "json",
                    cache: false,
                    success: function(data){
                    	
                		// getting clearing firm id
                    	bfdsmgr.firm.getClearingFirms();
                		bfdsmgr.firm.getFirmStates(data.firm_state_cd);
                		/*
                		 * Getting the existing Firm Type if any, store the return in a hidden
                		 * input in the edit page as there no way to return the data from
                		 * within the function success. Pass the data to the getFirmTypes() as
                		 * a comma seperated string
                		 */
                		bfdsmgr.firm.getFirmTypes();
                		bfdsmgr.firm.getShareHldrSvcMdl();                		
                    	bfdsmgr.firm.getSubacctPltfrmCD();                    	
                    	bfdsmgr.firm.getBrokeragePlatform();
                    	bfdsmgr.firm.getOperationalReview(data.op_review_cd);
                    	if($.trim(unescape(data.op_review_cd)).toUpperCase() != 'YES'){                       		
            				$('#op_review_dtInput').attr('disabled', true);
                    	}else{
                    		$('#op_review_dtInput').attr('disabled', false);
                    	}
                    	
                		bfdsmgr.firm.getMFProfileII($.trim(data.mf_profile_II_ind));
                   		bfdsmgr.firm.getPrimaryBankStates(data.prmry_bank_state_cd);
                		bfdsmgr.firm.getExistingNsccMemberNum();
                    	bfdsmgr.firm.getSettlementType();
                    	bfdsmgr.firm.getOmnibusTradProc();
                    	bfdsmgr.firm.getOmnibusDistMdl(data.omnibus_dist_mdl_cd);
                		bfdsmgr.firm.getDataTransMthd();
                    	bfdsmgr.firm.getBatchType(data.batch_typ_cd);
                    	bfdsmgr.firm.getPosFileSched(data.pos_file_sched_cd);
                    	bfdsmgr.firm.getPricingSource();

                    	$('#firmIdInput').val(data.firm_id);
                		$('#long_nmInput').val($.trim(data.long_nm));
                		$('#short_nmInput').val($.trim(data.short_nm));

                    	$('#firm_address1Input').val($.trim(data.firm_address1));
                		$('#firm_address2Input').val($.trim(data.firm_address2));
                		$('#firm_cityInput').val($.trim(data.firm_city));
                		
                		$('#firm_zip_cdInput').val($.trim(data.firm_zip_cd));
                		$('#firm_websiteInput').val($.trim(data.firm_website));
                		                		
                		bfdsmgr.firm.getClearingFirmInd($.trim(data.clrng_frm_ind));
                		
            			if($.trim(data.clrng_frm_ind).toUpperCase() == 'YES'){
            				$('#clearing_firm_idInput').attr('disabled', true);
            			}else{
            				$('#clearing_firm_idInput').attr('disabled', false);
            			}
                		
                		$('#firm_tax_idInput').val($.trim(data.firm_tax_id));
                		
                		$('#op_review_dtInput').val(data.op_review_dt);
                		bfdsmgr.firm.getSAE16Ind($.trim(data.sae16_ind));
                		
                		bfdsmgr.firm.getIndustryAttestationInd($.trim(data.industry_attestation_ind));
                		bfdsmgr.firm.getSpecPckgInd($.trim(data.spec_pckg_ind));
                		
            			if($.trim($('#spec_pckg_indDD').val()).toUpperCase() == 'NO'){
            				$('#spec_pckg_linkInput').attr('disabled', true);
            			}else{
            				$('#spec_pckg_linkInput').attr('disabled', false);
            			}
                		
                		$('#spec_pckg_linkInput').val($.trim(data.spec_pckg_link));
                		bfdsmgr.firm.getVisionInd($.trim(data.vision_ind));
                		bfdsmgr.firm.getFanMailInd($.trim(data.fan_mail_ind));
                		bfdsmgr.firm.getActiveInd($.trim(data.active_ind));
                		
            			if($.trim(data.active_ind).toUpperCase() == 'YES'){
            				$('#inactive_dtInput').attr('disabled', true);
            			}else{
            				$('#inactive_dtInput').attr('disabled', false);
            			}
            			$('#inactive_dtInput').val(data.inactive_dt);
            			
                		bfdsmgr.firm.getCommservInd($.trim(data.commserv_ind));
                    	$('#prmry_bank_nmInput').val($.trim(data.prmry_bank_nm));
                		$('#prmry_bank_aba_numInput').val($.trim(data.prmry_bank_aba_num));
                		$('#prmry_bank_address1Input').val($.trim(data.prmry_bank_address1));
                		$('#prmry_bank_address2Input').val($.trim(data.prmry_bank_address2));
                		$('#prmry_bank_cityInput').val($.trim(data.prmry_bank_city));
                		
                 		$('#prmry_bank_zip_cdDD').val($.trim(data.prmry_bank_zip_cd));
                		$('#prmry_bank_acct_numInput').val($.trim(data.prmry_bank_acct_num));
                		                		
                		$('#trade_cut_offInput').val($.trim(data.trade_cut_off));
                    	$('#bin_maskInput').val($.trim(data.bin_mask));
                   		bfdsmgr.firm.getDstVhoInd(data.dst_vho_ind);
                   		bfdsmgr.firm.getOmniservInd(data.omniserv_ind);
                		
                    	bfdsmgr.firm.getExistingClearingFirms();
                		bfdsmgr.firm.getExistingFirmType();
                		bfdsmgr.firm.getExistingShareHldrSvcMdl();
                    	bfdsmgr.firm.getExistingSubacctPltfrmCD();
                    	bfdsmgr.firm.getExistingBrokeragePlatform();
                		bfdsmgr.firm.getExistingNsccNetworkAlpha();
                    	bfdsmgr.firm.getExistingSettlementType();
                    	bfdsmgr.firm.getExistingOmnibusTradProc();
                		bfdsmgr.firm.getExistingDataTransMthd();
                		bfdsmgr.firm.getExistingPricingSource();
                		                 		
                    }
                });
        },

        updateFirm: function(){
        	/*
        	 * Handle nscc_member_num & alpha
        	 */
        	this.get_nscc_data();
        	
            var newFirm = {
            		long_nm: $('#long_nmInput').val(),
           		    short_nm: $('#short_nmInput').val(),
           		    clrg_frms: escape(this.get_sel_clrg_frms()), 
            		firm_address1: $('#firm_address1Input').val(),
            		firm_address2: $('#firm_address2Input').val(),
            		firm_city: $('#firm_cityInput').val(),
            		firm_state_cd: $('#firm_state_cdDD').val(),
            		firm_zip_cd: $('#firm_zip_cdInput').val(),
            		firm_website: $('#firm_websiteInput').val(),
            		prmry_bank_nm: $('#prmry_bank_nmInput').val(),
            		prmry_bank_address1: $('#prmry_bank_address1Input').val(),
            		prmry_bank_address2: $('#prmry_bank_address2Input').val(),
            		prmry_bank_city: $('#prmry_bank_cityInput').val(),
            		prmry_bank_state_cd: $('#prmry_bank_state_cdDD').val(),
            		prmry_bank_zip_cd: $('#prmry_bank_zip_cdDD').val(),
            		prmry_bank_aba_num: $('#prmry_bank_aba_numInput').val(),
            		prmry_bank_acct_num: $('#prmry_bank_acct_numInput').val(),
            		firm_tax_id: $('#firm_tax_idInput').val(),
            		firm_typ_cd: escape(this.get_sel_firm_type()),            		
            		clrng_frm_ind: $('#clrng_frm_indInput').val(),
            		shrhldr_svc_mdl_cd: escape(this.get_sel_shrhldr_svc_mdl()),
            		ntwrk_mtrx_lvl_id: $('#ntwrk_mtrx_lvl_idDD').val(),
            		nscc_ntwrk_alpha_cd: this.get_sel_nscc_alpha(),
            		subacct_pltfrm_cd: escape(this.get_sel_subacct_pltfrm()),
            		bin_mask: $('#bin_maskInput').val(),
            		site_inspection_dt: $('#site_inspection_dtInput').val(),
            		sae16_ind: $('#sae16_indDD').val(),
            		industry_attestation_ind: $('#industry_attestation_indDD').val(),
            		mf_profile_II_ind: $('#mf_profile_II_indInput').val(),            		
            		brkrg_pltfrm: escape(this.get_sel_brkrg_pltfrm()),
            		spec_pckg_link: $('#spec_pckg_linkInput').val(),
            		trade_cut_off: $('#trade_cut_offInput').val(),
            		firm_exit_ind: $('#firm_exit_indInput').val(),
            		omnibus_dist_mdl_cd: escape($('#omnibus_dist_mdl_cdDD').val()),            		
            		omnibus_trad_proc_cd: escape(this.get_sel_omnibus_trad_proc()),
            		data_trans_mthd_cd: escape(this.get_sel_data_trans_mthd()),
            		nscc_member_num: this.get_sel_nscc_num(),
            		commserv_ind: $('#commserv_indDD').val(),
            		op_review_cd: $('#op_review_cdInput').val(),
            		op_review_dt: $('#op_review_dtInput').val(),
            		spec_pckg_ind: $('#spec_pckg_indDD').val(),
            		vision_ind: $('#vision_indDD').val(),
            		fan_mail_ind: $('#fan_mail_indDD').val(),
            		omniserv_ind: $('#omniserv_indDD').val(),
            		batch_typ_cd: $('#batch_typ_cdDD').val(),
            		dst_vho_ind: $('#dst_vho_indDD').val(),
            		pos_file_sched_cd: $('#pos_file_sched_cdDD').val(),
            		settlement_typ: escape(this.get_sel_settlement_typ()),
            		active_ind: $('#active_indInput').val(),
            		inactive_dt: $('#inactive_dtInput').val(),
            		pricing_source: escape(this.get_sel_pricing_source())
            };
            if(this.validateFields()){
//            $('#submitFirm').attr('disabled', true);
        	$('#msg-p').html('Are you sure you want to update this Parent Firm?');
    		$( "#dlg-msg" ).dialog({
    			modal: true,
    			buttons: {
    				Ok: function() {
    					// Closes the Are you sure dialog
    					$( this ).dialog( "close" );

    					$.post('updateFirm',
    	                		bfdsmgr.util.flattenObject(newFirm),
    	                        function (data) {
    	                	
    	                            if(data.true_false){
    	                            	bfdsmgr.firm.updateFirmSuccessMsg();
    	                            } else {
    	                                $('#successMessage').html("Fail! The Parent Firm was not created!");
    	                                $('#success').removeClass('bfdsHidden');
    	                            }
    	                            
    	                        },
	                        'json');
    				},
    				Cancel: function(){
    					$( this ).dialog( "close" );	    					
//    	            	window.top.location.href="firmsNav";
    				}
    			}
    		});	            
            
            } // end of update validation if
        },
        
        updateFirmSuccessMsg: function(){
//        	$('#submitFirm').attr('disabled', true);
        	$('#msg-p').html('You have successfully updated the Parent Firm.');
    		$( "#dlg-msg" ).dialog({
    			modal: true,
    			buttons: {
    				Ok: function() {
    					$( this ).dialog( "close" );
    	            	window.top.location.href="firmsNav";
    				}
    			}
    		});
        },
        
        // delete Firm
        deleteFirm : function(){
            if(confirm("Are you sure you want to delete this Parent Firm?")) {
                $.post('deleteFirm',
                        function(data){
		                    if (data.true_false){
		                        $('#successMessage').html("The selected Parent Firm was deleted.");
		                        $('#success').removeClass('bfdsHidden');
		                    } else {
		                        $('#successMessage').html("Failure: The selected Parent Firm was not deleted!" + '\n' + data.message);
		                        $('#success').removeClass('bfdsHidden');
		                    }
                        },
                        'json');
            }
      },
      
      setSearchName: function(data){
    	  _search_nm = data;  
      },

      searchFirmFail: function(data){
            $('#successMessage').html("Fail! This Firm was not found");
            $('#success').removeClass('bfdsHidden');
        },

        /*
         * set the short name record to edit, a change in the table member list
         * may cause this to be out of sync
         * This is getting the shor name in the table row. 
         * 
         * The user must click the row
         * 
         */
        setRowToEdit: function(data){
        	if(navigator.appName == 'Netscape'){
        		_firm_id = escape(data.cells[_firm_id_index].childNodes[0].wholeText);
        	}else{
        		_firm_id = escape(data.cells[_firm_id_index].innerHTML);
        	}
        	
            var newFirm = {
            		firm_id: _firm_id
                };
            	$.post('setFirmRowToEdit',
                		bfdsmgr.util.flattenObject(newFirm),
                        function (data) {
                	
                            if(!data.true_false){
                                bfdsmgr.firm.searchFirmFail(data);
                            }
                            
                        },
                        'json');
                                	
        	$('tr').removeClass('gridRowHighlight');
        	data.className = "gridRowHighlight";
            $('#edit_firms',top.document).attr('disabled', false);
        },        
        
        firm_typ_cdExpand: function(){
            $('#firm_typ_cdDD').attr('size', 5);
		},
		
        firm_typ_cdColapse: function(){
            $('#firm_typ_cdDD').attr('size', 1);
		},
		
		subacct_pltfrm_cdExpand: function(){
            $('#subacct_pltfrm_cdDD').attr('size', 4);
		},
		
		subacct_pltfrm_cdColapse: function(){
            $('#subacct_pltfrm_cdDD').attr('size', 1);
		},
		
		chk_nssc_num_count: function(field){
			
			var add_zero = 0;
			var new_str = '';
			
			if($(field).val().toUpperCase() != 'N/A'){
				
				if($(field).val().length < 4){
					add_zero = 4 - $(field).val().length;
					while((add_zero--) > 0){
						new_str += '0';
					}
					new_str += $(field).val();
					$(field).val('');
					$(field).val(new_str);
				}
				
			}
			
		},
		
		isNsccNumNA: function(value){
			var message = 'You have entered N/A for this Nscc Number field. N/A will be entered for\n';
			message += 'a single Number/Alpha record any other numbers will be ignored.\n';
			message += 'This will not prevent you from submiting the Parent Firm.';
			
			if($(value).val().toUpperCase() == 'N/A'){
				confirm( message );
			}
		},
		
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
        		errorMsg += '<li>The Omniserv Indicator field is invalid, correct values are YES, NO, N/A or an empty field.</li>';
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
        		errorMsg += '<li>The AS OF TRAD WINDOW field is invalid, Numeric values are required.</li>';
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
        
        validateFields: function(){
 
        	var isLongNm;
        	var isShortNm;
        	var isClrngFrmInd;
        	var isFirmStateCd;
        	var isFirmTypCd;
//        	var isNtwrkMtrxLvlId;
        	var isShrhldrSvcMdlCd;
        	var isFirmAddress1;
        	var isFirmCity;
        	var isFirmZip;
        	var isOpReviewDt;
        	var isWebSite;
        	var isInActiveDt;
//        	var isFirmTaxId;
/*        	
        	var isSae16Ind;
        	var isIndustryAttestationInd;
        	var isMfProfileIIInd;
        	var isFirmExitInd;
        	var isCommservInd;
        	var isSubacctPltfrmCd;
        	var isSiteInspectionDt;
        	var isPrmryBankStateCd;
        	var isOmnibusDistMdlCd;
        	var isDataTransMthdCd;
        	var isClearingFirmId;
        	var isClearingFirmName;
*/        	
            var errSet = false;

			errorMsg = '<div style="text-align:left"><ul>';

			isLongNm = this.long_nm();
   		    isShortNm = this.short_nm();
   		    isFirmAddress1 = this.firm_address_1();
   		    isFirmCity = this.firm_city();
			isFirmStateCd = this.firm_state_cd();
			isFirmZip = this.firm_zip();
//			isNSCCMemberNum = this.nscc_member_num();
//			isNSCCNetworkAlpha = this.nscc_network_alpha();
			isClrngFrmInd = this.clrng_frm_ind();
			isFirmStateCd = this.firm_state_cd();
			isFirmTypCd = this.firm_typ_cd();
			isShrhldrSvcMdlCd = this.shrhldr_svc_mdl_cd();
			isOpReviewDt = this.op_review_date();
			isInActiveDt = this.in_active_date();
			isWebSite = this.website();
//			isFirmTaxId = this.firm_tax_id();
/*
			isSae16Ind = this.sae16_ind();
			isIndustryAttestationInd = this.industry_attestation_ind();
			isMfProfileIIInd = this.mf_profile_II_ind();            
			isFirmExitInd = this.firm_exit_indInput(); 
			isCommservInd = this.commserv_ind(); 
			isSubacctPltfrmCd = this.subacct_pltfrm_cd(); 
			isSiteInspectionDt = this.site_inspection_dt();
			isPrmryBankStateCd = this.prmry_bank_state_cd();
			isNtwrkMtrxLvlId = this.ntwrk_mtrx_lvl_id();
			isOmnibusDistMdlCd = this.omnibus_dist_mdl_cdDD();
			isDataTransMthdCd = this.data_trans_mthd_cd();
			isClearingFirmId = this.clearing_firm_id();
			isClearingFirmName = this.clearing_firm_name();
*/			
			if(!isLongNm){
        		errorMsg += '<li>A Long Name was not entered, a long name is required.</li>';
				errSet = true;
				$('#long_nmInput').css('background-color', '#ff6600');
        	}
        	
			if(!isShortNm){
        		errorMsg += '<li>A Short Name was not entered, a short name is required.</li>';
				errSet = true;
				$('#short_nmInput').css('background-color', '#ff6600');
        	}
       	
			if(!isFirmAddress1){
        		errorMsg += '<li>A Firm Address 1 was not entered, a firm address 1 is required.</li>';
				errSet = true;
				$('#firm_address1Input').css('background-color', '#ff6600');
        	}
       	
			if(!isFirmCity){
        		errorMsg += '<li>A Firm City was not entered, a firm city is required.</li>';
				errSet = true;
				$('#firm_cityInput').css('background-color', '#ff6600');
        	}
       	
			if(!isFirmStateCd){
        		errorMsg += '<li>The Firm State is invalid, a valid selection is required.</li>';
				errSet = true;
				$('#firm_state_cdDD').css('background-color', '#ff6600');
        	}
        	
			if(!isFirmZip){
        		errorMsg += '<li>The Firm Zip is invalid, a firm zip is required.</li>';
				errSet = true;
				$('#firm_zip_cdInput').css('background-color', '#ff6600');
        	}
        	
			if(!isShrhldrSvcMdlCd){
        		errorMsg += '<li>A Shareholder Servicing model was not entered, a shareholder servicing model is required.</li>';
				errSet = true;
				$('#shrhldr_svc_mdl_cdInput').css('background-color', '#ff6600');
        	}
       	
			if(!isInActiveDt){
        		errorMsg += '<li>The InActive Date format is invalid, a valid date format is yyyy-mm-dd.</li>';
				errSet = true;
				$('#inactive_dtInput').css('background-color', '#ff6600');
        	}
			
			if(!isClrngFrmInd){
        		errorMsg += '<li>The Clearing Firm indicator is invalid, a valid selection is required.</li>';
				errSet = true;
				$('#clrng_frm_indInput').css('background-color', '#ff6600');
        	}

			if(!isFirmTypCd){
        		errorMsg += '<li>The Firm Type is invalid, a valid selection is required.</li>';
				errSet = true;
				$('#firm_typ_cdInput').css('background-color', '#ff6600');
        	}
			
			if(!isNSCCMemberNum){
        		errorMsg += '<li>A duplicate NSCC Number was entered, a unique number is required.</li>';
				errSet = true;
        	}
        	
			if(!isNSCCNetworkAlpha){
        		errorMsg += '<li>A duplicate NSCC Alpha code was entered, a unique nscc alpha code is required.</li>';
				errSet = true;
        	}
        	
/*						
			if(!isNSCCNetworkAlpha){
        		errorMsg += '<li>A NSCC Network Alpha was not entered, a nscc network alpha is required.</li>';
				errSet = true;
        	}
        	
			if(!isFirmTaxId){
        		errorMsg += '<li>Invalid format of Firm Tax ID, a valid form is XX-XXXXXXX.</li>';
				errSet = true;
        	}
*/						
									
			if(!isOpReviewDt){
        		errorMsg += '<li>An Operational Review Date is invalid, a valid date format is yyyy-mm-dd.</li>';
				errSet = true;
				$('#op_review_dtInput').css('background-color', '#ff6600');
        	}else{
        		
        	}
						
/*			
			if(!isClearingFirmName){
        		errorMsg += '<li>The FIRMport CF Id is invalid, a valid numeric FIRMport CF Id is required.</li>';
				errSet = true;
        	}
        	
			if(!isClearingFirmId){
        		errorMsg += '<li>The FIRMport CF Id is invalid, a valid numeric FIRMport CF Id is required.</li>';
				errSet = true;
        	}
        	
			if(!isNtwrkMtrxLvlId){
        		errorMsg += '<li>The Networ Matirx Level is invalid, a valid level value or N/A is required.</li>';
				errSet = true;
        	}
        	
			if(!isDataTransMthdCd){
        		errorMsg += '<li>The Data Transfer Method is invalid, a valid method is required.</li>';
				errSet = true;
        	}
        	
			if(!isOmnibusDistMdlCd){
        		errorMsg += '<li>The Omnibus Distribution model is invalid, a valid model is required.</li>';
				errSet = true;
        	}
       	
			if(!isSae16Ind){
        		errorMsg += '<li>The Sae 16 indicator is invalid, a valid selection is required.</li>';
				errSet = true;
        	}
        	
			if(!isIndustryAttestationInd){
        		errorMsg += '<li>The Industry Attestation indicator is invalid, a valid selection is required.</li>';
				errSet = true;
        	}
        	
			if(!isMfProfileIIInd){
        		errorMsg += '<li>The MF Profile II indicator is invalid, a valid selection is required.</li>';
				errSet = true;
        	}
        	
			if(!isFirmExitInd){
        		errorMsg += '<li>The Firm Exist Indicator is invalid, a valid selection is required.</li>';
				errSet = true;
        	}
        	
			if(!isCommservInd){
        		errorMsg += '<li>The Commserv Indicator is invalid, a valid selection is required.</li>';
				errSet = true;
        	}
        	
			if(!isSubacctPltfrmCd){
        		errorMsg += '<li>The Sub Accounting Platform is invalid, a valid selection is required.</li>';
				errSet = true;
        	}
        	
			if(!isSiteInspectionDt){
        		errorMsg += '<li>The Site Inspection date is invalid, a valid date in the form of yyyy-mm-dd is required.</li>';
				errSet = true;
        	}
        	
			if(!isPrmryBankStateCd){
        		errorMsg += '<li>The Primary Bank State is invalid, a valid selection is required.</li>';
				errSet = true;
        	}
        	
			if(!isNtwrkMtrxLvlId){
        		errorMsg += '<li>The Network Matrix Level is invalid, a valid selection is required.</li>';
				errSet = true;
        	}
*/			

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
        },// end validateFields

        long_nm: function(){
        	// the long name shouldn't be blank
        	var lngnn = $.trim($('#long_nmInput').val()); 
        	return lngnn.length > 0;
        },
        
		short_nm: function(){
        	return $('#short_nmInput').val().length != 0;
        },
	        
		firm_address_1: function(){
        	return $('#firm_address1Input').val().length != 0;
        },
	        
		firm_city: function(){
        	return $('#firm_cityInput').val().length != 0;
        },
	        
        // firm_state_cd make sure a selection has been made
        firm_state_cd: function(){
        	// some day this will get right
        	// -1 indicating not found
            if( $('#firm_state_cdDD').val().length > 0 ){
            	$('#firm_state_cdDD').css('border-color', '');
            	return true;
            }else{
            	// flag the field
//            	$('#firm_state_cdDD').css('border-color', 'red');
            	return false;
            }
        },
        
		firm_zip: function(){
        	return $('#firm_zip_cdInput').val().length != 0;
        },
	        
        group: function(){
        	var str = $('#groupInput').val(); 
        	return str.length > 0;
        },
        
        active_ind: function(){
        	return bfdsmgr.util.isYesNoUNK($('#active_indInput').val());
        },
        
        fan_mail_ind: function(){        	
        	return bfdsmgr.util.isYesNo($('#fan_mail_indDD').val());
        },
        
        in_active_date: function(){        	
        	if($('#active_indInput').val().toUpperCase() != 'YES'){
        		return bfdsmgr.util.isDateNoBlank($('#inactive_dtInput').val());
        	}else{
        		if(bfdsmgr.util.isDateNoBlank($('#inactive_dtInput').val())){
            		$('#inactive_dtInput').css('background-color', '#ff6600');
        			return false;
        		}else{
            		$('#inactive_dtInput').css('background-color', '');
            		$('#inactive_dtInput').attr('disabled', true);
            		return true;
        		}
        	}
        },
        
        website: function(){
        	return true;
        },
        
        omniserv_ind: function(){        	
        	return bfdsmgr.util.isYesNo($('#omniserv_indDD').val());
        },
        
        pst_sttlmnt_chng_ind: function(){        	
        	return bfdsmgr.util.isYesNo($('#post_settlement_chng_indInput').val());        	
        },
        
        vision_ind: function(){        	
        	return bfdsmgr.util.isYesNo($('#vision_indDD').val());           	
        },
        
        ptf_acat_trnsfr_ind: function(){        	
        	return bfdsmgr.util.isYesNo($('#ptf_acat_trnsfr_indInput').val());           	
        },
        
        dst_vho_ind: function(){        	
        	return bfdsmgr.util.isYesNo($('#dst_vho_indDD').val());           	
        },
        
        dealer_num: function(){
        	return bfdsmgr.util.isDigit($('#ta2000_dealr_numInput').val()); 
        },
        
        asof_trad_window: function(){
        	if(bfdsmgr.util.isBlank($('#asof_trad_windowInput').val())){ return true; }
        	if(bfdsmgr.util.isDigit($('#asof_trad_windowInput').val())){ return true; }
        	return false;
        },
        
        op_review_date: function(){
        	if($.trim($('#op_review_cdInput').val()).toUpperCase() == 'YES'){        		
            	return bfdsmgr.util.isDateNoBlank($('#op_review_dtInput').val());
        	}
        	$('#op_review_dtInput').css('background-color', '');
        	return true;
        },

		disableSpecPckg: function(){
			if($('#spec_pckg_indDD').val() == 'No'){
				$('#spec_pckg_linkInput').attr('disabled', true);
			}else{
				$('#spec_pckg_linkInput').attr('disabled', false);
			}
		},
		
		disableInActiveDt: function(){
			if($('#active_indInput').val() == 'Yes'){
								
				if(bfdsmgr.util.isDateNoBlank($('#inactive_dtInput').val())){
		        	$('#msg-p').html('This Parent Firm has an inactive date.\nIt must be removed before resetting the active indicator field.');
		    		$( "#dlg-msg" ).dialog({
		    			modal: true,
		    			buttons: {
		    				Ok: function() {
		    					$( this ).dialog( "close" );
		    				}
		    			}
		    		});
//		        	$('#submitFirm').attr('disabled', true);		    		
            		bfdsmgr.firm.getActiveInd('No');
				}else{
					$('#inactive_dtInput').attr('disabled', true);
//		        	$('#submitFirm').attr('disabled', false);
				}
				
			}else{
				$('#inactive_dtInput').attr('disabled', false);
//	        	$('#submitFirm').attr('disabled', false);
			}
		},

		disableClearingIdBtn: function(){
			
			var message;
			message = 'The selected Firm currently uses 1 or more Clearing Firms.\n';
			message += 'Please remove the existing Clearing Firms prior to updating the Clearing Firm indicator to Yes.';
			
			if($('#clrng_frm_indInput').val().toUpperCase() == 'YES'){
				if(sel_clrg_frms.length > 0 ){
		        	$('#msg-p').html(message);
		    		$( "#dlg-msg" ).dialog({
		    			modal: true,
		    			buttons: {
		    				Ok: function() {
		    					$( this ).dialog( "close" );
		    				}
		    			}
		    		});
//		        	$('#submitFirm').attr('disabled', true);
				}else{
					$('#clearing_firm_idInput').attr('disabled', true);
//		        	$('#submitFirm').attr('disabled', false);
				}
			}else{
				$('#clearing_firm_idInput').attr('disabled', false);
//	        	$('#submitFirm').attr('disabled', false);
			}
		},
        
        disableOpRevDt: function(){
        	var message;

        	message = 'This Parent Firm has an operational review date.\n';
        	message += 'It must be removed before resetting the operational review indicator field.';
        	if($.trim(unescape($('#op_review_cdInput option:selected').val())).toUpperCase() != 'YES'){
       		
				if(bfdsmgr.util.isDateNoBlank($('#op_review_dtInput').val())){
		        	$('#msg-p').html(message);
		    		$( "#dlg-msg" ).dialog({
		    			modal: true,
		    			buttons: {
		    				Ok: function() {
		    					$( this ).dialog( "close" );
		    				}
		    			}
		    		});
		        	$('#submitFirm').attr('disabled', true);
            		bfdsmgr.firm.getOpReview('Yes');
				}else{
					$('#op_review_dtInput').attr('disabled', true);
		        	$('#submitFirm').attr('disabled', false);
				}
				        		
        	}else{
        		$('#op_review_dtInput').attr('disabled', false);
	        	$('#submitFirm').attr('disabled', false);
        	}
        	
        },
        
        // firm_typ_cd make sure a selection has been made
        firm_typ_cd: function(){
            if( sel_firm_type.length > 0 ){
            	return true;
            }else{
            	// this is a dialog now
            	return false;
            }
        },
        
        firm_tax_id: function(){
    		var value = $('#firm_tax_idInput').val();
    		
            if(value.search("-") == -1){
                return false;
            }
            
            var SplitValue = value.split("-");
			
            if (SplitValue[0].length != 2) {
                return false;
            }
            
            if (SplitValue[1].length != 7) {
                return false;
            }
            
            if(!(bfdsmgr.util.isDigit(SplitValue[0]))){return false;}
            if(!(bfdsmgr.util.isDigit(SplitValue[1]))){return false;}
            
            return true;
    	},
    		
        
        // prmry_bank_state_cd make sure a selection has been made
        prmry_bank_state_cd: function(){
        	// some day this will get right
        	// -1 indicating not found
            if( $('#prmry_bank_state_cdDD').val().length > 0 ){
            	$('#prmry_bank_state_cdDD').css('border-color', '');
            	return true;
            }else{
            	// flag the field
//            	$('#prmry_bank_state_cdDD').css('border-color', 'red');
            	return false;
            }
        },
        
        // subacct_pltfrm_cd make sure a selection has been made
        subacct_pltfrm_cd: function(){
        	// some day this will get right
        	// -1 indicating not found
            if( $('#subacct_pltfrm_cdDD').val().length > 0 ){
            	$('#subacct_pltfrm_cdDD').css('border-color', '');
            	return true;
            }else{
            	// flag the field
//            	$('#subacct_pltfrm_cdDD').css('border-color', 'red');
            	return false;
            }
        },
        
        // clrng_frm_ind
        clrng_frm_ind: function(){
            return bfdsmgr.util.isYesNo_NoBlank($('#clrng_frm_indInput').val());
        },
        
        // sae16_ind
        sae16_ind: function(){
	        if(bfdsmgr.util.isYesNo_NoBlank($('#sae16_indDD').val())){
	        	$('#sae16_indDD').css('border-color', '');
	        	return true;
	        }else{
	        	// flag the field
//	        	$('#sae16_indDD').css('border-color', 'red');
	        	return false;
	        }
        },
        
        // industry_attestation_ind
        industry_attestation_ind: function(){
	        if(bfdsmgr.util.isYesNo_NoBlank($('#industry_attestation_indDD').val())){
	        	$('#industry_attestation_indDD').css('border-color', '');
	        	return true;
	        }else{
	        	// flag the field
//	        	$('#industry_attestation_indDD').css('border-color', 'red');
	        	return false;
	        }
        },
        
        // mf_profile_II_ind ‘YES’,’NO,’PARTIAL’,’N/A’
        mf_profile_II_ind: function(){
	        if(bfdsmgr.util.isYesNo_NoBlank($('#mf_profile_II_indInput').val())){
	        	$('#mf_profile_II_indInput').css('border-color', '');
	        	return true;
	        }else{
	        	// flag the field
//	        	$('#mf_profile_II_indInput').css('border-color', 'red');
	        	return false;
	        }
        },
        
        // firm_exit_indInput
        firm_exit_indInput: function(){
	        if(bfdsmgr.util.isYesNo($('#firm_exit_indInput').val())){
	        	$('#firm_exit_indInput').css('border-color', '');
	        	return true;
	        }else{
	        	// flag the field
//	        	$('#firm_exit_indInput').css('border-color', 'red');
	        	return false;
	        }
        },
        
        // commserv_ind
        commserv_ind: function(){
	        if(bfdsmgr.util.isYesNo_NoBlank($('#commserv_indDD').val())){
	        	$('#commserv_indDD').css('border-color', '');
	        	return true;
	        }else{
	        	// flag the field
//	        	$('#commserv_indDD').css('border-color', 'red');
	        	return false;
	        }
        },
        
        // site_inspection_dt
        site_inspection_dt: function(){
        	if(bfdsmgr.util.isDate($('#site_inspection_dtInput').val())){
	        	$('#site_inspection_dtInput').css('border-color', '');
	        	return true;
	        }else{
	        	// flag the field
	        	//$('#site_inspection_dtInput').css('border-color', 'red');
//	        	$('#site_inspection_dtInput').val('');
	        	return true;
	        }
        },
        
        omnibus_dist_mdl_cdDD: function(){
        	return $('#omnibus_dist_mdl_cdDD').val().length != 0;
        },
        
        omnibus_trad_proc_cdDD: function(){
        	return $('#omnibus_trad_proc_cdDD').val().length != 0;
        },
        
        data_trans_mthd_cd: function(){
        	return $('#data_trans_mthd_cdDD').val().length != 0;
        },
        
        shrhldr_svc_mdl_cd: function(){
            if( sel_shrhldr_svc_mdl.length > 0 ){
            	return true;
            }else{
            	// this is a dialog now
            	return false;
            }
        },
        
        batch_typ_cdDD: function(){        	
        	return $('#batch_typ_cdDD').val().length != 0;
        },
        
        settlement_typ_cdDD: function(){
        	return $('#settlement_typ_cdDD').val().length != 0;
        },

        clearing_firm_name: function(){
        	if($('#clearing_firm_nmInput').val().length > 0){
            	return bfdsmgr.util.isDigit($('#clearing_firm_idInput').val());
        	}
        	return true;
        },
        
        prmry_bank_aba_num: function(){
        	if($('#prmry_bank_aba_numInput').val().length > 0){
            	return bfdsmgr.util.isDigit($('#prmry_bank_aba_numInput').val());
        	}
        	return true;
        },
        
        clearing_firm_id: function(){
        	/*
        	 *  I want to be sure an empty string is passed to the controller who is looking
        	 *  for that empty string. over kill maybe want to be sure there is an empty string
        	 *  passed below
        	 */
        	if(bfdsmgr.util.isBlank($('#clearing_firm_idInput').val())){
        		$('#clearing_firm_idInput').val("");
        		return true;
        	}
        	return bfdsmgr.util.isDigit($('#clearing_firm_idInput').val());
        },
        
        ntwrk_mtrx_lvl_id: function(){
        	return bfdsmgr.util.isDigitOrNA($('#ntwrk_mtrx_lvl_idDD').val()); 
        }
                
    };
})();