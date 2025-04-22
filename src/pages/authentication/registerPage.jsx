// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { server } from '../../server/server';
// import { Button, Form, Input } from 'antd';
// import toast, { Toaster } from 'react-hot-toast';
// import Aos from 'aos';

// function RegisterPage() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     userName: '',
//     password: ''
//   });
//   const [form] = Form.useForm();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const checkIfUserExists = async (userName) => {
//     try {
//       const users = await server.getAllUsers();
//       return users.map(item => item.user.userName).includes(userName);
//     } catch (err) {
//       console.error('Ошибка при проверке пользователя:', err);
//       toast.error('Ошибка сервера при проверке логина.');
//       return false;
//     }
//   };

//   const handleSubmit = async () => {
//     const isExist = await checkIfUserExists(formData.userName);
//     if (isExist) {
//       toast.warn('Этот ник уже занят. Пожалуйста, выберите другой.');
//       return;
//     }

//     const data = {
//       user: {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         userName: formData.userName,
//         role: 'user'
//       },
//       profile: [],
//       education: [],
//       experience: [],
//       skills: [],
//       languages: [],
//       hobbies: [],
//       password: formData.password,
//       date: Math.floor(Date.now() / 1000)
//     };

//     try {
//       const result = await server.createUser(data);
//       toast.success(`Регистрация успешна! Добро пожаловать, ${result.user.firstName}!`);
//       setTimeout(() => navigate('/login'), 2000);
//     } catch (err) {
//       console.error('Ошибка при регистрации:', err);
//       toast.error('Не удалось зарегистрироваться. Попробуйте позже.');
//     }
//   };

//   const goToLogin = () => navigate('/login');
//   Aos.init();


//   return (
//     <>
//       <div className="h-screen w-full flex items-center justify-center register-box">
//         <div className="p-8 rounded-3xl shadow-2xl backdrop-blur-lg bg-white/10 text-white text-2xl bg-sky-50 max-w-[90%] sm:max-w-md w-full sm:text-2xl text-base justify-items-center" data-aos="zoom-in">
//           <Form form={form} onFinish={handleSubmit} variant="underlined"
//             style={{
//               width: "auto"
//             }}>
//             <Form.Item name="firstName" rules={[{ required: true, message: 'Введите имя!' }]}>
//               <Input
//                 className='ant_input'
//                 name="firstName"
//                 placeholder="First Name"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 style={{
//                   backgroundColor: 'transparent',
//                   color: 'white'
//                 }}
//               />
//             </Form.Item>

//             <Form.Item name="lastName" rules={[{ required: true, message: 'Введите фамилию!' }]}>
//               <Input
//                 className='ant_input'
//                 name="lastName"
//                 placeholder="Last Name"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 style={{
//                   backgroundColor: 'transparent',
//                   color: 'white'
//                 }}
//               />
//             </Form.Item>

//             <Form.Item name="userName" rules={[{ required: true, message: 'Введите ник!' }]}>
//               <Input
//                 className='ant_input'
//                 name="userName"
//                 placeholder="User Name"
//                 value={formData.userName}
//                 onChange={handleChange}
//                 style={{
//                   backgroundColor: 'transparent',
//                   color: 'white'
//                 }}
//               />
//             </Form.Item>

//             <Form.Item name="password" rules={[{ required: true, message: 'Введите пароль!' }]}>
//               <Input.Password
//                 className='ant__input__password'
//                 name="password"
//                 placeholder="Пароль"
//                 value={formData.password}
//                 onChange={handleChange}
//                 style={{
//                   backgroundColor: 'transparent',
//                   color: 'white'
//                 }}
//               />
//             </Form.Item>

//             <div className='flex items-center'>
//               <Button className='button' type="primary" htmlType="submit">
//                 Зарегистрироваться
//               </Button>
//               <Button type="button" onClick={goToLogin} style={{ marginLeft: 10, color: "white" }}>
//                 Войти
//               </Button>
//             </div>
//           </Form>

