import Aos from 'aos';
import React from 'react';
import { Toaster } from 'react-hot-toast';

import EducationSection from '../../components/section/educationSection';
import PortfolioSection from '../../components/section/portfolioSection';
import ExperienceSection from '../../components/section/experienceSection';
import SkillsSection from '../../components/section/skillsSection';

const HomePage = () => {
  Aos.init();

  return (
    <div data-aos="zoom-in">
      <Toaster
        position="top-center"
        reverseOrder={false}
        autoClose={3000}
      />
      <PortfolioSection />
      <EducationSection />
      <ExperienceSection />
      <SkillsSection />
    </div>
  );
}

export default HomePage;
