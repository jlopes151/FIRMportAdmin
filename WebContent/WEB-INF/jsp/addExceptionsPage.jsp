<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%--Begin HTML--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <jsp:include page="includes/javascriptCss.jsp" />
    <title>FIRMport Admin - Add Exception Page</title>
    <script type="text/javascript" src="bfdsUtil.js"></script>    
    <script type="text/javascript" src="bfdsExceptions.js"></script>
 	<script type="text/javascript" src="ckeditor.js"></script>
	<script type="text/javascript" src="adapters/jquery.js"></script>	
	<script type="text/javascript" src="config.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
			bfdsmgr.excptn.getFields();
			// use the system, company id to get the firm_mgmt_co_id
           	bfdsmgr.excptn.getSystem();
           	bfdsmgr.excptn.getCompany();
           	$( '#excptn_dscInput' ).ckeditor();
           	// Admin_tb defined in config.js
           	CKEDITOR.config.toolbar = 'Admin_tb';
        });
    </script>
</head>
<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>
<div class="bfdsmgrMgmtBody">
        <div id="addException">
          <div style="text-align: center;">
			<h3 class="pageHeaderTableHeader">Add Exception</h3>
      	    <span class="bfdsRequired" style='position: absolute; top: 20px; left: 10px;'>required fields *</span>
          </div>
           <div id="fieldDialog" title="Field" class="bfdsHidden"></div>
            <div id="systemDialog" title="Firms" class="bfdsHidden"></div>
            <div id="companyDialog" title="Systems" class="bfdsHidden"></div>
          <div>
              <label>Select:<span class="bfdsRequired">*</span></label>
              &nbsp;
              <input id="fieldDscSubmit" name="field" type="submit" value="Fields" onclick="bfdsmgr.excptn.fieldDialog()"/>
              &nbsp;
              <input id="systemSubmit" name="system" type="submit" value="Firms" onclick="bfdsmgr.excptn.systemDialog()"/>
              &nbsp;
              <input id="companySubmit" name="company" type="submit" value="Systems" onclick="bfdsmgr.excptn.companyDialog();"/>
          </div>
          <br/>
          <div id="cntcttxtdiv">
          	<textarea id="excptn_dscInput" rows="5" cols="100"></textarea>
          </div>          
          <br/>
          <div>
			<input type="button" value="Submit" id="submitException" onclick="bfdsmgr.excptn.addException();"/>
          </div>
    </div>
    <div id="success" class="bfdsHidden">
        <h3 id="successMessage"></h3>
    </div>
</div>
</body>
</html>