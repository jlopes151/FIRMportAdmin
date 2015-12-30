package com.bfds.app.fia.mgr.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bfds.app.fia.mgr.mappers.FirmMapper;
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
import com.bfds.app.fia.mgr.model.FirmSrch;
import com.bfds.app.fia.mgr.model.FirmSubAcctPltfrmXref;
import com.bfds.app.fia.mgr.model.FrmMgmtCoTrstFrm;
import com.bfds.app.fia.mgr.model.MgmtCo;
import com.bfds.app.fia.mgr.model.TA2000SubFirm;
import com.bfds.app.fia.mgr.model.TA2000SubFirmRelationship;
import com.bfds.app.fia.mgr.model.ViewFirmMgmtCoTrustFirm;
import com.bfds.app.fia.mgr.service.FirmService;

import java.util.List;

@Scope("prototype")
@Service
public class FirmServiceImpl implements FirmService {
	
	private FirmMapper firmmapper;
	
	@Autowired
	public FirmServiceImpl(FirmMapper firmmapper){
		this.firmmapper = firmmapper;
	}
	
	public List<Firm> doFindAllFirms(String str){
		return this.firmmapper.findAllFirms(str); 
	}
	
	public List<Firm> doFindSingleFirms(int firm_id){
		return this.firmmapper.findSingleFirms(firm_id); 
	}
	
	public List<Firm> doFindAllTrustFirms(String str){
		return this.firmmapper.findAllTrustFirms(str); 
	}
	
	public List<Firm> doFindAllTrustTpaFirms(String str){
		return this.firmmapper.findAllTrustTpaFirms(str); 
	}
	
	public List<Firm> doFindSingleFirmsById(int firm_id){
		return this.firmmapper.findSingleFirmsById(firm_id); 
	}

	public List<Firm> doFindAllFirmTrustsByMgmtCo(int mgmt_co_id){
		return this.firmmapper.findAllFirmTrustsByMgmtCo(mgmt_co_id); 
	}
	
	public List<Firm> doFindAllNonTrustTpaFirmsByMgmtCo(int mgmt_co_id){
		return this.firmmapper.findNonTrustTpaFirms(mgmt_co_id); 
	}
	
	public List<MgmtCo> dofindAllFirmCompaniesNotInXref(int firm_id){
		return this.firmmapper.findAllFirmCompaniesNotInXref(firm_id); 
	}

	public List<Firm> doFindAllClearingFirms(){
		return this.firmmapper.findAllClearingFirms(); 
	}

	public List<TA2000SubFirm> doFindAllTA2000SubFirm(String _pfLngNm,
													  String _mgmtCo,
													  String _FirmNm,
													  String _FirmDlrNum,
													  String _FirmNsccMbrNum) {
		return this.firmmapper.findAllTA2000SubFirm(_pfLngNm, _mgmtCo, _FirmNm, _FirmDlrNum, _FirmNsccMbrNum);
	}
	
	public List<TA2000SubFirm> doFindSingleTA2000SubFirm(int ta2000_sub_firm_id){
		return this.firmmapper.findAllSingleTA2000SubFirm(ta2000_sub_firm_id);
	}

	public List<FirmClearingFirmXref> doFindAllFirmClearingFirmXref(int firm_id){
		return this.firmmapper.findAllFirmClearingFirmXref(firm_id);		
	}
	
	public List<FirmFirmTypeXref> doFindAllFirmFirmTypeXref(int firm_id){
		return this.firmmapper.findAllFirmFirmTypeXref(firm_id);
	}

	public List<FirmShareholderServicingModelXref> doFindAllFirmShrhldrSrvMdlXref(int firm_id){
		return this.firmmapper.findAllFirmShrhldrSrvMdlXref(firm_id);
	}
	
	public List<FirmSubAcctPltfrmXref> doFindAllFirmSubAcctPltfrmXref(int firm_id){
		return this.firmmapper.findAllFirmSubAcctPltfrmXref(firm_id);
	}
	
	public List<FirmBrokeragePlatformXref> doFindAllFirmBrokeragePlatformXref(int firm_id){
		return this.firmmapper.findAllFirmBrokeragePlatformXref(firm_id);
	}
	
