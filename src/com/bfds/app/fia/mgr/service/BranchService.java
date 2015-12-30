package com.bfds.app.fia.mgr.service;

import java.util.List;

import com.bfds.app.fia.mgr.model.Branch;

public interface BranchService {

	public List<Branch> doFindAllBranch();
	public List<Branch> doFindSingleBranch(int firm_id, int branch_id);
	public void insertBranch(Branch branch);
	public void deleteBranch(Branch branch);
	public void updateBranch(Branch branch);

}
