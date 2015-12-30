<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%--Begin HTML--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <jsp:include page="includes/javascriptCss.jsp" />
    <title>FIRMport Admin - Add TA2000 Sub Firm Page</title>
    <script type="text/javascript" src="bfdsUtil.js"></script>    
    <script type="text/javascript" src="bfdsTA2000SubFirm.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
			bfdsmgr.tasf.getSystemName();            
			bfdsmgr.tasf.getCompanyName();            
			bfdsmgr.tasf.getSubFirmStates();
			bfdsmgr.tasf.getOmnibusTradProc();
			bfdsmgr.tasf.getTASettlementType();
        	bfdsmgr.tasf.getTAShareHldrSvcMdl();
        	bfdsmgr.tasf.getTA2000SubFirmType();

        	$('#prmry_frms_tabs').tabs();
        	
        });
        
	</script>        
</head>
<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>

<div class="bfdsmgrTABody">
        <div id="addFirmAndMgmtCo">
         <table id="addFirmAndMgmtCoTable" align="center">
            <tr>
           		<td class="bfdsRequired"><span style='position: absolute; left: 10px;'>required fields *</span></td>
                <td align="center" colspan="5" class="bfdsmgrBoldText">
                    <h3 class="pageHeaderTableHeader">Add TA2000 Sub Firm</h3>
                </td>
            </tr>
        </table>
<!-- Begin the Tab set div -->
	<div id="prmry_frms_tabs"> 
		<ul>
			<li><a href="#prmry_frms_tabs-1">General Summary</a></li>
			<li><a href="#prmry_frms_tabs-2">Trading Attributes</a></li>
		</ul>       
 
<!-- General Summary & Relationship Attributes --> 
		<div id="prmry_frms_tabs-1">
	        <table width="*">
	          	<tr>
					<td>Parent Firm</td>
					<td><input id="systemInput" name="parentfirm" type="text" maxlength="75" size=40 disabled /></td>
					<td>Company</td>
					<td><input id="companyInput" name="company" type="text"  maxlength="50" size=40 disabled /></td>
	            </tr>
	            <tr>
	                <td>TA2000 Dealer Number<span class="bfdsRequired">*</span></td>
	                <td><input id="ta2000_dealr_numInput" name="ta2000_dealr_num" type="text" maxlength=10 size=10 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	                <td>TA2000 Sub Firm Type<span class="bfdsRequired">*</span></td>
	                <td><select id="ta2000_sub_firm_typDD" name="ta2000_sub_firm_typ" onchange="bfdsmgr.util.setFieldColor(this)" ></select></td>
	            </tr>
	            <tr>
	                <td>TA2000 NSCC Member Number</td>
	                <td><input id="ta2000_nscc_member_numInput" name="ta2000_nscc_member_num" type="text" maxlength=10 size=10 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	               <td>TA2000 NSCC Network Alpha</td>
	                <td><input id="ta2000_nscc_ntwrk_alphaInput" name="ta2000_nscc_ntwrk_alpha" type="text" maxlength=10 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	            </tr>
	            <tr colspan=4>
	                <td>TA2000 Firm Name<span class="bfdsRequired">*</span></td>
	                <td colspan="4"><input id="ta2000_firm_nmInput" name="ta2000_firm_nm" type="text" maxlength=75 size=75 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	            </tr>
	            <tr>
	                <td>TA2000 Firm Address 1<span class="bfdsRequired">*</span></td>
	                <td><input id="ta2000_firm_address1Input" name="ta2000_firm_address1" type="text" maxlength=50 size=50 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	                <td>TA2000 Firm City<span class="bfdsRequired">*</span></td>
	                <td><input id="ta2000_firm_cityInput" name="ta2000_firm_city" type="text" maxlength=50 size=50 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	            </tr>
	            <tr>
	                <td>TA2000 Firm Address 2</td>
	                <td><input id="ta2000_firm_address2Input" name="ta2000_firm_address2" type="text" maxlength=50 size=50 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	                <td>TA2000 Firm State<span class="bfdsRequired">*</span></td>
		            <td><select id="ta2000_firm_stateDD" name="ta2000_firm_state" onchange="bfdsmgr.util.setFieldColor(this)" ></select></td>
	            </tr>
	            <tr>
	                <td>TA2000 Firm Zip<span class="bfdsRequired">*</span></td>
	                <td><input id="ta2000_firm_zipInput" name="ta2000_firm_zip" type="text" maxlength=5 size=5 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	                <td>Active Indicator<span class="bfdsRequired">*</span></td>
	                <td>
		                <select id="active_indInput" name="active_ind" onchange="bfdsmgr.util.setFieldColor(this)" >
		                	<option value="">-- Select --</option>
		                	<option value="Yes">Yes</option>
		                	<option value="No">No</option>
		                	<option value="Unk">Unknown</option>
		                </select>
	                </td>
	            </tr>
	            <tr>
	                <td>Inactive Date<br/>(yyyy-mm-dd)</td>
	                <td><input id="inactive_dtInput" name="inactive_dt" type="text" maxlength=10 size=10 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	            </tr>            
			</table>
		</div>
