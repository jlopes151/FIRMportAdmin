package com.bfds.app.fia.mgr.config;

import java.util.Properties;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.stereotype.Component;

//import com.bfds.app.fia.mgr.annotations.Log4j;

/**
 * This class overrides methods in the PropertyPlaceholderConfigurer
 * class to retrieve placeholder information contained on the
 * web application server via JNDI (Java Naming and Directory Interface).
 */
public class PlaceholderConfigurer extends PropertyPlaceholderConfigurer {
    private static final String ENVIRONMENT_CONTEXT_NAME = "java:/comp/env";
    
    private Logger logger;
    private Context environmentContext = null;
    
    /**
     * This method is responsible for processing the placeholder information.
     * The corresponding value for the specified placeholder will be retrieved
     * from the web application server via JNDI.
     * 
     * @param   placeholder a String representing the placeholder.
     * @param   props       a Properties object containing properties
     *                      information.  This parameter is ignored and is
     *                      not expected to have a value.
     * @return              a String representing the placeholder's value.
     */
    public String resolvePlaceholder(String placeholder, Properties props) {
        String propertyValue = null;

        if (placeholder != null) {
  
            // Retrieve the initial context, if necessary.
            if (environmentContext == null) {
                try {
                    Context initialContext = new InitialContext();
                    environmentContext = (Context)initialContext.lookup(ENVIRONMENT_CONTEXT_NAME);
                }
                catch(NamingException ne) {
                    logger.fatal("Unable to retrieve the environment context.", ne);
                }
            }
            
            // The environment context is available.  Retrieve the value
            // for the specified placeholder.
            try {
                propertyValue = (String)environmentContext.lookup(placeholder);
            }
            catch(NamingException ne) {
                logger.fatal("Unable to retrieve value for \"" + placeholder + "\".", ne);
            }
        }
        
        return propertyValue;
    }
}
