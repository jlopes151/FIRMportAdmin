<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%@ taglib uri="http://ckeditor.com" prefix="ckeditor" %>
<%--Begin HTML--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <jsp:include page="includes/javascriptCss.jsp" />
    <title>FIRMport Admin - Add Firm Company Trust Firm</title>
    <script type="text/javascript" src="bfdsUtil.js"></script>    
    <script type="text/javascript" src="bfdsFirmCoTrstFirm.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
           bfdsmgr.fctf.getCompany();
        });        
    </script>
</head>
<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>
<div class="bfdsmgrMgmtBody">
        <div id="addFirmCoTrustFirmPage">
            <div style="text-align: center;">
				<h3 class="pageHeaderTableHeader">Add Firm Company Trust Firm</h3>
            </div>
            <div id="companyDialog" title="Company" class="bfdsHidden"></div>
            <div id="trustDialog" title="Trusts" class="bfdsHidden"></div>
            <div id="systemDialog" title="System" class="bfdsHidden"></div>
            <div>
                <label>Select:</label>
                &nbsp;
                <input id="companySubmit" name="company" type="submit" value="Company" onclick="bfdsmgr.fctf.companyDialog();"/>
                &nbsp;
                <input id="trustSubmit" name="trust" type="submit" value="Trust" disabled onclick="bfdsmgr.fctf.trustDialog();"/>
                &nbsp;
                <input id="systemSubmit" name="system" type="submit" value="Inter" disabled onclick="bfdsmgr.fctf.systemDialog()"/>
            </div>
            <br/>
            <div>
				<input type="button" value="Submit" id="submitFCTF" onclick="bfdsmgr.fctf.addFrmCoTrstFrm();"/>
            </div>
        </div>
    <div id="success" class="bfdsHidden">
        <h3 id="successMessage"></h3>
    </div>
</div>
</body>
</html>