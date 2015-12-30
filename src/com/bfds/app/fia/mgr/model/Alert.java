package com.bfds.app.fia.mgr.model;

import java.util.Calendar;

public class Alert {

	private int alert_id;
	private int firm_id;
	private String alert_title;
	private String alert_typ_cd;
	private String alert_dt;
	private String alert_dsc;
	private String lst_updt_userid;
	/**
	 * @return the alert_id
	 */
	public int getAlert_id() {
		return alert_id;
	}
	/**
	 * @param alert_id the alert_id to set
	 */
	public void setAlert_id(int alert_id) {
		this.alert_id = alert_id;
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
	 * @return the alert_title
	 */
	public String getAlert_title() {
		return alert_title;
	}
	/**
	 * @param alert_title the alert_title to set
	 */
	public void setAlert_title(String alert_title) {
		this.alert_title = alert_title;
	}
	/**
	 * @return the alert_type_cd
	 */
	public String getAlert_typ_cd() {
		return alert_typ_cd;
	}
	/**
	 * @param alert_type_cd the alert_type_cd to set
	 */
	public void setAlert_typ_cd(String alert_typ_cd) {
		this.alert_typ_cd = alert_typ_cd;
	}
	/**
	 * @return the alert_dsc
	 */
	public String getAlert_dsc() {
		return alert_dsc;
	}
	/**
	 * @param alert_dsc the alert_dsc to set
	 */
	public void setAlert_dsc(String alert_dsc) {
		this.alert_dsc = alert_dsc;
	}
	/**
	 * @return the lst_update_userid
	 */
	public String getLst_updt_userid() {
		return lst_updt_userid;
	}
	/**
	 * @param lst_update_userid the lst_update_userid to set
	 */
	public void setLst_updt_userid(String lst_updt_userid) {
		this.lst_updt_userid = lst_updt_userid;
	}
	/**
	 * @return the alert_dt
	 */
	public String getAlert_dt() {
		return alert_dt;
	}
	/**
	 * @param alert_dt the alert_dt to set
	 */
	public void setAlert_dt(String alert_dt) {
		this.alert_dt = alert_dt;
	}
}
