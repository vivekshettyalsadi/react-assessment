
import { List, FloatButton, message  } from 'antd';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { PlusCircleTwoTone } from '@ant-design/icons';
import moment from 'moment';
import {LIST_EVENTS,DELETE_EVENT}from '../actions';
import { useDispatch,connect,useSelector } from "react-redux";

const EVENTS_LIST = "EVENTS_LIST";
const CURRENT_USER = "CURRENT_USER";


const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [initLoading, setInitLoading] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const eventsListFromStore = useSelector(state => state);

  useEffect(() => {
    dispatch({ type: LIST_EVENTS });
  }, []);

  const loadEvents = () => {
    const _user = localStorage.getItem(CURRENT_USER) !== null ? JSON.parse(localStorage.getItem(CURRENT_USER)) : null;
    if (_user !== null) {
      let _eventsList = localStorage.getItem(_user.email) !== null ? JSON.parse(localStorage.getItem(_user.email)) : [];
      setEvents(_eventsList);
    }
    setInitLoading(false);
  }

  const deletEvent = (event)=> {
   
    const payload=event;
    dispatch({ type: DELETE_EVENT, payload});

    messageApi.open({
      type: 'success',
      content: 'Deleted Event Successfully',
    });
  }

  return (
    <div className='events-list-div'>
      <div className='add-event-div1'>
        {contextHolder}
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          dataSource={eventsListFromStore}
          bordered={true}
          renderItem={(item) => (
            <List.Item
              actions={[<a key="list-loadmore-edit" onClick = {
                () => {
                  navigate('/addEventForm', {
                    state: item,
                  });
                }
              }>Edit</a>, <a key="list-loadmore-edit" onClick={() => {
                deletEvent(item);
              }}>Delete</a>]}
            >
              <List.Item.Meta
                title={<label>{item.name}</label>}
                description= {
                  [
                    <label> {"Price: " + item.price}</label>,
                    <br />,
                    <label>{"Event Date: "  + moment(item.dateOfEvent).format("dddd, MMMM Do YYYY") }</label>,
                    <br />,
                    <label>{"Event Type: " + item.eventType}</label>,
                    <br />,
                    <label>{"Description: " + item.description}</label>,
                    <br />,
                  ]
                }
              />
            </List.Item>
          )}
        />
        <FloatButton icon={<PlusCircleTwoTone />}  onClick={() =>{
          navigate('/addEventForm');
        }} />
      </div>
    </div>
  );
};


export default connect()(EventsList);