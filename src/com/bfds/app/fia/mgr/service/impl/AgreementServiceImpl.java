package com.bfds.app.fia.mgr.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bfds.app.fia.mgr.mappers.AgreementMapper;
import com.bfds.app.fia.mgr.model.Agreement;
import com.bfds.app.fia.mgr.service.AgreementService;

@Scope("prototype")
@Service
public class AgreementServiceImpl implements AgreementService {
	
	private AgreementMapper agreementmapper;
	
	@Autowired
	public AgreementServiceImpl(AgreementMapper agreementmapper){
		this.agreementmapper = agreementmapper;
	}
	
	public List<Agreement> doFindAllAgreement(){
		return this.agreementmapper.findAllAgreement(); 
	}
	
	public List<Agreement> doFindSingleAgreement(int agre_id, int firm_mgmt_co_id){
		return this.agreementmapper.findSingleAgreement(agre_id, firm_mgmt_co_id); 
	}
	
	@Transactional
	public void insertAgreement(Agreement agreement){
		this.agreementmapper.insertAgreement(agreement);
	}

	@Transactional
	public void deleteAgreement(Agreement agreement){
		this.agreementmapper.deleteAgreement(agreement);
	}
	
	@Transactional
	public void updateAgreement(Agreement agreement){
		this.agreementmapper.updateAgreement(agreement);
	}
	
}
