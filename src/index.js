import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEventForm from "./components/AddEventForm";
import EventsList from "./components/EventsList";
import { Provider } from 'react-redux';
import {store} from './store';
import {saveCurrentStateLocally, loadFromLocalStorage} from './localStorage';

const root = ReactDOM.createRoot(document.getElementById('root'));

store.subscribe(() => saveCurrentStateLocally(store));

root.render(
  <BrowserRouter>
    <Provider store={store}>
    <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/addEventForm" element={<AddEventForm/>} />
        <Route path='/eventsList'   element={<EventsList/>}/>
    </Routes>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
