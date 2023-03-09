import { CURRENT_USER } from './actions';

export const loadFromLocalStorage = () => {
    try {
        const _user = localStorage.getItem(CURRENT_USER) !== null ? JSON.parse(localStorage.getItem(CURRENT_USER)) : null;
        if (_user !== null) {
          let _eventsList = localStorage.getItem(_user.email) !== null ? JSON.parse(localStorage.getItem(_user.email)) : [];
          console.log(_eventsList);
          return _eventsList;
        }
        return [];
    } catch (err) {
      return [];
    }
};


export const saveCurrentStateLocally = (state) => {
    try {
        console.log(state);
        const eventList=state.getState();
        console.log("SAVING LOCALLY", eventList)

        const _user = localStorage.getItem(CURRENT_USER) !== null ? JSON.parse(localStorage.getItem(CURRENT_USER)) : null;
        if (_user !== null) {
          const _eventsList = [...eventList];
          localStorage.setItem(_user.email, JSON.stringify(_eventsList));
          console.log("SAVING SUCCESS")
        }
    } catch(err) {
        console.log(err);
    }
};