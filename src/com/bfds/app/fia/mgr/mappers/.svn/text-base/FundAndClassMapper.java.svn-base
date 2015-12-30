package com.bfds.app.fia.mgr.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.bfds.app.fia.mgr.model.FundAndClass;

/**
 * @author jlopes
 *
 */
public interface FundAndClassMapper {
	
	@Select("Select")
	public List<FundAndClass> findAllFundAndClass();

	@Insert("Insert")
	public void insertFundAndClass(FundAndClass fundandclass);
	
	@Delete("Delete")
	public void deleteFundAndClass(FundAndClass fundandclass);
	
	@Update("Update")
	public void updateFundAndClass(FundAndClass fundandclass);
	
}