	public List<FirmNsccMemberNum> doFindAllFirmNsccMemberNum(int firm_id){
		return this.firmmapper.findAllFirmNsccMemberNum(firm_id);
	}
	
	public List<FirmNsccNetworkAlphaCd> doFindAllFirmNsccNetworkAlphaCd(int firm_id){
		return this.firmmapper.findAllFirmNsccNetworkAlphaCd(firm_id);
	}
	
	public List<FirmSettlementTypXref> doFindAllFirmSettlementTypXref(int firm_id){
		return this.firmmapper.findAllFirmSettlementTypXref(firm_id);
	}
	
	public List<FirmOmnibusTradProcXref> doFindAllFirmOmnibusTradProcXref(int firm_id){
		return this.firmmapper.findAllFirmOmnibusTradProcXref(firm_id);
	}
	
	public List<FirmDataTransMethodXref> doFindAllFirmDataTransMethodXref(int firm_id){
		return this.firmmapper.findAllFirmDataTransMethodXref(firm_id);
	}

	public List<FirmPricingSourceXref> doFindAllFirmPricingSourceXref(int firm_id){
		return this.firmmapper.findAllFirmPricingSourceXref(firm_id);
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.bfds.app.fia.mgr.service.FirmService#doFindAllFirmMgmtCoTrustFirm()
	 * 
	 * This method gets a list of Firm, Company, Trust, Firms to view 
	 */
	public List<ViewFirmMgmtCoTrustFirm> doFindAllFirmMgmtCoTrustFirm(){
		
		List<ViewFirmMgmtCoTrustFirm> vfmcotrstfrm = this.firmmapper.findAllFirmMgmtCoTrustFirm();
		
		/*
		 * Now use the trst_frm_id, firm_id & mgmt_co_id to get the shor and long names, passing the 
		 * firm_mgmt_co_id along for the ride.
		 */
		for(int fmtf=0; fmtf < vfmcotrstfrm.size(); fmtf++){
			
			ViewFirmMgmtCoTrustFirm vfmctf = vfmcotrstfrm.get(fmtf);
			
			List<Firm> trst_frms = this.firmmapper.findSingleFirmsById(vfmctf.getTrst_frm_id());
			Firm t_firm = trst_frms.get(0);

			List<MgmtCo> mgmtcos = this.firmmapper.findAllMCompanies(vfmctf.getMgmt_co_id());
			MgmtCo mc = mgmtcos.get(0);

			List<Firm> firms = this.firmmapper.findSingleFirmsById(vfmctf.getFirm_id());
			Firm f = firms.get(0);
			
			vfmctf.setTrst_frm_short_nm(t_firm.getShort_nm());
			vfmctf.setTrst_frm_long_nm(t_firm.getLong_nm());
			
			vfmctf.setMgmt_co_short_nm(mc.getMgmt_co_short_nm());
			vfmctf.setMgmt_co_long_nm(mc.getMgmt_co_long_nm());
			
			vfmctf.setFirm_short_nm(f.getShort_nm());
			vfmctf.setFirm_long_nm(f.getLong_nm());
			
		}
		
		return vfmcotrstfrm;		
	}
	
	@Transactional
	public List<TA2000SubFirmRelationship> doFindAllTA2000SubFirmRelationship(int ta2000_sub_firm_id){
		return this.firmmapper.findAllTA2000SubFirmRelationship(ta2000_sub_firm_id);
	}

	@Transactional
	public void insertFirm(Firm firm){
		this.firmmapper.insertFirm(firm);
	}

	@Transactional
	public void insertFirmMgmtCoTrustFirm(FrmMgmtCoTrstFrm fmctf){
		this.firmmapper.insertFirmMgmtCoTrustFirm(fmctf);
	}

	@Transactional
	public void insertFirmClearingFirmXref(FirmClearingFirmXref fcfx){
		this.firmmapper.insertFirmClearingFirmXref(fcfx);
	}

	@Transactional
	public void insertFirmFirmTypeXref(FirmFirmTypeXref fftx){
		this.firmmapper.insertFirmFirmTypeXref(fftx);
	}
	
	@Transactional
	public void insertFirmShrhldrSvcngMdlXref(FirmShareholderServicingModelXref fssmx){
		this.firmmapper.insertFirmShrhldrSvcngMdlXref(fssmx);
	}
	
	@Transactional
	public void insertFirmSubacctPltfrmXref(FirmSubAcctPltfrmXref fsapx){
		this.firmmapper.insertFirmSubacctPltfrmXref(fsapx);
	}
	
	@Transactional
	public void insertFirmBrokeragePlatformXref(FirmBrokeragePlatformXref fbpx){
		this.firmmapper.insertFirmBrokeragePlatformXref(fbpx);
	}

	@Transactional
	public void insertFirmNsccMemberNum(FirmNsccMemberNum fnmn){
		this.firmmapper.insertFirmNsccMemberNum(fnmn);
	}

	@Transactional
	public void insertFirmNsccNetworkAlphaCd(FirmNsccNetworkAlphaCd fnnac){
		this.firmmapper.insertFirmNsccNetworkAlphaCd(fnnac);
	}

	@Transactional
	public void insertFirmSettlementTypeXref(FirmSettlementTypXref fstx){
		this.firmmapper.insertFirmSettlementTypeXref(fstx);
	}

	@Transactional
	public void insertFirmOmnibusTradProcXref(FirmOmnibusTradProcXref fotpx){
		this.firmmapper.insertFirmOmnibusTradProcXref(fotpx);
	}

	@Transactional
	public void insertFirmDataTransMethodXref(FirmDataTransMethodXref fdtmx){
		this.firmmapper.insertFirmDataTransMethodXref(fdtmx);
	}
	
	@Transactional
	public void insertFirmPricingSourceXref(FirmPricingSourceXref fpsx){
		this.firmmapper.insertFirmPricingSourceXref(fpsx);
	}

	@Transactional
	public void insertTA2000SubFirm(TA2000SubFirm tasf){
		this.firmmapper.insertTA2000SubFirm(tasf);
	}
	
	@Transactional
	public void deleteFirmClearingFirmXref(int firm_id){
		this.firmmapper.deleteFirmClearingFirmXref(firm_id);
	}
	
	@Transactional
	public void deleteFirmFirmTypeXref(int firm_id){
		this.firmmapper.deleteFirmFirmTypeXref(firm_id);
	}
	
	@Transactional
	public void deleteFirmShareholderservicingModelXref(int firm_id){
		this.firmmapper.deleteFirmShareholderservicingModelXref(firm_id);
	}
	
	@Transactional
	public void deleteFirmBrokeragePlatformXref(int firm_id){
		this.firmmapper.deleteFirmBrokeragePlatformXref(firm_id);
	}
	
	@Transactional
	public void deleteFirmSubAcctPltfrmXref(int firm_id){
		this.firmmapper.deleteFirmSubAcctPltfrmXref(firm_id);
	}
	
	@Transactional
	public void deleteFirmNsccMemberNum(int firm_id){
		this.firmmapper.deleteFirmNsccMemberNum(firm_id);
	}
	
	@Transactional
	public void deleteFirmNsccNetworkApha(int firm_id){
		this.firmmapper.deleteFirmNsccNetworkApha(firm_id);
	}
	
	@Transactional
	public void deleteFirmSettlementTypeXref(int firm_id){
		this.firmmapper.deleteFirmSettlementTypeXref(firm_id);
	}
	
	@Transactional
	public void deleteFirmOmnibusTradProcXref(int firm_id){
		this.firmmapper.deleteFirmOmnibusTradProcXref(firm_id);
	}
	
	@Transactional
	public void deleteFirmDataTransMethodXref(int firm_id){
		this.firmmapper.deleteFirmDataTransMethodXref(firm_id);
	}

	@Transactional
	public void deleteFirmPricingSourceXref(int firm_id){
		this.firmmapper.deleteFirmPricingSourceXref(firm_id);
	}

	@Transactional
	public void deleteFirm(int firm_id){
		this.firmmapper.deleteFirm(firm_id);
	}
	
	@Transactional
	public void updateFirm(Firm firm){
		this.firmmapper.updateFirm(firm);
	}
	
	@Transactional
	public void updateTA2000SubFirm(TA2000SubFirm tasf){
		this.firmmapper.updateTA2000SubFirm(tasf);
	}

	
}
