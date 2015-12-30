package com.bfds.app.fia.mgr.model;

import java.util.Calendar;

public class FundAndClass {
	
 	private int fund_and_class_id;
 	private int fund_id;
 	private String fund_lng_nm;
 	private String fund_med_nm;
 	private String fund_class_cd;
 	private String fund_tckr_symbl;
 	private String fund_cusip;
 	private String ta2000_fund_num;
 	private String div_typ_dsc;
 	private String fund_typ_dsc;
 	private Calendar cls_incept_dt;
 	private String open_ind;
 	private String inst_ret_dsc;
 	private String lst_updt_userid;
 	private Calendar lst_updt_dtm; 

 	public FundAndClass(){
		
	}

	/**
	 * @return the fund_and_class_id
	 */
	public int getFund_and_class_id() {
		return fund_and_class_id;
	}

	/**
	 * @param fund_and_class_id the fund_and_class_id to set
	 */
	public void setFund_and_class_id(int fund_and_class_id) {
		this.fund_and_class_id = fund_and_class_id;
	}

	/**
	 * @return the fund_id
	 */
	public int getFund_id() {
		return fund_id;
	}

	/**
	 * @param fund_id the fund_id to set
	 */
	public void setFund_id(int fund_id) {
		this.fund_id = fund_id;
	}

	/**
	 * @return the fund_lng_nm
	 */
	public String getFund_lng_nm() {
		return fund_lng_nm;
	}

	/**
	 * @param fund_lng_nm the fund_lng_nm to set
	 */
	public void setFund_lng_nm(String fund_lng_nm) {
		this.fund_lng_nm = fund_lng_nm;
	}

	/**
	 * @return the fund_med_nm
	 */
	public String getFund_med_nm() {
		return fund_med_nm;
	}

	/**
	 * @param fund_med_nm the fund_med_nm to set
	 */
	public void setFund_med_nm(String fund_med_nm) {
		this.fund_med_nm = fund_med_nm;
	}

	/**
	 * @return the fund_class_cd
	 */
	public String getFund_class_cd() {
		return fund_class_cd;
	}

	/**
	 * @param fund_class_cd the fund_class_cd to set
	 */
	public void setFund_class_cd(String fund_class_cd) {
		this.fund_class_cd = fund_class_cd;
	}

	/**
	 * @return the fund_tckr_symbl
	 */
	public String getFund_tckr_symbl() {
		return fund_tckr_symbl;
	}

	/**
	 * @param fund_tckr_symbl the fund_tckr_symbl to set
	 */
	public void setFund_tckr_symbl(String fund_tckr_symbl) {
		this.fund_tckr_symbl = fund_tckr_symbl;
	}

	/**
	 * @return the fund_cusip
	 */
	public String getFund_cusip() {
		return fund_cusip;
	}

	/**
	 * @param fund_cusip the fund_cusip to set
	 */
	public void setFund_cusip(String fund_cusip) {
		this.fund_cusip = fund_cusip;
	}

	/**
	 * @return the ta2000_fund_num
	 */
	public String getTa2000_fund_num() {
		return ta2000_fund_num;
	}

	/**
	 * @param ta2000_fund_num the ta2000_fund_num to set
	 */
	public void setTa2000_fund_num(String ta2000_fund_num) {
		this.ta2000_fund_num = ta2000_fund_num;
	}

	/**
	 * @return the div_typ_dsc
	 */
	public String getDiv_typ_dsc() {
		return div_typ_dsc;
	}

	/**
	 * @param div_typ_dsc the div_typ_dsc to set
	 */
	public void setDiv_typ_dsc(String div_typ_dsc) {
		this.div_typ_dsc = div_typ_dsc;
	}

	/**
	 * @return the fund_typ_dsc
	 */
	public String getFund_typ_dsc() {
		return fund_typ_dsc;
	}

	/**
	 * @param fund_typ_dsc the fund_typ_dsc to set
	 */
	public void setFund_typ_dsc(String fund_typ_dsc) {
		this.fund_typ_dsc = fund_typ_dsc;
	}

	/**
	 * @return the cls_incept_dt
	 */
	public Calendar getCls_incept_dt() {
		return cls_incept_dt;
	}

	/**
	 * @param cls_incept_dt the cls_incept_dt to set
	 */
	public void setCls_incept_dt(Calendar cls_incept_dt) {
		this.cls_incept_dt = cls_incept_dt;
	}

	/**
	 * @return the open_ind
	 */
	public String getOpen_ind() {
		return open_ind;
	}

	/**
	 * @param open_ind the open_ind to set
	 */
	public void setOpen_ind(String open_ind) {
		this.open_ind = open_ind;
	}

	/**
	 * @return the inst_ret_dsc
	 */
	public String getInst_ret_dsc() {
		return inst_ret_dsc;
	}

	/**
	 * @param inst_ret_dsc the inst_ret_dsc to set
	 */
	public void setInst_ret_dsc(String inst_ret_dsc) {
		this.inst_ret_dsc = inst_ret_dsc;
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
