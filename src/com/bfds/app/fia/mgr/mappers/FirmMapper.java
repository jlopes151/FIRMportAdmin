/**
 * 
 */
package com.bfds.app.fia.mgr.mappers;

import org.apache.ibatis.annotations.*;

import com.bfds.app.fia.mgr.model.Firm;
import com.bfds.app.fia.mgr.model.FirmAndMgmtCo;
import com.bfds.app.fia.mgr.model.FirmBrokeragePlatformXref;
import com.bfds.app.fia.mgr.model.FirmClearingFirmXref;
import com.bfds.app.fia.mgr.model.FirmDataTransMethodXref;
import com.bfds.app.fia.mgr.model.FirmFirmTypeXref;
import com.bfds.app.fia.mgr.model.FirmNsccMemberNum;
import com.bfds.app.fia.mgr.model.FirmNsccNetworkAlphaCd;
import com.bfds.app.fia.mgr.model.FirmOmnibusTradProcXref;
import com.bfds.app.fia.mgr.model.FirmPricingSourceXref;
import com.bfds.app.fia.mgr.model.FirmSettlementTypXref;
import com.bfds.app.fia.mgr.model.FirmShareholderServicingModelXref;
import com.bfds.app.fia.mgr.model.FirmSubAcctPltfrmXref;
import com.bfds.app.fia.mgr.model.MgmtCo;
import com.bfds.app.fia.mgr.model.TA2000SubFirm;
import com.bfds.app.fia.mgr.model.TA2000SubFirmRelationship;
import com.bfds.app.fia.mgr.model.ViewFirmMgmtCoTrustFirm;
import com.bfds.app.fia.mgr.model.FrmMgmtCoTrstFrm;

import java.util.List;

/**
 * @author jlopes
 *
 */
public interface FirmMapper {
	
	@Select("Select firm_id, long_nm, short_nm, firm_address1, firm_address2, firm_city, firm_state_cd, firm_zip_cd, " +
			"firm_website, prmry_bank_nm, prmry_bank_address1, prmry_bank_address2, prmry_bank_city, prmry_bank_state_cd, " +
			"prmry_bank_zip_cd, prmry_bank_aba_num, prmry_bank_acct_num, firm_tax_id, clrng_frm_ind, " +
			"bin_mask, sae16_ind, industry_attestation_ind, mf_profile_II_ind, spec_pckg_link, " +
			"trade_cut_off, omnibus_dist_mdl_cd, lst_updt_userid, lst_updt_dtm, commserv_ind, op_review_cd, op_review_dt, " +
			"spec_pckg_ind, vision_ind, fan_mail_ind, omniserv_ind, batch_typ_cd, dst_vho_ind, pos_file_sched_cd, active_ind, inactive_dt " +
			"from dbo.firm_t where long_nm like #{str}")
	public List<Firm> findAllFirms(String str);

	@Select("Select firm_id, long_nm, short_nm, firm_address1, firm_address2, firm_city, firm_state_cd, firm_zip_cd, " +
			"firm_website, prmry_bank_nm, prmry_bank_address1, prmry_bank_address2, prmry_bank_city, prmry_bank_state_cd, " +
			"prmry_bank_zip_cd, prmry_bank_aba_num, prmry_bank_acct_num, firm_tax_id, clrng_frm_ind, " +
			"bin_mask, sae16_ind, industry_attestation_ind, mf_profile_II_ind, spec_pckg_link, " +
			"trade_cut_off, omnibus_dist_mdl_cd, lst_updt_userid, lst_updt_dtm, commserv_ind, op_review_cd, op_review_dt, " +
			"spec_pckg_ind, vision_ind, fan_mail_ind, omniserv_ind, batch_typ_cd, dst_vho_ind, pos_file_sched_cd, active_ind, inactive_dt " +
			"from dbo.firm_t where firm_id = #{firm_id}")
	public List<Firm> findSingleFirms(int firm_id);

