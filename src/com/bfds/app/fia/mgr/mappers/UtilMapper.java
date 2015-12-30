/**
 * 
 */
package com.bfds.app.fia.mgr.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Select;

import com.bfds.app.fia.mgr.model.AgreeType;
import com.bfds.app.fia.mgr.model.BatchTypes;
import com.bfds.app.fia.mgr.model.DataTransMthdTypes;
import com.bfds.app.fia.mgr.model.Fields;
import com.bfds.app.fia.mgr.model.Firm;
import com.bfds.app.fia.mgr.model.FirmAndMgmtCo;
import com.bfds.app.fia.mgr.model.FirmTypes;
import com.bfds.app.fia.mgr.model.MFProfileII;
import com.bfds.app.fia.mgr.model.MgmtCo;
import com.bfds.app.fia.mgr.model.MgmtCoTypes;
import com.bfds.app.fia.mgr.model.NetworkMatrixLevel;
import com.bfds.app.fia.mgr.model.OmnibusDistMdlTypes;
import com.bfds.app.fia.mgr.model.OmnibusTradeProcessTypes;
import com.bfds.app.fia.mgr.model.OperationalReview;
import com.bfds.app.fia.mgr.model.PosFileSched;
import com.bfds.app.fia.mgr.model.PricingSource;
import com.bfds.app.fia.mgr.model.SettlementTypes;
import com.bfds.app.fia.mgr.model.ShareHldrSvcMdlTypes;
import com.bfds.app.fia.mgr.model.StateTypes;
import com.bfds.app.fia.mgr.model.SubAcctPltfrmTypes;
import com.bfds.app.fia.mgr.model.TA2000SubFirmType;
import com.bfds.app.fia.mgr.model.TransFileType;
import com.bfds.app.fia.mgr.model.BrokeragePlatform;

/**
 * @author jlopes
 *
 */
public interface UtilMapper {

	@Select("Select state_cd, state_dsc from dbo.state_t")
	public List<StateTypes> returnStates();

	@Select("Select firm_typ_cd, firm_typ_dsc from dbo.firm_type_t")
	public List<FirmTypes> returnFirmTypes();

	@Select("Select firm_id, short_nm, long_nm from dbo.firm_t")
	public List<Firm> returnSystem();

	@Select("Select firm_id, clearing_firm_id, long_nm, short_nm, clearing_firm_num, clearing_firm_nm, firm_address1, " +
			"firm_address2, firm_city, firm_state_cd, firm_zip_cd, firm_website, prmry_bank_nm, prmry_bank_address1, " +
            "prmry_bank_address2, prmry_bank_city, prmry_bank_state_cd, prmry_bank_zip_cd, prmry_bank_aba_num, prmry_bank_acct_num, " +
            "firm_tax_id, firm_typ_cd, clrng_frm_ind, shrhldr_svc_mdl_cd, ntwrk_mtrx_lvl_id, nscc_ntwrk_alpha_cd, subacct_pltfrm_cd, " +
            "bin_mask, site_inspection_dt, sae16_ind, industry_attestation_ind, mf_profile_II_ind, brkrg_pltfrm, spec_pckg_link, " +
            "trade_cut_off, firm_exit_ind, omnibus_dist_mdl_cd, data_trans_mthd_cd, lst_updt_userid, lst_updt_dtm, nscc_member_num, " +
            "commserv_ind from dbo.firm_t where short_nm = #{short_nm}")
	public List<Firm> doFirmSrch(String short_nm);

	@Select("Select mgmt_co_id, mgmt_co_short_nm, mgmt_co_long_nm, ta2000_sys_cd, ta2000_co_cd from dbo.management_company_t")
	public List<MgmtCo> returnCompany();

	@Select("Select omnibus_dist_mdl_cd, omnibus_dist_mdl_dsc from dbo.omnibus_dist_model_t")
	public List<OmnibusDistMdlTypes> returnOmnibusDistModel();

	@Select("Select data_trans_mthd_cd, data_trans_mthd_dsc from dbo.data_trans_method_t")
	public List<DataTransMthdTypes> returnDataTrnsMthd();

	@Select("Select mgmt_co_id, mgmt_co_long_nm from dbo.management_company_t")
	public List<MgmtCoTypes> returnMgmtCoMthd();

	@Select("Select omnibus_trad_proc_cd, omnibus_trad_proc_dsc from dbo.omnibus_trade_process_t")
	public List<OmnibusTradeProcessTypes> returnOmnibusTradeProcess();

	@Select("Select settlement_typ_cd, settlement_typ_dsc from dbo.settlement_type_t")
	public List<SettlementTypes> returnSettlementType();

	@Select("Select batch_typ_cd, batch_typ_dsc from dbo.batch_type_t")
	public List<BatchTypes> returnBatchType();

	@Select("Select shrhldr_svc_mdl_cd, shrhldr_svc_mdl_dsc from dbo.shareholder_servicing_model_t")
	public List<ShareHldrSvcMdlTypes> returnShareHldrSrvMdlTypes();

	@Select("Select subacct_pltfrm_cd, subacct_pltfrm_dsc, special_char from dbo.subacct_pltfrm_t")
	public List<SubAcctPltfrmTypes> returnSubAcctPltfrmTypes();

	@Select("Select field_cd, field_dsc, tbl_nm, col_nm, lst_updt_userid, lst_updt_dtm from dbo.field_t")
	public List<Fields> returnFields();

	@Select("Select pos_file_sched_cd, pos_file_sched_dsc from dbo.position_file_schedule_t")
	public List<PosFileSched> returnPosFileSched();

	@Select("Select trans_file_typ_cd, trans_file_typ_dsc from transmission_file_type_t")
	public List<TransFileType> returnTransFileType();

	@Select("Select agre_typ_cd, agre_typ_dsc from agreement_type_t")
	public List<AgreeType> returnAgreeType();

	@Select("Select ntwrk_mtrx_lvl_id, ntwrk_mtrx_lvl_dsc from network_matrix_level_t")
	public List<NetworkMatrixLevel> returnNetworkMatrixLevel();

	@Select("Select brkrg_pltfrm_cd, brkrg_pltfrm_dsc from brokerage_platform_t")
	public List<BrokeragePlatform> returnBrokeragePlatform();

	@Select("Select op_review_cd, op_review_dsc from operational_review_t")
	public List<OperationalReview> returnOperationalReview();

	@Select("Select mf_profile_II_ind, mf_profile_II_dsc from mf_profile_II_t")
	public List<MFProfileII> returnMFProfileII();

	@Select("Select pricing_src_cd, pricing_src_dsc from pricing_source_t")
	public List<PricingSource> returnPricingSource();

	@Select("Select ta2000_sub_firm_typ_cd, ta2000_sub_firm_typ_dsc from ta2000_sub_firm_type_t")
	public List<TA2000SubFirmType> returnTA2000SubFirmType();

}
