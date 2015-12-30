package com.bfds.app.fia.mgr.web.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;

import com.bfds.app.fia.mgr.service.impl.FrmFndAndClsAgreServiceImpl;
import com.bfds.app.fia.mgr.service.impl.UtilServiceImpl;
import com.bfds.app.fia.mgr.model.FrmFndAndClsAgre;
import com.bfds.app.fia.mgr.model.SearchValidator;

import java.util.List;

@Controller
public class FirmFndAndClsAgreController extends FIRMportAdminController {

	private static Logger logger;

	private final FrmFndAndClsAgreServiceImpl frmfndandclsagreserviceimpl;
	private int ffacaIndex;
	
	private SearchValidator sv;

	@Autowired
	public FirmFndAndClsAgreController(FrmFndAndClsAgreServiceImpl frmfndandclsagreserviceimpl){
		this.frmfndandclsagreserviceimpl = frmfndandclsagreserviceimpl;
	}
	
	/*
	 * 
	 */
	@RequestMapping(value="/setFFACARowIndex", method=RequestMethod.POST)
	public void setRowIndex(@RequestParam("rowIndex") String rowIndex){
		ffacaIndex = Integer.parseInt(rowIndex) - 1;		
		return;
	}

	/*
	 * 
	 */
	@RequestMapping("/viewFirmFndAndClsAgrePage")
	public String callFirmFndAndClsAgre(){
		return "viewFirmFndAndClsAgrePage";
	}

	/*
	 * 
	 */
	@RequestMapping("/firmFndAndClsAgreShowAll")
	@ResponseBody
	public List<FrmFndAndClsAgre> callFirmFndAndClsAgreShowAll(){
		List<FrmFndAndClsAgre> firmfndandclsagre = frmfndandclsagreserviceimpl.doFindAllFrmFndAndClsAgre(); 
		return firmfndandclsagre;
	}
	
	/*
	 * Display the display the Add Firm Fund and Class Agreement Page
	 */
	@RequestMapping("/addFirmFndAndClsAgrePage")
	public String addFirmFndAndClsAgrePage(){
		return "addFirmFndAndClsAgrePage";
	}
		
	/*
	 * Store the new Firm Fund and Class Agreement data
	 */
	@RequestMapping("/addFirmFndAndClsAgre")
	public void callAddFirmFndAndClsAgre(@RequestParam("ta2000_co_cd") String ta2000_co_cd 
								 ){
		
		FrmFndAndClsAgre frmfndandclsagre = new FrmFndAndClsAgre();
		
		this.frmfndandclsagreserviceimpl.insertFrmFndAndClsAgre(frmfndandclsagre);
		
		return;
	}
	
	/*
	 * 
	 */
	@RequestMapping("/deleteFrmFndAndClsAgre")
	public void callDeleteFrmFndAndClsAgre(@RequestParam("mgmt_co_id") String mgmt_co_id){
		
		FrmFndAndClsAgre frmfndandclsagre = new FrmFndAndClsAgre();
		int mgmtcoid = Integer.parseInt(mgmt_co_id);
				
		this.frmfndandclsagreserviceimpl.deleteFrmFndAndClsAgre(frmfndandclsagre);
		
		return;
	}
	
	/*
	 * 
	 */
	@RequestMapping("/updateFrmFndAndClsAgre")
	@ResponseBody
	public SearchValidator callUpdateMgmtCo(@RequestParam("mgmt_co_id") String mgmt_co_id
							  	 			){
		
		FrmFndAndClsAgre frmfndandclsagre = new FrmFndAndClsAgre();
		int mgmtid = Integer.parseInt(mgmt_co_id);
		
		this.frmfndandclsagreserviceimpl.updateFrmFndAndClsAgre(frmfndandclsagre);
		
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}
	
}
