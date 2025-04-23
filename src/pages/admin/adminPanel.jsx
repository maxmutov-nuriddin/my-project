import React, { useEffect, useState } from 'react';
import { server } from '../../server/server';
import toast from 'react-hot-toast';
import UserTable from '../../components/section/adminPanelData';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const users = await server.getAllUsers();
        setUsers(users);
      } catch (err) {
        console.error('Ошибка при проверке пользователей:', err);
        toast.error('Ошибка сервера при проверке данных пользователей.');
      }
    };

    checkAdmin();
  }, []);

  const handleUpdate = async (updatedData, id) => {
    const updatedUser = updatedData.find(user => user.id === id);
    
    if (!updatedUser) return;

    try {
      const result = await server.updateUser(id,updatedUser);
      toast.success('Роль пользователя обновлена.');
      console.log('Обновлённый пользователь:', result);
    } catch (err) {
      console.error('Ошибка при обновлении пользователя:', err);
      toast.error('Ошибка при обновлении пользователя.');
    }
  };

  return (
    <UserTable users={users} onUpdate={handleUpdate} />
  );
};

export default AdminPanel;
