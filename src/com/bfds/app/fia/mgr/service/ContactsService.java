package com.bfds.app.fia.mgr.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.bfds.app.fia.mgr.model.CntctGrp;
import com.bfds.app.fia.mgr.model.CntctMethod;
import com.bfds.app.fia.mgr.model.CntctMgmtCoGrpXref;
import com.bfds.app.fia.mgr.model.CntctMgmtCoXref;
import com.bfds.app.fia.mgr.model.CntctType;
import com.bfds.app.fia.mgr.model.Contacts;
import com.bfds.app.fia.mgr.model.MgmtCo;
import com.bfds.app.fia.mgr.model.ViewCntctMgmtCoGrpXref;
import com.bfds.app.fia.mgr.model.ViewCntctMgmtCoXref;

public interface ContactsService {

	public List<Contacts> doFindAllContacts();
	public List<Contacts> doFindSingleContact(int cntct_id);
	public List<ViewCntctMgmtCoXref> doFindAllContactMgmtCoXref();
	public List<ViewCntctMgmtCoGrpXref> doFindAllContactMgmtCoGrpXref();
	public List<CntctGrp> doFindAllCntctGrp();
	public List<MgmtCo> doFindAllMgmtCo();
	public List<CntctMethod> doFindAllContactMethods();
	public List<CntctType> doFindAllContactTypes();
	public List<CntctMgmtCoXref> doFindSingleContactMgmtCoXref(int cntct_id, int mgmt_co_id);
	public List<CntctMgmtCoGrpXref> doFindSingleContactMgmtCoGrpXref(int cntct_id, int mgmt_co_id, String cntct_grp_cd);
	public void insertContacts(Contacts contact);
	public void insertContactMgmtcoXref(CntctMgmtCoXref cntctmgmtcoxref);
	public void insertContactMgmtcoGrpXref(CntctMgmtCoGrpXref cntctmgmtcogrpxref);
	public void deleteContacts(int cntct_id);
	public void deleteContactMgmtcoXref(int cntct_id, int mgmt_co_id);
	public void deleteContactMgmtcoXrefByCntct(int cntct_id);
	public void deleteContactMgmtcoGrpXref(int cntct_id, int mgmt_co_id);
	public void deleteContactMgmtcoGrpXrefByCntct(int cntct_id);
	public void updateContacts(Contacts contact);
	public void updateContactMgmtcoXref(CntctMgmtCoXref cntctmgmtcoxref);
	public void updateContactMgmtCoGrpXref(CntctMgmtCoGrpXref cntctmgmtgrpxref);
	
}
