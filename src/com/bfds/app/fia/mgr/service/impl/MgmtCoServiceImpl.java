package com.bfds.app.fia.mgr.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bfds.app.fia.mgr.mappers.MgmtCoMapper;
import com.bfds.app.fia.mgr.model.MgmtCo;
import com.bfds.app.fia.mgr.service.MgmtCoService;

import java.util.List;

@Scope("prototype")
@Service
public class MgmtCoServiceImpl implements MgmtCoService {
	
	private MgmtCoMapper mgmtcomapper;
	
	@Autowired
	public MgmtCoServiceImpl(MgmtCoMapper mgmtcomapper){
		this.mgmtcomapper = mgmtcomapper;
	}
	
	public List<MgmtCo> doFindAllMgmtCo(String system, String company){
		return this.mgmtcomapper.findAllMgmtCo(system, company); 
	}

	public List<MgmtCo> doFindSingleMgmtCo(String system, String company){
		return this.mgmtcomapper.findSingleMgmtCo(system, company); 
	}

	public List<MgmtCo> doFindSingleMgmtCoById(int mgmt_co_id){
		return this.mgmtcomapper.findSingleMgmtCoById(mgmt_co_id); 
	}

	@Transactional
	public void insertMgmtCo(MgmtCo mgmtco){
		this.mgmtcomapper.insertMgmtCo(mgmtco);
	}
	
	@Transactional
	public void deleteMgmtCo(String system, String company){
		this.mgmtcomapper.deleteMgmtCo(system, company);
	}
	
	@Transactional
	public void updateMgmtCo(MgmtCo mgmtco){
		this.mgmtcomapper.updateMgmtCo(mgmtco);
	}
	
}
