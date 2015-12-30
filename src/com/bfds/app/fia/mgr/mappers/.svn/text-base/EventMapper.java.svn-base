package com.bfds.app.fia.mgr.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.bfds.app.fia.mgr.model.Event;
import com.bfds.app.fia.mgr.model.EventTypes;
import com.bfds.app.fia.mgr.model.Firm;

/**
 * @author jlopes
 *
 */
public interface EventMapper {
	
	@Select("Select fe.firm_event_id, fe.firm_id, f.short_nm, fe.event_typ_cd, fe.event_dt, fe.event_dsc, fe.lst_updt_userid, fe.lst_updt_dtm, fe.event_title, fe.mgmt_co_cds " +
			"from dbo.firm_event_t fe, dbo.firm_t f where fe.firm_id = f.firm_id")
	public List<Event> findAllEvent(String event_dt);

	@Select("Select firm_event_id, event_typ_cd, event_dt, event_dsc, lst_updt_userid, lst_updt_dtm, event_title, mgmt_co_cds " +
			"from dbo.firm_event_t where firm_event_id = #{firm_event_id}")
	public List<Event> findAnEvent(int firm_event_id);

	@Select("Select event_typ_cd, event_typ_dsc, lst_updt_userid, lst_updt_dtm from event_type_t")
	public List<EventTypes> getEventTypes();

	@Insert("Insert into dbo.firm_event_t (firm_id, event_typ_cd, event_dt, event_dsc, lst_updt_userid, lst_updt_dtm, event_title, mgmt_co_cds) " +
			"values(#{firm_id}, #{event_typ_cd}, #{event_dt}, #{event_dsc}, #{lst_updt_userid}, CURRENT_TIMESTAMP, #{event_title}, #{mgmt_co_cds})")
	public void insertEvent(Event event);
	
	@Delete("Delete from dbo.firm_event_t where firm_event_id = #{firm_event_id}")
	public void deleteEvent(int firm_event_id);
	
	@Update("Update dbo.firm_event_t set event_typ_cd = #{event_typ_cd}, event_dt = #{event_dt}, event_dsc = #{event_dsc}, " +
			"event_title = #{event_title}, lst_updt_userid = #{lst_updt_userid}, lst_updt_dtm = CURRENT_TIMESTAMP, mgmt_co_cds = #{mgmt_co_cds}" +
			" where firm_event_id = #{firm_event_id}")
	public void updateEvent(Event event);
	
}
