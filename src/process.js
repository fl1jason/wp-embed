import React, { useState, useEffect } from 'react';

import Intro from './steps/IntroScreen';
import New from './steps/NewSiteScreen';
import Existing from './steps/ExistingScreen';
import DomainNames from './steps/DomainNameScreen';
import NotSupported from './steps/NotSupportedScreen';
import Requirements from './steps/RequirementsScreen';
import Features from './steps/FeaturesScreen';
import Contact from './steps/ContactScreen';
import OnlineShop from './steps/OnlineShopScreen';
import Consultancy from './steps/ConsultancyTrainingScreen';
import EstateAgency from './steps/EstateAgencyScreen';
import Recruitment from './steps/RecruitmentScreen'
import Training from './steps/TrainingScreen';
import Thanks from './steps/ThanksScreen';

import './App.css';

import ProgressBar from './components/ProgressBar';
import Header from './components/Header';

function Process() {
  
  const [step, setStep] = useState("intro");

  const onSetNav = (nextStep) => {
    setStep(nextStep);
  }

  const renderStep = () =>{
      switch (step)
      {
        case 'intro': return (<Intro navigateTo={onSetNav} />);
        case 'new': return (<New navigateTo={onSetNav} />);
        case 'existing': return (<Existing navigateTo={onSetNav} />);
        case 'notsupported': return (<NotSupported navigateTo={onSetNav} />);
        case 'features': return (<Features navigateTo={onSetNav} />);
        case 'domain-names': return (<DomainNames navigateTo={onSetNav} />);
        case 'requirements': return (<Requirements navigateTo={onSetNav} />);
        case 'contact': return (<Contact navigateTo={onSetNav} />);
        case 'online-shop': return (<OnlineShop navigateTo={onSetNav} />);
        case 'recruitment': return (<Recruitment navigateTo={onSetNav} />);
        case 'consultancy-training': return (<Consultancy navigateTo={onSetNav} />);
        case 'estate-agency': return (<EstateAgency navigateTo={onSetNav} />);
        case 'thank-you': return (<Thanks navigateTo={onSetNav} />);
        case 'training': return (<Training navigateTo={onSetNav} />);
      }
  }

  return (
    <>
      <Header step={step} />
      <ProgressBar step={step} hide={true} />
      {renderStep()}
    </>
  );
}

export default Process;
