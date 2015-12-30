package com.bfds.app.fia.mgr.service;

import java.util.List;

import com.bfds.app.fia.mgr.model.Agreement;

public interface AgreementService {

	public List<Agreement> doFindAllAgreement();
	public List<Agreement> doFindSingleAgreement(int agre_id, int firm_mgmt_co_id);
	public void insertAgreement(Agreement agreement);
	public void deleteAgreement(Agreement agreement);
	public void updateAgreement(Agreement agreement);

}
