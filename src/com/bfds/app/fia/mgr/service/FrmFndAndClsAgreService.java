package com.bfds.app.fia.mgr.service;

import java.util.List;

import com.bfds.app.fia.mgr.model.FrmFndAndClsAgre;

public interface FrmFndAndClsAgreService {

	public List<FrmFndAndClsAgre> doFindAllFrmFndAndClsAgre();
	public void insertFrmFndAndClsAgre(FrmFndAndClsAgre frmfndandclsagre);
	public void deleteFrmFndAndClsAgre(FrmFndAndClsAgre frmfndandclsagre);
	public void updateFrmFndAndClsAgre(FrmFndAndClsAgre frmfndandclsagre);

}
