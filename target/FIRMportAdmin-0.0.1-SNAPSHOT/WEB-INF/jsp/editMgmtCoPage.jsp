<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%--Begin HTML--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <jsp:include page="includes/javascriptCss.jsp" />
    <title>FIRMport Admin - Management Company Page</title>
    <script type="text/javascript" src="bfdsUtil.js"></script>    
    <script type="text/javascript" src="bfdsMgmtCo.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
        	bfdsmgr.mgmtco.editMgmtCoPage();
        });
     </script>
</head>
<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>
<div class="bfdsmgrMgmtBody">
        <div id="editMgmtCo">
        <input id="mgmt_co_idHidden" name="mgmt_co_id" type="hidden" />
        <input id="lst_updt_useridInput" name="lst_updt_userid" type="hidden" maxlength=10 />
        <input id="lst_updt_dtmInput" name="lst_updt_dtm" type="hidden" maxlength=10 />
        <table id="editMgmtCoTable">
            <tr>
                <td align="center" colspan="5" class="bfdsmgrBoldText">
                    <h3 class="pageHeaderTableHeader">
                        Edit Management Company
                    </h3>
                </td>
            </tr>
            <tr>
                <td>Company<span class="bfdsRequired">*</span></td>
                <td><input id="ta2000_co_cdDD" name="ta2000_co_cd" type="text" maxlength=2 size=2 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
                <td>System<span class="bfdsRequired">*</span></td>
                <td><input id="ta2000_sys_cdDD" name="ta2000_sys_cd" type="text" maxlength=3 size=3 onchange="bfdsmgr.util.setFieldColor(this)"/></td>
            </tr>
            <tr>
                <td>Long Name<span class="bfdsRequired">*</span></td>
                <td><input id="mgmt_co_long_nmInput" name="mgmt_co_long_nm" type="text" maxlength=50 size=50 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
                <td>Short Name</td>
                <td><input id="mgmt_co_short_nmInput" name="mgmt_co_short_nm" type="text" maxlength=10 size=10 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
            </tr>
            <tr>
                <td>Relationship Manager Name</td>
                <td><input id="relationship_mgr_nmInput" name="relationship_mgr_nm" type="text" maxlength=50 size=30 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
                <td>Fund Sponsor<span class="bfdsRequired">*</span></td>
                <td><input id="fund_sponsor_cdDD" name="fund_sponsor_cd" type="text" maxlength=3 size=3 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
            </tr>
            <tr>
                <td><input type="button" value="Submit" id="submitEditMgmtCo" onclick="bfdsmgr.mgmtco.updateMgmtCo();"/></td>
            </tr>

        </table>
        </div>
    <div id="success" class="bfdsHidden">
        <h3 id="successMessage"></h3>
    </div>
</div>
</body>
</html>