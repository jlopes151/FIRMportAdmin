<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%--Begin HTML--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <jsp:include page="includes/javascriptCss.jsp" />
    <title>FIRMport Admin - Edit Firm and Management Company Xref Page</title>
    <script type="text/javascript" src="bfdsUtil.js"></script>    
    <script type="text/javascript" src="bfdsFirmAndMgmtCo.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {        	
        	bfdsmgr.firmmgmtco.editFirmAndMgmtCo();
			bfdsmgr.firmmgmtco.setupEventHandlers();        	
        });
     </script>
</head>
<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>
<div class="bfdsmgrMgmtBody">
        <div id="editFirmAndMgmtCo">
        <input id="firm_mgmt_co_IdInput" name="firm_mgmt_co_Id" type="hidden" maxlength=10 />
        <input id="firmIdInput" name="firmId" type="hidden" maxlength=10 />
        <input id="mgmtcoIdInput" name="mgmtcoId" type="hidden" maxlength=10 />
        <table id="editFirmAndMgmtCoTable">
            <tr>
                <td align="center" colspan="5" class="bfdsmgrBoldText">
                    <h3 class="pageHeaderTableHeader">
                        Edit Firm and Management Company Xref
                    </h3>
                </td>
            </tr>
            <tr>
                <td>System</td>
                <td><input id="systemInput" name="system" type="text" maxlength=50 disabled /></td>
                <td>Company</td>
                <td><input id="companyInput" name="company" type="text" maxlength=50 disabled /></td>
            </tr>
            <tr>
                <td>Group<span class="bfdsRequired">*</span></td>
                <td><input id="groupInput" name="group" type="text" maxlength=10 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
                <td>Dealer Number<span class="bfdsRequired">*</span></td>
                <td><input id="ta2000_dealr_numInput" name="ta2000_dealr_num" type="text" maxlength=10 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
            </tr>
            <tr>
                <td>Active Indicator<br/>(Yes, No, UNK)</td>
                <td><input id="active_indInput" name="active_ind" type="text" maxlength=50 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
                <td>Active Date<br/>(yyyy-mm-dd)</td>
                <td><input id="active_dtInput" name="active_dt" type="text" maxlength=10 onchange="bfdsmgr.util.setFieldColor(this)"/></td>
            </tr>
            <tr>
                <td>Inactive Date<br/>(yyyy-mm-dd)</td>
                <td><input id="inactive_dtInput" name="inactive_dt" type="text" maxlength=50 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
                <td>DST Vision Indicator<br/>(Yes, No, N/A)</td>
                <td><input id="vision_indInput" name="vision_ind" type="text" maxlength=30 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
            </tr>
            <tr>
                <td>DST Fan Mail Indicator<br/>(Yes, No, N/A)</td>
                <td><input id="fan_mail_indInput" name="fan_mail_ind" type="text" onchange="bfdsmgr.util.setFieldColor(this)" /></td>
                <td>Omnibus Conversion Date</td>
                <td><input id="omnibus_conversion_dtInput" name="omnibus_conversion_dt" type="text" maxlength=10 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
            </tr>
            <tr>
                <td>Omniserv Indicator<br/>(Yes, No, N/A)</td>
                <td><input id="omniserv_indInput" name="omniserv_ind" type="text" onchange="bfdsmgr.util.setFieldColor(this)" /></td>
                <td>As Of Trade Window<br/>(0-180 days)</td>
                <td><input id="asof_trad_windowInput" name="asof_trad_window" type="text" maxlength=3 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
            </tr>
            <tr>
                <td>Omnibus Trade Procedure<span class="bfdsRequired">*</span></td>
                <td><select id="omnibus_trad_proc_cdDD" name="omnibus_trad_proc_cd"></select></td>
                <td>Batch Type<span class="bfdsRequired">*</span></td>
                <td><select id="batch_typ_cdDD" name="batch_typ_cd"></select></td>
            </tr>
            <tr>
                <td>Settlement Type<span class="bfdsRequired">*</span></td>
                <td><select id="settlement_typ_cdDD" name="settlement_typ_cd"></select></td>
                <td>Post Settlement Change Indicator<br/>(Yes, No, N/A)</td>
                <td><input id="post_settlement_chng_indInput" name="post_settlement_chng_ind" type="text" maxlength=3 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
            </tr>
            <tr>
                <td>PTF ACAT Transfer Indicator<br/>(Yes, No, N/A)</td>
                <td><input id="ptf_acat_trnsfr_indInput" name="ptf_acat_trnsfr_ind" type="text" onchange="bfdsmgr.util.setFieldColor(this)" /></td>
                <td>DST VHO Indicator<br/>(Yes, No, N/A)</td>
                <td><input id="dst_vho_indInput" name="dst_vho_ind" type="text" maxlength=3 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
            </tr>
            <tr>
                <td><input type="button" value="Submit" id="submitFirmnMgmtCo" onclick="bfdsmgr.firmmgmtco.updateFirmAndMgmtCo();"/></td>
            </tr>

        </table>
        </div>
    <div id="success" class="bfdsHidden">
        <h3 id="successMessage"></h3>
    </div>
</div>
</body>
</html>