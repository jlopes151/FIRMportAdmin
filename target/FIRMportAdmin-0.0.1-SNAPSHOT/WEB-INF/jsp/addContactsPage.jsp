<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%--Begin HTML--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <jsp:include page="includes/javascriptCss.jsp" />
    <title>FIRMport Admin - Contact Page</title>
    <script type="text/javascript" src="bfdsUtil.js"></script>    
    <script type="text/javascript" src="bfdsContacts.js"></script>
	<script type="text/javascript" src="ckeditor.js"></script>
	<script type="text/javascript" src="adapters/jquery.js"></script>	
	<script type="text/javascript" src="config.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
			bfdsmgr.contacts.getSystem();
           	bfdsmgr.contacts.getStates();
        });
    </script>
</head>
<body class="bfdsmgrText">
<%@include file="includes/header.jsp" %>
<div class="bfdsmgrMgmtBody">
	<div id="addContact">
          <div style="text-align: center;">
			<h3 class="pageHeaderTableHeader">Add Contact</h3>
      	    <span class="bfdsRequired" style='position: absolute; top: 20px; left: 10px;'>required fields *</span>
          </div>
          <div id="systemDialog" title="System" class="bfdsHidden"></div>
          <div>
              <label>Select:<span class="bfdsRequired">*</span></label>
              &nbsp;
              <input id="systemSubmit" name="systemSubmit" type="submit" value="System" onclick="bfdsmgr.contacts.systemDialog()"/>
          </div>
          <br/>          
          <table>
	          <tr>
	              <td>First Name<span class="bfdsRequired">*</span></td>
	              <td>
	              	<input id="cntct_first_nmInput" name="cntct_first_nm" type="text" maxlength=15 size=15 onchange="bfdsmgr.util.setFieldColor(this)"/>
	              </td>
	              <td>Last Name<span class="bfdsRequired">*</span></td>
	              <td>
	              	<input id="cntct_last_nmInput" name="cntct_last_nm" type="text" maxlength=20 size=20 onchange="bfdsmgr.util.setFieldColor(this)"/>
	              </td>
	          </tr>          
	          <tr>
	              <td>Title<span class="bfdsRequired">*</span></td>
	              <td>
	              	<input id="cntct_titleInput" name="cntct_title" type="text" maxlength=50 size=50 onchange="bfdsmgr.util.setFieldColor(this)"/>
	              </td>
	              <td>Work Phone</td>
	              <td>
	              	<input id="cntct_wrk_phnInput" name="cntct_wrk_phn" type="text" maxlength=14 size=14 onchange="bfdsmgr.util.setFieldColor(this)"/>
	              </td>
	          </tr>
	          <tr>
	              <td>Cell Phone</td>
	              <td>
	              	<input id="cntct_cell_phnInput" name="cntct_cell_phn" type="text" maxlength=14 size=14 onchange="bfdsmgr.util.setFieldColor(this)"/>
	              </td>
	              <td>Fax Number</td>
	              <td>
	              	<input id="cntct_fax_numInput" name="cntct_fax_num" type="text" maxlength=14 size=14 onchange="bfdsmgr.util.setFieldColor(this)"/>
	              </td>
	          </tr>
	          <tr>
	              <td>Address 1</td>
	              <td>
	              	<input id="cntct_address1Input" name="cntct_address1" type="text" maxlength=50 size=50 onchange="bfdsmgr.util.setFieldColor(this)"/>
	              </td>
	              <td>Address 2</td>
	              <td>
	              	<input id="cntct_address2Input" name="cntct_address2" type="text" maxlength=50 size=50 onchange="bfdsmgr.util.setFieldColor(this)"/>
	              </td>
	          </tr>
	          <tr>
	              <td>City<span class="bfdsRequired">*</span></td>
				  <td>
	              	<input id="cntct_cityInput" name="cntct_city" type="text" maxlength=50 size=50 onchange="bfdsmgr.util.setFieldColor(this)"/>
	              </td>
	              <td>State<span class="bfdsRequired">*</span></td>
	              <td>
	              	<select id="cntct_state_cdDD" name="cntct_state_cd" onchange="bfdsmgr.util.setFieldColor(this)"></select>
	              </td>
	          </tr>
	          <tr>
	              <td>Zip<span class="bfdsRequired">*</span></td>
	              <td>
	              	<input id="cntct_zip_cdInput" name="cntct_zip_cd" type="text" maxlength=5 size=5 onchange="bfdsmgr.util.setFieldColor(this)"/>
	              </td>
	              <td>Email</td>
	              <td>
	              	<input id="cntct_emailInput" name="cntct_email" type="text" maxlength=50 size=50 onchange="bfdsmgr.util.setFieldColor(this)"/>
	              </td>              
	          </tr>
	          <tr>
	              <td>Verified Date<span class="bfdsRequired">*</span></td>
	              <td>
	              	<input id="cntct_verified_dtInput" name="cntct_verified_dt" type="text" maxlength=14 size=14 onchange="bfdsmgr.util.setFieldColor(this)"/>
	              </td>
	          	  <td>Work Phone Extension</td>
	          	  <td>
	          	  	<input id="cntct_wrk_phn_extInput" name="cntct_wrk_phn_ext" type="text" maxlength=10 size=10 onchange="bfdsmgr.util.setFieldColor(this)"/>
	          	  </td>
	          </tr>
          </table>
          <br/>
          <div>
			<input type="button" value="Submit" id="submitContact" onclick="bfdsmgr.contacts.addContact();"/>
          </div>
    </div>
    <div id="success" class="bfdsHidden">
        <h3 id="successMessage"></h3>
    </div>
</div>
</body>
</html>
