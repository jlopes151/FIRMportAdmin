<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%--Begin HTML--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <jsp:include page="includes/javascriptCss.jsp" />
    <!-- 
    	Was Firm and Management Company in schema one now renamed to
    	Add TA2000 Sub Firm 
    -->
    <title>FIRMport Admin - Add TA2000 Sub Firm Page</title>
    <script type="text/javascript" src="bfdsUtil.js"></script>    
    <script type="text/javascript" src="bfdsFirmAndMgmtCo.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
//           	bfdsmgr.firmmgmtco.getSystem();
//           	bfdsmgr.firmmgmtco.getCompany();
			bfdsmgr.firmmgmtco.getBatchType();
			bfdsmgr.firmmgmtco.getOmnibusTradProc();
			bfdsmgr.firmmgmtco.getSettlementType();
        });
	</script>        
</head>
<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>
<div class="bfdsmgrMgmtBody">
        <div id="addFirmAndMgmtCo">
        <input id="firmIdInput" name="firmId" type="hidden" maxlength=10 />
        <input id="mgmtcoIdInput" name="mgmtcoId" type="hidden" maxlength=10 />
        <div id="systemDialog" title="Firms" class="bfdsHidden"></div>
        <div id="companyDialog" title="Systems" class="bfdsHidden"></div>
        <table id="addFirmAndMgmtCoTable">
            <tr>
           		<td class="bfdsRequired"><span style='position: absolute; left: 10px;'>required fields *</span></td>
                <td align="center" colspan="5" class="bfdsmgrBoldText">
                    <h3 class="pageHeaderTableHeader">
                        Add TA2000 Sub Firm Company Xref
                    </h3>
                </td>
            </tr>
            <tr>
                <td>Group<span class="bfdsRequired">*</span></td>
                <td><input id="groupInput" name="group" type="text" maxlength=10 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
                <td>Dealer Number<span class="bfdsRequired">*</span></td>
                <td><input id="ta2000_dealr_numInput" name="ta2000_dealr_num" type="text" maxlength=10 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
            </tr>
            <tr>
                <td>Active Indicator<br/>(Yes, No)</span></td>
                <td><input id="active_indInput" name="active_ind" type="text" maxlength=50 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
                <td>Active Date<br/>(yyyy-mm-dd)</td>
                <td><input id="active_dtInput" name="active_dt" type="text" maxlength=10 onchange="bfdsmgr.util.setFieldColor(this)"/></td>
            </tr>
            <tr>
                <td>Inactive Date<br/>(yyyy-mm-dd)</td>
                <td><input id="inactive_dtInput" name="inactive_dt" type="text" maxlength=50 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
                <td>Vision Indicator<br/>(Yes, No)</td>
                <td><input id="vision_indInput" name="vision_ind" type="text" maxlength=30 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
            </tr>
            <tr>
                <td>Fan Mail Indicator<br/>(Yes, No)</td>
                <td><input id="fan_mail_indInput" name="fan_mail_ind" type="text" onchange="bfdsmgr.util.setFieldColor(this)" /></td>
                <td>Omnibus Conversion Date<br/>(yyyy-mm-dd)</td>
                <td><input id="omnibus_conversion_dtInput" name="omnibus_conversion_dt" type="text" maxlength=10 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
            </tr>
            <tr>
                <td>Omniserv Indicator<br/>(Yes, No)</td>
                <td><input id="omniserv_indInput" name="omniserv_ind" type="text" onchange="bfdsmgr.util.setFieldColor(this)" /></td>
                <td>As Of Trade Window<br/>0-180 days</td>
                <td><input id="asof_trad_windowInput" name="asof_trad_window" type="text" maxlength=3 onchange="bfdsmgr.util.setFieldColor(this)"/></td>
            </tr>
            <tr>
                <td>Omnibus Trade Procedure</td>
                <td><select id="omnibus_trad_proc_cdDD" name="omnibus_trad_proc_cd"></select></td>
                <td>Batch Type</td>
                <td><select id="batch_typ_cdDD" name="batch_typ_cd"></select></td>
            </tr>
            <tr>
                <td>Settlement Type</td>
                <td><select id="settlement_typ_cdDD" name="settlement_typ_cd"></select></td>
                <td>Post Settlement Change Indicator<br/>(Yes, No)</td>
                <td><input id="post_settlement_chng_indInput" name="post_settlement_chng_ind" type="text" maxlength=3 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
            </tr>
            <tr>
                <td>PTF ACAT Transfer Indicator<br/>(Yes, No)</td>
                <td><input id="ptf_acat_trnsfr_indInput" name="ptf_acat_trnsfr_ind" type="text" onchange="bfdsmgr.util.setFieldColor(this)" /></td>
                <td>DST VHO Indicator<br/>(Yes, No)</td>
                <td><input id="dst_vho_indInput" name="dst_vho_ind" type="text" maxlength=3 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
            </tr>
            <tr>
                <td><input type="button" value="Submit" id="submitFirmnMgmtCo" onclick="bfdsmgr.firmmgmtco.addFirmAndMgmtCo();"/></td>
            </tr>
        </table>
        </div>
    <div id="success" class="bfdsHidden">
        <h3 id="successMessage"></h3>
    </div>
</div>
</body>
</html>