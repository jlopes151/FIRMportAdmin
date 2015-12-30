/**
 * 
 */
package com.bfds.app.fia.mgr.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bfds.app.fia.mgr.mappers.FrmFndAndClsAgreMapper;
import com.bfds.app.fia.mgr.model.FrmFndAndClsAgre;
import com.bfds.app.fia.mgr.service.FrmFndAndClsAgreService;

@Scope("prototype")
@Service
public class FrmFndAndClsAgreServiceImpl implements FrmFndAndClsAgreService{
	
	private FrmFndAndClsAgreMapper FrmFndAndClsAgremapper;
	
	@Autowired
	public FrmFndAndClsAgreServiceImpl(FrmFndAndClsAgreMapper FrmFndAndClsAgremapper){
		this.FrmFndAndClsAgremapper = FrmFndAndClsAgremapper;
	}
	
	public List<FrmFndAndClsAgre> doFindAllFrmFndAndClsAgre(){
		return this.FrmFndAndClsAgremapper.findAllFrmFndAndClsAgre(); 
	}
	
	@Transactional
	public void insertFrmFndAndClsAgre(FrmFndAndClsAgre FrmFndAndClsAgre){
		this.FrmFndAndClsAgremapper.insertFrmFndAndClsAgre(FrmFndAndClsAgre);
	}

	@Transactional
	public void deleteFrmFndAndClsAgre(FrmFndAndClsAgre FrmFndAndClsAgre){
		this.FrmFndAndClsAgremapper.deleteFrmFndAndClsAgre(FrmFndAndClsAgre);
	}
	
	@Transactional
	public void updateFrmFndAndClsAgre(FrmFndAndClsAgre FrmFndAndClsAgre){
		this.FrmFndAndClsAgremapper.updateFrmFndAndClsAgre(FrmFndAndClsAgre);
	}
	
}
