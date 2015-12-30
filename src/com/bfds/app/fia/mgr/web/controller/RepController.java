package com.bfds.app.fia.mgr.web.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;

import com.bfds.app.fia.mgr.service.impl.RepServiceImpl;
import com.bfds.app.fia.mgr.model.Rep;
import com.bfds.app.fia.mgr.model.SearchValidator;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class RepController extends FIRMportAdminController {
	
	private static Logger logger;

	private final RepServiceImpl repserviceimpl;	
	private SearchValidator sv;

	@Autowired
	public RepController(RepServiceImpl repserviceimpl){
		this.repserviceimpl = repserviceimpl;
	}
	
	/*
	 * 
	 */
	@RequestMapping(value="/setRepRowToEdit", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator setRowIndex(HttpServletRequest request){

		HttpSession session = request.getSession();
		sv = new SearchValidator();

		session.setAttribute("REP_ID", (String)request.getParameter("rep_id")); 
		session.setAttribute("FIRM_ID", (String)request.getParameter("firm_id")); 

		sv.setTrue_false(true);

		return sv;
	}

	@RequestMapping("/viewRepsPage")
	public String callViewReps(){
		return "viewRepsPage";
	}
	
	@RequestMapping("/showAllReps" )
	@ResponseBody
	public List<Rep> callShowAllReps(){
		List<Rep> rep = repserviceimpl.doFindAllRep(); 
		return rep;
	}

	/*
	 * Store the new Rep data
	 */
	@RequestMapping("/addRepPage")
	public String callAddRep(){
		return "addRepPage";
	}
	
	/*
	 * Edit the selected Rep
	 */
	@RequestMapping("/editRepPage")
	public String callEditRep(){
		return "editRepPage";
	}
	
	/*
	 * Store the new Rep data
	 */
	@RequestMapping("/addRep")
	@ResponseBody
	public SearchValidator callAddRep(HttpServletRequest request){

		HttpSession session = request.getSession();
		sv = new SearchValidator();
//		session.setAttribute("REP_ID", (String)request.getParameter("ta2000_co_cd")); 

		Rep rep = new Rep();
		
		this.repserviceimpl.insertRep(rep);
		
		sv.setTrue_false(true);

		return sv;
	}
	
	/*
	 * 
	 */
	@RequestMapping("/deleteRep")
	@ResponseBody
	public SearchValidator callDeleteRep(HttpServletRequest request){

		HttpSession session = request.getSession();
		sv = new SearchValidator();
		int _rep_id  = Integer.parseInt((String)session.getAttribute("REP_ID")); 
		int _firm_id = Integer.parseInt((String)session.getAttribute("FIRM_ID")); 
		
		return sv;
	}
	
	/*
	 * Get the Rep data to edit
	 */
	@RequestMapping("/editRep")
	@ResponseBody
	public Rep repToEdit(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		String rep_id = (String)session.getAttribute("REP_ID");
		int _rep_id = Integer.parseInt(rep_id);

		List<Rep> rep = repserviceimpl.doFindAllRep(); 

		return (rep.size() > 0) ? rep.get(0) : null;		
	}
			
	/*
	 * Getting an existing rep object and updating its data 
	 */
	@RequestMapping("/updateRep")
	public SearchValidator callUpdateRep(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		String rep_id = (String)session.getAttribute("REP_ID");
		int _rep_id = Integer.parseInt(rep_id);
		
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}
}
