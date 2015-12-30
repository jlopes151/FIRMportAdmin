<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%@ taglib uri="http://ckeditor.com" prefix="ckeditor" %>
<%--Begin HTML--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <jsp:include page="includes/javascriptCss.jsp" />
    <title>FIRMport Admin - Add Transmission Page</title>
    <script type="text/javascript" src="bfdsUtil.js"></script>    
    <script type="text/javascript" src="bfdsTransmissions.js"></script>
	<script type="text/javascript" src="ckeditor.js"></script>
	<script type="text/javascript" src="config.js"></script>
	<script type="text/javascript" src="adapters/jquery.js"></script>	
    <script type="text/javascript">
        $(document).ready(function(){
        	bfdsmgr.trans.getSystem();
        	bfdsmgr.trans.getCompany();
        	bfdsmgr.trans.getTransFileType();
        	bfdsmgr.trans.getPosFileSched();
        });        
    </script>
</head>
<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>
<div class="bfdsmgrMgmtBody">
        <div id="addTransmission">
            <div style="text-align: center;">
				<h3 class="pageHeaderTableHeader">Add Transmission</h3>
            </div>
            <div id="systemDialog" title="System" class="bfdsHidden"></div>
            <div id="companyDialog" title="Company" class="bfdsHidden"></div>
            <div id="transFileTypeDialog" title="File Type" class="bfdsHidden"></div>
            <div id="posFileSchedDialog" title="Position File Schedule" class="bfdsHidden"></div>
            <div>
                <label>Select:</label>
                &nbsp;
                <input id="systemSubmit" name="system" type="submit" value="System" onclick="bfdsmgr.trans.systemDialog()"/>
                &nbsp;
                <input id="companySubmit" name="company" type="submit" value="Company" onclick="bfdsmgr.trans.companyDialog();"/>
                &nbsp;
                <input id="transFileTypeSubmit" name="transFileType" type="submit" value="File Type" 
                onclick="bfdsmgr.trans.transFileTypeDialog()"/>
                &nbsp;
                <input id="posFileSchedSubmit" name="posFileSched" type="submit" value="Position File Schedule" 
                onclick="bfdsmgr.trans.posFileSchedDialog();"/>
            </div>
            <br/>
            <div>
				<input type="button" value="Submit" id="submitTrans" onclick="bfdsmgr.trans.addTransmission();"/>
            </div>
        </div>
    <div id="success" class="bfdsHidden">
        <h3 id="successMessage"></h3>
    </div>
</div>
</body>
</html>