//         </div>
//       </div>
//       <Toaster
//         position="top-center"
//         reverseOrder={false}
//         autoClose={3000}
//       />
//     </>
//   );
// }

// export default RegisterPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { server } from '../../server/server';
import { Button, Form, Input } from 'antd';
import toast, { Toaster } from 'react-hot-toast';
import Aos from 'aos';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    password: ''
  });
  const [form] = Form.useForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkIfUserExists = async (userName) => {
    try {
      const users = await server.getAllUsers();
      return users.map(item => item.user.userName).includes(userName);
    } catch (err) {
      console.error('Ошибка при проверке пользователя:', err);
      toast.error('Ошибка сервера при проверке логина.');
      return false;
    }
  };

  const settings = { theme: 'dark', notifications: true };


  const saveSettings = async (settings) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Можно проверять, например, содержимое settings
        if (settings && settings.theme && settings.notifications !== undefined) {
          const success = Math.random() > 0.3; // 70% шанс успеха
          if (success) {
            resolve('Settings saved');
          } else {
            reject(new Error('Failed to save settings'));
          }
        } else {
          reject(new Error('Invalid settings data'));
        }
      }, 1500);
    });
  };
  

  const handleSubmit = async () => {
    const isExist = await checkIfUserExists(formData.userName);
    if (isExist) {
      toast.warn('Этот ник уже занят. Пожалуйста, выберите другой.');
      return;
    }


    try {
      // Сначала показываем загрузку "сохранения настроек"
      await toast.promise(
        saveSettings(settings),
        {
          loading: 'Saving...',
          success: <b>Settings saved!</b>,
          error: <b>Could not save.</b>,
        }
      );

      // После сохранения выполняем регистрацию
      const data = {
        user: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          userName: formData.userName,
          role: 'user'
        },
        profile: [],
        education: [],
        experience: [],
        skills: [],
        languages: [],
        hobbies: [],
        password: formData.password,
        date: Math.floor(Date.now() / 1000)
      };

      const result = await server.createUser(data);
      toast.success(`Регистрация успешна! Добро пожаловать, ${result.user.firstName}!`);
      setTimeout(() => navigate('/login'), 2000);

    } catch (err) {
      console.error('Ошибка при регистрации:', err);
      toast.error('Не удалось зарегистрироваться. Попробуйте позже.');
    }
  };

  const goToLogin = () => navigate('/login');
  Aos.init();

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center register-box">
        <div className="p-8 rounded-3xl shadow-2xl backdrop-blur-lg bg-white/10 text-white text-2xl bg-sky-50 max-w-[90%] sm:max-w-md w-full sm:text-2xl text-base justify-items-center" data-aos="zoom-in">
          <Form form={form} onFinish={handleSubmit} variant="underlined" style={{ width: "auto" }}>
            <Form.Item name="firstName" rules={[{ required: true, message: 'Введите имя!' }]}>
              <Input
                className='ant_input'
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                style={{ backgroundColor: 'transparent', color: 'white' }}
              />
            </Form.Item>

            <Form.Item name="lastName" rules={[{ required: true, message: 'Введите фамилию!' }]}>
              <Input
                className='ant_input'
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                style={{ backgroundColor: 'transparent', color: 'white' }}
              />
            </Form.Item>

            <Form.Item name="userName" rules={[{ required: true, message: 'Введите ник!' }]}>
              <Input
                className='ant_input'
                name="userName"
                placeholder="User Name"
                value={formData.userName}
                onChange={handleChange}
                style={{ backgroundColor: 'transparent', color: 'white' }}
              />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: 'Введите пароль!' }]}>
              <Input.Password
                className='ant__input__password'
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
                style={{ backgroundColor: 'transparent', color: 'white' }}
              />
            </Form.Item>

            <div className='flex items-center'>
              <Button className='button' type="primary" htmlType="submit">
                Зарегистрироваться
              </Button>
              <Button type="button" onClick={goToLogin} style={{ marginLeft: 10, color: "white" }}>
                Войти
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default RegisterPage;
