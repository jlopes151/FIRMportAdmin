package com.bfds.app.fia.mgr.web.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;

import com.bfds.app.fia.mgr.service.impl.ExceptionsServiceImpl;
import com.bfds.app.fia.mgr.service.impl.FirmAndMgmtCoServiceImpl;
import com.bfds.app.fia.mgr.model.FirmAndMgmtCo;
import com.bfds.app.fia.mgr.model.MExceptions;
import com.bfds.app.fia.mgr.model.SearchValidator;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class ExceptionsController extends FIRMportAdminController {
	
	private static Logger logger;

	private final ExceptionsServiceImpl exceptionsserviceimpl;
	private final FirmAndMgmtCoServiceImpl firmandmgmtcoserviceimpl;
	private SearchValidator sv;

	@Autowired
	public ExceptionsController(ExceptionsServiceImpl exceptionsserviceimpl,
							    FirmAndMgmtCoServiceImpl firmandmgmtcoserviceimpl){
		this.exceptionsserviceimpl = exceptionsserviceimpl;
		this.firmandmgmtcoserviceimpl = firmandmgmtcoserviceimpl;
	}
	
	/*
	 * getting the row that is to be edited
	 */
	@RequestMapping(value="/setExceptionRowToEdit", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator setExceptionRowToEdit(HttpServletRequest request){

		HttpSession session = request.getSession();		
		session.setAttribute("FIELD_CD", (String)request.getParameter("field_cd"));
		session.setAttribute("FIRM_MGMT_CO_ID", (String)request.getParameter("firm_mgmt_co_id"));
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}

	/*
	 * save the field 
	 */
	@RequestMapping(value="/excptnSaveField", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator excptnSaveField(HttpServletRequest request){

		HttpSession session = request.getSession();		
		session.setAttribute("FIELD_CD", (String)request.getParameter("sel_field"));
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}

	/*
	 * save the company id
	 */
	@RequestMapping(value="/excptnSaveCompany", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator saveCompany(HttpServletRequest request){

		HttpSession session = request.getSession();		
		session.setAttribute("COMPANY", (String)request.getParameter("sel_company"));
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}

	/*
	 * save the system id
	 */
	@RequestMapping(value="/excptnSaveSystem", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator saveSystem(HttpServletRequest request){

		HttpSession session = request.getSession();		
		session.setAttribute("SYSTEM", (String)request.getParameter("sel_system"));
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}

	@RequestMapping("/viewExceptionsPage")
	public String callViewExceptions(){
		return "viewExceptionsPage";
	}
	
	@RequestMapping("/showAllExceptions" )
	@ResponseBody
	public List<MExceptions> callShowAllExceptions(){
		List<MExceptions> exceptions = exceptionsserviceimpl.doFindAllExceptions(); 
		return exceptions;
	}

	/*
	 * Store the new Exceptions data
	 */
	@RequestMapping("/addExceptionsPage")
	public String callAddExceptions(){
		return "addExceptionsPage";
	}
	
	/*
	 * Edit the selected Exceptions
	 */
	@RequestMapping("/editExceptionsPage")
	public String callEditExceptions(){
		return "editExceptionsPage";
	}
	
	/*
	 * Delete the Exceptions data
	 */
	@RequestMapping("/deleteExceptionsPage")
	public String callDeleteExceptions(){
		return "deleteExceptionsPage";
	}
	
	/*
	 * Store the new exception data
	 */
	@RequestMapping("/addException")
	@ResponseBody
	public SearchValidator callAddExceptions(HttpServletRequest request){

		HttpSession session = request.getSession();		
		sv = new SearchValidator();
		
		int _system_id  = Integer.parseInt((String)session.getAttribute("SYSTEM"));
		int _company_id = Integer.parseInt((String)session.getAttribute("COMPANY"));
		String _field_cd = (String)session.getAttribute("FIELD");
		MExceptions mexceptions = new MExceptions();
		List<FirmAndMgmtCo> famcos = firmandmgmtcoserviceimpl.doFindSingleFirmAndMgmtCo(_system_id, _company_id);

		// Have to flesh out the error condition
		if(famcos.size() > 0){
			FirmAndMgmtCo famco = famcos.get(0);
					
			mexceptions.setField_cd(_field_cd);
			mexceptions.setExcep_dsc((String)request.getParameter("excep_dsc"));
			mexceptions.setFirm_mgmt_co_id(famco.getFirm_mgmt_co_id());
			mexceptions.setLst_updt_dtm(getFormatedNowDate());
			mexceptions.setLst_updt_userid(this.getUserName(request));
			
			this.exceptionsserviceimpl.insertExceptions(mexceptions);
			
			sv.setTrue_false(true);
		}else{
			/*
			 *  set some message text in the sv ie: if the famcos is 0, then there's no 
			 *  row entry for the system, company combo 
			 */
			sv.setMessage("No entry in the Firm_Mgmt_Co table for the select System, Company!");
			sv.setTrue_false(false);
		}

		return sv;
	}
	
	/*
	 * 
	 */
	@RequestMapping("/deleteException")
	@ResponseBody
	public SearchValidator callDeleteException(HttpServletRequest request){

		HttpSession session = request.getSession();		
		sv = new SearchValidator();
		String _field_cd = (String)session.getAttribute("FIELD_CD");
		int _firm_mgmt_co_id = Integer.parseInt((String)session.getAttribute("FIRM_MGMT_CO_ID")); 
		
		return sv;
	}
	
    /*
     * using the field_cd + firm_mgmt_co_id to identify a single row to edit
     */
	@RequestMapping("/editExceptions")
	@ResponseBody
	public MExceptions editException(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		String _field_cd = (String)session.getAttribute("FIELD_CD");
		int _firm_mgmt_co_id = Integer.parseInt((String)session.getAttribute("FIRM_MGMT_CO_ID")); 
		List<MExceptions> exceptions = exceptionsserviceimpl.doFindSingleExceptions(_field_cd, _firm_mgmt_co_id); 

		return (exceptions.size() > 0) ? exceptions.get(0) : null;		
	}
			
	/*
	 * 
	 */
	@RequestMapping("/updateException")
	@ResponseBody
	public SearchValidator callUpdateAlert(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		String _field_cd = (String)session.getAttribute("FIELD_CD");
		int _firm_mgmt_co_id = Integer.parseInt((String)session.getAttribute("FIRM_MGMT_CO_ID")); 
		sv = new SearchValidator();
		List<MExceptions> mexceptions = exceptionsserviceimpl.doFindSingleExceptions(_field_cd, _firm_mgmt_co_id); 
		// Have to flesh out the error condition
		if(mexceptions.size() > 0){
			MExceptions mexception = mexceptions.get(0); 
					
			mexception.setExcep_dsc((String)request.getParameter("excep_dsc"));
			mexception.setLst_updt_dtm(getFormatedNowDate());
			mexception.setLst_updt_userid(this.getUserName(request));
			
			this.exceptionsserviceimpl.updateExceptions(mexception);
			
			sv.setTrue_false(true);
		}else{
			/*
			 *  set some message text in the sv ie: if the famcos is 0, then there's no 
			 *  row entry for the system, company combo 
			 */
			sv.setMessage("No entry in the Firm_Mgmt_Co table for the select System, Company!");
			sv.setTrue_false(false);
		}
		
		return sv;
	}
			
}
