package com.bfds.app.fia.mgr.web.controller;

import org.apache.log4j.Logger;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.StringTokenizer;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;

import com.bfds.app.fia.mgr.service.impl.FirmAndMgmtCoServiceImpl;
import com.bfds.app.fia.mgr.service.impl.FirmServiceImpl;
import com.bfds.app.fia.mgr.service.impl.MgmtCoServiceImpl;
import com.bfds.app.fia.mgr.model.Firm;
import com.bfds.app.fia.mgr.model.FirmAndMgmtCo;
import com.bfds.app.fia.mgr.model.FirmBrokeragePlatformXref;
import com.bfds.app.fia.mgr.model.FirmClearingFirmXref;
import com.bfds.app.fia.mgr.model.FirmDataTransMethodXref;
import com.bfds.app.fia.mgr.model.FirmFirmTypeXref;
import com.bfds.app.fia.mgr.model.FirmNsccMemberNum;
import com.bfds.app.fia.mgr.model.FirmNsccNetworkAlphaCd;
import com.bfds.app.fia.mgr.model.FirmOmnibusTradProcXref;
import com.bfds.app.fia.mgr.model.FirmPricingSourceXref;
import com.bfds.app.fia.mgr.model.FirmSettlementTypXref;
import com.bfds.app.fia.mgr.model.FirmShareholderServicingModelXref;
import com.bfds.app.fia.mgr.model.FirmSubAcctPltfrmXref;
import com.bfds.app.fia.mgr.model.FrmMgmtCoTrstFrm;
import com.bfds.app.fia.mgr.model.MgmtCo;
import com.bfds.app.fia.mgr.model.SearchValidator;
import com.bfds.app.fia.mgr.model.TA2000SubFirm;
import com.bfds.app.fia.mgr.model.TA2000SubFirmRelationship;
import com.bfds.app.fia.mgr.model.TA2kSFRDlgSet;
import com.bfds.app.fia.mgr.model.ViewFirmMgmtCoTrustFirm;

@Controller
public class FirmsController extends FIRMportAdminController {

	private static Logger logger;

	private final FirmServiceImpl firmserviceimpl;
	private final MgmtCoServiceImpl mgmtcoserviceimpl;
	private final FirmAndMgmtCoServiceImpl firmandmgmtcoserviceimpl;
	private SearchValidator sv;

	@Autowired
	public FirmsController(FirmServiceImpl firmserviceimpl,
						   MgmtCoServiceImpl mgmtcoserviceimpl,
						   FirmAndMgmtCoServiceImpl firmandmgmtcoserviceimpl){
		this.firmserviceimpl = firmserviceimpl;
		this.mgmtcoserviceimpl = mgmtcoserviceimpl;
		this.firmandmgmtcoserviceimpl = firmandmgmtcoserviceimpl;
	}

