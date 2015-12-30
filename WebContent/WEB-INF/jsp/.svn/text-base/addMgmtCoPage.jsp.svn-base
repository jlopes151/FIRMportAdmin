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
        });
	</script>        
</head>
<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>
<div class="bfdsmgrBody">
        <div id="addMgmtCo">
        <table id="addMgmtCoTable">
            <tr>
           		<td class="bfdsRequired"><span style='position: absolute; left: 10px;'>required fields *</span></td>
                <td align="center" colspan="5" class="bfdsmgrBoldText">
                    <h3 class="pageHeaderTableHeader">
                        Add Management Company
                    </h3>
                </td>
            </tr>
            <tr>
                <td>Company<span class="bfdsRequired">*</span></td>
                <td><input id="ta2000_co_cdDD" name="ta2000_co_cd" type="text" maxlength=2 size=2 onchange="bfdsmgr.util.setFieldColor(this)"/></td>
                <td>System<span class="bfdsRequired">*</span></td>
                <td><input id="ta2000_sys_cdDD" name="ta2000_sys_cd" type="text" maxlength=3 size=3 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
            </tr>
            <tr>
                <td>Long Name<span class="bfdsRequired">*</span></td>
                <td><input id="mgmt_co_long_nmInput" name="mgmt_co_long_nm" type="text" maxlength=50 size=50 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
                <td>Short Name<span class="bfdsRequired">*</span></td>
                <td><input id="mgmt_co_short_nmInput" name="mgmt_co_short_nm" type="text" maxlength=10 size=10 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
            </tr>
            <tr>
                <td>Relationship Manager Name</td>
                <td><input id="relationship_mgr_nmInput" name="relationship_mgr_nm" type="text" maxlength=50 size=30 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
                <td>Fund Sponsor<span class="bfdsRequired">*</span></td>
                <td><input id="fund_sponsor_cdDD" name="fund_sponsor_cd" type="text" maxlength=3 size=3 onchange="bfdsmgr.util.setFieldColor(this)" /></td>
            </tr>
            <tr>
                <td><input type="button" value="Submit" id="submitAddMgmtCo" onclick="bfdsmgr.mgmtco.addMgmtCo();"/></td>
            </tr>

        </table>
        </div>
    <div id="success" class="bfdsHidden">
        <h3 id="successMessage"></h3>
    </div>
</div>
</body>
</html>