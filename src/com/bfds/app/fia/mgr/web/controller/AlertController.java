package com.bfds.app.fia.mgr.web.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;

import com.bfds.app.fia.mgr.service.impl.AlertServiceImpl;
import com.bfds.app.fia.mgr.model.Alert;
import com.bfds.app.fia.mgr.model.AlertMgmtCoXref;
import com.bfds.app.fia.mgr.model.AlertTypes;
import com.bfds.app.fia.mgr.model.Firm;
import com.bfds.app.fia.mgr.model.MgmtCo;
import com.bfds.app.fia.mgr.model.SearchValidator;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.StringTokenizer;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class AlertController extends FIRMportAdminController {
	
	private static Logger logger;

	private final AlertServiceImpl alertserviceimpl;
	// using -1 to indicate not set state
	private SearchValidator sv;

	@Autowired
	public AlertController(AlertServiceImpl alertserviceimpl){
		this.alertserviceimpl = alertserviceimpl;
	}
	
	/*
	 * 
	 */
	@RequestMapping(value="/setAlertRowToEdit", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator setRowIndex(HttpServletRequest request){

		HttpSession session = request.getSession();
		logger.info("Setting the ALERT_ID to " + (String)request.getParameter("alert_id"));
		session.setAttribute("ALERT_ID", (String)request.getParameter("alert_id"));
		
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}

	@RequestMapping("/viewAlertsPage")
	public String callViewAlerts(){
		return "viewAlertsPage";
	}
	
	@RequestMapping("/showAllAlerts" )
	@ResponseBody
	public List<Alert> callShowAllAlerts(){
		List<Alert> alert = alertserviceimpl.doFindAllAlert(); 
		return alert;
	}

	/*
	 * Store the new Alert data
	 */
	@RequestMapping("/addAlertPage")
	public String callAddAlert(){
		return "addAlertPage";
	}
	
	/*
	 * Edit the selected Alert
	 */
	@RequestMapping("/editAlertPage")
	public String callEditAlert(){		
		return "editAlertPage";
	}
	
	/*
	 * Delete the selected Alert
	 */
	@RequestMapping("/deleteAlertPage")
	public String callDeleteAlert(){		
		return "deleteAlertPage";
	}
	
	/*
	 * Store the new Alert data
	 */
	@RequestMapping("/addAlert")
	@ResponseBody
	public SearchValidator callAddAlert(HttpServletRequest request){
		
		logger.debug("In the callAddAlert");
		sv = new SearchValidator();
		HttpSession session = request.getSession();
		
		int sel_sys = Integer.parseInt((String)session.getAttribute("FIRM_ID"));
		String sel_alertType = (String)session.getAttribute("ALERTTYPE");
		 
		Alert alert = new Alert();

		alert.setFirm_id(sel_sys);
		String _alert_title = (String)request.getParameter("alert_title"); 
		alert.setAlert_title(_alert_title);
		alert.setAlert_typ_cd(sel_alertType);
		/*
		 	The Alert_dt is the date the Alert is created and that date is set in the mapper
		 	using SQLServer CURRENT_TIMESTAMP. Alert_dt is not in the model
		*/
		alert.setAlert_dsc((String)request.getParameter("alert_dsc"));
		alert.setLst_updt_userid(this.getUserName(request));
		/*
		 	The Lst_updt_dtm is the date the Alert is created and that date is set in the mapper
		 	using SQLServer CURRENT_TIMESTAMP. Alert_dt is not in the model
		*/
		try{
			this.alertserviceimpl.insertAlert(alert);
		}catch(DuplicateKeyException dke){
			sv.setTrue_false(false);
			sv.setDuplicate(true);
			return sv;
		}
		logger.info("The Alert id = " + alert.getAlert_id());
		String sel_companies = (String)session.getAttribute("COMPANIES");
		/*
		 * A GLOBAL Alert is one with out companies
		 */
		if(sel_companies != null){
			StringTokenizer st = new StringTokenizer(sel_companies, ",");
	
			int[] sel_comps = new int[st.countTokens()];
			
			int entries = 0;
			while(st.hasMoreTokens()){
				sel_comps[entries] = Integer.parseInt(st.nextToken());
				entries++;
			}
			
			int _alert_id = alert.getAlert_id();
			
			// The ui requires entries so there shouldn't be an error 
			if(sel_comps != null){
				for(int amx=0; amx < sel_comps.length; amx++){
					try{
						this.alertserviceimpl.insertAlertMgmtCoXref(_alert_id, sel_comps[amx], this.getUserName(request));
					}catch(DuplicateKeyException dke){
						sv.setTrue_false(false);
						sv.setDuplicate(true);
						sv.setMessage("Duplicate record an Intermediary with the same companies already exists!");
						logger.info("Dup Key: " + dke.getMessage());
						return sv;
					}
				}
			}
			session.removeAttribute("COMPANIES");
			logger.debug("The Alert_id " + _alert_id + "  the title " + _alert_title );
			sv.setMessage("You have created an Alert with the selected companies!");
		}else{
			sv.setMessage("You have created a Global Alert!");
		}
		sv.setTrue_false(true);

		return sv;
	}
	
	/*
	 * Store the selected Company id
	 */
	@RequestMapping("/alertSaveCompanies")
	@ResponseBody
	public SearchValidator callSaveSelectedCompanies(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		session.setAttribute("COMPANIES", (String)request.getParameter("sel_companies"));
		logger.info("Saving the Companies " + (String)request.getParameter("sel_companies"));
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}
		
	/*
	 * get the stored MgmtCo id's as a single string to be parsed on the client 
	 * when the user selects a row to edit the alert id is stored here in the _alert_id
	 * now I can use it to access the xref table getting the company id's
	 */
	@RequestMapping("/editAlertMgmtCo")
	@ResponseBody
	public String callEditAlertMgmtCo(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		int _alert_id = Integer.parseInt((String)session.getAttribute("ALERT_ID"));
		
		StringBuilder mgmtcoIdList = new StringBuilder();
		
		List<AlertMgmtCoXref> amcx = this.alertserviceimpl.doFindAlertMgmtCoXref(_alert_id);
		int comma_count = 0;
		
		for(int amidx=0; amidx < amcx.size(); amidx++){
			mgmtcoIdList.append(amcx.get(amidx).getMgmt_co_id());

			if(comma_count < (amcx.size() - 1)){
				mgmtcoIdList.append(",");			
			}
			comma_count++;
			
		}
		logger.info("The editAlertMgmtCo companies = " + mgmtcoIdList.toString());
		session.setAttribute("COMPANIES", mgmtcoIdList.toString());
		
		// returning the comma separated list of companies
		return mgmtcoIdList.toString();
	}
	
	/*
	 * get the stored alert types
	 */
	@RequestMapping("/editAlertType")
	@ResponseBody
	public int callEditAlertType(@RequestParam("sel_alerttype") String sel_alerttype){

		logger.info("Getting the Alert Type");
		return 0;
	}
	
	/*
	 * Store the one selected Alert Type
	 */
	@RequestMapping("/saveSelectedAlertType")
	@ResponseBody
	public SearchValidator callSaveSelectedAlertType(HttpServletRequest request){

		HttpSession session = request.getSession();
		session.setAttribute("ALERTTYPE", (String)request.getParameter("sel_alerttype"));

		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}
	
	/*
	 * This delete removes the alert, company xref entries, before removing the
	 * alert. The User must have had selected a row before the delete
	 */
	@RequestMapping("/deleteAlert")
	@ResponseBody
	public SearchValidator callDeleteAlert(HttpServletRequest request){

		HttpSession session = request.getSession();
		sv = new SearchValidator();
		String the_alert_id = (String)session.getAttribute("ALERT_ID");
		
		/*
		 * There must be a check for the the_alert_id since the ui allows the
		 * user to click the delete nav option with out selecting a record to delete.
		 * The user must click a row in the view. 
		 */
		if(the_alert_id != null){
			int _alert_id = Integer.parseInt(the_alert_id);
			/*
			 * This method is to be called when deleting an Alert it
			 * will first delete any cross reference entries.
			 */
			alertserviceimpl.handleAlertDelete(_alert_id);		
			sv.setTrue_false(true);
		}else{
			sv.setTrue_false(false);
			sv.setMessage("<p>A record to delete was not selected, you must select a record to delete!</p>");
		}

		return sv;
	}
	
	/*
	 * Get the Alert data to edit
	 */
	@RequestMapping("/editAlert")
	@ResponseBody
	public Alert alertToEdit(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		int _alert_id = Integer.parseInt((String)session.getAttribute("ALERT_ID"));

		List<Alert> alerts = alertserviceimpl.doFindSingleAlert(_alert_id); 

		/*
		 * getting the Companies and Alert types
		 */
		Alert alert = (alerts.size() > 0) ? alerts.get(0) : null;
		
		return alert;		
	}
			
	/*
	 * Get the Alert data to edit
	 */
	@RequestMapping("/getAlertTypes")
	@ResponseBody
	public List<AlertTypes> getAlertTypes(){
		
		List<AlertTypes> alerttypes = alertserviceimpl.getAlertTypes(); 

		return alerttypes;		
	}
			
	/*
	 * 
	 */
	@RequestMapping("/updateAlert")
	@ResponseBody
	public SearchValidator callUpdateAlert(HttpServletRequest request){
		
		sv = new SearchValidator();
		HttpSession session = request.getSession();
		int _alert_id = Integer.parseInt((String)session.getAttribute("ALERT_ID"));
		String sel_alertType = (String)session.getAttribute("ALERTTYPE");
		
		// the description is the only field allowed to be changed, keeping the rest
		Alert updateAlert = alertserviceimpl.doFindSingleAlert(_alert_id).get(0);
				
		// contains the old company id's
		ArrayList<Integer> oldAXref   = new ArrayList<Integer>(1);
		ArrayList<Integer> copyAXref  = new ArrayList<Integer>(1);
		ArrayList<Integer> newAXref   = new ArrayList<Integer>(1);

		// if there had been a change to the type, otherwise put the existing type back
		if(sel_alertType != null){
			updateAlert.setAlert_typ_cd(sel_alertType);					
		}

		updateAlert.setAlert_dsc((String)request.getParameter("alert_dsc"));
		updateAlert.setAlert_title((String)request.getParameter("alert_title"));
		
		// update the Alert
		alertserviceimpl.updateAlert(updateAlert);		
		
		/*
		 * Get the existing xref and compare it's mgmt id's and update if there 
		 * are new selections, deleting any xref that are not in the new selection
		 * 
		 * if the Alert is a Global there wont be an xref object
		 */
		List<AlertMgmtCoXref> oldXref = alertserviceimpl.doFindAlertMgmtCoXref(_alert_id);

		if(oldXref != null){
			StringBuilder log_new = new StringBuilder();
			StringBuilder log_old = new StringBuilder();
	
			String sel_companies = (String)session.getAttribute("COMPANIES");
			StringTokenizer st = new StringTokenizer(sel_companies, ",");
			logger.info("The Alert Companies " + sel_companies);
			int[] sel_comps = new int[st.countTokens()];
			
			int entries = 0;
			while(st.hasMoreTokens()){
				sel_comps[entries] = Integer.parseInt(st.nextToken());
				entries++;
			}
			
			if(sel_comps != null){
				for(int n_indx=0; n_indx < sel_comps.length; n_indx++){
					newAXref.add(new Integer(sel_comps[n_indx]));
					log_new.append(sel_comps[n_indx] + ", ");
				}
			}
			
			for(int o_indx=0; o_indx < oldXref.size(); o_indx++){
				oldAXref.add(new Integer(oldXref.get(o_indx).getMgmt_co_id()));
				log_old.append(oldXref.get(o_indx).getMgmt_co_id() + ",");
			}
			
			logger.debug("Pre Old list " + log_old);
			logger.debug("Pre New list " + log_new);
			
			copyAXref.addAll(oldAXref);
			// remove all common in the old list and delete the remaining company id's
			copyAXref.removeAll(newAXref);
			// remove the common in the new and insert the remaining company id's
			newAXref.removeAll(oldAXref);
			
			// Delete xref entries
			if(oldAXref.size() > 0){
				Iterator<Integer> itr = copyAXref.iterator();			
				while(itr.hasNext()){
					Integer del_xrefObj = (Integer)itr.next();
					alertserviceimpl.deleteAlertMgmtCoXrefByAlertIdAndMcId(_alert_id, del_xrefObj.intValue());
				}			
			}
			
			// Insert xref entries
			if(newAXref.size() > 0){
				Iterator<Integer> itr = newAXref.iterator();
				while(itr.hasNext()){
					Integer ins_xrefObj = (Integer)itr.next();
					alertserviceimpl.insertAlertMgmtCoXref(_alert_id, 
														   ins_xrefObj.intValue(), 
														   this.getUserName(request));
				}
			}
			sv.setMessage("You have updated the Alert with the selected companins!");
		}else{ // end of if Globa Alert no xref
			sv.setMessage("You have updated the Global Alert!");
		}
		sv.setTrue_false(true);

		return sv;
	}
			
}
