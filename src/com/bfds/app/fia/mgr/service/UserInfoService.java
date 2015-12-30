package com.bfds.app.fia.mgr.service;

import java.util.List;

import com.bfds.app.fia.mgr.model.UserInfo;

public interface UserInfoService {

	public List<UserInfo> doFindSingleUserInfo(String user_id);
	
}
