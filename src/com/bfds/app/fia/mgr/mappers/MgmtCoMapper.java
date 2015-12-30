/**
 * 
 */
package com.bfds.app.fia.mgr.mappers;

import org.apache.ibatis.annotations.*;

import com.bfds.app.fia.mgr.model.MgmtCo;

import java.util.List;

/**
 * @author jlopes
 *
 */
public interface MgmtCoMapper {
	
	@Select("Select mgmt_co_id, ta2000_co_cd, ta2000_sys_cd, mgmt_co_long_nm, mgmt_co_short_nm, " +
			"relationship_mgr_nm, lst_updt_userid, lst_updt_dtm, fund_sponsor_cd" +
			" from dbo.management_company_t where ta2000_sys_cd like #{system} and ta2000_co_cd like #{company}")
	public List<MgmtCo> findAllMgmtCo(@Param("system") String system, @Param("company") String company);

	@Select("Select mgmt_co_id, ta2000_co_cd, ta2000_sys_cd, mgmt_co_long_nm, mgmt_co_short_nm, " +
			"relationship_mgr_nm, lst_updt_userid, lst_updt_dtm, fund_sponsor_cd" +
			" from dbo.management_company_t where ta2000_sys_cd = #{system} and ta2000_co_cd = #{company}")
	public List<MgmtCo> findSingleMgmtCo(@Param("system") String system, @Param("company") String company);

	@Select("Select mgmt_co_id, ta2000_co_cd, ta2000_sys_cd, mgmt_co_long_nm, mgmt_co_short_nm, " +
			"relationship_mgr_nm, lst_updt_userid, lst_updt_dtm, fund_sponsor_cd" +
			" from dbo.management_company_t where mgmt_co_id = #{mgmt_co_id}")
	public List<MgmtCo> findSingleMgmtCoById(@Param("mgmt_co_id") int mgmt_co_id);

	@Insert("Insert into dbo.management_company_t (ta2000_co_cd, ta2000_sys_cd, mgmt_co_long_nm, mgmt_co_short_nm, " +
			"relationship_mgr_nm, lst_updt_userid, lst_updt_dtm, fund_sponsor_cd) " +
		    "values(#{ta2000_co_cd}, #{ta2000_sys_cd}, #{mgmt_co_long_nm}, #{mgmt_co_short_nm}, #{relationship_mgr_nm}, " +
		    "#{lst_updt_userid}, CURRENT_TIMESTAMP, #{fund_sponsor_cd})")
	void insertMgmtCo(MgmtCo mgmtco);
	
	@Delete("Delete from dbo.management_company_t where ta2000_sys_cd = #{system} and ta2000_co_cd = #{company}")
	void deleteMgmtCo(@Param("system")String system, @Param("company")String company);

	@Update("Update dbo.management_company_t set ta2000_co_cd = #{ta2000_co_cd}, ta2000_sys_cd = #{ta2000_sys_cd}, " +
			"mgmt_co_long_nm = #{mgmt_co_long_nm}, mgmt_co_short_nm = #{mgmt_co_short_nm}, relationship_mgr_nm = #{relationship_mgr_nm}," +
			" lst_updt_userid = #{lst_updt_userid}, lst_updt_dtm = CURRENT_TIMESTAMP, fund_sponsor_cd = #{fund_sponsor_cd} " +
			"where mgmt_co_id = #{mgmt_co_id}")
	void updateMgmtCo(MgmtCo mgmtco);

}
