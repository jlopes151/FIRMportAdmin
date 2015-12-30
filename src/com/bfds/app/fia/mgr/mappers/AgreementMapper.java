package com.bfds.app.fia.mgr.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.bfds.app.fia.mgr.model.Agreement;

/**
 * @author jlopes
 *
 */
public interface AgreementMapper {
	
	@Select("Select agre_id, firm_mgmt_co_id, agre_typ_cd, agre_eff_dt, agre_term, agre_parties, agre_state_cd," +
			" fee_agre, lst_updt_userid, lst_updt_dtm from dbo.agreement_t")
	public List<Agreement> findAllAgreement();

	@Select("Select agre_id, firm_mgmt_co_id, agre_typ_cd, agre_eff_dt, agre_term, agre_parties, agre_state_cd," +
			" fee_agre, lst_updt_userid, lst_updt_dtm from dbo.agreement_t")
	public List<Agreement> findSingleAgreement(@Param("agre_id")int agre_id, @Param("firm_mgmt_co_id")int firm_mgmt_co_id);

	@Insert("Insert into dbo.agreement_t (firm_mgmt_co_id, agre_typ_cd, agre_eff_dt, agre_term, agre_parties, agre_state_cd," +
			" fee_agre, lst_updt_userid, lst_updt_dtm) values(#{firm_mgmt_co_id}, #{agre_typ_cd}, #{agre_eff_dt}, #{agre_term}, " +
			" #{agre_parties}, #{agre_state_cd}, #{fee_agre}, #{lst_updt_userid}, CURRENT_TIMESTAMP)")
	public void insertAgreement(Agreement agreement);
	
	@Delete("Delete from dbo.agreement_t where agre_id = #{agre_id} and firm_mgmt_co_id = #{firm_mgmt_co_id}")
	public void deleteAgreement(Agreement agreement);
	
	@Update("Update dbo.agreement_t set firm_mgmt_co_id = #{firm_mgmt_co_id}, agre_typ_cd = #{agre_typ_cd}, agre_eff_dt = #{agre_eff_dt}, " +
			"agre_term = #{agre_term}, agre_parties = #{agre_parties}, agre_state_cd = #{agre_state_cd}, fee_agre = #{fee_agre}, " +
			"lst_updt_userid = #{lst_updt_userid}, lst_updt_dtm = CURRENT_TIMESTAMP where agre_id = #{agre_id} and firm_mgmt_co_id = #{firm_mgmt_co_id}")
	public void updateAgreement(Agreement agreement);
	
}
