/**
 * 
 */
package com.bfds.app.fia.mgr.service.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bfds.app.fia.mgr.mappers.FirmMapper;
import com.bfds.app.fia.mgr.mappers.FirmAndMgmtCoMapper;
import com.bfds.app.fia.mgr.model.Firm;
import com.bfds.app.fia.mgr.model.MgmtCo;
import com.bfds.app.fia.mgr.model.FirmAndMgmtCo;
import com.bfds.app.fia.mgr.service.FirmAndMgmtCoService;

@Scope("prototype")
@Service
public class FirmAndMgmtCoServiceImpl implements FirmAndMgmtCoService{

	private static Logger logger;

	private FirmAndMgmtCoMapper firmandmgmtcomapper;

	@Autowired
	public FirmAndMgmtCoServiceImpl(FirmAndMgmtCoMapper firmandmgmtcomapper){
		this.firmandmgmtcomapper = firmandmgmtcomapper;
	}
	
	public List<FirmAndMgmtCo> doFindAllFirmAndMgmtCo(String shortname,
													  String system,
													  String company){
		return this.firmandmgmtcomapper.findAllFirmAndMgmtCo(shortname,
															 system,
															 company); 
	}
	
	public List<FirmAndMgmtCo> doFindSingleFirmAndMgmtCo(int firm_id, int mgmt_co_id){
		return this.firmandmgmtcomapper.findSingleFirmAndMgmtCo(firm_id, mgmt_co_id); 
	}
	
	public List<FirmAndMgmtCo> doFindSingleFirmAndMgmtCoById(int firm_mgmt_co_id){
		return this.firmandmgmtcomapper.findSingleFirmAndMgmtCoById(firm_mgmt_co_id); 
	}
	
	public List<MgmtCo> doFindSingleMgmtCo(String system, String company){
		return this.firmandmgmtcomapper.findSingleMgmtCo(system, company); 
	}
	
	public List<Firm> doFindSingleFirm(String shortName){
		return this.firmandmgmtcomapper.findSingleFirm(shortName); 
	}
	
	@Transactional
	public void insertFirmAndMgmtCo(FirmAndMgmtCo firmandmgmtco) throws Exception{
		try{
			this.firmandmgmtcomapper.insertFirmAndMgmtCo(firmandmgmtco);
		}catch(Exception e){
			throw new Exception(e.getMessage());
		}
	}

	@Transactional
	public void deleteFirmAndMgmtCo(int firm_id, int mgmt_co_id){
		this.firmandmgmtcomapper.deleteFirmAndMgmtCo(firm_id, mgmt_co_id);
	}
	
	@Transactional
	public void updateFirmAndMgmtCo(FirmAndMgmtCo firmandmgmtco){
		this.firmandmgmtcomapper.updateFirmAndMgmtCo(firmandmgmtco);
	}
	
}
