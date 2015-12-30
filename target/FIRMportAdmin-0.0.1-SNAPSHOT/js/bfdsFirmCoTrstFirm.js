if (typeof bfdsmgr == 'undefined') {
    bfdsmgr = {};
}

//Firm_Co_Trust_Firm
bfdsmgr.fctf = (function() {
	/*
	 * The _MOUNT is the attach point found at the bottom of the view page
	 */
    var _MOUNT = "currentFirmCoTrustFirm";
    var _grid = null;
    var _rowClassName = null;
    var _short_nm;
    var isCompany = false;
    var isTrust   = false;
    var isSystem  = false;
    
    return {
    	// initializes the header text of the filtered grid
        initializeFilteredGrid: function(){
        	var layout = new Array(
                {field: "mgmt_co_short_nm", name: "Company", width: "100px", headerClasses: "bfdsmgrBoldText"},
                {field: "trst_frm_short_nm", name: "Trust", width: "100px", headerClasses: "bfdsmgrBoldText"},
                {field: "firm_short_nm", name: "System", width: "100px", headerClasses: "bfdsmgrBoldText"},
                {field: "firm_mgmt_co_id", name: "Hidden Id", width: "6px", hidden: true, headerClasses: "bfdsHidden"},
                {field: "trst_frm_id", name: "Hidden Id", width: "6px", hidden: true, headerClasses: "bfdsHidden"},
                {field: "firm_id", name: "Hidden Id", width: "6px", hidden: true, headerClasses: "bfdsHidden"}
            );
            var url = 'showAllMCoTrustFirms';
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
		                        defaultSort: 'trst_frm_short_nm',
		                        filterLabel: 'Trust Short Name',
		                        data: data,
		                        filterColumn: 'trst_frm_short_nm',
		                        width: "800px",
		                        className: "pagedGridBorder"
		                    });
	                $('#loading').addClass('bfdsHidden');
	                $('#title').removeClass('bfdsHidden');
                }
            });            
        },

        activateEditPage: function(data){
        	window.parent.setFieldPage('editFirmCoTrustFirmPage');
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
                    				data[st].mgmt_co_short_nm + ' - ' + data[st].mgmt_co_long_nm + '</input><br/>').appendTo($('#companyDialog')).get(0);
                    	}else{
                    		if(_val == data[st].mgmt_co_id){
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
    
		companyDialog: function(){
          	$('#companyDialog').dialog({ height: 400, 
        	  						     width: 300, 
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
									 									mgmt_co_id: outPut
									 						     };
							 						             $.post('saveFirmMgmtco',
							 						             		bfdsmgr.util.flattenObject(newCompany),
							 						                    function (data) {
							 						            	 		if(data.true_false){
							 						            	 			isCompany = true;
							 						            	            $('#addAlert#trustDialog').remove();							 						            	             
							 						            	            $('<div id="trustDialog" title="Trusts" class="bfdsHidden"></div>').appendTo($('#addAlert')).get(0);							 						            	            
							 						            	            $('#trustSubmit').attr('disabled', false);
							 						            	            bfdsmgr.fctf.getTrust();
							 						            	 		}else{
							 						            	            $('#trustSubmit').attr('disabled', true);
							 						            	 			isCompany = false;
							 						            	 		}
							 						                    },
							 						                    'json');
             							 					}else{
             							 						alert('No company selected, you must select atleast one!');
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
        
        getTrust: function(_val){
            $.ajax({
                type: "GET",
                url: 'getAllTrustFirms',
                dataType: "json",
                cache: false,
                success: function(data){               

	                	for(var st=0; st < data.length; st++){
	                    	if (typeof _val == 'undefined') {
	                    		$('<input id=trustRdb' + st + ' name=trustRdb value=' + data[st].firm_id + ' type="radio">' + data[st].short_nm + '</input><br/>').appendTo($('#trustDialog')).get(0);
	                    	}else{
	                    		if(_val == bfdsmgr.util.trim(data[st].firm_id)){
	                        		$('<input id=trustRdb' + st + ' name=trustRdb value=' + data[st].firm_id + ' type="radio" selected>' + data[st].short_nm + '</input><br/>').appendTo($('#trustDialog')).get(0);
	                    		}else{
	                        		$('<input id=trustRdb' + st + ' name=trustRdb value=' + data[st].firm_id + ' type="radio">' + data[st].short_nm + '</input><br/>').appendTo($('#trustDialog')).get(0);
	                    		}
	                    	}                		
	                	}
                	
                }
            });        	
        },
        
        trustDialog: function(){
			$('#trustDialog').dialog({ height: 400, 
            							width: 200, 
            							maxHeight: 400, 
            							modal: true,
            							buttons: { "Ok": function() { 
															var value = '';
															var nxtRdbBt = 0;
															
								 							while(true){
								 								if(document.getElementById('trustRdb' + nxtRdbBt) != null){
								 									if(document.getElementById('trustRdb' + nxtRdbBt).checked){
								 										value = document.getElementById('trustRdb' + nxtRdbBt).value;
								 										break;
								 									}
								 								}else{
								 									break;
								 								}
								 								nxtRdbBt++;
								 							}
								 							
								 							if(value.length > 0){
									 							var newTrust = {
									 					        	sel_trust: value
									 						     };
							 						             $.post('saveFirmTrust',
							 						             		bfdsmgr.util.flattenObject(newTrust),
							 						                    function (data) {
							 						            	 		if(data.true_false){
							 						            	 			isTrust = true;
							 						            	            $('#addAlert#systemDialog').remove();							 						            	             
							 						            	            $('<div id="systemDialog" title="System" class="bfdsHidden"></div>').appendTo($('#addAlert')).get(0);							 						            	            
							 						            	            $('#systemSubmit').attr('disabled', false);
							 						            	            bfdsmgr.fctf.getSystem();
							 						            	 		}else{
							 						            	            $('#systemSubmit').attr('disabled', true);
							 						            	 			isTrust = false;
							 						            	 		}
							 						                    },
							 						                    'json');
								 							}else{
								 								alert('No Trust selected, you must select atleast one!');
			 						            	 			isTrust = false;
								 							}
								 							
															$(this).dialog("close"); 
															},
            									   "Close": function() { 
            										   						$(this).dialog("close"); 
            										   				   }
            									 } 							
            							});
		},
 
        getSystem: function(_val){
            $.ajax({
                type: "GET",
                url: 'getNonTrustTpaFirms',
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
									 								sel_non_trust_tpa: value
									 						     };
							 						             $.post('saveFirmNonTrustTpa',
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
 
		addFrmCoTrstFrm: function(){
			
			if(isCompany && isTrust && isSystem){
	            if(confirm("Are you sure you want to add this Firm, Company, Trust?")) {
	            	$.post('addFrmCoTrstFrm',
	                        function (data) {
	                	
	                            if(!data.error){
	                            	bfdsmgr.fctf.addFrmCoTrstFrmSuccess(data);
	                            } else {
	                                bfdsmgr.fctf.addFrmCoTrstFrmFail(data);
	                            }
	                            
	                        },
	                        'json');
	            }
			}else{
				alert('One or more of the required items is missing!');
			}
            
		},
		
		addFrmCoTrstFrmSuccess: function(data){
            $('#successMessage').html('You have successfully added the Firm, Company, Trust, Firm record.');
            $('#success').removeClass('bfdsHidden');
        },

        addFrmCoTrstFrmFail: function(data){
            $('#successMessage').html("Fail! This Firm, Company, Trust, Firm record was not added<br/>" + data.getMessage());
            $('#success').removeClass('bfdsHidden');
        },

		NoEntriesFail: function(data){
            $('#successMessage').html('There were no enties!!.');
            $('#success').removeClass('bfdsHidden');
        },

        // clears the add firm form
        clearForm: function() {

            $(':input')
                .not(':button')
                .val('');

            $('#submitFirm').attr('disabled', true);
        },

        editFirmCoTrustFirmPage: function(){
               $.ajax({
                    type: "GET",
                    url: 'editFirmCoTrustFirm',
                    dataType: "json",
                    cache: false,
                    success: function(data){
                    	$('#companyText').val(bfdsmgr.util.trim(data.mgmt_co_long_nm));
                    	$('#trustText').val(bfdsmgr.util.trim(data.trst_frm_long_nm));
                		bfdsmgr.fctf.getSystem(data.firm_id);
                    }
                });
        },

        updateFirmCoTrustFirmPage: function(){
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
	                            	bfdsmgr.fctf.updateFirmSuccess(data);
	                            } else {
	                                bfdsmgr.fctf.updateFirmFail(data);
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

        // delete Firm Co Trust Firm 
        deleteFirmCoTrustFirmPage : function(){
            if(confirm("Are you sure you want to delete this Firm?")) {
                $.post('deleteFirm',
                        function(data){
                            bfdsmgr.fctf.deleteFirmSuccess(data);
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
     
        setSearchInput : function(firm_mgmt_co_id, trst_frm_id){
            var newFirm = {
            		firm_mgmt_co_id: firm_mgmt_co_id,
            		trst_frm_id: trst_frm_id
            };
        	$.post('setFirmCoTrustFirmRowToEdit',
            		bfdsmgr.util.flattenObject(newFirm),
                    function (data) {
            	
                        if(data.true_false){
                            bfdsmgr.fctf.searchFirmFail(data);
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
        	var firm_mgmt_co_id;
        	var trst_frm_id;

        	if(navigator.appName == 'Netscape'){
        		firm_mgmt_co_id = escape(data.cells[3].childNodes[0].wholeText);
        		trst_frm_id = escape(data.cells[4].childNodes[0].wholeText);
        	}else{
        		firm_mgmt_co_id = escape(data.cells[3].innerHTML);
        		trst_frm_id =  escape(data.cells[4].innerHTML);
        	}
        	this.setSearchInput(firm_mgmt_co_id, trst_frm_id);
        	$('tr').removeClass('gridRowHighlight');
        	data.className = "gridRowHighlight";
            $('#edit_firms',top.document).attr('disabled', false);                    	
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