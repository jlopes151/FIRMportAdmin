package com.bfds.app.fia.mgr.model;

import java.util.Calendar;

public class Branch {

	private int branch_id;
	private int firm_id;
	private String branch_cd;
	private String branch_address1;
	private String branch_address2;
	private String branch_city;
	private String branch_state_cd;
	private String branch_zip_cd;
	private String lst_updt_userid;
	private String lst_updt_dtm;
	/*
	 *  the firm (system) short_nm trying not to create another object just 
	 *  for one member, the short_nm is not in the branch table the firm_id is.
	 *  I'm adding it here to display the firm short name in the view list
	 *  
	 */
	private String short_nm; 
	
	/**
	 * @return the branchid
	 */
	public int getBranch_id() {
		return branch_id;
	}
	/**
	 * @param branchid the branchid to set
	 */
	public void setBranch_id(int branch_id) {
		this.branch_id = branch_id;
	}
	/**
	 * @return the firm_id
	 */
	public int getFirm_id() {
		return firm_id;
	}
	/**
	 * @param firm_id the firm_id to set
	 */
	public void setFirm_id(int firm_id) {
		this.firm_id = firm_id;
	}
	/**
	 * @return the branch_cd
	 */
	public String getBranch_cd() {
		return branch_cd;
	}
	/**
	 * @param branch_cd the branch_cd to set
	 */
	public void setBranch_cd(String branch_cd) {
		this.branch_cd = branch_cd;
	}
	/**
	 * @return the branch_address1
	 */
	public String getBranch_address1() {
		return branch_address1;
	}
	/**
	 * @param branch_address1 the branch_address1 to set
	 */
	public void setBranch_address1(String branch_address1) {
		this.branch_address1 = branch_address1;
	}
	/**
	 * @return the branch_address2
	 */
	public String getBranch_address2() {
		return branch_address2;
	}
	/**
	 * @param branch_address2 the branch_address2 to set
	 */
	public void setBranch_address2(String branch_address2) {
		this.branch_address2 = branch_address2;
	}
	/**
	 * @return the branch_city
	 */
	public String getBranch_city() {
		return branch_city;
	}
	/**
	 * @param branch_city the branch_city to set
	 */
	public void setBranch_city(String branch_city) {
		this.branch_city = branch_city;
	}
	/**
	 * @return the branch_state_cd
	 */
	public String getBranch_state_cd() {
		return branch_state_cd;
	}
	/**
	 * @param branch_state_cd the branch_state_cd to set
	 */
	public void setBranch_state_cd(String branch_state_cd) {
		this.branch_state_cd = branch_state_cd;
	}
	/**
	 * @return the branch_zip_cd
	 */
	public String getBranch_zip_cd() {
		return branch_zip_cd;
	}
	/**
	 * @param branch_zip_cd the branch_zip_cd to set
	 */
	public void setBranch_zip_cd(String branch_zip_cd) {
		this.branch_zip_cd = branch_zip_cd;
	}
	/**
	 * @return the lst_updt_userid
	 */
	public String getLst_updt_userid() {
		return lst_updt_userid;
	}
	/**
	 * @param lst_updt_userid the lst_updt_userid to set
	 */
	public void setLst_updt_userid(String lst_updt_userid) {
		this.lst_updt_userid = lst_updt_userid;
	}
	/**
	 * @return the lst_updt_dtm
	 */
	public String getLst_updt_dtm() {
		return lst_updt_dtm;
	}
	/**
	 * @param lst_updt_dtm the lst_updt_dtm to set
	 */
	public void setLst_updt_dtm(String lst_updt_dtm) {
		this.lst_updt_dtm = lst_updt_dtm;
	}
	/**
	 * @return the short_nm
	 */
	public String getShort_nm() {
		return short_nm;
	}
	/**
	 * @param short_nm the short_nm to set
	 */
	public void setShort_nm(String short_nm) {
		this.short_nm = short_nm;
	}
	
}
