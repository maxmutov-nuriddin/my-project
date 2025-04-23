import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import toast from 'react-hot-toast';
import { server } from '../../server/server';
import Aos from 'aos';
import TextArea from 'antd/es/input/TextArea';

const HobbiesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  const id = localStorage.getItem('authToken');

  const showModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      form.setFieldsValue({
        hobbies: item.hobbies,
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

    let updatedHobbies;
    if (editingItem) {
      updatedHobbies = data.hobbies.map((item) =>
        item === editingItem
          ? {
            hobbies: values.hobbies,
          }
          : item
      );
    } else {
      updatedHobbies = [
        ...data.hobbies,
        {
          hobbies: values.hobbies,
        },
      ];
    }

    toast.promise(
      (async () => {
        setData((prevData) => ({ ...prevData, hobbies: updatedHobbies }));
        await server.updateUserHobbies(id, updatedHobbies);
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
    const updatedHobbies = data.hobbies.filter((i) => i !== item);

    toast.promise(
      (async () => {
        setData((prevData) => ({ ...prevData, hobbies: updatedHobbies }));
        await server.updateUserHobbies(id, updatedHobbies);
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
        <h2>Hobbies</h2>
        <Button type="primary" onClick={() => showModal()}>
          ADD
        </Button>
      </div>

      <Modal
        title={editingItem ? "Edit hobbies Item" : "Add hobbies Item"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="hobbiesForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Hobbies"
            name="hobbies"
            rules={[{ required: true, message: 'Please input the hobbies!' }]}
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
        {data && data.hobbies && data.hobbies.map((hobbies, index) => (
          <div
            key={index}
            className="group relative flex-[1_1_calc(33.333%-30px)] p-5 rounded-[28px] overflow-hidden bg-[#121212] transition-all cursor-pointer no-underline"
          >
            <div>
              <div
                className="absolute w-[128px] h-[128px] rounded-full top-[-75px] right-[-75px] transition-transform duration-500 group-hover:scale-[10]"
                style={{ backgroundColor: hobbies.color }}
              ></div>
              <div className="text-white text-lg relative z-10">
                Hobbies: <span className="font-bold text-[#f9b234] group-hover:text-white">{hobbies.hobbies}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4 relative z-10">
              <Button size="small" type="default" onClick={() => showModal(hobbies)}>Edit</Button>
              <Button size="small" danger onClick={() => handleDelete(hobbies)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HobbiesSection;
