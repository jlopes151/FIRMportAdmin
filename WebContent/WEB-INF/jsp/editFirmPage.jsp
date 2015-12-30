<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%--Begin HTML--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <jsp:include page="includes/javascriptCss.jsp" />
    <title>FIRMport Admin - Edit Parent Firm Page</title>
    <script type="text/javascript" src="bfdsUtil.js"></script>    
    <script type="text/javascript" src="bfdsFirm.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {			
        	// init the drop downs
			bfdsmgr.firm.editFirmPage();
        	
        	$('#prmry_frms_tabs').tabs();
        	
        });

/*      moved to the editFirm function  
		function disableClearingIdBtn(){
		}
*/		
	</script>        
</head>
<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>

<div id="dlg-msg" title="Message" class="bfdsHidden">
	<p id="msg-p">
		<span class="ui-icon ui-icon-circle-check" style="float:left; margin:0 7px 50px 0;"></span>
	</p>
</div>

<div id="get_clr_firm_dialog" title="Clearing Firm" class="bfdsHidden">
	<table align="center" width=400>
		<tr>
			<td>
				<div>
					<label>Available Clearing Firms</label>
					<select id="clr_firm_frm" style="width:250px" size=15 multiple ></select>
				</div>
			</td>		
			<td>
				<table align="center" width="auto">
					<tr>
						<td align="center"><input type="button" value="&gt;" onclick="bfdsmgr.util.add('#clr_firm_frm', '#clr_firm_to')" 
						/></td>
					</tr>
					<tr>
						<td align="center"><input type="button" value="&lt;" onclick="bfdsmgr.util.remove('#clr_firm_frm', '#clr_firm_to')"  
						/></td>
					</tr>
				</table>
			</td>		
			<td>
				<div>
					<label>Selected Clearing Firms</label>
					<select id="clr_firm_to" style="width:250px" size=15 multiple ></select>
				</div>
			</td>		
		</tr>
	</table>
</div>

<div id="get_firm_type_dialog" title="Firm Type" class="bfdsHidden">
	<table align="center" width=400>
		<tr>
			<td>
				<div>
					<label>Available Firm Types</label>
					<select id="firm_typ_frm" style="width:250px" size=15 multiple ></select>
				</div>
			</td>		
			<td>
				<table align="center" width="auto">
					<tr>
						<td align="center"><input type="button" value="&gt;" onclick="bfdsmgr.util.add('#firm_typ_frm', '#firm_typ_to')" 
						/></td>
					</tr>
					<tr>
						<td align="center"><input type="button" value="&lt;" onclick="bfdsmgr.util.remove('#firm_typ_frm', '#firm_typ_to')"  
						/></td>
					</tr>
				</table>
			</td>		
			<td>
				<div>
					<label>Selected Firm Types</label>
					<select id="firm_typ_to" style="width:250px" size=15 multiple ></select>
				</div>
			</td>		
		</tr>
	</table>
</div>

<div id="get_shrhldr_svc_mdl_cd_dialog" title="Shareholder Service Model" class="bfdsHidden">
	<table align="center" width=400>
		<tr>
			<td>
				<div>
					<label>Available Shareholder Service Model</label>
					<select id="shrhldr_svc_mdl_frm" style="width:250px" size=15 multiple ></select>
				</div>
			</td>		
			<td>
				<table align="center" width="auto">
					<tr>
						<td align="center"><input type="button" value="&gt;" onclick="bfdsmgr.util.add('#shrhldr_svc_mdl_frm', '#shrhldr_svc_mdl_to')" 
						/></td>
					</tr>
					<tr>
						<td align="center"><input type="button" value="&lt;" onclick="bfdsmgr.util.remove('#shrhldr_svc_mdl_frm', '#shrhldr_svc_mdl_to')"  
						/></td>
					</tr>
				</table>
			</td>		
			<td>
				<div>
					<label>Selected Shareholder Service Model</label>
					<select id="shrhldr_svc_mdl_to" style="width:250px" size=15 multiple ></select>
				</div>
			</td>		
		</tr>
	</table>
</div>

