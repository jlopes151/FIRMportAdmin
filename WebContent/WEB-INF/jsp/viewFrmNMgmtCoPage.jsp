<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%-- Begin HTML--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
	<!-- 
		Firm and Mgmt Co xref
	 -->
    <jsp:include page="includes/javascriptCss.jsp" />
    <title>FIRMport Admin - Firms and Management Company Xref Page</title>

    <script type="text/javascript" src="widgets/FilteredPagedGrid/filteredFirmAndMgmtCoPagedGrid.js"></script>    
    <script type="text/javascript" src="widgets/PagedGrid/pagedGrid.js"></script>
    <script type="text/javascript" src="bfdsFirmAndMgmtCo.js"></script>
    <script type="text/javascript" src="index.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
           bfdsmgr.firmmgmtco.initializeFilteredGrid();
        });        
        /*
			The following function are setup in the pagegrid _createBody method
			and highlights a row for edit or delete 

			The row highlight is set in setRowToEdit
        */
	    function setRowToEdit(event){
	    	bfdsmgr.firmmgmtco.setRowToEdit(event);
	    }
        function activateEditPage(event){
        	bfdsmgr.firmmgmtco.activateEditPage(event);
        }
    </script>
</head>

<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>
<div class="bfdsmgrMgmtBody">
     
    <div id="loading" class="bfdsmgrCenter">
        <img src="<c:url value='loading.gif'/>" alt="loading" id="loadingGif"/>
        <br />Loading...
    </div>
    
    <div id="success" class="bfdsHidden"></div>
    <%-- attach point for the filteredGrid--%>    
    <div id="title" class="bfdsmgrCenter bfdsHidden"><h3 id="titleHeader">Firm And Management Company Xref</h3></div>
    <div id="currentFirmAndMgmtCo" class="bfdsmgrMgmtBody"></div>
    
</div>
</body>
</html>