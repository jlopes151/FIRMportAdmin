package com.bfds.app.fia.mgr.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.bfds.app.fia.mgr.model.CntctGrp;
import com.bfds.app.fia.mgr.model.CntctMethod;
import com.bfds.app.fia.mgr.model.CntctMgmtCoGrpXref;
import com.bfds.app.fia.mgr.model.CntctMgmtCoXref;
import com.bfds.app.fia.mgr.model.CntctType;
import com.bfds.app.fia.mgr.model.Contacts;
import com.bfds.app.fia.mgr.model.MgmtCo;
import com.bfds.app.fia.mgr.model.ViewCntctMgmtCoGrpXref;
import com.bfds.app.fia.mgr.model.ViewCntctMgmtCoXref;

/**
 * @author jlopes
 *
 */
public interface ContactsMapper {
	
	@Select("Select cntct_id, firm_id, cntct_first_nm, cntct_last_nm, cntct_title, cntct_wrk_phn, cntct_cell_phn, " +
			"cntct_fax_num, cntct_address1, cntct_address2, cntct_city, cntct_state_cd, cntct_zip_cd, " +
			"cntct_email, cntct_verified_dt, lst_updt_userid, lst_updt_dtm, cntct_wrk_phn_ext from dbo.contact_t")
	public List<Contacts> findAllContacts();

	@Select("Select cntct_id, firm_id, cntct_first_nm, cntct_last_nm, cntct_title, cntct_wrk_phn, cntct_cell_phn, " +
			"cntct_fax_num, cntct_address1, cntct_address2, cntct_city, cntct_state_cd, cntct_zip_cd, " +
			"cntct_email, cntct_verified_dt, lst_updt_userid, lst_updt_dtm, cntct_wrk_phn_ext from dbo.contact_t where cntct_id = #{cntct_id}")
	public List<Contacts> findSingleContact(int cntct_id);

	@Select("Select ct.cntct_first_nm, ct.cntct_last_nm, m.mgmt_co_short_nm, cx.pref_cntct_meth_cd, cx.cntct_typ_cd, cx.cntct_cmnt_txt, " +
			" cx.cntct_id, cx.mgmt_co_id from dbo.contact_t ct, dbo.management_company_t m, dbo.cntct_mgmt_co_xref_t cx where ct.cntct_id = cx.cntct_id and m.mgmt_co_id = cx.mgmt_co_id")
	public List<ViewCntctMgmtCoXref> findAllContactMgmtCoXref();

	@Select("Select ct.cntct_first_nm, ct.cntct_last_nm, m.mgmt_co_short_nm, cx.cntct_grp_cd, " +
			" cx.cntct_id, cx.mgmt_co_id from dbo.contact_t ct, dbo.management_company_t m, dbo.cntct_mgmt_co_grp_xref_t cx where ct.cntct_id = cx.cntct_id and m.mgmt_co_id = cx.mgmt_co_id")
	public List<ViewCntctMgmtCoGrpXref> findAllContactMgmtCoGrpXref();

	@Select("Select mgmt_co_id, mgmt_co_short_nm, mgmt_co_long_nm from dbo.management_company_t")
	public List<MgmtCo> findAllMgmtCo();

	@Select("Select cntct_meth_cd, cntct_meth_dsc from dbo.contact_method_t")
	public List<CntctMethod> findAllCntctMethod();

	@Select("Select cntct_typ_cd, cntct_typ_dsc from dbo.contact_type_t")
	public List<CntctType> findAllCntctType();

	@Select("Select cntct_id, mgmt_co_id, pref_cntct_meth_cd, cntct_typ_cd, cntct_cmnt_txt from dbo.cntct_mgmt_co_xref_t " +
			"where cntct_id = #{cntct_id} and mgmt_co_id = #{mgmt_co_id}")
	public List<CntctMgmtCoXref> findSingleCntctMgmtcoXrfMethod(@Param("cntct_id") int cntct_id, @Param("mgmt_co_id") int mgmt_co_id);
	
	@Select("Select cntct_id, mgmt_co_id, cntct_grp_cd, lst_updt_userid, lst_updt_dtm from dbo.cntct_mgmt_co_grp_xref_t " +
			"where cntct_id = #{cntct_id} and mgmt_co_id = #{mgmt_co_id} and cntct_grp_cd = #{cntct_grp_cd}")
	public List<CntctMgmtCoGrpXref> findSingleCntctMgmtcoGrpXrf(@Param("cntct_id") int cntct_id,
																@Param("mgmt_co_id") int mgmt_co_id,
																@Param("cntct_grp_cd") String cntct_grp_cd);
	
	@Select("Select cntct_grp_cd, cntct_grp_dsc from dbo.contact_group_t")
	public List<CntctGrp> findAllCntctGrp();
	
	@Insert("Insert into dbo.contact_t (firm_id, cntct_first_nm, cntct_last_nm, cntct_title, cntct_wrk_phn, cntct_cell_phn," +
			" cntct_fax_num, cntct_address1, cntct_address2, cntct_city, cntct_state_cd, cntct_zip_cd, cntct_email, cntct_verified_dt, " +
			" lst_updt_userid, lst_updt_dtm, cntct_wrk_phn_ext) values(#{firm_id}, #{cntct_first_nm}, #{cntct_last_nm}, #{cntct_title}, #{cntct_wrk_phn}, " +
			" #{cntct_cell_phn}, #{cntct_fax_num}, #{cntct_address1}, #{cntct_address2}, #{cntct_city}, #{cntct_state_cd}, #{cntct_zip_cd}, " +
			" #{cntct_email}, #{cntct_verified_dt}, #{lst_updt_userid}, CURRENT_TIMESTAMP, #{cntct_wrk_phn_ext})")
	public void insertContacts(Contacts contacts);
	
