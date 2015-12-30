/**
 * 
 */
package com.bfds.app.fia.mgr.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bfds.app.fia.mgr.mappers.FundMapper;
import com.bfds.app.fia.mgr.model.Fund;
import com.bfds.app.fia.mgr.model.MgmtCo;
import com.bfds.app.fia.mgr.service.FundService;

@Scope("prototype")
@Service
public class FundServiceImpl implements FundService {
	
	private FundMapper Fundmapper;
	
	@Autowired
	public FundServiceImpl(FundMapper Fundmapper){
		this.Fundmapper = Fundmapper;
	}
	
	public List<Fund> doFindAllFund(String fund_lgl_nm){
		return this.Fundmapper.findAllFund(fund_lgl_nm); 
	}
	
	public List<Fund> doFindSingleFund(int fund_id){
		return this.Fundmapper.findSingleFund(fund_id); 
	}
	
	public List<MgmtCo> doCoSrch(String system, String company){
		return this.Fundmapper.doCoSrch(system, company); 
	}
	
	@Transactional
	public void insertFund(Fund fund){
		this.Fundmapper.insertFund(fund);
	}

	@Transactional
	public void deleteFund(String fund_lgl_nm){
		this.Fundmapper.deleteFund(fund_lgl_nm);
	}
	
	@Transactional
	public void updateFund(Fund fund){
		this.Fundmapper.updateFund(fund);
	}
	
}
