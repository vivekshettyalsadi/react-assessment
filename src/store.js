import reducer from './reducers';
import {createStore} from 'redux';
import { loadFromLocalStorage} from './localStorage';

const persistedState = loadFromLocalStorage();
 
export const store=createStore(reducer,persistedState);