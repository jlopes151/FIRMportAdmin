package com.bfds.app.fia.mgr.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Select;

import com.bfds.app.fia.mgr.model.UserInfo;

public interface UserInfoMapper {

	@Select("Select user_id from dbo.user_t where user_id = #{user_id}")
	public List<UserInfo> findUser(String user_id);

}
