<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%--Begin HTML--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <jsp:include page="includes/javascriptCss.jsp" />
    <title>FIRMport Admin - Edit Alert Page</title>
    <script type="text/javascript" src="bfdsUtil.js"></script>    
    <script type="text/javascript" src="bfdsAlerts.js"></script>
	<script type="text/javascript" src="ckeditor.js"></script>
	<script type="text/javascript" src="adapters/jquery.js"></script>	
	<script type="text/javascript" src="config.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
        	// setup the dialogs 
           	bfdsmgr.alert.getAlertType();
           	bfdsmgr.alert.getCompany();
           	// get the alert data
           	bfdsmgr.alert.editAlertPage();
           	// this is required so ckeditor can work
            $( '#alert_dscInput' ).ckeditor();
           	// Admin_tb defined in config.js
            CKEDITOR.config.toolbar = 'Admin_tb';           	
        });        
    </script>
</head>
<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>
<div class="bfdsmgrMgmtBody">
        <div id="editAlert">
            <div style="text-align: center;">
				<h3 class="pageHeaderTableHeader">Edit Alert</h3>
            </div>
       	    <div class="bfdsRequired"><span style='position: absolute; top: 30px; left: 10px;'>required fields *</span></div>
       		<div class="bfdsRequired"><span style='position: absolute; top: 110px; left: 10px;'>An alert description is required</span></div>
            <div id="companyDialog" title="Company" class="bfdsHidden"></div>
            <div id="alertTypeDialog" title="Alert Types" class="bfdsHidden"></div>
            <div>
                <label>Select:</label>
                &nbsp;
                <input id="companySubmit" name="company" type="submit" value="Company" onclick="bfdsmgr.alert.companyDialog();"/>
                &nbsp;
                <input id="alert_typeSubmit" name="alert_type" type="submit" value="Type" onclick="bfdsmgr.alert.alertTypeDialog();"/><span class="bfdsRequired">*</span>
            </div>
            <br/>
            <div>
                <label>Title<span class="bfdsRequired">*</span></label>
                &nbsp;
                <input id="alert_titleInput" name="alert_title" type="text" maxlength=75 size=75/>
            </div>
            <br/>
            <div>
				<textArea id="alert_dscInput" title="Description - 1000 character limit" name="alert_dsc" cols=100 rows=5 title="1000 character limit"></textArea>
            </div>
            <br/>
            <div>
				<input type="button" value="Submit" id="submitAlert" onclick="bfdsmgr.alert.updateAlert();"/>
            </div>
        </div>
    <div id="success" class="bfdsHidden">
        <h3 id="successMessage"></h3>
    </div>
</div>
</body>
</html>