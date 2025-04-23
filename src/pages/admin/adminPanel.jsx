import React, { useEffect, useState } from 'react';
import { server } from '../../server/server';
import toast from 'react-hot-toast';
import UserTable from '../../components/section/adminPanelData';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const users = await server.getAllUsers();
      setUsers(users);
    } catch (err) {
      console.error('Ошибка при получении пользователей:', err);
      toast.error('Ошибка при загрузке пользователей.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdate = async (updatedData, id) => {
    const updatedUser = updatedData.find(user => user.id === id);
    if (!updatedUser) return;

    try {
      const result = await server.updateUser(id, updatedUser);
      toast.success('Роль пользователя обновлена.');
      console.log('Обновлённый пользователь:', result);
    } catch (err) {
      console.error('Ошибка при обновлении пользователя:', err);
      toast.error('Ошибка при обновлении пользователя.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await server.deleteUser(id);
      toast.success('Пользователь удалён.');
      fetchUsers();
    } catch (err) {
      console.error('Ошибка при удалении пользователя:', err);
      toast.error('Не удалось удалить пользователя.');
    }
  };

  return (
    <UserTable users={users} onUpdate={handleUpdate} onDelete={handleDelete} />
  );
};

export default AdminPanel;
