<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
	<head>
        <meta http-equiv="X-UA-COMPATIBLE" content="IE=8">
		<meta http-equiv="expires"content="0">
		<title>FIRMport Admin</title>
		<jsp:include page="includes/javascriptCss.jsp"/>
        <link rel="stylesheet" type="text/css" href="index.css" />
        <script type="text/javascript" src="index.js"></script>
    	<script type="text/javascript" src="bfdsFirm.js"></script>
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
                <li class="sliding-element"><a href="#">Parent Firm</a>
					<ul id="subMenu0">
						<li><a id="view_short_firms" class="sub-menu-element" href="#" onclick="setFieldPage('viewFirmsPage');return true">Streamline View</a></li>
                        <li><a id="add_firms" class="sub-menu-element" href="#" onclick="setFieldPage('addFirmPage');return true">Add</a></li> 
<!-- 					<li><a id="delete_firms" class="sub-menu-element" href="#" onclick="setFieldPage('deleteFirmPage');return true">Delete</a></li> -->
					</ul>
				</li>

                <%-- Menu 2 --%>
                <li class="sliding-element"><a href="#">TA2000 Sub Firm</a>
					<ul id="subMenu3">
						<li><a id="view_fam" class="sub-menu-element" href="#" onclick="setFieldPage('viewTA2000SubFirmPage');return true">View</a></li>
						<li><a id="delete_fam" class="sub-menu-element" href="#" onclick="setFieldPage('deleteFrmNMgmtCoPage');return true">Delete</a></li>
					</ul>
				</li>

                <%-- Menu 3 --%>
                <li class="sliding-element"><a href="#">Company/Trust/Firm</a>
					<ul id="subMenu6">
						<li><a id="view_fam" class="sub-menu-element" href="#" onclick="setFieldPage('viewFirmCoTrustFirmPage');return true">View</a></li>
						<li><a id="add_fam" class="sub-menu-element" href="#" onclick="setFieldPage('addFirmCoTrustFirmPage');return true">Add</a></li>
						<li><a id="delete_fam" class="sub-menu-element" href="#">Delete</a></li>
					</ul>
				</li>

                <%-- Menu 4 --%>
                <li class="sliding-element"><a href="#">Company/Trust/TPA/Firm</a>
					<ul id="subMenu10">
						<li><a id="view_fam" class="sub-menu-element" href="#" >View</a></li>
						<li><a id="add_fam" class="sub-menu-element" href="#" >Add</a></li>
						<li><a id="delete_fam" class="sub-menu-element" href="#" >Delete</a></li>
					</ul>
				</li>

                <%-- Menu 5 --%>
                <li class="sliding-element"><a href="#">Fund/Class Agreement</a>
					<ul id="subMenu14">
						<li><a id="view_fam" class="sub-menu-element" href="#" onclick="setFieldPage('viewFrmNMgmtCoPage');return true">View</a></li>
						<li><a id="add_fam" class="sub-menu-element" href="#" onclick="setFieldPage('addFrmNMgmtCoPage');return true">Add</a></li>
						<li><a id="delete_fam" class="sub-menu-element" href="#" onclick="bfdsmgr.firmmgmtco.deleteFrmNMgmtCoPage();return true">Delete</a></li>
					</ul>
				</li>

                <%-- Menu 6 --%>
                <li class="sliding-element"><a href="#">Main Page</a>
					<ul id="subMenu18">
						<li><a id="admin" class="sub-menu-element" href="mainPage">Main Page</a></li>
					</ul>
				</li>

            </ul>
			<jsp:include page="includes/footer.jsp" />
        </div>
        <%-- Activate the default page --%>
		<div>
			<iframe src="viewFirmsPage" id="field-block" frameborder="0"></iframe>
		</div>
	</body>
</html>