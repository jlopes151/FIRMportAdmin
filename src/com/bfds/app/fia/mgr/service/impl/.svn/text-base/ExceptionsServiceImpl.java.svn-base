package com.bfds.app.fia.mgr.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bfds.app.fia.mgr.mappers.ExceptionsMapper;
import com.bfds.app.fia.mgr.model.MExceptions;
import com.bfds.app.fia.mgr.service.ExceptionsService;

@Scope("prototype")
@Service
public class ExceptionsServiceImpl implements ExceptionsService {
	
	private ExceptionsMapper exceptionsmapper;
	
	@Autowired
	public ExceptionsServiceImpl(ExceptionsMapper exceptionsmapper){
		this.exceptionsmapper = exceptionsmapper;
	}
	
	public List<MExceptions> doFindAllExceptions(){
		return this.exceptionsmapper.findAllExceptions();
	}

	public List<MExceptions> doFindSingleExceptions(String field_cd, int firm_mgmt_co_id){
		return this.exceptionsmapper.findSingleException(field_cd, firm_mgmt_co_id);
	}
	
	@Transactional
	public void insertExceptions(MExceptions exceptions){
		this.exceptionsmapper.insertExceptions(exceptions);
	}

	@Transactional
	public void deleteExceptions(MExceptions exceptions){
		this.exceptionsmapper.deleteExceptions(exceptions);
	}
	
	@Transactional
	public void updateExceptions(MExceptions exceptions){
		this.exceptionsmapper.updateExceptions(exceptions);
	}
	
}
