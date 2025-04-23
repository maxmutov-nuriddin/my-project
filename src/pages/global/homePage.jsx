import Aos from 'aos';
import React from 'react';
import { Toaster } from 'react-hot-toast';

import EducationSection from '../../components/section/educationSection';
import PortfolioSection from '../../components/section/portfolioSection';
import ExperienceSection from '../../components/section/experienceSection';
import SkillsSection from '../../components/section/skillsSection';
import HobbiesSection from '../../components/section/hobbiesSection';
import LanguagesSection from '../../components/section/languagesSection';

const HomePage = () => {
  Aos.init();

  return (
    <div data-aos="zoom-in">
      <PortfolioSection />
      <EducationSection />
      <ExperienceSection />
      <SkillsSection />
      <LanguagesSection />
      <HobbiesSection />
    </div>
  );
}

export default HomePage;
