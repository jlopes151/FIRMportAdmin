package com.bfds.app.fia.mgr.web.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;

import com.bfds.app.fia.mgr.service.impl.MgmtCoServiceImpl;
import com.bfds.app.fia.mgr.model.MgmtCo;
import com.bfds.app.fia.mgr.model.SearchValidator;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class MgmtCoController extends FIRMportAdminController {

	private static Logger logger;

	private final MgmtCoServiceImpl mgmtcoserviceimpl;	
	private SearchValidator sv;
	
	@Autowired
	public MgmtCoController(MgmtCoServiceImpl mgmtcoserviceimpl){
		this.mgmtcoserviceimpl = mgmtcoserviceimpl;
	}

	/*
	 * 
	 */
	@RequestMapping(value="/setMgmtCoRowToEdit", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator setRowIndex(HttpServletRequest request){		
		HttpSession session = request.getSession();
		
		try{
			String _system = URLDecoder.decode((String)request.getParameter("system"), "UTF-8");			
			session.setAttribute("SYSTEM", _system);
			session.setAttribute("COMPANY", (String)request.getParameter("company"));
			logger.info("The MGMT_CO to edit SYSTEM - " + _system + " Company = " + (String)request.getParameter("company"));
		}catch(UnsupportedEncodingException ue){
			logger.info("The setMgmtCoRowToEdit has thrown " + ue.getMessage());
		}
		sv = new SearchValidator();
		sv.setTrue_false(true);
		
		return sv;
	}

	/*
	 * 
	 */
	@RequestMapping("/viewMgmtCoPage")
	public String callFirms(){
		return "viewMgmtcoPage";
	}

	/*
	 * 
	 */
	@RequestMapping("/mgmtShowAll" )
	@ResponseBody
	public List<MgmtCo> callMgmtCoShowAll(HttpServletRequest request){
		HttpSession session = request.getSession();
		String _system = (String)session.getAttribute("SYSTEM");
		String _company = (String)session.getAttribute("COMPANY");
		logger.info("ShowAll Companies System = " + _system + " Company = " + _company);
		
		List<MgmtCo> mgmtco = mgmtcoserviceimpl.doFindAllMgmtCo(((_system == null) ? "" : _system) + "%", 
																((_company == null) ? "" : _company) + "%"); 
		
		return mgmtco;
	}
	
	/*
	 *  
	 */
	@RequestMapping("/mgmtShowSingle" )
	@ResponseBody
	public List<MgmtCo> callMgmtCoShowSingle(HttpServletRequest request){
		HttpSession session = request.getSession();
		String _system = (String)session.getAttribute("SYSTEM");
		String _company = (String)session.getAttribute("COMPANY");
		logger.info("ShowSingle Companies System = " + _system + " Company = " + _company);

		List<MgmtCo> mgmtco = mgmtcoserviceimpl.doFindAllMgmtCo(((_system == null) ? "" : _system) + "%", 
																((_company == null) ? "" : _company) + "%"); 
		
		return mgmtco;
	}
	
	/*
	 * Display the Add Mgmt Page
	 */
	@RequestMapping("/addMgmtCoPage")
	public String addMgmtCoPage(){
		return "addMgmtCoPage";
	}
	
	/*
	 * Display the Edit Mgmt Page
	 */
	@RequestMapping("/editMgmtCoPage")
	public String editMgmtCoPage(){
		return "editMgmtCoPage";
	}
	
	/*
	 * Store the new management data
	 */
	@RequestMapping("/addMgmtCo")
	@ResponseBody
	public SearchValidator callAddMgmtCo(HttpServletRequest request){
		
		sv = new SearchValidator();

		MgmtCo mgmtco = new MgmtCo();
		
		mgmtco.setTa2000_co_cd((String)request.getParameter("ta2000_co_cd"));
		mgmtco.setTa2000_sys_cd((String)request.getParameter("ta2000_sys_cd"));
		mgmtco.setMgmt_co_long_nm((String)request.getParameter("mgmt_co_long_nm"));
		mgmtco.setMgmt_co_short_nm((String)request.getParameter("mgmt_co_short_nm"));
		mgmtco.setRelationship_mgr_nm((String)request.getParameter("relationship_mgr_nm"));
		mgmtco.setLst_updt_userid(this.getUserName(request));
		mgmtco.setFund_sponsor_cd((String)request.getParameter("fund_sponsor_cd"));
		
		try{
			this.mgmtcoserviceimpl.insertMgmtCo(mgmtco);
		}catch(DuplicateKeyException dke){
			sv.setTrue_false(false);
			sv.setDuplicate(true);
			return sv;
		}
		
		sv.setTrue_false(true);

		return sv;
	}
	
	/*
	 * 
	 */
	@RequestMapping("/deleteMgmtCo")
	@ResponseBody
	public SearchValidator callDeleteMgmtCo(HttpServletRequest request){
		HttpSession session = request.getSession();
		sv = new SearchValidator();
		String _system = (String)session.getAttribute("SYSTEM");
		String _company = (String)session.getAttribute("COMPANY");
		
		this.mgmtcoserviceimpl.deleteMgmtCo(_system, _company);
		sv.setTrue_false(true);
		logger.debug("In the setMgmtCoRowToEdit with system = " + _system + " and company = " + _company  );

		return sv;
	}
	
	/*
	 * Get the MgmtCo data to edit
	 */
	@RequestMapping("/editMgmtCo")
	@ResponseBody
	public MgmtCo listOfMgmtCoToEdit(HttpServletRequest request){
		HttpSession session = request.getSession();
		String _system = (String)session.getAttribute("SYSTEM");
		String _company = (String)session.getAttribute("COMPANY");

		List<MgmtCo> mgmtco = mgmtcoserviceimpl.doFindAllMgmtCo(_system, _company);
		
		return (mgmtco.size() > 0) ? mgmtco.get(0) : null;		
	}
			
	/*
	 * 
	 */
	@RequestMapping("/updateMgmtCo")
	@ResponseBody
	public SearchValidator callUpdateMgmtCo(HttpServletRequest request						   
									  	    ){        
		HttpSession session = request.getSession();
		sv = new SearchValidator();
		String _system = (String)session.getAttribute("SYSTEM");
		String _company = (String)session.getAttribute("COMPANY");

		List<MgmtCo> mgmtco = mgmtcoserviceimpl.doFindSingleMgmtCo(_system, _company);
		MgmtCo mco = mgmtco.get(0);
				
		mco.setTa2000_co_cd((String)request.getParameter("ta2000_co_cd"));
		mco.setTa2000_sys_cd((String)request.getParameter("ta2000_sys_cd"));
		mco.setMgmt_co_long_nm((String)request.getParameter("mgmt_co_long_nm"));
		mco.setMgmt_co_short_nm((String)request.getParameter("mgmt_co_short_nm"));
		mco.setRelationship_mgr_nm((String)request.getParameter("relationship_mgr_nm"));
		mco.setFund_sponsor_cd((String)request.getParameter("fund_sponsor_cd"));
		
		this.mgmtcoserviceimpl.updateMgmtCo(mco);
		
		sv.setTrue_false(true);

		return sv;
	}
			
}
