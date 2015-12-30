package com.bfds.app.fia.mgr.web.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;

import com.bfds.app.fia.mgr.service.impl.ContactsServiceImpl;
import com.bfds.app.fia.mgr.model.CntctGrp;
import com.bfds.app.fia.mgr.model.CntctMethod;
import com.bfds.app.fia.mgr.model.CntctMgmtCoGrpXref;
import com.bfds.app.fia.mgr.model.CntctMgmtCoXref;
import com.bfds.app.fia.mgr.model.CntctType;
import com.bfds.app.fia.mgr.model.Contacts;
import com.bfds.app.fia.mgr.model.MgmtCo;
import com.bfds.app.fia.mgr.model.SearchValidator;
import com.bfds.app.fia.mgr.model.ViewCntctMgmtCoGrpXref;
import com.bfds.app.fia.mgr.model.ViewCntctMgmtCoXref;

import java.util.List;
import java.util.StringTokenizer;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class ContactsController extends FIRMportAdminController {
	
	private static Logger logger;

	private final ContactsServiceImpl contactsserviceimpl;
	private SearchValidator sv;

	@Autowired
	public ContactsController(ContactsServiceImpl contactsserviceimpl){
		this.contactsserviceimpl = contactsserviceimpl;
	}
	
	/*
	 * 
	 */
	@RequestMapping(value="/setContactRowToEdit", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator setRowIndex(HttpServletRequest request){

		HttpSession session = request.getSession();
		sv = new SearchValidator();
		session.setAttribute("CNTCT_ID", (String)request.getParameter("cntct_id"));
		
		sv.setTrue_false(true);

		return sv;
	}

	/*
	 * 
	 */
	@RequestMapping(value="/setContactXrefRowToEdit", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator setContactXrefRowIndex(HttpServletRequest request){

		HttpSession session = request.getSession();
		sv = new SearchValidator();
		session.setAttribute("CNTCT_ID", (String)request.getParameter("cntct_id"));
		session.setAttribute("MGMT_CO_ID", (String)request.getParameter("mgmt_co_id"));
		
		sv.setTrue_false(true);

		return sv;
	}

	/*
	 * 
	 */
	@RequestMapping(value="/setCntctGrpXrefRowToEdit", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator setContactGrpXrefRowIndex(HttpServletRequest request){

		HttpSession session = request.getSession();
		sv = new SearchValidator();
		session.setAttribute("CNTCT_ID", (String)request.getParameter("cntct_id"));
		session.setAttribute("MGMT_CO_ID", (String)request.getParameter("mgmt_co_id"));
		session.setAttribute("CNTCT_GRP_CD", (String)request.getParameter("cntct_grp_cd"));
		
		sv.setTrue_false(true);

		return sv;
	}

	@RequestMapping("/viewContactsPage")
	public String callViewContactss(){
		return "viewContactsPage";
	}
	
	@RequestMapping("/viewCntctMgmtCoXrfPage")
	public String callViewCntctMgmtCoXrfPage(){
		return "viewCntctMgmtCoXrfPage";
	}
	
	@RequestMapping("/viewCntctMgmtCoGrpXrfPage")
	public String callViewCntctMgmtCoGrpXrfPage(){
		return "viewCntctMgmtCoGrpXrfPage";
	}
	
	@RequestMapping("/showAllContacts" )
	@ResponseBody
	public List<Contacts> callShowAllContactss(){
		List<Contacts> contacts = contactsserviceimpl.doFindAllContacts(); 
		return contacts;
	}

	@RequestMapping("/showAllCntctMgmtCoXrf" )
	@ResponseBody
	public List<ViewCntctMgmtCoXref> callShowAllCntctMgmtCoXrf(){
		List<ViewCntctMgmtCoXref> contacts = contactsserviceimpl.doFindAllContactMgmtCoXref(); 
		return contacts;
	}

	@RequestMapping("/showAllCntctMgmtCoGrpXrf" )
	@ResponseBody
	public List<ViewCntctMgmtCoGrpXref> callShowAllCntctMgmtCoGrpXrf(){
		List<ViewCntctMgmtCoGrpXref> contacts = contactsserviceimpl.doFindAllContactMgmtCoGrpXref(); 
		return contacts;
	}

	/*
	 * Store the new Contacts data
	 */
	@RequestMapping("/addContactsPage")
	public String callAddContacts(){
		return "addContactsPage";
	}
	
	/*
	 * Store the new Contacts MgmtCo Xrf data
	 */
	@RequestMapping("/addCntctMgmtCoXrfPage")
	public String callAddCntctMgmtCoXrfPage(){
		return "addCntctMgmtCoXrfPage";
	}
	
	/*
	 * Store the new Contacts MgmtCo Group Xrf data
	 */
	@RequestMapping("/addCntctMgmtCoGrpXrfPage")
	public String callAddCntctMgmtCoGrpXrfPage(){
		return "addCntctMgmtCoGrpXrfPage";
	}
	
	/*
	 * delete the selected Contact
	 */
	@RequestMapping("/deleteContactPage")
	public String callDeleteContactPage(){
		return "deleteContactPage";
	}
	
	/*
	 * delete the selected Contact, Company xref
	 */
	@RequestMapping("/deleteCntctMgmtCoXrfPage")
	public String callDeleteCntctMgmtCoXrfPage(){
		return "deleteCntctMgmtCoXrfPage";
	}
	
	/*
	 * delete the selected Contact, Company, Group xref
	 */
	@RequestMapping("/deleteCntctMgmtCoGrpXrfPage")
	public String callDeleteCntctMgmtCoGrpXrfPage(){
		return "deleteCntctMgmtCoGrpXrfPage";
	}
	
	/*
	 * Store the new Contacts Company Xrf data
	 */
	@RequestMapping("/editCntctMgmtCoXrfPage")
	public String callEditCntctMgmtCoXrfPage(){
		return "editCntctMgmtCoXrfPage";
	}
	
	/*
	 * Store the new Contacts Company Group Xrf data
	 */
	@RequestMapping("/editCntctMgmtCoGrpXrfPage")
	public String callEditCntctMgmtCoGrpXrfPage(){
		return "editCntctMgmtCoGrpXrfPage";
	}
	
	/*
	 * Store the new Contacts data
	 */
	@RequestMapping("/addContact")
	@ResponseBody
	public SearchValidator callAddContacts(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		sv = new SearchValidator();
		int _firm_id = Integer.parseInt((String)session.getAttribute("FIRM_ID"));
		
		Contacts contacts = new Contacts();
		
		contacts.setFirm_id(_firm_id);	// the selected system (firm) id
		contacts.setCntct_first_nm((String)request.getParameter("cntct_first_nm"));
		contacts.setCntct_last_nm((String)request.getParameter("cntct_last_nm"));
		contacts.setCntct_title((String)request.getParameter("cntct_title"));
		contacts.setCntct_wrk_phn((String)request.getParameter("cntct_wrk_phn"));
		contacts.setCntct_cell_phn((String)request.getParameter("cntct_cell_phn"));
		contacts.setCntct_fax_num((String)request.getParameter("cntct_fax_num"));
		contacts.setCntct_address1((String)request.getParameter("cntct_address1"));
		contacts.setCntct_address2((String)request.getParameter("cntct_address2"));
		contacts.setCntct_city((String)request.getParameter("cntct_city"));
		contacts.setCntct_state_cd((String)request.getParameter("cntct_state_cd"));
		contacts.setCntct_zip_cd((String)request.getParameter("cntct_zip_cd"));
		contacts.setCntct_email((String)request.getParameter("cntct_email"));
		contacts.setCntct_verified_dt((String)request.getParameter("cntct_verified_dt"));
		contacts.setCntct_wrk_phn_ext((String)request.getParameter("cntct_wrk_phn_ext"));
		contacts.setLst_updt_userid(this.getUserName(request));
		
		this.contactsserviceimpl.insertContacts(contacts);
		
		sv.setTrue_false(true);

		return sv;
	}
	
	/*
	 * Store the new Contacts data
	 */
	@RequestMapping("/addContactXrf")
	@ResponseBody
	public SearchValidator callAddContactXrf(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		sv = new SearchValidator();
		CntctMgmtCoXref cntctmgmtcoxref = new CntctMgmtCoXref();

		String _cntct_cmnt_txt = (String)request.getParameter("cntct_cmnt_txt");
		String _companies = (String)session.getAttribute("COMPANIES");
		int _contact_id = Integer.parseInt((String)session.getAttribute("CNTCT_ID"));
		String _method_id = (String)session.getAttribute("METHOD_ID");
		String _type = (String)session.getAttribute("TYPE");
		
		cntctmgmtcoxref.setCntct_id(_contact_id);
		cntctmgmtcoxref.setPref_cntct_meth_cd(_method_id);
		cntctmgmtcoxref.setCntct_typ_cd(_type);
		cntctmgmtcoxref.setCntct_cmnt_txt(_cntct_cmnt_txt);
		cntctmgmtcoxref.setLst_updt_userid(this.getUserName(request));
		
		StringTokenizer st = new StringTokenizer(_companies,",");
		/*
		 * if there are a number of company id's that had been selected 
		 */
		while(st.hasMoreTokens()){
			cntctmgmtcoxref.setMgmt_co_id(Integer.parseInt(st.nextToken()));
			this.contactsserviceimpl.insertContactMgmtcoXref(cntctmgmtcoxref);
		}
		
		sv.setTrue_false(true);

		return sv;
	}
	
	/*
	 * Store the new Contacts data
	 */
	@RequestMapping("/addCntctMgmtCoGrpXrf")
	@ResponseBody
	public SearchValidator callAddCntctMgmtCoGrpXrf(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		sv = new SearchValidator();
		int _contact_id = Integer.parseInt((String)session.getAttribute("CNTCT_ID"));
		int _mgmt_co_id = Integer.parseInt((String)session.getAttribute("MGMT_CO_ID"));
		String _group_cd = (String)session.getAttribute("GROUP_CD");
		
		CntctMgmtCoGrpXref cntctmgmtcogrpxref = new CntctMgmtCoGrpXref();

		cntctmgmtcogrpxref.setCntct_id(_contact_id);
		cntctmgmtcogrpxref.setMgmt_co_id(_mgmt_co_id);
		cntctmgmtcogrpxref.setCntct_grp_cd(_group_cd);
		cntctmgmtcogrpxref.setLst_updt_userid(this.getUserName(request));
		cntctmgmtcogrpxref.setLst_updt_dtm(getFormatedNowDate());
		
		this.contactsserviceimpl.insertContactMgmtcoGrpXref(cntctmgmtcogrpxref);
		
		sv.setTrue_false(true);

		return sv;
	}
	
	/*
	 * Store the one select system id
	 */
	@RequestMapping("/contactSaveSystem")
	@ResponseBody
	public SearchValidator callSaveSelectedSystem(HttpServletRequest request){

		HttpSession session = request.getSession();
		sv = new SearchValidator();
		session.setAttribute("FIRM_ID", (String)request.getParameter("sel_system"));
		
		sv.setTrue_false(true);

		return sv;
	}
	
	/*
	 * 
	 */
	@RequestMapping("/deleteContacts")
	@ResponseBody
	public SearchValidator callDeleteContacts(HttpServletRequest request){

		HttpSession session = request.getSession();
		sv = new SearchValidator();
		int _contact_id = Integer.parseInt((String)session.getAttribute("CNTCT_ID"));
		logger.info("This is the Contact id " + _contact_id);
		
		contactsserviceimpl.deleteContactMgmtcoGrpXrefByCntct(_contact_id);
		contactsserviceimpl.deleteContactMgmtcoXrefByCntct(_contact_id);
		contactsserviceimpl.deleteContacts(_contact_id);

		sv.setTrue_false(true);
//		sv.setMessage("Deleting a Contact testing the UI!");
		
		return sv; 
	}
	
	/*
	 * 
	 */
	@RequestMapping("/deleteContactsMgmtCoXref")
	@ResponseBody
	public SearchValidator callDeleteContactsMgmtCoXref(HttpServletRequest request){

		HttpSession session = request.getSession();
		sv = new SearchValidator();
		int _contact_id = Integer.parseInt((String)session.getAttribute("CNTCT_ID"));
		int _mgmt_co_id = Integer.parseInt((String)session.getAttribute("MGMT_CO_ID"));

		contactsserviceimpl.deleteContactMgmtcoGrpXref(_contact_id, _mgmt_co_id);
		contactsserviceimpl.deleteContactMgmtcoXref(_contact_id, _mgmt_co_id);
		
		sv.setTrue_false(true);
		
		return sv; 
	}
	
	/*
	 * 
	 */
	@RequestMapping("/deleteContactMgmtcoGrpXref")
	@ResponseBody
	public SearchValidator callDeleteContactMgmtcoGrpXref(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		sv = new SearchValidator();
		int _contact_id = Integer.parseInt((String)session.getAttribute("CNTCT_ID"));
		int _mgmt_co_id = Integer.parseInt((String)session.getAttribute("MGMT_CO_ID"));

		contactsserviceimpl.deleteContactMgmtcoGrpXref(_contact_id, _mgmt_co_id);
		
		sv.setTrue_false(true);
		
		return sv; 
	}
	
	/*
	 * Edit the selected Contacts
	 */
	@RequestMapping("/editContactsPage")
	public String callEditContacts(){
		return "editContactsPage";
	}
	
	/*
	 * Get the Contacts data to edit
	 */
	@RequestMapping("/editContact")
	@ResponseBody
	public Contacts ContactsToEdit(HttpServletRequest request){
		HttpSession session = request.getSession();
		int _cntct_id = Integer.parseInt((String)session.getAttribute("CNTCT_ID"));
		
		List<Contacts> contacts = contactsserviceimpl.doFindSingleContact(_cntct_id); 
		return (contacts.size() > 0) ? contacts.get(0) : null;
		
	}
			
	/*
	 * Get the Contacts Xref data to edit
	 */
	@RequestMapping("/editContactMgmtcoXrf")
	@ResponseBody
	public CntctMgmtCoXref ContactsMgmtcoXrfToEdit(HttpServletRequest request){
		HttpSession session = request.getSession();
		int _cntct_id = Integer.parseInt((String)session.getAttribute("CNTCT_ID"));
		int _mgmt_co_id = Integer.parseInt((String)session.getAttribute("MGMT_CO_ID"));		
		
		List<CntctMgmtCoXref> contacts = contactsserviceimpl.doFindSingleContactMgmtCoXref(_cntct_id, _mgmt_co_id); 
		return (contacts.size() > 0) ? contacts.get(0) : null;
		
	}
			
	/*
	 * Get the Contacts Group Xref data to edit
	 */
	@RequestMapping("/editCntctMgmtCoGrpXrf")
	@ResponseBody
	public CntctMgmtCoGrpXref ContactsMgmtcoGrpXrfToEdit(HttpServletRequest request){
		HttpSession session = request.getSession();
		int _cntct_id = Integer.parseInt((String)session.getAttribute("CNTCT_ID"));
		int _mgmt_co_id = Integer.parseInt((String)session.getAttribute("MGMT_CO_ID"));		
		String _cntct_grp_cd = (String)session.getAttribute("CNTCT_GRP_CD");		
				
		List<CntctMgmtCoGrpXref> listcntctxrf = contactsserviceimpl.doFindSingleContactMgmtCoGrpXref(_cntct_id, 
																									 _mgmt_co_id, 
																									 _cntct_grp_cd); 
		return (listcntctxrf.size() > 0) ? listcntctxrf.get(0) : null;
		
	}
			
	/*
	 * Get all Companies
	 */
	@RequestMapping("/getCntCtCompany")
	@ResponseBody
	public List<MgmtCo> getCntCtCompany(){
		
		List<MgmtCo> mgmtco = contactsserviceimpl.doFindAllMgmtCo();
		return mgmtco;
		
	}
			
	/*
	 * Get the Contacts for the Xref
	 */
	@RequestMapping("/getContacts")
	@ResponseBody
	public List<Contacts> getContacts(){
		
		List<Contacts> contacts = contactsserviceimpl.doFindAllContacts(); 
		return contacts;
		
	}
			
	/*
	 * Get the Contacts methods
	 */
	@RequestMapping("/getCntctMethod")
	@ResponseBody
	public List<CntctMethod> getCntctMethod(){
		
		List<CntctMethod> cntctmethod = contactsserviceimpl.doFindAllContactMethods(); 
		return cntctmethod;
		
	}
			
	/*
	 * Get the Contacts groups
	 */
	@RequestMapping("/getCntctGroup")
	@ResponseBody
	public List<CntctGrp> getCntctGroup(){
		
		List<CntctGrp> cntctgrp = contactsserviceimpl.doFindAllCntctGrp(); 
		return cntctgrp;
		
	}
			
	/*
	 * Get the Contacts types
	 */
	@RequestMapping("/getCntctType")
	@ResponseBody
	public List<CntctType> getCntctType(){
		
		List<CntctType> cntcttype = contactsserviceimpl.doFindAllContactTypes(); 
		return cntcttype;
		
	}
			
	/*
	 * save the selected Contact for the xref
	 */
	@RequestMapping("/saveSelContact")
	@ResponseBody
	public SearchValidator saveSelContact(HttpServletRequest request){
		HttpSession session = request.getSession();
		sv = new SearchValidator();
		session.setAttribute("CNTCT_ID", (String)request.getParameter("contact_id"));

		sv.setTrue_false(true);

		return sv;
		
	}
			
	/*
	 * save one or more selected Companies for the xref
	 */
	@RequestMapping("/saveCntctCompany")
	@ResponseBody
	public SearchValidator saveCntctCompany(HttpServletRequest request){
		HttpSession session = request.getSession();
		sv = new SearchValidator();
		session.setAttribute("COMPANY_ID", (String)request.getParameter("sel_company_id"));

		sv.setTrue_false(true);

		return sv;
		
	}
			
	/*
	 * save the selected Method for the xref
	 */
	@RequestMapping("/saveCntctMethod")
	@ResponseBody
	public SearchValidator saveCntctMethod(HttpServletRequest request){
		HttpSession session = request.getSession();
		sv = new SearchValidator();
		session.setAttribute("METHOD_ID", (String)request.getParameter("sel_method_id"));

		sv.setTrue_false(true);

		return sv;
		
	}
			
	/*
	 * save the selected Type for the xref
	 */
	@RequestMapping("/saveCntctType")
	@ResponseBody
	public SearchValidator saveCntctType(HttpServletRequest request){
		HttpSession session = request.getSession();
		sv = new SearchValidator();
		session.setAttribute("TYPE", (String)request.getParameter("sel_type"));

		sv.setTrue_false(true);

		return sv;
		
	}
			
	/*
	 * save the selected Group for the Group xref
	 */
	@RequestMapping("/saveCntctGroup")
	@ResponseBody
	public SearchValidator saveCntctGroup(HttpServletRequest request){
		HttpSession session = request.getSession();
		sv = new SearchValidator();
		session.setAttribute("GROUP_ID", (String)request.getParameter("sel_group_id"));

		sv.setTrue_false(true);

		return sv;
		
	}
			
	/*
	 * 
	 */
	@RequestMapping("/updateContact")
	@ResponseBody
	public SearchValidator callUpdateContacts(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		sv = new SearchValidator();
		int _cntct_id = Integer.parseInt((String)session.getAttribute("CNTCT_ID"));
		int _firm_id = Integer.parseInt((String)session.getAttribute("FIRM_ID"));
		List<Contacts> contacts = contactsserviceimpl.doFindSingleContact(_cntct_id); 
		Contacts editedContact = (contacts.size() > 0) ? contacts.get(0) : null;

		// if the System has changed
		if(_firm_id != -1){
			editedContact.setFirm_id(_firm_id);
		}
		editedContact.setCntct_first_nm((String)request.getParameter("cntct_first_nm"));
		editedContact.setCntct_last_nm((String)request.getParameter("cntct_last_nm"));
		editedContact.setCntct_title((String)request.getParameter("cntct_title"));
		editedContact.setCntct_wrk_phn((String)request.getParameter("cntct_wrk_phn"));
		editedContact.setCntct_cell_phn((String)request.getParameter("cntct_cell_phn"));
		editedContact.setCntct_fax_num((String)request.getParameter("cntct_fax_num"));
		editedContact.setCntct_address1((String)request.getParameter("cntct_address1"));
		editedContact.setCntct_address2((String)request.getParameter("cntct_address2"));
		editedContact.setCntct_city((String)request.getParameter("cntct_city"));
		editedContact.setCntct_state_cd((String)request.getParameter("cntct_state_cd"));
		editedContact.setCntct_zip_cd((String)request.getParameter("cntct_zip_cd"));
		editedContact.setCntct_email((String)request.getParameter("cntct_email"));
		editedContact.setCntct_verified_dt((String)request.getParameter("cntct_verified_dt"));
		editedContact.setCntct_wrk_phn_ext((String)request.getParameter("cntct_wrk_phn_ext"));
		editedContact.setLst_updt_userid(this.getUserName(request));
		editedContact.setLst_updt_dtm(getFormatedNowDate());
		
		this.contactsserviceimpl.updateContacts(editedContact);
		
		sv.setTrue_false(true);

		return sv;
	}
			
	/*
	 * Update the existing Contact Mgmt Co Xref data
	 */
	@RequestMapping("/updateCntctMgmtCoXrf")
	@ResponseBody
	public SearchValidator callUpdateCntctMgmtCoXrf(HttpServletRequest request){

		HttpSession session = request.getSession();
		sv = new SearchValidator();

		int _cntct_id = Integer.parseInt((String)session.getAttribute("CNTCT_ID"));
		int _mgmt_co_id = Integer.parseInt((String)session.getAttribute("MGMTCO_ID"));
		
		List<CntctMgmtCoXref> listcntctxrf = contactsserviceimpl.doFindSingleContactMgmtCoXref(_cntct_id, _mgmt_co_id); 
		CntctMgmtCoXref curnt_cnct_xrf = listcntctxrf.get(0); 
		
		String _method_id = (String)session.getAttribute("METHOD_ID");
		String _type = (String)session.getAttribute("TYPE");
		String _cntct_cmnt_txt = (String)session.getAttribute("CNTCT_CMNT_TXT");
		if(_method_id != null){
			curnt_cnct_xrf.setPref_cntct_meth_cd(_method_id);
		}
		if(_type != null){
			curnt_cnct_xrf.setCntct_typ_cd(_type);
		}
		if(_cntct_cmnt_txt != null){
			curnt_cnct_xrf.setCntct_cmnt_txt(_cntct_cmnt_txt);
		}
		curnt_cnct_xrf.setLst_updt_userid(this.getUserName(request));
		curnt_cnct_xrf.setLst_updt_dtm(getFormatedNowDate());
		
		this.contactsserviceimpl.updateContactMgmtcoXref(curnt_cnct_xrf);
		
		sv.setTrue_false(true);

		return sv;
	}
	
	/*
	 * Update the existing Contact Mgmt Co Xref data
	 */
	@RequestMapping("/updateCntctMgmtCoGrpXrf")
	@ResponseBody
	public SearchValidator callUpdateCntctMgmtCoGrpXrf(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		sv = new SearchValidator();

		int _cntct_id = Integer.parseInt((String)session.getAttribute("CNTCT_ID"));
		int _mgmt_co_id = Integer.parseInt((String)session.getAttribute("MGMT_CO_ID"));		
		String _cntct_grp_cd = (String)session.getAttribute("CNTCT_GRP_CD");		
		String _group_id = (String)session.getAttribute("GROUP_ID");		
				
		List<CntctMgmtCoGrpXref> listcntctxrf = contactsserviceimpl.doFindSingleContactMgmtCoGrpXref(_cntct_id, 
																									 _mgmt_co_id, 
																									 _cntct_grp_cd); 
		CntctMgmtCoGrpXref curnt_cnct__grp_xrf = listcntctxrf.get(0); 
		
		curnt_cnct__grp_xrf.setCntct_grp_cd(_group_id);
		curnt_cnct__grp_xrf.setMgmt_co_id(_mgmt_co_id);
		curnt_cnct__grp_xrf.setCntct_grp_cd(_cntct_grp_cd);
		curnt_cnct__grp_xrf.setLst_updt_userid(this.getUserName(request));
		
		this.contactsserviceimpl.updateContactMgmtCoGrpXref(curnt_cnct__grp_xrf);
		
		sv.setTrue_false(true);

		return sv;
	}
	
}
