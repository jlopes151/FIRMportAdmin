package com.bfds.app.fia.mgr.web.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;

import com.bfds.app.fia.mgr.service.impl.BranchServiceImpl;
import com.bfds.app.fia.mgr.service.impl.FirmServiceImpl;
import com.bfds.app.fia.mgr.model.Branch;
import com.bfds.app.fia.mgr.model.SearchValidator;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class BranchController extends FIRMportAdminController {
	
	private static Logger logger;

	private final BranchServiceImpl branchserviceimpl;
//	private int _firm_id;
//	private int _branch_id;
//	private String branch_cd;
	
	private SearchValidator sv;

	@Autowired
	public BranchController(BranchServiceImpl branchserviceimpl){
		this.branchserviceimpl = branchserviceimpl;
	}
	
	/*
	 * 
	 */
	@RequestMapping(value="/setBranchRowToEdit", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator setRowIndex(HttpServletRequest request){

		HttpSession session = request.getSession();
		session.setAttribute("FIRM_ID", (String)request.getParameter("firm_id"));
		session.setAttribute("BRANCH_ID", (String)request.getParameter("branch_id"));
				
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}

	@RequestMapping("/viewBranchsPage")
	public String callViewBranchs(){
		return "viewBranchsPage";
	}
	
	@RequestMapping("/showAllBranches" )
	@ResponseBody
	public List<Branch> callShowAllBranches(){

		List<Branch> branch = branchserviceimpl.doFindAllBranch(); 
		
		return branch;
	}

	/*
	 * Store the new Branch data
	 */
	@RequestMapping("/addBranchPage")
	public String callAddBranch(){
		return "addBranchPage";
	}
	
	/*
	 * Edit the selected Branch
	 */
	@RequestMapping("/editBranchPage")
	public String callEditBranch(){
		return "editBranchPage";
	}
	
	/*
	 * Store the new Branch data
	 */
	@RequestMapping("/addBranch")
	@ResponseBody
	public SearchValidator callAddBranch(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		
		int _firm_id = Integer.parseInt((String)session.getAttribute("FIRM_ID"));

		Branch branch = new Branch();
		
		branch.setFirm_id(_firm_id);
		branch.setBranch_cd((String)request.getParameter("branch_cd"));
		branch.setBranch_address1((String)request.getParameter("branch_address1"));
		branch.setBranch_address2((String)request.getParameter("branch_address2"));
		branch.setBranch_city((String)request.getParameter("branch_city"));
		branch.setBranch_state_cd((String)request.getParameter("branch_state_cd"));
		branch.setBranch_zip_cd((String)request.getParameter("branch_zip_cd"));
		branch.setLst_updt_userid(this.getUserName(request));
		
		this.branchserviceimpl.insertBranch(branch);
		
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}
	
	/*
	 * 
	 */
	@RequestMapping("/deleteBranch")
	@ResponseBody
	public void callDeleteBranch(HttpServletRequest request){

		HttpSession session = request.getSession();
		
/*		
		Branch branch = new Branch();
		int branchid = Integer.parseInt(branch_id);
		
		this.firmserviceimpl.deleteFirm(firm);
*/		
		return;
	}
	
	/*
	 * Store the one select system id
	 */
	@RequestMapping("/branchSaveSystem")
	@ResponseBody
	public SearchValidator callSaveSelectedSystem(HttpServletRequest request){

		HttpSession session = request.getSession();
		session.setAttribute("FIRM_ID", "sel_system");
		
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}
	
	/*
	 * Get the Branch data to edit
	 */
	@RequestMapping("/editBranch")
	@ResponseBody
	public Branch branchToEdit(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		int _firm_id   = Integer.parseInt((String)session.getAttribute("FIRM_ID"));
		int _branch_id = Integer.parseInt((String)session.getAttribute("BRANCH_ID"));
		
		List<Branch> branch = branchserviceimpl.doFindSingleBranch(_firm_id, _branch_id); 

		return (branch.size() > 0) ? branch.get(0) : null;		
	}
			
	/*
	 * 
	 */
	@RequestMapping("/updateBranch")
	@ResponseBody
	public SearchValidator callUpdateBranch(HttpServletRequest request){
		
	    HttpSession session = request.getSession();
		
		int _firm_id = Integer.parseInt((String)session.getAttribute("FIRM_ID"));
		int _branch_id = Integer.parseInt((String)session.getAttribute("BRANCH_ID"));
		sv = new SearchValidator();
		List<Branch> branches = branchserviceimpl.doFindSingleBranch(_firm_id, _branch_id); 

		if(branches.size() > 0){
			Branch branch = branches.get(0);
			
			branch.setBranch_address1((String)request.getParameter("branch_address1"));
			branch.setBranch_address2((String)request.getParameter("branch_address2"));
			branch.setBranch_city((String)request.getParameter("branch_city"));
			branch.setBranch_state_cd((String)request.getParameter("branch_state_cd"));
			branch.setBranch_zip_cd((String)request.getParameter("branch_zip_cd"));
			branch.setLst_updt_userid(this.getUserName(request));
			
		    this.branchserviceimpl.updateBranch(branch);
			sv.setTrue_false(true);
		}else{
			sv.setTrue_false(false);
			sv.setMessage("Fail: The branch was not updated!");
		}

		return sv;
	}
}