<div id="get_brkrg_pltfrm_dialog" title="Brokerage Platform" class="bfdsHidden">
	<table align="center" width=400>
		<tr>
			<td>
				<div>
					<label>Available Brokerage Platform</label>
					<select id="brkrg_pltfrm_frm" style="width:250px" size=15 multiple ></select>
				</div>
			</td>		
			<td>
				<table align="center" width="auto">
					<tr>
						<td align="center"><input type="button" value="&gt;" onclick="bfdsmgr.util.add('#brkrg_pltfrm_frm', '#brkrg_pltfrm_to')" 
						/></td>
					</tr>
					<tr>
						<td align="center"><input type="button" value="&lt;" onclick="bfdsmgr.util.remove('#brkrg_pltfrm_frm', '#brkrg_pltfrm_to')"  
						/></td>
					</tr>
				</table>
			</td>		
			<td>
				<div>
					<label>Selected Brokerage Platform</label>
					<select id="brkrg_pltfrm_to" style="width:250px" size=15 multiple ></select>
				</div>
			</td>		
		</tr>
	</table>
</div>

<div id="get_subacct_pltfrm_dialog" title="Sub Accounting Platform" class="bfdsHidden">
	<table align="center" width=400>
		<tr>
			<td>
				<div>
					<label>Available Sub-Accounting Platform</label>
					<select id="subacct_pltfrm_frm" style="width:250px" size=15 multiple ></select>
				</div>
			</td>		
			<td>
				<table align="center" width="auto">
					<tr>
						<td align="center"><input type="button" value="&gt;" onclick="bfdsmgr.util.add('#subacct_pltfrm_frm', '#subacct_pltfrm_to')" 
						/></td>
					</tr>
					<tr>
						<td align="center"><input type="button" value="&lt;" onclick="bfdsmgr.util.remove('#subacct_pltfrm_frm', '#subacct_pltfrm_to')"  
						/></td>
					</tr>
				</table>
			</td>		
			<td>
				<div>
					<label>Selected Sub-Accounting Platform</label>
					<select id="subacct_pltfrm_to" style="width:250px" size=15 multiple ></select>
				</div>
			</td>		
		</tr>
	</table>
</div>

<div id="get_data_trans_mthd_cd_dialog" title="Data Transmission Method" class="bfdsHidden">
	<table align="center" width=400>
		<tr>
			<td>
				<div>
					<label>Available Data Transmission Method</label>
					<select id="data_trans_mthd_cd_frm" style="width:250px" size=15 multiple ></select>
				</div>
			</td>		
			<td>
				<table align="center" width="auto">
					<tr>
						<td align="center"><input type="button" value="&gt;" onclick="bfdsmgr.util.add('#data_trans_mthd_cd_frm', '#data_trans_mthd_cd_to')" 
						/></td>
					</tr>
					<tr>
						<td align="center"><input type="button" value="&lt;" onclick="bfdsmgr.util.remove('#data_trans_mthd_cd_frm', '#data_trans_mthd_cd_to')"  
						/></td>
					</tr>
				</table>
			</td>		
			<td>
				<div>
					<label>Selected Data Transmission Method</label>
					<select id="data_trans_mthd_cd_to" style="width:250px" size=15 multiple ></select>
				</div>
			</td>		
		</tr>
	</table>
</div>

<div id="get_omnibus_trad_proc_cd_dialog" title="Omnibus Trade Procedure" class="bfdsHidden">
	<table align="center" width=400>
		<tr>
			<td>
				<div>
					<label>Available Omnibus Trade Procedure</label>
					<select id="omnibus_trad_proc_cd_frm" style="width:250px" size=15 multiple ></select>
				</div>
			</td>		
			<td>
				<table align="center" width="auto">
					<tr>
						<td align="center"><input type="button" value="&gt;" onclick="bfdsmgr.util.add('#omnibus_trad_proc_cd_frm', '#omnibus_trad_proc_cd_to')" 
						/></td>
					</tr>
					<tr>
						<td align="center"><input type="button" value="&lt;" onclick="bfdsmgr.util.remove('#omnibus_trad_proc_cd_frm', '#omnibus_trad_proc_cd_to')"  
						/></td>
					</tr>
				</table>
			</td>		
			<td>
				<div>
					<label>Selected Omnibus Trade Procedure</label>
					<select id="omnibus_trad_proc_cd_to" style="width:250px" size=15 multiple ></select>
				</div>
			</td>		
		</tr>
	</table>
</div>

