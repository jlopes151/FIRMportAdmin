/**
 * 
 */
package com.bfds.app.fia.mgr.mappers;

import java.util.Calendar;
import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.bfds.app.fia.mgr.model.Firm;
import com.bfds.app.fia.mgr.model.FirmAndMgmtCo;
import com.bfds.app.fia.mgr.model.MgmtCo;

/**
 * @author jlopes
 *
 */
public interface FirmAndMgmtCoMapper {

	@Select("Select f.short_nm as system, mc.mgmt_co_short_nm as company, fm.firm_mgmt_co_id, fm.firm_id, fm.mgmt_co_id, fm.[group], fm.ta2000_dealr_num, fm.active_ind, fm.active_dt, fm.inactive_dt," +
			" fm.vision_ind, fm.fan_mail_ind, fm.omnibus_conversion_dt, fm.omniserv_ind, fm.asof_trad_window, fm.omnibus_trad_proc_cd, " +
			" fm.batch_typ_cd, fm.settlement_typ_cd, fm.post_settlement_chng_ind, fm.ptf_acat_trnsfr_ind, fm.dst_vho_ind, fm.lst_updt_userid," +
			" fm.lst_updt_dtm from dbo.firm_mgmt_co_t fm, dbo.firm_t f, dbo.management_company_t mc " +
			" where fm.firm_id = f.firm_id and fm.mgmt_co_id = mc.mgmt_co_id and " +
			" f.short_nm like #{shortname} and mc.ta2000_co_cd like #{company} and mc.ta2000_sys_cd like #{system}")
	public List<FirmAndMgmtCo> findAllFirmAndMgmtCo(@Param("shortname") String shortname,
													@Param("system") String system,										
													@Param("company") String company);

	@Select("Select m.mgmt_co_long_nm, f.long_nm, fm.firm_mgmt_co_id, fm.firm_id, fm.mgmt_co_id, fm.[group], fm.ta2000_dealr_num, " +
			"fm.active_ind, fm.active_dt, fm.inactive_dt, fm.vision_ind, fm.fan_mail_ind, fm.omnibus_conversion_dt, fm.omniserv_ind, " +
			"fm.asof_trad_window, fm.omnibus_trad_proc_cd, fm.batch_typ_cd, fm.settlement_typ_cd, fm.post_settlement_chng_ind, " +
			"fm.ptf_acat_trnsfr_ind, fm.dst_vho_ind, fm.lst_updt_userid, fm.lst_updt_dtm from dbo.firm_mgmt_co_t fm, " +
			"dbo.management_company_t m, dbo.firm_t f where fm.firm_id = #{firm_id} and fm.mgmt_co_id = #{mgmt_co_id} and " +
			"f.firm_id = fm.firm_id and m.mgmt_co_id = fm.mgmt_co_id")
	public List<FirmAndMgmtCo> findSingleFirmAndMgmtCo(@Param("firm_id") int firm_id, @Param("mgmt_co_id") int mgmt_co_id);

	@Select("Select * from dbo.firm_mgmt_co_t where firm_mgmt_co_id = #{firm_mgmt_co_id}")
	public List<FirmAndMgmtCo> findSingleFirmAndMgmtCoById(int firm_mgmt_co_id);
	
	@Select("Select mgmt_co_id from dbo.management_company_t where ta2000_sys_cd like #{system}" +
			" and ta2000_co_cd like #{company}")
	public List<MgmtCo> findSingleMgmtCo(@Param("system") String system, @Param("company") String company);

	@Select("Select firm_id from dbo.firm_t where short_nm like #{str}")
	public List<Firm> findSingleFirm(String str);

	@Insert("Insert into dbo.firm_mgmt_co_t (firm_id, mgmt_co_id, [group], ta2000_dealr_num, active_ind, " +
			" active_dt, inactive_dt, vision_ind, fan_mail_ind,omnibus_conversion_dt, omniserv_ind, asof_trad_window, " +
			" omnibus_trad_proc_cd, batch_typ_cd, settlement_typ_cd, post_settlement_chng_ind, ptf_acat_trnsfr_ind, dst_vho_ind," +
			" lst_updt_userid, lst_updt_dtm) values(#{firm_id}, #{mgmt_co_id}, #{group}, #{ta2000_dealr_num}, #{active_ind}, " +
			" #{active_dt}, #{inactive_dt}, #{vision_ind}, #{fan_mail_ind}, #{omnibus_conversion_dt}, #{omniserv_ind}, #{asof_trad_window}, " +
			" #{omnibus_trad_proc_cd}, #{batch_typ_cd}, #{settlement_typ_cd}, #{post_settlement_chng_ind}, #{ptf_acat_trnsfr_ind}, #{dst_vho_ind}, " +
			" #{lst_updt_userid}, CURRENT_TIMESTAMP)")
	public void insertFirmAndMgmtCo(FirmAndMgmtCo firmamdmgmtco);
	
	@Delete("Delete from dbo.firm_mgmt_co_t where firm_id = #{firm_id} and mgmt_co_id = #{mgmt_co_id}")
	public void deleteFirmAndMgmtCo(@Param("firm_id")int firm_id, @Param("mgmt_co_id") int mgmt_co_id);
	
	@Update("Update dbo.firm_mgmt_co_t set firm_id = #{firm_id}, mgmt_co_id = #{mgmt_co_id}, [group] = #{group}, " +
			" ta2000_dealr_num = #{ta2000_dealr_num}, active_ind = #{active_ind}, active_dt = #{active_dt}, " +
			" inactive_dt = #{inactive_dt}, vision_ind = #{vision_ind}, fan_mail_ind = #{fan_mail_ind}, omnibus_conversion_dt = #{omnibus_conversion_dt}," +
			" omniserv_ind = #{omniserv_ind}, asof_trad_window = #{asof_trad_window}, omnibus_trad_proc_cd = #{omnibus_trad_proc_cd}," +
			" batch_typ_cd = #{batch_typ_cd}, settlement_typ_cd = #{settlement_typ_cd}, post_settlement_chng_ind = #{post_settlement_chng_ind}, " +
			" ptf_acat_trnsfr_ind = #{ptf_acat_trnsfr_ind}, dst_vho_ind = #{dst_vho_ind}, lst_updt_userid = #{lst_updt_userid}, lst_updt_dtm = CURRENT_TIMESTAMP" +
			" where firm_mgmt_co_id = #{firm_mgmt_co_id} ")
	public void updateFirmAndMgmtCo(FirmAndMgmtCo firmandmgmtco);
}