	@Select("Select f.firm_id, f.clearing_firm_id, f.long_nm, f.short_nm, f.clearing_firm_num, f.clearing_firm_nm, f.firm_address1, " +
			"f.firm_address2, f.firm_city, f.firm_state_cd, f.firm_zip_cd, f.firm_website, f.prmry_bank_nm, f.prmry_bank_address1, " +
			"f.prmry_bank_address2, f.prmry_bank_city, f.prmry_bank_state_cd, f.prmry_bank_zip_cd, f.prmry_bank_aba_num, " +
			"f.prmry_bank_acct_num, f.firm_tax_id, f.firm_typ_cd, f.clrng_frm_ind, f.shrhldr_svc_mdl_cd, f.ntwrk_mtrx_lvl_id, " +
			"f.nscc_ntwrk_alpha_cd, f.subacct_pltfrm_cd, f.bin_mask, f.site_inspection_dt, f.sae16_ind, f.industry_attestation_ind, " +
			"f.mf_profile_II_ind, f.brkrg_pltfrm, f.spec_pckg_link, f.trade_cut_off, f.firm_exit_ind, f.omnibus_dist_mdl_cd, " +
			"f.data_trans_mthd_cd, f.lst_updt_userid, f.lst_updt_dtm, f.nscc_member_num, f.commserv_ind from dbo.firm_t f, " +
			"dbo.frm_mgmt_co_trst_frm_t fmctf where f.firm_id = fmctf.trst_frm_id and f.short_nm like #{str}")
	public List<Firm> findAllTrustFirms(String str);

	@Select("Select f.firm_id, f.clearing_firm_id, f.long_nm, f.short_nm, f.clearing_firm_num, f.clearing_firm_nm, f.firm_address1, " +
			"f.firm_address2, f.firm_city, f.firm_state_cd, f.firm_zip_cd, f.firm_website, f.prmry_bank_nm, f.prmry_bank_address1, " +
			"f.prmry_bank_address2, f.prmry_bank_city, f.prmry_bank_state_cd, f.prmry_bank_zip_cd, f.prmry_bank_aba_num, " +
			"f.prmry_bank_acct_num, f.firm_tax_id, f.firm_typ_cd, f.clrng_frm_ind, f.shrhldr_svc_mdl_cd, f.ntwrk_mtrx_lvl_id, " +
			"f.nscc_ntwrk_alpha_cd, f.subacct_pltfrm_cd, f.bin_mask, f.site_inspection_dt, f.sae16_ind, f.industry_attestation_ind, " +
			"f.mf_profile_II_ind, f.brkrg_pltfrm, f.spec_pckg_link, f.trade_cut_off, f.firm_exit_ind, f.omnibus_dist_mdl_cd, " +
			"f.data_trans_mthd_cd, f.lst_updt_userid, f.lst_updt_dtm, f.nscc_member_num, f.commserv_ind from dbo.firm_t f, " +
			"dbo.frm_mgmt_co_trst_tpa_frm_t fmcttf where f.firm_id = fm.firm_id and f.firm_typ_cd = 'Tpa' and f.short_nm like #{str}")
	public List<Firm> findAllTrustTpaFirms(String str);

	@Select("Select f.long_nm as system, mc.mgmt_co_long_nm as company, tasf.ta2000_sub_firm_id, tasf.firm_id, tasf.mgmt_co_id, " +
			"tasf.ta2000_dealr_num, tasf.ta2000_sub_firm_typ_cd, tasft.ta2000_sub_firm_typ_dsc, tasf.ta2000_nscc_member_num, tasf.ta2000_nscc_ntwrk_alpha_cd, " +
			"tasf.ta2000_firm_nm, tasf.ta2000_firm_address1, tasf.ta2000_firm_address2, tasf.ta2000_firm_city, tasf.ta2000_firm_state_cd, " +
			"tasf.ta2000_firm_zip_cd, tasf.active_ind, tasf.inactive_dt, tasf.asof_trad_window, tasf.omnibus_conversion_dt, " +
			"tasf.post_settlement_chng_ind, tasf.ptf_acat_trnsfr_ind, tasf.lst_updt_userid, tasf.lst_updt_dtm, tasf.shrhldr_svc_mdl_cd, " +
			"tasf.settlement_typ_cd, tasf.ta2000_alt_firm_nm, tasf.lob_dsc from dbo.ta2000_sub_firm_t tasf, dbo.firm_t f, " +
			"dbo.management_company_t mc, dbo.ta2000_sub_firm_type_t tasft where tasft.ta2000_sub_firm_typ_cd = tasf.ta2000_sub_firm_typ_cd and f.firm_id = tasf.firm_id and " +
			"f.long_nm like #{_pfLngNm} and mc.mgmt_co_id = tasf.mgmt_co_id and mc.ta2000_co_cd like #{_mgmtCo} and tasf.ta2000_firm_nm like #{_FirmNm} " +
			"and tasf.ta2000_dealr_num like #{_FirmDlrNum} and tasf.ta2000_nscc_member_num like #{_FirmNsccMbrNum}")
	public List<TA2000SubFirm> findAllTA2000SubFirm(@Param("_pfLngNm")String _pfLngNm,
													@Param("_mgmtCo")String _mgmtCo,
													@Param("_FirmNm")String _FirmNm,
													@Param("_FirmDlrNum")String _FirmDlrNum,
													@Param("_FirmNsccMbrNum")String _FirmNsccMbrNum
													);
	
