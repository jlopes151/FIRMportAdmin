package com.bfds.app.fia.mgr.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.bfds.app.fia.mgr.model.FrmFndAndClsAgre;

/**
 * @author jlopes
 *
 */
public interface FrmFndAndClsAgreMapper {
	
	@Select("Select")
	public List<FrmFndAndClsAgre> findAllFrmFndAndClsAgre();

	@Insert("Insert")
	public void insertFrmFndAndClsAgre(FrmFndAndClsAgre frmfndandclsagre);
	
	@Delete("Delete")
	public void deleteFrmFndAndClsAgre(FrmFndAndClsAgre frmfndandclsagre);
	
	@Update("Update")
	public void updateFrmFndAndClsAgre(FrmFndAndClsAgre frmfndandclsagre);
	
}
