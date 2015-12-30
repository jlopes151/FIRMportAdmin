<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%--Begin HTML--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <jsp:include page="includes/javascriptCss.jsp" />
    <title>FIRMport Admin - Contact &amp; Company Group Xref Page</title>
    <script type="text/javascript" src="bfdsUtil.js"></script>    
    <script type="text/javascript" src="bfdsCntctMgmtCoGrpXrf.js"></script>
	<script type="text/javascript" src="ckeditor.js"></script>
	<script type="text/javascript" src="adapters/jquery.js"></script>	
	<script type="text/javascript" src="config.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
			bfdsmgr.contacts.getContacts();
			bfdsmgr.contacts.getCntCtCompany();
			bfdsmgr.contacts.getCntctGroup();
        });
    </script>
</head>
<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>
<div class="bfdsmgrMgmtBody">
	<div id="addContact">
          <div style="text-align: center;">
			<h3 class="pageHeaderTableHeader">Add Contact &amp; Company Group Xref</h3>
      	    <span class="bfdsRequired" style='position: absolute; top: 20px; left: 10px;'>required fields *</span>
          </div>
          <div id="contactDialog" title="Contact" class="bfdsHidden"></div>
          <div id="companyDialog" title="Company" class="bfdsHidden"></div>
          <div id="groupDialog" title="Group" class="bfdsHidden"></div>
          <div>
              <label>Select:<span class="bfdsRequired">*</span></label>
              &nbsp;
              <input id="contactSubmit" name="contact" type="submit" value="Contact" onclick="bfdsmgr.contacts.contactDialog()"/>
              &nbsp;
              <input id="companySubmit" name="company" type="submit" value="Company" onclick="bfdsmgr.contacts.companyDialog()"/>
              &nbsp;
              <input id="groupSubmit" name="group" type="submit" value="Group" onclick="bfdsmgr.contacts.groupDialog()"/>
          </div>
          <br/>
          <div>
			<input type="button" value="Submit" id="submitContact" onclick="bfdsmgr.contacts.addCntctMgmtCoXrf();"/>
          </div>
    </div>
    <div id="success" class="bfdsHidden">
        <h3 id="successMessage"></h3>
    </div>
</div>
</body>
</html>