	@Select("Select tasf.ta2000_sub_firm_id, tasf.firm_id, tasf.mgmt_co_id, tasf.ta2000_dealr_num, tasf.ta2000_sub_firm_typ_cd, " +
			"tasf.ta2000_nscc_member_num, tasft.ta2000_sub_firm_typ_dsc, tasf.ta2000_nscc_ntwrk_alpha_cd, tasf.ta2000_firm_nm, " +
			"tasf.ta2000_firm_address1, tasf.ta2000_firm_address2, tasf.ta2000_firm_city, tasf.ta2000_firm_state_cd, " +
			"tasf.ta2000_firm_zip_cd, tasf.active_ind, tasf.inactive_dt, tasf.asof_trad_window, tasf.omnibus_conversion_dt, " +
			"tasf.post_settlement_chng_ind, tasf.ptf_acat_trnsfr_ind, tasf.lst_updt_userid, tasf.lst_updt_dtm, tasf.shrhldr_svc_mdl_cd, " +
			"tasf.settlement_typ_cd, tasf.ta2000_alt_firm_nm, tasf.lob_dsc from dbo.ta2000_sub_firm_t tasf, dbo.ta2000_sub_firm_type_t tasft  " +
			"where tasft.ta2000_sub_firm_typ_cd = tasf.ta2000_sub_firm_typ_cd and ta2000_sub_firm_id = #{ta2000_sub_firm_id}")
	public List<TA2000SubFirm> findAllSingleTA2000SubFirm(int ta2000_sub_firm_id);
	
	@Select("Select firm_id, long_nm from dbo.firm_t where clrng_frm_ind = 'yes'")
	public List<Firm> findAllClearingFirms();

	@Select("Select firm_id, clearing_firm_id, clearing_firm_num, clearing_firm_nm from dbo.firm_clearing_firm_xref_t where firm_id = #{firm_id}")
	public List<FirmClearingFirmXref> findAllFirmClearingFirmXref(int firm_id);

	@Select("Select firm_id, firm_typ_cd from dbo.firm_firm_type_xref_t where firm_id = #{firm_id}")
	public List<FirmFirmTypeXref> findAllFirmFirmTypeXref(int firm_id);
		
	@Select("Select firm_id, shrhldr_svc_mdl_cd from dbo.firm_shareholder_servicing_model_xref_t where firm_id = #{firm_id}")
	public List<FirmShareholderServicingModelXref> findAllFirmShrhldrSrvMdlXref(int firm_id);

	@Select("Select firm_id, subacct_pltfrm_cd from dbo.firm_subacct_pltfrm_xref_t where firm_id = #{firm_id}")
	public List<FirmSubAcctPltfrmXref> findAllFirmSubAcctPltfrmXref(int firm_id);
	
	@Select("Select firm_id, brkrg_pltfrm_cd from dbo.firm_brokerage_platform_xref_t where firm_id = #{firm_id}")
	public List<FirmBrokeragePlatformXref> findAllFirmBrokeragePlatformXref(int firm_id);
	
	@Select("Select firm_id, nscc_member_num from dbo.firm_nscc_member_num_t where firm_id = #{firm_id}")
	public List<FirmNsccMemberNum> findAllFirmNsccMemberNum(int firm_id);
	
