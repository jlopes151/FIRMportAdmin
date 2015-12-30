package com.bfds.app.fia.mgr.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.bfds.app.fia.mgr.model.Transmission;

/**
 * @author jlopes
 *
 */
public interface TransmissionMapper {
	
	@Select("Select tr.trans_id, m.mgmt_co_short_nm, f.short_nm, tr.firm_mgmt_co_id, tr.trans_file_typ_cd, tr.pos_file_sched_cd, tr.lst_updt_userid, tr.lst_updt_dtm " +
			"from dbo.transmission_t tr, management_company_t m, firm_t f, firm_mgmt_co_t fm " +
			"where fm.firm_mgmt_co_id = tr.firm_mgmt_co_id and f.firm_id = fm.firm_id and m.mgmt_co_id = fm.mgmt_co_id")
	public List<Transmission> findAllTransmission();

	@Select("Select trans_id, firm_mgmt_co_id, trans_file_typ_cd, pos_file_sched_cd, lst_updt_userid, lst_updt_dtm " +
			"from dbo.transmission_t " +
			"where firm_mgmt_co_id = #{firm_mgmt_co_id} and trans_id = #{trans_id}")
	public List<Transmission> findSingleTransmission(@Param("trans_id")int trans_id,
													 @Param("firm_mgmt_co_id")int firm_mgmt_co_id);

	@Insert("Insert into dbo.transmission_t (firm_mgmt_co_id, trans_file_typ_cd, pos_file_sched_cd, lst_updt_userid, lst_updt_dtm) " +
			"values(#{firm_mgmt_co_id}, #{trans_file_typ_cd}, #{pos_file_sched_cd}, #{lst_updt_userid}, CURRENT_TIMESTAMP)")
	public void insertTransmission(Transmission transmission);
	
	@Delete("Delete from dbo.transmission_t where trans_id = #{trans_id} and firm_mgmt_co_id = #{firm_mgmt_co_id}")
	public void deleteTransmission(Transmission transmission);
	
	@Update("Update dbo.transmission_t set firm_mgmt_co_id = #{firm_mgmt_co_id}, trans_file_typ_cd = #{trans_file_typ_cd}, " +
			"pos_file_sched_cd = #{pos_file_sched_cd}, lst_updt_userid = #{lst_updt_userid}, lst_updt_dtm = CURRENT_TIMESTAMP")
	public void updateTransmission(Transmission transmission);
	
}
