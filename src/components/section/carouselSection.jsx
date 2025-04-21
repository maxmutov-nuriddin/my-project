import React, { useState } from 'react';
import { Button, Modal, Checkbox, Form, Input } from 'antd';
import { toast } from 'react-toastify';
// import { Carousel } from 'antd';

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

  const courses = [
    {
      title: "UI/Web & Graph design for teenagers 11-17 years old",
      startDate: "04.11.2022",
      link: "https://example.com/teenagers-design"
    },
    {
      title: "UX/UI Web-Design + Mobile Design",
      startDate: "04.11.2022",
      link: "https://example.com/ux-ui-mobile"
    },
    {
      title: "Annual package 'Product+UX/UI+Graph designer 2022'",
      startDate: "04.11.2022",
      link: "https://example.com/product-uxui-graph"
    },
    {
      title: "Graphic Design",
      startDate: "04.11.2022",
      link: "https://example.com/graphic-design"
    },
    {
      title: "Motion Design",
      startDate: "30.11.2022",
      link: "https://example.com/motion-design"
    },
    {
      title: "Front-end development + jQuery + CMS",
      startDate: null,
      link: "https://example.com/frontend-jquery-cms"
    },
    {
      title: "Digital Marketing",
      startDate: null,
      link: "https://example.com/digital-marketing"
    },
    {
      title: "Interior Design",
      startDate: "31.10.2022",
      link: "https://example.com/interior-design"
    }
  ];


  const getBgColor = (index) => {
    const colors = [
      "#f9b234",
      "#3ecd5e",
      "#e44002",
      "#952aff",
      "#cd3e94",
      "#4c49ea",
    ];
    return colors[index % colors.length];
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
              label="Project Name"
              name="Name"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Data create"
              name="create"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Link"
              name="link"
              rules={[{ required: true, message: 'Please input your username!' }]}
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
      {/* <Carousel autoplay className="w-full border rounded-xl"> */}
      <div className="w-full max-w-[1142px] mx-auto py-12 flex flex-wrap justify-start items-start gap-4">
        {courses.map((course, index) => (
          <a
            key={index}
            href={course.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex-[1_1_calc(33.333%-30px)] p-5 rounded-[28px] overflow-hidden bg-[#121212] transition-all cursor-pointer no-underline"
          >
            <div
              className="absolute w-[128px] h-[128px] rounded-full top-[-75px] right-[-75px] transition-transform duration-500 group-hover:scale-[10]"
              style={{ backgroundColor: getBgColor(index) }}
            ></div>
            <h2 className="text-white text-2xl md:text-[30px] font-bold mb-6 relative z-10 group-hover:text-white">
              {course.title}
            </h2>
            {course.startDate && (
              <div className="text-white text-lg relative z-10">
                Start: <span className="font-bold text-[#f9b234] group-hover:text-white">{course.startDate}</span>
              </div>
            )}
          </a>
        ))}
      </div>
      {/* </Carousel> */}
    </>
  )
}

export default CarouselSection
