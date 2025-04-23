import React, { useState, useEffect } from 'react';
import { Table, Checkbox } from 'antd';

const UserTable = ({ users, onUpdate, onDelete }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(users);
  }, [users]);

  const handleRoleChange = (checked, record) => {
    const updated = data.map(user =>
      user.id === record.id
        ? {
          ...user,
          user: {
            ...user.user,
            role: checked ? 'admin' : 'user',
          },
        }
        : user
    );
    setData(updated);
    if (onUpdate) {
      onUpdate(updated, record.id);
    }
  };

  const columns = [
    {
      title: 'Имя',
      dataIndex: ['user', 'firstName'],
      key: 'firstName',
    },
    {
      title: 'Фамилия',
      dataIndex: ['user', 'lastName'],
      key: 'lastName',
    },
    {
      title: 'Образование',
      key: 'education',
      render: (_, record) => record.education.length,
    },
    {
      title: 'Опыт',
      key: 'experience',
      render: (_, record) => record.experience.length,
    },
    {
      title: 'Навыки',
      key: 'skills',
      render: (_, record) => record.skills.length,
    },
    {
      title: 'Языки',
      key: 'languages',
      render: (_, record) => record.languages.length,
    },
    {
      title: 'Хобби',
      key: 'hobbies',
      render: (_, record) => record.hobbies.length,
    },
    {
      title: 'Портфолио',
      key: 'portfolio',
      render: (_, record) => record.portfolio.length,
    },
    {
      title: 'Роль',
      key: 'role',
      render: (_, record) => (
        <Checkbox
          checked={record.user.role === 'admin'}
          onChange={(e) => handleRoleChange(e.target.checked, record)}
        />
      ),
    },
    {
      title: 'Удалить',
      key: 'delete',
      render: (_, record) => (
        <button
          onClick={() => {
            if (onDelete) {
              onDelete(record.id);
            }
          }}
        >
          Удалить
        </button>
      ),
    },
  ];

  return (
    <Table
      className="my-13"
      dataSource={data}
      columns={columns}
      rowKey="id"
    />
  );
};

export default UserTable;