<div id="get_settlement_typ_cd_dialog" title="Settlement Type" class="bfdsHidden">
	<table align="center" width=400>
		<tr>
			<td>
				<div>
					<label>Available Settlement Type</label>
					<select id="settlement_typ_cd_frm" style="width:250px" size=15 multiple ></select>
				</div>
			</td>		
			<td>
				<table align="center" width="auto">
					<tr>
						<td align="center"><input type="button" value="&gt;" onclick="bfdsmgr.util.add('#settlement_typ_cd_frm', '#settlement_typ_cd_to')" 
						/></td>
					</tr>
					<tr>
						<td align="center"><input type="button" value="&lt;" onclick="bfdsmgr.util.remove('#settlement_typ_cd_frm', '#settlement_typ_cd_to')"  
						/></td>
					</tr>
				</table>
			</td>		
			<td>
				<div>
					<label>Selected Settlement Type</label>
					<select id="settlement_typ_cd_to" style="width:250px" size=15 multiple ></select>
				</div>
			</td>		
		</tr>
	</table>
</div>

<div id="get_pricing_source_dialog" title="Pricing Source" class="bfdsHidden">
	<table align="center" width=400>
		<tr>
			<td>
				<div>
					<label>Available Pricing Source</label>
					<select id="pricing_source_frm" style="width:250px" size=15 multiple ></select>
				</div>
			</td>		
			<td>
				<table align="center" width="auto">
					<tr>
						<td align="center"><input type="button" value="&gt;" onclick="bfdsmgr.util.add('#pricing_source_frm', '#pricing_source_to')" 
						/></td>
					</tr>
					<tr>
						<td align="center"><input type="button" value="&lt;" onclick="bfdsmgr.util.remove('#pricing_source_frm', '#pricing_source_to')"  
						/></td>
					</tr>
				</table>
			</td>		
			<td>
				<div>
					<label>Selected Pricing Source</label>
					<select id="pricing_source_to" style="width:250px" size=15 multiple ></select>
				</div>
			</td>		
		</tr>
	</table>
</div>

<div id="editPrimaryFirm" class="bfdsmgrTabBody">
        <table id="addFirmTable" width="100%">
            <tr>
           		<td class="bfdsRequired"><span style='position: absolute; left: 10px;'>required fields *</span></td>
                <td align="center" class="bfdsmgrBoldText"><h3 class="pageHeaderTableHeader">Edit Parent Firm</h3></td>
            </tr>
        </table>
 
<!-- Begin the Tab set div -->
	<div id="prmry_frms_tabs"> 
		<ul>
			<li><a href="#prmry_frms_tabs-1">General Attributes</a></li>
			<li><a href="#prmry_frms_tabs-2">Operational Summary</a></li>
			<li><a href="#prmry_frms_tabs-3">Trading Attributes</a></li>
			<li><a href="#prmry_frms_tabs-4">NSCC Number/Alpha</a></li>
		</ul>       
 
<!-- General Attributes --> 
		<div id="prmry_frms_tabs-1">       	
	        <table id="addGenAttrFirmTable" >
	        	<tr>
	        		<td style="text-align: left; color: green" class="bfdsmgrSmallItalicizedText">General Attributes</td>
	        	</tr>
	            <tr>
	                <td>Long Name<span class="bfdsRequired">*</span></td>
	                <td colspan=5><input id="long_nmInput" name="long_nm" type="text" maxlength=75 size=75 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	            </tr>
	            <tr>
	                <td>Short Name<span class="bfdsRequired">*</span></td>
	                <td><input id="short_nmInput" name="short_nm" type="text" maxlength=25 size=25 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	                <td>Firm Website</td>
	                <td><input id="firm_websiteInput" name="firm_website" type="text" maxlength=30 size=30 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	            </tr>
	            <tr>
	                <td>Firm Address 1<span class="bfdsRequired">*</span></td>
	                <td><input id="firm_address1Input" name="firm_address1" type="text" maxlength=50 size=50 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	                <td>Firm State<span class="bfdsRequired">*</span></td>
	                <td><select id="firm_state_cdDD" name="firm_state_cd" onchange="bfdsmgr.util.setFieldColor(this)" ></select></td>
	            </tr>
	            <tr>
	                <td>Firm Address 2</td>
	                <td><input id="firm_address2Input" name="firm_address2" type="text" maxlength=50 size=50 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	                <td>Firm Zip<span class="bfdsRequired">*</span></td>
	                <td><input id="firm_zip_cdInput" name="firm_zip_cd" maxlength=5 size=5 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	            </tr>
	            <tr>
	                <td>Firm City<span class="bfdsRequired">*</span></td>
	                <td><input id="firm_cityInput" name="firm_city" type="text" maxlength=50 size=50 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	                <td>Clearing Firm Indicator<span class="bfdsRequired">*</span></td>
	                <td><select id="clrng_frm_indInput" name="clrng_frm_ind" onchange="bfdsmgr.util.setFieldColor(this); bfdsmgr.firm.disableClearingIdBtn()">
	                	<option value="" id="clrng_frm_ind0">-- Select --</option>
	                	<option value="Yes" id="clrng_frm_ind1">Yes</option>
	                	<option value="No" id="clrng_frm_ind2">No</option>
	        	    </select></td>
	            </tr>
	            <tr>
			</table>
		</div>
		<div id="prmry_frms_tabs-2">       	
			<table>            
