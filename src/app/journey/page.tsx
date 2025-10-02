import HeroSection from '@/components/Journey/HeroSection';
import Steps from '@/components/Journey/Steps';
import React from 'react';

const Journey = () => {
  return (
    <div>
      <HeroSection />
      <Steps />
      <section className='min-h-screen flex items-center justify-center'>
        <h2 className='text-2xl font-bold'>UNDER CONSTRUCTION</h2>
      </section>
    </div>
  );
};

export default Journey;
