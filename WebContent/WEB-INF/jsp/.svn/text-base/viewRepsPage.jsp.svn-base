<%--
--%>
<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%@ page language="java" import="java.util.*"%>
<%-- Begin HTML --%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <jsp:include page="includes/javascriptCss.jsp" />
    <title>FIRMport Admin - Rep Page</title>

    <script type="text/javascript" src="widgets/FilteredPagedGrid/filteredPagedGrid.js"></script>    
    <script type="text/javascript" src="widgets/PagedGrid/pagedGrid.js"></script>
    <script type="text/javascript" src="bfdsRep.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
           bfdsmgr.rep.initializeFilteredGrid();
        });
        /*
        	The following function are setup in the pagegrid _createBody method
			and highlights a row for edit or delete 

			The row highlight is set in setRowToEdit
        */
        function setRowToEdit(event){
        	bfdsmgr.rep.setRowToEdit(event);
        }
        function activateEditPage(event){
        	bfdsmgr.rep.activateEditPage(event);
        }
    </script>
</head>
<body class="bfdsmgrText">
<%-- --%>
<%@include file="includes/header.jsp" %>
<div class="bfdsmgrMgmtBody">
    <div id="loading" class="bfdsmgrCenter">
        <img src="<c:url value='loading.gif'/>" alt="loading" id="loadingGif"/>
        <br />Loading...
    </div>
    
    <div id="success" class="bfdsHidden bfdsmgrCenter"></div>
    <%-- attach point for the filteredGrid--%>
    <div id="title" class="bfdsmgrCenter bfdsHidden"><h3 id="titleHeader">Reps</h3></div>
    <div id="currentRep" class="bfdsmgrMgmtBody"></div>    
</div>
</body>
</html>