/**
 * 
 */
package com.bfds.app.fia.mgr.service;

import java.util.List;

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

/**
 * @author jlopes
 *
 */
public interface UtilService {

	public List<StateTypes> getStates();
	public List<FirmTypes> getFirmTypes();
	public List<OmnibusDistMdlTypes> getOmnibusDistModel();
	public List<DataTransMthdTypes> getDataTrnsMthd();
	public List<Firm> doFindAllFirms();
	public List<Firm> doFirmSrch(String short_nm);
	public List<MgmtCo> doFindAllMgmtCo();
	public List<MgmtCoTypes> getMgmtCoMthd();
	public List<OmnibusTradeProcessTypes> getOmnibusTradeProcess();
	public List<SettlementTypes> getSettlementType();
	public List<BatchTypes> getBatchType();
	public List<ShareHldrSvcMdlTypes> getShareHldrSvcMdl();
	public List<SubAcctPltfrmTypes> getSubAcctPltfrm();
	public List<Fields> getFields();
	public List<PosFileSched> getPosFileSched();
	public List<TransFileType> getTransFileType();
	public List<AgreeType> getAgreeType();
	public List<NetworkMatrixLevel> getNetworkMatrixLevel();
	public List<BrokeragePlatform> getBrokeragePlatform();
	public List<OperationalReview> getOperationalReview();
	public List<MFProfileII> getMFProfileII();
	public List<PricingSource> getPricingSource();
	public List<TA2000SubFirmType> getTA2000SubFirmType();
}
