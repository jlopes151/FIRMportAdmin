<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%@ taglib uri="http://ckeditor.com" prefix="ckeditor" %>
<%--Begin HTML--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <jsp:include page="includes/javascriptCss.jsp" />
    <title>FIRMport Admin - Edit Agreement Page</title>
    <script type="text/javascript" src="bfdsUtil.js"></script>    
    <script type="text/javascript" src="bfdsAgreement.js"></script>
	<script type="text/javascript" src="ckeditor.js"></script>
	<script type="text/javascript" src="config.js"></script>
	<script type="text/javascript" src="adapters/jquery.js"></script>	
    <script type="text/javascript">
        $(document).ready(function() {
        	// use these to get the firm_mgmt_co_id
           	bfdsmgr.agree.getSystem();
          	bfdsmgr.agree.getCompany();
          	bfdsmgr.agree.getAgreeType();
        });        
    </script>
</head>
<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>
<div class="bfdsmgrMgmtBody">
        <div id="addBranch">
            <div style="text-align: center;">
				<h3 class="pageHeaderTableHeader">Edit Agreement</h3>
            </div>
            <div id="agreeTypeDialog" title="Agreement Type" class="bfdsHidden"></div>
            <div>
                <label>Select:</label>
                &nbsp;
                <input id="agreeTypeSubmit" name="agreeType" type="submit" value="Agreement Type" onclick="bfdsmgr.agree.agreeTypeDialog()"/>
            </div>
            <br/>
            <table>
	            <tr>
	                <td>Effective Date</td>
	                <td><input id="agre_eff_dtInput" name="agre_eff_dt" type="text" onchange="bfdsmgr.util.setFieldColor(this)" onchange="bfdsmgr.util.setFieldColor(this)" /></td>
	                <td>Term</td>
	                <td><input id="agre_termInput" name="agre_term" type="text" maxlength=10 size=10 onchange="bfdsmgr.util.setFieldColor(this)"/></td>
	            </tr>
	            <tr>
	                <td>Parties</td>
	                <td><input id="agre_partiesInput" name="agre_parties" type="text" maxlength=30 size=30 onchange="bfdsmgr.util.setFieldColor(this)"/></td>
	                <td>State</td>
	                <td><input id="agre_state_cdInput" name="agre_state_cd" type="text" maxlength=10 size=10 onchange="bfdsmgr.util.setFieldColor(this)"/></td>
	            </tr>
	            <tr>
	                <td>Fee</td>
	                <td><input id="fee_agreInput" name="fee_agre" type="text" maxlength=100 size=100 onchange="bfdsmgr.util.setFieldColor(this)"/></td>
	            </tr>
            </table>
            <br/>
            <div>
				<input type="button" value="Submit" id="submitAgreement" onclick="bfdsmgr.agree.updateAgreement();"/>
            </div>
        </div>
    <div id="success" class="bfdsHidden">
        <h3 id="successMessage"></h3>
    </div>
</div>
</body>
</html>