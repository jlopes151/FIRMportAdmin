<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%--Begin HTML--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <jsp:include page="includes/javascriptCss.jsp" />
    <title>FIRMport Admin - Edit Exception Page</title>
    <script type="text/javascript" src="bfdsUtil.js"></script>    
    <script type="text/javascript" src="bfdsExceptions.js"></script>
 	<script type="text/javascript" src="ckeditor.js"></script>
	<script type="text/javascript" src="adapters/jquery.js"></script>	
	<script type="text/javascript" src="config.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
        	bfdsmgr.excptn.editExceptionsPage();
           	$( '#excptn_dscInput' ).ckeditor();
           	// Admin_tb defined in config.js
           	CKEDITOR.config.toolbar = 'Admin_tb';
        });
    </script>
</head>
<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>
<div class="bfdsmgrMgmtBody">
        <div id="editException">
          <div style="text-align: center;">
			<h3 class="pageHeaderTableHeader">Edit Exception</h3>
          <div id="cntcttxtdiv">
          	<textarea id="excptn_dscInput" rows="5" cols="100"></textarea>
          </div>          
          <br/>
          <div style="float: left;">
			<input type="button" value="Submit" id="submitException" onclick="bfdsmgr.excptn.updateException();"/>
          </div>
    </div>
    <br/>
    <div id="success" class="bfdsHidden">
        <h3 id="successMessage"></h3>
    </div>
</div>
</body>
</html>