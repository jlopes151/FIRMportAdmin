package com.bfds.app.fia.mgr.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bfds.app.fia.mgr.mappers.FundAndClassMapper;
import com.bfds.app.fia.mgr.model.FundAndClass;
import com.bfds.app.fia.mgr.service.FundAndClassService;

@Scope("prototype")
@Service
public class FundAndClassServiceImpl implements FundAndClassService{
	
	private FundAndClassMapper fundandclassmapper;
	
	@Autowired
	public FundAndClassServiceImpl(FundAndClassMapper FundAndClassmapper){
		this.fundandclassmapper = FundAndClassmapper;
	}
	
	public List<FundAndClass> doFindAllFundAndClass(){
		return this.fundandclassmapper.findAllFundAndClass(); 
	}
	
	@Transactional
	public void insertFundAndClass(FundAndClass FundAndClass){
		this.fundandclassmapper.insertFundAndClass(FundAndClass);
	}

	@Transactional
	public void deleteFundAndClass(FundAndClass FundAndClass){
		this.fundandclassmapper.deleteFundAndClass(FundAndClass);
	}
	
	@Transactional
	public void updateFundAndClass(FundAndClass FundAndClass){
		this.fundandclassmapper.updateFundAndClass(FundAndClass);
	}
	
}
