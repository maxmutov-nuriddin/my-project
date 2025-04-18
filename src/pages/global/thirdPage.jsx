import { Button, Checkbox, Form, Input } from 'antd';
import Aos from 'aos';
import React from 'react'


const ThirdPage = () => {
  Aos.init();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.reload();
  };

  const onFinish = values => {
    console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center login-box">
      <div data-aos="zoom-in" className="p-8 rounded-3xl shadow-2xl backdrop-blur-lg bg-white/10 text-white text-2xl bg-sky-50 max-w-[90%] sm:max-w-md w-full sm:text-2xl text-base justify-items-center">
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          variant="underlined"
          style={{
            maxWidth: "auto",
          }}
        >
          <Form.Item
            name="FirstName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input style={{
              backgroundColor: 'transparent',
              color: 'white',
            }}
            placeholder='FirstName' className='ant_input' />
          </Form.Item>

          <Form.Item
            name="LastName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input style={{
              backgroundColor: 'transparent',
              color: 'white',
            }}
            placeholder='LastName' className='ant_input' />
          </Form.Item>

          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input style={{
              backgroundColor: 'transparent',
              color: 'white',
            }}
            placeholder='Username' className='ant_input' />
          </Form.Item>

          <Form.Item
            name="TextArea"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Input style={{
              backgroundColor: 'transparent',
              color: 'white',
            }}
            placeholder='TextArea' className='ant_input' />
          </Form.Item>

          <Form.Item
            name="GitHubLink"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input style={{
              backgroundColor: 'transparent',
              color: 'white',
            }}
            placeholder='GitHubLink' className='ant_input' />
          </Form.Item>

          <Form.Item
            name="InstagramLink"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input style={{
              backgroundColor: 'transparent',
              color: 'white',
            }}
            placeholder='InstagramLink' className='ant_input' />
          </Form.Item>

          <Form.Item
            name="TelegramLink"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input style={{
              backgroundColor: 'transparent',
              color: 'white',
            }}
            placeholder='TelegramLink' className='ant_input' />
          </Form.Item>

          <Form.Item label={null} className='flex justify-center items-center'>
            <Button type="primary" onClick={handleLogout}>
              Log Out
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default ThirdPage