	@Select("Select firm_id, nscc_ntwrk_alpha_cd from dbo.firm_nscc_network_alpha_cd_t where firm_id = #{firm_id}")
	public List<FirmNsccNetworkAlphaCd> findAllFirmNsccNetworkAlphaCd(int firm_id);
	
	@Select("Select firm_id, settlement_typ_cd from dbo.firm_settlement_typ_xref_t where firm_id = #{firm_id}")
	public List<FirmSettlementTypXref> findAllFirmSettlementTypXref(int firm_id);
	
	@Select("Select firm_id, omnibus_trad_proc_cd from dbo.firm_omnibus_trad_proc_xref_t where firm_id = #{firm_id}")
	public List<FirmOmnibusTradProcXref> findAllFirmOmnibusTradProcXref(int firm_id);
	
	@Select("Select firm_id, data_trans_mthd_cd from dbo.firm_data_trans_mthd_xref_t where firm_id = #{firm_id}")
	public List<FirmDataTransMethodXref> findAllFirmDataTransMethodXref(int firm_id);
	
	@Select("Select firm_id, pricing_src_cd from dbo.firm_pricing_source_xref_t where firm_id = #{firm_id}")
	public List<FirmPricingSourceXref> findAllFirmPricingSourceXref(int firm_id);
	
	/*
	 * The firm object has all the fields of the table
	 */
	@Select("Select * from firm_t where firm_typ_cd = 'Trust' and firm_id in (select firm_id from firm_mgmt_co_t where mgmt_co_id = #{mgmt_co_id}) ")
	public List<Firm> findAllFirmTrustsByMgmtCo(int mgmt_co_id);
	
	/*
	 * The firm object has all the fields of the table
	 */
	@Select("Select * from firm_t where firm_typ_cd != 'TPA' and firm_typ_cd != 'Trust' and firm_id in (select firm_id from firm_mgmt_co_t where mgmt_co_id = #{mgmt_co_id}) ")
	public List<Firm> findNonTrustTpaFirms(int mgmt_co_id);
	
	@Select("Select firm_id, clearing_firm_id, long_nm, short_nm, clearing_firm_num, clearing_firm_nm, firm_address1, " +
			"firm_address2, firm_city, firm_state_cd, firm_zip_cd, firm_website, prmry_bank_nm, prmry_bank_address1, " +
            "prmry_bank_address2, prmry_bank_city, prmry_bank_state_cd, prmry_bank_zip_cd, prmry_bank_aba_num, prmry_bank_acct_num, " +
            "firm_tax_id, firm_typ_cd, clrng_frm_ind, shrhldr_svc_mdl_cd, ntwrk_mtrx_lvl_id, nscc_ntwrk_alpha_cd, subacct_pltfrm_cd, " +
            "bin_mask, site_inspection_dt, sae16_ind, industry_attestation_ind, mf_profile_II_ind, brkrg_pltfrm, spec_pckg_link, " +
            "trade_cut_off, firm_exit_ind, omnibus_dist_mdl_cd, data_trans_mthd_cd, lst_updt_userid, lst_updt_dtm, nscc_member_num, " +
            "commserv_ind from dbo.firm_t where firm_id = #{firm_id}")
	public List<Firm> findSingleFirmsById(int firm_id);

	/*
	 * Getting the Company from the Firm_Mgmt_Co table using the associated firm_id
	 */
	@Select("Select * from dbo.management_company_t where mgmt_co_id not in (select mgmt_co_id from dbo.firm_mgmt_co_t " +
			"where firm_id = #{firm_id})")
	public List<MgmtCo> findAllFirmCompaniesNotInXref(int firm_id);
	
	/*
	 * Getting all the Firm, Company Trust, Firm entries, to display in the Firm, Company, Trust, Firm view
	 */
	@Select("Select fmctf.firm_mgmt_co_id, fmctf.trst_frm_id, f.firm_id, m.mgmt_co_id from firm_t f, management_company_t m, " +
			"firm_mgmt_co_t fmc, frm_mgmt_co_trst_frm_t fmctf where fmc.firm_id = f.firm_id and fmc.mgmt_co_id = m.mgmt_co_id " +
			"and fmc.firm_mgmt_co_id = fmctf.firm_mgmt_co_id" )
	public List<ViewFirmMgmtCoTrustFirm> findAllFirmMgmtCoTrustFirm();
	
