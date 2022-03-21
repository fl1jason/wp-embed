import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../util/storage'
import FooterNavigation from '../components/FooterNavigation';
import Fade from '@material-ui/core/Fade';
import TypeWriterText from '../components/TypeWriterText';

import { useQuote } from '../hooks/useQuote'
import { db } from '../util/firebase'

const New = ( { navigateTo }) =>{

  const [id, setId] = useLocalStorage("id", "");
  const [isLoaded, setIsLoaded] = useState(false);
  const [err_message, setErrMessage] = useState("");

  const [businessType, setBusinessType] = useState("Small Business");

  const [ quote, setQuote] = useQuote(
    db
      .collection('quote')
      .doc(id)
    );

  // useEffect to handle initialising
  useEffect(() => {
    setBusinessType(quote?.BusinessType ? quote?.BusinessType : "Small Business");
  }, [quote]);

  const ValidateStep = () =>{
    
    return (true);
  }

  const onStepBack = () =>
  {
    onSaveStep();
    navigateTo('intro');
  }

  const onStepNext = () =>
  {
    if (ValidateStep())
    {
      onSaveStep();
      switch (businessType)
      {
        case 'Online Shop': navigateTo('online-shop'); break;
        case 'Consultancy Training': navigateTo('consultancy-training'); break;
        case 'Estate Agent Property': navigateTo('estate-agency'); break;
        case 'Recruitment': navigateTo('recruitment'); break;
        case 'Healthcare or Pharma': navigateTo('healthcare'); break;
        case 'Technology': navigateTo('technology'); break;
        default: navigateTo('requirements'); break;
      }
    }
  }

  const onSaveStep = () =>{
    quote["BusinessType"] = businessType;
    setQuote(quote);
  }

  return (
     
      <div class="bg-gray-100 p-8">
                
          <p class="text-lg font-semibold">
          <TypeWriterText text="Ok, great. Can you tell us a bit more about your business?" onTextCompleted={setIsLoaded} />  
          </p>
          
          <Fade direction="up" in={isLoaded} timeout={1000}>
          <div class="block">
            <div class="mt-2">
              <div>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio"
                    name="radio"
                    value="Small Business"
                    checked={businessType === 'Small Business'}
                    onChange={e => setBusinessType(e.target.value)} 
                  />
                  <span class="ml-2">I'm a small business and a new a simple presence online</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio"
                    name="radio"
                    value="App or Platform"
                    checked={businessType === 'App or Platform'}
                    onChange={e => setBusinessType(e.target.value)} 
                  />
                  <span class="ml-2">I'm a business looking to build an App or software platform</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio"
                    name="radio"
                    value="Online Shop"
                    checked={businessType === 'Online Shop'}
                    onChange={e => setBusinessType(e.target.value)} 
                  />
                  <span class="ml-2">I'm looking to build an online shop or sell online</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio"
                    name="radio"
                    value="Consultancy Training"
                    checked={businessType === 'Consultancy Training'}
                    onChange={e => setBusinessType(e.target.value)} 
                  />
                  <span class="ml-2">I offer consultancy, training or coaching</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio"
                    name="radio"
                    value="Estate Agent Property"
                    checked={businessType === 'Estate Agent Property'}
                    onChange={e => setBusinessType(e.target.value)} 
                  />
                  <span class="ml-2">I'm an Estate Agent or in Property</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio"
                    name="radio"
                    value="Recruitment"
                    checked={businessType === 'Recruitment'}
                    onChange={e => setBusinessType(e.target.value)} 
                  />
                  <span class="ml-2">I'm in Resourcing or Recruitment</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio"
                    name="radio"
                    value="Healthcare or Pharma"
                    checked={businessType === 'Healthcare or Pharma'}
                    onChange={e => setBusinessType(e.target.value)} 
                  />
                  <span class="ml-2">I'm in Healthcare of Pharmaceutical</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio"
                    name="radio"
                    value="Technology"
                    checked={businessType === 'Technology'}
                    onChange={e => setBusinessType(e.target.value)} 
                  />
                  <span class="ml-2">I'm in Software or Technology</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio"
                    name="radio"
                    value="Other"
                    checked={businessType === 'Other'}
                    onChange={e => setBusinessType(e.target.value)} 
                  />
                  <span class="ml-2">I'm not really in any of the categories</span>
                </label>
              </div>
              {err_message && <span className="">{err_message}</span>}
            </div>
          </div>
          </Fade>
            
          <FooterNavigation onStepBack={onStepBack} onStepNext={onStepNext} />
          
      </div>
  );
}

export default New;
