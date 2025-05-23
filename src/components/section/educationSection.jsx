import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import toast, { Toaster } from 'react-hot-toast';
import { server } from '../../server/server';
import Aos from 'aos';

const EducationSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  const id = localStorage.getItem('authToken');

  const showModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      form.setFieldsValue({
        educationName: item.educationName,
        specialty: item.specialty,
        startDate: item.startDate,
        endDate: item.endDate,
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

    let updatedEducation;
    if (editingItem) {
      updatedEducation = data.education.map(item =>
        item === editingItem
          ? { educationName: values.educationName, startDate: values.startDate, endDate: values.endDate, specialty: values.specialty }
          : item
      );
    } else {
      updatedEducation = [
        ...data.education,
        { educationName: values.educationName, startDate: values.startDate, endDate: values.endDate, specialty: values.specialty },
      ];
    }

    toast.promise(
      (async () => {
        setData(prevData => ({ ...prevData, education: updatedEducation }));
        await server.updateUserEducation(id, updatedEducation);
      })(),
      {
        loading: 'Сохранение данных...',
        success: editingItem ? 'Успешно обновлено!' : 'Успешно добавлено!',
        error: 'Не удалось сохранить. Попробуйте позже.',
      }
    );
    setIsModalOpen(false);
  };


  const handleDelete = async (item) => {
    if (!data) return;

    const updatedEducation = data.education.filter(i => i !== item);

    toast.promise(
      (async () => {
        setData(prevData => ({ ...prevData, education: updatedEducation }));
        await server.updateUserEducation(id, updatedEducation);
      })(),
      {
        loading: 'Удаление...',
        success: 'Удалено успешно!',
        error: 'Не удалось удалить. Попробуйте позже.',
      }
    );
  };


  return (
    <>
      <div className='flex justify-between items-center my-6'>
        <h2>Education</h2>
        <Button type="primary" onClick={() => showModal()}>
          ADD
        </Button>
      </div>

      <Modal
        title={editingItem ? "Edit Education Item" : "Add Education Item"}
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
            label="Education Name"
            name="educationName"
            rules={[{ required: true, message: 'Please input your project name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Specialty"
            name="specialty"
            rules={[{ required: true, message: 'Please input the project link!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: 'Please input the project creation date!' }]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: 'Please input the project creation date!' }]}
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
        {data && data.education && data.education.map((course, index) => (
          <div
            key={index}
            className="group relative flex-[1_1_calc(33.333%-30px)] p-5 rounded-[28px] overflow-hidden bg-[#121212] transition-all cursor-pointer no-underline"
          >
            <div>
              <div
                className="absolute w-[128px] h-[128px] rounded-full top-[-75px] right-[-75px] transition-transform duration-500 group-hover:scale-[10]"
                style={{ backgroundColor: course.color }}
              ></div>
              <h2 className="text-white text-2xl md:text-[30px] font-bold mb-6 relative z-10 group-hover:text-white">
                {course.educationName}
              </h2>
              <div className="text-white text-lg relative z-10">
                Specialty: <span className="font-bold text-[#f9b234] group-hover:text-white">{course.specialty}</span>
              </div>
              <div className="text-white text-lg relative z-10">
                Start date: <span className="font-bold text-[#f9b234] group-hover:text-white">{course.startDate}</span>
              </div>
              <div className="text-white text-lg relative z-10">
                End date: <span className="font-bold text-[#f9b234] group-hover:text-white">{course.endDate}</span>
              </div>
            </div>
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

export default EducationSection;
