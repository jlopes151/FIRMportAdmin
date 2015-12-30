package com.bfds.app.fia.mgr.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.bfds.app.fia.mgr.model.Alert;
import com.bfds.app.fia.mgr.model.AlertMgmtCoXref;
import com.bfds.app.fia.mgr.model.AlertTypes;
import com.bfds.app.fia.mgr.model.EventTypes;
import com.bfds.app.fia.mgr.model.Firm;
import com.bfds.app.fia.mgr.model.MgmtCo;
//import com.microsoft.sqlserver.jdbc.SQLServerException;

/**
 * @author jlopes
 *
 */
public interface AlertMapper {
	
	@Select("Select alert_id, firm_id, alert_title, alert_typ_cd, alert_dt, alert_dsc, lst_updt_userid, lst_updt_dtm from dbo.alert_t")
	public List<Alert> findAllAlert();

	@Select("Select alert_id, firm_id, alert_title, alert_typ_cd, alert_dt, alert_dsc, lst_updt_userid, lst_updt_dtm from dbo.alert_t where alert_id = #{alert_id}")
	public List<Alert> findSingleAlert(int alert_id);

	@Select("Select alert_id, firm_id, alert_title, alert_typ_cd, alert_dt, alert_dsc, lst_updt_userid, lst_updt_dtm from dbo.alert_t where alert_title = #{alert_title}")
	public List<Alert> findAlertByTitle(String alert_title);

	@Select("Select alert_typ_cd, alert_typ_dsc, lst_updt_userid, lst_updt_dtm from alert_type_t")
	public List<AlertTypes> getAlertTypes();

	@Select("Select firm_id, short_nm from dbo.firm_t where short_nm = #{str}")
	public List<Firm> findSingleFirm(String str);

	@Select("Select mgmt_co_id, mgmt_co_short_nm from dbo.management_company_t where mgmt_co_short_nm = #{str}")
	public List<MgmtCo> findSingleMgmtCo(String str);

	@Select("Select alert_id, mgmt_co_id from dbo.alert_mgmt_co_xref_t where alert_id = #{alert_id}")
	public List<AlertMgmtCoXref> findAllAlertMgmtCoIds(int alert_id);

	/*
	 * When the Alert is created I want the new id to be stored so that
	 * I can use the id with having to recall the record look at the controller
	 * for more help. This is the only insert that makes use of the @Option for
	 * now.
	 */
	@Insert("Insert into dbo.alert_t (firm_id, alert_title, alert_typ_cd, alert_dt, alert_dsc, lst_updt_userid, lst_updt_dtm) " +
			"values(#{firm_id}, #{alert_title}, #{alert_typ_cd}, CURRENT_TIMESTAMP, #{alert_dsc}, #{lst_updt_userid}, CURRENT_TIMESTAMP)")
	@Options(useGeneratedKeys = true, keyProperty="alert_id") 
	public void insertAlert(Alert alert);
	
	@Insert("Insert into dbo.alert_mgmt_co_xref_t (alert_id, mgmt_co_id, lst_updt_userid, lst_updt_dtm) " +
			"values(#{alert_id}, #{mgmt_co_id}, #{lst_updt_userid}, CURRENT_TIMESTAMP)")
	public void insertAlertMgmtCoXref(@Param("alert_id")int alert_id, 
							    	  @Param("mgmt_co_id")int mgmt_co_id, 
							    	  @Param("lst_updt_userid")String lst_updt_userid);
	
	@Delete("Delete from dbo.alert_t where alert_id = #{alert_id}")
	public void deleteAlert(@Param("alert_id")int alert_id);
	
	@Delete("Delete from dbo.alert_mgmt_co_xref_t where alert_id = #{alert_id}")
	public void deleteAlertMgmtCoXrefByAlertId(@Param("alert_id")int alert_id);
	
	@Delete("Delete from dbo.alert_mgmt_co_xref_t where mgmt_co_id = #{mgmt_co_id}")
	public void deleteAlertMgmtCoXrefByMgmtCoId(@Param("mgmt_co_id")int mgmt_co_id);
	
	@Delete("Delete from dbo.alert_mgmt_co_xref_t where alert_id = #{alert_id} and mgmt_co_id = #{mgmt_co_id}")
	public void deleteAlertMgmtCoXrefByAlertIdAndMcId(@Param("alert_id")int alert_id, @Param("mgmt_co_id")int mgmt_co_id);
	
	@Update("Update dbo.alert_t set alert_title = #{alert_title}, alert_typ_cd = #{alert_typ_cd}, " +
			"alert_dt = #{alert_dt}, alert_dsc = #{alert_dsc}, lst_updt_userid = #{lst_updt_userid}, " +
			"lst_updt_dtm = CURRENT_TIMESTAMP where alert_id = #{alert_id}")
	public void updateAlert(Alert alert);
	
}
