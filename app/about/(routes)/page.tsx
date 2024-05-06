"use client";

import React from 'react';
import Introduction from './components/Introduction';
import Offers from './components/Offerings';
import Team from './components/Team';

const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-full">
      <Introduction />
      <Offers/>
      <Team/>
    </div>
  );
};

export default AboutPage;