<!-- Operations Summary -->            
	        		<td colspan=5 style="text-align: left; color: green" class="bfdsmgrSmallItalicizedText">Operations Summary</td>
	        	</tr>
	            <tr>
	                <td></td>
		<!-- Firm Type Cd -->
	                <td><input id="firm_typ_cdInput" name="firm_typ_cd" type="button" value="Firm Type *"  
	                onclick="bfdsmgr.firm.firmTypeDialog();"/></td>
		<!-- Shareholder Service Model -->
	                <td><input id="shrhldr_svc_mdl_cdInput" name="shrhldr_svc_mdl_cd" type="button" value="Shareholder Service Model *" 
	                onclick="bfdsmgr.firm.shrhldrServiceModelDialog();"/></td>
	            </tr>
	            <tr>
	                <td></td>
		<!-- Brokerage Platform -->
	                <td><input id="brkrg_pltfrmInput" name="brkrg_pltfrm" type="button" value="Brokerage Platform" 
	                onclick="bfdsmgr.firm.brkrgPlatformDialog();"/></td>
		<!-- Sub Accounting Platform -->
	                <td><input id="subacct_pltfrm_cdInout" name="subacct_pltfrm_cd" type="button" value="Sub-Accounting Platform" 
	                onclick="bfdsmgr.firm.subAccountingPlatformDialog();"></td>
	            </tr>
	            <tr>
		<!-- Clearing Firm Id -->
	                <td></td>
	                <td><input id="clearing_firm_idInput" name="clearing_firm_id" type="button" value="Clearing Firms"   
	                onclick="bfdsmgr.firm.clearingFirmDialog();"/></td>
	            </tr>
	            <tr>
	                <td>FI Tax Id</td>
	                <td><input id="firm_tax_idInput" name="firm_tax_id" type="text" maxlength=10 size=10 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	                <td>Mutual Fund Profile II</td>
	                <td><select id="mf_profile_II_indInput" name="mf_profile_II_ind" onchange="bfdsmgr.util.setFieldColor(this)"></select></td>
	            </tr>
	            <tr>
	                <td>Operational Review</td>
	                <td><select id="op_review_cdInput" name="op_review_cd" onchange="bfdsmgr.firm.disableOpRevDt(); bfdsmgr.util.setFieldColor(this)"></select></td>
	                <td>Operational Review Date</td>
	                <td><input id="op_review_dtInput" name="op_review_dt" type="text" onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	            </tr>
	            <tr>
	                <td>SAE16 (SAS70)</td>
	                <td><select id="sae16_indDD" name="sae16_ind" onchange="bfdsmgr.util.setFieldColor(this)">
	                	<option value="Yes" id="sae16_ind0">Yes</option>
	                	<option value="No" id="sae16_ind1">No</option>
	                	<option value="TDB" id="sae16_ind2" selected>TDB</option>
	                </select></td>
	                <td>Industry Attestation</td>
	                <td><select id="industry_attestation_indDD" name="industry_attestation_ind" onchange="bfdsmgr.util.setFieldColor(this)">
	                	<option value="Yes" id="industry_attestation_ind0">Yes</option>
	                	<option value="No" id="industry_attestation_ind1">No</option>
	                	<option value="TDB" id="industry_attestation_ind2" selected>TDB</option>
	                </select></td>
	            </tr>
	            <tr>
	                <td>DST Vision</td>
	        	    <td><select id="vision_indDD" name="vision_ind" onchange="bfdsmgr.util.setFieldColor(this)">
	                	<option value="" id="vision_ind0">-- Select --</option>
	                	<option value="Yes" id="vision_ind1">Yes</option>
	                	<option value="No" id="vision_ind2">No</option>
	        	    </select></td>
	                <td>DST Fan Mail</td>
	       		    <td><select id="fan_mail_indDD" name="fan_mail_ind" onchange="bfdsmgr.util.setFieldColor(this)">
	                	<option value="" id="fan_mail_ind0">-- Select --</option>
	                	<option value="Yes" id="fan_mail_ind1">Yes</option>
	                	<option value="No" id="fan_mail_ind2">No</option>
	       		    </select></td>
	            </tr>
	            <tr>
	                <td>Spec Package Teamplate</td>
	                <td><input id="spec_pckg_linkInput" name="spec_pckg_link" type="text" maxlength=50 size=50 disabled onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	                <td>Special Package Indicator</td>
	                <td><select id="spec_pckg_indDD" name="spec_pckg_ind" onchange="bfdsmgr.util.setFieldColor(this); bfdsmgr.firm.disableSpecPckg()">
	                	<option value="" id="spec_pckg_ind0">-- Select --</option>
	                	<option value="Yes" id="spec_pckg_ind1">Yes</option>
	                	<option value="No" id="spec_pckg_ind2">No</option>
	                </select></td>
	            </tr>
	            <tr>
	                <td>Primary Bank Name</td>
	                <td><input id="prmry_bank_nmInput" name="prmry_bank_nm" type="text" maxlength=50 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	                <td>Primary Bank ABA</td>
	                <td><input id="prmry_bank_aba_numInput" name="prmry_bank_aba_num" type="text" maxlength=9 size=9 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	            </tr>
	            <tr>
	                <td>Primary Bank Account # / FFC</td>
	                <td><input id="prmry_bank_acct_numInput" name="prmry_bank_acct_num" type="text" maxlength=25 size=25 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	                <td>Primary Bank State</td>
	                <td><select id="prmry_bank_state_cdDD" name="prmry_bank_state_cd" onchange="bfdsmgr.util.setFieldColor(this)"></select></td>
	            </tr>
	            <tr>
	                <td>Primary Bank Address1</td>
	                <td><input id="prmry_bank_address1Input" name="prmry_bank_address1" type="text" maxlength=50 size=50 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	                <td>Primary Bank Zip</td>
	                <td><input id="prmry_bank_zip_cdDD" name="prmry_bank_zip_cd" maxlength=5 size=5 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	            </tr>
	            <tr>
	                <td>Primary Bank Address2</td>
	                <td><input id="prmry_bank_address2Input" name="prmry_bank_address2" type="text" maxlength=50 size=50 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	            </tr>
	            <tr>
	                <td>Primary Bank City</td>
	                <td><input id="prmry_bank_cityInput" name="prmry_bank_city" type="text" maxlength=50 size=50 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	            </tr>
			</table>
		</div>
		<div id="prmry_frms_tabs-3">       	
