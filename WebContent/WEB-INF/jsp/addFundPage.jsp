<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%--Begin HTML--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <jsp:include page="includes/javascriptCss.jsp" />
    <title>FIRMport Admin - Fund Page</title>
    <script type="text/javascript" src="bfdsUtil.js"></script>    
    <script type="text/javascript" src="bfdsFunds.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
           // disable the company label
           $('#company_shortnm_lbl').attr('disabled', true);
        });
    </script>
</head>
<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>
<div class="bfdsmgrMgmtBody">
    <div id="addFund">
         <div align="center" class="bfdsmgrBoldText">
				<h3 class="pageHeaderTableHeader">Add Fund</h3>
         </div>
         <div>
	          	<label>System</label>
	          	<input id="systemInput" name="system" maxlength=3 size=3 onchange="bfdsmgr.util.setFieldColor(this)"/>
	          	<label>Company</label>
	          	<input id="companyInput" name="company" maxlength=2 size=2 onchange="bfdsmgr.util.setFieldColor(this)"/>
             	<input type="button" value="Submit" id="submitCoSrch" onclick="bfdsmgr.funds.doCoSrch();"/>
	          	<input id="mgmt_co_idInput" type="hidden" maxlength=2 size=2/>
         </div>
         <br/>
         <div>
	          	<label>Short Name</label>
	          	<input id="company_shortnm_lbl" maxlength=2 size=2 onchange="bfdsmgr.util.setFieldColor(this)"/> <!-- disabled label -->
	          	<label>Fund Legal Name</label>
	          	<input id="fund_lgl_nmInput" name="fund_lgl_nm" type="text" maxlength=50 size=50 onchange="bfdsmgr.util.setFieldColor(this)"/>
	          	<label>Fund Tax Id</label>
	          	<input id="fund_tax_idInput" name="fund_tax_id" type="text" maxlength=9 size=9 onchange="bfdsmgr.util.setFieldColor(this)" />
     	 </div>
     	 <br/>
         <div>
             <input type="button" value="Submit" id="submitFund" onclick="bfdsmgr.funds.addFunds();"/>
         </div>
    </div>
    <div></div>
    <div id="success" class="bfdsHidden">
        <h3 id="successMessage"></h3>
    </div>
</div>
</body>
</html>