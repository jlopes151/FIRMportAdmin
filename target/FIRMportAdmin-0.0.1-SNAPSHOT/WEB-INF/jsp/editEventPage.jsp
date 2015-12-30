<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%--Begin HTML--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <jsp:include page="includes/javascriptCss.jsp" />
    <title>FIRMport Admin - Edit Event Page</title>
    <script type="text/javascript" src="bfdsUtil.js"></script>    
    <script type="text/javascript" src="bfdsEvents.js"></script>
	<script type="text/javascript" src="ckeditor.js"></script>
	<script type="text/javascript" src="adapters/jquery.js"></script>	
	<script type="text/javascript" src="config.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
			// a valid firm id is associated with this event
           	bfdsmgr.event.editEventPage();
            $( '#event_dscInput' ).ckeditor();
           	// Admin_tb defined in config.js
            CKEDITOR.config.toolbar = 'Admin_tb';           	
        });
    </script>
</head>
<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>
<div class="bfdsmgrMgmtBody">
        <div id="editEvent">
		<div style="text-align: center">
			<h3 class="pageHeaderTableHeader">Edit Event</h3>
		</div>
       	<div class="bfdsRequired"><span style='position: absolute; top: 30px; left: 10px;'>required fields *</span></div>
       	<div class="bfdsRequired"><span style='position: absolute; top: 109px; left: 10px;'>An event description is required</span></div>
       	<div class="bfdsRequired"><span style='position: absolute; top: 70px; left: 812px;'>Format: yyyy-mm-dd</span></div>
        <div id="companyDialog" title="Company" class="bfdsHidden"></div>
        <div>
            <input id="companySubmit" name="company" type="submit" value="Company" onclick="bfdsmgr.event.companyDialog();"/><span class="bfdsRequired">*</span>
        </div>
        <br/>
	    <div>
			<label>Type<span class="bfdsRequired">*</span></label>
			<select id="event_typ_cdDD" name="event_typ_cd" onchange="bfdsmgr.util.setFieldColor(this)"></select>
            &nbsp;
			<label>Title<span class="bfdsRequired">*</span></label>
			<input id="event_titleInput" name="event_title" type="text" maxlength=75 size=75 onchange="bfdsmgr.util.setFieldColor(this)"/>
            &nbsp;
			<label>Date<span class="bfdsRequired">*</span></label>
			<input id="event_dtInput" name="event_dt" type="text" maxlength=10 onchange="bfdsmgr.util.setFieldColor(this)"/>
		</div>
		<br/>
		<textArea id="event_dscInput" name="event_dsc" cols=100 rows=5 title="1000 character limit"></textArea>
	    <br/>
		<input type="button" value="Submit" id="submitEvent" onclick="bfdsmgr.event.updateEvent();"/>
	    <br/>
	    <div id="success" class="bfdsHidden">
	        <h3 id="successMessage"></h3>
	    </div>
</div>
</body>
</html>