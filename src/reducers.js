
import {LIST_EVENTS,DELETE_EVENT,CREATE_EVENT,UPDATE_EVENT} from './actions';


const initialState = [];

  const getAllEvents=(state)=> {
    console.log(state);
    return state;
  }

  const createEvent=(state,action)=>{
    console.log("createEvent");
    console.log(state);
    const eventData=action.payload;
    const eventsList=[...state,eventData];
    console.log(eventsList);
    return eventsList;
  }

  const editEvent=(state, action)=> {
    let _eventList=[...state];
    const eventData = action.payload;
    let event = _eventList.find(item => item.id===eventData.id);
    event.name= eventData.name;
    event.description= eventData.description;
    event.price= eventData.price;
    event.eventType= eventData.eventType;
    event.termsAndService= eventData.termsAndService;
    event.dateOfEvent= eventData.dateOfEvent;
    return _eventList;
  }
  
  const deleteEvent=(state,action)=>{
    const eventId=action.payload.id;
    let _eventList=[...state];
    _eventList.splice(_eventList.findIndex(item=>item.id===eventId),1);
    return _eventList;
  }

  function reducer(state = initialState, action) {
    console.log("WE ARE INSIDE REDUCER", action);
    switch(action.type) {
      case LIST_EVENTS:
        return getAllEvents(state);
      case CREATE_EVENT:
        console.log('ADDING');
        return createEvent(state,action);
      case UPDATE_EVENT:
        return editEvent(state,action);
       case DELETE_EVENT:
           return deleteEvent(state,action);
      default:
        return state;
      }
    }

export default reducer;