	@Select("Select * from dbo.management_company_t where mgmt_co_id = #{mgmt_co_id}")
	public List<MgmtCo> findAllMCompanies(int mgmt_co_id);
	
	@Select("Select ta2000_sub_firm_id, ta2000_sub_firm_rel_id, lst_updt_userid, lst_updt_dtm from dbo.ta2000_sub_firm_relationship_t " +
			"where ta2000_sub_firm_id = #{ta2000_sub_firm_id}")
	public List<TA2000SubFirmRelationship> findAllTA2000SubFirmRelationship(int ta2000_sub_firm_id);
	
	@Insert("Insert into dbo.firm_t (long_nm, short_nm, firm_address1, firm_address2," +
			" firm_city, firm_state_cd, firm_zip_cd, firm_website, prmry_bank_nm, prmry_bank_address1, " +
            " prmry_bank_address2, prmry_bank_city, prmry_bank_state_cd, prmry_bank_zip_cd, prmry_bank_aba_num, prmry_bank_acct_num, " +
			" firm_tax_id, clrng_frm_ind, bin_mask, sae16_ind, industry_attestation_ind, mf_profile_II_ind, " +
			" spec_pckg_link, trade_cut_off, omnibus_dist_mdl_cd, lst_updt_userid, lst_updt_dtm, commserv_ind, op_review_cd, " +
			" op_review_dt, spec_pckg_ind, vision_ind, fan_mail_ind, omniserv_ind, batch_typ_cd, dst_vho_ind, pos_file_sched_cd, " +
			" active_ind, inactive_dt)" +
			" values (#{long_nm}, #{short_nm}, #{firm_address1}, #{firm_address2}, #{firm_city}, #{firm_state_cd}, #{firm_zip_cd}, " +
			" #{firm_website}, #{prmry_bank_nm}, #{prmry_bank_address1}, #{prmry_bank_address2}, #{prmry_bank_city}, " +
			" #{prmry_bank_state_cd}, #{prmry_bank_zip_cd}, #{prmry_bank_aba_num}, #{prmry_bank_acct_num}, #{firm_tax_id}, " +
			" #{clrng_frm_ind}, #{bin_mask}, #{sae16_ind}, #{industry_attestation_ind}, #{mf_profile_II_ind}, " +
			" #{spec_pckg_link}, #{trade_cut_off}, #{omnibus_dist_mdl_cd}, #{lst_updt_userid}, CURRENT_TIMESTAMP, #{commserv_ind}, " +
			" #{op_review_cd}, #{op_review_dt}, #{spec_pckg_ind}, #{vision_ind}, #{fan_mail_ind}, #{omniserv_ind}, #{batch_typ_cd}, " +
			" #{dst_vho_ind}, #{pos_file_sched_cd}, #{active_ind}, #{inactive_dt})")
	@Options(useGeneratedKeys = true, keyProperty="firm_id") 
	public void insertFirm(Firm firm);

	@Insert("Insert into dbo.firm_t (firm_mgmt_co_id, trst_frm_id, lst_updt_userid, lst_updt_dtm) " +
			"values(#{frm_mgmt_co_id}, #{trst_frm_id}, #{lst_updt_userid}, CURRENT_TIMESTAMP)")
	public void insertFirmMgmtCoTrustFirm(FrmMgmtCoTrstFrm fmctf);
	
	@Insert("Insert into dbo.firm_clearing_firm_xref_t (firm_id, clearing_firm_id, clearing_firm_num, clearing_firm_nm, " +
			"lst_updt_userid, lst_updt_dtm) values(#{firm_id}, #{clearing_firm_id}, #{clearing_firm_num}, #{clearing_firm_nm}, " +
			"#{lst_updt_userid}, CURRENT_TIMESTAMP)")
	public void insertFirmClearingFirmXref(FirmClearingFirmXref fcfx);
	
