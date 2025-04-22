import Aos from 'aos';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import CarouselSection from '../../components/section/carouselSection';
import EducationSection from '../../components/section/educationSection';

const HomePage = () => {
  Aos.init();

  return (
    <div data-aos="zoom-in">
      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={3000}
      />
      <CarouselSection />
      <EducationSection />
    </div>
  );
}

export default HomePage;
