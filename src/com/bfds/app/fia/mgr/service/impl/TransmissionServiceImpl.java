package com.bfds.app.fia.mgr.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bfds.app.fia.mgr.mappers.TransmissionMapper;
import com.bfds.app.fia.mgr.model.Transmission;
import com.bfds.app.fia.mgr.service.TransmissionService;

@Scope("prototype")
@Service
public class TransmissionServiceImpl implements TransmissionService {
	
	private TransmissionMapper transmissionmapper;
	
	@Autowired
	public TransmissionServiceImpl(TransmissionMapper transmissionmapper){
		this.transmissionmapper = transmissionmapper;
	}
	
	public List<Transmission> doFindAllTransmission(){
		return this.transmissionmapper.findAllTransmission(); 
	}
	
	public List<Transmission> doFindSingleTransmission(int trans_id, int firm_mgmt_co_id){
		return this.transmissionmapper.findSingleTransmission(trans_id, firm_mgmt_co_id); 
	}
	
	@Transactional
	public void insertTransmission(Transmission transmission){
		this.transmissionmapper.insertTransmission(transmission);
	}

	@Transactional
	public void deleteTransmission(Transmission transmission){
		this.transmissionmapper.deleteTransmission(transmission);
	}
	
	@Transactional
	public void updateTransmission(Transmission transmission){
		this.transmissionmapper.updateTransmission(transmission);
	}
	
}
