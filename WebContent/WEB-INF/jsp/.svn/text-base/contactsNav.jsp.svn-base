<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
	<head>
		<!-- the title is set in the index.js -->
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
                <li class="sliding-element"><a href="#">Manage Contacts</a>
					<ul id="subMenu0">
						<li><a id="view_contact" class="sub-menu-element" href="#" onclick="setFieldPage('viewContactsPage');return true">View</a></li>
						<li><a id="add_contact" class="sub-menu-element" href="#" onclick="setFieldPage('addContactsPage');return true">Add</a></li>
						<li><a id="delete_contact" class="sub-menu-element" href="#" onclick="setFieldPage('deleteContactPage');return true">Delete</a></li>
					</ul>
				</li>
				
                <%-- Menu 2 --%>
                <li class="sliding-element"><a href="#">Company Xref</a>
					<ul id="subMenu4">
						<li><a id="view_contact" class="sub-menu-element" href="#" onclick="setFieldPage('viewCntctMgmtCoXrfPage');return true">View</a></li>
						<li><a id="add_contact" class="sub-menu-element" href="#" onclick="setFieldPage('addCntctMgmtCoXrfPage');return true">Add</a></li>
						<li><a id="delete_contact" class="sub-menu-element" href="#" onclick="setFieldPage('deleteCntctMgmtCoXrfPage');return true">Delete</a></li>
					</ul>
				</li>
				
                <%-- Menu 3 --%>
                <li class="sliding-element"><a href="#">Company/Group Xref</a>
					<ul id="subMenu8">
						<li><a id="view_contact" class="sub-menu-element" href="#" onclick="setFieldPage('viewCntctMgmtCoGrpXrfPage');return true">View</a></li>
						<li><a id="add_contact" class="sub-menu-element" href="#" onclick="setFieldPage('addCntctMgmtCoGrpXrfPage');return true">Add</a></li>
						<li><a id="delete_contact" class="sub-menu-element" href="#" onclick="setFieldPage('deleteCntctMgmtCoGrpXrfPage');return true">Delete</a></li>
					</ul>
				</li>
				
                <%-- Menu 5 --%>
                <li class="sliding-element"><a href="#">Main</a>
					<ul id="subMenu12">
						<li><a id="admin" class="sub-menu-element" href="mainPage">Main Page</a></li>
					</ul>
				</li>

            </ul>
			<jsp:include page="includes/footer.jsp" />
        </div>
        <%-- Activate the default page --%>
		<div>
			<iframe src="viewContactsPage" id="field-block" frameborder="0"></iframe>
		</div>
	</body>
</html>