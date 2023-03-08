
import { Button, Checkbox, Form, Input, message, Space, Typography } from 'antd';
import './App.css';
const { Text, Link } = Typography;

const LOGGED_IN_USERS="LOGGED_IN_USERS";
const passwordREGExp = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')


const onFinishFailed = (errorInfo) => {
  console.log('Registration Failed:', errorInfo);
  
};
const Registration = (props) =>{
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    const name=values.Name;
    const email = values.Email;
    const password = values.Password;
  
    let _userList = localStorage.getItem(LOGGED_IN_USERS) !== null ? JSON.parse(localStorage.getItem(LOGGED_IN_USERS)): [];
    let isUserExist = false;
    if(_userList?.length > 0){
      isUserExist = _userList.find((usr,index)=>{
        if(usr.email === email){
          return true;
        }
        return false;
      });
    }
  
    if(isUserExist){
      console.log("User Exist");
      messageApi.open({
        type: 'error',
        content: 'User Already registered please do login',
      });
    }else {
      console.log("User Does not Exist");
      _userList.push({name: name,email: email,password: password});
      localStorage.setItem(LOGGED_IN_USERS, JSON.stringify(_userList));
      messageApi.open({
        type: 'success',
        content: 'Registeration successful',
      });
    }
};

const customWrapperCol = { xs: { span: 24,offset:0 }, sm:{ span: 16,offset:8 }, md: { span: 16,offset:8 }, lg: { span: 16,offset:8 } }

  return(
   <div className="App">
  
  <div className='login-div'>
  <Space direction="vertical">
  {contextHolder}
  <Typography.Title level={2}>Registration</Typography.Title>
  <Form
    className='login-form'
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    
    <Form.Item
      label="Name"
      name="Name"
      rules={[
        {
          required: true,
          message: 'Please input your Name',
          type: "string"
        },

      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Email"
      name="Email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
          type: "email"
        },

      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="Password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },{
          pattern: passwordREGExp,
          message: 'Please enter valid password',
        }
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
       wrapperCol={customWrapperCol}
    >
      <Button className="loginBtn" type="primary" htmlType="submit">
        REGISTER
      </Button>
    </Form.Item>
  </Form>
  <Link  onClick={()=>props.onFormSwitch("login")}>
      Have an Account? Login.
    </Link>
  </Space>
  </div>
  </div>
)};
export default Registration;