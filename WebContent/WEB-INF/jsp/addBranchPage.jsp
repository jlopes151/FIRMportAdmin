<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%@ taglib uri="http://ckeditor.com" prefix="ckeditor" %>
<%--Begin HTML--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <jsp:include page="includes/javascriptCss.jsp" />
    <title>FIRMport Admin - Add Branch Page</title>
    <script type="text/javascript" src="bfdsUtil.js"></script>    
    <script type="text/javascript" src="bfdsBranch.js"></script>
	<script type="text/javascript" src="ckeditor.js"></script>
	<script type="text/javascript" src="config.js"></script>
	<script type="text/javascript" src="adapters/jquery.js"></script>	
    <script type="text/javascript">
        $(document).ready(function() {
           bfdsmgr.branch.getSystem();
        });        
    </script>
</head>
<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>
<div class="bfdsmgrMgmtBody">
        <div id="addBranch">
            <div style="text-align: center;">
				<h3 class="pageHeaderTableHeader">Add Branch</h3>
            </div>
            <div id="systemDialog" title="System" class="bfdsHidden"></div>
            <div>
                <label>Select:</label>
                &nbsp;
                <input id="systemSubmit" name="system" type="submit" value="System" onclick="bfdsmgr.branch.systemDialog()"/>
            </div>
            <br/>
            <table>
	            <tr>
	                <td>Branch</td>
	                <td><input id="branch_cdInput" name="branch_cd" type="text" maxlength=15 size=15 onchange="bfdsmgr.util.setFieldColor(this)"/></td>
	                <td>Address1</td>
	                <td><input id="branch_address1Input" name="branch_adress1" type="text" maxlength=50 size=50 onchange="bfdsmgr.util.setFieldColor(this)"/></td>
	            </tr>
	            <tr>
	                <td>Address2</td>
	                <td><input id="branch_address2Input" name="branch_adress2" type="text" maxlength=50 size=50 onchange="bfdsmgr.util.setFieldColor(this)"/></td>
	                <td>City</td>
	                <td><input id="branch_cityInput" name="branch_city" type="text" maxlength=50 size=50 onchange="bfdsmgr.util.setFieldColor(this)"/></td>
	            </tr>
	            <tr>
	                <td>State</td>
	                <td><input id="branch_state_cdInput" name="branch_state_cd" type="text" maxlength=10 size=10 onchange="bfdsmgr.util.setFieldColor(this)"/></td>
	                <td>Zip</td>
	                <td><input id="branch_zip_cdInput" name="branch_zip_cd" type="text" maxlength=5 size=5 onchange="bfdsmgr.util.setFieldColor(this)"/></td>
	            </tr>
            </table>
            <br/>
            <div>
				<input type="button" value="Submit" id="submitBranch" onclick="bfdsmgr.branch.addBranch();"/>
            </div>
        </div>
    <div id="success" class="bfdsHidden">
        <h3 id="successMessage"></h3>
    </div>
</div>
</body>
</html>