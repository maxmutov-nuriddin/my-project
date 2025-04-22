import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import { server } from '../../server/server';
import Aos from 'aos';
import TextArea from 'antd/es/input/TextArea';

const PortfolioSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  const id = localStorage.getItem('authToken');

  const showModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      form.setFieldsValue({
        name: item.name,
        description: item.description,
        link: item.link,
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinishFailed = errorInfo => {
    toast.error('Failed:', errorInfo);
  };

  useEffect(() => {
    Aos.init();

    const getUserDataId = async (id) => {
      try {
        const userId = await server.getUserById(id);
        setData(userId);
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (id) {
      getUserDataId(id);
    }
  }, [id]);

  const handleSubmit = async (values) => {
    if (!data) return;

    let updatedPortfolio;
    if (editingItem) {
      updatedPortfolio = data.portfolio.map(item =>
        item === editingItem
          ? { name: values.name, description: values.description, link: values.link }
          : item
      );
    } else {
      updatedPortfolio = [
        ...data.portfolio,
        { name: values.name, description: values.description, link: values.link },
      ];
    }

    try {
      setData(prevData => ({ ...prevData, portfolio: updatedPortfolio }));
      await server.updateUserPortfolio(id, updatedPortfolio);
      toast.success(editingItem ? 'Успешно обновлено!' : 'Успешно добавлено!');
      setIsModalOpen(false);
    } catch (err) {
      console.error('Ошибка при добавлении/обновлении:', err);
      toast.error('Не удалось сохранить. Попробуйте позже.');
    }
  };

  const handleDelete = async (item) => {
    if (!data) return;
    const updatedPortfolio = data.portfolio.filter(i => i !== item);
    try {
      setData(prevData => ({ ...prevData, portfolio: updatedPortfolio }));
      await server.updateUserPortfolio(id, updatedPortfolio);
      toast.success('Удалено успешно!');
    } catch (err) {
      console.error('Ошибка при удалении:', err);
      toast.error('Не удалось удалить. Попробуйте позже.');
    }
  };

  return (
    <>
      <div className='flex justify-between items-center my-6'>
        <h2>Portfolio</h2>
        <Button type="primary" onClick={() => showModal()}>
          ADD
        </Button>
      </div>

      <Modal
        title={editingItem ? "Edit Portfolio Item" : "Add Portfolio Item"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="portfolioForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Project Name"
            name="name"
            rules={[{ required: true, message: 'Please input your project name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input the project description!' }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            label="Link"
            name="link"
            rules={[{ required: true, message: 'Please input the project link!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingItem ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <div className="w-full max-w-[1142px] mx-auto py-12 flex flex-wrap justify-start items-start gap-4">
        {data && data.portfolio && data.portfolio.map((course, index) => (
          <div
            key={index}
            className="group relative flex-[1_1_calc(33.333%-30px)] p-5 rounded-[28px] overflow-hidden bg-[#121212] transition-all cursor-pointer no-underline"
          >
            <a
              href={course.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div
                className="absolute w-[128px] h-[128px] rounded-full top-[-75px] right-[-75px] transition-transform duration-500 group-hover:scale-[10]"
                style={{ backgroundColor: course.color }}
              ></div>
              <h2 className="text-white text-2xl md:text-[30px] font-bold mb-6 relative z-10 group-hover:text-white">
                {course.name}
              </h2>
              <div className="text-white text-lg relative z-10">
                Created: <span className="font-bold text-[#f9b234] group-hover:text-white">{course.description}</span>
              </div>
            </a>
            <div className="flex gap-2 mt-4 relative z-10">
              <Button size="small" type="default" onClick={() => showModal(course)}>Edit</Button>
              <Button size="small" danger onClick={() => handleDelete(course)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PortfolioSection;