<!-- Trading Attributes -->		
		<div id="prmry_frms_tabs-2">       			
			<table width="*">            
	            <tr colspan=4>
	            	<td>TA2000 Alt Firm name</td>
	            	<td colspan=4><input id="ta2000_alt_firm_nmInput" name="" type="text" maxlength="75" size="75"/></td>
	            </tr>
	            <tr>
	                <td>As Of Trade Window<br/>(0-180 days)</td>
	                <td><input id="asof_trad_windowInput" name="asof_trad_window" type="text" maxlength=8 size=8 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	                <td>Omnibus Conversion Date</td>
	                <td><input id="omnibus_conversion_dtInput" name="omnibus_conversion_dt" type="text" maxlength=10 size=10 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	            </tr>
	            <tr>
	                <td>Post Settlement Change Indicator</td>
	                <td>
		                <select id="post_settlement_chng_indInput" name="post_settlement_chng_ind" onchange="bfdsmgr.util.setFieldColor(this)" >
		                	<option value="">-- Select --</option>
		                	<option value="Yes">Yes</option>
		                	<option value="No">No</option>
		                	<option value="N/A">N/A</option>
		                </select>
	                </td>                
	                <td>PTF/ACAT Transfer Indicator</td>
	                <td>
		                <select id="ptf_acat_trnsfr_indInput" name="ptf_acat_trnsfr_ind" onchange="bfdsmgr.util.setFieldColor(this)" >
		                	<option value="">-- Select --</option>
		                	<option value="Yes">Yes</option>
		                	<option value="No">No</option>
		                	<option value="N/A">N/A</option>
		                </select>
	                </td>                
	            </tr>
	            <tr>
		<!-- Shareholder Service Model -->
					<td>Shareholder Service Model</td>
	                <td><select id="shrhldr_svc_mdl_cdDD" name="shrhldr_svc_mdl_cd" onclick="bfdsmgr.tasf.shrhldrServiceModelDialog();"></select></td>
	                <td>AST Type Description</td>
	                <td><input id="ast_type_dscInput" name="ast_type_dsc" type="text" maxlength="50" size="50"/></td>
	            </tr>
	            <tr>
		<!-- Settlement Type -->            
	                <td>Settlement Type</td>
	                <td><select id="settlement_typ_cdDD" name="settlement_typ_cd" onclick="bfdsmgr.tasf.settlementTypeDialog();"></select></td>
	            </tr>	            
			</table>
		</div>
		<div>            
			<input type="button" value="Submit" id="submitMgmtCo" onclick="bfdsmgr.tasf.addTA2000SubFirm();"/>
            <input type="button" value="Cancel" id="cancelAddFirm" onclick="bfdsmgr.tasf.cancelFirm();"/>
        </div>
    </div>
    <div id="success" class="bfdsHidden centerMessages">
        <h3 id="successMessage"></h3>
    </div>
</div>
</body>
</html>