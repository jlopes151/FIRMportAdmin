<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%--Begin HTML--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <jsp:include page="includes/javascriptCss.jsp" />
    <title>FIRMport Admin - Delete Event Page</title>
    <script type="text/javascript" src="bfdsUtil.js"></script>    
    <script type="text/javascript" src="bfdsEvents.js"></script>
	<script type="text/javascript" src="ckeditor.js"></script>
	<script type="text/javascript" src="adapters/jquery.js"></script>	
	<script type="text/javascript" src="config.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
         /*
         	call the delete function all this page needs is the
         	header and the message div centeed it should only have
         	to confirm the delete or through an error if there wasn't
         	a row selected to delete
        */
        bfdsmgr.event.deleteEvents();
        });
    </script>
</head>
<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>
<div class="bfdsmgrMgmtBody">
	<div id="addEvent">
		<div style="text-align: center">
			<h3 class="pageHeaderTableHeader">Delete Event</h3>
		</div>
	    <div id="success" class="bfdsHidden">
	        <h3 id="successMessage"></h3>
	    </div>
	</div>
</div>
</body>
</html>