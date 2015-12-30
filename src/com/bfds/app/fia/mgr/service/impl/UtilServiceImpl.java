/**
 * 
 */
package com.bfds.app.fia.mgr.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bfds.app.fia.mgr.mappers.UtilMapper;
import com.bfds.app.fia.mgr.model.AgreeType;
import com.bfds.app.fia.mgr.model.BatchTypes;
import com.bfds.app.fia.mgr.model.BrokeragePlatform;
import com.bfds.app.fia.mgr.model.DataTransMthdTypes;
import com.bfds.app.fia.mgr.model.Fields;
import com.bfds.app.fia.mgr.model.Firm;
import com.bfds.app.fia.mgr.model.FirmTypes;
import com.bfds.app.fia.mgr.model.MFProfileII;
import com.bfds.app.fia.mgr.model.MgmtCo;
import com.bfds.app.fia.mgr.model.MgmtCoTypes;
import com.bfds.app.fia.mgr.model.NetworkMatrixLevel;
import com.bfds.app.fia.mgr.model.OmnibusDistMdlTypes;
import com.bfds.app.fia.mgr.model.OmnibusTradeProcessTypes;
import com.bfds.app.fia.mgr.model.OperationalReview;
import com.bfds.app.fia.mgr.model.PosFileSched;
import com.bfds.app.fia.mgr.model.PricingSource;
import com.bfds.app.fia.mgr.model.SettlementTypes;
import com.bfds.app.fia.mgr.model.ShareHldrSvcMdlTypes;
import com.bfds.app.fia.mgr.model.StateTypes;
import com.bfds.app.fia.mgr.model.SubAcctPltfrmTypes;
import com.bfds.app.fia.mgr.model.TA2000SubFirmType;
import com.bfds.app.fia.mgr.model.TransFileType;
import com.bfds.app.fia.mgr.service.UtilService;

@Scope("prototype")
@Service
public class UtilServiceImpl implements UtilService {

	private UtilMapper utilmapper;
	
	@Autowired
	public UtilServiceImpl(UtilMapper utilmapper) {
		this.utilmapper = utilmapper;
	}
	
	@Transactional
	public List<StateTypes> getStates() {
		return this.utilmapper.returnStates() ;
	}

	@Transactional
	public List<Firm> doFindAllFirms(){
		return this.utilmapper.returnSystem(); 
	}
	
	public List<Firm> doFirmSrch(String short_nm){
		return this.utilmapper.doFirmSrch(short_nm); 
	}
	
	@Transactional
	public List<MgmtCo> doFindAllMgmtCo(){
		return this.utilmapper.returnCompany(); 
	}
	
	@Transactional
	public List<FirmTypes> getFirmTypes() {
		return this.utilmapper.returnFirmTypes();
	}

	@Transactional
	public List<OmnibusDistMdlTypes> getOmnibusDistModel() {
		return this.utilmapper.returnOmnibusDistModel();
	}

	@Transactional
	public List<DataTransMthdTypes> getDataTrnsMthd() {
		return this.utilmapper.returnDataTrnsMthd();
	}

	@Transactional
	public List<MgmtCoTypes> getMgmtCoMthd() {
		return this.utilmapper.returnMgmtCoMthd();
	}

	@Transactional
	public List<OmnibusTradeProcessTypes> getOmnibusTradeProcess(){
		return this.utilmapper.returnOmnibusTradeProcess();
	}
	
	@Transactional
	public List<SettlementTypes> getSettlementType(){
		return this.utilmapper.returnSettlementType();
	}
	
	@Transactional
	public List<BatchTypes> getBatchType(){
		return this.utilmapper.returnBatchType();
	}

	@Transactional
	public List<ShareHldrSvcMdlTypes> getShareHldrSvcMdl(){
		return this.utilmapper.returnShareHldrSrvMdlTypes();
	}

	@Transactional
	public List<SubAcctPltfrmTypes> getSubAcctPltfrm(){
		return this.utilmapper.returnSubAcctPltfrmTypes();
	}
	
	@Transactional
	public List<Fields> getFields(){
		return this.utilmapper.returnFields();
	}

	@Transactional
	public List<PosFileSched> getPosFileSched(){
		return this.utilmapper.returnPosFileSched();
	}

	@Transactional
	public List<TransFileType> getTransFileType(){
		return this.utilmapper.returnTransFileType();
	}

	@Transactional
	public List<AgreeType> getAgreeType(){
		return this.utilmapper.returnAgreeType();
	}
	
	@Transactional
	public List<NetworkMatrixLevel> getNetworkMatrixLevel(){
		return this.utilmapper.returnNetworkMatrixLevel();
	}

	@Transactional
	public List<BrokeragePlatform> getBrokeragePlatform(){
		return this.utilmapper.returnBrokeragePlatform();
	}
	
	@Transactional
	public List<OperationalReview> getOperationalReview(){
		return this.utilmapper.returnOperationalReview();
	}
	
	@Transactional
	public List<MFProfileII> getMFProfileII(){
		return this.utilmapper.returnMFProfileII();
	}
	
	@Transactional
	public List<PricingSource> getPricingSource(){
		return this.utilmapper.returnPricingSource();
	}
	
	@Transactional
	public List<TA2000SubFirmType> getTA2000SubFirmType(){
		return this.utilmapper.returnTA2000SubFirmType();
	}	
}