<!-- Trading Attributes -->            
			<table>            
	            <tr>
	        		<td style="text-align: left; color: green" class="bfdsmgrSmallItalicizedText">Trading Attributes</td>
	        	</tr>
	            <tr>
		<!-- Settlement Type -->            
	                <td></td>
	                <td><input id="settlement_typ_cd" name="settlement_typ_cd" type="button" value="Settlement Type" 
	                onclick="bfdsmgr.firm.settlementTypeDialog();"/></td>
	                <td>Intermediary System Trade CutOff</td>
	                <td><input id="trade_cut_offInput" name="trade_cut_off" type="text" maxlength=15 size=15 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	            </tr>
	            <tr>
		<!-- Omnibus Trade Procedure --> 
	                <td></td>
	                <td><input id="omnibus_trad_proc_cd" name="omnibus_trad_proc_cd" type="button" value="Omnibus Trade Procedure"
	                onclick="bfdsmgr.firm.omnibusTradeProcedureDialog();"/></td>
	                <td>Omnibus Distribution Model</td>
	                <td><select id="omnibus_dist_mdl_cdDD" name="omnibus_dist_mdl_cd" onchange="bfdsmgr.util.setFieldColor(this)"></select></td>
	            </tr>
	            <tr>
		<!-- Data Transmission Method -->
	                <td></td>
	                <td><input id="data_trans_mthd_cd" name="data_trans_mthd_cd" type="button" value="Data Transmission Method" 
	                onclick="bfdsmgr.firm.dataTransmissionMethodDialog();"/></td>
	                <td>Multi-Batch/Single-Batch</td>
	                <td><select id="batch_typ_cdDD" name="batch_typ_cd" onchange="bfdsmgr.util.setFieldColor(this)"></select></td>
	            </tr>
	            <tr>
	                <td>Bin Format</td>
	                <td><input id="bin_maskInput" name="bin_mask" type="text" maxlength=20 size=20 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	                <td>Network Position File Schedule</td>
	                <td><select id="pos_file_sched_cdDD" name="pos_file_sched_cd" onchange="bfdsmgr.util.setFieldColor(this)"></select></td>
	            </tr>
	            <tr>
	                <td>Active Indicator<span class="bfdsRequired">*</span></td>
	                <td><select id="active_indInput" name="active_ind" onchange="bfdsmgr.util.setFieldColor(this); bfdsmgr.firm.disableInActiveDt()" >
	                	<option value="Yes" id="active_ind1">Yes</option>
	                	<option value="No" id="active_ind2">No</option>
	                </select>
	                <td>Inactive Date</td>
	                <td><input id="inactive_dtInput" name="inactive_dt" type="text" maxlength=20 size=20 onchange="bfdsmgr.util.setFieldColor(this)"></td>
	            </tr>
	            <tr>
	                <td>Commserv</td>
	                <td><select id="commserv_indDD" name="commserv_ind" onchange="bfdsmgr.util.setFieldColor(this)">
	                	<option value="" id="commserv_ind0">-- Select --</option>
	                	<option value="Yes" id="commserv_ind1">Yes</option>
	                	<option value="No" id="commserv_ind2">No</option>
	                	<option value="N/A" id="commserv_ind3">N/A</option>
	                </select></td>
	                <td>DST Vision Home Office</td>
	                <td><select id="dst_vho_indDD" name="dst_vho_ind" onchange="bfdsmgr.util.setFieldColor(this)">
	                	<option value="" id="dst_vho_ind0">-- Select --</option>
	                	<option value="Yes" id="dst_vho_ind1">Yes</option>
	                	<option value="No" id="dst_vho_ind2">No</option>
	                	<option value="" id="dst_vho_ind3">Blank</option>
	                </select></td>
	            </tr>
	            <tr>
	                <td>Omniserv Indicator</td>
	                <td><select id="omniserv_indDD" name="omniserv_ind"
							onchange="bfdsmgr.util.setFieldColor(this)">
	                		<option value="" id="omniserv_ind0">-- Select --</option>
							<option value="Yes" id="omniserv_ind1">Yes</option>
							<option value="No" id="omniserv_ind2">No</option>
						</select></td>
	                <td><input id="pricing_source_cd" name="pricing_source_cd" type="button" value="Pricing Source" 
	                onclick="bfdsmgr.firm.pricingSourceDialog();"/></td>					
	            </tr>
	        </table>
		</div>        
		<div id="prmry_frms_tabs-4">
			<table class="bfdsmgrCenter">
				<tr>
					<th>Nscc Member Number</th>
					<th>NSCC Network Alpha Code</th>
				</tr>
				<tr>
					<td><input id="nscc_num_1"  type="text" maxlength=4 size=4 
					onchange="bfdsmgr.util.setFieldColor(this); bfdsmgr.firm.isNsccNumNA(this); bfdsmgr.firm.chk_nssc_num_count(this)"/></td>
					<td><input id="nscc_alpha_1"  type="text" maxlength=3 size=3 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
				</tr>
				<tr>
					<td><input id="nscc_num_2" type="text" maxlength=4 size=4 
					onchange="bfdsmgr.util.setFieldColor(this); bfdsmgr.firm.isNsccNumNA(this); bfdsmgr.firm.chk_nssc_num_count(this)"/></td>
					<td><input id="nscc_alpha_2" type="text" maxlength=3 size=3 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
				</tr>
				<tr>
					<td><input id="nscc_num_3" type="text" maxlength=4 size=4 
					onchange="bfdsmgr.util.setFieldColor(this); bfdsmgr.firm.isNsccNumNA(this); bfdsmgr.firm.chk_nssc_num_count(this)"/></td>
					<td><input id="nscc_alpha_3" type="text" maxlength=3 size=3 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
				</tr>
				<tr>
					<td><input id="nscc_num_4" type="text" maxlength=4 size=4 
					onchange="bfdsmgr.util.setFieldColor(this); bfdsmgr.firm.isNsccNumNA(this); bfdsmgr.firm.chk_nssc_num_count(this)"/></td>
					<td><input id="nscc_alpha_4" type="text" maxlength=3 size=3 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
				</tr>
				<tr>
					<td><input id="nscc_num_5" type="text" maxlength=4 size=4 
					onchange="bfdsmgr.util.setFieldColor(this); bfdsmgr.firm.isNsccNumNA(this); bfdsmgr.firm.chk_nssc_num_count(this)"/></td>
					<td><input id="nscc_alpha_5" type="text" maxlength=3 size=3 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
				</tr>
				<tr>
					<td><input id="nscc_num_6" type="text" maxlength=4 size=4 
					onchange="bfdsmgr.util.setFieldColor(this); bfdsmgr.firm.isNsccNumNA(this); bfdsmgr.firm.chk_nssc_num_count(this)"/></td>
					<td><input id="nscc_alpha_6" type="text" maxlength=3 size=3  onchange="bfdsmgr.util.setFieldColor(this)" /></td>
				</tr>
				<tr>
					<td><input id="nscc_num_7" type="text" maxlength=4 size=4 
					onchange="bfdsmgr.util.setFieldColor(this); bfdsmgr.firm.isNsccNumNA(this); bfdsmgr.firm.chk_nssc_num_count(this)"/></td>
					<td><input id="nscc_alpha_7" type="text" maxlength=3 size=3  onchange="bfdsmgr.util.setFieldColor(this)" /></td>
				</tr>
				<tr>
					<td><input id="nscc_num_8" type="text" maxlength=4 size=4 
					onchange="bfdsmgr.util.setFieldColor(this); bfdsmgr.firm.isNsccNumNA(this); bfdsmgr.firm.chk_nssc_num_count(this)"/></td>
					<td><input id="nscc_alpha_8" type="text" maxlength=3 size=3  onchange="bfdsmgr.util.setFieldColor(this)" /></td>
				</tr>
				<tr>
					<td><input id="nscc_num_9" type="text" maxlength=4 size=4 
					onchange="bfdsmgr.util.setFieldColor(this); bfdsmgr.firm.isNsccNumNA(this); bfdsmgr.firm.chk_nssc_num_count(this)"/></td>
					<td><input id="nscc_alpha_9" type="text" maxlength=3 size=3  onchange="bfdsmgr.util.setFieldColor(this)" /></td>
				</tr>
				<tr>
					<td><input id="nscc_num_10" type="text" maxlength=4 size=4 
					onchange="bfdsmgr.util.setFieldColor(this); bfdsmgr.firm.isNsccNumNA(this); bfdsmgr.firm.chk_nssc_num_count(this)"/></td>
					<td><input id="nscc_alpha_10" type="text" maxlength=3 size=3  onchange="bfdsmgr.util.setFieldColor(this)" /></td>
				</tr>
	        </table>
		</div>        
<!-- End the Tab set div -->
<!-- End of addPrimaryFirm div -->    
<div>    
	<div>        
        <table id="addSubmitFirmTable" >
            <tr>
                <td><input type="button" value="Submit" id="submitFirm" onclick="bfdsmgr.firm.updateFirm();" /></td>
                <td><input type="button" value="Cancel" id="cancelEditFirm" onclick="bfdsmgr.firm.cancelFirm();"/></td>
            </tr>
        </table>
        <input id="lst_updt_useridInput" name="lst_updt_userid" type="hidden" maxlength=30 value="Today" />
        <input id="lst_updt_dtmInput" name="lst_updt_dtm" type="hidden" value="2011-11-11 10:30" />
        
    </div>
    <div id="success" class="bfdsHidden">
		<h3 id="successMessage"></h3>       
    </div>
</body>
</html>