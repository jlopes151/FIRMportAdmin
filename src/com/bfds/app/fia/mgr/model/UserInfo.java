package com.bfds.app.fia.mgr.model;

import java.util.Set;

public class UserInfo {

	private int userInfo_id;
	private Set<UserGroups> usergroups;
	
	public int getUserInfo_id() {
		return userInfo_id;
	}

	public void setUserInfo_id(int userInfo_id) {
		this.userInfo_id = userInfo_id;
	}
	
	public Set<UserGroups> groups(){
		return usergroups;
	}
	
	public void addUserGroups(UserGroups usergroup){
		this.usergroups.add(usergroup);
	}
	
}
