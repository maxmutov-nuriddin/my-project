import Aos from 'aos';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import EducationSection from '../../components/section/educationSection';
import PortfolioSection from '../../components/section/portfolioSection';
import ExperienceSection from '../../components/section/experienceSection';

const HomePage = () => {
  Aos.init();

  return (
    <div data-aos="zoom-in">
      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={3000}
      />
      <PortfolioSection />
      <EducationSection />
      <ExperienceSection />
    </div>
  );
}

export default HomePage;
