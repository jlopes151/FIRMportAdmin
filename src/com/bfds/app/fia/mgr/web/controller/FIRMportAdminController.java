/**
 * 
 */
package com.bfds.app.fia.mgr.web.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Calendar;
import java.util.StringTokenizer;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.bfds.app.fia.mgr.model.SearchValidator;
import com.bfds.app.fia.mgr.model.UserInfo;
import com.bfds.app.fia.mgr.service.impl.UserInfoServiceImpl;

/**
 * @author jlopes
 * 
 * My development best practice:
 * 	Ethiopian Yirgacheffe Coffee
 * 	Funky Smooth Jazz, your choice.
 * 	18 hour days
 *  
 * Trying to follow the FIAProfile userInfo object as best I can. The FIAProfile
 * had taken a different approach to developing a Spring application before I 
 * started with the project.
 * 
 */
public abstract class FIRMportAdminController {

	private static Logger logger;

	@Autowired
	private UserInfoServiceImpl userinfoserviceimpl;
	
	protected Calendar rightNow;	
	private SearchValidator sv;
	private String env = "JMLDEBUG";

	public FIRMportAdminController(){
		rightNow = Calendar.getInstance();
	}
	
	/*
	 * process the user group information return true or false plus message that 
	 * can be appended to by the called and displayed to the user if applicable.
	 */
	protected SearchValidator processUserGroups(HttpServletRequest request){
		String[] userGroupsName;

		sv = new SearchValidator();
		sv.setTrue_false(false);

		/*
		 * To be removed at the end of the project.
		 * Only the dev, stage & prod servers have ldap
		 */
        String value = System.getenv(env);
        if (value != null) {
    		sv.setTrue_false(true);
            return sv;
        }
        
		String userId = request.getRemoteUser();
//		logger.info("The processUserGroups remote user = " + userId);
		
		UserInfo userInfo = userinfoserviceimpl.doFindSingleUserInfo("jlopes").get(0);

		/*
		 * validate the user against these to groups 
		 * BFDS_FIRMPRO_ADMIN
		 */
		if (userInfo != null) {
			// Retrieve all the groups that are associated with the user.
/*
			userGroups = userInfo.groups();
			if(userGroups != null){
				for(int u=0; u < userGroups.length; u++){
//				logger.info("The groups " + userGroups[u]);
					if(userGroups[u].compareToIgnoreCase("BFDS_FIRMPRO_ADMIN") == 0){
						sv.setTrue_false(true);
//					logger.info("The Authorized group " + userGroups[u]);
					}
				}
			}else{
				logger.info("Recieved null userGroup object!");
			}
*/			
		}
 		
		// append a message if needed
		return sv;
	}
	
	public String getUserName(HttpServletRequest request){
		String userName;
		
        String value = System.getenv(env);
        if (value != null) {
        	userName = "JLOPES";
        }else{
        	userName = (String)request.getRemoteUser();
        }
        logger.info("The userName " + userName);		
		return userName;
	}
	
	public String getFormatedNowDate(){		
		return String.format("%1$tY-%1$tm-%1$td %1$tT", rightNow);
	}
	
	public String bfdsEntitiesDecoder(String value){
		
		StringBuffer sb = new StringBuffer();
		
		try{
			StringTokenizer st = new StringTokenizer(URLDecoder.decode(value, "UTF-8"), " ");
			
			while(st.countTokens() > 0){
				String token = st.nextToken();
				
				if(token.compareToIgnoreCase("&amp;") == 0){
					sb.append("&");
					sb.append(" ");
					continue;
				}
					
				if(token.compareToIgnoreCase("&gt;") == 0){
					sb.append(">");
					sb.append(" ");
					continue;
				}
					
				if(token.compareToIgnoreCase("&lt;") == 0){
					sb.append("<");
					sb.append(" ");
					continue;
				}
					
				if(token.compareToIgnoreCase("&quot;") == 0){
					sb.append("\"");
					sb.append(" ");
					continue;
				}
					
				sb.append(token);
				sb.append(" ");
			}
		}catch(UnsupportedEncodingException ue){
			logger.info("The bfdsDecoder has thrown " + ue.getMessage());
		}
		
		return sb.toString(); 
	}

}