	/*
	 * 
	 */
	@RequestMapping(value="/setFirmRowToEdit", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator setFirmRowToEdit(HttpServletRequest request){

		// Not creating one if it doesn't exist
		HttpSession session = request.getSession();
		session.removeAttribute("FIRM_ID");
		session.setAttribute("FIRM_ID", (String)request.getParameter("firm_id"));
		logger.info("In the setFirmRowToEdit setting the firm_id = " + request.getParameter("firm_id"));
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}

	/*
	 * 
	 */
	@RequestMapping(value="/setTASubFirmRowToEdit", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator setTASubFirmRowToEdit(HttpServletRequest request){

		// Not creating one if it doesn't exist
		HttpSession session = request.getSession();
		
		session.removeAttribute("FIRM_ID");
		session.removeAttribute("TA2_SUB_FIRM_ID");
		session.removeAttribute("MGMT_CO_ID");
		
		session.setAttribute("FIRM_ID", (String)request.getParameter("firm_id"));
		session.setAttribute("TA2_SUB_FIRM_ID", (String)request.getParameter("tasf_id"));
		session.setAttribute("MGMT_CO_ID", (String)request.getParameter("mgmt_co_id"));
		
		logger.info("In the setTASubFirmRowToEdit setting the firm_id = " + request.getParameter("firm_id"));
		logger.info("In the setTASubFirmRowToEdit setting the tasf_id = " + request.getParameter("tasf_id"));
		logger.info("In the setTASubFirmRowToEdit setting the mgmt_co_id = " + request.getParameter("mgmt_co_id"));

		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}

	/*
	 * 
	 */
	@RequestMapping(value="/setFirmCoTrustFirmRowToEdit", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator setFirmCoTrustFirmRowToEdit(HttpServletRequest request){

		HttpSession session = request.getSession();				
		session.setAttribute("MGMT_CO_ID", (String)request.getParameter("firm_mgmt_co_id"));
		session.setAttribute("TRUST_FIRM_ID", (String)request.getParameter("trst_frm_id"));

		/*
	    logger.info("In the setFirmCoTrustFirmRowToEdit setting the trst_firm_id = " + 
		request.getParameter("trst_frm_id") + " and the firm_mgmt_co_id to " + 
		request.getParameter("firm_mgmt_co_id"));
		*/
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}

	/*
	 * 
	 */
	@RequestMapping(value="/setSearchFirm", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator setSearchFirm(HttpServletRequest request){

		HttpSession session = request.getSession();
		session.setAttribute("SHORTNAME", (String)request.getParameter("short_nm"));
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}

	/*
	 * Using this handler for more than the xref, 
	 * Calling it from the Firm, Company, Trust, Firm Add page
	 */
	@RequestMapping(value="/saveFirmMgmtco", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator saveFirmMgmtco(HttpServletRequest request){

		HttpSession session = request.getSession();				
		session.setAttribute("MGMT_CO_ID", (String)request.getParameter("mgmt_co_id"));

		// logger.info("The MGMT_CO_ID saved " + (String)request.getParameter("mgmt_co_id"));
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}

	@RequestMapping(value="/saveFirmTrust", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator saveFirmTrust(HttpServletRequest request){

		HttpSession session = request.getSession();				
		session.setAttribute("TRUST_FIRM_ID", (String)request.getParameter("sel_trust"));
		// logger.info("The TRUST_FIRM_ID = " + (String)request.getParameter("sel_trust"));
		
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}

	@RequestMapping(value="/saveFirmNonTrustTpa", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator saveFirmNonTrustTpa(HttpServletRequest request){

		HttpSession session = request.getSession();				
		session.setAttribute("NON_TRUST_TPA", (String)request.getParameter("sel_non_trust_tpa"));
		
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}

	@RequestMapping(value="/saveFirmMgmtCoTrustFirm", method=RequestMethod.POST)
	@ResponseBody
	public SearchValidator saveFirmMgmtCoTrustFirm(HttpServletRequest request){

		HttpSession session = request.getSession();				
		session.setAttribute("MGMT_CO_ID", (String)request.getParameter("sel_mgmt_co_id"));
		session.setAttribute("TRUST_FIRM_ID", (String)request.getParameter("sel_trust_firm_id"));
		session.setAttribute("NON_TRUST_FIRM_ID", (String)request.getParameter("sel_non_trust_firm_id"));
		
		sv = new SearchValidator();
		sv.setTrue_false(true);

		return sv;
	}

	@RequestMapping("/viewFirmsPage")
	public String callViewFirms(){
		return "viewFirmsPage";
	}
	
	@RequestMapping("/viewFullFirmsPage")
	public String callViewFullFirms(){
		return "viewFullFirmsPage";
	}
	
	@RequestMapping("/viewFirmCoTrustFirmPage")
	public String callViewFirmCoTrustFirm(){
		return "viewFirmCoTrustFirmPage";
	}
	
	@RequestMapping("/viewFirmCoTrustTpaFirmPage")
	public String callViewFirmCoTrustTpaFirm(){
		return "viewFirmCoTrustTpaFirmPage";
	}
	
	@RequestMapping("/viewTA2000SubFirmPage")
	public String callViewTA2000SubFirm(){
		return "viewTA2000SubFirmPage";
	}
	
	@RequestMapping("/showAllFirms" )
	@ResponseBody
	public List<Firm> callShowAllFirms(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		session.removeAttribute("FIRM_ID");

		String searchname = bfdsEntitiesDecoder((String)request.getParameter("search_nm")).replace("%20", " ").trim();
		// logger.info("The search name = " + searchname);
		List<Firm> firms = firmserviceimpl.doFindAllFirms("%" + searchname + "%");
		
		for(int fidx=0; fidx < firms.size(); fidx++){
			
			StringBuilder sb_num = new StringBuilder();
			StringBuilder sb_typ = new StringBuilder();
			
			int fid = firms.get(fidx).getFirm_id();
			List<FirmNsccMemberNum> fnmns = firmserviceimpl.doFindAllFirmNsccMemberNum(fid);
			List<FirmFirmTypeXref> fftxs = firmserviceimpl.doFindAllFirmFirmTypeXref(fid);

			// display these in the Firm View
			for(int f_nmn_idx=0; f_nmn_idx < fnmns.size(); f_nmn_idx++){
				sb_num.append(fnmns.get(f_nmn_idx).getNscc_member_num());
				sb_num.append(",");
			}
			
			for(int f_typ_idx=0; f_typ_idx < fftxs.size(); f_typ_idx++){
				sb_typ.append(fftxs.get(f_typ_idx).getFirm_typ_cd());
				sb_typ.append(",");
			}
			
			if(sb_num.toString().length() > 0){
				firms.get(fidx).setNscc_member_num(sb_num.toString().substring(0, sb_num.toString().length()-1));
			}
			if(sb_typ.toString().length() > 0){
				firms.get(fidx).setFirm_typ_cd(sb_typ.toString().substring(0, sb_typ.toString().length()-1));
			}
			
		}
		
		return firms;		
	}

	@RequestMapping("/showAllMCoTrustFirms" )
	@ResponseBody
	public List<ViewFirmMgmtCoTrustFirm> callShowAllMCoTrustFirms(){
		
		List<ViewFirmMgmtCoTrustFirm> vwfmctrstfrm = firmserviceimpl.doFindAllFirmMgmtCoTrustFirm(); 

		return vwfmctrstfrm;		
	}

	@RequestMapping("/showAllTrustTpaFirms" )
	@ResponseBody
	public List<Firm> callShowAllTrustTpaFirms(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		String _short_name = (String)session.getAttribute("SHORTNAME");
		List<Firm> firms = firmserviceimpl.doFindAllTrustTpaFirms(_short_name + "%"); 
		
		return firms;		
	}

	@RequestMapping("/showAllTA2000SubFirms" )
	@ResponseBody
	public List<TA2000SubFirm> callShowAllTA2000SubFirms(HttpServletRequest request){
		
		HttpSession session = request.getSession();

		String _pfLngNm = bfdsEntitiesDecoder((String)request.getParameter("_pfLngNm")).replace("%20", " ").trim();
		String _mgmtCo = bfdsEntitiesDecoder((String)request.getParameter("_mgmtCo")).replace("%20", " ").trim();
		String _FirmNm = bfdsEntitiesDecoder((String)request.getParameter("_ta2kSubFirmNm")).replace("%20", " ").trim();
		String _FirmDlrNum = bfdsEntitiesDecoder((String)request.getParameter("_ta2kSubFirmDlrNum")).replace("%20", " ").trim();
		String _FirmNsccMbrNum = bfdsEntitiesDecoder((String)request.getParameter("_ta2kSubFirmNsccMbrNum")).replace("%20", " ").trim();
		
		List<TA2000SubFirm> tasf = firmserviceimpl.doFindAllTA2000SubFirm("%" + _pfLngNm + "%", 
																		  "%" + _mgmtCo + "%", 
																		  "%" + _FirmNm + "%", 
																		  "%" + _FirmDlrNum + "%", 
																		  "%" + _FirmNsccMbrNum + "%"); 
		
		return tasf;		
	}

	/*
	 * The user must have had selected a Mgmt_co prior to this
	 * call.
	 */
	@RequestMapping("/getAllTrustFirms" )
	@ResponseBody
	public List<Firm> callFindAllTrustFirms(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		int _mgmt_co_id = Integer.parseInt((String)session.getAttribute("MGMT_CO_ID"));
		List<Firm> firms = firmserviceimpl.doFindAllFirmTrustsByMgmtCo(_mgmt_co_id); 
// do I need to do this
//		session.removeAttribute("MGMT_CO_ID");
		return firms;		
	}
		
	@RequestMapping("/getExistingNsccMemberNum")
	@ResponseBody
	public String callGetExistingNsccMemberNum(HttpServletRequest request){
		HttpSession session = request.getSession();
		String firm_id = (String)session.getAttribute("FIRM_ID");
		int _firm_id = Integer.parseInt(firm_id);
		StringBuilder fnmn_str = new StringBuilder();

		// logger.info("The firm id in callGetExistingNsccMemberNum is " + _firm_id);
		List<FirmNsccMemberNum> fnmn = firmserviceimpl.doFindAllFirmNsccMemberNum(_firm_id);
		int comma_count = fnmn.size() - 1;
		
		for(int y=0; y < fnmn.size(); y++){
			fnmn_str.append(fnmn.get(y).getNscc_member_num());
			if(comma_count > 0){
				fnmn_str.append(",");
				comma_count--;
			}
		}
		
		// logger.info("In the callGetExistingNsccMemberNum " + fnmn_str.toString());
		return fnmn_str.toString();
	}
	
	@RequestMapping("/getExistingNsccNetworkAlpha")
	@ResponseBody
	public String callGetExistingNsccNetworkAlpha(HttpServletRequest request){
		HttpSession session = request.getSession();
		String firm_id = (String)session.getAttribute("FIRM_ID");
		int _firm_id = Integer.parseInt(firm_id);
		StringBuilder fnna_str = new StringBuilder();

		// logger.info("The firm id in callGetExistingNsccNetworkAlpha is " + _firm_id);
		List<FirmNsccNetworkAlphaCd> fnna = firmserviceimpl.doFindAllFirmNsccNetworkAlphaCd(_firm_id);
		int comma_count = fnna.size() - 1;
		
		for(int y=0; y < fnna.size(); y++){
			fnna_str.append(fnna.get(y).getNscc_ntwrk_alpha_cd());
			if(comma_count > 0){
				fnna_str.append(",");
				comma_count--;
			}
		}

		// logger.info("In the getExistingNsccNetworkAlpha " + fnna_str.toString());
		return fnna_str.toString();
	}
	
	@RequestMapping("/getExistingClearingFirms")
	@ResponseBody
	public String callGetExistingClearingFirms(HttpServletRequest request){
		HttpSession session = request.getSession();
		String firm_id = (String)session.getAttribute("FIRM_ID");
		int _firm_id = Integer.parseInt(firm_id);
		StringBuilder fcfx_str = new StringBuilder();

		logger.info("The firm id in getting existing Clearing Firm is " + _firm_id);
		List<FirmClearingFirmXref> fcfx = firmserviceimpl.doFindAllFirmClearingFirmXref(_firm_id);
		int comma_count = fcfx.size() - 1;
		
		for(int y=0; y < fcfx.size(); y++){
			fcfx_str.append(fcfx.get(y).getClearing_firm_id());
			if(comma_count > 0){
				fcfx_str.append(",");
				comma_count--;
			}
		}
		
		return fcfx_str.toString();
	}
	
	@RequestMapping("/getExistingFirmTypes")
	@ResponseBody
	public String callGetExistingFirmTypes(HttpServletRequest request){
		HttpSession session = request.getSession();
		String firm_id = (String)session.getAttribute("FIRM_ID");
		int _firm_id = Integer.parseInt(firm_id);
		StringBuilder fftx_str = new StringBuilder();
		
		// logger.info("The firm id in getExistingFirmTypes is " + _firm_id);
		List<FirmFirmTypeXref> fftx = firmserviceimpl.doFindAllFirmFirmTypeXref(_firm_id);
		int comma_count = fftx.size() - 1;
		
		for(int y=0; y < fftx.size(); y++){
			fftx_str.append(fftx.get(y).getFirm_typ_cd());
			if(comma_count > 0){
				fftx_str.append(",");
				comma_count--;
			}
		}
		// logger.info("The existing firm type are " + fftx_str.toString());
		return fftx_str.toString();
	}
	
	@RequestMapping("/getExistingShareHldrSvcMdl")
	@ResponseBody
	public String callGetExistingShareHldrSvcMdl(HttpServletRequest request){
		HttpSession session = request.getSession();
		String firm_id = (String)session.getAttribute("FIRM_ID");
		int _firm_id = Integer.parseInt(firm_id);
		StringBuilder shsm_str = new StringBuilder();
		
		// logger.info("The firm id in Share Holder Service Model is " + _firm_id);
		List<FirmShareholderServicingModelXref> shsm = firmserviceimpl.doFindAllFirmShrhldrSrvMdlXref(_firm_id);
		int comma_count = shsm.size() - 1;
		
		for(int y=0; y < shsm.size(); y++){
			shsm_str.append(shsm.get(y).getShrhldr_svc_mdl_cd());
			if(comma_count > 0){
				shsm_str.append(",");
				comma_count--;
			}
		}
		// logger.info("In the getExistingShareHldrSvcMdl " + shsm_str.toString());
		return shsm_str.toString();
	}
	
	@RequestMapping("/getExistingSubacctPltfrmCD")
	@ResponseBody
	public String callGetExistingSubacctPltfrmCD(HttpServletRequest request){
		HttpSession session = request.getSession();
		String firm_id = (String)session.getAttribute("FIRM_ID");
		int _firm_id = Integer.parseInt(firm_id);
		StringBuilder sap_str = new StringBuilder();
		
		// logger.info("The firm id in SubAcct Pltfrm is " + _firm_id);
		List<FirmSubAcctPltfrmXref> sap = firmserviceimpl.doFindAllFirmSubAcctPltfrmXref(_firm_id);
		int comma_count = sap.size() - 1;
		
		for(int y=0; y < sap.size(); y++){
			sap_str.append(sap.get(y).getSubacct_pltfrm_cd());
			if(comma_count > 0){
				sap_str.append(",");
				comma_count--;
			}
		}
		
		return sap_str.toString();
	}
	
	@RequestMapping("/getExistingBrokeragePlatform")
	@ResponseBody
	public String callGetExistingBrokeragePlatform(HttpServletRequest request){
		HttpSession session = request.getSession();
		String firm_id = (String)session.getAttribute("FIRM_ID");
		int _firm_id = Integer.parseInt(firm_id);
		StringBuilder bp_str = new StringBuilder();
		
		// logger.info("The firm id in getExistingBrokeragePlatform is " + _firm_id);
		List<FirmBrokeragePlatformXref> bp = firmserviceimpl.doFindAllFirmBrokeragePlatformXref(_firm_id);
		int comma_count = bp.size() - 1;
		
		for(int y=0; y < bp.size(); y++){
			bp_str.append(bp.get(y).getBrkrg_pltfrm_cd());
			if(comma_count > 0){
				bp_str.append(",");
				comma_count--;
			}
		}
		
		return bp_str.toString();
	}
	
	@RequestMapping("/getExistingSettlementType")
	@ResponseBody
	public String callGetExistingSettlementType(HttpServletRequest request){
		HttpSession session = request.getSession();
		String firm_id = (String)session.getAttribute("FIRM_ID");
		int _firm_id = Integer.parseInt(firm_id);
		StringBuilder st_str = new StringBuilder();
		
		// logger.info("The firm id in getExistingSettlementType is " + _firm_id);
		List<FirmSettlementTypXref> st = firmserviceimpl.doFindAllFirmSettlementTypXref(_firm_id);
		int comma_count = st.size() - 1;
		
		for(int y=0; y < st.size(); y++){
			st_str.append(st.get(y).getSettlement_typ_cd());
			if(comma_count > 0){
				st_str.append(",");
				comma_count--;
			}
		}
		
		return st_str.toString();
	}
	
	@RequestMapping("/getExistingOmnibusTradProc")
	@ResponseBody
	public String callGetExistingOmnibusTradProc(HttpServletRequest request){
		HttpSession session = request.getSession();
		String firm_id = (String)session.getAttribute("FIRM_ID");
		int _firm_id = Integer.parseInt(firm_id);
		StringBuilder otp_str = new StringBuilder();
		
		// logger.info("The firm id in getExistingOmnibusTradProc is " + _firm_id);
		List<FirmOmnibusTradProcXref> otp = firmserviceimpl.doFindAllFirmOmnibusTradProcXref(_firm_id);
		int comma_count = otp.size() - 1;
		
		for(int y=0; y < otp.size(); y++){
			otp_str.append(otp.get(y).getOmnibus_trad_proc_cd());
			if(comma_count > 0){
				otp_str.append(",");
				comma_count--;
			}
		}
		
		return otp_str.toString();
	}
	
	@RequestMapping("/getExistingDataTransMthd")
	@ResponseBody
	public String callGetExistingDataTransMthd(HttpServletRequest request){
		HttpSession session = request.getSession();
		String firm_id = (String)session.getAttribute("FIRM_ID");
		int _firm_id = Integer.parseInt(firm_id);
		StringBuilder dtm_str = new StringBuilder();
		
		// logger.info("The firm id in getExistingDataTransMthd is " + _firm_id);
		List<FirmDataTransMethodXref> dtm = firmserviceimpl.doFindAllFirmDataTransMethodXref(_firm_id);
		int comma_count = dtm.size() - 1;
		
		for(int y=0; y < dtm.size(); y++){
			dtm_str.append(dtm.get(y).getData_trans_mthd_cd());
			if(comma_count > 0){
				dtm_str.append(",");
				comma_count--;
			}
		}
		
		return dtm_str.toString();
	}
	
	@RequestMapping("/getExistingPricingSource")
	@ResponseBody
	public String callGetExistingPricingSource(HttpServletRequest request){
		HttpSession session = request.getSession();
		String firm_id = (String)session.getAttribute("FIRM_ID");
		int _firm_id = Integer.parseInt(firm_id);
		StringBuilder fps_str = new StringBuilder();
		
		// logger.info("The firm id in getExistingPricingSource is " + _firm_id);
		List<FirmPricingSourceXref> fps = firmserviceimpl.doFindAllFirmPricingSourceXref(_firm_id);
		int comma_count = fps.size() - 1;
		
		for(int y=0; y < fps.size(); y++){
			fps_str.append(fps.get(y).getPricing_src_cd());
			if(comma_count > 0){
				fps_str.append(",");
				comma_count--;
			}
		}
		
		return fps_str.toString();
	}
	
	@RequestMapping("/getNonTrustTpaFirms")
	@ResponseBody
	public List<Firm> callNonTrustTpaFirms(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		String mgmt_co_id = (String)session.getAttribute("MGMT_CO_ID");
		// logger.info("Getting the MGMT_CO_ID = " + mgmt_co_id);
		int _mgmt_co_id = Integer.parseInt(mgmt_co_id);
		List<Firm> firms = firmserviceimpl.doFindAllNonTrustTpaFirmsByMgmtCo(_mgmt_co_id); 
// why do I need to do this
//		session.removeAttribute("MGMT_CO_ID");

		return firms;		
	}

	@RequestMapping("/getClearingFirms" )
	@ResponseBody
	public List<Firm> callGetClearingFirms(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		
		List<Firm> firms = firmserviceimpl.doFindAllClearingFirms(); 

		return firms;		
	}

	/*
	 * Store the new firm data
	 */
	@RequestMapping("/addFirmPage")
	public String callAddFirmPage(){
		return "addFirmPage";
	}
	
	/*
	 */
	@RequestMapping("/addTA2000SubFirmPage")
	public String callAddTA2000SubFirmPage(){		
		return "addTA2000SubFirmPage";
	}
	
	/*
	 * Store the new firm, company, trust, firm data
	 */
	@RequestMapping("/addFirmCoTrustFirmPage")
	public String callAddFirmCoTrustFirmPage(){
		return "addFirmCoTrustFirmPage";
	}
	
	/*
	 * Delete the selected firm data
	 */
	@RequestMapping("/deleteFirmPage")
	public String callDeleteFirmPage(){
		return "deleteFirmPage";
	}
	
	/*
	 * Edit the new firm, company, trust, firm data
	 */
	@RequestMapping("/editFirmCoTrustFirmPage")
	public String callEditFirmCoTrustFirmPage(){
		return "editFirmCoTrustFirmPage";
	}
	
	/*
	 * Edit the selected Firm
	 */
	@RequestMapping("/editFirmPage")
	public String callEditFirm(){
		return "editFirmPage";
	}
	
	/*
	 */
	@RequestMapping("/editTA2000SubFirmPage")
	public String callEditTA2000SubFirmPage(){		
		return "editTA2000SubFirmPage";
	}
	
	/*
	 * 
	 */
	@RequestMapping("/addFrmCoTrstFrm" )
	@ResponseBody
	public SearchValidator calladdFrmCoTrstFrm(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		int _mgmt_co_id = Integer.parseInt((String)session.getAttribute("MGMT_CO_ID"));
		int _non_trust_tpa_id = Integer.parseInt((String)session.getAttribute("NON_TRUST_TPA_ID"));
		int _trust_firm_id = Integer.parseInt((String)session.getAttribute("TRUST_FIRM_ID"));
		sv = new SearchValidator();

		List<FirmAndMgmtCo> famc = firmandmgmtcoserviceimpl.doFindSingleFirmAndMgmtCo(_non_trust_tpa_id, _mgmt_co_id);

		// There must be an famc object
		if(famc.size() > 0){
			FrmMgmtCoTrstFrm fmctf = new FrmMgmtCoTrstFrm();			
			fmctf.setFrm_mgmt_co_id(famc.get(0).getFirm_mgmt_co_id());
			fmctf.setTrst_frm_id(_trust_firm_id);
			fmctf.setLst_updt_userid(this.getUserName(request));
			firmserviceimpl.insertFirmMgmtCoTrustFirm(fmctf);
			sv.setTrue_false(true);
		}else{
			sv.setTrue_false(false);
			List<Firm> firms = firmserviceimpl.doFindSingleFirms(_non_trust_tpa_id);
			List<MgmtCo> mgmtco = mgmtcoserviceimpl.doFindSingleMgmtCoById(_mgmt_co_id);
			if((firms.size() > 0) && (mgmtco.size() > 0)){
				sv.setMessage("There is no Firm & Company record, Firm - " + firms.get(0).getLong_nm() + 
						", Company - " + mgmtco.get(0).getMgmt_co_long_nm());
			}
		}
		return sv;
	}
	
	/*
	 * Store the new management data
	 */
	@RequestMapping("/addFirm" )
	@ResponseBody
	public SearchValidator callAddFirm(HttpServletRequest request){		
		
		Firm firm = new Firm();
		sv = new SearchValidator();

		try{
			firm.setLong_nm((String)request.getParameter("long_nm"));
			firm.setShort_nm((String)request.getParameter("short_nm"));
			
			// This is going to the Firm_Clearing_Firm_Xref_t
            String _clrg_frms = bfdsEntitiesDecoder((String)request.getParameter("clrg_frms")).replace("%20", " ");
            
//          // logger.info("ClrFirm " + clrg_frms);
			firm.setFirm_address1((String)request.getParameter("firm_address1"));
			firm.setFirm_address2((String)request.getParameter("firm_address2"));
			firm.setFirm_city((String)request.getParameter("firm_city"));
			firm.setFirm_state_cd((String)request.getParameter("firm_state_cd"));
			firm.setFirm_zip_cd((String)request.getParameter("firm_zip_cd"));
			firm.setFirm_website((String)request.getParameter("firm_website"));
			firm.setPrmry_bank_nm((String)request.getParameter("prmry_bank_nm"));
			firm.setPrmry_bank_address1((String)request.getParameter("prmry_bank_address1"));
			firm.setPrmry_bank_address2((String)request.getParameter("prmry_bank_address2"));
			firm.setPrmry_bank_city((String)request.getParameter("prmry_bank_city"));
			firm.setPrmry_bank_state_cd((String)request.getParameter("prmry_bank_state_cd"));
			firm.setPrmry_bank_zip_cd((String)request.getParameter("prmry_bank_zip_cd"));
			firm.setPrmry_bank_aba_num((String)request.getParameter("prmry_bank_aba_num"));
			firm.setPrmry_bank_acct_num((String)request.getParameter("prmry_bank_acct_num"));
			firm.setFirm_tax_id((String)request.getParameter("firm_tax_id"));
			
            String _firm_type = bfdsEntitiesDecoder((String)request.getParameter("firm_typ_cd")).replace("%20", " ");						
            firm.setClrng_frm_ind((String)request.getParameter("clrng_frm_ind"));            

            String _shrhldr_svc_mdl = bfdsEntitiesDecoder((String)request.getParameter("shrhldr_svc_mdl_cd")).replace("%20", " ");						
            
//			firm.setNtwrk_mtrx_lvl_id((String)request.getParameter("ntwrk_mtrx_lvl_id"));		
			String _nscc_network_alpha = (String)request.getParameter("nscc_ntwrk_alpha_cd");

            String _subacct_pltfrm = bfdsEntitiesDecoder((String)request.getParameter("subacct_pltfrm_cd")).replace("%20", " ");						

            firm.setBin_mask((String)request.getParameter("bin_mask"));

			firm.setSae16_ind((String)request.getParameter("sae16_ind"));
			firm.setIndustry_attestation_ind((String)request.getParameter("industry_attestation_ind"));
			firm.setMf_profile_II_ind((String)request.getParameter("mf_profile_II_ind"));

            String _brkrg_pltfrm = bfdsEntitiesDecoder((String)request.getParameter("brkrg_pltfrm")).replace("%20", " ");						

            firm.setSpec_pckg_link((String)request.getParameter("spec_pckg_link"));
			firm.setTrade_cut_off((String)request.getParameter("trade_cut_off"));			
			firm.setOmnibus_dist_mdl_cd(URLDecoder.decode((String)request.getParameter("omnibus_dist_mdl_cd"), "UTF-8"));			
			
			String _omnibus_trad_proc_cd = bfdsEntitiesDecoder((String)request.getParameter("omnibus_trad_proc_cd")).replace("%20", " ");

            String _data_trans_mthd = bfdsEntitiesDecoder((String)request.getParameter("data_trans_mthd_cd")).replace("%20", " ");						
			
			firm.setLst_updt_userid(this.getUserName(request));

            String _nscc_member_num = bfdsEntitiesDecoder((String)request.getParameter("nscc_member_num")).replace("%20", " ");						
            
//			// logger.info("The commserv_ind " + (String)request.getParameter("commserv_ind"));
			firm.setCommserv_ind((String)request.getParameter("commserv_ind"));
			
            String _op_review_cd = bfdsEntitiesDecoder((String)request.getParameter("op_review_cd")).replace("%20", " ");						
			firm.setOp_review_cd(_op_review_cd);

			String op_review_dt = (String)request.getParameter("op_review_dt");
			String op_dt = (op_review_dt.compareToIgnoreCase("") == 0) ? null : op_review_dt;
  	        firm.setOp_review_dt(op_dt);
			
			firm.setSpec_pckg_ind((String)request.getParameter("spec_pckg_ind"));
			firm.setVision_ind((String)request.getParameter("vision_ind"));
			firm.setFan_mail_ind((String)request.getParameter("fan_mail_ind"));
			firm.setOmniserv_ind((String)request.getParameter("omniserv_ind"));
			
			// logger.info("The batch_typ_cd " + (String)request.getParameter("batch_typ_cd"));
			firm.setBatch_typ_cd((String)request.getParameter("batch_typ_cd"));
			firm.setDst_vho_ind((String)request.getParameter("dst_vho_ind"));
			firm.setPos_file_sched_cd((String)request.getParameter("pos_file_sched_cd"));

            String _settlement_type = bfdsEntitiesDecoder((String)request.getParameter("settlement_typ")).replace("%20", " ");

            firm.setActive_ind((String)request.getParameter("active_ind"));
            String in_act_dt = (String)request.getParameter("inactive_dt");
			String inact_dt = (in_act_dt.compareToIgnoreCase("") == 0) ? null : in_act_dt;
            firm.setInactive_dt(inact_dt);

            String _pricing_source = bfdsEntitiesDecoder((String)request.getParameter("pricing_source")).replace("%20", " ");
            
			this.firmserviceimpl.insertFirm(firm);

			int _firm_id = firm.getFirm_id();
			/*
			 * After getting the new Firm id, do all the xref entries
			 */
			
			/*
			 *  The clearing firm indicator must be set to no in order to load
			 *  the xref table
			 */
			if(((String)request.getParameter("clrng_frm_ind")).compareToIgnoreCase("No") == 0){
	            if(_clrg_frms.length() > 0){
					StringTokenizer st = new StringTokenizer(_clrg_frms, ",");
					FirmClearingFirmXref fcfx;
					
					while(st.hasMoreTokens()){
						fcfx = new FirmClearingFirmXref();
						fcfx.setFirm_id(_firm_id);
						int clr_frm_id = Integer.parseInt(st.nextToken().trim());
						fcfx.setClearing_firm_id(clr_frm_id);
						List<Firm> firms = this.firmserviceimpl.doFindSingleFirms(clr_frm_id);
						Firm frm = firms.get(0);
						fcfx.setClearing_firm_num("Unknown"); // no spec as of 4/2/2012
						fcfx.setClearing_firm_nm((frm.getClearing_firm_nm() == null) ? " " : frm.getClearing_firm_nm());
						fcfx.setLst_updt_userid(this.getUserName(request));
						this.firmserviceimpl.insertFirmClearingFirmXref(fcfx);
					}	        	  
	            }
			}
			
			/*
			 * Firm Type xref
			 */
            if(_firm_type.length() > 0){
				StringTokenizer st = new StringTokenizer(_firm_type, ",");
				FirmFirmTypeXref fftx;
				
				while(st.hasMoreTokens()){
					fftx = new FirmFirmTypeXref();
					fftx.setFirm_id(_firm_id);
					String firmTypCd = (String)st.nextToken();
					fftx.setFirm_typ_cd(firmTypCd.trim());
					fftx.setLst_updt_userid(this.getUserName(request));
					this.firmserviceimpl.insertFirmFirmTypeXref(fftx);
				}	        	  
            }
			
			/*
			 * Firm Shareholder Servicing Model xref
			 */
            if(_shrhldr_svc_mdl.length() > 0){
				StringTokenizer st = new StringTokenizer(_shrhldr_svc_mdl, ",");
				FirmShareholderServicingModelXref fssmx;
				
				while(st.hasMoreTokens()){
					fssmx = new FirmShareholderServicingModelXref();
					fssmx.setFirm_id(_firm_id);
					fssmx.setShrhldr_svc_mdl_cd(st.nextToken());
					fssmx.setLst_updt_userid(this.getUserName(request));
					this.firmserviceimpl.insertFirmShrhldrSvcngMdlXref(fssmx);
				}	        	  
            }
            
			/*
			 * Firm SubAccounting Platform xref
			 */
            if(_subacct_pltfrm.length() > 0){
				StringTokenizer st = new StringTokenizer(_subacct_pltfrm, ",");
				FirmSubAcctPltfrmXref fsapx;
				
				while(st.hasMoreTokens()){
					fsapx = new FirmSubAcctPltfrmXref();
					fsapx.setFirm_id(_firm_id);
					fsapx.setSubacct_pltfrm_cd(st.nextToken());
					fsapx.setLst_updt_userid(this.getUserName(request));
					this.firmserviceimpl.insertFirmSubacctPltfrmXref(fsapx);
				}	        	  
            }
            
			/*
			 * Firm Brokerage Platform xref
			 */
            if(_brkrg_pltfrm.length() > 0){
				StringTokenizer st = new StringTokenizer(_brkrg_pltfrm, ",");
				FirmBrokeragePlatformXref fbpx;
				
				while(st.hasMoreTokens()){
					fbpx = new FirmBrokeragePlatformXref();
					fbpx.setFirm_id(_firm_id);
					fbpx.setBrkrg_pltfrm_cd(st.nextToken());
					fbpx.setLst_updt_userid(this.getUserName(request));
					this.firmserviceimpl.insertFirmBrokeragePlatformXref(fbpx);
				}	        	  
            }
            
			/*
			 * Firm NSCC Member Num xref
			 */
			FirmNsccMemberNum fnmn;
            if(_nscc_member_num.length() > 0){
				StringTokenizer st = new StringTokenizer(_nscc_member_num, ",");
				
				while(st.hasMoreTokens()){
					fnmn = new FirmNsccMemberNum();
					fnmn.setFirm_id(_firm_id);
					fnmn.setNscc_member_num(st.nextToken());
					fnmn.setLst_updt_userid(this.getUserName(request));
					this.firmserviceimpl.insertFirmNsccMemberNum(fnmn);
				}
				
            }else{
				fnmn = new FirmNsccMemberNum();
				fnmn.setFirm_id(_firm_id);
				fnmn.setNscc_member_num("N/A");
				fnmn.setLst_updt_userid(this.getUserName(request));
				this.firmserviceimpl.insertFirmNsccMemberNum(fnmn);            	
            }
            
			/*
			 * Firm NSCC Network Alpha xref
			 */
			FirmNsccNetworkAlphaCd fnnac;
            if(_nscc_network_alpha.length() > 0){
				StringTokenizer st = new StringTokenizer(_nscc_network_alpha, ",");
				
				while(st.hasMoreTokens()){
					fnnac = new FirmNsccNetworkAlphaCd();
					fnnac.setFirm_id(_firm_id);
					fnnac.setNscc_ntwrk_alpha_cd(st.nextToken());
					fnnac.setLst_updt_userid(this.getUserName(request));
					this.firmserviceimpl.insertFirmNsccNetworkAlphaCd(fnnac);
				}
				
            }else{
				fnnac = new FirmNsccNetworkAlphaCd();
				fnnac.setFirm_id(_firm_id);
				fnnac.setNscc_ntwrk_alpha_cd("N/A");
				fnnac.setLst_updt_userid(this.getUserName(request));
				this.firmserviceimpl.insertFirmNsccNetworkAlphaCd(fnnac);
            }
            
			/*
			 * Firm Settlement Type xref
			 */
            if(_settlement_type.length() > 0){
				StringTokenizer st = new StringTokenizer(_settlement_type, ",");
				FirmSettlementTypXref fstx;
				
				while(st.hasMoreTokens()){
					fstx = new FirmSettlementTypXref();
					fstx.setFirm_id(_firm_id);
					fstx.setSettlement_typ_cd(st.nextToken());
					fstx.setLst_updt_userid(this.getUserName(request));
					this.firmserviceimpl.insertFirmSettlementTypeXref(fstx);
				}	        	  
            }
            
			/*
			 * Firm Omnibus Trade Proc Xref
			 */
            if(_omnibus_trad_proc_cd.length() > 0){
				StringTokenizer st = new StringTokenizer(_omnibus_trad_proc_cd, ",");
				FirmOmnibusTradProcXref fotpx;
				
				while(st.hasMoreTokens()){
					fotpx = new FirmOmnibusTradProcXref();
					fotpx.setFirm_id(_firm_id);
					fotpx.setOmnibus_trad_proc_cd(st.nextToken());
					fotpx.setLst_updt_userid(this.getUserName(request));
					this.firmserviceimpl.insertFirmOmnibusTradProcXref(fotpx);
				}	        	  
            }
            
			/*
			 * Firm Data Trans Method xref
			 */
            if(_data_trans_mthd.length() > 0){
				StringTokenizer st = new StringTokenizer(_data_trans_mthd, ",");
				FirmDataTransMethodXref fdtmx;
				
				while(st.hasMoreTokens()){
					fdtmx = new FirmDataTransMethodXref();
					fdtmx.setFirm_id(_firm_id);
					fdtmx.setData_trans_mthd_cd(st.nextToken());
					fdtmx.setLst_updt_userid(this.getUserName(request));
					this.firmserviceimpl.insertFirmDataTransMethodXref(fdtmx);
				}	        	  
            }
            
			/*
			 * Firm Pricing Source xref
			 */
            if(_pricing_source.length() > 0){
				StringTokenizer st = new StringTokenizer(_pricing_source, ",");
				FirmPricingSourceXref fpsx;
				
				while(st.hasMoreTokens()){
					fpsx = new FirmPricingSourceXref();
					fpsx.setFirm_id(_firm_id);
					fpsx.setPricing_src_cd(st.nextToken());
					fpsx.setLst_updt_userid(this.getUserName(request));
					this.firmserviceimpl.insertFirmPricingSourceXref(fpsx);
				}	        	  
            }
            
			sv.setTrue_false(true);

		}catch(DuplicateKeyException dke){
			sv.setTrue_false(false);
			sv.setDuplicate(true);
			sv.setMessage("A Parent Firm record already exists.");
		}catch(UnsupportedEncodingException une){
			sv.setTrue_false(false);
			sv.setMessage("An UnsupportedEncodingException while adding a Parent Firm.");
		}

		return sv;
	}
		
	/*
	 * Store the new ta sub firm data
	 */
	@RequestMapping("/addTA2000SubFirm" )
	@ResponseBody
	public SearchValidator callAddTA2000SubFirm(HttpServletRequest request){		

		HttpSession session = request.getSession();
		
		TA2000SubFirm tasf = new TA2000SubFirm();
		sv = new SearchValidator();
		
		int _firm_id = Integer.parseInt((String)session.getAttribute("FIRM_ID"));
		int _mgmt_co_id = Integer.parseInt((String)session.getAttribute("MGMT_CO_ID"));

		logger.info("Adding a ta2000 sub firm with firm_id " + _firm_id);
		logger.info("Adding a ta2000 sub mgmt_co with firm_id " + _mgmt_co_id);

		// getting the MC Code not the id
		List<MgmtCo> mgmtcos = mgmtcoserviceimpl.doFindSingleMgmtCoById(_mgmt_co_id);
		String _mgmtCo = (String)mgmtcos.get(0).getTa2000_co_cd();
		String _FirmDlrNum = (String)request.getParameter("ta2000_dealr_num");
		
		List<TA2000SubFirm> tasfs = firmserviceimpl.doFindAllTA2000SubFirm("%", 
																		  "%" + _mgmtCo + "%", 
																		  "%", 
																		  "%" + _FirmDlrNum + "%", 
																		  "%");
		if(tasfs.size() > 0){
			sv.setTrue_false(false);
			sv.setDuplicate(true);
			return sv;
		}
		
		try{
			tasf.setFirm_id(_firm_id);
			tasf.setMgmt_co_co_id(_mgmt_co_id);
			
			tasf.setTa2000_dealr_num((String)request.getParameter("ta2000_dealr_num"));
			tasf.setTa2000_sub_firm_typ_cd((String)request.getParameter("ta2000_sub_firm_typ"));
			tasf.setTa2000_nscc_member_num((String)request.getParameter("ta2000_nscc_member_num"));
			tasf.setTa2000_nscc_ntwrk_alpha_cd((String)request.getParameter("ta2000_nscc_ntwrk_alpha"));
			tasf.setTa2000_firm_nm((String)request.getParameter("ta2000_firm_nm"));
			tasf.setTa2000_firm_address1((String)request.getParameter("ta2000_firm_address1"));
			tasf.setTa2000_firm_address2((String)request.getParameter("ta2000_firm_address2"));
			tasf.setTa2000_firm_city((String)request.getParameter("ta2000_firm_city"));
			tasf.setTa2000_firm_state_cd((String)request.getParameter("ta2000_firm_state_cd"));
			tasf.setTa2000_firm_zip_cd((String)request.getParameter("ta2000_firm_zip"));
			tasf.setActive_ind((String)request.getParameter("active_ind"));
			tasf.setInactive_dt((String)request.getParameter("inactive_dt"));
			tasf.setTa2000_alt_firm_nm((String)request.getParameter("ta2000_alt_firm_nm"));
			tasf.setAsof_trad_window((String)request.getParameter("asof_trad_window"));
			tasf.setOmnibus_conversion_dt((String)request.getParameter("omnibus_conversion_dt"));
			tasf.setPost_settlement_chng_ind((String)request.getParameter("post_settlement_chng_ind"));
			tasf.setPtf_acat_trnsfr_ind((String)request.getParameter("ptf_acat_trnsfr_ind"));
			tasf.setLst_updt_userid(this.getUserName(request));
			tasf.setShrhldr_svc_mdl_cd((String)request.getParameter("shrhldr_svc_mdl_cd"));
			String lob_dsc = (String)request.getParameter("lob_dsc");
			tasf.setlob_dsc((lob_dsc == null) ? "" : lob_dsc);
			tasf.setSettlement_typ_cd((String)request.getParameter("settlement_typ_cd"));
			
			sv.setTrue_false(true);
			
			this.firmserviceimpl.insertTA2000SubFirm(tasf);
			
		}catch(DuplicateKeyException dke){
			sv.setTrue_false(false);
			sv.setDuplicate(true);
			sv.setMessage("A record with the selected TA2000 Sub Firm / MGMT Company already exists.");
		}

		return sv;
	}
	
	/*
	 *	The NSCC Network Alpha are free form inputs on the add 
	 */
	@RequestMapping("/getNsccNetworkAlpha" )
	@ResponseBody
	public String getNsccNetworkAlpha(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		String _firmId = (String)session.getAttribute("FIRM_ID");
		StringBuilder sb = new StringBuilder();
		
		List<FirmNsccNetworkAlphaCd> fnnacs = this.firmserviceimpl.doFindAllFirmNsccNetworkAlphaCd(Integer.parseInt(_firmId));
		Iterator<FirmNsccNetworkAlphaCd> itr = fnnacs.iterator();

		while(itr.hasNext()){
			FirmNsccNetworkAlphaCd fnnac = itr.next();
			sb.append(fnnac.getNscc_ntwrk_alpha_cd());
			sb.append(",");
		}

		if(sb.length() > 1){
			return sb.substring(0, sb.length() - 1);
		}else{
			return "N/A";
		}
	}
	
	/*
	 *	The NSCC Member Numbers are free form inputs on the add 
	 */
	@RequestMapping("/getNsccMemberNum" )
	@ResponseBody
	public String getNsccMemberNum(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		String _firmId = (String)session.getAttribute("FIRM_ID");
		StringBuilder sb = new StringBuilder();
		
		List<FirmNsccMemberNum> fnmns = this.firmserviceimpl.doFindAllFirmNsccMemberNum(Integer.parseInt(_firmId));
		Iterator<FirmNsccMemberNum> itr = fnmns.iterator();
		
		while(itr.hasNext()){
			FirmNsccMemberNum fnmn = itr.next();
			sb.append(fnmn.getNscc_member_num());
			sb.append(",");
		}
		
		if(sb.length() > 1){
			// logger.info("Got Nssc Member nums " + sb.toString());
			return sb.substring(0, sb.length() - 1);
		}else{
			// logger.info("Returning an N/A for the Nssc Member nums");
			return "N/A";
		}
	}

	@RequestMapping("/loadTA2KSubFirmRelDlg")
	@ResponseBody
	public TA2kSFRDlgSet callLoadTA2KSubFirmRelDlg(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		TA2kSFRDlgSet ta2ksfrdlgset = new TA2kSFRDlgSet();
		
		int ta2k_sub_firm_id = Integer.parseInt((String)session.getAttribute("TA2_SUB_FIRM_ID"));
		String _hidn_field_cd1 = (String)request.getParameter("hidn_field_cd1");
		String _hidn_field_cd2 = (String)request.getParameter("hidn_field_cd2");
		
		logger.info("Loading Rel data for Sub Firm " + ta2k_sub_firm_id);
		List<TA2000SubFirmRelationship> ta2ksfrs = this.firmserviceimpl.doFindAllTA2000SubFirmRelationship(ta2k_sub_firm_id); 
		List<TA2000SubFirm> tasfs = this.firmserviceimpl.doFindAllTA2000SubFirm("%", "%", "%", "%", "%");
		
		List<TA2000SubFirm> ta2000subfirm1 = new ArrayList<TA2000SubFirm>();
		List<TA2000SubFirm> ta2000subfirm2 = new ArrayList<TA2000SubFirm>();
		
		ListIterator<TA2000SubFirm> l1 = tasfs.listIterator();
		while(l1.hasNext()){
			TA2000SubFirm t1 = (TA2000SubFirm)l1.next();
			if(t1.getTa2000_sub_firm_typ_cd().toString().compareToIgnoreCase(_hidn_field_cd1) == 0){
				ta2000subfirm1.add(t1);				
			}
		}
				
		ListIterator<TA2000SubFirm> l2 = tasfs.listIterator();
		while(l2.hasNext()){
			TA2000SubFirm t2 = (TA2000SubFirm)l2.next();
			if(t2.getTa2000_sub_firm_typ_cd().toString().compareToIgnoreCase(_hidn_field_cd2) == 0){
				ta2000subfirm2.add(t2);				
			}
		}
		
		/*
		 * Return the existing sub firm relationship - ta2ksfrs
		 * Return the available sub firms for the hidden sub firm type - ta2000subfirm1, ta2000subfirm2
		 */
		ta2ksfrdlgset.setTa2ksubfrmrel(ta2ksfrs);
		ta2ksfrdlgset.setTa2ksfrdlgset1(ta2000subfirm1);
		ta2ksfrdlgset.setTa2ksfrdlgset2(ta2000subfirm2);
		
		return ta2ksfrdlgset;
	}
	
	/*
	 * deleting a record, there isn't a jsp that gets loaded, but Spring tries to load
	 * a page that corresponds to the url, to handle this a status object is returned and
	 * handled in the the ajax success 
	 */
	@RequestMapping("/deleteFirm")
	@ResponseBody
	public SearchValidator callDeleteFirm(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		sv = new SearchValidator();

		String _firmId = (String)session.getAttribute("FIRM_ID");
		if(_firmId != null){
			int _firm_id = Integer.parseInt(_firmId);
			
			this.firmserviceimpl.deleteFirmClearingFirmXref(_firm_id);
			this.firmserviceimpl.deleteFirmFirmTypeXref(_firm_id);
			this.firmserviceimpl.deleteFirmShareholderservicingModelXref(_firm_id);
			this.firmserviceimpl.deleteFirmSubAcctPltfrmXref(_firm_id);
			this.firmserviceimpl.deleteFirmBrokeragePlatformXref(_firm_id);
			this.firmserviceimpl.deleteFirmNsccMemberNum(_firm_id);
			this.firmserviceimpl.deleteFirmNsccNetworkApha(_firm_id);
			this.firmserviceimpl.deleteFirmSettlementTypeXref(_firm_id);
			this.firmserviceimpl.deleteFirmOmnibusTradProcXref(_firm_id);
			this.firmserviceimpl.deleteFirmDataTransMethodXref(_firm_id);
			this.firmserviceimpl.deleteFirm(_firm_id);
			
			sv.setTrue_false(true);
			session.removeAttribute("FIRM_ID");
		}else{
			sv.setTrue_false(false);
			sv.setMessage("You haven't selected a Firm to delete!");
		}

		return sv;
	}
	
	/*
	 * Get the System name data to edit
	 */
	@RequestMapping("/getSystemName")
	@ResponseBody
	public Firm getFirmName(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		int _firm_id = Integer.parseInt((String)session.getAttribute("FIRM_ID"));
		// getting the short name of the selected Firm to show in the xref page
		List<Firm> firms = firmserviceimpl.doFindSingleFirms(_firm_id); 

		return (firms.size() > 0) ? firms.get(0) : null;		
	}
			
	/*
	 * Get the Company data to edit
	 */
	@RequestMapping("/getCompanyName")
	@ResponseBody
	public MgmtCo getCompanyName(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		String company = (String)session.getAttribute("MGMT_CO_ID");

		/*
		 * Don't remove the MGMT_CO_ID from the session as it is being used
		 * else were. This MGMT_CO_ID is used just to get the name of the
		 * Company and is the id that is saved by the ADd
		 */
		//logger.info("The getCompanyName mgmt_co_id " + company);
		int _mgmt_co_id = Integer.parseInt(company);
		
		// getting the mgmt_co_short name of the selected Firm to show in the xref page
		List<MgmtCo> mgmtco = mgmtcoserviceimpl.doFindSingleMgmtCoById(_mgmt_co_id); 

		//logger.info("The size of the result set " + mgmtco.size());
		
		return (mgmtco.size() > 0) ? mgmtco.get(0) : null;
	}
			
	/*
	 * Get the Firm data to edit
	 */
	@RequestMapping("/editFirm")
	@ResponseBody
	public Firm listOfFirmsToEdit(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		String firm_id = (String)session.getAttribute("FIRM_ID");
		// logger.info("In the editFirm handler getting firm id = " + firm_id);
		
		List<Firm> firms = firmserviceimpl.doFindSingleFirms(Integer.parseInt(firm_id)); 

		return (firms.size() > 0) ? firms.get(0) : null;		
	}
	
	/*
	 * Get the Firm data to edit
	 */
	@RequestMapping("/editTA200SubFirm")
	@ResponseBody
	public TA2000SubFirm listOfTA200SubFirmsToEdit(HttpServletRequest request){
		
		HttpSession session = request.getSession();

		String _ta2k_sub_firm_id = (String)session.getAttribute("TA2_SUB_FIRM_ID");
//		logger.info("In the editTA200SubFirm handler getting TA Sub firm id = " + _ta2k_sub_firm_id);
		
		List<TA2000SubFirm> ta2kfirms = firmserviceimpl.doFindSingleTA2000SubFirm(Integer.parseInt(_ta2k_sub_firm_id)); 

		return (ta2kfirms.size() > 0) ? ta2kfirms.get(0) : null;		
	}

	/*
	 * Get the edit Firm Company Trust Firm data to edit
	 */
	@RequestMapping("/editFirmCoTrustFirm")
	@ResponseBody
	public ViewFirmMgmtCoTrustFirm listOFirmCoTrustFirmToEdit(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		int _firm_mgmt_co_id = Integer.parseInt((String)session.getAttribute("MGMT_CO_ID"));
		int _trust_firm_id = Integer.parseInt((String)session.getAttribute("TRUST_FIRM_ID"));
		
		List<FirmAndMgmtCo> fmc = firmandmgmtcoserviceimpl.doFindSingleFirmAndMgmtCoById(_firm_mgmt_co_id);

		int _mgmt_co_id = fmc.get(0).getMgmt_co_id();
		int _firm_id    = fmc.get(0).getFirm_id();
		List<Firm> trustfirms = firmserviceimpl.doFindSingleFirms(_trust_firm_id);
		List<MgmtCo> mgmtco = mgmtcoserviceimpl.doFindSingleMgmtCoById(_mgmt_co_id);
		List<Firm> firms = firmserviceimpl.doFindSingleFirms(_firm_id);
		
		if((firms.size() > 0) && (trustfirms.size() > 0) && (mgmtco.size() > 0)){
			ViewFirmMgmtCoTrustFirm  vfmctf = new ViewFirmMgmtCoTrustFirm();
			
			vfmctf.setFirm_id(firms.get(0).getFirm_id());
			vfmctf.setFirm_long_nm(firms.get(0).getLong_nm());
			vfmctf.setFirm_short_nm(firms.get(0).getShort_nm());
			vfmctf.setFirm_mgmt_co_id(mgmtco.get(0).getMgmt_co_id());
			vfmctf.setMgmt_co_long_nm(mgmtco.get(0).getMgmt_co_long_nm());
			vfmctf.setMgmt_co_short_nm(mgmtco.get(0).getMgmt_co_short_nm());
			vfmctf.setTrst_frm_id(trustfirms.get(0).getFirm_id());
			vfmctf.setTrst_frm_long_nm(trustfirms.get(0).getLong_nm());
			vfmctf.setTrst_frm_short_nm(trustfirms.get(0).getShort_nm());
			return vfmctf;
		}else{
			logger.info("Had a bad search on _firm_mgmt_co_id = " + _firm_mgmt_co_id + 
					" Trust id " + 
					_trust_firm_id + " MgmtCo id " + fmc.get(0).getMgmt_co_id());
			return null;
		}
	}
	
	/*
	 * Get the Companies associated with the Firm that are not in the Xref
	 */
	@RequestMapping("/getFirmCompanyXref")
	@ResponseBody
	public List<MgmtCo> getListOfXrefCopanies(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		int _firm_id = Integer.parseInt((String)session.getAttribute("FIRM_ID"));
		
		// logger.info("The firm id is used to get the MgmtCo xref is " + _firm_id);
		List<MgmtCo> firmandmgmtco = firmserviceimpl.dofindAllFirmCompaniesNotInXref(_firm_id);

		return firmandmgmtco;
	}

	/*
	 * Store the new firm management company xref data the result must be
	 * viewed in the firm management company nav group
	 */
	@RequestMapping("/addNewFirmAndMgmtCoXref")
	@ResponseBody
	public SearchValidator callAddFirmAndMgmtCo(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		
		FirmAndMgmtCo firmandmgmtco = new FirmAndMgmtCo();
		sv = new SearchValidator();

		String firm_id = (String)session.getAttribute("FIRM_ID");
		String mgmt_co_id =(String)session.getAttribute("MGMT_CO_ID");
		// logger.info("The Firm_ID " + firm_id + " \n the mgmt_co_id " + mgmt_co_id);
	    int _firm_id = Integer.parseInt(firm_id);
	    int _mgmt_co_id = Integer.parseInt(mgmt_co_id);
	    
		firmandmgmtco.setFirm_id(_firm_id);
		firmandmgmtco.setMgmt_co_id(_mgmt_co_id);
		firmandmgmtco.setGroup((String)request.getParameter("group"));
		firmandmgmtco.setTa2000_dealr_num((String)request.getParameter("ta2000_dealr_num"));
		firmandmgmtco.setActive_ind((String)request.getParameter("active_ind"));
		
		String atvdt = (String)request.getParameter("active_dt");
		String setActive_dt = (atvdt.compareToIgnoreCase("") == 0) ? null : atvdt;
		firmandmgmtco.setActive_dt(setActive_dt);
		
		String inatvdt = (String)request.getParameter("inactive_dt");
		String setInActive_dt = (inatvdt.compareToIgnoreCase("") == 0) ? null : inatvdt;
		firmandmgmtco.setInactive_dt(setInActive_dt);
		
		firmandmgmtco.setVision_ind((String)request.getParameter("vision_ind"));
		firmandmgmtco.setFan_mail_ind((String)request.getParameter("fan_mail_ind"));

		String cvsndt = (String)request.getParameter("omnibus_conversion_dt");		
		String setOmnibus_conversion_dt = (cvsndt.compareToIgnoreCase("") == 0) ? null : cvsndt;		
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
		
		try{
			sv.setTrue_false(true);
			this.firmandmgmtcoserviceimpl.insertFirmAndMgmtCo(firmandmgmtco) ;
		}catch(Exception e){
			// UNIQUE KEY
			if(e.getMessage().contains("UNIQUE KEY")){
				sv.setMessage("<ul><li>The record already exists</li><ul>");
			}
			// logger.info("Message: " + e.getMessage() + "\n Cause: " + e.getCause());			
			sv.setTrue_false(false);
		}

		session.removeAttribute("FIRM_ID");
		session.removeAttribute("MGMT_CO_ID");
		
		return sv;
	}
		
	/*
	 * 
	 */
	@RequestMapping("/updateFirm")
	@ResponseBody
	public SearchValidator callUpdateFirm(HttpServletRequest request){		
		
		// get the edit object again using the stored short name
		HttpSession session = request.getSession();
		String firmid = (String)session.getAttribute("FIRM_ID");
		sv = new SearchValidator();
		
		int _firm_id = Integer.parseInt(firmid);
		List<Firm> firms = firmserviceimpl.doFindSingleFirms(_firm_id); 
		Firm firm = firms.get(0);		

		try{
			firm.setLong_nm((String)request.getParameter("long_nm"));
			firm.setShort_nm((String)request.getParameter("short_nm"));
			
			// This is going to the Firm_Clearing_Firm_Xref_t
            String _clrg_frms = bfdsEntitiesDecoder((String)request.getParameter("clrg_frms")).replace("%20", " ");
            
//          // logger.info("ClrFirm " + clrg_frms);
			firm.setFirm_address1((String)request.getParameter("firm_address1"));
			firm.setFirm_address2((String)request.getParameter("firm_address2"));
			firm.setFirm_city((String)request.getParameter("firm_city"));
			firm.setFirm_state_cd((String)request.getParameter("firm_state_cd"));
			firm.setFirm_zip_cd((String)request.getParameter("firm_zip_cd"));
			firm.setFirm_website((String)request.getParameter("firm_website"));
			firm.setPrmry_bank_nm((String)request.getParameter("prmry_bank_nm"));
			firm.setPrmry_bank_address1((String)request.getParameter("prmry_bank_address1"));
			firm.setPrmry_bank_address2((String)request.getParameter("prmry_bank_address2"));
			firm.setPrmry_bank_city((String)request.getParameter("prmry_bank_city"));
			firm.setPrmry_bank_state_cd((String)request.getParameter("prmry_bank_state_cd"));
			firm.setPrmry_bank_zip_cd((String)request.getParameter("prmry_bank_zip_cd"));
			firm.setPrmry_bank_aba_num((String)request.getParameter("prmry_bank_aba_num"));
			firm.setPrmry_bank_acct_num((String)request.getParameter("prmry_bank_acct_num"));
			firm.setFirm_tax_id((String)request.getParameter("firm_tax_id"));
			
            String _firm_type = bfdsEntitiesDecoder((String)request.getParameter("firm_typ_cd")).replace("%20", " ");						
            firm.setClrng_frm_ind((String)request.getParameter("clrng_frm_ind"));            

            String _shrhldr_svc_mdl = bfdsEntitiesDecoder((String)request.getParameter("shrhldr_svc_mdl_cd")).replace("%20", " ");						
            
//			firm.setNtwrk_mtrx_lvl_id((String)request.getParameter("ntwrk_mtrx_lvl_id"));
			String _nscc_network_alpha = (String)request.getParameter("nscc_ntwrk_alpha_cd");
            
            String _subacct_pltfrm = bfdsEntitiesDecoder((String)request.getParameter("subacct_pltfrm_cd")).replace("%20", " ");						

            firm.setBin_mask((String)request.getParameter("bin_mask"));

			firm.setSae16_ind((String)request.getParameter("sae16_ind"));
			firm.setIndustry_attestation_ind((String)request.getParameter("industry_attestation_ind"));
			firm.setMf_profile_II_ind((String)request.getParameter("mf_profile_II_ind"));

            String _brkrg_pltfrm = bfdsEntitiesDecoder((String)request.getParameter("brkrg_pltfrm")).replace("%20", " ");						

            firm.setSpec_pckg_link((String)request.getParameter("spec_pckg_link"));
			firm.setTrade_cut_off((String)request.getParameter("trade_cut_off"));			
			firm.setOmnibus_dist_mdl_cd(URLDecoder.decode((String)request.getParameter("omnibus_dist_mdl_cd"), "UTF-8"));			
			
			String _omnibus_trad_proc_cd = bfdsEntitiesDecoder((String)request.getParameter("omnibus_trad_proc_cd")).replace("%20", " ");

            String _data_trans_mthd = bfdsEntitiesDecoder((String)request.getParameter("data_trans_mthd_cd")).replace("%20", " ");						
			
			firm.setLst_updt_userid(this.getUserName(request));

            String _nscc_member_num = bfdsEntitiesDecoder((String)request.getParameter("nscc_member_num")).replace("%20", " ");						
            
//			// logger.info("The commserv_ind " + (String)request.getParameter("commserv_ind"));
			firm.setCommserv_ind((String)request.getParameter("commserv_ind"));
			firm.setOp_review_cd((String)request.getParameter("op_review_cd"));

			String op_review_dt = (String)request.getParameter("op_review_dt");
			String op_dt = (op_review_dt.compareToIgnoreCase("") == 0) ? null : op_review_dt;
  	        firm.setOp_review_dt(op_dt);
			
			firm.setSpec_pckg_ind((String)request.getParameter("spec_pckg_ind"));
			firm.setVision_ind((String)request.getParameter("vision_ind"));
			firm.setFan_mail_ind((String)request.getParameter("fan_mail_ind"));
			firm.setOmniserv_ind((String)request.getParameter("omniserv_ind"));
			
			// logger.info("The batch_typ_cd " + (String)request.getParameter("batch_typ_cd"));
			firm.setBatch_typ_cd((String)request.getParameter("batch_typ_cd"));
			firm.setDst_vho_ind((String)request.getParameter("dst_vho_ind"));
			firm.setPos_file_sched_cd((String)request.getParameter("pos_file_sched_cd"));

            String _settlement_type = bfdsEntitiesDecoder((String)request.getParameter("settlement_typ")).replace("%20", " ");

            firm.setActive_ind((String)request.getParameter("active_ind"));
            
            String in_act_dt = (String)request.getParameter("inactive_dt");
			String inact_dt = (in_act_dt.compareToIgnoreCase("") == 0) ? null : in_act_dt;
            firm.setInactive_dt(inact_dt);
            
            String _pricing_source = bfdsEntitiesDecoder((String)request.getParameter("pricing_source")).replace("%20", " ");
            
            firm.setLst_updt_userid(this.getUserName(request));
            
// do the update            
			this.firmserviceimpl.updateFirm(firm);

			/*
			 * After getting the old Firm id, do all the xref entries
			 */
			
			/*
			 *  The clearing firm indicator must be set to no in order to load
			 *  the xref table
			 */
			if(((String)request.getParameter("clrng_frm_ind")).compareToIgnoreCase("No") == 0){
				
//	            if(_clrg_frms.length() > 0){
					StringTokenizer _clrg_frms_st = new StringTokenizer(_clrg_frms, ",");
					FirmClearingFirmXref fcfx;

					ArrayList<Integer> _clrg_frms_oldAXref  = new ArrayList<Integer>(1);
					ArrayList<Integer> _clrg_frms_newAXref  = new ArrayList<Integer>(1);
					
					List<FirmClearingFirmXref> _clrg_frms_oldXref = this.firmserviceimpl.doFindAllFirmClearingFirmXref(_firm_id);
					
					// the old clearing firm ids
					for(int y=0; y < _clrg_frms_oldXref.size(); y++){
						_clrg_frms_oldAXref.add(_clrg_frms_oldXref.get(y).getClearing_firm_id());						
					}
					
					// the new clearing firm ids
					while(_clrg_frms_st.hasMoreTokens()){
						_clrg_frms_newAXref.add(Integer.parseInt(_clrg_frms_st.nextToken().trim()));						
					}
					
					// now compare the old vs new
					// logger.info("The before old list " + oldAXref.toString());
					//logger.info("The before new list " + newAXref.toString());

					/*
					 * delete the old even if the new list has them or not. In this way
					 * there's no need to cherry pick the id's if there's a new one add
					 * or one is deleted
					 *  
					 */
					if(_clrg_frms_oldAXref.size() > 0){
						this.firmserviceimpl.deleteFirmClearingFirmXref(_firm_id);
					}
					/*
					 * 
					 */
					if(_clrg_frms_newAXref.size() > 0){
						for(int r=0; r < _clrg_frms_newAXref.size(); r++){
							fcfx = new FirmClearingFirmXref();
							fcfx.setFirm_id(_firm_id);
							fcfx.setClearing_firm_id(_clrg_frms_newAXref.get(r));
							fcfx.setClearing_firm_nm("");
							fcfx.setClearing_firm_num("");
							fcfx.setLst_updt_userid(this.getUserName(request));
							this.firmserviceimpl.insertFirmClearingFirmXref(fcfx);							
						}
					}
										
	            }
	            
//			} // end of Clearing firm ind if

			/*
			 * Firm Type xref
			 */
//            if(_firm_type.length() > 0){
				StringTokenizer _firm_type_st = new StringTokenizer(_firm_type, ",");
				FirmFirmTypeXref fftx;
				
				ArrayList<String> _firm_type_oldAXref  = new ArrayList<String>(1);
				ArrayList<String> _firm_type_newAXref  = new ArrayList<String>(1);
				
				List<FirmFirmTypeXref> _firm_type_oldXref = this.firmserviceimpl.doFindAllFirmFirmTypeXref(_firm_id);
				
				for(int y=0; y < _firm_type_oldXref.size(); y++){
					_firm_type_oldAXref.add(_firm_type_oldXref.get(y).getFirm_typ_cd());						
				}
				
				while(_firm_type_st.hasMoreTokens()){
					_firm_type_newAXref.add(_firm_type_st.nextToken().trim());						
				}
				
				if(_firm_type_oldAXref.size() > 0){
					this.firmserviceimpl.deleteFirmFirmTypeXref(_firm_id);
				}
				
				if(_firm_type_newAXref.size() > 0){
					for(int r=0; r < _firm_type_newAXref.size(); r++){
						fftx = new FirmFirmTypeXref();
						fftx.setFirm_id(_firm_id);
						fftx.setFirm_typ_cd(_firm_type_newAXref.get(r));
						fftx.setLst_updt_userid(this.getUserName(request));
						this.firmserviceimpl.insertFirmFirmTypeXref(fftx);
					}
				}
				
//            }
			
			/*
			 * Firm Shareholder Servicing Model xref
			 */
//            if(_shrhldr_svc_mdl.length() > 0){
				StringTokenizer _shrhldr_svc_mdl_st = new StringTokenizer(_shrhldr_svc_mdl, ",");
				FirmShareholderServicingModelXref fssmx;
				
				ArrayList<String> _shrhldr_svc_mdl_oldAXref  = new ArrayList<String>(1);
				ArrayList<String> _shrhldr_svc_mdl_newAXref  = new ArrayList<String>(1);
				
				List<FirmShareholderServicingModelXref> _shrhldr_svc_mdl_oldXref = this.firmserviceimpl.doFindAllFirmShrhldrSrvMdlXref(_firm_id);
				
				for(int y=0; y < _shrhldr_svc_mdl_oldXref.size(); y++){
					_shrhldr_svc_mdl_oldAXref.add(_shrhldr_svc_mdl_oldXref.get(y).getShrhldr_svc_mdl_cd());						
				}
				
				while(_shrhldr_svc_mdl_st.hasMoreTokens()){
					_shrhldr_svc_mdl_newAXref.add(_shrhldr_svc_mdl_st.nextToken().trim());						
				}
				
				if(_shrhldr_svc_mdl_oldAXref.size() > 0){
					this.firmserviceimpl.deleteFirmShareholderservicingModelXref(_firm_id);
				}
				
				if(_shrhldr_svc_mdl_newAXref.size() > 0){
					for(int r=0; r < _shrhldr_svc_mdl_newAXref.size(); r++){
						fssmx = new FirmShareholderServicingModelXref();
						fssmx.setFirm_id(_firm_id);
						fssmx.setShrhldr_svc_mdl_cd(_shrhldr_svc_mdl_newAXref.get(r));
						fssmx.setLst_updt_userid(this.getUserName(request));
						this.firmserviceimpl.insertFirmShrhldrSvcngMdlXref(fssmx);
					}
				}
				
//            }
            
			/*
			 * Firm SubAccounting Platform xref
			 */
//            if(_subacct_pltfrm.length() > 0){
				StringTokenizer _subacct_pltfrm_st = new StringTokenizer(_subacct_pltfrm, ",");
				FirmSubAcctPltfrmXref fsapx;
				
				ArrayList<String> _subacct_pltfrm_oldAXref  = new ArrayList<String>(1);
				ArrayList<String> _subacct_pltfrm_newAXref  = new ArrayList<String>(1);
				
				List<FirmSubAcctPltfrmXref> _subacct_pltfrm_oldXref = this.firmserviceimpl.doFindAllFirmSubAcctPltfrmXref(_firm_id);
				
				for(int y=0; y < _subacct_pltfrm_oldXref.size(); y++){
					_subacct_pltfrm_oldAXref.add(_subacct_pltfrm_oldXref.get(y).getSubacct_pltfrm_cd());						
				}
				
				while(_subacct_pltfrm_st.hasMoreTokens()){
					_subacct_pltfrm_newAXref.add(_subacct_pltfrm_st.nextToken().trim());						
				}
				
				if(_subacct_pltfrm_oldAXref.size() > 0){
					this.firmserviceimpl.deleteFirmSubAcctPltfrmXref(_firm_id);
				}
				
				if(_subacct_pltfrm_newAXref.size() > 0){
					for(int r=0; r < _subacct_pltfrm_newAXref.size(); r++){
						fsapx = new FirmSubAcctPltfrmXref();
						fsapx.setFirm_id(_firm_id);
						fsapx.setSubacct_pltfrm_cd(_subacct_pltfrm_newAXref.get(r));
						fsapx.setLst_updt_userid(this.getUserName(request));
						this.firmserviceimpl.insertFirmSubacctPltfrmXref(fsapx);
					}
				}
				
//            }
            
			/*
			 * Firm Brokerage Platform xref
			 */
//            if(_brkrg_pltfrm.length() > 0){
				StringTokenizer _brkrg_pltfrm_st = new StringTokenizer(_brkrg_pltfrm, ",");
				FirmBrokeragePlatformXref fbpx;
				
				ArrayList<String> _brkrg_pltfrm_oldAXref  = new ArrayList<String>(1);
				ArrayList<String> _brkrg_pltfrm_newAXref  = new ArrayList<String>(1);
				
				List<FirmBrokeragePlatformXref> _brkrg_pltfrm_oldXref = this.firmserviceimpl.doFindAllFirmBrokeragePlatformXref(_firm_id);
				
				for(int y=0; y < _brkrg_pltfrm_oldXref.size(); y++){
					_brkrg_pltfrm_oldAXref.add(_brkrg_pltfrm_oldXref.get(y).getBrkrg_pltfrm_cd());						
				}
				
				while(_brkrg_pltfrm_st.hasMoreTokens()){
					_brkrg_pltfrm_newAXref.add(_brkrg_pltfrm_st.nextToken().trim());						
				}
				
				if(_brkrg_pltfrm_oldAXref.size() > 0){
					this.firmserviceimpl.deleteFirmBrokeragePlatformXref(_firm_id);
				}
				
				if(_brkrg_pltfrm_newAXref.size() > 0){
					for(int r=0; r < _brkrg_pltfrm_newAXref.size(); r++){
						fbpx = new FirmBrokeragePlatformXref();
						fbpx.setFirm_id(_firm_id);
						fbpx.setBrkrg_pltfrm_cd(_brkrg_pltfrm_newAXref.get(r));
						fbpx.setLst_updt_userid(this.getUserName(request));
						this.firmserviceimpl.insertFirmBrokeragePlatformXref(fbpx);
					}
				}
				
//            }
            
			/*
			 * Firm NSCC Member Num xref, deleter all existing then add any new records
			 */
				StringTokenizer st_st_nscc_num = new StringTokenizer(_nscc_member_num, ",");
				FirmNsccMemberNum fnmn;
				
				ArrayList<String> oldAXref_st_nscc_num  = new ArrayList<String>(1);
				ArrayList<String> newAXref_st_nscc_num  = new ArrayList<String>(1);
				
				List<FirmNsccMemberNum> oldXref_st_nscc_num = this.firmserviceimpl.doFindAllFirmNsccMemberNum(_firm_id);
				
				for(int y=0; y < oldXref_st_nscc_num.size(); y++){
					oldAXref_st_nscc_num.add(oldXref_st_nscc_num.get(y).getNscc_member_num());						
				}
				
				while(st_st_nscc_num.hasMoreTokens()){
					newAXref_st_nscc_num.add(st_st_nscc_num.nextToken().trim());						
				}
				
				if(oldAXref_st_nscc_num.size() > 0){
					this.firmserviceimpl.deleteFirmNsccMemberNum(_firm_id);
				}
				
				if(newAXref_st_nscc_num.size() > 0){
					for(int r=0; r < newAXref_st_nscc_num.size(); r++){
						fnmn = new FirmNsccMemberNum();
						fnmn.setFirm_id(_firm_id);
						fnmn.setNscc_member_num(newAXref_st_nscc_num.get(r));
						fnmn.setLst_updt_userid(this.getUserName(request));
						this.firmserviceimpl.insertFirmNsccMemberNum(fnmn);
					}
				}
				
            
			/*
			 * Firm NSCC Network Alpha xref, deleter all existing then add any new records
			 */
				StringTokenizer st_nscc_alphs = new StringTokenizer(_nscc_network_alpha, ",");
				FirmNsccNetworkAlphaCd fnnac;
				
//				ArrayList<String> oldAXref  = new ArrayList<String>(1);
				ArrayList<String> newAXref_st_nscc_alphs  = new ArrayList<String>(1);

//				List<FirmNsccNetworkAlphaCd> oldXref = this.firmserviceimpl.doFindAllFirmNsccNetworkAlphaCd(_firm_id);
/*				
				for(int y=0; y < oldXref.size(); y++){
					oldAXref.add(oldXref.get(y).getNscc_ntwrk_alpha_cd());						
				}
*/				
				while(st_nscc_alphs.hasMoreTokens()){
					newAXref_st_nscc_alphs.add(st_nscc_alphs.nextToken().trim());						
				}
				
//				if(oldAXref.size() > 0){
					this.firmserviceimpl.deleteFirmNsccNetworkApha(_firm_id);
//				}
				
				if(newAXref_st_nscc_alphs.size() > 0){
					for(int r=0; r < newAXref_st_nscc_alphs.size(); r++){
						fnnac = new FirmNsccNetworkAlphaCd();
						fnnac.setFirm_id(_firm_id);
						fnnac.setNscc_ntwrk_alpha_cd(newAXref_st_nscc_alphs.get(r));
						fnnac.setLst_updt_userid(this.getUserName(request));
						this.firmserviceimpl.insertFirmNsccNetworkAlphaCd(fnnac);
					}
				}				
            
			/*
			 * Firm Settlement Type xref
			 */
//            if(_settlement_type.length() > 0){
				StringTokenizer _settlement_type_st = new StringTokenizer(_settlement_type, ",");
				FirmSettlementTypXref fstx;
				
				ArrayList<String> _settlement_type_oldAXref  = new ArrayList<String>(1);
				ArrayList<String> _settlement_type_newAXref  = new ArrayList<String>(1);
				
				List<FirmSettlementTypXref> _settlement_type_oldXref = this.firmserviceimpl.doFindAllFirmSettlementTypXref(_firm_id);
				
				for(int y=0; y < _settlement_type_oldXref.size(); y++){
					_settlement_type_oldAXref.add(_settlement_type_oldXref.get(y).getSettlement_typ_cd());						
				}
				
				while(_settlement_type_st.hasMoreTokens()){
					_settlement_type_newAXref.add(_settlement_type_st.nextToken().trim());						
				}
				
				if(_settlement_type_oldAXref.size() > 0){
					this.firmserviceimpl.deleteFirmSettlementTypeXref(_firm_id);
				}
				
				if(_settlement_type_newAXref.size() > 0){
					for(int r=0; r < _settlement_type_newAXref.size(); r++){
						fstx = new FirmSettlementTypXref();
						fstx.setFirm_id(_firm_id);
						fstx.setSettlement_typ_cd(_settlement_type_newAXref.get(r));
						fstx.setLst_updt_userid(this.getUserName(request));
						this.firmserviceimpl.insertFirmSettlementTypeXref(fstx);
					}
				}
				
//            }
            
			/*
			 * Firm Omnibus Trade Proc Xref
			 */
//            if(_omnibus_trad_proc_cd.length() > 0){
				StringTokenizer _omnibus_trad_proc_cd_st = new StringTokenizer(_omnibus_trad_proc_cd, ",");
				FirmOmnibusTradProcXref fotpx;
				
				ArrayList<String> _omnibus_trad_proc_cd_oldAXref  = new ArrayList<String>(1);
				ArrayList<String> _omnibus_trad_proc_cd_newAXref  = new ArrayList<String>(1);
				
				List<FirmOmnibusTradProcXref> _omnibus_trad_proc_cd_oldXref = this.firmserviceimpl.doFindAllFirmOmnibusTradProcXref(_firm_id);
				
				for(int y=0; y < _omnibus_trad_proc_cd_oldXref.size(); y++){
					_omnibus_trad_proc_cd_oldAXref.add(_omnibus_trad_proc_cd_oldXref.get(y).getOmnibus_trad_proc_cd());						
				}
				
				while(_omnibus_trad_proc_cd_st.hasMoreTokens()){
					_omnibus_trad_proc_cd_newAXref.add(_omnibus_trad_proc_cd_st.nextToken().trim());						
				}
				
				if(_omnibus_trad_proc_cd_oldAXref.size() > 0){
					this.firmserviceimpl.deleteFirmOmnibusTradProcXref(_firm_id);
				}
				
				if(_omnibus_trad_proc_cd_newAXref.size() > 0){
					for(int r=0; r < _omnibus_trad_proc_cd_newAXref.size(); r++){
						fotpx = new FirmOmnibusTradProcXref();
						fotpx.setFirm_id(_firm_id);
						fotpx.setOmnibus_trad_proc_cd(_omnibus_trad_proc_cd_newAXref.get(r));
						fotpx.setLst_updt_userid(this.getUserName(request));
						this.firmserviceimpl.insertFirmOmnibusTradProcXref(fotpx);
					}
				}
				
//            }
            
			/*
			 * Firm Data Trans Method xref
			 */
//            if(_data_trans_mthd.length() > 0){
				StringTokenizer _data_trans_mthd_st = new StringTokenizer(_data_trans_mthd, ",");
				FirmDataTransMethodXref fdtmx;
				
				ArrayList<String> _data_trans_mthd_oldAXref  = new ArrayList<String>(1);
				ArrayList<String> _data_trans_mthd_newAXref  = new ArrayList<String>(1);
				
				List<FirmDataTransMethodXref> _data_trans_mthd_oldXref = this.firmserviceimpl.doFindAllFirmDataTransMethodXref(_firm_id);
				
				for(int y=0; y < _data_trans_mthd_oldXref.size(); y++){
					_data_trans_mthd_oldAXref.add(_data_trans_mthd_oldXref.get(y).getData_trans_mthd_cd());						
				}
				
				while(_data_trans_mthd_st.hasMoreTokens()){
					_data_trans_mthd_newAXref.add(_data_trans_mthd_st.nextToken().trim());						
				}
				
				if(_data_trans_mthd_oldAXref.size() > 0){
					this.firmserviceimpl.deleteFirmDataTransMethodXref(_firm_id);
				}
				
				if(_data_trans_mthd_newAXref.size() > 0){
					for(int r=0; r < _data_trans_mthd_newAXref.size(); r++){
						fdtmx = new FirmDataTransMethodXref();
						fdtmx.setFirm_id(_firm_id);
						fdtmx.setData_trans_mthd_cd(_data_trans_mthd_newAXref.get(r));
						fdtmx.setLst_updt_userid(this.getUserName(request));
						this.firmserviceimpl.insertFirmDataTransMethodXref(fdtmx);
					}
				}
				
//            }
            
			/*
			 * Firm Pricing Source xref
			 */
//            if(_pricing_source.length() > 0){
				StringTokenizer _pricing_source_st = new StringTokenizer(_pricing_source, ",");
				FirmPricingSourceXref fpsx;
				
				ArrayList<String> _pricing_source_oldAXref  = new ArrayList<String>(1);
				ArrayList<String> _pricing_source_newAXref  = new ArrayList<String>(1);
				
				List<FirmPricingSourceXref> _pricing_source_oldXref = this.firmserviceimpl.doFindAllFirmPricingSourceXref(_firm_id);
				
				for(int y=0; y < _pricing_source_oldXref.size(); y++){
					_pricing_source_oldAXref.add(_pricing_source_oldXref.get(y).getPricing_src_cd());						
				}
				
				while(_pricing_source_st.hasMoreTokens()){
					_pricing_source_newAXref.add(_pricing_source_st.nextToken().trim());						
				}
				
				if(_pricing_source_oldAXref.size() > 0){
					this.firmserviceimpl.deleteFirmPricingSourceXref(_firm_id);
				}
				
				if(_pricing_source_newAXref.size() > 0){
					for(int r=0; r < _pricing_source_newAXref.size(); r++){
						fpsx = new FirmPricingSourceXref();
						fpsx.setFirm_id(_firm_id);
						fpsx.setPricing_src_cd(_pricing_source_newAXref.get(r));
						fpsx.setLst_updt_userid(this.getUserName(request));
						this.firmserviceimpl.insertFirmPricingSourceXref(fpsx);
					}
				}
				
//            }

            sv.setTrue_false(true);

		}catch(UnsupportedEncodingException ue ){
			logger.info(ue.getMessage());
		}

		return sv;
	}

	/*
	 * Update the ta sub firm data
	 */
	@RequestMapping("/updateTA2000SubFirm" )
	@ResponseBody
	public SearchValidator callUpdateTA2000SubFirm(HttpServletRequest request){		

		HttpSession session = request.getSession();
		int _ta2k_sub_firm_id = Integer.parseInt((String)session.getAttribute("TA2_SUB_FIRM_ID"));
		
		List<TA2000SubFirm> tasfs = firmserviceimpl.doFindSingleTA2000SubFirm(_ta2k_sub_firm_id);
		
		TA2000SubFirm tasf = tasfs.get(0);
		sv = new SearchValidator();
		
		int _firm_id = Integer.parseInt((String)session.getAttribute("FIRM_ID"));
		int _mgmt_co_id = Integer.parseInt((String)session.getAttribute("MGMT_CO_ID"));

		logger.info("Adding a ta2000 sub firm with firm_id " + _firm_id);
		logger.info("Adding a ta2000 sub mgmt_co with firm_id " + _mgmt_co_id);

		// getting the MC Code not the id
/*
		List<MgmtCo> mgmtcos = mgmtcoserviceimpl.doFindSingleMgmtCoById(_mgmt_co_id);
		String _mgmtCo = (String)mgmtcos.get(0).getTa2000_co_cd();
		String _FirmDlrNum = (String)request.getParameter("ta2000_dealr_num");
		
		List<TA2000SubFirm> dutasfs = firmserviceimpl.doFindAllTA2000SubFirm("%", 
																		  "%" + _mgmtCo + "%", 
																		  "%", 
																		  "%" + _FirmDlrNum + "%", 
																		  "%");
		if(dutasfs.size() > 0){
			sv.setTrue_false(false);
			sv.setDuplicate(true);
			return sv;
		}
*/		
		try{
			tasf.setFirm_id(_firm_id);
			tasf.setMgmt_co_co_id(_mgmt_co_id);
			
			tasf.setTa2000_dealr_num((String)request.getParameter("ta2000_dealr_num"));
			tasf.setTa2000_sub_firm_typ_cd((String)request.getParameter("ta2000_sub_firm_typ"));
			tasf.setTa2000_nscc_member_num((String)request.getParameter("ta2000_nscc_member_num"));
			tasf.setTa2000_nscc_ntwrk_alpha_cd((String)request.getParameter("ta2000_nscc_ntwrk_alpha"));
			tasf.setTa2000_firm_nm((String)request.getParameter("ta2000_firm_nm"));
			tasf.setTa2000_firm_address1((String)request.getParameter("ta2000_firm_address1"));
			tasf.setTa2000_firm_address2((String)request.getParameter("ta2000_firm_address2"));
			tasf.setTa2000_firm_city((String)request.getParameter("ta2000_firm_city"));
			tasf.setTa2000_firm_state_cd((String)request.getParameter("ta2000_firm_state_cd"));
			tasf.setTa2000_firm_zip_cd((String)request.getParameter("ta2000_firm_zip"));
			tasf.setActive_ind((String)request.getParameter("active_ind"));
			tasf.setInactive_dt((String)request.getParameter("inactive_dt"));
			tasf.setTa2000_alt_firm_nm((String)request.getParameter("ta2000_alt_firm_nm"));
			tasf.setAsof_trad_window((String)request.getParameter("asof_trad_window"));
			tasf.setOmnibus_conversion_dt((String)request.getParameter("omnibus_conversion_dt"));
			tasf.setPost_settlement_chng_ind((String)request.getParameter("post_settlement_chng_ind"));
			tasf.setPtf_acat_trnsfr_ind((String)request.getParameter("ptf_acat_trnsfr_ind"));
			tasf.setLst_updt_userid(this.getUserName(request));
			tasf.setShrhldr_svc_mdl_cd((String)request.getParameter("shrhldr_svc_mdl_cd"));
			String lob_dsc = (String)request.getParameter("lob_dsc");
			tasf.setlob_dsc((lob_dsc == null) ? "" : lob_dsc);
			tasf.setSettlement_typ_cd((String)request.getParameter("settlement_typ_cd"));
			
			sv.setTrue_false(true);
			
			this.firmserviceimpl.updateTA2000SubFirm(tasf);
			
		}catch(DuplicateKeyException dke){
			sv.setTrue_false(false);
			sv.setDuplicate(true);
			sv.setMessage("A record with the selected TA2000 Sub Firm / MGMT Company already exists.");
			logger.info(dke.getMessage());
			logger.info(dke.getStackTrace());
		}

		return sv;
	}
		
}
