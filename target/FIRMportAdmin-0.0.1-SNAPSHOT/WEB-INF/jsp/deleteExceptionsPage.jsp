<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%--Begin HTML--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <jsp:include page="includes/javascriptCss.jsp" />
    <title>FIRMport Admin - Delete Exception Page</title>
    <script type="text/javascript" src="bfdsUtil.js"></script>    
    <script type="text/javascript" src="bfdsExceptions.js"></script>
 	<script type="text/javascript" src="ckeditor.js"></script>
	<script type="text/javascript" src="adapters/jquery.js"></script>	
	<script type="text/javascript" src="config.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
			bfdsmgr.excptn.deleteException();
        });
    </script>
</head>
<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>
<div class="bfdsmgrMgmtBody">
     <div id="addException">
        <div style="text-align: center;">
			<h3 class="pageHeaderTableHeader">Delete Exception</h3>
        </div>
     </div>
    <div id="success" class="bfdsHidden">
        <h3 id="successMessage"></h3>
    </div>
</div>
</body>
</html>