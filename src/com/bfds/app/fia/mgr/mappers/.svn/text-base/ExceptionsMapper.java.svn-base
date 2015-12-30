package com.bfds.app.fia.mgr.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.bfds.app.fia.mgr.model.MExceptions;

/**
 * @author jlopes
 *
 */
public interface ExceptionsMapper {
	
	@Select("Select me.field_cd, me.firm_mgmt_co_id, me.excep_dsc, m.mgmt_co_short_nm, f.short_nm, me.lst_updt_userid, me.lst_updt_dtm " +
			"from dbo.exception_t me, dbo.firm_mgmt_co_t fm, management_company_t m, firm_t f " +
			"where me.firm_mgmt_co_id = fm.firm_mgmt_co_id and f.firm_id = fm.firm_id and fm.mgmt_co_id = m.mgmt_co_id")
	public List<MExceptions> findAllExceptions();

	@Select("Select field_cd, firm_mgmt_co_id, excep_dsc, lst_updt_userid, lst_updt_dtm from dbo.exception_t " +
			"where firm_mgmt_co_id = #{firm_mgmt_co_id} and field_cd = #{field_cd}")
	public List<MExceptions> findSingleException(@Param("field_cd") String field_cd, @Param("firm_mgmt_co_id") int firm_mgmt_co_id);
	
	@Insert("Insert into dbo.exception_t (field_cd, firm_mgmt_co_id, excep_dsc, lst_updt_userid, lst_updt_dtm) " +
			"values(#{field_cd}, #{firm_mgmt_co_id}, #{excep_dsc}, #{lst_updt_userid}, CURRENT_TIMESTAMP")
	public void insertExceptions(MExceptions mexceptions);
	
	@Delete("Delete")
	public void deleteExceptions(MExceptions mexceptions);
	
	@Update("Update dbo.exception_t set excep_dsc = #{excep_dsc}, lst_updt_userid = #{lst_updt_userid}, lst_updt_dtm = CURRENT_TIMESTAMP " +
			"where field_cd = #{field_cd} and firm_mgmt_co_id = #{firm_mgmt_co_id}")
	public void updateExceptions(MExceptions mexceptions);
	
}
