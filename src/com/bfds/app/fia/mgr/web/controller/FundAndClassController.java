package com.bfds.app.fia.mgr.web.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;

import com.bfds.app.fia.mgr.service.impl.FundAndClassServiceImpl;
import com.bfds.app.fia.mgr.model.FundAndClass;
import com.bfds.app.fia.mgr.model.SearchValidator;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class FundAndClassController extends FIRMportAdminController {
	
	private static Logger logger;

	private final FundAndClassServiceImpl facImpl;
//	private int facIndex;
	
	private SearchValidator sv;

	@Autowired
	public FundAndClassController(FundAndClassServiceImpl facImpl){
		this.facImpl = facImpl;
	}
	
	/*
	 * 
	 */
	@RequestMapping(value="/setRowIndexFAC", method=RequestMethod.POST)
	public void setRowIndex(HttpServletRequest request){
		HttpSession session = request.getSession();
		session.setAttribute("FACINDEX", (String)request.getParameter("rowIndex"));		
		return;
	}

	@RequestMapping("/viewFndnClsPage")
	public String callViewFndnCls(){
		return "viewFndnClsPage";
	}
	
	@RequestMapping("/showAllFndnCls" )
	@ResponseBody
	public List<FundAndClass> callShowAllFndnCls(){
		List<FundAndClass> fac = facImpl.doFindAllFundAndClass(); 
		return fac;
	}

	/*
	 * Store the new FundAndClass data
	 */
	@RequestMapping("/addFndnClsPage")
	public String callAddFndnCls(){
		return "addFndnClsPage";
	}
	
	/*
	 * Edit the selected FndnCls
	 */
	@RequestMapping("/editFndnClsPage")
	public String callEditFndnCls(){
		return "editFndnClsPage";
	}
	
	/*
	 * Store the new FndnCls data
	 */
	@RequestMapping("/addFndnCls")
	public void callAddFndnCls(@RequestParam("ta2000_co_cd") String ta2000_co_cd
						  ){
		
		FundAndClass fac = new FundAndClass();
		
		this.facImpl.insertFundAndClass(fac);
		
		return;
	}
	
	/*
	 * 
	 */
	@RequestMapping("/deleteFndnCls")
	public void callDeleteFndnCls(@RequestParam("firm_id") String firm_id){

		
		FundAndClass fac = new FundAndClass();
//		int facid = Integer.parseInt(alert_id);
		
		this.facImpl.deleteFundAndClass(fac);
		
		return;
	}
	
	/*
	 * Get the FndnCls data to edit
	 */
	@RequestMapping("/editFndnCls")
	@ResponseBody
	public FundAndClass alertToEdit(HttpServletRequest request){
		HttpSession session = request.getSession();
		int _facIndex = Integer.parseInt((String)session.getAttribute("FACINDEX")) - 1;
		List<FundAndClass> fac = facImpl.doFindAllFundAndClass(); 
		return fac.get(_facIndex);
		
	}
			
	/*
	 * 
	 */
	@RequestMapping("/updateFndnCls")
	@ResponseBody
	public SearchValidator callUpdateFndnCls(@RequestParam("rowIndex") String rowIndex){
		
		FundAndClass fac = new FundAndClass();
		int rindx = Integer.parseInt(rowIndex);
		//this.firmserviceimpl.updateFirm(firm);
		
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}
			
}