	@Insert("Insert into dbo.firm_firm_type_xref_t (firm_id, firm_typ_cd, lst_updt_userid, lst_updt_dtm) " +
			"values(#{firm_id}, #{firm_typ_cd}, #{lst_updt_userid}, CURRENT_TIMESTAMP)")
	public void insertFirmFirmTypeXref(FirmFirmTypeXref fftx);
	
	@Insert("Insert into dbo.firm_shareholder_servicing_model_xref_t (firm_id, shrhldr_svc_mdl_cd, lst_updt_userid, lst_updt_dtm) " +
			"values(#{firm_id}, #{shrhldr_svc_mdl_cd}, #{lst_updt_userid}, CURRENT_TIMESTAMP)")
	public void insertFirmShrhldrSvcngMdlXref(FirmShareholderServicingModelXref fssmx);
	
	@Insert("Insert into dbo.firm_subacct_pltfrm_xref_t (firm_id, subacct_pltfrm_cd, lst_updt_userid, lst_updt_dtm) " +
			"values(#{firm_id}, #{subacct_pltfrm_cd}, #{lst_updt_userid}, CURRENT_TIMESTAMP)")
	public void insertFirmSubacctPltfrmXref(FirmSubAcctPltfrmXref fsapx);
	
	@Insert("Insert into dbo.firm_brokerage_platform_xref_t (firm_id, brkrg_pltfrm_cd, lst_updt_userid, lst_updt_dtm) " +
			"values(#{firm_id}, #{brkrg_pltfrm_cd}, #{lst_updt_userid}, CURRENT_TIMESTAMP)")
	public void insertFirmBrokeragePlatformXref(FirmBrokeragePlatformXref fbpx);
	
	@Insert("Insert into dbo.firm_nscc_member_num_t (firm_id, nscc_member_num, lst_updt_userid, lst_updt_dtm) " +
			"values(#{firm_id}, #{nscc_member_num}, #{lst_updt_userid}, CURRENT_TIMESTAMP)")
	public void insertFirmNsccMemberNum(FirmNsccMemberNum fnmn);
	
	@Insert("Insert into dbo.firm_nscc_network_alpha_cd_t (firm_id, nscc_ntwrk_alpha_cd, lst_updt_userid, lst_updt_dtm) " +
			"values(#{firm_id}, #{nscc_ntwrk_alpha_cd}, #{lst_updt_userid}, CURRENT_TIMESTAMP)")
	public void insertFirmNsccNetworkAlphaCd(FirmNsccNetworkAlphaCd fnnac);
	
	@Insert("Insert into dbo.firm_settlement_typ_xref_t (firm_id, settlement_typ_cd, lst_updt_userid, lst_updt_dtm) " +
			"values(#{firm_id}, #{settlement_typ_cd}, #{lst_updt_userid}, CURRENT_TIMESTAMP)")
	public void insertFirmSettlementTypeXref(FirmSettlementTypXref fstx);
	
	@Insert("Insert into dbo.firm_omnibus_trad_proc_xref_t (firm_id, omnibus_trad_proc_cd, lst_updt_userid, lst_updt_dtm) " +
			"values(#{firm_id}, #{omnibus_trad_proc_cd}, #{lst_updt_userid}, CURRENT_TIMESTAMP)")
	public void insertFirmOmnibusTradProcXref(FirmOmnibusTradProcXref fotpx);
	
	@Insert("Insert into dbo.firm_data_trans_mthd_xref_t (firm_id, data_trans_mthd_cd, lst_updt_userid, lst_updt_dtm) " +
			"values(#{firm_id}, #{data_trans_mthd_cd}, #{lst_updt_userid}, CURRENT_TIMESTAMP)")
	public void insertFirmDataTransMethodXref(FirmDataTransMethodXref fdtmx);
	
	@Insert("Insert into dbo.firm_pricing_source_xref_t (firm_id, pricing_src_cd, lst_updt_userid, lst_updt_dtm) " +
			"values(#{firm_id}, #{pricing_src_cd}, #{lst_updt_userid}, CURRENT_TIMESTAMP)")
	public void insertFirmPricingSourceXref(FirmPricingSourceXref fpsx);

