package com.bfds.app.fia.mgr.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bfds.app.fia.mgr.mappers.EventMapper;
import com.bfds.app.fia.mgr.model.Event;
import com.bfds.app.fia.mgr.model.EventTypes;
import com.bfds.app.fia.mgr.model.Firm;
import com.bfds.app.fia.mgr.service.EventService;

@Scope("prototype")
@Service
public class EventServiceImpl implements EventService {
	
	private EventMapper eventmapper;
	
	@Autowired
	public EventServiceImpl(EventMapper eventmapper){
		this.eventmapper = eventmapper;
	}
	
	public List<Event> doFindAllEvent(String event_dt){
		return this.eventmapper.findAllEvent(event_dt); 
	}
	
	public List<Event> doFindAnEvent(int firm_event_id){
		return this.eventmapper.findAnEvent(firm_event_id); 
	}
	
	public List<EventTypes> getEventTypes(){
		return this.eventmapper.getEventTypes(); 
	}
	
	@Transactional
	public void insertEvent(Event event){
		this.eventmapper.insertEvent(event);
	}

	@Transactional
	public void deleteEvent(int firm_event_id){
		this.eventmapper.deleteEvent(firm_event_id);
	}
	
	@Transactional
	public void updateEvent(Event event){
		this.eventmapper.updateEvent(event);
	}
	
}
