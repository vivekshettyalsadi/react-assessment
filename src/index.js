import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './login';
import Registration from './Registration';
import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEventForm from "./components/AddEventForm";
import EventsList from "./components/EventsList";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/addEventForm" element={<AddEventForm/>} />
        <Route path='/eventsList'   element={<EventsList/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
