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
import com.bfds.app.fia.mgr.service.impl.TransmissionServiceImpl;
import com.bfds.app.fia.mgr.service.impl.UtilServiceImpl;
import com.bfds.app.fia.mgr.model.FirmAndMgmtCo;
import com.bfds.app.fia.mgr.model.PosFileSched;
import com.bfds.app.fia.mgr.model.TransFileType;
import com.bfds.app.fia.mgr.model.Transmission;
import com.bfds.app.fia.mgr.model.SearchValidator;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class TransmissionController extends FIRMportAdminController {
	
	private static Logger logger;

	private final TransmissionServiceImpl transmissionserviceimpl;
	private final UtilServiceImpl utilserviceimpl;
	private final FirmAndMgmtCoServiceImpl firmandmgmtcoserviceimpl;
	private SearchValidator sv;

	@Autowired
	public TransmissionController(TransmissionServiceImpl transmissionserviceimpl,
								  UtilServiceImpl utilserviceimpl,
								  FirmAndMgmtCoServiceImpl firmandmgmtcoserviceimpl){
		this.transmissionserviceimpl = transmissionserviceimpl;
		this.utilserviceimpl = utilserviceimpl;
		this.firmandmgmtcoserviceimpl = firmandmgmtcoserviceimpl;
	}
	
	/*
	 * 
	 */
	@RequestMapping(value="/setTransmissionRowToEdit", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator setRowIndex(HttpServletRequest request){
		HttpSession session = request.getSession();

		session.setAttribute("TRANS_ID", "trans_id");
		session.setAttribute("FIRM_MGMT_CO_ID", "firm_mgmt_co_id");

		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}

	@RequestMapping("/viewTransmissionsPage")
	public String callViewTransmissions(){
		return "viewTransmissionsPage";
	}
	
	@RequestMapping("/getTransFileType" )
	@ResponseBody
	public List<TransFileType> callGetTransFileType(){
		List<TransFileType> transfiletype = this.utilserviceimpl.getTransFileType(); 
		return transfiletype;
	}

	@RequestMapping("/showAllTrans" )
	@ResponseBody
	public List<Transmission> callShowAllTransmissions(){
		List<Transmission> transmission = transmissionserviceimpl.doFindAllTransmission(); 
		return transmission;
	}

	/*
	 * Store the new Transmission data
	 */
	@RequestMapping("/addTransmissionPage")
	public String callAddTransmissionPage(){
		return "addTransmissionPage";
	}
	
	/*
	 * Edit the selected Transmission
	 */
	@RequestMapping("/editTransmissionPage")
	public String callEditTransmission(){
		return "editTransmissionPage";
	}
	
	/*
	 * Store the new Transmission data
	 */
	@RequestMapping("/addTransmission")
	@ResponseBody
	public SearchValidator callAddTransmission(HttpServletRequest request){		

		HttpSession session = request.getSession();
		sv = new SearchValidator();
		int _system_id = Integer.parseInt((String)session.getAttribute("SYSTEM_ID"));
		int _company_id = Integer.parseInt((String)session.getAttribute("COMPANY_ID"));
		
		List<FirmAndMgmtCo> fams = this.firmandmgmtcoserviceimpl.doFindSingleFirmAndMgmtCo(_system_id, _company_id);
		if(fams.size() > 0){
			FirmAndMgmtCo fam = fams.get(0); 

			Transmission transmission = new Transmission();
			transmission.setFirm_mgmt_co_id(fam.getFirm_mgmt_co_id());
			transmission.setTrans_file_typ_cd((String)request.getParameter("trans_file_typ_cd"));
			transmission.setPos_file_sched_cd((String)request.getParameter("pos_file_sched_cd"));
			transmission.setLst_updt_userid(this.getUserName(request));
			
			this.transmissionserviceimpl.insertTransmission(transmission);
		}
		sv.setTrue_false(true);

		return sv;
	}
	
	/*
	 * 
	 */
	@RequestMapping("/deleteTransmission")
	@ResponseBody
	public SearchValidator callDeleteTransmission(HttpServletRequest request){

		sv = new SearchValidator();
/*		
		Transmission transmission = new Transmission();
		int transmissionid = Integer.parseInt(transmission_id);
		
		this.firmserviceimpl.deleteFirm(firm);
*/		
		sv.setTrue_false(true);

		return sv;
	}
	
	/*
	 * Get the Transmission data to edit
	 */
	@RequestMapping("/editTransmission")
	@ResponseBody
	public Transmission transmissionToEdit(HttpServletRequest request){

//		List<Transmission> transmission = transmissionserviceimpl.doFindSingleTransmission(_trans_id, _firm_mgmt_co_id); 

//		return (transmission.size() > 0) ? transmission.get(0) : null;
		return null;
	}
			
	/*
	 * 
	 */
	@RequestMapping("/transSaveSystem")
	@ResponseBody
	public SearchValidator transSaveSystem(HttpServletRequest request){

		HttpSession session = request.getSession();
		session.setAttribute("SYSTEM_ID", (String)request.getParameter("sel_system"));
		
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}
			
	/*
	 * 
	 */
	@RequestMapping("/transSaveCompany")
	@ResponseBody
	public SearchValidator transSaveCompany(HttpServletRequest request){

		HttpSession session = request.getSession();
		session.setAttribute("COMPANY_ID", (String)request.getParameter("sel_company"));
		
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}
			
	/*
	 * 
	 */
	@RequestMapping("/transSavePositionFileSched")
	@ResponseBody
	public SearchValidator transSaveTransPositionFileSched(HttpServletRequest request){

		HttpSession session = request.getSession();
		session.setAttribute("POSITIONFILESCHED", (String)request.getParameter("sel_positionfilesched"));
		
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}
			
	/*
	 * 
	 */
	@RequestMapping("/transSaveTransFileType")
	@ResponseBody
	public SearchValidator transSaveTransFileType(HttpServletRequest request){

		HttpSession session = request.getSession();
		session.setAttribute("TRANSFILETYPE", (String)request.getParameter("sel_transfiletype"));
		
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}
			
	/*
	 * 
	 */
	@RequestMapping("/updateTransmission")
	@ResponseBody
	public SearchValidator callUpdateTransmission(){

/*		
		List<Transmission> transmissions = transmissionserviceimpl.doFindSingleTransmission(_trans_id,_firm_mgmt_co_id); 
		Transmission existingtrans = transmissions.get(0);
		if(pos_file_sched_cd != null){
			existingtrans.setPos_file_sched_cd(pos_file_sched_cd);
		}
		if(trans_file_typ_cd != null){
			existingtrans.setTrans_file_typ_cd(trans_file_typ_cd);
		}
		existingtrans.setLst_updt_dtm(getFormatedNowDate());
//request.getRemoteUser()		
//		existingtrans.setLst_updt_userid(this.getUserName(request));
*/		
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}
}
