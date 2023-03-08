import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Radio,
  Space,
  Typography,
  message,
} from 'antd';

import { v4 as uuid } from 'uuid';
import { useLocation,useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const { Text } = Typography;

const { TextArea } = Input;

const EVENTS_LIST = "EVENTS_LIST";
const CURRENT_USER = "CURRENT_USER";


const AddEventForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const [eventDate, setEventDate] = useState();

  const initialValues = {
    name: state?.name,
    price: state?.price,
    description: state?.description,
    termsAndService:state?.termsAndService,
    eventType:state?.eventType,
  };

  function onChange(value, dateString) {
    if (value) {
      setEventDate(
         value.toISOString(true) );
    }
    console.log("Selected Time: ", value); //Moment object
    console.log("Formatted Selected Time: ", dateString); //String
  }

  const onFinish = (values) => {
    console.log("OnFinish:", values);
    const name = values.name;
    const description = values.description;
    const price = values.price;
    const eventType = values.eventType;
    const termsAndService = values.termsAndService;
    const dateOfEvent = values.dateOfEvent;
    const unique_id = uuid();
    let recordId= '';
  
    const _user = localStorage.getItem(CURRENT_USER) !== null ? JSON.parse(localStorage.getItem(CURRENT_USER)) : null;
    if (_user !== null) {
      const _eventsList = localStorage.getItem(_user.email) !== null ? JSON.parse(localStorage.getItem(_user.email)) : [];
      
      if(state!==null) {
        recordId= state.id;
        _eventsList.splice(_eventsList.findIndex(item=>item.id===recordId),1);
      } else {
        recordId = unique_id.slice(0,8)
      }
      _eventsList.push({id: recordId, name: name, description: description, price: price, eventType: eventType, termsAndService: termsAndService, dateOfEvent: dateOfEvent, });
      localStorage.setItem(_user.email, JSON.stringify(_eventsList));
      messageApi.open({
        type: 'success',
        content: 'Event Created Successfully',
      });

      navigate("/eventsList", {replace:true});
    }
  }

  const onFinishFailed = (values) => {
    console.log("OnFinish Failed:", values);
  }

  return (
    <div className='App'>
      <div className='add-event-div'>
        <Space direction="vertical">
          {contextHolder}
          <Typography.Title level={2}>Add Event</Typography.Title>
          <Form
            name="basic"
            wrapperCol={{
              span: 24,
            }}
            layout="verticle"
            style={{
              maxWidth: 600,
            }}
            initialValues={initialValues}
            size="large"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name='eventType'
              rules={[{
                required: true,
                message: "Choose event type",
              }]}
            >
              <Radio.Group>
                <Radio value="premium"> Premium </Radio>
                <Radio value="normal"> Normal </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name='name'
              rules={[{
                required: true,
                message: "Enter event name",
              }]}>
              <Input placeholder='Name' />
            </Form.Item>

            <Form.Item
              name='dateOfEvent'
              rules={[{
                required: true,
                message: "Select event date",
              }]}
              wrapperCol={{
                offset: 0,
                span: 24,
              }}>
              <DatePicker name="dateOfEvent" 
              defaultValue={dayjs (state?.dateOfEvent ? state?.dateOfEvent: "2023/03/10" , "YYYY/MM/DD")}
              onChange={onChange}
              format={"YYYY/MM/DD"}
              />
            </Form.Item>

            <Form.Item
              name='price'
              rules={[{
                required: true,
                message: "Enter price",
              }]}
            >
              <Input placeholder='Price' />
            </Form.Item>

            <Form.Item
              name='description'
              rules={[{
                required: true,
                message: "Describe the event",
              }]}
            >
              <TextArea placeholder='Description' rows={4} />
            </Form.Item>

            <Form.Item name="termsAndService" valuePropName="checked"
              rules={[{
                required: true,
                message: "Accept the terms and service",
              }]}
            >
              <Checkbox>Accept terms and service</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button className='loginBtn'
                type="primary" htmlType="submit">SUBMIT</Button>
            </Form.Item>
          </Form>
        </Space>
      </div>
    </div>
  );
};

export default AddEventForm;