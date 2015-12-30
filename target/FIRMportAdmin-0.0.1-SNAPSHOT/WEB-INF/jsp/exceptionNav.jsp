<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
	<head>
        <meta http-equiv="X-UA-COMPATIBLE" content="IE=8">
		<!-- the title is set in the index.js -->
		<meta http-equiv="expires"content="0">
		<title>FIRMport Admin</title>
		<jsp:include page="includes/javascriptCss.jsp"/>
        <script type="text/javascript" src="index.js"></script>
        <link rel="stylesheet" type="text/css" href="index.css" />
	</head>
	<body>
		<!-- set in index.js -->
		<h1 id="navPageH1"></h1>

 		<img src="bfds_logo.png" style='position: absolute; top: 10px; left: 25px;'/>		
        <%-- username --%>
        <h4 style='position: absolute; top: 50px; left: 5px;'>Welcome <label class="bfdsmgrText"><%=request.getRemoteUser()%></label></h4>
        <br/>
        <!--  
        	instruction on how to maintain this menu structure can be found in the index.js 
        -->
		<div id="navigation-block">
        	<ul id="sliding-navigation">

                <%-- Menu 1 --%>
                <li class="sliding-element"><a href="#">Exceptions</a>
					<ul id="subMenu0">
						<li><a id="view_excep" class="sub-menu-element" href="#" onclick="setFieldPage('viewExceptionsPage');return true">View</a></li>
						<li><a id="add_excep" class="sub-menu-element" href="#" onclick="setFieldPage('addExceptionsPage');return true">Add</a></li>
						<li><a id="delete_excep" class="sub-menu-element" href="#" onclick="setFieldPage('admin/add');return true">Delete</a></li>
					</ul>
				</li>

                <%-- Menu 2 --%>
                <li class="sliding-element"><a href="#">Main Page</a>
					<ul id="subMenu4">
						<li><a id="admin" class="sub-menu-element" href="mainPage">Main Page</a></li>
					</ul>
				</li>

            </ul>
			<jsp:include page="includes/footer.jsp" />
        </div>
        <%-- Activate the default page --%>
		<div>
			<iframe src="viewExceptionsPage" id="field-block" frameborder="0"></iframe>
		</div>
	</body>
</html>