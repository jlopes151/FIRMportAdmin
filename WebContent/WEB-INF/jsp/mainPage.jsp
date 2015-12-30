<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
	<head>
        <meta http-equiv="X-UA-COMPATIBLE" content="IE=9">
		<title>FIRMport Admin</title>
		<jsp:include page="includes/javascriptCss.jsp"/>
        <script type="text/javascript" src="index.js"></script>
        <link rel="stylesheet" type="text/css" href="index.css" />
	    <script type="text/javascript">
	        $(document).ready(function() {
	        	// need to set the css based on the browser name
	        });        
	    </script>
	</head>
	<body>
 		<div id="example"></div>

		<img src="bfds_logo.png" style='position: absolute; top: 10px; left: 25px;'/>		

		<h1 style='position: absolute; top: 70px; left: 5px;'>FIRMport Admin</h1>

        <%-- username --%>
        <h4 style='position: absolute; top: 80px; left: 5px;'>Welcome <label class="bfdsmgrText"><%=request.getRemoteUser()%></label></h4>
        <br/>
        <%-- 
        	All navs are defined in the HomeController, can set acls there
         --%>
		<div id="mainMenuDiv" class="mainMenuDiv">
			<div class="mainMenuGroupDiv">
					<div class="mainMenuGroupItemDiv"><a href="firmsNav">Manage Firm</a></div>
					<div class="mainMenuGroupItemDiv"><a href="alertsNav">Alerts</a></div>
			</div>
			<div class="mainMenuGroupDiv">
					<div class="mainMenuGroupItemDiv"><a href="mgmtcoNav">Management Companies</a></div>
					<div class="mainMenuGroupItemDiv"><a href="eventsNav">Events</a></div>
			</div>
			<div class="mainMenuGroupDiv">
					<div class="mainMenuGroupItemDiv"><a href="contactsNav">Manage Contacts</a></div>
			</div>            
        </div>
	</body>
</html>