	@Insert("Insert into dbo.ta2000_sub_firm_t (firm_id, mgmt_co_id, ta2000_dealr_num, " +
			"ta2000_sub_firm_typ_cd, ta2000_nscc_member_num, ta2000_nscc_ntwrk_alpha_cd, ta2000_firm_nm, " +
			"ta2000_firm_address1, ta2000_firm_address2, ta2000_firm_city, ta2000_firm_state_cd, ta2000_firm_zip_cd, " +
			"active_ind, inactive_dt, asof_trad_window, omnibus_conversion_dt, post_settlement_chng_ind, " +
			"ptf_acat_trnsfr_ind, lst_updt_userid, lst_updt_dtm, shrhldr_svc_mdl_cd, settlement_typ_cd, " +
			"ta2000_alt_firm_nm, ast_typ_dsc) " +
			"values(#{firm_id}, #{mgmt_co_id}, #{ta2000_dealr_num}, #{ta2000_sub_firm_typ_cd}, " +
			"#{ta2000_nscc_member_num}, #{ta2000_nscc_ntwrk_alpha_cd}, #{ta2000_firm_nm}, #{ta2000_firm_address1}, #{ta2000_firm_address2}, " +
			"#{ta2000_firm_city}, #{ta2000_firm_state_cd}, #{ta2000_firm_zip_cd}, #{active_ind}, #{inactive_dt}, #{asof_trad_window}, #{omnibus_conversion_dt}, " +
			"#{post_settlement_chng_ind}, #{ptf_acat_trnsfr_ind}, #{lst_updt_userid}, CURRENT_TIMESTAMP, #{shrhldr_svc_mdl_cd}, " +
			"#{settlement_typ_cd}, #{ta2000_alt_firm_nm}, #{ast_typ_dsc})")
	public void insertTA2000SubFirm(TA2000SubFirm tasf);
	
	@Delete("Delete from dbo.firm_t where firm_id = #{firm_id}")
	public void deleteFirm(int firm_id);
	
	@Delete("Delete from dbo.firm_clearing_firm_xref_t where firm_id = #{firm_id}")
	public void deleteFirmClearingFirmXref(int firm_id);
	
	@Delete("Delete from dbo.firm_firm_type_xref_t where firm_id = #{firm_id}")
	public void deleteFirmFirmTypeXref(int firm_id);
	
	@Delete("Delete from dbo.firm_shareholder_servicing_model_xref_t where firm_id = #{firm_id}")
	public void deleteFirmShareholderservicingModelXref(int firm_id);
	
	@Delete("Delete from dbo.firm_subacct_pltfrm_xref_t where firm_id = #{firm_id}")
	public void deleteFirmSubAcctPltfrmXref(int firm_id);
	
	@Delete("Delete from dbo.firm_brokerage_platform_xref_t where firm_id = #{firm_id}")
	public void deleteFirmBrokeragePlatformXref(int firm_id);
	
	@Delete("Delete from dbo.firm_nscc_member_num_t where firm_id = #{firm_id}")
	public void deleteFirmNsccMemberNum(int firm_id);
	
	@Delete("Delete from dbo.firm_nscc_network_alpha_cd_t where firm_id = #{firm_id}")
	public void deleteFirmNsccNetworkApha(int firm_id);
	
	@Delete("Delete from dbo.firm_settlement_typ_xref_t where firm_id = #{firm_id}")
	public void deleteFirmSettlementTypeXref(int firm_id);
	
	@Delete("Delete from dbo.firm_omnibus_trad_proc_xref_t where firm_id = #{firm_id}")
	public void deleteFirmOmnibusTradProcXref(int firm_id);

	@Delete("Delete from dbo.firm_pricing_source_xref_t where firm_id = #{firm_id}")
	public void deleteFirmPricingSourceXref(int firm_id);
	
	@Delete("Delete from dbo.firm_data_trans_mthd_xref_t where firm_id = #{firm_id}")
	public void deleteFirmDataTransMethodXref(int firm_id);
	
