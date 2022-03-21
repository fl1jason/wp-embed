import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../util/storage'
import Fade from '@material-ui/core/Fade';
import Input from "@material-tailwind/react/Input";
import TypeWriterText from '../components/TypeWriterText';
import FooterNavigation from '../components/FooterNavigation';

import { useQuote } from '../hooks/useQuote'
import { db } from '../util/firebase'

const DomainNames = ( { navigateTo }) =>{

  const [id, setId] = useLocalStorage("id", "");
  const [isLoaded, setIsLoaded] = useState(false);
  const [err_message, setErrMessage] = useState("");

  const [domains, setDomains] = useState("");

  const [ quote, setQuote] = useQuote(
    db
      .collection('quote')
      .doc(id)
    );

  // useEffect to handle initialising
  useEffect(() => {
    setDomains(quote?.Domains)
  }, [quote]);

  const ValidateStep = () =>{
    
    if (domains === ''){
      setErrMessage(`please enter your website's web address`);
    }
    return (domains !=='');
  }

  const onStepBack = () =>
  {
    onSaveStep();
    navigateTo('existing');
  }

  const onStepNext = () =>
  {
    if (ValidateStep())
    {
      onSaveStep();
      navigateTo('requirements');
    }
  }

  const onSaveStep = () =>{
    quote["Domains"] = domains;
    setQuote(quote);
  }

  return (
     
      <div class="bg-gray-100 p-8">
                
          <p class="text-lg font-semibold">
            <TypeWriterText text="Ok, that's it for the technical requirements. <br />Now let's talk about the domain names. <br />What's the web address of your website(s)?" onTextCompleted={setIsLoaded} />  
          </p>
        
          <Fade direction="up" in={isLoaded} timeout={1000}>
          <div class="block">
            <div class="mt-2">
              <Input
                type="text"
                color="lightBlue"
                size="regular"
                outline={false}
                placeholder="e.g. www.yourwebsite.com"
                value={domains} 
                className="flex-grow px-5 text-sm bg-transparent outline-none" 
                onChange={(e)=>setDomains(e.target.value)}
              />    
              {err_message && <span className="">{err_message}</span>}
            </div>
          </div>
          </Fade>
            
          <FooterNavigation onStepBack={onStepBack} onStepNext={onStepNext} />
          
      </div>
  );
}

export default DomainNames;
