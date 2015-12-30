package com.bfds.app.fia.mgr.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.bfds.app.fia.mgr.model.Branch;

/**
 * @author jlopes
 *
 */
public interface BranchMapper {
	
	@Select("Select b.branch_id, f.short_nm, b.firm_id, b.branch_cd, b.branch_address1, b.branch_address2, b.branch_city, " +
			"b.branch_state_cd, b.branch_zip_cd, b.lst_updt_userid, b.lst_updt_dtm " +
			"from dbo.branch_t b, dbo.firm_t f where b.firm_id = f.firm_id")
	public List<Branch> findAllBranch();

	// using this select for the edit and delete
	@Select("Select branch_id, firm_id, branch_cd, branch_address1, branch_address2, branch_city, branch_state_cd, branch_zip_cd," +
			" lst_updt_userid, lst_updt_dtm from dbo.branch_t where firm_id = #{firm_id} and branch_id = #{branch_id}")
	public List<Branch> findSingleBranch(@Param("firm_id")int firm_id, @Param("branch_id")int branch_id);

	@Insert("Insert into dbo.branch_t (firm_id, branch_cd, branch_address1, branch_address2, branch_city, branch_state_cd, branch_zip_cd," +
			" lst_updt_userid, lst_updt_dtm) values(#{firm_id}, #{branch_cd}, #{branch_address1}, #{branch_address2}, #{branch_city}, #{branch_state_cd}, #{branch_zip_cd}," +
			" #{lst_updt_userid}, CURRENT_TIMESTAMP)")
	public void insertBranch(Branch branch);
	
	@Delete("Delete from dbo.branch_t where branch_id = #{branch_id} and firm_id = #{firm_id}")
	public void deleteBranch(Branch branch);
	
	@Update("Update dbo.branch_t set branch_address1 = #{branch_address1}, branch_address2 = #{branch_address2}, branch_city = #{branch_city}, " +
			"branch_state_cd = #{branch_state_cd}, branch_zip_cd = #{branch_zip_cd}, lst_updt_userid = #{lst_updt_userid}, " +
			"lst_updt_dtm = CURRENT_TIMESTAMP where branch_id = #{branch_id} and firm_id = #{firm_id}")
	public void updateBranch(Branch branch);
	
}
