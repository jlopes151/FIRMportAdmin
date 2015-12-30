<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%@ taglib uri="http://ckeditor.com" prefix="ckeditor" %>
<%--Begin HTML--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <jsp:include page="includes/javascriptCss.jsp" />
    <title>FIRMport Admin - Edit Branch Page</title>
    <script type="text/javascript" src="bfdsUtil.js"></script>    
    <script type="text/javascript" src="bfdsBranch.js"></script>
	<script type="text/javascript" src="ckeditor.js"></script>
	<script type="text/javascript" src="config.js"></script>
	<script type="text/javascript" src="adapters/jquery.js"></script>	
    <script type="text/javascript">
        $(document).ready(function() {
           bfdsmgr.branch.editBranch();
        });        
    </script>
</head>
<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>
<div class="bfdsmgrMgmtBody">
        <div id="editBranch">
            <div style="text-align: center;">
				<h3 class="pageHeaderTableHeader">Edit Branch</h3>
            </div>
            <table>
	            <tr>
	                <td>Address1</td>
	                <td>
	                <input id="branch_address1Input" name="branch_address1" type="text" maxlength=50 size=50 onchange="bfdsmgr.util.setFieldColor(this)"/>
	                </td>
	                <td>Address2</td>
	                <td><input id="branch_address2Input" name="branch_address2" type="text" maxlength=50 size=50 onchange="bfdsmgr.util.setFieldColor(this)"/></td>
	            </tr>
	            <tr>
	                <td>City</td>
	                <td><input id="branch_cityInput" name="branch_city" type="text" maxlength=50 size=50 onchange="bfdsmgr.util.setFieldColor(this)"/></td>
	                <td>State</td>
	                <td><input id="branch_state_cdInput" name="branch_state_cd" type="text" maxlength=10 size=10 onchange="bfdsmgr.util.setFieldColor(this)"/></td>
	            </tr>
	            <tr>
	                <td>Zip</td>
	                <td><input id="branch_zip_cdInput" name="branch_zip_cd" type="text" maxlength=5 size=5 onchange="bfdsmgr.util.setFieldColor(this)"/></td>
	            </tr>
            </table>
            <br/>
            <div>
				<input type="button" value="Submit" id="submitBranch" onclick="bfdsmgr.branch.updateBranch();"/>
            </div>
        </div>
    <div id="success" class="bfdsHidden">
        <h3 id="successMessage"></h3>
    </div>
</div>
</body>
</html>