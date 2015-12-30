package com.bfds.app.fia.mgr.service;

import java.util.List;

import com.bfds.app.fia.mgr.model.FirmAndMgmtCo;
import com.bfds.app.fia.mgr.model.MgmtCo;
import com.bfds.app.fia.mgr.model.Firm;

public interface FirmAndMgmtCoService {

	public List<FirmAndMgmtCo> doFindAllFirmAndMgmtCo(String shortname,
			  										  String system,
													  String company);
	public List<FirmAndMgmtCo> doFindSingleFirmAndMgmtCo(int Firm_id, int mgmt_co_id);
	public List<FirmAndMgmtCo> doFindSingleFirmAndMgmtCoById(int Firm_mgmt_co_id);
	public List<MgmtCo> doFindSingleMgmtCo(String system, String company);
	public List<Firm> doFindSingleFirm(String shortName);
	public void insertFirmAndMgmtCo(FirmAndMgmtCo firmandmgmt) throws Exception;
	public void deleteFirmAndMgmtCo(int Firm_id, int mgmt_co_id);
	public void updateFirmAndMgmtCo(FirmAndMgmtCo firmandmgmt);

}