	@Insert("Insert into dbo.cntct_mgmt_co_xref_t (cntct_id, mgmt_co_id, pref_cntct_meth_cd, cntct_typ_cd, cntct_cmnt_txt, " +
			" lst_updt_userid, lst_updt_dtm) values(#{cntct_id}, #{mgmt_co_id}, #{pref_cntct_meth_cd}, #{cntct_typ_cd}, #{cntct_cmnt_txt}, " +
			" #{lst_updt_userid}, CURRENT_TIMESTAMP)")
	public void insertContactMgmtCoXref(CntctMgmtCoXref cntctmgmtxref);
	
	@Insert("Insert into dbo.cntct_mgmt_co_grp_xref_t (cntct_id, mgmt_co_id, cntct_grp_cd, lst_updt_userid, lst_updt_dtm)" +
			" values(#{cntct_id}, #{mgmt_co_id}, #{cntct_grp_cd}, #{lst_updt_userid}, CURRENT_TIMESTAMP)")
	public void insertContactMgmtCoGrpXref(CntctMgmtCoGrpXref cntctmgmtgrpxref);
	
	@Delete("Delete from dbo.contact_t where cntct_id = #{cntct_id}")
	public void deleteCntcts(@Param("cntct_id") int cntct_id);
	
	@Delete("Delete from dbo.cntct_mgmt_co_xref_t where cntct_id = #{cntct_id} and mgmt_co_id = #{mgmt_co_id}")
	public void deleteCntctMgmtCoXrf(@Param("cntct_id") int cntct_id, @Param("mgmt_co_id") int mgmt_co_id);
	
	// if the Contact is deleted
	@Delete("Delete from dbo.cntct_mgmt_co_xref_t where cntct_id = #{cntct_id}")
	public void deleteCntctMgmtCoXrfByCntct(@Param("cntct_id") int cntct_id);
	
	// if the Company is deleted
	@Delete("Delete from dbo.cntct_mgmt_co_xref_t where mgmt_co_id = #{mgmt_co_id}")
	public void deleteCntctMgmtCoXrfByMc(@Param("mgmt_co_id") int mgmt_co_id);
	
	@Delete("Delete from dbo.cntct_mgmt_co_grp_xref_t where cntct_id = #{cntct_id} and mgmt_co_id = #{mgmt_co_id}")
	public void deleteCntctMgmtCoGrpXrf(@Param("cntct_id") int cntct_id, @Param("mgmt_co_id") int mgmt_co_id);
	
	@Delete("Delete from dbo.cntct_mgmt_co_grp_xref_t where cntct_id = #{cntct_id}")
	public void deleteCntctMgmtCoGrpXrfByCntct(@Param("cntct_id") int cntct_id);
	
	@Update("Update dbo.contact_t set firm_id = #{firm_id}, cntct_first_nm = #{cntct_first_nm}, cntct_last_nm = #{cntct_last_nm}, " +
			" cntct_title = #{cntct_title}, cntct_wrk_phn = #{cntct_wrk_phn}, cntct_cell_phn = #{cntct_cell_phn}, cntct_fax_num = #{cntct_fax_num}, " +
			" cntct_address1 = #{cntct_address1}, cntct_address2 = #{cntct_address2}, cntct_city = #{cntct_city}, cntct_wrk_phn_ext = #{cntct_wrk_phn_ext}," +
			" cntct_state_cd = #{cntct_state_cd}, cntct_zip_cd = #{cntct_zip_cd}, cntct_email = #{cntct_email}, cntct_verified_dt = #{cntct_verified_dt}, " +
			" lst_updt_userid = #{lst_updt_userid}, lst_updt_dtm = CURRENT_TIMESTAMP where cntct_id = #{cntct_id}")
	public void updateContacts(Contacts contacts);
	
	@Update("Update dbo.cntct_mgmt_co_xref_t set cntct_id = #{cntct_id}, mgmt_co_id = #{mgmt_co_id}, pref_cntct_meth_cd = #{pref_cntct_meth_cd}, " +
			" cntct_cmnt_txt = #{cntct_cmnt_txt}, lst_updt_userid = #{lst_updt_userid}, lst_updt_dtm = CURRENT_TIMESTAMP where cntct_id = #{cntct_id}")
	public void updateContactMgmtCoXref(CntctMgmtCoXref cntctmgmtxref);

	@Update("Update dbo.cntct_mgmt_co_grp_xref_t set cntct_grp_cd = #{cntct_grp_cd}, lst_updt_userid = #{lst_updt_userid}, lst_updt_dtm = CURRENT_TIMESTAMP " +
			" where cntct_id = #{cntct_id} and mgmt_co_id = #{mgmt_co_id} and cntct_grp_cd = #{cntct_grp_cd}")
	public void updateContactMgmtCoGrpXref(CntctMgmtCoGrpXref cntctmgmtgrpxref);
}
