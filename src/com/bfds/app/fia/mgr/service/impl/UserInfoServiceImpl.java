package com.bfds.app.fia.mgr.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.bfds.app.fia.mgr.mappers.UserInfoMapper;
import com.bfds.app.fia.mgr.model.UserInfo;
import com.bfds.app.fia.mgr.service.UserInfoService;

@Scope("prototype")
@Service
public class UserInfoServiceImpl implements UserInfoService {

	private UserInfoMapper userinfomapper;
	
	@Autowired
	public UserInfoServiceImpl(UserInfoMapper userinfomapper){
		this.userinfomapper = userinfomapper;
	}
	
	@Override
	public List<UserInfo> doFindSingleUserInfo(String user_id) {
		return this.userinfomapper.findUser(user_id);
	}

}
