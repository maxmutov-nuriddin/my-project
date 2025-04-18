import { Button } from 'antd';
import Aos from 'aos';
import React from 'react'

const ThirdPage = () => {
  Aos.init();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.reload();
  };

  return (
    <div data-aos="zoom-in">
      <Button type="primary" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  )
}

export default ThirdPage