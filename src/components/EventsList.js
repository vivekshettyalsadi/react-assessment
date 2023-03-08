
import { Card, List, FloatButton, message  } from 'antd';
import React, { useState, useEffect } from 'react';
import { Route, useNavigate } from "react-router-dom";
import { PlusCircleTwoTone } from '@ant-design/icons';
import dayjs from 'dayjs';
import moment from 'moment';

const EVENTS_LIST = "EVENTS_LIST";
const CURRENT_USER = "CURRENT_USER";


const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [initLoading, setInitLoading] = useState(true);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();


  useEffect(() => {
    loadEvents()
  }, []);

  const loadEvents = () => {
    const _user = localStorage.getItem(CURRENT_USER) !== null ? JSON.parse(localStorage.getItem(CURRENT_USER)) : null;
    if (_user !== null) {
      let _eventsList = localStorage.getItem(_user.email) !== null ? JSON.parse(localStorage.getItem(_user.email)) : [];
      setEvents(_eventsList);
    }
    setInitLoading(false);
  }

  const deletEvent=(event)=>{
    const _user = localStorage.getItem(CURRENT_USER) !== null ? JSON.parse(localStorage.getItem(CURRENT_USER)) : null;
    const _eventsList = localStorage.getItem(_user.email) !== null ? JSON.parse(localStorage.getItem(_user.email)) : [];
    _eventsList.splice(_eventsList.findIndex(item=>item.id===event.id),1);
    localStorage.setItem(_user.email, JSON.stringify(_eventsList));
    loadEvents();
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
          dataSource={events}
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

export default EventsList;