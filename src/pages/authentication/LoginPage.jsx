import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { server } from '../../server/server';
import { Button, Form, Input } from 'antd';
import toast, { Toaster } from 'react-hot-toast';
import Aos from 'aos';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    password: ''
  });
  const [form] = Form.useForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkLoginCredentials = async (userName, password) => {
    try {
      const users = await server.getAllUsers();
      return users.find(
        item => item.user.userName === userName && item.password === password
      );
    } catch (err) {
      toast.error('Ошибка при проверке учетных данных:', err);
      toast.error('Ошибка сервера при проверке логина.');
      return null;
    }
  };

  const handleSubmit = async () => {
    toast.promise(
      checkLoginCredentials(formData.userName, formData.password),
      {
        loading: 'Проверка данных...',
        success: (user) => {
          if (user) {
            toast.success('Вход успешен! Добро пожаловать!');
            localStorage.setItem('authToken', user.id);
            setTimeout(() => {
              navigate('/home');
              window.location.reload();
            }, 1500);
          } else {
            toast.error('Неверный логин или пароль!');
          }
        },
        error: (err) => {
          console.error('Ошибка при входе:', err);
          return 'Не удалось выполнить вход. Попробуйте позже.';
        },
      }
    );
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleFinishFailed = ({ errorFields }) => {
    if (errorFields.length > 0) {
      toast.warning(errorFields[0].errors[0]);
    }
  };

  Aos.init();

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} autoClose={3000} />
      <div className="h-screen w-full flex items-center justify-center login-box">
        <div
          className="p-8 rounded-3xl shadow-2xl backdrop-blur-lg bg-white/10 text-white text-2xl bg-sky-50 max-w-[90%] sm:max-w-md w-full sm:text-2xl text-base justify-items-center"
          data-aos="zoom-in"
        >
          <Form
            form={form}
            onFinish={handleSubmit}
            onFinishFailed={handleFinishFailed}
            variant="underlined"
            style={{
              width: 'auto',
            }}
          >
            <Form.Item
              name="userName"
              rules={[{ required: true, message: 'Пожалуйста, введите имя пользователя!' }]}
            >
              <Input
                className="ant_input"
                name="userName"
                placeholder="Имя пользователя"
                value={formData.userName}
                onChange={handleChange}
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
            >
              <Input.Password
                className="ant__input__password"
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                }}
              />
            </Form.Item>

            <Form.Item>
              <div className="login-box_button">
                <Button className="button" type="primary" htmlType="submit">
                  Войти
                </Button>
                <Button
                  type="button"
                  onClick={handleRegister}
                  style={{ marginLeft: 10, color: 'white' }}
                >
                  Зарегистрироваться
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
