import React, { useState } from 'react';
import { Button, Modal, Checkbox, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import { Carousel } from 'antd';
import img from '../../img/image.png'
import img2 from '../../img/Screenshot_3.png'
import img3 from '../../img/Screenshot_4.png'

const CarouselSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = values => {
    toast.success('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    toast.error('Failed:', errorInfo);
  };

  return (
    <>
      <div className='flex justify-between justify-items-center items-center my-6'>
        <h2 className=''>Portfolio</h2>
        <Button type="primary" onClick={showModal}>
          ADD
        </Button>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Carousel autoplay className="w-full border rounded-xl">
        {[img, img2, img3].map((src, index) => (
          <div
            key={index}
            className="relative group w-full h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden rounded-xl"
          >
            <img
              src={src}
              alt="youtube website"
              className="absolute inset-0 w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-80 flex flex-col justify-center items-center transition-opacity duration-300 rounded-xl">
              <h3 className="text-white text-base md:text-lg font-semibold text-center">Название проекта</h3>
              <a
                href="#"
                className="mt-2 px-3 py-1 md:px-4 md:py-2 bg-white text-black rounded hover:bg-gray-200 transition"
              >
                Смотреть
              </a>
            </div>
          </div>
        ))}
      </Carousel>
    </>
  )
}

export default CarouselSection