	@Update("Update dbo.firm_t set long_nm = #{long_nm}, short_nm = #{short_nm}, firm_address1 = #{firm_address1}, " +
			"firm_address2 = #{firm_address2}, firm_city = #{firm_city}, firm_state_cd = #{firm_state_cd}, firm_zip_cd = #{firm_zip_cd}, " +
			"firm_website = #{firm_website}, prmry_bank_nm = #{prmry_bank_nm}, prmry_bank_address1 = #{prmry_bank_address1}, " +
            "prmry_bank_address2 = #{prmry_bank_address2}, prmry_bank_city = #{prmry_bank_city}, prmry_bank_state_cd = #{prmry_bank_state_cd}, " +
            "prmry_bank_zip_cd = #{prmry_bank_zip_cd}, prmry_bank_aba_num = #{prmry_bank_aba_num}, prmry_bank_acct_num = #{prmry_bank_acct_num}, " +
            "firm_tax_id = #{firm_tax_id}, clrng_frm_ind = #{clrng_frm_ind}, bin_mask = #{bin_mask}, sae16_ind = #{sae16_ind}, " +
            "industry_attestation_ind = #{industry_attestation_ind}, mf_profile_II_ind = #{mf_profile_II_ind}, " +
            "spec_pckg_link = #{spec_pckg_link}, trade_cut_off = #{trade_cut_off}, omnibus_dist_mdl_cd = #{omnibus_dist_mdl_cd}, " +
            "commserv_ind = #{commserv_ind}, lst_updt_userid = #{lst_updt_userid}, lst_updt_dtm = CURRENT_TIMESTAMP, " +
            "op_review_cd = #{op_review_cd}, op_review_dt = #{op_review_dt}, spec_pckg_ind = #{spec_pckg_ind}, vision_ind = #{vision_ind}," +
            "fan_mail_ind = #{fan_mail_ind}, omniserv_ind = #{omniserv_ind}, batch_typ_cd = #{batch_typ_cd}, dst_vho_ind = #{dst_vho_ind}," +
            "pos_file_sched_cd = #{pos_file_sched_cd}, active_ind = #{active_ind}, inactive_dt = #{inactive_dt} where firm_id = #{firm_id}")
	public void updateFirm(Firm firm);
/*	
	@Select("Update dbo.firm_clearing_firm_xref_t set clearing_firm_num = #{clearing_firm_num}, clearing_firm_nm = #{clearing_firm_nm} " +
			"where firm_id = #{firm_id} and clearing_firm_id = #{clearing_firm_id}")
	public List<FirmClearingFirmXref> updateFirmClearingFirmXref(@Param("firm_id")int firm_id, @Param("clearing_firm_id")int clearing_firm_id);
*/
	@Update("Update dbo.ta2000_sub_firm_t set firm_id = #{firm_id}, mgmt_co_id = #{mgmt_co_id}, " +
			"ta2000_dealr_num = #{ta2000_dealr_num}, ta2000_sub_firm_typ_cd = #{ta2000_sub_firm_typ_cd}, ta2000_nscc_member_num = #{ta2000_nscc_member_num}, " +
			"ta2000_nscc_ntwrk_alpha_cd = #{ta2000_nscc_ntwrk_alpha_cd}, ta2000_firm_nm = #{ta2000_firm_nm}, ta2000_firm_address1 = #{ta2000_firm_address1}, " +
			"ta2000_firm_address2 = #{ta2000_firm_address2}, ta2000_firm_city = #{ta2000_firm_city}, ta2000_firm_state_cd = #{ta2000_firm_state_cd}, " +
			"ta2000_firm_zip_cd = #{ta2000_firm_zip_cd}, active_ind = #{active_ind}, inactive_dt = #{inactive_dt}, asof_trad_window = #{asof_trad_window}, " +
			"omnibus_conversion_dt = #{omnibus_conversion_dt}, post_settlement_chng_ind = #{post_settlement_chng_ind}, ptf_acat_trnsfr_ind = #{ptf_acat_trnsfr_ind}, " +
			"lst_updt_userid = #{lst_updt_userid}, lst_updt_dtm = CURRENT_TIMESTAMP, shrhldr_svc_mdl_cd = #{shrhldr_svc_mdl_cd}, " +
			"settlement_typ_cd = #{settlement_typ_cd}, ta2000_alt_firm_nm = #{ta2000_alt_firm_nm}, lob_dsc = #{lob_dsc} " +
			"where ta2000_sub_firm_id = #{ta2000_sub_firm_id}")
	public void updateTA2000SubFirm(TA2000SubFirm tasf);
		
}
