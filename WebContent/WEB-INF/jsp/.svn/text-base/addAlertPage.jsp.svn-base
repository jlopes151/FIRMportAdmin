<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%@ taglib uri="http://ckeditor.com" prefix="ckeditor" %>
<%--Begin HTML--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <jsp:include page="includes/javascriptCss.jsp" />
    <title>FIRMport Admin - Add Alert Page</title>
    <script type="text/javascript" src="bfdsUtil.js"></script>    
    <script type="text/javascript" src="bfdsAlerts.js"></script>
	<script type="text/javascript" src="ckeditor.js"></script>
	<script type="text/javascript" src="config.js"></script>
	<script type="text/javascript" src="adapters/jquery.js"></script>	
    <script type="text/javascript">
        $(document).ready(function() {
           bfdsmgr.alert.getAlertType();
           /*
              ToDo: move these two to the bfdsUtil.js
              rename getSystem, getcompany other pages need to get the System, 
              Company.
              For now they are:
	              Alert
	              Contact
              Done: Moved the Mapper, Service, Controller
            */
           bfdsmgr.alert.getSystem();
           bfdsmgr.alert.getCompany();
           bfdsmgr.alert.getShortNames();
           $( '#alert_dscInput' ).ckeditor();
           // Admin_tb defined in config.js
           CKEDITOR.config.toolbar = 'Admin_tb';
        });        
    </script>
</head>
<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>
<div class="bfdsmgrMgmtBody">
        <div id="addAlert">
            <div style="text-align: center;">
				<h3 class="pageHeaderTableHeader">Add Alert</h3>
            </div>
            <div id="systemDialog" title="Inter" class="bfdsHidden"></div>
            <div id="companyDialog" title="Company" class="bfdsHidden"></div>
            <div id="alertTypeDialog" title="Alert Types" class="bfdsHidden"></div>
            <div>
       			<div class="bfdsRequired"><span style='position: absolute; top: 135px; left: 10px;'>An alert description is required</span></div>
       	    	<div class="bfdsRequired"><span style='position: absolute; left: 10px;'>required fields *</span></div><br/><br/>
				<label>Short Name<span class="bfdsRequired">*</span></label>
				<input id="short_nmInput" name="event_title" type="text" maxlength=25 size=25 onchange="bfdsmgr.util.setFieldColor(this)" />
		        &nbsp;
				<input id="firmSrchSub" name="firmSrch" type="submit" value="Inter"  onclick="bfdsmgr.alert.doFirmSrch();"/>
	            &nbsp;
                <input id="companySubmit" name="company" type="submit" value="Company" onclick="bfdsmgr.alert.companyDialog();"/>
                &nbsp;
                <input id="alert_typeSubmit" name="alert_type" type="submit" value="Type" onclick="bfdsmgr.alert.alertTypeDialog();"/><span class="bfdsRequired">*</span>
                &nbsp;
                <input id="global_alertSubmit" name="global_alert" type="submit" value="Global Alert" onclick="bfdsmgr.alert.setGlobalAlert();"/>
            </div>
            <br/>
            <div>
                <label>Title<span class="bfdsRequired">*</span></label>
                <input id="alert_titleInput" name="alert_title" type="text"	maxlength=75 size=75 onchange="bfdsmgr.util.setFieldColor(this)"/>
                &nbsp;&nbsp;
            </div>
            <br/>
            <div>
				<textArea id="alert_dscInput" title="Description - 1000 character limit" name="alert_dsc" cols=100 rows=5 title="1000 character limit"
				 onmouseout="bfdsmgr.alert.maxEventDsc(this)"></textArea>
            </div>
            <br/>
            <div>
				<input type="button" value="Submit" id="submitAlert" onclick="bfdsmgr.alert.addAlert();"/>
            </div>
        </div>
    <div id="success" class="bfdsHidden">
        <h3 id="successMessage"></h3>
    </div>
</div>
</body>
</html>