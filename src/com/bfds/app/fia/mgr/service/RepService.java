package com.bfds.app.fia.mgr.service;

import java.util.List;

import com.bfds.app.fia.mgr.model.Rep;

public interface RepService {

	public List<Rep> doFindAllRep();
	public void insertRep(Rep rep);
	public void deleteRep(Rep rep);
	public void updateRep(Rep rep);

}
