import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../util/storage'
import Fade from '@material-ui/core/Fade';
import TypeWriterText from '../components/TypeWriterText';
import FooterNavigation from '../components/FooterNavigation';

import { useQuote } from '../hooks/useQuote'
import { db } from '../util/firebase'

const NotSupported = ( { navigateTo }) =>{

  const [id, setId] = useLocalStorage("id", "");
  const [isLoaded, setIsLoaded] = useState(false);
  const [err_message, setErrMessage] = useState("");

  const [notSupportedOption, setNotSupportedOption] = useState("recommend");
  const [techStack, setTechStack] = useState("");

  const [ quote, setQuote] = useQuote(
    db
      .collection('quote')
      .doc(id)
    );

  // useEffect to handle initialising
  useEffect(() => {  
    setNotSupportedOption(quote?.NotSupportedOption ? quote?.NotSupportedOption : "recommend");
    setTechStack(quote?.TechStack ? quote?.TechStack : "");
  }, [quote]);

  const ValidateStep = () =>{
    
    return (true);
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
    quote["NotSupportedOption"] = notSupportedOption;
    setQuote(quote);
  }

  return (
     
      <div class="bg-gray-100 p-8">
                
          <p class="text-lg font-semibold">
            {techStack && <TypeWriterText text={`Sorry, ${techStack} is a platform we don't work with, what would you like to do?`} onTextCompleted={setIsLoaded} />  }
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
                    value="recommend"
                    checked={notSupportedOption === 'recommend'}
                    onChange={e => setNotSupportedOption(e.target.value)} 
                  />
                  <span class="ml-2">Can you recommend someone that could help?</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio"
                    name="radio"
                    value="wordpress"
                    checked={notSupportedOption === 'wordpress'}
                    onChange={e => setNotSupportedOption(e.target.value)} 
                  />
                  <span class="ml-2">I'd be interested in migrating to WordPress</span>
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

export default NotSupported;
