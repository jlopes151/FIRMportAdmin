package com.bfds.app.fia.mgr.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;

import com.bfds.app.fia.mgr.service.impl.AgreementServiceImpl;
import com.bfds.app.fia.mgr.service.impl.FirmAndMgmtCoServiceImpl;
import com.bfds.app.fia.mgr.model.Agreement;
import com.bfds.app.fia.mgr.model.FirmAndMgmtCo;
import com.bfds.app.fia.mgr.model.SearchValidator;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class AgreementController extends FIRMportAdminController {
	
	private final AgreementServiceImpl agreementserviceimpl;
	private final FirmAndMgmtCoServiceImpl firmandmgmtcoserviceimpl;
	private int _agre_id;
	private int _firm_mgmt_co_id;
	private int _system_id;
	private int _company_id;
	private String _agre_typ_cd;
	
	private SearchValidator sv;

	@Autowired
	public AgreementController(AgreementServiceImpl agreementserviceimpl, 
							   FirmAndMgmtCoServiceImpl firmandmgmtcoserviceimpl){
		this.agreementserviceimpl     = agreementserviceimpl;
		this.firmandmgmtcoserviceimpl = firmandmgmtcoserviceimpl;
	}
	
	/*
	 * 
	 */
	@RequestMapping(value="/setAgreementRowToEdit", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator setRowIndex(HttpServletRequest request){

		HttpSession session = request.getSession();
		session.setAttribute("AGREE_ID", (String)request.getParameter("agre_id"));
		session.setAttribute("FIRM_MGMT_CO_ID", (String)request.getParameter("firm_mgmt_co_id"));

		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}

	@RequestMapping("/viewAgreementPage")
	public String callViewAgreement(){
		return "viewAgreementPage";
	}
	
	@RequestMapping("/showAllAgreements" )
	@ResponseBody
	public List<Agreement> callShowAllAgreement(){
		List<Agreement> agreements = agreementserviceimpl.doFindAllAgreement(); 
		return agreements;
	}

	/*
	 * Store the new Agreement data
	 */
	@RequestMapping("/addAgreementPage")
	public String callAddAgreement(){
		return "addAgreementPage";
	}
	
	/*
	 * Edit the selected Agreement
	 */
	@RequestMapping("/editAgreementPage")
	public String callEditAgreement(){
		return "editAgreementPage";
	}
	
	/*
	 * Store the one select company id
	 */
	@RequestMapping("/agreeSaveCompany")
	@ResponseBody
	public SearchValidator callSaveSelectedCompany(HttpServletRequest request) {

		HttpSession session = request.getSession();
		session.setAttribute("MGMTCO_ID", (String)request.getParameter("sel_company"));
		
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}
	
	/*
	 * Store the one select system id
	 */
	@RequestMapping("/agreeSaveSystem")
	@ResponseBody
	public SearchValidator callSaveSelectedSystem(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		session.setAttribute("FIRM_ID", (String)request.getParameter("sel_system"));
		
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}
	
	/*
	 * Store the one select agree type cd
	 */
	@RequestMapping("/agreeSaveAgreType")
	@ResponseBody
	public SearchValidator callSaveSelectedAgreType(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		session.setAttribute("AGRETYPE", (String)request.getParameter("sel_agretype"));
		
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}
	
	/*
	 * Store the new Agreement data
	 */
	@RequestMapping("/addAgreement")
	@ResponseBody
	public SearchValidator callAddAgreement(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		int _firm_id   = Integer.parseInt((String)session.getAttribute("FIRM_ID"));
		int _mgmtco_id = Integer.parseInt((String)session.getAttribute("MGMTCO_ID"));
		
		sv = new SearchValidator();
			    
		List<FirmAndMgmtCo> fams = firmandmgmtcoserviceimpl.doFindSingleFirmAndMgmtCo(_firm_id, _mgmtco_id);
		if(fams.size() > 0){
			
			FirmAndMgmtCo fam = fams.get(0);
			_firm_mgmt_co_id = fam.getFirm_mgmt_co_id();

			Agreement agreement = new Agreement();
			agreement.setFirm_mgmt_co_id(_firm_mgmt_co_id);
			agreement.setAgre_typ_cd(_agre_typ_cd);
			agreement.setAgre_eff_dt((String)request.getParameter("agre_eff_dt"));
			agreement.setAgre_term((String)request.getParameter("agre_term"));
			agreement.setAgre_parties((String)request.getParameter("agre_parties"));
			agreement.setAgre_state_cd((String)request.getParameter("agre_state_cd"));
			agreement.setFee_agre((String)request.getParameter("fee_agre"));
			agreement.setLst_updt_userid(this.getUserName(request));
			
			this.agreementserviceimpl.insertAgreement(agreement);
			
			sv.setTrue_false(true);
			
		}else{
			sv.setTrue_false(false);			
		}

		return sv;
	}
	
	/*
	 * 
	 */
	@RequestMapping("/deleteAgreement")
	public void callDeleteAgreement(@RequestParam("firm_id") String firm_id){

/*		
		Agreement agreement = new Agreement();
		int agreementid = Integer.parseInt(agreement_id);
		
		this.firmserviceimpl.deleteFirm(firm);
*/		
		return;
	}
	
	/*
	 * Get the Agreement data to edit
	 */
	@RequestMapping("/editAgreement")
	@ResponseBody
	public Agreement agreementToEdit(){
		
		List<Agreement> agreement = agreementserviceimpl.doFindSingleAgreement(_agre_id, _firm_mgmt_co_id); 

		return (agreement.size() > 0) ? agreement.get(0) : null;		
	}
			
	/*
	 * 
	 */
	@RequestMapping("/updateAgreement")
	@ResponseBody
	public SearchValidator callUpdateAgreement(@RequestParam("rowIndex") String rowIndex){
		
		Agreement agreement = new Agreement();
		int rindx = Integer.parseInt(rowIndex);
		//this.firmserviceimpl.updateFirm(firm);
		
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}
}
