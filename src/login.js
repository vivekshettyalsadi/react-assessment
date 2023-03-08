
import { Button, Form, Input, message, Space, Typography } from 'antd';
import './App.css';
import { Route, useNavigate } from "react-router-dom";

const { Text, Link } = Typography;
const LOGGED_IN_USERS="LOGGED_IN_USERS";
const CURRENT_USER="CURRENT_USER";
const passwordREGExp = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')


const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const Login = (props)=> {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = (values) => {
  
    console.log('Success:', values);
    console.log("Email:", values.Email);
    console.log("Password:", values.Password);
    
    const email = values.Email;
    const password = values.Password;
  
    const _userList = localStorage.getItem(LOGGED_IN_USERS) !== null ? JSON.parse(localStorage.getItem(LOGGED_IN_USERS)): [];
    let isUserExist = false;
    if(_userList !==null){
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
        type: 'success',
        content: 'Login Success',
      });
      const currentUser={email: email,password: password};
      localStorage.setItem(CURRENT_USER, JSON.stringify(currentUser));
      navigate('/eventsList');
    }else{
      console.log("User Does not Exist");
      messageApi.open({
        type: 'error',
        content: 'User Does not exist, please register user',
      });
    }
  };


 const customWrapperCol = { xs: { span: 24,offset:0 }, sm:{ span: 16,offset:8 }, md: { span: 16,offset:8 }, lg: { span: 16,offset:8 } }

  return(
   <div className="App">

  <div className='login-div'>
  <Space direction="vertical">
  {contextHolder}
  <Typography.Title level={2}>Login</Typography.Title>
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
        LOGIN
      </Button>
    </Form.Item>
  </Form>
  <Link  onClick={()=>props.onFormSwitch("registeration")}>
      Don't have an Account? Register.
    </Link>
  </Space>
  </div>
  </div>
)};
export default Login;