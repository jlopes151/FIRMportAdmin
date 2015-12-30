package com.bfds.app.fia.mgr.model;

import java.util.Calendar;

public class Rep {

	private int rep_id;
	private int firm_id;
	private String rep_first_nm;
	private String rep_last_nm;
	private String rep_num;
	private String lst_updt_userid;
	private Calendar lst_updt_dtm;
	
	public Rep(){
		
	}

	/**
	 * @return the rep_id
	 */
	public int getRep_id() {
		return rep_id;
	}

	/**
	 * @param rep_id the rep_id to set
	 */
	public void setRep_id(int rep_id) {
		this.rep_id = rep_id;
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
	 * @return the rep_first_nm
	 */
	public String getRep_first_nm() {
		return rep_first_nm;
	}

	/**
	 * @param rep_first_nm the rep_first_nm to set
	 */
	public void setRep_first_nm(String rep_first_nm) {
		this.rep_first_nm = rep_first_nm;
	}

	/**
	 * @return the rep_last_nm
	 */
	public String getRep_last_nm() {
		return rep_last_nm;
	}

	/**
	 * @param rep_last_nm the rep_last_nm to set
	 */
	public void setRep_last_nm(String rep_last_nm) {
		this.rep_last_nm = rep_last_nm;
	}

	/**
	 * @return the rep_num
	 */
	public String getRep_num() {
		return rep_num;
	}

	/**
	 * @param rep_num the rep_num to set
	 */
	public void setRep_num(String rep_num) {
		this.rep_num = rep_num;
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
	public Calendar getLst_updt_dtm() {
		return lst_updt_dtm;
	}

	/**
	 * @param lst_updt_dtm the lst_updt_dtm to set
	 */
	public void setLst_updt_dtm(Calendar lst_updt_dtm) {
		this.lst_updt_dtm = lst_updt_dtm;
	}
}
