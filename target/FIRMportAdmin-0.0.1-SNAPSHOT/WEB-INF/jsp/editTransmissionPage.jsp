<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%@ taglib uri="http://ckeditor.com" prefix="ckeditor" %>
<%--Begin HTML--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <jsp:include page="includes/javascriptCss.jsp" />
    <title>FIRMport Admin - Edit Transmission Page</title>
    <script type="text/javascript" src="bfdsUtil.js"></script>    
    <script type="text/javascript" src="bfdsTransmissions.js"></script>
	<script type="text/javascript" src="ckeditor.js"></script>
	<script type="text/javascript" src="config.js"></script>
	<script type="text/javascript" src="adapters/jquery.js"></script>	
    <script type="text/javascript">
        $(document).ready(function() {
        	
        	bfdsmgr.trans.getTransFileType();
        	bfdsmgr.trans.getPosFileSched();
        	bfdsmgr.trans.editTransmission();
        				
        });        
    </script>
</head>
<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>
<div class="bfdsmgrMgmtBody">
        <div id="editTransmission">
            <div style="text-align: center;">
				<h3 class="pageHeaderTableHeader">Edit Transmission</h3>
            </div>
            <div id="transFileTypeDialog" title="File Type" class="bfdsHidden"></div>
            <div id="posFileSchedDialog" title="Position File Schedule" class="bfdsHidden"></div>
            <div>
                <label>Select:</label>
                &nbsp;
                <input id="transFileTypeSubmit" name="transFileType" type="submit" value="File Type" 
                onclick="bfdsmgr.trans.transFileTypeDialog()"/>
                &nbsp;
                <input id="posFileSchedSubmit" name="posFileSched" type="submit" value="Position File Schedule" 
                onclick="bfdsmgr.trans.posFileSchedDialog();"/>
            </div>
            <br/>
            <div>
				<input type="button" value="Submit" id="submitTrans" onclick="bfdsmgr.trans.updateTransmission();"/>
            </div>
        </div>
    <div id="success" class="bfdsHidden">
        <h3 id="successMessage"></h3>
    </div>
</div>
</body>
</html>