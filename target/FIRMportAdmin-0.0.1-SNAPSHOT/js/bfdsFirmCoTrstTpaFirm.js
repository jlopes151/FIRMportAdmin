if (typeof bfdsmgr == 'undefined') {
    bfdsmgr = {};
}

// Firm_Co_Trust_Tpa_Firm 
bfdsmgr.fcttf = (function() {
	/*
	 * The _MOUNT is the attach point found at the bottom of the view page
	 */
    var _MOUNT = "currentFirm";
    var _grid = null;
    var _rowClassName = null;
    var _short_nm;
    
    return {
    	// initializes the header text of the filtered grid
        initializeFilteredGrid: function(){
        	var layout = new Array(
                {field: "long_nm", name: "Long Name", width: "160px", headerClasses: "bfdsmgrBoldText"},
                {field: "short_nm", name: "Short Name", width: "160px", headerClasses: "bfdsmgrBoldText"},
                {field: "clearing_firm_num", name: "Clearing Firn Number", width: "200px", headerClasses: "bfdsmgrBoldText"},
                {field: "clearing_firm_nm", name: "Clearing Firm Name", width: "200px", headerClasses: "bfdsmgrBoldText"},
                {field: "firm_address1", name: "Firm Address 1", width: "200px", headerClasses: "bfdsmgrBoldText"},
                {field: "firm_address2", name: "Firm Address 2", width: "200px", headerClasses: "bfdsmgrBoldText"},
                {field: "firm_city", name: "Firm City", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "firm_state_cd", name: "Firm State Cd", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "firm_website", name: "Firm Website", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "prmry_bank_nm", name: "Primary Bank Name", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "prmry_bank_address1", name: "Primary Bank Address1", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "prmry_bank_address2", name: "Primary Bank Address2", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "prmry_bank_city", name: "Primary Bank City", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "prmry_bank_state_cd", name: "Primary Bank State Cd", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "prmry_bank_zip_cd", name: "Primary Bank Zip Cd", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "prmry_bank_aba_num", name: "Primary Bank Aba Num", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "prmry_bank_acct_num", name: "Primary Bank Account Num", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "firm_tax_id", name: "Firm Tax Id", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "firm_typ_cd", name: "Firm Typ Cd", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "clrng_frm_ind", name: "Clrng Frm Ind", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "shrhldr_svc_mdl_cd", name: "Shrhldr Svc Mdl Cd", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "ntwrk_mtrx_lvl_id", name: "Ntwrk Mtrx Lvl Id", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "nscc_ntwrk_alpha_cd", name: "NSCC Ntwrk Alpha Cd", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "subacct_pltfrm_cd", name: "Sub Accuntng Pltfrm Cd", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "bin_mask", name: "Bin Mask", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "site_inspection_dt", name: "Site Inspection Dt", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "sae16_ind", name: "SAE16 Ind", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "industry_attestation_ind", name: "Industry Attestation Ind", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "mf_profile_II_ind", name: "MF Profile II Ind", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "brkrg_pltfrm", name: "Brkrg Pltfrm", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "spec_pckg_link", name: "Spec Pckg Link", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "trade_cut_off", name: "Trade Cut Off", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "firm_exit_ind", name: "Firm Exit Ind", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "omnibus_dist_mdl_cd", name: "Omnibus Dist Mdl Cd", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "data_trans_mthd_cd", name: "Data Trans Mthd Cd", width: "140px", headerClasses: "bfdsmgrBoldText"},
                {field: "nscc_member_num", name: "Nscc Member Number", width: "140px", headerClasses: "bfdsmgrBoldText"}
            );
            var url = 'showAllTrustTpaFirms';
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
        /*
         * If all required field have been entered submit the new firm
         */
        addFirm: function(){
        	var Ok = false;
            var newFirm = {
            		long_nm: $('#long_nmInput').val(),
           		    short_nm: $('#short_nmInput').val(),
            		clearing_firm_num: $('#clearing_firm_numInput').val(),
            		clearing_firm_nm: $('#clearing_firm_nmInput').val(),
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
            		firm_typ_cd: $('#firm_typ_cdDD').val(),
            		clrng_frm_ind: $('#clrng_frm_indInput').val(),
            		shrhldr_svc_mdl_cd: $('#shrhldr_svc_mdl_cdDD').val(),
            		ntwrk_mtrx_lvl_id: $('#ntwrk_mtrx_lvl_idInput').val(),
            		nscc_ntwrk_alpha_cd: $('#nscc_ntwrk_alpha_cdDD').val(),
            		subacct_pltfrm_cd: $('#subacct_pltfrm_cdDD').val(),
            		bin_mask: $('#bin_maskInput').val(),
            		site_inspection_dt: $('#site_inspection_dtInput').val(),
            		sae16_ind: $('#sae16_indInput').val(),
            		industry_attestation_ind: $('#industry_attestation_indInput').val(),
            		mf_profile_II_ind: $('#mf_profile_II_indInput').val(),
            		brkrg_pltfrm: $('#brkrg_pltfrmInput').val(),
            		spec_pckg_link: $('#spec_pckg_linkInput').val(),
            		trade_cut_off: $('#trade_cut_offInput').val(),
            		firm_exit_ind: $('#firm_exit_indInput').val(),
            		omnibus_dist_mdl_cd: $('#omnibus_dist_mdl_cdDD').val(),
            		data_trans_mthd_cd: $('#data_trans_mthd_cdDD').val(),
            		nscc_member_num: $('#nscc_member_numInput').val(),
            		commserv_ind: $('#commserv_indInput').val()
            };
            // checkem
            Ok = this.validateFields();
            if(Ok){
	            if(confirm("Are you sure you want to add this Firm?")) {
	            	$.post('addFirm',
	                		bfdsmgr.util.flattenObject(newFirm),
	                        function (data) {
	                	
	                            if(!data.error){
	                            	bfdsmgr.firm.addFirmSuccess(data);
	                            } else {
	                                bfdsmgr.firm.addFirmFail(data);
	                            }
	                            
	                        },
	                        'json');
	            }
            }else{
                $('#successMessage').html("Fail! There are one or more invalid fields!");
            }
        },
  
        addFirmSuccess: function(data){
            $('#successMessage').html('You have successfully added the Firm.');
            $('#success').removeClass('bfdsHidden');
        },

        addFirmFail: function(data){
            if(data.duplicate){
                $('#successMessage').html('Fail! This Firm already exists.');
            } else {
                $('#successMessage').html("Fail! This Firm was not created!");
            }
            $('#success').removeClass('bfdsHidden');
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
                    		if(_val == bfdsmgr.util.trim(data[st].state_cd)){
                        		$('<option value=' + data[st].state_cd + ' selected>' + data[st].state_dsc + '</option>').appendTo($('#firm_state_cdDD')).get(0);
                    		}else{
                        		$('<option value=' + data[st].state_cd + '>' + data[st].state_dsc + '</option>').appendTo($('#firm_state_cdDD')).get(0);
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

                	// make the user select a state
            		$('<option value=>-- Select --</option>').appendTo($('#prmry_bank_state_cdDD')).get(0);
                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<option value=' + data[st].state_cd + '>' + data[st].state_dsc + '</option>').appendTo($('#prmry_bank_state_cdDD')).get(0);
                    	}else{
                    		if(_val == bfdsmgr.util.trim(data[st].state_cd)){
                        		$('<option value=' + data[st].state_cd + ' selected>' + data[st].state_dsc + '</option>').appendTo($('#prmry_bank_state_cdDD')).get(0);
                    		}else{
                    			$('<option value=' + data[st].state_cd + '>' + data[st].state_dsc + '</option>').appendTo($('#prmry_bank_state_cdDD')).get(0);
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
                	
                	// make the user select one
            		$('<option value=>-- Select --</option>').appendTo($('#firm_typ_cdDD')).get(0);
                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<option value=' + data[st].firm_typ_cd + '>' + data[st].firm_typ_dsc + '</option>').appendTo($('#firm_typ_cdDD')).get(0);
                    	}else{
                    		if(_val == bfdsmgr.util.trim(data[st].firm_typ_cd)){
                        		$('<option value=' + data[st].firm_typ_cd + ' selected>' + data[st].firm_typ_dsc + '</option>').appendTo($('#firm_typ_cdDD')).get(0);
                    		}else{
                    			$('<option value=' + data[st].firm_typ_cd + '>' + data[st].firm_typ_dsc + '</option>').appendTo($('#firm_typ_cdDD')).get(0);
                    		}
                    	}
                	}                	
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

                	// make the user select one
            		$('<option value=>-- Select --</option>').appendTo($('#omnibus_dist_mdl_cdDD')).get(0);
                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<option value=' + data[st].omnibus_dist_mdl_cd + '>' + data[st].omnibus_dist_mdl_dsc + '</option>').appendTo($('#omnibus_dist_mdl_cdDD')).get(0);
                    	}else{
                    		if(_val == bfdsmgr.util.trim(data[st].omnibus_dist_mdl_cd)){
                        		$('<option value=' + data[st].omnibus_dist_mdl_cd + ' selected>' + data[st].omnibus_dist_mdl_dsc + '</option>').appendTo($('#omnibus_dist_mdl_cdDD')).get(0);
                    		}else{
                    			$('<option value=' + data[st].omnibus_dist_mdl_cd + '>' + data[st].omnibus_dist_mdl_dsc + '</option>').appendTo($('#omnibus_dist_mdl_cdDD')).get(0);
                    		}
                    	}
                	}
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
            		$('<option value=>-- Select --</option>').appendTo($('#data_trans_mthd_cdDD')).get(0);
                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<option value=' + data[st].data_trans_mthd_cd + '>' + data[st].data_trans_mthd_dsc + '</option>').appendTo($('#data_trans_mthd_cdDD')).get(0);
                    	}else{
                    		if(_val == bfdsmgr.util.trim(data[st].data_trans_mthd_cd)){
                        		$('<option value=' + data[st].data_trans_mthd_cd + ' selected>' + data[st].data_trans_mthd_dsc + '</option>').appendTo($('#data_trans_mthd_cdDD')).get(0);
                    		}else{
                    			$('<option value=' + data[st].data_trans_mthd_cd + '>' + data[st].data_trans_mthd_dsc + '</option>').appendTo($('#data_trans_mthd_cdDD')).get(0);
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

                	// make the user select one
            		$('<option value=>-- Select --</option>').appendTo($('#shrhldr_svc_mdl_cdDD')).get(0);
                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<option value=' + data[st].shrhldr_svc_mdl_cd + '>' + data[st].shrhldr_svc_mdl_dsc + '</option>').appendTo($('#shrhldr_svc_mdl_cdDD')).get(0);
                    	}else{
                    		if(_val == bfdsmgr.util.trim(data[st].shrhldr_svc_mdl_cd)){
                        		$('<option value=' + data[st].shrhldr_svc_mdl_cd + ' selected>' + data[st].shrhldr_svc_mdl_dsc + '</option>').appendTo($('#shrhldr_svc_mdl_cdDD')).get(0);
                    		}else{
                    			$('<option value=' + data[st].shrhldr_svc_mdl_cd + '>' + data[st].shrhldr_svc_mdl_dsc + '</option>').appendTo($('#shrhldr_svc_mdl_cdDD')).get(0);
                    		}
                    	}
                	}
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

                	// make the user select one
            		$('<option value=>-- Select --</option>').appendTo($('#subacct_pltfrm_cdDD')).get(0);
                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<option value=' + data[st].subacct_pltfrm_cd + '>' + data[st].subacct_pltfrm_cd + '</option>').appendTo($('#subacct_pltfrm_cdDD')).get(0);
                    	}else{
                    		if(_val == bfdsmgr.util.trim(data[st].shrhldr_svc_mdl_cd)){
                        		$('<option value=' + data[st].subacct_pltfrm_cd + ' selected>' + data[st].subacct_pltfrm_cd + '</option>').appendTo($('#subacct_pltfrm_cdDD')).get(0);
                    		}else{
                    			$('<option value=' + data[st].subacct_pltfrm_cd + '>' + data[st].subacct_pltfrm_cd + '</option>').appendTo($('#subacct_pltfrm_cdDD')).get(0);
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

            $('#submitFirm').attr('disabled', true);
        },

        editFirmPage: function(){
               $.ajax({
                    type: "GET",
                    url: 'editFirm?short_nm=' + this._short_nm,
                    dataType: "json",
                    cache: false,
                    success: function(data){
                		$('#firmIdInput').val(data.firm_id);
                		$('#clearingFirmIdInput').val(data.clearing_firm_id);
                		$('#long_nmInput').val(data.long_nm);
                		$('#short_nmInput').val(data.short_nm);
                		$('#clearing_firm_numInput').val(data.clearing_firm_num);
                		$('#clearing_firm_nmInput').val(data.clearing_firm_nm);
                		$('#firm_address1Input').val(data.firm_address1);
                		$('#firm_address2Input').val(data.firm_address2);
                		$('#firm_cityInput').val(data.firm_city);
                		
                		bfdsmgr.firm.getFirmStates(data.firm_state_cd);
                		
                		$('#firm_zip_cdInput').val(data.firm_zip_cd);
                		$('#firm_websiteInput').val(data.firm_website);
                		$('#prmry_bank_nmInput').val(data.prmry_bank_nm);
                		$('#prmry_bank_address1Input').val(data.prmry_bank_address1);
                		$('#prmry_bank_address2Input').val(data.prmry_bank_address2);
                		$('#prmry_bank_cityInput').val(data.prmry_bank_city);
                		
                		bfdsmgr.firm.getPrimaryBankStates(data.prmry_bank_state_cd);
                		
                		$('#prmry_bank_zip_cdDD').val(data.prmry_bank_zip_cd);
                		$('#prmry_bank_aba_numInput').val(data.prmry_bank_aba_num);
                		$('#prmry_bank_acct_numInput').val(data.prmry_bank_acct_num);
                		$('#firm_tax_idInput').val(data.firm_tax_id);
                		
                		bfdsmgr.firm.getFirmTypes(data.firm_typ_cd);

                		$('#clrng_frm_indInput').val(data.clrng_frm_ind);
                		
                		bfdsmgr.firm.getShareHldrSvcMdl(data.shrhldr_svc_mdl_cd);
                		
                		$('#ntwrk_mtrx_lvl_idInput').val(data.ntwrk_mtrx_lvl_id);
                		$('#nscc_ntwrk_alpha_cdDD').val(data.nscc_ntwrk_alpha_cd);
                		
                    	bfdsmgr.firm.getSubacctPltfrmCD(data.subacct_pltfrm_cd);

                		$('#bin_maskInput').val(data.bin_mask);
                		$('#site_inspection_dtInput').val(data.site_inspection_dt);
                		$('#sae16_indInput').val(data.sae16_ind);
                		$('#industry_attestation_indInput').val(data.industry_attestation_ind);
                		$('#mf_profile_II_indInput').val(data.mf_profile_II_ind);
                		$('#brkrg_pltfrmInput').val(data.brkrg_pltfrm);
                		$('#spec_pckg_linkInput').val(data.spec_pckg_link);
                		$('#trade_cut_offInput').val(data.trade_cut_off);
                		$('#firm_exit_indInput').val(data.firm_exit_ind);
                		
                		bfdsmgr.firm.getDataTransMthd(data.data_trans_mthd_cd);
                    	bfdsmgr.firm.getOmnibusDistMdl(data.omnibus_dist_mdl_cd);
                    	
                   		$('#nscc_member_numInput').val(data.nscc_member_num);
                   		$('#commserv_indInput').val(data.commserv_ind);
                    }
                });
        },

        updateFirm: function(){
            var newFirm = {
            		firm_id: $('#firmIdInput').val(),
            		clearing_firm_id: $('#clearingFirmIdInput').val(),
            		long_nm: $('#long_nmInput').val(),
           		    short_nm: $('#short_nmInput').val(),
            		clearing_firm_num: $('#clearing_firm_numInput').val(),
            		clearing_firm_nm: $('#clearing_firm_nmInput').val(),
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
            		firm_typ_cd: $('#firm_typ_cdDD').val(),
            		clrng_frm_ind: $('#clrng_frm_indInput').val(),
            		shrhldr_svc_mdl_cd: $('#shrhldr_svc_mdl_cdDD').val(),
            		ntwrk_mtrx_lvl_id: $('#ntwrk_mtrx_lvl_idInput').val(),
            		nscc_ntwrk_alpha_cd: $('#nscc_ntwrk_alpha_cdDD').val(),
            		subacct_pltfrm_cd: $('#subacct_pltfrm_cdDD').val(),
            		bin_mask: $('#bin_maskInput').val(),
            		site_inspection_dt: $('#site_inspection_dtInput').val(),
            		sae16_ind: $('#sae16_indInput').val(),
            		industry_attestation_ind: $('#industry_attestation_indInput').val(),
            		mf_profile_II_ind: $('#mf_profile_II_indInput').val(),
            		brkrg_pltfrm: $('#brkrg_pltfrmInput').val(),
            		spec_pckg_link: $('#spec_pckg_linkInput').val(),
            		trade_cut_off: $('#trade_cut_offInput').val(),
            		firm_exit_ind: $('#firm_exit_indInput').val(),
            		omnibus_dist_mdl_cd: $('#omnibus_dist_mdl_cdDD').val(),
            		data_trans_mthd_cd: $('#data_trans_mthd_cdDD').val(),
            		nscc_member_num: $('#nscc_member_numInput').val(),
            		commserv_ind: $('#commserv_indInput').val()
            };
            if(this.validateFields()){
	            if(confirm("Are you sure you want to update this Firm?")) {
	            	$.post('updateFirm',
	                		bfdsmgr.util.flattenObject(newFirm),
	                        function (data) {
	                	
	                            if(!data.error){
	                            	bfdsmgr.firm.updateFirmSuccess(data);
	                            } else {
	                                bfdsmgr.firm.updateFirmFail(data);
	                            }
	                            
	                        },
	                        'json');
	            }
            }
        },
        
        updateFirmSuccess: function(data){
            $('#successMessage').html('You have successfully updated the Firm.');
            $('#success').removeClass('bfdsHidden');
        },

        updateFirmFail: function(data){
            $('#successMessage').html("Fail! This Firm was not updated");
            $('#success').removeClass('bfdsHidden');
        },

        // delete Firm
        deleteFirm : function(){
            if(confirm("Are you sure you want to delete this Firm?")) {
                $.post('deleteFirm',
                        function(data){
                            bfdsmgr.firm.deleteFirmSuccess(data);
                        },
                        'json');
            }
        },

        deleteFirmSuccess : function(data){
            if (!data.error){
                $('#success').html('Firm Successfully Deleted');
            } else {
                $('#success').html('FAIL! Firm Not Deleted');
            }
        },
     
        setSearchInput : function(data){
            var newFirm = {
            	short_name: data
            };
        	$.post('setFirmCoRowToEdit',
            		bfdsmgr.util.flattenObject(newFirm),
                    function (data) {
            	
                        if(data.true_false){
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
         * set the short name record to edit, a change in the table member list
         * may cause this to be out of sync
         * This is getting the shor name in the table row
         */
        setRowToEdit: function(data){
        	var sh_name;

        	if(navigator.appName == 'Netscape'){
            	sh_name = escape(data.cells[1].childNodes[0].wholeText);
        	}else{
            	sh_name = escape(data.cells[1].innerHTML);
        	}
        	this.setSearchInput(sh_name);
        	$('tr').removeClass('gridRowHighlight');
        	data.className = "gridRowHighlight";
            $('#edit_firms',top.document).attr('disabled', false);                    	
        },
        
        activateEditPage: function(data){
        	window.parent.setFieldPage('editFirmPage');
        },
        
        validateFields: function(){
        	var Ok = true;
        	if((this.clrng_frm_ind() == true ) && 
        	   (this.sae16_ind() == true ) &&
        	   (this.industry_attestation_ind() == true ) &&
        	   (this.mf_profile_II_ind() == true ) &&
        	   (this.firm_exit_indInput() == true ) &&
        	   (this.commserv_ind() == true ) &&
        	   (this.site_inspection_dt() == true )){
        		Ok = true;
        	}else{ 
        		Ok = false;}
        	
            return Ok;
        },// end validateFields
        
        // clrng_frm_ind
        clrng_frm_ind: function(){
        	var Ok = false;
            if(bfdsmgr.util.isYesNo($('#clrng_frm_indInput').val())){
            	$('#clrng_frm_indInput').css('border-color', '');
            	OK = true;
            }else{
            	// flag the field
            	$('#clrng_frm_indInput').css('border-color', 'red');
            	OK = false;
            }
        	return Ok;
        },
        // sae16_ind
        sae16_ind: function(){
        	var Ok = false;
	        if(bfdsmgr.util.isYesNo($('#sae16_indInput').val())){
	        	$('#sae16_indInput').css('border-color', '');
	        	OK = true;
	        }else{
	        	// flag the field
	        	$('#sae16_indInput').css('border-color', 'red');
	        	OK = false;
	        }
	        return Ok;
        },        
        // industry_attestation_ind
        industry_attestation_ind: function(){
        	var Ok = false;
	        if(bfdsmgr.util.isYesNo($('#industry_attestation_indInput').val())){
	        	$('#industry_attestation_indInput').css('border-color', '');
	        	OK = true;
	        }else{
	        	// flag the field
	        	$('#industry_attestation_indInput').css('border-color', 'red');
	        	OK = false;
	        }
	        return Ok;
        },        
        // mf_profile_II_ind
        mf_profile_II_ind: function(){
        	var Ok = false;
	        if(bfdsmgr.util.isYesNo($('#mf_profile_II_indInput').val())){
	        	$('#mf_profile_II_indInput').css('border-color', '');
	        	OK = true;
	        }else{
	        	// flag the field
	        	$('#mf_profile_II_indInput').css('border-color', 'red');
	        	OK = false;
	        }
	        return Ok;
        },
        // firm_exit_indInput
        firm_exit_indInput: function(){
        	var Ok = false;
	        if(bfdsmgr.util.isYesNo($('#firm_exit_indInput').val())){
	        	$('#firm_exit_indInput').css('border-color', '');
	        	OK = true;
	        }else{
	        	// flag the field
	        	$('#firm_exit_indInput').css('border-color', 'red');
	        	OK = false;
	        }
	        return Ok;
        },
        // commserv_ind
        commserv_ind: function(){
        	var Ok = false;
	        if(bfdsmgr.util.isYesNo($('#commserv_indInput').val())){
	        	$('#commserv_indInput').css('border-color', '');
	        	OK = true;
	        }else{
	        	// flag the field
	        	$('#commserv_indInput').css('border-color', 'red');
	        	OK = false;
	        }
	        return Ok;
        },
        // site_inspection_dt
        site_inspection_dt: function(){
        	var Ok = false;
        	if(bfdsmgr.util.isDate($('#site_inspection_dtInput').val())){
	        	$('#site_inspection_dtInput').css('border-color', '');
	        	OK = true;
	        }else{
	        	// flag the field
	        	$('#site_inspection_dtInput').css('border-color', 'red');
	        	OK = false;
	        }
        	return Ok;
        }
        
    };
})();