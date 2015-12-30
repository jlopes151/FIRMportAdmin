package com.bfds.app.fia.mgr.model;

public class SearchValidator {

	private boolean true_false;
	private boolean duplicate;
	private String message;

	public SearchValidator(){
		this.true_false = false;
	}
	
	/**
	 * @return the true_false
	 */
	public boolean isTrue_false() {
		return true_false;
	}

	/**
	 * @param true_false the true_fale to set
	 */
	public void setTrue_false(boolean true_false) {
		this.true_false = true_false;
	}

	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}

	/**
	 * @param message the message to set
	 */
	public void setMessage(String message) {
		this.message = message;
	}

	/**
	 * @return the duplicate
	 */
	public boolean isDuplicate() {
		return duplicate;
	}

	/**
	 * @param duplicate the duplicate to set
	 */
	public void setDuplicate(boolean duplicate) {
		this.duplicate = duplicate;
	}
	
}
