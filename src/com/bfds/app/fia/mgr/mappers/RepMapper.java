package com.bfds.app.fia.mgr.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.bfds.app.fia.mgr.model.Rep;

/**
 * @author jlopes
 *
 */
public interface RepMapper {
	
	@Select("Select rep_id, firm_id, rep_first_nm, rep_last_nm, rep_num, lst_updt_userid, lst_updt_dtm from dbo.rep_t")
	public List<Rep> findAllRep();

	@Insert("Insert")
	public void insertRep(Rep rep);
	
	@Delete("Delete")
	public void deleteRep(Rep rep);
	
	@Update("Update")
	public void updateRep(Rep rep);
	
}
