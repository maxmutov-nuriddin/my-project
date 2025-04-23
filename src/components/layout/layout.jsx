import { Layout, Menu, Button } from "antd";
import Aos from "aos";
import { Toaster } from "react-hot-toast";
import { Link, Outlet } from "react-router-dom";

const { Header, Content, Footer } = Layout;



const items = [
  {
    key: "1",
    label: <Link to="/home">Home</Link>,
  },
  {
    key: "2",
    label: <Link to="/Second">About</Link>,
  },
  {
    key: "3",
    label: <Link to="/Third">Setting</Link>,
  }
];



const LayoutPage = () => {
  return (
    <Layout className="">
      <Header className="layout-box fixed w-full z-40">
        <div className="logo ">
          <Link to="/home">
            <img src="/src/assets/ChatGPT Image 17 апр. 2025 г., 00_35_42 (1) (1).png" alt="Logo" style={{ height: "70px" }} />
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
          className="layout-box"
        />
      </Header>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Content className='custom-content my-13'>
        <div className="container">
          <Outlet />
        </div>
      </Content>

      <Footer className="custom-content fixed w-full z-40 inset-x-0 bottom-0" style={{ textAlign: "center" }} >
        <span className="layout-span__text">CV base</span> ©{new Date().getFullYear()} Created by <span className="layout-span__text"><u>FWB</u></span>
      </Footer>
    </Layout>
  );
};

export default LayoutPage;
