import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import toast from 'react-hot-toast';
import { server } from '../../server/server';
import Aos from 'aos';
import TextArea from 'antd/es/input/TextArea';

const SkillsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  const id = localStorage.getItem('authToken');

  const showModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      form.setFieldsValue({
        skillsName: item.skillsName,
        percent: item.percent,
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

    let updatedSkills;
    if (editingItem) {
      updatedSkills = data.skills.map((item) =>
        item === editingItem
          ? {
            skillsName: values.skillsName,
            percent: values.percent,
          }
          : item
      );
    } else {
      updatedSkills = [
        ...data.skills,
        {
          skillsName: values.skillsName,
          percent: values.percent,
        },
      ];
    }

    toast.promise(
      (async () => {
        setData((prevData) => ({ ...prevData, skills: updatedSkills }));
        await server.updateUserSkills(id, updatedSkills);
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
    const updatedSkills = data.skills.filter((i) => i !== item);

    toast.promise(
      (async () => {
        setData((prevData) => ({ ...prevData, skills: updatedSkills }));
        await server.updateUserSkills(id, updatedSkills);
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
        <h2>Skills</h2>
        <Button type="primary" onClick={() => showModal()}>
          ADD
        </Button>
      </div>

      <Modal
        title={editingItem ? "Edit skills Item" : "Add skills Item"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="skillsForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Skills Name"
            name="skillsName"
            rules={[{ required: true, message: 'Please input your skills name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="percent"
            name="percent"
            rules={[{ required: true, message: 'Please input the percent!' }]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingItem ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <div className="w-full max-w-[1142px] mx-auto py-12 flex flex-wrap justify-start items-start gap-4">
        {data && data.skills && data.skills.map((skills, index) => (
          <div
            key={index}
            className="group relative flex-[1_1_calc(33.333%-30px)] p-5 rounded-[28px] overflow-hidden bg-[#121212] transition-all cursor-pointer no-underline"
          >
            <div>
              <div
                className="absolute w-[128px] h-[128px] rounded-full top-[-75px] right-[-75px] transition-transform duration-500 group-hover:scale-[10]"
                style={{ backgroundColor: skills.color }}
              ></div>
              <h2 className="text-white text-2xl md:text-[30px] font-bold mb-6 relative z-10 group-hover:text-white">
                {skills.skillsName}
              </h2>
              <div className="text-white text-lg relative z-10">
                percent: <span className="font-bold text-[#f9b234] group-hover:text-white">{skills.percent}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4 relative z-10">
              <Button size="small" type="default" onClick={() => showModal(skills)}>Edit</Button>
              <Button size="small" danger onClick={() => handleDelete(skills)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SkillsSection;
