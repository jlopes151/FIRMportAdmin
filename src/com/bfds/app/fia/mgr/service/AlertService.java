package com.bfds.app.fia.mgr.service;

import java.util.List;

import com.bfds.app.fia.mgr.model.Alert;
import com.bfds.app.fia.mgr.model.AlertMgmtCoXref;
import com.bfds.app.fia.mgr.model.AlertTypes;
import com.bfds.app.fia.mgr.model.Firm;
import com.bfds.app.fia.mgr.model.MgmtCo;

public interface AlertService {

	public List<Alert> doFindAllAlert();
	public List<Alert> doFindSingleAlert(int alert_id);
	public List<Alert> doFindAlertByTitle(String alert_title);
	public List<AlertMgmtCoXref> doFindAlertMgmtCoXref(int alert_id);
	public List<AlertTypes> getAlertTypes();
	public List<Firm> doFindSingleFirm(String shortName);
	public List<MgmtCo> doFindSingleMgmtCo(String shortName);
	public void insertAlert(Alert alert);
	public void insertAlertMgmtCoXref(int alert_id, 
									  int mgmt_co_id, 
									  String lst_updt_userid);
	public void deleteAlert(int alert_id);
	public void deleteAlertMgmtCoXrefByAlertId(int alert_id);
	public void deleteAlertMgmtCoXrefByMgmtCoId(int mgmt_co_id);
	public void deleteAlertMgmtCoXrefByAlertIdAndMcId(int alert_id, int mgmt_co_id);
	public void updateAlert(Alert alert);

}
