package com.bfds.app.fia.mgr.service.impl;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bfds.app.fia.mgr.mappers.ContactsMapper;
import com.bfds.app.fia.mgr.model.CntctGrp;
import com.bfds.app.fia.mgr.model.CntctMethod;
import com.bfds.app.fia.mgr.model.CntctMgmtCoGrpXref;
import com.bfds.app.fia.mgr.model.CntctMgmtCoXref;
import com.bfds.app.fia.mgr.model.CntctType;
import com.bfds.app.fia.mgr.model.Contacts;
import com.bfds.app.fia.mgr.model.MgmtCo;
import com.bfds.app.fia.mgr.model.ViewCntctMgmtCoGrpXref;
import com.bfds.app.fia.mgr.model.ViewCntctMgmtCoXref;
import com.bfds.app.fia.mgr.service.ContactsService;

@Scope("prototype")
@Service
public class ContactsServiceImpl implements ContactsService {
	
	private ContactsMapper contactsmapper;
	
	@Autowired
	public ContactsServiceImpl(ContactsMapper Contactsmapper){
		this.contactsmapper = Contactsmapper;
	}
	
	public List<Contacts> doFindAllContacts(){
		return this.contactsmapper.findAllContacts(); 
	}
	
	public List<Contacts> doFindSingleContact(int cntct_id){
		return this.contactsmapper.findSingleContact(cntct_id); 
	}
	
	public List<ViewCntctMgmtCoXref> doFindAllContactMgmtCoXref(){
		return this.contactsmapper.findAllContactMgmtCoXref(); 
	}

	public List<ViewCntctMgmtCoGrpXref> doFindAllContactMgmtCoGrpXref(){
		return this.contactsmapper.findAllContactMgmtCoGrpXref(); 
	}

	public List<MgmtCo> doFindAllMgmtCo(){
		return this.contactsmapper.findAllMgmtCo(); 
	}
	
	public List<CntctMethod> doFindAllContactMethods(){
		return this.contactsmapper.findAllCntctMethod(); 
	}
	
	public List<CntctType> doFindAllContactTypes(){
		return this.contactsmapper.findAllCntctType(); 
	}
	
	public List<CntctMgmtCoXref> doFindSingleContactMgmtCoXref(int cntct_id, int mgmt_co_id){
		return this.contactsmapper.findSingleCntctMgmtcoXrfMethod(cntct_id, mgmt_co_id);
	}

	public List<CntctMgmtCoGrpXref> doFindSingleContactMgmtCoGrpXref(int cntct_id, int mgmt_co_id, String cntct_grp_cd){
		return this.contactsmapper.findSingleCntctMgmtcoGrpXrf(cntct_id, mgmt_co_id, cntct_grp_cd);
	}

	public List<CntctGrp> doFindAllCntctGrp(){
		return this.contactsmapper.findAllCntctGrp();
	}
	
	@Transactional
	public void insertContacts(Contacts Contacts){
		this.contactsmapper.insertContacts(Contacts);
	}

	@Transactional
	public void insertContactMgmtcoXref(CntctMgmtCoXref cntctmgmtxref){
		this.contactsmapper.insertContactMgmtCoXref(cntctmgmtxref);
	}

	@Transactional
	public void insertContactMgmtcoGrpXref(CntctMgmtCoGrpXref cntctmgmtgrpxref){
		this.contactsmapper.insertContactMgmtCoGrpXref(cntctmgmtgrpxref);
	}

	@Transactional
	public void deleteContacts(int cntct_id){
		this.contactsmapper.deleteCntcts(cntct_id);
	}
	
	@Transactional
	public void deleteContactMgmtcoXref(int cntct_id, int mgmt_co_id){
		this.contactsmapper.deleteCntctMgmtCoXrf(cntct_id, mgmt_co_id);
	}
	
	@Transactional
	public void deleteContactMgmtcoXrefByCntct(int cntct_id){
		this.contactsmapper.deleteCntctMgmtCoXrfByCntct(cntct_id);
	}
	
	@Transactional
	public void deleteContactMgmtcoGrpXref(int cntct_id, int mgmt_co_id){
		this.contactsmapper.deleteCntctMgmtCoGrpXrf(cntct_id, mgmt_co_id);
	}
	
	@Transactional
	public void deleteContactMgmtcoGrpXrefByCntct(int cntct_id){
		this.contactsmapper.deleteCntctMgmtCoGrpXrfByCntct(cntct_id);
	}
	
	@Transactional
	public void updateContacts(Contacts Contacts){
		this.contactsmapper.updateContacts(Contacts);
	}
	
	@Transactional
	public void updateContactMgmtcoXref(CntctMgmtCoXref cntctmgmtcoxref){
		this.contactsmapper.updateContactMgmtCoXref(cntctmgmtcoxref);
	}
	
	@Transactional
	public void updateContactMgmtCoGrpXref(CntctMgmtCoGrpXref cntctmgmtgrpxref){
		this.contactsmapper.updateContactMgmtCoGrpXref(cntctmgmtgrpxref);
	}
	
}
