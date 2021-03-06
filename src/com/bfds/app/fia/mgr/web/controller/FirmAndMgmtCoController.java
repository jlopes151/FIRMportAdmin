package com.bfds.app.fia.mgr.web.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;

import com.bfds.app.fia.mgr.service.impl.FirmAndMgmtCoServiceImpl;
import com.bfds.app.fia.mgr.model.FirmAndMgmtCo;
import com.bfds.app.fia.mgr.model.MgmtCo;
import com.bfds.app.fia.mgr.model.Firm;
import com.bfds.app.fia.mgr.model.SearchValidator;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class FirmAndMgmtCoController extends FIRMportAdminController {
					
	private static Logger logger;

	private final FirmAndMgmtCoServiceImpl firmandmgmtcoserviceimpl;	
	private SearchValidator sv;

	@Autowired
	public FirmAndMgmtCoController(FirmAndMgmtCoServiceImpl firmandmgmtcoserviceimpl){
		this.firmandmgmtcoserviceimpl = firmandmgmtcoserviceimpl;
	}

	/*
	 * This handler gets the firmId and MgmtCoId from the view table rows.
	 */
	@RequestMapping(value="/setFAMCoRowToEdit", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator setRowToEdit(HttpServletRequest request){

		HttpSession session = request.getSession();
		session.setAttribute("FIRM_ID", (String)request.getParameter("firmId"));
		session.setAttribute("MGMTCO_ID", (String)request.getParameter("mgmtcoId"));
		logger.info("Setting the firm_id = " + (String)request.getParameter("firmId") + 
				" the mgmt_co_id = " + (String)request.getParameter("mgmtcoId")); 
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}

	/*
	 * This handler gets the firmId and MgmtCoId from view table rows.
	 */
	@RequestMapping(value="/setFAMCoToSearch", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator setFAMCoToSearch(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		session.setAttribute("SHORTNAME", (String)request.getParameter("shortname"));
		session.setAttribute("SYSTEM", (String)request.getParameter("system"));
		session.setAttribute("COMPANY", (String)request.getParameter("company"));

		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}

	/*
	 * save the company id
	 */
	@RequestMapping(value="/famSaveCompany", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator saveCompany(HttpServletRequest request){

		HttpSession session = request.getSession();
		session.setAttribute("MGMTCO_ID", (String)request.getParameter("sel_company"));
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}

	/*
	 * save the system id
	 */
	@RequestMapping(value="/famSaveSystem", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator saveSystem(HttpServletRequest request){

		HttpSession session = request.getSession();
		session.setAttribute("FIRM_ID", (String)request.getParameter("sel_system"));

		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}

	/*
	 * 
	 */
	@RequestMapping("/viewFrmNMgmtCoPage")
	public String callFirmAndMgmtCo(){
		return "viewFrmNMgmtCoPage";
	}

	/*
	 * 
	 */
	@RequestMapping("/showSingleMgmtCo" )
	@ResponseBody
	public List<MgmtCo> callShowSingleMgmtCo(@RequestParam("system") String system,
											 @RequestParam("company") String company){		

		List<MgmtCo> mgmtco = firmandmgmtcoserviceimpl.doFindSingleMgmtCo(system, company); 

		return mgmtco;
	}
	
	/*
	 * 
	 */
	@RequestMapping("/showSingleFirm" )
	@ResponseBody
	public List<Firm> callShowSingleFirm(@RequestParam("shortName") String shortName){		

		List<Firm> firm = firmandmgmtcoserviceimpl.doFindSingleFirm(shortName); 

		return firm;
	}
	
	/*
	 * Display the Add Firm And Mgmt Page coming from the Nav
	 */
	@RequestMapping("/doAddFrmNMgmtCoPage")
	public String addFirmAndMgmtCoPage(){		
		return "addFrmNMgmtCoPage";
	}
							
	/*
	 * Display the Edit Firm And Mgmt Page
	 */
	@RequestMapping("/editFrmNMgmtCoPage")
	public String editFirmAndMgmtCoPage(){
		return "editFrmNMgmtCoPage";
	}
	
	/*
	 * Display the Delete Firm And Mgmt Page
	 */
	@RequestMapping("/deleteFrmNMgmtCoPage")
	public String deleteFirmAndMgmtCoPage(){
		return "deleteFrmNMgmtCoPage";
	}
	
	/*
	 * Store the new firm management company data
	 */
	@RequestMapping("/addFirmAndMgmtCo")
	@ResponseBody
	public SearchValidator callAddFirmAndMgmtCo(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		
		int _sel_system = Integer.parseInt((String)session.getAttribute("FIRM_ID"));
		int _sel_company = Integer.parseInt((String)session.getAttribute("MGMTCO_ID"));
		
		FirmAndMgmtCo firmandmgmtco = new FirmAndMgmtCo();
		sv = new SearchValidator();
		
		firmandmgmtco.setFirm_id(_sel_system);
		firmandmgmtco.setMgmt_co_id(_sel_company);
		firmandmgmtco.setGroup((String)request.getParameter("group"));
		firmandmgmtco.setTa2000_dealr_num((String)request.getParameter("ta2000_dealr_num"));
		firmandmgmtco.setActive_ind((String)request.getParameter("active_ind"));
		
		String stvdt = (String)request.getParameter("active_dt");
		String setActive_dt = (stvdt.compareToIgnoreCase("") == 0) ? null : stvdt;
		firmandmgmtco.setActive_dt(setActive_dt);
		
		String iactvdt = (String)request.getParameter("inactive_dt");
		String setInactive_dt = (iactvdt.compareToIgnoreCase("") == 0) ? null : iactvdt;
		firmandmgmtco.setInactive_dt(setInactive_dt);
		
		firmandmgmtco.setVision_ind((String)request.getParameter("vision_ind"));
		firmandmgmtco.setFan_mail_ind((String)request.getParameter("fan_mail_ind"));

		String obcdt = (String)request.getParameter("omnibus_conversion_dt");
		String setOmnibus_conversion_dt = (obcdt.compareToIgnoreCase("") == 0) ? null : obcdt;
		firmandmgmtco.setOmnibus_conversion_dt(setOmnibus_conversion_dt);
		
		firmandmgmtco.setOmniserv_ind((String)request.getParameter("omniserv_ind"));
		firmandmgmtco.setAsof_trad_window((String)request.getParameter("asof_trad_window"));
		firmandmgmtco.setOmnibus_trad_proc_cd((String)request.getParameter("omnibus_trad_proc_cd"));
		firmandmgmtco.setBatch_typ_cd((String)request.getParameter("batch_typ_cd"));
		firmandmgmtco.setSettlement_typ_cd((String)request.getParameter("settlement_typ_cd"));
		firmandmgmtco.setPost_settlement_chng_ind((String)request.getParameter("post_settlement_chng_ind"));
		firmandmgmtco.setPtf_acat_trnsfr_ind((String)request.getParameter("ptf_acat_trnsfr_ind"));
		firmandmgmtco.setDst_vho_ind((String)request.getParameter("dst_vho_ind"));
		
		firmandmgmtco.setLst_updt_userid(this.getUserName(request));
		
		sv.setTrue_false(true);
		try{
			this.firmandmgmtcoserviceimpl.insertFirmAndMgmtCo(firmandmgmtco) ;
		}catch(Exception e){
//			logger.info("Message " + e.getMessage() + " cause:" + e.getCause());
			sv.setTrue_false(false);
			//sv.setMessage("<ul><li>The record already exists</li><ul>");
		}
		
		return sv;
	}
	
	/*
	 * 
	 */
	@RequestMapping("/deleteFirmAndMgmtCo")
	@ResponseBody
	public SearchValidator callDeleteFirmAndMgmtCo(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		sv = new SearchValidator();
		/*
		 * did the user select a record 
		 */
		String system  = (String)session.getAttribute("SYSTEM");
		String company = (String)session.getAttribute("COMPANY");

		if((system != null) && (company != null)){
			int _sel_system = Integer.parseInt(system);
			int _sel_company = Integer.parseInt(company);
			this.firmandmgmtcoserviceimpl.deleteFirmAndMgmtCo(_sel_system, _sel_company);			
			sv.setTrue_false(true);
		}else{
			sv.setTrue_false(false);
			sv.setMessage("A record was not selected, you must select a record to delete!");
		}
		return sv;
	}
	
	/*
	 * 
	 */
	@RequestMapping("/editFirmAndMgmtCo" )
	@ResponseBody
	public FirmAndMgmtCo callEditSingleMgmtCo(HttpServletRequest request){		

		HttpSession session = request.getSession();
		
		int _sel_system = Integer.parseInt((String)session.getAttribute("FIRM_ID"));
		int _sel_company = Integer.parseInt((String)session.getAttribute("MGMTCO_ID"));
		List<FirmAndMgmtCo> famc = firmandmgmtcoserviceimpl.doFindSingleFirmAndMgmtCo(_sel_system, _sel_company); 
		
		return (famc.size() > 0 ) ? famc.get(0) : null;
	}
	
	/*
	 * 
	 */
	@RequestMapping("/updateFAMgmtCo")
	@ResponseBody
	public SearchValidator callUpdateFirmAndMgmtCo(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		
		int _sel_system = Integer.parseInt((String)session.getAttribute("FIRM_ID"));
		int _sel_company = Integer.parseInt((String)session.getAttribute("MGMTCO_ID"));
		// a record should have come back as it would have been listed in the view page
		
		List<FirmAndMgmtCo> famc = firmandmgmtcoserviceimpl.doFindSingleFirmAndMgmtCo(_sel_system, _sel_company);
		FirmAndMgmtCo fa = famc.get(0);
		sv = new SearchValidator();
		
		fa.setGroup((String)request.getParameter("group"));
		fa.setTa2000_dealr_num((String)request.getParameter("ta2000_dealr_num"));
		fa.setActive_ind((String)request.getParameter("active_ind"));
		// will have set the invalid date to null
		String atvdt = (String)request.getParameter("active_dt");
		String setActive_dt = (atvdt.compareToIgnoreCase("") == 0) ? null : atvdt;
		fa.setActive_dt(setActive_dt);
		
		String inatvdt = (String)request.getParameter("inactive_dt");
		String setInActive_dt = (inatvdt.compareToIgnoreCase("") == 0) ? null : inatvdt;
		fa.setInactive_dt(setInActive_dt);
		
		fa.setVision_ind((String)request.getParameter("vision_ind"));
		fa.setFan_mail_ind((String)request.getParameter("fan_mail_ind"));
		
		String omcdt = (String)request.getParameter("omnibus_conversion_dt");
		String setOmnibus_conversion_dt = (omcdt.compareToIgnoreCase("") == 0) ? null : omcdt;
		fa.setOmnibus_conversion_dt(setOmnibus_conversion_dt);
		
		fa.setOmniserv_ind((String)request.getParameter("omniserv_ind"));
		fa.setAsof_trad_window((String)request.getParameter("asof_trad_window"));
		fa.setOmnibus_trad_proc_cd((String)request.getParameter("omnibus_trad_proc_cd"));
		fa.setBatch_typ_cd((String)request.getParameter("batch_typ_cd"));
		fa.setSettlement_typ_cd((String)request.getParameter("settlement_typ_cd"));
		fa.setPost_settlement_chng_ind((String)request.getParameter("post_settlement_chng_ind"));
		fa.setPtf_acat_trnsfr_ind((String)request.getParameter("ptf_acat_trnsfr_ind"));
		fa.setDst_vho_ind((String)request.getParameter("dst_vho_ind"));
		fa.setLst_updt_userid(this.getUserName(request));
		
		sv.setTrue_false(true);

		try{
			this.firmandmgmtcoserviceimpl.updateFirmAndMgmtCo(fa);
		}catch(Exception e){
			sv.setTrue_false(false);
			logger.info("There was an error: " + e.getMessage());
		}

		return sv;
	}
			
}
