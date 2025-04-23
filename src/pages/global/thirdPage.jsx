import { Button, Form, Input } from 'antd';
import toast, { Toaster } from 'react-hot-toast';
import Aos from 'aos';
import React, { useEffect } from 'react';
import { server } from '../../server/server';
import Password from 'antd/es/input/Password';

const ThirdPage = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    Aos.init();

    const fetchUserData = async () => {
      const userId = localStorage.getItem('authToken');
      if (!userId) return toast.error("Вы не авторизованы!");

      try {
        const user = await server.getUserById(userId);

        if (user) {
          form.setFieldsValue({
            FirstName: user.user.firstName,
            LastName: user.user.lastName,
            username: user.user.userName,
            TextArea: user.profile?.TextArea || '',  // Используем profile.TextArea если он существует
            GitHubLink: user.profile?.GitHubLink || '', // Аналогично для остальных полей
            InstagramLink: user.profile?.InstagramLink || '',
            TelegramLink: user.profile?.TelegramLink || '',
            password: user.password || ''
          });
        } else {
          toast.error("Пользователь не найден.");
        }
      } catch (error) {
        console.error('Ошибка загрузки пользователя:', error);
      }
    };

    fetchUserData();
  }, [form]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.reload();
  };

  const onFinish = async (values) => {
    const userId = localStorage.getItem('authToken');
    if (!userId) {
      toast.error("Вы не авторизованы!");
      return;
    }

    toast.promise(
      (async () => {
        let user = await server.getUserById(userId);

        // Если пользователь не найден, создаём новый объект
        if (!user) {
          user = {
            user: {
              firstName: values.FirstName,
              lastName: values.LastName,
              userName: values.username,
              role: "user"
            },
            profile: {
              TextArea: values.TextArea,
              GitHubLink: values.GitHubLink,
              InstagramLink: values.InstagramLink,
              TelegramLink: values.TelegramLink
            },
            education: {},
            experience: {},
            skills: [],
            languages: [],
            hobbies: [],
            date: Math.floor(Date.now() / 1000),
            password: "1234",
            portfolio: []
          };
          await server.createUser(user);
          toast.success("Пользователь создан.");
        } else {
          // Если profile нет — создаём объект
          if (!user.profile) {
            user.profile = {};
          }

          // Обновляем profile с новыми значениями
          user.profile.TextArea = values.TextArea;
          user.profile.GitHubLink = values.GitHubLink;
          user.profile.InstagramLink = values.InstagramLink;
          user.profile.TelegramLink = values.TelegramLink;
          user.password = values.password;

          // Обновляем базовую информацию о пользователе
          user.user.firstName = values.FirstName;
          user.user.lastName = values.LastName;
          user.user.userName = values.username;
          user.password = values.password;

          await server.updateUser(userId, user);
          toast.success("Пользователь обновлён.");
        }

        toast.success("Данные успешно сохранены!");
      })(),
      {
        loading: 'Сохранение данных...',
        success: 'Данные успешно сохранены!',
        error: 'Ошибка при сохранении данных!',
      }
    );
  };


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const isAuthenticatedRole = () => {
    return localStorage.getItem('userRole');
  }

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center login-box">
        <div data-aos="zoom-in" className="p-8 rounded-3xl shadow-2xl backdrop-blur-lg bg-white/10 text-white text-2xl bg-sky-50 max-w-[90%] sm:max-w-md w-full sm:text-2xl text-base justify-items-center">
          <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            variant="underlined"
            style={{ width: "auto" }}
          >
            <Form.Item name="FirstName" rules={[{ required: true, message: 'Please input your FirstName!' }]}>
              <Input style={{ backgroundColor: 'transparent', color: 'white' }} placeholder='FirstName' className='ant_input' />
            </Form.Item>

            <Form.Item name="LastName" rules={[{ required: true, message: 'Please input your LastName!' }]}>
              <Input style={{ backgroundColor: 'transparent', color: 'white' }} placeholder='LastName' className='ant_input' />
            </Form.Item>

            <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input style={{ backgroundColor: 'transparent', color: 'white' }} placeholder='Username' className='ant_input' />
            </Form.Item>
            {isAuthenticatedRole() !== 'admin' && (
              <>
                <Form.Item name="TextArea" rules={[{ required: true, message: 'Please input about!' }]}>
                  <Input style={{ backgroundColor: 'transparent', color: 'white' }} placeholder='About' className='ant_input' />
                </Form.Item>

                <Form.Item name="GitHubLink" rules={[{ required: true, message: 'Please input GitHubLink!' }]}>
                  <Input style={{ backgroundColor: 'transparent', color: 'white' }} placeholder='GitHubLink' className='ant_input' />
                </Form.Item>

                <Form.Item name="InstagramLink" rules={[{ required: true, message: 'Please input InstagramLink!' }]}>
                  <Input style={{ backgroundColor: 'transparent', color: 'white' }} placeholder='InstagramLink' className='ant_input' />
                </Form.Item>

                <Form.Item name="TelegramLink" rules={[{ required: true, message: 'Please input TelegramLink!' }]}>
                  <Input style={{ backgroundColor: 'transparent', color: 'white' }} placeholder='TelegramLink' className='ant_input' />
                </Form.Item>
              </>
            )}

            <Form.Item name="password" rules={[{ required: true, message: 'Please input Password!' }]}>
              <Password style={{ backgroundColor: 'transparent', color: 'white' }} placeholder='Password' className='ant_input' />
            </Form.Item>


            <Form.Item label={null} className='flex justify-center items-center'>
              <Button type="primary" onClick={handleLogout}>Log Out</Button>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ThirdPage;
