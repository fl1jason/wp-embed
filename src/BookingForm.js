import React, { useState, useEffect } from 'react';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

import './App.css';

import ProgressBar from './ProgressBar';
import Header from './Header';

function BookingForm() {
  
  const [step, setStep] = useState("signin");

  const onSetNav = (nextStep) => {
    setStep(nextStep);
  }

  const renderStep = () =>{
      switch (step)
      {
            case 'signin': return (<Step1 nav={onSetNav} />);
            case 'signup': return (<Step2 nav={onSetNav} />);
            case 'about': return (<Step3 nav={onSetNav} />);
            case 'finish': return (<Step4 nav={onSetNav} />);
      }
  }

  return (
    <div className="App">
      <Header step={step} />
      <ProgressBar step={step} />
      {renderStep()}
    </div>
  );
}

export default BookingForm;
