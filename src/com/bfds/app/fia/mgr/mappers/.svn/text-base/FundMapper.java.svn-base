package com.bfds.app.fia.mgr.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.bfds.app.fia.mgr.model.Fund;
import com.bfds.app.fia.mgr.model.MgmtCo;

/**
 * @author jlopes
 *
 */
public interface FundMapper {
	
	@Select("Select f.fund_id, m.mgmt_co_short_nm, m.ta2000_co_cd, m.ta2000_sys_cd, f.mgmt_co_id, f.fund_lgl_nm, f.fund_tax_id, f.lst_updt_userid, " +
			"f.lst_updt_dtm from dbo.fund_t f, dbo.management_company_t m where fund_lgl_nm like #{fund_lgl_nm} and " +
			"f.mgmt_co_id = m.mgmt_co_id")
	public List<Fund> findAllFund(String fund_lgl_nm);

	@Select("Select f.fund_id, m.mgmt_co_short_nm, m.ta2000_co_cd, m.ta2000_sys_cd, f.mgmt_co_id, f.fund_lgl_nm, f.fund_tax_id, f.lst_updt_userid, " +
			"f.lst_updt_dtm from dbo.fund_t f, dbo.management_company_t m where fund_id = #{fund_id} and " +
			"f.mgmt_co_id = m.mgmt_co_id")
	public List<Fund> findSingleFund(int fund_id);

	@Select("Select mgmt_co_id, ta2000_co_cd, ta2000_sys_cd, mgmt_co_long_nm, mgmt_co_short_nm, " +
			"relationship_mgr_nm, lst_updt_userid, lst_updt_dtm, fund_sponsor_cd" +
			" from dbo.management_company_t where ta2000_sys_cd like #{system} and ta2000_co_cd like #{company}")
	public List<MgmtCo> doCoSrch(@Param("system")String system, @Param("company")String company);

	@Insert("Insert into dbo.fund_t (mgmt_co_id, fund_lgl_nm, fund_tax_id, lst_updt_userid, lst_updt_dtm) " +
			"values (#{mgmt_co_id}, #{fund_lgl_nm}, #{fund_tax_id}, #{lst_updt_userid}, CURRENT_TIMESTAMP)")
	public void insertFund(Fund fund);
	
	@Delete("Delete from dbo.fund_t where fund_id = #{fund_id}")
	public void deleteFund(String fund_id);
	
	@Update("Update")
	public void updateFund(Fund fund);
	
}
