package com.bfds.app.fia.mgr.service;

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

import java.util.List;

public interface FirmService {

	public List<Firm> doFindAllFirms(String shortname);
	public List<Firm> doFindSingleFirms(int firm_id);
	public List<Firm> doFindAllTrustFirms(String shortname);
	public List<Firm> doFindAllTrustTpaFirms(String shortname);
	public List<Firm> doFindSingleFirmsById(int firm_id);
	public List<Firm> doFindAllFirmTrustsByMgmtCo(int mgmt_co_id);
	public List<Firm> doFindAllNonTrustTpaFirmsByMgmtCo(int mgmt_co_id);
	public List<Firm> doFindAllClearingFirms();
	public List<TA2000SubFirm> doFindAllTA2000SubFirm(String _pfLngNm,
													  String _mgmtCo,
													  String _FirmNm,
													  String _FirmDlrNum,
													  String _FirmNsccMbrNum);
	public List<TA2000SubFirm> doFindSingleTA2000SubFirm(int ta2000_sub_firm_id);
	public List<FirmClearingFirmXref> doFindAllFirmClearingFirmXref(int firm_id);
	public List<FirmFirmTypeXref> doFindAllFirmFirmTypeXref(int firm_id);
	public List<FirmShareholderServicingModelXref> doFindAllFirmShrhldrSrvMdlXref(int firm_id);
	public List<FirmSubAcctPltfrmXref> doFindAllFirmSubAcctPltfrmXref(int firm_id);
	public List<FirmBrokeragePlatformXref> doFindAllFirmBrokeragePlatformXref(int firm_id);
	public List<FirmNsccMemberNum> doFindAllFirmNsccMemberNum(int firm_id);
	public List<FirmNsccNetworkAlphaCd> doFindAllFirmNsccNetworkAlphaCd(int firm_id);
	public List<FirmSettlementTypXref> doFindAllFirmSettlementTypXref(int firm_id);
	public List<FirmOmnibusTradProcXref> doFindAllFirmOmnibusTradProcXref(int firm_id);
	public List<FirmDataTransMethodXref> doFindAllFirmDataTransMethodXref(int firm_id);	
	public List<MgmtCo> dofindAllFirmCompaniesNotInXref(int firm_id);
	public List<ViewFirmMgmtCoTrustFirm> doFindAllFirmMgmtCoTrustFirm();
	public List<FirmPricingSourceXref> doFindAllFirmPricingSourceXref(int firm_id);
	public List<TA2000SubFirmRelationship> doFindAllTA2000SubFirmRelationship(int ta2000_sub_firm_id);
	public void insertFirm(Firm firm);
	public void insertFirmMgmtCoTrustFirm(FrmMgmtCoTrstFrm fmctf);
	public void insertFirmClearingFirmXref(FirmClearingFirmXref fcfx);
	public void insertFirmFirmTypeXref(FirmFirmTypeXref fftx);
	public void insertFirmShrhldrSvcngMdlXref(FirmShareholderServicingModelXref fssmx);	
	public void insertFirmSubacctPltfrmXref(FirmSubAcctPltfrmXref fsapx);
	public void insertFirmBrokeragePlatformXref(FirmBrokeragePlatformXref fbpx);
	public void insertFirmNsccMemberNum(FirmNsccMemberNum fnmn);
	public void insertFirmNsccNetworkAlphaCd(FirmNsccNetworkAlphaCd fnnac);
	public void insertFirmSettlementTypeXref(FirmSettlementTypXref fstx);
	public void insertFirmOmnibusTradProcXref(FirmOmnibusTradProcXref fotpx);
	public void insertFirmDataTransMethodXref(FirmDataTransMethodXref fdtmx);
	public void insertFirmPricingSourceXref(FirmPricingSourceXref fpsx);
	public void insertTA2000SubFirm(TA2000SubFirm tasf);
	public void deleteFirm(int firm_id);
	public void deleteFirmClearingFirmXref(int firm_id);
	public void deleteFirmFirmTypeXref(int firm_id);
	public void deleteFirmShareholderservicingModelXref(int firm_id);
	public void deleteFirmSubAcctPltfrmXref(int firm_id);
	public void deleteFirmBrokeragePlatformXref(int firm_id);
	public void deleteFirmNsccMemberNum(int firm_id);
	public void deleteFirmNsccNetworkApha(int firm_id);
	public void deleteFirmSettlementTypeXref(int firm_id);
	public void deleteFirmOmnibusTradProcXref(int firm_id);
	public void deleteFirmDataTransMethodXref(int firm_id);
	public void deleteFirmPricingSourceXref(int firm_id);
	public void updateFirm(Firm firm);
	public void updateTA2000SubFirm(TA2000SubFirm tasf);

}
