package com.bfds.app.fia.mgr.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bfds.app.fia.mgr.mappers.BranchMapper;
import com.bfds.app.fia.mgr.model.Branch;
import com.bfds.app.fia.mgr.service.BranchService;

@Scope("prototype")
@Service
public class BranchServiceImpl implements BranchService {
	
	private BranchMapper branchmapper;
	
	@Autowired
	public BranchServiceImpl(BranchMapper branchmapper){
		this.branchmapper = branchmapper;
	}
	
	public List<Branch> doFindAllBranch(){
		return this.branchmapper.findAllBranch(); 
	}
	
	public List<Branch> doFindSingleBranch(int firm_id, int branch_id){
		return this.branchmapper.findSingleBranch(firm_id, branch_id); 
	}
	
	@Transactional
	public void insertBranch(Branch branch){
		this.branchmapper.insertBranch(branch);
	}

	@Transactional
	public void deleteBranch(Branch branch){
		this.branchmapper.deleteBranch(branch);
	}
	
	@Transactional
	public void updateBranch(Branch branch){
		this.branchmapper.updateBranch(branch);
	}
	
}
