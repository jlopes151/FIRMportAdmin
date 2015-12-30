package com.bfds.app.fia.mgr.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bfds.app.fia.mgr.mappers.RepMapper;
import com.bfds.app.fia.mgr.model.Rep;
import com.bfds.app.fia.mgr.service.RepService;

@Scope("prototype")
@Service
public class RepServiceImpl implements RepService {
	
	private RepMapper repmapper;
	
	@Autowired
	public RepServiceImpl(RepMapper repmapper){
		this.repmapper = repmapper;
	}
	
	public List<Rep> doFindAllRep(){
		return this.repmapper.findAllRep(); 
	}
	
	@Transactional
	public void insertRep(Rep rep){
		this.repmapper.insertRep(rep);
	}

	@Transactional
	public void deleteRep(Rep rep){
		this.repmapper.deleteRep(rep);
	}
	
	@Transactional
	public void updateRep(Rep rep){
		this.repmapper.updateRep(rep);
	}
	
}
