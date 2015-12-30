<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%-- Begin HTML--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
	<!-- 
		Firm and Mgmt Co xref
	 -->
    <jsp:include page="includes/javascriptCss.jsp" />
    <title>FIRMport Admin - TA2000 Sub Firms Page</title>

    <script type="text/javascript" src="widgets/FilteredPagedGrid/filteredTA2kSubFirmPagedGrid.js"></script>    
    <script type="text/javascript" src="widgets/PagedGrid/ta2kSubFirmPagedGrid.js"></script>
    <script type="text/javascript" src="bfdsTA2000SubFirm.js"></script>
    <script type="text/javascript" src="index.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
           	bfdsmgr.tasf.initializeFilteredGrid();

			bfdsmgr.tasf.getTA2000SubFirmType();
			
        });        
        /*
			The following function are setup in the pagegrid _createBody method
			and highlights a row for edit or delete 

			The row highlight is set in setRowToEdit
        */
	    function setRowToEdit(event){
	    	bfdsmgr.tasf.setRowToEdit(event);
	    }
        function activateEditPage(event){
        	bfdsmgr.tasf.activateEditPage(event);
        }
    </script>
</head>

<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>
<input id="hidn_field_dsc1" type="hidden" /> 
<input id="hidn_field_dsc2" type="hidden" />
<input id="hidn_field_cd1" type="hidden" /> 
<input id="hidn_field_cd2" type="hidden" />
 
<div id="ta2kSubFirmDialog" title="" class="bfdsHidden">
	<table align="center" width=400>
		<tr>
			<td>
				<div>
					<label id="tar_lst1_lbl1"></label>
					<select id="tar_lst1_frm" style="width:250px" size=10 multiple ></select>
				</div>
			</td>		
			<td>
				<table align="center" width="auto">
<!--					
					<tr>
						<td align="center"><input type="button" value="&gt;&gt;" onclick="bfdsmgr.util.addAll('#tar_lst1_frm', '#tar_lst1_to')" 
						/></td>
					</tr>
  -->					
					<tr>
						<td align="center"><input type="button" value="&gt;" onclick="bfdsmgr.util.add('#tar_lst1_frm', '#tar_lst1_to')" 
						/></td>
					</tr>
					<tr>
						<td align="center"><input type="button" value="&lt;" onclick="bfdsmgr.util.remove('#tar_lst1_frm', '#tar_lst1_to')"  
						/></td>
					</tr>
<!--					
					<tr>
						<td align="center"><input type="button" value="&lt;&lt;" onclick="bfdsmgr.util.removeAll('#tar_lst1_frm', '#tar_lst1_to')"  
						/></td>
					</tr>
  -->					
				</table>
			</td>		
			<td>
				<div>
					<label id="tar_lst1_lbl2"></label>
					<select id="tar_lst1_to" style="width:250px" size=10 multiple ></select>
				</div>
			</td>		
		</tr>
	</table>
	<table align="center" width=400>
		<tr>
			<td>
				<div>
					<label id="tar_lst2_lbl1"></label>
					<select id="tar_lst2_frm" style="width:250px" size=10 multiple ></select>
				</div>
			</td>		
			<td>
				<table align="center" width="auto">
<!-- 
					<tr>
						<td align="center"><input type="button" value="&gt;&gt;" onclick="bfdsmgr.util.addAll('#tar_lst2_frm', '#tar_lst2_to')" 
						/></td>
					</tr>
  -->					
					<tr>
						<td align="center"><input type="button" value="&gt;" onclick="bfdsmgr.util.add('#tar_lst2_frm', '#tar_lst2_to')" 
						/></td>
					</tr>
					<tr>
						<td align="center"><input type="button" value="&lt;" onclick="bfdsmgr.util.remove('#tar_lst2_frm', '#tar_lst2_to')"  
						/></td>
					</tr>
<!-- 
					<tr>
						<td align="center"><input type="button" value="&lt;&lt;" onclick="bfdsmgr.util.removeAll('#tar_lst2_frm', '#tar_lst2_to')"  
						/></td>
					</tr>
  -->					
				</table>
			</td>		
			<td>
				<div>
					<label id="tar_lst2_lbl2"></label>
					<select id="tar_lst2_to" style="width:250px" size=10 multiple ></select>
				</div>
			</td>		
		</tr>
	</table>
</div>
<div class="bfdsmgrMgmtBody">
     
    <div id="loading" class="bfdsmgrCenter">
        <img src="<c:url value='loading.gif'/>" alt="loading" id="loadingGif"/>
        <br />Loading...
    </div>
    
    <div id="success" class="bfdsHidden"></div>
    <%-- attach point for the filteredGrid--%>    
    <div id="title" class="bfdsmgrCenter bfdsHidden"><h3 id="titleHeader">TA2000 Sub Firms</h3></div>
    <div id="currentTA2000SubFirm" class="bfdsmgrMgmtBody"></div>
    
</div>
</body>
</html>