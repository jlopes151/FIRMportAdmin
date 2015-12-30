if (typeof bfdsmgr == 'undefined') {
    bfdsmgr = {};
}

bfdsmgr.event = (function() {
	/*
	 * The _MOUNT is the attach point found at the bottom of the view page
	 */
    var _MOUNT = "currentEvent";
    var _grid = null;
    var _rowClassName = null;
    var isCompany = false;
    var isSystem  = false;
    var Ok = false;
    
    return {
        /*
         * initializes the header text of the filtered grid
         * if the layout order changes there must also be a change
         * in the setRowToEdit  
         */
        initializeFilteredGrid: function(){
        	var layout = new Array(
                {field: "short_nm", name: "Firm", width: "40px", headerClasses: "bfdsmgrBoldText"},
                {field: "event_typ_cd", name: "Event Type", width: "40px", headerClasses: "bfdsmgrBoldText"},
                {field: "event_title", name: "Event Title", width: "160px", headerClasses: "bfdsmgrBoldText"},
                {field: "event_dsc", name: "Event Description", width: "200px", headerClasses: "bfdsmgrBoldText"},
                {field: "event_dt", name: "Event Date", width: "160px", headerClasses: "bfdsmgrBoldText"},
                {field: "firm_event_id", name: "Hidden Event Id", width: "60px", hidden: true, headerClasses: "bfdsHidden"}
            );

            var url = 'showAllEvents';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){
                    _grid = new FilteredPagedGrid({
		                        pageSize: 20,
		                        attachPoint: document.getElementById(_MOUNT),
		                        structure: layout,
		                        defaultSort: 'short_nm',
		                        filterLabel: 'Firm',
		                        data: data,
		                        filterColumn: 'short_nm',
		                        width: "800px",
		                        className: "pagedGridBorder"
		                    });
	                $('#loading').addClass('bfdsHidden');
	                $('#title').removeClass('bfdsHidden');
                }
            });
            
        },
        
        activateEditPage: function(data){
        	window.parent.setFieldPage('editEventPage');
        },
        
        addEvent: function(){
            var newEvent = {
        		event_typ_cd: $('#event_typ_cdDD').val(),
        		event_dt: $('#event_dtInput').val(),
        		event_dsc: $('#event_dscInput').val(),
        		event_title: $('#event_titleInput').val()
            };
            if(this.validateFields()){
	            if(confirm("Are you sure you want to add this Event?")) {           	
	                $.post('addEvent',
	                		bfdsmgr.util.flattenObject(newEvent),
	                        function (data) {
	                            if(data.true_false){
/*	                            	
	                                $('#successMessage').html('You have successfully added the Event.');
	                                $('#success').removeClass('bfdsHidden');
*/	                                
	                            	window.top.location.href="eventsNav";
	                            } else {
	                                $('#successMessage').html('Fail! There was an error adding the event!');
	                                $('#success').removeClass('bfdsHidden');
	                            }
	                        },
	                        'json');
	            }
            }
        },

        editEventPage: function(){
               $.ajax({
                    type: "GET",
                    url: 'editEvent',
                    dataType: "json",
                    cache: false,
                    success: function(data){ 
                       	bfdsmgr.event.getEventType(data.event_typ_cd);
                       	bfdsmgr.event.getCompany(data.mgmt_co_cds);
                		$('#event_dtInput').val(bfdsmgr.util.trim(data.event_dt));
                		$('#event_dscInput').val(bfdsmgr.util.trim(data.event_dsc));
                		$('#event_titleInput').val(bfdsmgr.util.trim(data.event_title));
                    }
                });
        },

        /*
         * getting the companies assinged to this event
         */
        editEventtMgmtCo: function(){
            $.ajax({
                type: "GET",
                url: 'editEventMgmtCo',
                dataType: "html", // just using html to return a string
                cache: false,
                success: function(data){
                	
                	// split the returned company list into an array
                	var str = data.split(' ');
                	// get the number of check box in the company dialog
                	var numChkbx = $('#companyDialog > input').size();
                	
                	// loop the check box values setting matches
                	for(var st=0; st < str.length; st++){
                    	for(var chbx=0; chbx < numChkbx; chbx++){
	                    	if($('#companyChkBx' + chbx).val() == str[st]){
	                    		$('#companyChkBx' + chbx).prop('checked', true);
	                    	}                		
                    	}
                	}
                	                	
                }
            });        	
        },
        
        /*
         * The short_nm input is loaded when the page displays
         */
        getShortNames: function(){
    		$( "#short_nmInput" ).autocomplete({
    			source: function( request, response ) {
    				$.ajax({
    					url: "getSystem",
    					dataType: "json",
    					data: {
    						featureClass: "P",
    						style: "full",
    						maxRows: 12,
    						name_startsWith: request.term
    					},
    					success: function( data ) {
    						response( $.map( data, function( item ) {
    							var patt1=new RegExp(request.term,"gi");
     							if(patt1.test(item.short_nm)){
    								return {
    									value: item.short_nm
    								}
     							}
    						}));
    					}
    				});
    			},
    			minLength: 2,
    			select: function( event, ui ) {
    				$( "#short_nmInput" ).val(ui.item.label);
    	            $('#successMessage').html('The Admin tool needs to validate the selected Intermediary name, click the Inter button.');
    	            $('#success').removeClass('bfdsHidden');
    			},
    			open: function() {
    				$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
    			},
    			close: function() {
    				$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
    			}
    		});
        },
        
        getCompany: function(_val){
            $.ajax({
                type: "GET",
                url: 'getCompany',
                dataType: "json",
                cache: false,
                success: function(data){               
					/*
					 * if _val undefined or 'All', undefined on 
					 * the Add page, All or a set on the Edit.
					 */                	
                	if((!(_val == 'ALL') && (typeof _val == 'undefined')) || 
		 				((_val == 'ALL') && !(typeof _val == 'undefined'))){
	                	for(var st=0; st < data.length; st++){
	                    	if (typeof _val == 'undefined') {
	                    		$('<input id=companyChkBx' + st + ' name=companyChkBx value=' + data[st].mgmt_co_id + ' type="checkbox">' +
	                    				data[st].mgmt_co_short_nm + ' - ' + data[st].mgmt_co_long_nm + '</input><br/>').appendTo($('#companyDialog')).get(0);
	                    	}else{
                        		$('<input id=companyChkBx' + st + ' name=companyChkBx value=' + data[st].mgmt_co_id + ' type="checkbox" checked>' + 
                        				data[st].mgmt_co_short_nm + ' - ' + data[st].mgmt_co_long_nm + '</input><br/>').appendTo($('#companyDialog')).get(0);
	                    	}                		
	                	}
 					}else{
 						/*
 						 * do the selected companies, were the outer loop is the array of 
 						 * selected companies and the inner is the set of all companies were the
 						 * order of the companies id is not known. 
 						 * _val is to contain the set of selected companies comma seperated. 
 						 */
 						var comps = _val.split(',');
 						
 						// create all the company inputs
	                	for(var st=0; st < data.length; st++){
                    		$('<input id=companyChkBx' + st + ' name=companyChkBx value=' + data[st].mgmt_co_id + ' type="checkbox">' + 
                    				data[st].mgmt_co_short_nm + ' - ' + data[st].mgmt_co_long_nm + '</input><br/>').appendTo($('#companyDialog')).get(0);
	                	}
	                	
 						for(var ot=0; ot < comps.length; ot++)
 		                	for(var st=0; st < data.length; st++){
	                    		if(comps[ot] == data[st].mgmt_co_id.toString()){
	                        		$('#companyChkBx' + st).attr('checked', 'true');
	                    		}
	 						}// end of oter for
 					}// End of if _val undefined or 'All'                	
                } // End of success
            });        	
        },
        
		companyDialog: function(){
			var isAllChecked = false;
          	$('#companyDialog').dialog({ height: 400, 
        	  						     width: 400, 
        	  						     maxHeight: 400, 
        	  						     modal: true, 
             							 buttons: { "Ok": function() {
								 							var nxtChkBx = 0;
								 							var foundThese = '';
								 							var outPut = '';
								 							var lstComma = 0;
								 							
								 							while(true){
								 								if(document.getElementById('companyChkBx' + nxtChkBx) != null){
								 									if(document.getElementById('companyChkBx' + nxtChkBx).checked){
								 										foundThese += document.getElementById('companyChkBx' + nxtChkBx).value + ',';
								 									}
								 								}else{
								 									break;
								 								}
								 								nxtChkBx++;
								 							}
								 							
								 							// remove the trailing comma
								 							lstComma = foundThese.lastIndexOf(',');
								 							outPut = foundThese.substring(0, lstComma);
								 							
								 							var newCompanies = {
								 					        		sel_companies: outPut
								 						     };
						 						             $.post('eventSaveCompanies',
						 						             		bfdsmgr.util.flattenObject(newCompanies),
						 						                    function (data) {
						 						            	 		if(data.true_false){
						 						            	 			isCompany = true;
						 						            	 		}else{
						 						            	 			isCompany = false;
						 						            	 		}
						 						                    },
						 						                    'json');
								 							
								 							$(this).dialog("close"); 
								 					},
     									   			"Close": function() { 
     									   						$(this).dialog("close"); 
     									   			}
/*								 					
								 					,
     				            					"Select All": function() {
     				            								$('#companyDialog > input').attr('checked','true');
												  				$(this).dialog("close"); 
     				            					}
*/								 					
     									          }// end of buttons 							
        	  						     });
        },
        
        deleteEvents : function(id){
            if(confirm("Are you sure you want to delete this event?")) {
                $.post('deleteEvent',
                       function(data){
                            bfdsmgr.event.deleteEventSuccess(data);
                       },
                       'json');
            }else{
            	window.top.location.href="eventsNav";
            }
        },

        deleteEventSuccess : function(data){
            if (data.true_false){
                $('#successMessage').html('You have successfully deleted the Event.');
                $('#success').removeClass('bfdsHidden');
            } else {
                $('#successMessage').html('FAIL! The event was not deleted ' + '\n' + data.message);
                $('#success').removeClass('bfdsHidden');
            }
        },
        
        updateEvent: function(){
            var newEvent = {
        		event_typ_cd: $('#event_typ_cdDD').val(),
        		event_dt: $('#event_dtInput').val(),
        		event_dsc: $('#event_dscInput').val(),
        		event_title: $('#event_titleInput').val()
            };
            if(confirm("Are you sure you want to update this Event?")) {           	
                $.post('updateEvent',
                		bfdsmgr.util.flattenObject(newEvent),
                        function (data) {
                            if(data.true_false){
/*
					            $('#successMessage').html('You have successfully updateed the Event.');
					            $('#success').removeClass('bfdsHidden');
 */                            	
                            	window.top.location.href="eventsNav";
                            	
                            } else {
                                $('#successMessage').html('Fail! There has been an error.');
                                $('#success').removeClass('bfdsHidden');
                            }
                        },
                        'json');
            }
        },

        doFirmSrch: function(data){
            $('#success').addClass('bfdsHidden');
            $.post('doFirmSrch',
                    {short_nm: $('#short_nmInput').val()},
                    function(data){
                    	if(data.true_false){
	        				isSystem = true;
	        				$('#successMessage').html('A valid Intermediary was found!');
	        	            $('#success').removeClass('bfdsHidden');
                    	}else{
	        				isSystem = false;
	        				$('#successMessage').html('Error: No valid Intermediary waa found!');
	        	            $('#success').removeClass('bfdsHidden');
                    	}
                    },
                    'json');
        },
        
        validateTitle: function(){
    		if($('#event_titleInput').val().length > 0){
    			return true;
    		}else{
    			return false;
    		}
        },
        
        getEventType: function(_val){
            var url = 'getEventTypes';
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                cache: false,
                success: function(data){               

            		$('<option value=>-- Select --</option>').appendTo($('#event_typ_cdDD')).get(0);
                	for(var st=0; st < data.length; st++){
                    	if (typeof _val == 'undefined') {
                    		$('<option value=' + data[st].event_typ_cd + '>' + data[st].event_typ_dsc + '</option>').appendTo($('#event_typ_cdDD')).get(0);
                    	}else{
                    		if(_val == bfdsmgr.util.trim(data[st].event_typ_cd)){
                        		$('<option value=' + data[st].event_typ_cd + ' selected>' + data[st].event_typ_dsc + '</option>').appendTo($('#event_typ_cdDD')).get(0);
                    		}else{
                        		$('<option value=' + data[st].event_typ_cd + '>' + data[st].event_typ_dsc + '</option>').appendTo($('#event_typ_cdDD')).get(0);
                    		}
                    	}                		
                	}                	
                }
            });        	
        },
        
        validateFields: function(){
        	
        	var isEventType;
        	var isEventDate;
        	var isMaxDsc;
        	var isMinDsc;
        	var isTitle;
        	
            var errSet = false;
        	
        	isEventDate = this.isEventDate();
        	isEventType = this.isEventType();
        	isMaxDsc    = this.isMaxEventDsc();
        	isMinDsc    = this.isMinEventDsc();
        	isTitle     = this.validateTitle();
        	
			errorMsg = '<div style="text-align:left"><ul>';

			if(!isCompany){
        		errorMsg += '<li>There were no Companies selected, you must click the Companies button, a selection is required.</li>';
				errSet = true;
        	}
        	
			if(!isSystem){
        		errorMsg += '<li>A Intermediary was not selected, did you click the Inter button, a selection is required.</li>';
				errSet = true;
        	}

			if(!isEventDate){
        		errorMsg += '<li>Invalid Event date, an Event date is required.</li>';
				errSet = true;
        	}
        	
			if(!isEventType){
        		errorMsg += '<li>An Event type was not selected, a selection is required.</li>';
				errSet = true;
        	}
        	
    		if(!isMaxDsc){
    			errorMsg += '<li>The description is too long.</li>';
    		}        		

    		if(isMinDsc){
    			errorMsg += '<li>A description is required.</li>';
    		}
    		
    		if(!isTitle){
    			errorMsg += '<li>A title is required.</li>';
    		}
    		errorMsg += '</ul></div>';
    		/*
    		 * This will help if I need to display the message in a dialog as opposed
    		 * a block under the input fields
    		 */
        	if(errSet){
        		$('#successMessage').html(errorMsg);
                $('#success').removeClass('bfdsHidden'); 
                return false;
        	}
        	
        	return true;        	
        },
        
        isMaxEventDsc: function(data){
        	var strtest = $('#event_dscInput').val().length;

        	if( strtest <= 1000 ){
                return true;	
			}else{
                return false;	
			}        	
        },
        
        isMinEventDsc: function(data){
        	var strtest = $('#event_dscInput').val().length;

        	if( strtest > 0 ){
                return false;	
			}else{
                return true;	
			}        	
        },
        
        isEventType: function(){        	
        	if($('#event_typ_cdDD').val().length > 0){
        		return true;
        	}else{
        		return false;
        	}
        },
        
        isEventDate: function(){
        	
        	if( bfdsmgr.util.isDate($('#event_dtInput').val()) && 
        			($('#event_dtInput').val().length > 0)){
	        	return true;
	        }else{
	        	return false;
	        }
        },
        
        setSearchInput : function(data){
            var srchData = {
            	firm_event_id: data
            };
        	$.post('setEventRowToEdit',
        		bfdsmgr.util.flattenObject(srchData),
                function (data) {
        	
                    if(!data.true_false){
        	            $('#success').removeClass('bfdsHidden');
        				$('#successMessage').html('Error: failed to find the event');
                    }
                    
                },
                'json');
        },
        
        /*
         * set the short name record to edit, a change in the table member list
         * may cause this to be out of sync
         * This is getting the shor name in the table row
         */
        setRowToEdit: function(data){
        	var firm_event_id;

        	if(navigator.appName == 'Netscape'){
        		firm_event_id = escape(data.cells[5].childNodes[0].wholeText);
        	}else{
            	firm_event_id = escape(data.cells[5].innerHTML);
        	}
        	this.setSearchInput(firm_event_id);
        	$('tr').removeClass('gridRowHighlight');
        	data.className = "gridRowHighlight";
        }
        
    };
})();