import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import toast from 'react-hot-toast';
import { server } from '../../server/server';
import Aos from 'aos';
import TextArea from 'antd/es/input/TextArea';

const ExperienceSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  const id = localStorage.getItem('authToken');

  const showModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      form.setFieldsValue({
        projectName: item.projectName,
        technologies: item.technologies,
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

  const onFinishFailed = (errorInfo) => {
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

    let updatedExperience;
    if (editingItem) {
      updatedExperience = data.experience.map((item) =>
        item === editingItem
          ? {
            projectName: values.projectName,
            technologies: values.technologies,
            startDate: values.startDate,
            endDate: values.endDate,
          }
          : item
      );
    } else {
      updatedExperience = [
        ...data.experience,
        {
          projectName: values.projectName,
          technologies: values.technologies,
          startDate: values.startDate,
          endDate: values.endDate,
        },
      ];
    }

    toast.promise(
      (async () => {
        setData((prevData) => ({ ...prevData, experience: updatedExperience }));
        await server.updateUserExperience(id, updatedExperience);
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
    const updatedExperience = data.experience.filter((i) => i !== item);

    toast.promise(
      (async () => {
        setData((prevData) => ({ ...prevData, experience: updatedExperience }));
        await server.updateUserExperience(id, updatedExperience);
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
        <h2>Experience</h2>
        <Button type="primary" onClick={() => showModal()}>
          ADD
        </Button>
      </div>

      <Modal
        title={editingItem ? "Edit Experience Item" : "Add Experience Item"}
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
            name="projectName"
            rules={[{ required: true, message: 'Please input your project name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Technologies"
            name="technologies"
            rules={[{ required: true, message: 'Please input the project technologies!' }]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: 'Please input the project start date!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: 'Please input the project end date!' }]}
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
        {data && data.experience && data.experience.map((experience, index) => (
          <div
            key={index}
            className="group relative flex-[1_1_calc(33.333%-30px)] p-5 rounded-[28px] overflow-hidden bg-[#121212] transition-all cursor-pointer no-underline"
          >
            <div>
              <div
                className="absolute w-[128px] h-[128px] rounded-full top-[-75px] right-[-75px] transition-transform duration-500 group-hover:scale-[10]"
                style={{ backgroundColor: experience.color }}
              ></div>
              <h2 className="text-white text-2xl md:text-[30px] font-bold mb-6 relative z-10 group-hover:text-white">
                {experience.projectName}
              </h2>
              <div className="text-white text-lg relative z-10">
                Technologies: <span className="font-bold text-[#f9b234] group-hover:text-white">{experience.technologies}</span>
              </div>
              <div className="text-white text-lg relative z-10">
                Start date: <span className="font-bold text-[#f9b234] group-hover:text-white">{experience.startDate}</span>
              </div>
              <div className="text-white text-lg relative z-10">
                End date: <span className="font-bold text-[#f9b234] group-hover:text-white">{experience.endDate}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4 relative z-10">
              <Button size="small" type="default" onClick={() => showModal(experience)}>Edit</Button>
              <Button size="small" danger onClick={() => handleDelete(experience)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExperienceSection;
