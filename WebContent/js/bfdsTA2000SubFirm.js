if (typeof bfdsmgr == 'undefined') {
	bfdsmgr = {};
}

bfdsmgr.tasf = (function() {
	/*
	 * The _MOUNT is the attach point found at the bottom of the view page
	 */
	var _MOUNT = "currentTA2000SubFirm";
	var _grid = null;
	var _rowClassName = null;
	var _pfLngNm = "";
	var _mgmtCo = "";
	var _ta2kSubFirmNm = "";
	var _ta2kSubFirmDlrNum = "";
	var _ta2kSubFirmNsccMbrNum = "";
	var _firm_id;
	var _mgmt_co_id;
	var _tasf_id;
	var _ta2000_sub_firm_typ_cd_idx = 7;
	var _tasf_id_idx = 8;
	var _firm_id_idx = 9;
	var _mgmt_co_id_idx = 10;
	var _ta2000_firm_nm_idx = 3;
	var isActiveInd;
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
	// the long view is 38, short view 5
	var _firm_id_index = 20;
	var tasf_relations = new Array(2);
	var _ta2000_firm_nm = '';
	var _taSFDlg_title = 'TA2000 Sub Firm Relate - ';
	var _sel_ta2k_firm_type = '';
	
	
// testing
	var ts1;

	return {
		/*
		 * initializes the header text of the filtered grid
		 * 
		 * There are 0 to 38 (39 items) to the Firm grid
		 * 
		 */
		initializeFilteredGrid : function(set_layout) {
			layout = new Array({ field : "button", name : "", width : "60px", button : true, headerClasses : "bfdsmgrBoldText" }, 
							   { field : "system", name : "Parent Firm", width : "160px", headerClasses : "bfdsmgrBoldText" }, 
							   { field : "company", name : "Company", width : "180px", headerClasses : "bfdsmgrBoldText" }, 
							   { field : "ta2000_firm_nm", name : "Firm Name", width : "160px", headerClasses : "bfdsmgrBoldText" },
							   { field : "ta2000_dealr_num", name : "Dealer Number", width : "120px", headerClasses : "bfdsmgrBoldText" },
							   { field : "ta2000_nscc_member_num", name : "NSCC Member Number", width : "120px", headerClasses : "bfdsmgrBoldText" },
							   { field : "ta2000_sub_firm_typ_dsc", name : "Firm Type", width : "120px", headerClasses : "bfdsmgrBoldText" },
							   { field : "ta2000_sub_firm_typ_cd", name : "Hidden", width : "60px", hidden : true, headerClasses : "bfdsmgrBoldText" },
							   { field : "ta2000_sub_firm_id", name : "Hidden Id", width : "60px", hidden : true, headerClasses : "bfdsHidden"},
							   { field : "firm_id", name : "Hidden Id", width : "60px", hidden : true, headerClasses : "bfdsHidden" },
							   { field : "mgmt_co_id", name : "Hidden Id", width : "60px", hidden : true, headerClasses : "bfdsHidden" }
							   );

			var url = 'showAllTA2000SubFirms?_pfLngNm=' + _pfLngNm + 
											'&_mgmtCo=' + _mgmtCo +
											'&_ta2kSubFirmNm=' + _ta2kSubFirmNm +
											'&_ta2kSubFirmDlrNum=' + _ta2kSubFirmDlrNum +
											'&_ta2kSubFirmNsccMbrNum=' + _ta2kSubFirmNsccMbrNum;
			$.ajax({
				type : "GET",
				url : url,
				dataType : "json",
				cache : false,
				success : function(data) {
					_grid = new FilteredPagedGrid({
						pageSize : 15,
						attachPoint : document.getElementById(_MOUNT),
						structure : layout,
						defaultSort : 'ta2000_dealr_num',
						filterLabel : 'Dealer Number',
						data : data,
						filterColumn : 'ta2000_dealr_num',
						width : "800px",
						className : "pagedGridBorder"
					});
					$('#loading').addClass('bfdsHidden');
					$('#title').removeClass('bfdsHidden');
				}
			});

			/*
			 * disable the edit nav link until the user has selected a record
			 * disable it again after they submit the edited record
			 */
			$('#edit_firms', top.document).attr('disabled', true);
		},

		/*
		 * Saving a new TA2000 Sub Firm
		 */
		addTA2000SubFirm : function() {
			var newTA2000SubFirm = {
				ta2000_dealr_num : $('#ta2000_dealr_numInput').val(),
				ta2000_sub_firm_typ : $('#ta2000_sub_firm_typDD').val(),
				ta2000_nscc_member_num : $('#ta2000_nscc_member_numInput').val(),
				ta2000_nscc_ntwrk_alpha : $('#ta2000_nscc_ntwrk_alphaInput').val(),
				ta2000_firm_nm : $('#ta2000_firm_nmInput').val(),
				ta2000_firm_address1 : $('#ta2000_firm_address1Input').val(),
				ta2000_firm_address2 : $('#ta2000_firm_address2Input').val(),
				ta2000_firm_city : $('#ta2000_firm_cityInput').val(),
				ta2000_firm_state_cd : $('#ta2000_firm_state_cdDD').val(),
				ta2000_firm_zip : $('#ta2000_firm_zipInput').val(),
				active_ind : $('#active_indInput').val(),
				inactive_dt : $('#inactive_dtInput').val(),
				ta2000_alt_firm_nm : $('#ta2000_alt_firm_nmInput').val(),
				asof_trad_window : $('#asof_trad_windowInput').val(),
				omnibus_conversion_dt : $('#omnibus_conversion_dtInput').val(),
				post_settlement_chng_ind : $('#post_settlement_chng_indInput').val(),
				ptf_acat_trnsfr_ind : $('#ptf_acat_trnsfr_indInput').val(),
				shrhldr_svc_mdl_cd : $('#shrhldr_svc_mdl_cdDD').val(),
				lob_dsc : $('#lob_dscInput').val(),
				settlement_typ_cd : $('#settlement_typ_cdDD').val()
			};
			Ok = this.validateFields();
			if (Ok) {
                $('#submitSubFirm').attr('disabled', true);
	        	$('#msg-p').html('Are you sure you want to add this TA2000 Sub Firm?');
	    		$( "#dlg-msg" ).dialog({
	    			modal: true,
	    			buttons: {
	    				Ok: function() {
	    					// Closes the Are you sure dialog
	    					$( this ).dialog( "close" );

	    					$.post('addTA2000SubFirm',
	    	                		bfdsmgr.util.flattenObject(newTA2000SubFirm),
	    	                        function (data) {
	    	                	
	    	                            if(data.true_false){	    	                            	
	    	                            	$('#msg-p').html('You have successfully added the TA2000 Sub Firm.');
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
	    	                            	
	    	                            	var msg = 'Fail! This TA2000 Sub Firm entry was not created';
	    	                            	
	    	                            	if(data.duplicate){
	    	                            	    msg += 'A record with the selected TA2000 Dealer # / MGMT Company already exists.';
	    	                            	}
	    	                            	$('#msg-p').html(msg);
	    	                        		$( "#dlg-msg" ).dialog({
	    	                        			modal: true,
	    	                        			buttons: {
	    	                        				Ok: function() {
	    	                        					$( this ).dialog( "close" );
	    	                        	            	window.top.location.href="firmsNav";
	    	                        				}
	    	                        			}
	    	                        		});
	    	                            }
	    	                            
	    	                        },
   	                        'json');
	    				},
	    				Cancel: function(){
	    					$( this ).dialog( "close" );	    					
	    	            	window.top.location.href="firmsNav";
	    				}
	    			}
	    		});	            
				
			}// end of confirm
		},

		editTA2000SubFirm : function() {
			$.ajax({type : "GET",
					url : 'editTA200SubFirm',
					dataType : "json",
					cache : false,
					success : function(data) {

						$('#ta2000_dealr_numInput').val(data.ta2000_dealr_num);
						// Need this here fot the sub firm DD						
						bfdsmgr.tasf.getTA2000SubFirmType(data.ta2000_sub_firm_typ_cd);
						
						$('#ta2000_nscc_member_numInput').val(data.ta2000_nscc_member_num);
						$('#ta2000_nscc_ntwrk_alphaInput').val(data.ta2000_nscc_ntwrk_alpha_cd);
						$('#ta2000_firm_nmInput').val(data.ta2000_firm_nm);
						$('#ta2000_firm_address1Input').val(data.ta2000_firm_address1);
						$('#ta2000_firm_address2Input').val(data.ta2000_firm_address2);
						$('#ta2000_firm_cityInput').val(data.ta2000_firm_city);
						bfdsmgr.tasf.getSubFirmStates(data.ta2000_firm_state_cd);
						$('#ta2000_firm_zipInput').val(data.ta2000_firm_zip_cd);
						bfdsmgr.tasf.getActiveInd(data.active_ind);

						if($.trim(data.active_ind).toUpperCase() == 'YES'){
            				$('#inactive_dtInput').attr('disabled', true);
            			}else{
            				$('#inactive_dtInput').attr('disabled', false);
            			}
                								
						$('#inactive_dtInput').val(data.inactive_dt);
						$('#ta2000_alt_firm_nmInput').val(data.ta2000_alt_firm_nm);
						$('#asof_trad_windowInput').val(data.asof_trad_window);
						$('#omnibus_conversion_dtInput').val(data.omnibus_conversion_dt);
						bfdsmgr.tasf.getPostSettlementChngInd(data.post_settlement_chng_ind);
						bfdsmgr.tasf.getPtfACATTrnsfInd(data.ptf_acat_trnsfr_ind);
						bfdsmgr.tasf.getTAShareHldrSvcMdl(data.shrhldr_svc_mdl_cd);
//						$('#lob_dscInput').val(data.ast_typ_dsc);
						bfdsmgr.tasf.getTASettlementType(data.settlement_typ_cd);

					}
				});
		},

		updateTA2000SubFirm : function() {
			var newTA2000SubFirm = {
				ta2000_dealr_num : $('#ta2000_dealr_numInput').val(),
				ta2000_sub_firm_typ : $('#ta2000_sub_firm_typDD').val(),
				ta2000_nscc_member_num : $('#ta2000_nscc_member_numInput').val(),
				ta2000_nscc_ntwrk_alpha : $('#ta2000_nscc_ntwrk_alphaInput').val(),
				ta2000_firm_nm : $('#ta2000_firm_nmInput').val(),
				ta2000_firm_address1 : $('#ta2000_firm_address1Input').val(),
				ta2000_firm_address2 : $('#ta2000_firm_address2Input').val(),
				ta2000_firm_city : $('#ta2000_firm_cityInput').val(),
				ta2000_firm_state_cd : $('#ta2000_firm_state_cdDD').val(),
				ta2000_firm_zip : $('#ta2000_firm_zipInput').val(),
				active_ind : $('#active_indInput').val(),
				inactive_dt : $('#inactive_dtInput').val(),
				ta2000_alt_firm_nm : $('#ta2000_alt_firm_nmInput').val(),
				asof_trad_window : $('#asof_trad_windowInput').val(),
				omnibus_conversion_dt : $('#omnibus_conversion_dtInput').val(),
				post_settlement_chng_ind : $('#post_settlement_chng_indInput').val(),
				ptf_acat_trnsfr_ind : $('#ptf_acat_trnsfr_indInput').val(),
				shrhldr_svc_mdl_cd : $('#shrhldr_svc_mdl_cdDD').val(),
				lob_dsc : $('#lob_dscInput').val(),
				settlement_typ_cd : $('#settlement_typ_cdDD').val()
			};
			Ok = this.validateFields();
			if (Ok) {
                $('#submitSubFirm').attr('disabled', true);
	        	$('#msg-p').html('Are you sure you want to update this TA2000 Sub Firm?');
	    		$( "#dlg-msg" ).dialog({
	    			modal: true,
	    			buttons: {
	    				Ok: function() {
	    					// Closes the Are you sure dialog
	    					$( this ).dialog( "close" );

	    					$.post('updateTA2000SubFirm',
	    	                		bfdsmgr.util.flattenObject(newTA2000SubFirm),
	    	                        function (data) {
	    	                	
	    	                            if(data.true_false){	    	                            	
	    	                            	$('#msg-p').html('You have successfully updated the TA2000 Sub Firm.');
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
	    	                            	
	    	                            	var msg = 'Fail! This TA2000 Sub Firm entry was not updated';
	    	                            	
	    	                            	if(data.duplicate){
	    	                            	    msg += 'A record with the selected TA2000 Dealer # / MGMT Company already exists.';
	    	                            	}
	    	                            	$('#msg-p').html(msg);
	    	                        		$( "#dlg-msg" ).dialog({
	    	                        			modal: true,
	    	                        			buttons: {
	    	                        				Ok: function() {
	    	                        					$( this ).dialog( "close" );
	    	                        	            	window.top.location.href="firmsNav";
	    	                        				}
	    	                        			}
	    	                        		});
	    	                            }
	    	                            
	    	                        },
   	                        'json');
	    				},
	    				Cancel: function(){
	    					$( this ).dialog( "close" );	    					
	    	            	window.top.location.href="firmsNav";
	    				}
	    			}
	    		});	            
				
			}// end of confirm
		},

		get_current_layout : function() {
			return current_layout;
		},

		activateEditPage : function(data) {
			window.parent.setFieldPage('editTA2000SubFirmPage');
		},

		/*
		 * This is handled from the bfdsFirms.js since the AddTA button is on
		 * the Parent Firm viewpage and this js is a copy of the bfdsFirm.js
		 * 
		 * activatedoAddFrmNMgmtCoPage: function(firm_id, mgmt_co_id){
		 * alert('Activating the addTA2000SubFirmPage.jsp');
		 * window.parent.setFieldPage('addTA2000SubFirmPage'); },
		 */

		get_sel_clrg_frms : function() {
			return $.trim(sel_clrg_frms);
		},
		get_sel_firm_type : function() {
			return $.trim(sel_firm_type);
		},
		get_sel_shrhldr_svc_mdl : function() {
			return $.trim(sel_shrhldr_svc_mdl);
		},
		get_sel_brkrg_pltfrm : function() {
			return $.trim(sel_brkrg_pltfrm);
		},
		get_sel_subacct_pltfrm : function() {
			return $.trim(sel_subacct_pltfrm);
		},
		get_sel_data_trans_mthd : function() {
			return $.trim(sel_data_trans_mthd);
		},
		get_sel_omnibus_trad_proc : function() {
			return $.trim(sel_omnibus_trad_proc);
		},
		get_sel_settlement_typ : function() {
			return $.trim(sel_settlement_typ);
		},
		get_sel_nscc_num : function() {
			return sel_nscc_num;
		},
		get_sel_nscc_alpha : function() {
			return sel_nscc_alpha;
		},
		get_sel_pricing_source : function() {
			return sel_pricing_source;
		},

		get_nscc_data : function() {
			// clear first
			sel_nscc_alpha = '';
			sel_nscc_num = '';

			for ( var nscc = 1; nscc <= 10; nscc++) {
				if ($('#nscc_num_' + nscc).val().toUpperCase() != 'N/A') {
					if ($('#nscc_num_' + nscc).val().length > 0) {
						if (bfdsmgr.util.isDigit($('#nscc_num_' + nscc).val())) {
							if ($('#nscc_alpha_' + nscc).val().toUpperCase() != 'N/A') {
								sel_nscc_alpha += $('#nscc_alpha_' + nscc).val() + ',';
							} else {
								sel_nscc_alpha = '';
								sel_nscc_num = '';
								break;
							}

							sel_nscc_num += $('#nscc_num_' + nscc).val() + ',';
						} else {
							sel_nscc_alpha = '';
							sel_nscc_num = '';
							break;
						}
					}
				} else {
					sel_nscc_alpha = 'N/A';
					sel_nscc_num = 'N/A';
					break;
				}
			}

			// trim the trailing comma
			if (sel_nscc_num.search(',') != -1) {
				sel_nscc_num = sel_nscc_num.substring(0,
				sel_nscc_num.length - 1);
			}
			if (sel_nscc_alpha.search(',') != -1) {
				sel_nscc_alpha = sel_nscc_alpha.substring(0,
						sel_nscc_alpha.length - 1);
			}
		},

		/*
		 * This allows the user to quickly select Clearing Firms from the Add or
		 * Edit Parent Firm pages. The dialog is loaded with a call to
		 * getClearingFirms()
		 * 
		 */
		clearingFirmDialog : function() {

			$('#get_clr_firm_dialog').dialog({
				height : 400,
				width : 600,
				maxWidth : 600,
				minWidth : 450,
				maxHeight : 475,
				minHeight : 475,
				modal : true,
				buttons : {
					"Ok" : function() {
						var tmpStr = '';

						$('#clr_firm_to option:selected').each(function() {
							tmpStr += $.trim($(this).val()) + ',';
						}).change();

						sel_clrg_frms = tmpStr.substring(0, tmpStr.length - 1);

						$(this).dialog("close");
						/*
						 * need to refresh the view to clear the cache expire or
						 * no-cache not working
						 */
						// window.location.reload();
					},

					"Close" : function() {
						$(this).dialog("close");
						// window.location.reload();
					}

				}
			});
		},

		cancelFirm : function() {
			window.top.location.href = "firmsNav";
		},

		firmTypeDialog : function() {

			$('#get_firm_type_dialog').dialog({
				height : 400,
				width : 600,
				maxWidth : 600,
				minWidth : 450,
				maxHeight : 475,
				minHeight : 475,
				modal : true,
				buttons : {
					"Ok" : function() {
						var tmpStr = '';

						$('#firm_typ_to option:selected').each(function() {
							tmpStr += $.trim($(this).val()) + ',';
						}).change();

						sel_firm_type = tmpStr.substring(0, tmpStr.length - 1);

						$(this).dialog("close");
						/*
						 * need to refresh the view to clear the cache expire or
						 * no-cache not working
						 */
						// window.location.reload();
					},

					"Close" : function() {
						$(this).dialog("close");
						// window.location.reload();
					}

				}
			});
		},

		shrhldrServiceModelDialog : function() {

			$('#get_shrhldr_svc_mdl_cd_dialog')
					.dialog(
							{
								height : 400,
								width : 600,
								maxWidth : 600,
								minWidth : 450,
								maxHeight : 475,
								minHeight : 475,
								modal : true,
								buttons : {
									"Ok" : function() {
										var tmpStr = '';

										$('#shrhldr_svc_mdl_to option:selected').each(
														function() {tmpStr += $.trim($(this).val()) + ',';
														}).change();

										sel_shrhldr_svc_mdl = tmpStr.substring(
												0, tmpStr.length - 1);

										if ((sel_shrhldr_svc_mdl.length > 3)
												&& (sel_shrhldr_svc_mdl.search('N/A') != -1)) {
											alert('Error: N/A plus other selection not disallowed!');
											bfdsmgr.util.removeAll('#shrhldr_svc_mdl_frm','#shrhldr_svc_mdl_to');
											sel_shrhldr_svc_mdl = '';
										}

										$(this).dialog("close");
										/*
										 * need to refresh the view to clear the
										 * cache expire or no-cache not working
										 */
										// window.location.reload();
									},

									"Close" : function() {
										$(this).dialog("close");
										// window.location.reload();
									}

								}
							});
		},

		brkrgPlatformDialog : function() {

			$('#get_brkrg_pltfrm_dialog')
					.dialog(
							{
								height : 400,
								width : 600,
								maxWidth : 600,
								minWidth : 450,
								maxHeight : 475,
								minHeight : 475,
								modal : true,
								buttons : {
									"Ok" : function() {
										var tmpStr = '';

										$('#brkrg_pltfrm_to option:selected').each(
														function() {tmpStr += $.trim($(this).val()) + ',';
														}).change();

										sel_brkrg_pltfrm = tmpStr.substring(0, tmpStr.length - 1);

										if ((sel_brkrg_pltfrm.length > 3)
												&& (sel_brkrg_pltfrm.search('N/A') != -1)) {
											alert('Error: N/A plus other selection not disallowed!');
											bfdsmgr.util.removeAll('#brkrg_pltfrm_frm','#brkrg_pltfrm_to');
											sel_brkrg_pltfrm = '';
										}

										$(this).dialog("close");
										/*
										 * need to refresh the view to clear the
										 * cache expire or no-cache not working
										 */
										// window.location.reload();
									},

									"Close" : function() {
										$(this).dialog("close");
										// window.location.reload();
									}

								}
							});
		},

		subAccountingPlatformDialog : function() {

			$('#get_subacct_pltfrm_dialog')
					.dialog(
							{
								height : 400,
								width : 600,
								maxWidth : 600,
								minWidth : 450,
								maxHeight : 475,
								minHeight : 475,
								modal : true,
								buttons : {
									"Ok" : function() {
										var tmpStr = '';

										$('#subacct_pltfrm_to option:selected').each(
														function() {tmpStr += $.trim($(this).val())	+ ',';
														}).change();

										sel_subacct_pltfrm = tmpStr.substring(0, tmpStr.length - 1);

										if ((sel_subacct_pltfrm.length > 3)
												&& (sel_subacct_pltfrm.search('N/A') != -1)) {
											alert('Error: N/A plus other selection not disallowed!');
											bfdsmgr.util.removeAll('#subacct_pltfrm_frm','#subacct_pltfrm_to');
											sel_subacct_pltfrm = '';
										}

										$(this).dialog("close");
										/*
										 * need to refresh the view to clear the
										 * cache expire or no-cache not working
										 */
										// window.location.reload();
									},

									"Close" : function() {
										$(this).dialog("close");
										// window.location.reload();
									}

								}
							});
		},

		dataTransmissionMethodDialog : function() {

			$('#get_data_trans_mthd_cd_dialog')
					.dialog(
							{
								height : 400,
								width : 600,
								maxWidth : 600,
								minWidth : 450,
								maxHeight : 475,
								minHeight : 475,
								modal : true,
								buttons : {
									"Ok" : function() {
										var tmpStr = '';

										$('#data_trans_mthd_to option:selected')
												.each(
														function() {tmpStr += $.trim($(this).val())	+ ',';
														}).change();

										sel_data_trans_mthd = tmpStr.substring(
												0, tmpStr.length - 1);

										if ((sel_data_trans_mthd.length > 3)
												&& (sel_data_trans_mthd.search('N/A') != -1)) {
											alert('Error: N/A plus other selection not disallowed!');
											bfdsmgr.util.removeAll('#data_trans_mthd_frm','#data_trans_mthd_to');
											sel_data_trans_mthd = '';
										}

										$(this).dialog("close");
										/*
										 * need to refresh the view to clear the
										 * cache expire or no-cache not working
										 */
										// window.location.reload();
									},

									"Close" : function() {
										$(this).dialog("close");
										// window.location.reload();
									}

								}
							});
		},

		omnibusTradeProcedureDialog : function() {

			$('#get_omnibus_trad_proc_cd_dialog')
					.dialog(
							{
								height : 400,
								width : 600,
								maxWidth : 600,
								minWidth : 450,
								maxHeight : 475,
								minHeight : 475,
								modal : true,
								buttons : {
									"Ok" : function() {
										var tmpStr = '';

										$(
												'#omnibus_trad_proc_to option:selected')
												.each(
														function() {
															tmpStr += $.trim($(this).val())	+ ',';
														}).change();

										sel_omnibus_trad_proc = tmpStr
												.substring(0, tmpStr.length - 1);

										if ((sel_omnibus_trad_proc.length > 3)
												&& (sel_omnibus_trad_proc.search('N/A') != -1)) {
											alert('Error: N/A plus other selection not disallowed!');
											bfdsmgr.util.removeAll('#omnibus_trad_proc_frm','#omnibus_trad_proc_to');
											sel_omnibus_trad_proc = '';
										}

										$(this).dialog("close");
										/*
										 * need to refresh the view to clear the
										 * cache expire or no-cache not working
										 */
										// window.location.reload();
									},

									"Close" : function() {
										$(this).dialog("close");
										// window.location.reload();
									}

								}
							});
		},

		settlementTypeDialog : function() {

			$('#get_settlement_typ_cd_dialog')
					.dialog(
							{
								height : 400,
								width : 600,
								maxWidth : 600,
								minWidth : 450,
								maxHeight : 475,
								minHeight : 475,
								modal : true,
								buttons : {
									"Ok" : function() {
										var tmpStr = '';

										$('#settlement_typ_cd_to option:selected').each(
														function() {tmpStr += $.trim($(this).val()) + ',';
														}).change();

										sel_settlement_typ = tmpStr.substring(0, tmpStr.length - 1);

										if ((sel_settlement_typ.length > 3)
												&& (sel_settlement_typ.search('N/A') != -1)) {
											alert('Error: N/A plus other selection not disallowed!');
											bfdsmgr.util.removeAll('#settlement_typ_cd_frm','#settlement_typ_cd_to');
											sel_settlement_typ = '';
										}

										$(this).dialog("close");
										/*
										 * need to refresh the view to clear the
										 * cache expire or no-cache not working
										 */
										// window.location.reload();
									},

									"Close" : function() {
										$(this).dialog("close");
										// window.location.reload();
									}

								}
							});
		},

		pricingSourceDialog : function() {

			$('#get_pricing_source_dialog')
					.dialog(
							{
								height : 400,
								width : 600,
								maxWidth : 600,
								minWidth : 450,
								maxHeight : 475,
								minHeight : 475,
								modal : true,
								buttons : {
									"Ok" : function() {
										var tmpStr = '';

										$('#pricing_source_to option:selected').each(
														function() {tmpStr += $.trim($(this).val())	+ ',';
														}).change();

										sel_pricing_source = tmpStr.substring(0, tmpStr.length - 1);

										if ((sel_pricing_source.length > 3)
												&& (sel_pricing_source.search('N/A') != -1)) {
											alert('Error: N/A plus other selection not disallowed!');
											bfdsmgr.util.removeAll('#pricing_source_frm','#pricing_source_to');
											sel_pricing_source = '';
										}

										$(this).dialog("close");
										/*
										 * need to refresh the view to clear the
										 * cache expire or no-cache not working
										 */
										// window.location.reload();
									},

									"Close" : function() {
										$(this).dialog("close");
										// window.location.reload();
									}

								}
							});
		},

		/*
		 * 
		 */
		ta2kSubFirmDialog : function() {
			
			// define the firm types that can be selected
			$('#tar_lst1_lbl1').html('Available ' + $('#hidn_field_dsc1').val());
			$('#tar_lst1_lbl2').html('Selected '  + $('#hidn_field_dsc1').val());
			$('#tar_lst2_lbl1').html('Available ' + $('#hidn_field_dsc2').val());
			$('#tar_lst2_lbl2').html('Selected '  + $('#hidn_field_dsc2').val());
			
			// load the title with the selected sub firm
			$('#ta2kSubFirmDialog').attr('title', _taSFDlg_title + _ta2000_firm_nm);

			/*
			 *  get the available for each list set tar_lst1, tar_lst2
			 *  passing hidn_field_cd1, hidn_field_cd2
			 *  
			 *  
			 */			
			$.ajax({
				type : "GET",
				url : 'loadTA2KSubFirmRelDlg?hidn_field_cd1=' + $('#hidn_field_cd1').val() + 
				      '&hidn_field_cd2=' + $('#hidn_field_cd2').val(),
				dataType : "json",
				cache : false,
				success : function(data) {
					/*
					 * Return the existing sub firm relationship - ta2ksfrs
					 * Return the available sub firms for the hidden sub firm type - ta2000subfirm1, ta2000subfirm2
					 * 
					 * load the available multiselects then move the existing rel sub firm, from the available
					 * side to the selected multiselect side  
					 * 
					 * ta2000_sub_firm_id, ta2000_firm_nm
					 * 
					 */
					for ( var st=0; st < data.ta2ksfrdlgset1.length; st++) {
						$('<option id=tar_lst1_frm' + st + ' value='+ data.ta2ksfrdlgset1[st].ta2000_sub_firm_id 
								+ '>'+ data.ta2ksfrdlgset1[st].ta2000_firm_nm + '</option><br/>')
								.appendTo($('#tar_lst1_frm')).get(0);
					}


					for( var a=0; a < data.ta2ksfrdlgset1.length; a++){
						for(var b=0; b < data.ta2ksubfrmrel.length; b++){
							if($('#tar_lst1_frm' + a).val() == (data.ta2ksubfrmrel[b].ta2000_sub_firm_rel_id).toString()){
								$('#tar_lst1_frm' + a).attr('selected', true);
							}
						}
					}// otter for
					
					for ( var st=0; st < data.ta2ksfrdlgset2.length; st++) {
						$('<option id=tar_lst2_frm' + st + ' value='+ data.ta2ksfrdlgset2[st].ta2000_sub_firm_id 
								+ '>'+ data.ta2ksfrdlgset2[st].ta2000_firm_nm + '</option><br/>')
								.appendTo($('#tar_lst2_frm')).get(0);
					}

					for( var a=0; a < data.ta2ksfrdlgset2.length; a++){
						for(var b=0; b < data.ta2ksubfrmrel.length; b++){
							if($('#tar_lst2_frm' + a).val() == (data.ta2ksubfrmrel[b].ta2000_sub_firm_rel_id).toString()){
								$('#tar_lst2_frm' + a).attr('selected', true);
							}
						}
					}// otter for
					
					/*
					 * Move the existing rel to the selected multi-selects
					 */
					
				}
			});

			
			$('#ta2kSubFirmDialog').dialog(
					{
						height : 600,
						width : 575,
						maxHeight : 600,
						modal : true,
						buttons : {
							"Ok" : function() {
								var value = '';
								var nxtRdbBt = 0;

								while (true) {
									if (document.getElementById('companyRdb' + nxtRdbBt) != null) {
										if (document.getElementById('companyRdb' + nxtRdbBt).checked) {
											value = document.getElementById('companyRdb'+ nxtRdbBt).value;
											break;
										}
									} else {
										break;
									}
									nxtRdbBt++;
								}

								if (value.length > 0) {
									var newMgmtco = {
										mgmt_co_id : value
									};
									$.post('saveFirmMgmtco',
											bfdsmgr.util.flattenObject(newMgmtco),
											function(data) {
												if (data.true_false) {
														bfdsmgr.tasf.activatedoAddFrmNMgmtCoPage();
												} else {
														// say something about the fail to save
												}
									}, 'json');
								} else {
									alert('No Company selected, you must select atleast one!');
									$(this).dialog("close");
									window.location.reload();
								}

								$(this).dialog("close");
								/*
								 * need to refresh the view to clear the
								 * cache expire or no-cache not working
								 */
								// window.location.reload();
							},

							"Close" : function() {
								$(this).dialog("close");
								window.location.reload();
							}

						}
					}); // end of ta2kSubFirmDialog
			
			
		},

		disableInActiveDt: function(){
			if($('#active_indInput').val() == 'Yes'){
				$('#inactive_dtInput').attr('disabled', true);
			}else{
				$('#inactive_dtInput').attr('disabled', false);
			}
		},

		getClearingFirms : function(_val) {
			$.ajax({
				type : "GET",
				url : 'getClearingFirms',
				dataType : "json",
				cache : false,
				success : function(data) {

					for ( var st = 0; st < data.length; st++) {
						$('<option id=clr_firm_frm' + st + ' value='+ data[st].firm_id + '>'+ data[st].long_nm + '</option><br/>')
								.appendTo($('#clr_firm_frm')).get(0);
					}

				}
			});
		},

		getExistingClearingFirms : function() {
			var url = 'getExistingClearingFirms';
			$.ajax({
				type : "GET",
				url : url,
				dataType : "text",
				cache : false,
				success : function(data) {

					var s_data = data.split(',');
					var more = 0;
					var ms_options = $('#clr_firm_frm option').size();
					sel_clrg_frms = '';

					while (s_data.length > more) {
						for ( var st = 0; st < ms_options; st++) {

							var str = $('#clr_firm_frm' + st).val();

							// not sure how many %20 there could be
							while (str.search('%20') != -1) {
								str = str.replace('%20', ' ');
							}

							if ($.trim(str) == s_data[more]) {
								$('#clr_firm_frm' + st).attr('selected', true);
								sel_clrg_frms += $.trim(str) + ',';
							}

						}
						more++;
					}

					bfdsmgr.util.add('#clr_firm_frm', '#clr_firm_to');
				}
			});
		},

		/*
		 * For the schema II getting all the Companies
		 */
		getTA2kViewCompany : function(data) {
			$.ajax({
				type : "GET",
				url : 'getCompany',
				dataType : "json",
				cache : false,
				success : function(data) {

					$('<option id=tacompany0 value=>-- Select --</option>').appendTo($('#ta2k_view_mgmt_co')).get(0);
					for ( var st = 1; st < data.length; st++) {
						$('<option id=tacompany' + st + ' value=' + data[st].ta2000_co_cd + '>'
							+ data[st].ta2000_co_cd + '</option>').appendTo($('#ta2k_view_mgmt_co')).get(0);
					}

				}
			});
		},

		/*
		 * For the schema II getting all the Companies
		 */
		getCompany : function(data) {
			$.ajax({
				type : "GET",
				url : 'getCompany',
				dataType : "json",
				cache : false,
				success : function(data) {

					for ( var st = 0; st < data.length; st++) {
						if (typeof _val == 'undefined') {
							$('<input id=companyRdb' + st + ' name=companyRdb value=' + data[st].mgmt_co_id	+ ' type="radio">'
								+ data[st].mgmt_co_short_nm + ' - ' + data[st].mgmt_co_long_nm + 
								'</input><br/>').appendTo($('#companyDialog')).get(0);
						} else {
							if (_val == $.trim(data[st].mgmt_co_id)) {
								$('<input id=companyRdb' + st + ' name=companyRdb value=' + data[st].mgmt_co_id + ' type="radio" selected>'
										+ data[st].mgmt_co_short_nm + ' - ' + data[st].mgmt_co_long_nm + 
										'</input><br/>').appendTo($('#companyDialog')).get(0);
							} else {
								$('<input id=companyRdb' + st + ' name=companyRdb value=' + data[st].mgmt_co_id + ' type="radio">'
										+ data[st].mgmt_co_short_nm + ' - ' + data[st].mgmt_co_long_nm + 
										'</input><br/>').appendTo($('#companyDialog')).get(0);
							}
						}
					}

				}
			});
		},

		/*
		 * if no value is passed then the method is called from the Add page
		 * else the Edit which would have pre values
		 */
		getFirmStates : function(_val) {
			var url = 'getStates';
			$.ajax({
				type : "GET",
				url : url,
				dataType : "json",
				cache : false,
				success : function(data) {

					// make the user select a state
					$('<option value=>-- Select --</option>').appendTo(
							$('#firm_state_cdDD')).get(0);
					for ( var st = 0; st < data.length; st++) {
						if (typeof _val == 'undefined') {
							$('<option value=' + data[st].state_cd + '>' + data[st].state_dsc + '</option>')
									.appendTo($('#firm_state_cdDD')).get(0);
						} else {
							if ($.trim(_val.toUpperCase()) == $.trim(
									data[st].state_cd).toUpperCase()) {
								$('<option value=' + data[st].state_cd
										+ ' selected>'
										+ data[st].state_dsc
										+ '</option>').appendTo(
								$('#firm_state_cdDD')).get(0);
							} else {
								$('<option value=' + data[st].state_cd
										+ '>' + data[st].state_dsc
										+ '</option>').appendTo(
								$('#firm_state_cdDD')).get(0);
							}
						}
					}
				}
			});
		},

		getSubFirmStates : function(_val) {
			var url = 'getStates';
			$.ajax({type : "GET",
					url : url,
					dataType : "json",
					cache : false,
					success : function(data) {

						// make the user select a state
						$('<option value=>-- Select --</option>').appendTo($('#ta2000_firm_state_cdDD')).get(0);
						for ( var st = 0; st < data.length; st++) {
							if (typeof _val == 'undefined') {
								$('<option value=' + data[st].state_cd + '>'
										+ data[st].state_dsc
										+ '</option>').appendTo(
								$('#ta2000_firm_state_cdDD')).get(0);
							} else {
								if ($.trim(_val.toUpperCase()) == $.trim(data[st].state_cd).toUpperCase()) {
									$('<option value='
											+ data[st].state_cd
											+ ' selected>'
											+ data[st].state_dsc
											+ '</option>')
									.appendTo($('#ta2000_firm_state_cdDD')).get(0);
								} else {
									$('<option value='
											+ data[st].state_cd
											+ '>'
											+ data[st].state_dsc
											+ '</option>')
									.appendTo($('#ta2000_firm_state_cdDD')).get(0);
								}
							}
						}
					}
				});
		},

		getMFProfileII : function(_val) {
			var url = 'getMFProfileII';
			$.ajax({
				type : "GET",
				url : url,
				dataType : "json",
				cache : false,
				success : function(data) {

					for ( var st = 0; st < data.length; st++) {
						if (typeof _val == 'undefined') {
							$('<option value=' + data[st].mf_profile_II_ind + '>' + data[st].mf_profile_II_dsc 
									+ '</option>').appendTo($('#mf_profile_II_indInput')).get(0);
						} else {
							if ($.trim(_val.toUpperCase()) == $.trim(data[st].mf_profile_II_ind).toUpperCase()) {
								$('<option value=' + data[st].mf_profile_II_ind + ' selected>' + data[st].mf_profile_II_dsc 
										+ '</option>').appendTo($('#mf_profile_II_indInput')).get(0);
							} else {
								$('<option value=' + data[st].mf_profile_II_ind + '>' + data[st].mf_profile_II_dsc 
										+ '</option>').appendTo($('#mf_profile_II_indInput')).get(0);
							}
						}
					}
				}
			});
		},

		getTA2000SubFirmType : function(_val) {
			var url = 'getTA2000SubFirmType';

			$.ajax({type : "GET",
					url : url,
					dataType : "json",
					cache : false,
					success : function(data) {

						var tasfr_count = 1;

						for ( var st = 0; st < data.length; st++) {
							if (typeof _val == 'undefined') {
								if ($.trim(data[st].ta2000_sub_firm_typ_cd).toUpperCase() == "No") {
									$('<option value=' + data[st].ta2000_sub_firm_typ_cd + ' selected>' + data[st].ta2000_sub_firm_typ_dsc + '</option>').appendTo($('#ta2000_sub_firm_typDD')).get(0);
								} else {
									$('<option value=' + data[st].ta2000_sub_firm_typ_cd + '>' + data[st].ta2000_sub_firm_typ_dsc + '</option>').appendTo($('#ta2000_sub_firm_typDD')).get(0);
								}
							} else {
								if ($.trim(_val.toUpperCase()) == $.trim(data[st].ta2000_sub_firm_typ_cd).toUpperCase()) {
									$('<option value=' + data[st].ta2000_sub_firm_typ_cd + ' selected>' + data[st].ta2000_sub_firm_typ_dsc + '</option>').appendTo($('#ta2000_sub_firm_typDD')).get(0);
								} else {
									$('<option value=' + data[st].ta2000_sub_firm_typ_cd + '>' + data[st].ta2000_sub_firm_typ_dsc + '</option>').appendTo($('#ta2000_sub_firm_typDD')).get(0);
									/*
									 * sets the hidden fields in the ta22k view used in the firm types dialog, this assumes there are
									 * only two other types in the admin. There are two hidden fields in the ta2k view. add more if needed.
									 */
									tasf_relations[tasfr_count] = data[st].ta2000_sub_firm_typ_cd;
									$('#hidn_field_dsc' + tasfr_count).val(data[st].ta2000_sub_firm_typ_dsc);
									$('#hidn_field_cd' + tasfr_count).val(data[st].ta2000_sub_firm_typ_cd);
									tasfr_count++;									
								}
							}
						}
					}
				});
		},

		getOperationalReview : function(_val) {
			var url = 'getOperationalReview';
			$.ajax({type : "GET",
					url : url,
					dataType : "json",
					cache : false,
					success : function(data) {
	
						for ( var st = 0; st < data.length; st++) {
							if (typeof _val == 'undefined') {
								if (data[st].op_review_cd == "No") {
									$('<option value='
												+ data[st].op_review_cd
												+ ' selected>'
												+ data[st].op_review_dsc
												+ '</option>').appendTo(
										$('#op_review_cdInput')).get(0);
								} else {
									$('<option value='
											+ data[st].op_review_cd + '>'
											+ data[st].op_review_dsc
											+ '</option>').appendTo(
									$('#op_review_cdInput')).get(0);
								}
							} else {
								if ($.trim(_val.toUpperCase()) == $.trim(
										data[st].op_review_cd).toUpperCase()) {
									$('<option value='
											+ data[st].op_review_cd
											+ ' selected>'
											+ data[st].op_review_dsc
											+ '</option>').appendTo(
									$('#op_review_cdInput')).get(0);
								} else {
									$('<option value='
											+ data[st].op_review_cd + '>'
											+ data[st].op_review_dsc
											+ '</option>').appendTo(
									$('#op_review_cdInput')).get(0);
								}
							}
						}
					}
				});
		},

		getPrimaryBankStates : function(_val) {
			var url = 'getStates';
			$.ajax({type : "GET",
					url : url,
					dataType : "json",
					cache : false,
					success : function(data) {
	
						for ( var st = 0; st < data.length; st++) {
							if (typeof _val == 'undefined') {
								if (data[st].state_cd == "N/A") {
									$('<option value=' + data[st].state_cd
											+ ' selected>'
											+ data[st].state_dsc
											+ '</option>').appendTo(
									$('#prmry_bank_state_cdDD')).get(0);
								} else {
									$('<option value=' + data[st].state_cd
											+ '>' + data[st].state_dsc
											+ '</option>').appendTo(
									$('#prmry_bank_state_cdDD')).get(0);
								}
							} else {
								if ($.trim(_val.toUpperCase()) == $.trim(
										data[st].state_cd).toUpperCase()) {
									$('<option value=' + data[st].state_cd
											+ ' selected>'
											+ data[st].state_dsc
											+ '</option>').appendTo(
									$('#prmry_bank_state_cdDD')).get(0);
								} else {
									$('<option value=' + data[st].state_cd
											+ '>' + data[st].state_dsc
											+ '</option>').appendTo(
									$('#prmry_bank_state_cdDD')).get(0);
								}
							}
						}
					}
				});
		},

		getFirmTypes : function(_val) {
			var url = 'getFirmTypes';
			$.ajax({type : "GET",
					url : url,
					dataType : "json",
					cache : false,
					success : function(data) {
		
						for ( var st = 0; st < data.length; st++) {
							$('<option id=firm_typ_frm' + st + ' value='
										+ escape(data[st].firm_typ_cd) + '>'
										+ data[st].firm_typ_dsc + '</option>')
								.appendTo($('#firm_typ_frm')).get(0);
						}
		
					}
				});
		},

		getExistingFirmType : function() {
			var url = 'getExistingFirmTypes';
			$.ajax({type : "GET",
					url : url,
					dataType : "text",
					cache : false,
					success : function(data) {
	
						var s_data = data.split(',');
						var more = 0;
						var ms_options = $('#firm_typ_frm option').size();
	
						while (s_data.length > more) {
							for ( var st = 0; st < ms_options; st++) {
	
								var str = $('#firm_typ_frm' + st).val();
	
								// not sure how many %20 there could be
								while (str.search('%20') != -1) {
									str = str.replace('%20', ' ');
								}
	
								if ($.trim(str) == s_data[more]) {
									$('#firm_typ_frm' + st).attr('selected', true);
									sel_firm_type += $.trim(str) + ',';
								}
	
							}
							more++;
						}
	
						bfdsmgr.util.add('#firm_typ_frm', '#firm_typ_to');
					}
				});
		},

		getOmnibusDistMdl : function(_val) {
			var url = 'getOmnibusDistMdl';
			$.ajax({type : "GET",
					url : url,
					dataType : "json",
					cache : false,
					success : function(data) {

						for ( var st = 0; st < data.length; st++) {
							if (typeof _val == 'undefined') {
								if (data[st].omnibus_dist_mdl_cd == 'Unk') {
									$('<option value='
											+ data[st].omnibus_dist_mdl_cd
											+ ' selected>Unknown</option>')
									.appendTo($('#omnibus_dist_mdl_cdDD')).get(0);
								} else {
									$('<option value='
											+ data[st].omnibus_dist_mdl_cd
											+ '>'
											+ data[st].omnibus_dist_mdl_dsc
											+ '</option>')
									.appendTo($('#omnibus_dist_mdl_cdDD')).get(0);
								}
							} else {
								if ($.trim(_val.toUpperCase()) == $.trim(data[st].omnibus_dist_mdl_cd).toUpperCase()) {
									$('<option value='
											+ data[st].omnibus_dist_mdl_cd
											+ ' selected>'
											+ data[st].omnibus_dist_mdl_dsc
											+ '</option>')
									.appendTo($('#omnibus_dist_mdl_cdDD')).get(0);
								} else {
									$('<option value='
											+ data[st].omnibus_dist_mdl_cd
											+ '>'
											+ data[st].omnibus_dist_mdl_dsc
											+ '</option>')
									.appendTo($('#omnibus_dist_mdl_cdDD')).get(0);
								}
							}
						}
					}
				});

		},

		// from Utility mapper
		getBatchType : function(_val) {
			var url = 'getBatchType';
			$.ajax({type : "GET",
					url : url,
					dataType : "json",
					cache : false,
					success : function(data) {
		
						for ( var mco = 0; mco < data.length; mco++) {
							if (typeof _val == 'undefined') {
								if (data[mco].batch_typ_cd == 'Unk') {
									$('<option value='
												+ data[mco].batch_typ_cd
												+ ' selected>Unknown</option>')
										.appendTo($('#batch_typ_cdDD')).get(0);
								} else {
									$('<option value='
											+ data[mco].batch_typ_cd + '>'
											+ data[mco].batch_typ_dsc
											+ '</option>').appendTo(
									$('#batch_typ_cdDD')).get(0);
								}
							} else {
								if ($.trim(_val.toUpperCase()) == $.trim(
										data[mco].batch_typ_cd).toUpperCase()) {
									$('<option value='
											+ data[mco].batch_typ_cd
											+ ' selected>'
											+ data[mco].batch_typ_dsc
											+ '</option>').appendTo(
									$('#batch_typ_cdDD')).get(0);
								} else {
									$('<option value='
											+ data[mco].batch_typ_cd + '>'
											+ data[mco].batch_typ_dsc
											+ '</option>').appendTo(
									$('#batch_typ_cdDD')).get(0);
								}
							}
						}
					}
				});
		},

		/*
		 * Set the selected Firm name in the xref page
		 */
		getSystemName : function(_val) {
			var url = 'getSystemName';
			$.ajax({type : "GET",
					url : url,
					dataType : "json",
					cache : false,
					success : function(data) {
		
						$('#systemInput').val(data.long_nm);
		
					}
				});
		},

		/*
		 * Set the Company name in the xref page
		 */
		getCompanyName : function(_val) {
			var url = 'getCompanyName';
			$.ajax({type : "GET",
					url : url,
					dataType : "json",
					cache : false,
					success : function(data) {
	
						$('#companyInput').val(data.mgmt_co_short_nm);
	
					}
				});
		},

		getOmnibusTradProc : function(_val) {
			var url = 'getOmnibusTradProc';
			$.ajax({type : "GET",
					url : url,
					dataType : "json",
					cache : false,
					success : function(data) {
	
						// make the user select a state
						for ( var st = 0; st < data.length; st++) {
							$('<option id=omnibus_trad_proc_cd_frm' + st
									+ ' value='
									+ data[st].omnibus_trad_proc_cd + '>'
									+ data[st].omnibus_trad_proc_dsc
									+ '</option>').appendTo(
							$('#omnibus_trad_proc_cd_frm')).get(0);
						}
					}
				});
		},

		getExistingOmnibusTradProc : function() {
			var url = 'getExistingOmnibusTradProc';
			$.ajax({type : "GET",
					url : url,
					dataType : "text",
					cache : false,
					success : function(data) {

						var s_data = data.split(',');
						var more = 0;
						var ms_options = $(
								'#omnibus_trad_proc_cd_frm option').size();

						while (s_data.length > more) {
							for ( var st = 0; st < ms_options; st++) {

								var str = $('#omnibus_trad_proc_cd_frm' + st).val();

								// not sure how many %20 there could be
								while (str.search('%20') != -1) {
									str = str.replace('%20', ' ');
								}

								if ($.trim(str) == s_data[more]) {
									$('#omnibus_trad_proc_cd_frm' + st).attr('selected', true);
									sel_omnibus_trad_proc += $.trim(str) + ',';
								}

							}
							more++;
						}

						bfdsmgr.util.add('#omnibus_trad_proc_cd_frm',
								'#omnibus_trad_proc_cd_to');
					}
				});
		},

		getTASettlementType : function(_val) {
			var url = 'getSettlementType';
			$.ajax({type : "GET",
					url : url,
					dataType : "json",
					cache : false,
					success : function(data) {
	
						for ( var st = 0; st < data.length; st++) {
							if (typeof _val == 'undefined') {
								if ($.trim(data[st].settlement_typ_cd).toUpperCase() == 'N/A') {
									$('<option value='
											+ data[st].settlement_typ_cd
											+ ' selected>'
											+ data[st].settlement_typ_dsc
											+ '</option>').appendTo(
									$('#settlement_typ_cdDD')).get(0);
								} else {
									$('<option value='
											+ data[st].settlement_typ_cd
											+ '>'
											+ data[st].settlement_typ_dsc
											+ '</option>').appendTo(
									$('#settlement_typ_cdDD')).get(0);
								}
							} else {
								if ($.trim(_val.toUpperCase()) == $.trim(data[st].settlement_typ_cd).toUpperCase()) {
									$('<option value='
											+ data[st].settlement_typ_cd
											+ ' selected>'
											+ data[st].settlement_typ_dsc
											+ '</option>').appendTo(
									$('#settlement_typ_cdDD')).get(0);
								} else {
									$('<option value='
											+ data[st].settlement_typ_cd
											+ '>'
											+ data[st].settlement_typ_dsc
											+ '</option>').appendTo(
									$('#settlement_typ_cdDD')).get(0);
								}
							}
						}
	
					}
				});
		},

		getSettlementType : function(_val) {
			var url = 'getSettlementType';
			$.ajax({type : "GET",
					url : url,
					dataType : "json",
					cache : false,
					success : function(data) {
	
						for ( var st = 0; st < data.length; st++) {
							$('<option id=settlement_typ_cd_frm' + st
									+ ' value='
									+ data[st].settlement_typ_cd + '>'
									+ data[st].settlement_typ_dsc
									+ '</option>').appendTo(
							$('#settlement_typ_cd_frm')).get(0);
						}
					}
				});
		},

		getExistingSettlementType : function() {
			var url = 'getExistingSettlementType';
			$.ajax({type : "GET",
					url : url,
					dataType : "text",
					cache : false,
					success : function(data) {
	
						var s_data = data.split(',');
						var more = 0;
						var ms_options = $('#settlement_typ_cd_frm option').size();
	
						while (s_data.length > more) {
							for ( var st = 0; st < ms_options; st++) {
	
								var str = $('#settlement_typ_cd_frm' + st).val();
	
								// not sure how many %20 there could be
								while (str.search('%20') != -1) {
									str = str.replace('%20', ' ');
								}
	
								if ($.trim(str) == s_data[more]) {
									$('#settlement_typ_cd_frm' + st).attr('selected', true);
									sel_settlement_typ += $.trim(str) + ',';
								}
	
							}
							more++;
						}
	
						bfdsmgr.util.add('#settlement_typ_cd_frm',
								'#settlement_typ_cd_to');
					}
				});
		},

		getPricingSource : function(_val) {
			var url = 'getPricingSource';
			$.ajax({type : "GET",
					url : url,
					dataType : "json",
					cache : false,
					success : function(data) {
	
						for ( var st = 0; st < data.length; st++) {
							$('<option id=pricing_soutce_frm' + st
									+ ' value=' + data[st].pricing_src_cd
									+ '>' + data[st].pricing_src_dsc
									+ '</option>').appendTo(
							$('#pricing_source_frm')).get(0);
						}
					}
				});
		},

		getExistingPricingSource : function() {
			var url = 'getExistingPricingSource';
			$.ajax({type : "GET",
					url : url,
					dataType : "text",
					cache : false,
					success : function(data) {
	
						var s_data = data.split(',');
						var more = 0;
						var ms_options = $('#pricing_soutce_frm option').size();
	
						while (s_data.length > more) {
							for ( var st = 0; st < ms_options; st++) {
	
								var str = $('#pricing_soutce_frm' + st).val();
	
								// not sure how many %20 there could be
								while (str.search('%20') != -1) {
									str = str.replace('%20', ' ');
								}
	
								if ($.trim(str) == s_data[more]) {
									$('#pricing_soutce_frm' + st).attr('selected',true);
									sel_pricing_source += $.trim(str) + ',';
								}
	
							}
							more++;
						}
	
						bfdsmgr.util.add('#pricing_soutce_frm',
								'#pricing_soutce_to');
					}
				});
		},

		getDataTransMthd : function(_val) {
			var url = 'getDataTransMthd';
			$.ajax({type : "GET",
					url : url,
					dataType : "json",
					cache : false,
					success : function(data) {
	
						// make the user select one
						for ( var st = 0; st < data.length; st++) {
							$('<option value=' + data[st].data_trans_mthd_cd
									+ '>' + data[st].data_trans_mthd_dsc
									+ '</option>').appendTo(
							$('#data_trans_mthd_cd_frm')).get(0);
						}
					}
				});

		},

		getExistingDataTransMthd : function() {
			var url = 'getExistingDataTransMthd';
			$.ajax({type : "GET",
					url : url,
					dataType : "text",
					cache : false,
					success : function(data) {

						var s_data = data.split(',');
						var more = 0;
						var ms_options = $('#data_trans_mthd_cd_frm option')
								.size();

						while (s_data.length > more) {
							for ( var st = 0; st < ms_options; st++) {

								var str = $('#data_trans_mthd_cd_frm' + st).val();

								// not sure how many %20 there could be
								while (str.search('%20') != -1) {
									str = str.replace('%20', ' ');
								}

								if ($.trim(str) == s_data[more]) {
									$('#data_trans_mthd_cd_frm' + st).attr('selected', true);
									sel_data_trans_mthd += $.trim(str) + ',';
								}

							}
							more++;
						}

						bfdsmgr.util.add('#data_trans_mthd_cd_frm', '#data_trans_mthd_cd_to');
					}
				});
		},

		getTAShareHldrSvcMdl : function(_val) {
			var url = 'getShareHldrSvcMdl';
			$.ajax({type : "GET",
					url : url,
					dataType : "json",
					cache : false,
					success : function(data) {

						for ( var st = 0; st < data.length; st++) {
							if (typeof _val == 'undefined') {
								if ($.trim(data[st].shrhldr_svc_mdl_cd).toUpperCase() == 'N/A') {
									$('<option value='
												+ data[st].shrhldr_svc_mdl_cd
												+ ' selected>'
												+ data[st].shrhldr_svc_mdl_dsc
												+ '</option>')
										.appendTo($('#shrhldr_svc_mdl_cdDD')).get(0);
								} else {
									$('<option value='
											+ data[st].shrhldr_svc_mdl_cd
											+ '>'
											+ data[st].shrhldr_svc_mdl_dsc
											+ '</option>')
									.appendTo($('#shrhldr_svc_mdl_cdDD')).get(0);
								}
							} else {
								if ($.trim(_val.toUpperCase()) == $.trim(data[st].shrhldr_svc_mdl_cd).toUpperCase()) {
									$('<option value='
													+ data[st].shrhldr_svc_mdl_cd
													+ ' selected>'
													+ data[st].shrhldr_svc_mdl_dsc
													+ '</option>')
											.appendTo($('#shrhldr_svc_mdl_cdDD')).get(0);
								} else {
									$('<option value='
											+ data[st].shrhldr_svc_mdl_cd
											+ '>'
											+ data[st].shrhldr_svc_mdl_dsc
											+ '</option>')
									.appendTo($('#shrhldr_svc_mdl_cdDD')).get(0);
								}
							}
						}
					}
				});
		},

		getShareHldrSvcMdl : function(_val) {
			var url = 'getShareHldrSvcMdl';
			$.ajax({type : "GET",
					url : url,
					dataType : "json",
					cache : false,
					success : function(data) {
	
						for ( var st = 0; st < data.length; st++) {
							$('<option id=shrhldr_svc_mdl_frm' + st
									+ ' value='
									+ data[st].shrhldr_svc_mdl_cd + '>'
									+ data[st].shrhldr_svc_mdl_dsc
									+ '</option>').appendTo(
							$('#shrhldr_svc_mdl_frm')).get(0);
						}
					}
				});
		},

		getExistingShareHldrSvcMdl : function() {
			var url = 'getExistingShareHldrSvcMdl';
			$.ajax({type : "GET",
					url : url,
					dataType : "text",
					cache : false,
					success : function(data) {
	
						var s_data = data.split(',');
						var more = 0;
						var ms_options = $('#shrhldr_svc_mdl_frm option').size();
	
						while (s_data.length > more) {
							for ( var st = 0; st < ms_options; st++) {
	
								var str = $('#shrhldr_svc_mdl_frm' + st).val();
	
								// not sure how many %20 there could be
								while (str.search('%20') != -1) {
									str = str.replace('%20', ' ');
								}
	
								if ($.trim(str) == s_data[more]) {
									$('#shrhldr_svc_mdl_frm' + st).attr('selected',true);
									sel_shrhldr_svc_mdl += $.trim(str) + ',';
								}
	
							}
							more++;
						}
	
						bfdsmgr.util.add('#shrhldr_svc_mdl_frm','#shrhldr_svc_mdl_to');
					}
				});
		},

		getSubacctPltfrmCD : function(_val) {
			var url = 'getSubacctPltfrmCD';
			$.ajax({type : "GET",
					url : url,
					dataType : "json",
					cache : false,
					success : function(data) {
	
						for ( var st = 0; st < data.length; st++) {
							$('<option id=subacct_pltfrm_frm' + st
									+ ' value='
									+ data[st].subacct_pltfrm_cd + '>'
									+ data[st].subacct_pltfrm_cd
									+ '</option>').appendTo(
							$('#subacct_pltfrm_frm')).get(0);
						}
					}
				});
		},

		getExistingSubacctPltfrmCD : function() {
			var url = 'getExistingSubacctPltfrmCD';
			$.ajax({type : "GET",
					url : url,
					dataType : "text",
					cache : false,
					success : function(data) {
	
						var s_data = data.split(',');
						var more = 0;
						var ms_options = $('#subacct_pltfrm_frm option').size();
	
						while (s_data.length > more) {
							for ( var st = 0; st < ms_options; st++) {
	
								var str = $('#subacct_pltfrm_frm' + st).val();
	
								// not sure how many %20 there could be
								while (str.search('%20') != -1) {
									str = str.replace('%20', ' ');
								}
	
								if ($.trim(str) == s_data[more]) {
									$('#subacct_pltfrm_frm' + st).attr('selected',true);
									sel_subacct_pltfrm += $.trim(str) + ',';
								}
	
							}
							more++;
						}
	
						bfdsmgr.util.add('#subacct_pltfrm_frm','#subacct_pltfrm_to');
					}
				});
		},

		getNetworkMatrixLevel : function(_val) {
			var url = 'getNetworkMatrixLevel';
			$.ajax({type : "GET",
					url : url,
					dataType : "json",
					cache : false,
					success : function(data) {
	
						for ( var st = 0; st < data.length; st++) {
							if (typeof _val == 'undefined') {
								if ('N/A' == $.trim(data[st].ntwrk_mtrx_lvl_id).toUpperCase()) {
									$('<option value='
												+ data[st].ntwrk_mtrx_lvl_id
												+ ' selected>'
												+ data[st].ntwrk_mtrx_lvl_dsc
												+ '</option>').appendTo(
										$('#ntwrk_mtrx_lvl_idDD')).get(0);
								} else {
									$('<option value='
											+ data[st].ntwrk_mtrx_lvl_id
											+ '>'
											+ data[st].ntwrk_mtrx_lvl_dsc
											+ '</option>').appendTo(
									$('#ntwrk_mtrx_lvl_idDD')).get(0);
								}
							} else {
								if ($.trim(_val.toUpperCase()) == $.trim(
										data[st].ntwrk_mtrx_lvl_id).toUpperCase()) {
									$('<option value='
											+ data[st].ntwrk_mtrx_lvl_id
											+ ' selected>'
											+ data[st].ntwrk_mtrx_lvl_dsc
											+ '</option>').appendTo(
									$('#ntwrk_mtrx_lvl_idDD')).get(0);
								} else {
									$('<option value='
											+ data[st].ntwrk_mtrx_lvl_id
											+ '>'
											+ data[st].ntwrk_mtrx_lvl_dsc
											+ '</option>').appendTo(
									$('#ntwrk_mtrx_lvl_idDD')).get(0);
								}
							}
						}
					}
				});
		},

		getBrokeragePlatform : function(_val) {
			var url = 'getBrokeragePlatform';
			$.ajax({type : "GET",
					url : url,
					dataType : "json",
					cache : false,
					success : function(data) {
	
						// make the user select one
						for ( var st = 0; st < data.length; st++) {
							$('<option id=brkrg_pltfrm_frm' + st + ' value='
									+ data[st].brkrg_pltfrm_cd + '>'
									+ data[st].brkrg_pltfrm_dsc
									+ '</option>').appendTo(
							$('#brkrg_pltfrm_frm')).get(0);
						}
					}
				});
		},

		getExistingBrokeragePlatform : function() {
			var url = 'getExistingBrokeragePlatform';
			$.ajax({type : "GET",
					url : url,
					dataType : "text",
					cache : false,
					success : function(data) {
	
						var s_data = data.split(',');
						var more = 0;
						var ms_options = $('#brkrg_pltfrm_frm option').size();
	
						while (s_data.length > more) {
							for ( var st = 0; st < ms_options; st++) {
	
								var str = $('#brkrg_pltfrm_frm' + st).val();
	
								// not sure how many %20 there could be
								while (str.search('%20') != -1) {
									str = str.replace('%20', ' ');
								}
	
								if ($.trim(str) == s_data[more]) {
									$('#brkrg_pltfrm_frm' + st).attr('selected',true);
									sel_brkrg_pltfrm += $.trim(str) + ',';
								}
	
							}
							more++;
						}
	
						bfdsmgr.util.add('#brkrg_pltfrm_frm', '#brkrg_pltfrm_to');
					}
				});
		},

		getNsccMemberNum : function(_val) {
			var url = 'getNsccMemberNum';
			$.ajax({type : "GET",
					url : url,
					dataType : "text",
					cache : false,
					success : function(data) {
	
						var str_nna = data.split(',');
						for ( var rt = 1; rt <= str_nna.length; rt++) {
							$('#nscc_num_' + rt).val(str_nna[rt]);
							sel_nscc_num += str_nna[rt] + ',';
						}
					}
				});

		},

		getNsccNetworkAlpha : function(_val) {
			var url = 'getNsccNetworkAlpha';
			$.ajax({type : "GET",
					url : url,
					dataType : "text",
					cache : false,
					success : function(data) {
	
						var str_nna = data.split(',');
						for ( var rt = 1; rt <= str_nna.length; rt++) {
							$('#nscc_alpha_' + rt).val(str_nna[rt]);
							sel_nscc_alpha += str_nna[rt] + ',';
						}
					}
				});

		},

		getPosFileSched : function(_val) {
			var url = 'getPosFileSched';
			$.ajax({type : "GET",
					url : url,
					dataType : "json",
					cache : false,
					success : function(data) {

						for ( var mco = 0; mco < data.length; mco++) {
							if (typeof _val == 'undefined') {
								if (data[mco].pos_file_sched_cd == 'N/A') {
									$('<option value='
											+ data[mco].pos_file_sched_cd
											+ ' selected>'
											+ data[mco].pos_file_sched_dsc
											+ '</option>')
									.appendTo($('#pos_file_sched_cdDD')).get(0);
								} else {
									$('<option value='
											+ data[mco].pos_file_sched_cd
											+ '>'
											+ data[mco].pos_file_sched_dsc
											+ '</option>')
									.appendTo($('#pos_file_sched_cdDD')).get(0);
								}
							} else {
								if ($.trim(_val.toUpperCase()) == $.trim(data[mco].pos_file_sched_cd).toUpperCase()) {
									$('<option value='
											+ data[mco].pos_file_sched_cd
											+ ' selected>'
											+ data[mco].pos_file_sched_dsc
											+ '</option>')
									.appendTo($('#pos_file_sched_cdDD')).get(0);
								} else {
									$('<option value='
											+ data[mco].pos_file_sched_cd
											+ '>'
											+ data[mco].pos_file_sched_dsc
											+ '</option>')
									.appendTo($('#pos_file_sched_cdDD')).get(0);
								}
							}
						}
					}
				});
		},

        getPostSettlementChngInd: function(_val){
        	for(var st=0; st < 4; st++){
        		if($.trim(_val.toUpperCase()) == $.trim($('#post_settlement_chng_ind' + st).val()).toUpperCase()){
            		$('#post_settlement_chng_ind' + st).attr('selected', true);
        		}else{
            		$('#post_settlement_chng_ind' + st).attr('selected', false);
        		}
        	}                	            
        },
        
        getActiveInd: function(_val){
        	for(var st=0; st < 4; st++){
        		if($.trim(_val.toUpperCase()) == $.trim($('#active_ind' + st).val()).toUpperCase()){
            		$('#active_ind' + st).attr('selected', true);
        		}else{
            		$('#active_ind' + st).attr('selected', false);
        		}
        	}                	            
        },
        
        getPtfACATTrnsfInd: function(_val){
        	for(var st=0; st < 4; st++){
        		if($.trim(_val.toUpperCase()) == $.trim($('#ptf_acat_trnsfr_ind' + st).val()).toUpperCase()){
            		$('#ptf_acat_trnsfr_ind' + st).attr('selected', true);
        		}else{
            		$('#ptf_acat_trnsfr_ind' + st).attr('selected', false);
        		}
        	}                	            
        },
        
		set_pfLngNm: function(value){
			_pfLngNm = value;
		},
		
		get_pfLngNm: function(){
			return _pfLngNm;
		},

		set_mgmtCo: function(value){
			_mgmtCo = value;
		},
		
		get_mgmtCo: function(){
			return _mgmtCo;
		},
		
		set_ta2kSubFirmNm: function(value){
			_ta2kSubFirmNm = value;
		},
		
		get_ta2kSubFirmNm: function(){
			return _ta2kSubFirmNm;
		},
		
		set_ta2kSubFirmDlrNum: function(value){
			_ta2kSubFirmDlrNum = value;
		},
		
		get_ta2kSubFirmDlrNum: function(){
			return _ta2kSubFirmDlrNum;
		},
		
		set_ta2kSubFirmNsccMbrNum: function(value){
			_ta2kSubFirmNsccMbrNum = value;
		},
		
		get_ta2kSubFirmNsccMbrNum: function(){
			return _ta2kSubFirmNsccMbrNum;
		},
				
		setSearchName : function(_pfLngNm, 
				  				 _mgmtCo, 
								 _ta2kSubFirmNm, 
								 _ta2kSubFirmDlrNum, 
								 _ta2kSubFirmNsccMbrNum) {
			bfdsmgr.tasf.set_pfLngNm(_pfLngNm);
			bfdsmgr.tasf.set_mgmtCo(_mgmtCo);
			bfdsmgr.tasf.set_ta2kSubFirmNm(_ta2kSubFirmNm);
			bfdsmgr.tasf.set_ta2kSubFirmDlrNum(_ta2kSubFirmDlrNum);
			bfdsmgr.tasf.set_ta2kSubFirmNsccMbrNum(_ta2kSubFirmNsccMbrNum);
		},

		searchFirmFail : function(data) {
			$('#successMessage').html("Fail! This Firm was not found");
			$('#success').removeClass('bfdsHidden');
		},

		/*
		 * For this setRowEdit the firm and mgmt_co ids are just to get the Parent Firm and MGMT_CO
		 * names. Their not editable on the TA2K edit page. The _tasf_id does get the TA2K Sub Firm
		 * data which is editable.   
		 */
		setRowToEdit : function(data) {
			if (navigator.appName == 'Netscape') {
				_tasf_id = escape(data.cells[_tasf_id_idx].childNodes[0].wholeText);
				_firm_id = escape(data.cells[_firm_id_idx].childNodes[0].wholeText);
				_mgmt_co_id = escape(data.cells[_mgmt_co_id_idx].childNodes[0].wholeText);
				_ta2000_firm_nm = data.cells[_ta2000_firm_nm_idx].childNodes[0].wholeText;				
				_sel_ta2k_firm_type = data.cells[_ta2000_sub_firm_typ_cd_idx].childNodes[0].wholeText;
			} else {
				_tasf_id = escape(data.cells[_tasf_id_idx].innerHTML);
				_firm_id = escape(data.cells[_firm_id_idx].innerHTML);
				_mgmt_co_id = escape(data.cells[_mgmt_co_id_idx].innerHTML);
				_ta2000_firm_nm = data.cells[_ta2000_firm_nm_idx].innerHTML;
				_sel_ta2k_firm_type = data.cells[_ta2000_sub_firm_typ_cd_idx].innerHTML;				
			}

			/*
			 * Need to get the types here due to a timing issue, with the dialog, it opens before
			 * getting the types and storing them in hidden fields of the ta2k view.
			 */
			bfdsmgr.tasf.getTA2000SubFirmType(_sel_ta2k_firm_type);						
			
			/*
			 * This will pre-load the selects of the ta2k sub firm rel every time a row is clicked
			 * in the sub firm view due to the fact this is the best place to pre-load the dialog.
			 * A call from within the fuction that loads the dialog is async and the dialog displays
			 * with out the data.
			 */
			// some ajax to get the available firm types
			
			var newFirm = {
				tasf_id : _tasf_id,
				firm_id : _firm_id,
				mgmt_co_id : _mgmt_co_id
			};
			$.post('setTASubFirmRowToEdit',
					bfdsmgr.util.flattenObject(newFirm), 
					function(data) {

						if (!data.true_false) {
							bfdsmgr.tasf.searchFirmFail(data);
						}

					}, 'json');

			$('tr').removeClass('gridRowHighlight');
			data.className = "gridRowHighlight";
			$('#edit_firms', top.document).attr('disabled', false);
		},

		firm_typ_cdExpand : function() {
			$('#firm_typ_cdDD').attr('size', 5);
		},

		firm_typ_cdColapse : function() {
			$('#firm_typ_cdDD').attr('size', 1);
		},

		subacct_pltfrm_cdExpand : function() {
			$('#subacct_pltfrm_cdDD').attr('size', 4);
		},

		subacct_pltfrm_cdColapse : function() {
			$('#subacct_pltfrm_cdDD').attr('size', 1);
		},

		isNsccNumNA : function(value) {
			var message = 'You have entered N/A for this Nscc Number field. N/A will be entered for\n';
			message += 'a single Number/Alpha record any other numbers will be ignored.\n';
			message += 'This will not you from submiting Parent Firm.';

			if ($(value).val().toUpperCase() == 'N/A') {
				confirm(message);
			}
		},

		/*
		 * validate the add and edit firn & mgmt co page
		 * 
		 * Have to take another look at the Agreement approach Taking this
		 * approach to illimate the need to set some event handler in the field
		 * it self The field validation occurs before the confirm submit
		 */
		validateNwFrmNdMgmtCXrf : function() {
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

			isgroup = this.group();
			isActiveInd = this.active_ind();
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
			 * Set the error message for the individual fields then display a
			 * message for all that are in error at once.
			 */
			if (!isgroup) {
				errorMsg += '<li>The Group field is invalid, a group is required.</li>';
				errSet = true;
			}

			if (!isActiveInd) {
				errorMsg += '<li>The Active Indicator field is invalid, correct values are YES, NO, UNK or an empty field.</li>';
				errSet = true;
			}

			if (!isFanMailInd) {
				errorMsg += '<li>The Fan Mail Indicator field is invalid, correct values are YES, NO, N/A or an empty field.</li>';
				errSet = true;
			}

			if (!isOmniservInd) {
				errorMsg += '<li>The Omniserv Indicator field is invalid, correct values are YES, NO, N/A or an empty field.</li>';
				errSet = true;
			}

			if (!isPstSttlmntChngInd) {
				errorMsg += '<li>The Post Settlement Change Indicator field is invalid, correct values are YES, NO, N/A or an empty field.</li>';
				errSet = true;
			}

			if (!isVisionInd) {
				errorMsg += '<li>The Vision Indicator field is invalid, correct values are YES, NO, N/A or an empty field.</li>';
				errSet = true;
			}

			if (!isptf_acat_trnsfr_ind) {
				errorMsg += '<li>The PTF ACAT Trnsfr Indicator field is invalid, correct values are YES, NO, N/A or an empty field.</li>';
				errSet = true;
			}

			if (!isdst_vho_ind) {
				errorMsg += '<li>The DST VHO Indicator field is invalid, correct values are YES, NO, N/A or an empty field.</li>';
				errSet = true;
			}

			if (!isdealer_num) {
				errorMsg += '<li>The Dealer Number field is invalid, Numeric values are required.</li>';
				errSet = true;
			}
			/*
			 * The user may not know the value a blank is ok otherwise a digit
			 */
			if (!isasof_trad_window) {
				errorMsg += '<li>The AS OF TRAD WINDOW field is invalid, Numeric values are required.</li>';
				errSet = true;
			}
			if (!isomnibus_trad_proc_cdDD) {
				errorMsg += '<li>No Omnibus Trade procedure selected, a selection is required.</li>';
				errSet = true;
			}

			if (!isbatch_typ_cdDD) {
				errorMsg += '<li>No Batch type selected, a selection is required.</li>';
				errSet = true;
			}

			if (!issettlement_typ_cdDD) {
				errorMsg += '<li>No Settlement type selected, a selection is required.</li>';
				errSet = true;
			}

			errorMsg += '</ul></div>';
			/*
			 * This will help if I need to display the message in a dialog as
			 * opposed a block under the input fields
			 */
			if (errSet) {
				$('#successMessage').html(errorMsg);
				$('#success').removeClass('bfdsHidden');
				return false;
			}
			return true;
		},

		validateFields : function() {

			var isTA2000DealerNum;
			var isTA2000SubFirmTypCd;
			var isTA2000FirmNm;
			var isTA2000FirmAddress1;
			var isTA2000FirmCity;
			var isTA2000FirmStateCd;
			var isTA2000FirmZip;
			var isActiveInd;

			var errSet = false;

			errorMsg = '<div style="text-align:left"><ul>';

			isTA2000DealerNum = this.dealer_num();
			isTA2000SubFirmTypCd = this.sub_firm_typ_cd();
			isTA2000FirmNm = this.firm_nm();
			isTA2000FirmAddress1 = this.firm_address_1();
			isTA2000FirmCity = this.firm_city();
			isTA2000FirmStateCd = this.firm_state_cd();
			isTA2000FirmZip = this.firm_zip();
			isActiveInd = this.active_ind();

			if (!isTA2000DealerNum) {
				errorMsg += '<li>A Dealer Number was not entered, a dealer Number is required.</li>';
				errSet = true;
			}

			if (!isTA2000SubFirmTypCd) {
				errorMsg += '<li>The Firm Type is invalid, a valid selection is required.</li>';
				errSet = true;
			}

			if (!isTA2000FirmNm) {
				errorMsg += '<li>A Firm Name was not entered, a firm name is required.</li>';
				errSet = true;
			}

			if (!isTA2000FirmAddress1) {
				errorMsg += '<li>A Firm Address 1 was not entered, a firm address 1 is required.</li>';
				errSet = true;
			}

			if (!isTA2000FirmCity) {
				errorMsg += '<li>A Firm City was not entered, a firm city is required.</li>';
				errSet = true;
			}

			if (!isTA2000FirmStateCd) {
				errorMsg += '<li>The Firm State is invalid, a valid selection is required.</li>';
				errSet = true;
			}

			if (!isTA2000FirmZip) {
				errorMsg += '<li>The Firm Zip is invalid, a firm zip is required.</li>';
				errSet = true;
			}

			if (!isActiveInd) {
				errorMsg += '<li>The Active Indicator is invalid, a selection is required.</li>';
				errSet = true;
			}

			errorMsg += '</ul></div>';
			/*
			 * This will help if I need to display the message in a dialog as
			 * opposed a block under the input fields
			 */
			if (errSet) {
				$('#successMessage').html(errorMsg);
				$('#success').removeClass('bfdsHidden');
				return false;
			}

			return true;
		},// end validateFields

		firm_nm : function() {
			// the long name shouldn't be blank
			var lngnn = $.trim($('#ta2000_firm_nmInput').val());
			return lngnn.length > 0;
		},

		short_nm : function() {
			return $('#short_nmInput').val().length != 0;
		},

		firm_address_1 : function() {
			return $('#ta2000_firm_address1Input').val().length != 0;
		},

		firm_city : function() {
			return $('#ta2000_firm_cityInput').val().length != 0;
		},

		// firm_state_cd make sure a selection has been made
		firm_state_cd : function() {
			// some day this will get right
			// -1 indicating not found
			if ($('#ta2000_firm_state_cdDD').val().length > 0) {
				$('#ta2000_firm_state_cdDD').css('border-color', '');
				return true;
			} else {
				// flag the field
				// $('#firm_state_cdDD').css('border-color', 'red');
				return false;
			}
		},

		firm_zip : function() {
			return $('#ta2000_firm_zipInput').val().length != 0;
		},

		group : function() {
			var str = $('#groupInput').val();
			return str.length > 0;
		},

		active_ind : function() {
			return bfdsmgr.util.isYesNoUNK($('#active_indInput').val());
		},

		fan_mail_ind : function() {
			return bfdsmgr.util.isYesNo($('#fan_mail_indDD').val());
		},

		omniserv_ind : function() {
			return bfdsmgr.util.isYesNo($('#omniserv_indDD').val());
		},

		pst_sttlmnt_chng_ind : function() {
			return bfdsmgr.util.isYesNo($('#post_settlement_chng_indInput')
					.val());
		},

		vision_ind : function() {
			return bfdsmgr.util.isYesNo($('#vision_indDD').val());
		},

		ptf_acat_trnsfr_ind : function() {
			return bfdsmgr.util.isYesNo($('#ptf_acat_trnsfr_indInput').val());
		},

		dst_vho_ind : function() {
			return bfdsmgr.util.isYesNo($('#dst_vho_indDD').val());
		},

		dealer_num : function() {
			if (bfdsmgr.util.isBlank($('#ta2000_dealr_numInput').val())) {
				return false;
			}
			return true;
		},

		asof_trad_window : function() {
			if (bfdsmgr.util.isBlank($('#asof_trad_windowInput').val())) {
				return true;
			}
			if (bfdsmgr.util.isDigit($('#asof_trad_windowInput').val())) {
				return true;
			}
			return false;
		},

		op_review_date : function() {
			if ($('#op_review_cdInput').val() == 'Yes') {
				if ($('#op_review_dtInput').val().length > 0) {
					return true;
				} else {
					return false;
				}
			}
			return true;
		},

		enableOpRevDt : function() {
			if ($('#op_review_cdInput').val() == 'Yes') {
				$('#op_review_dtInput').attr('disabled', false);
			} else {
				$('#op_review_dtInput').attr('disabled', true);
			}
		},

		// sub_firm_typ_cd make sure a selection has been made
		sub_firm_typ_cd : function() {
			if ($('#ta2000_sub_firm_typDD').val().length > 0) {
				return true;
			} else {
				return false;
			}
		},

		firm_tax_id : function() {
			var value = $('#firm_tax_idInput').val();

			if (value.search("-") == -1) {
				return false;
			}

			var SplitValue = value.split("-");

			if (SplitValue[0].length != 2) {
				return false;
			}

			if (SplitValue[1].length != 7) {
				return false;
			}

			if (!(bfdsmgr.util.isDigit(SplitValue[0]))) {
				return false;
			}
			if (!(bfdsmgr.util.isDigit(SplitValue[1]))) {
				return false;
			}

			return true;
		},

		// prmry_bank_state_cd make sure a selection has been made
		prmry_bank_state_cd : function() {
			// some day this will get right
			// -1 indicating not found
			if ($('#prmry_bank_state_cdDD').val().length > 0) {
				$('#prmry_bank_state_cdDD').css('border-color', '');
				return true;
			} else {
				// flag the field
				// $('#prmry_bank_state_cdDD').css('border-color', 'red');
				return false;
			}
		},

		// subacct_pltfrm_cd make sure a selection has been made
		subacct_pltfrm_cd : function() {
			// some day this will get right
			// -1 indicating not found
			if ($('#subacct_pltfrm_cdDD').val().length > 0) {
				$('#subacct_pltfrm_cdDD').css('border-color', '');
				return true;
			} else {
				// flag the field
				// $('#subacct_pltfrm_cdDD').css('border-color', 'red');
				return false;
			}
		},

		// clrng_frm_ind
		clrng_frm_ind : function() {
			if (bfdsmgr.util.isYesNo($('#clrng_frm_indInput').val())) {
				return true;
			} else {
				return false;
			}
		},

		// sae16_ind
		sae16_ind : function() {
			if (bfdsmgr.util.isYesNo_NoBlank($('#sae16_indDD').val())) {
				$('#sae16_indDD').css('border-color', '');
				return true;
			} else {
				// flag the field
				// $('#sae16_indDD').css('border-color', 'red');
				return false;
			}
		},

		// industry_attestation_ind
		industry_attestation_ind : function() {
			if (bfdsmgr.util.isYesNo_NoBlank($('#industry_attestation_indDD')
					.val())) {
				$('#industry_attestation_indDD').css('border-color', '');
				return true;
			} else {
				// flag the field
				// $('#industry_attestation_indDD').css('border-color', 'red');
				return false;
			}
		},

		// mf_profile_II_ind ‘YES’,’NO,’PARTIAL’,’N/A’
		mf_profile_II_ind : function() {
			if (bfdsmgr.util
					.isYesNo_NoBlank($('#mf_profile_II_indInput').val())) {
				$('#mf_profile_II_indInput').css('border-color', '');
				return true;
			} else {
				// flag the field
				// $('#mf_profile_II_indInput').css('border-color', 'red');
				return false;
			}
		},

		// firm_exit_indInput
		firm_exit_indInput : function() {
			if (bfdsmgr.util.isYesNo($('#firm_exit_indInput').val())) {
				$('#firm_exit_indInput').css('border-color', '');
				return true;
			} else {
				// flag the field
				// $('#firm_exit_indInput').css('border-color', 'red');
				return false;
			}
		},

		// commserv_ind
		commserv_ind : function() {
			if (bfdsmgr.util.isYesNo_NoBlank($('#commserv_indDD').val())) {
				$('#commserv_indDD').css('border-color', '');
				return true;
			} else {
				// flag the field
				// $('#commserv_indDD').css('border-color', 'red');
				return false;
			}
		},

		// site_inspection_dt
		site_inspection_dt : function() {
			if (bfdsmgr.util.isDate($('#site_inspection_dtInput').val())) {
				$('#site_inspection_dtInput').css('border-color', '');
				return true;
			} else {
				// flag the field
				// $('#site_inspection_dtInput').css('border-color', 'red');
				// $('#site_inspection_dtInput').val('');
				return true;
			}
		},

		omnibus_dist_mdl_cdDD : function() {
			return $('#omnibus_dist_mdl_cdDD').val().length != 0;
		},

		omnibus_trad_proc_cdDD : function() {
			return $('#omnibus_trad_proc_cdDD').val().length != 0;
		},

		data_trans_mthd_cd : function() {
			return $('#data_trans_mthd_cdDD').val().length != 0;
		},

		shrhldr_svc_mdl_cd : function() {
			if (sel_shrhldr_svc_mdl.length > 0) {
				return true;
			} else {
				// this is a dialog now
				return false;
			}
		},

		batch_typ_cdDD : function() {
			return $('#batch_typ_cdDD').val().length != 0;
		},

		settlement_typ_cdDD : function() {
			return $('#settlement_typ_cdDD').val().length != 0;
		},

		clearing_firm_name : function() {
			if ($('#clearing_firm_nmInput').val().length > 0) {
				return bfdsmgr.util.isDigit($('#clearing_firm_idInput').val());
			}
			return true;
		},

		prmry_bank_aba_num : function() {
			if ($('#prmry_bank_aba_numInput').val().length > 0) {
				return bfdsmgr.util
						.isDigit($('#prmry_bank_aba_numInput').val());
			}
			return true;
		},

		clearing_firm_id : function() {
			/*
			 * I want to be sure an empty string is passed to the controller who
			 * is looking for that empty string. over kill maybe want to be sure
			 * there is an empty string passed below
			 */
			if (bfdsmgr.util.isBlank($('#clearing_firm_idInput').val())) {
				$('#clearing_firm_idInput').val("");
				return true;
			}
			return bfdsmgr.util.isDigit($('#clearing_firm_idInput').val());
		},

		ntwrk_mtrx_lvl_id : function() {
			return bfdsmgr.util.isDigitOrNA($('#ntwrk_mtrx_lvl_idDD').val());
		}

	};
})();