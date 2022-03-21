import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../util/storage'
import Fade from '@material-ui/core/Fade';
import TypeWriterText from '../components/TypeWriterText';
import FooterNavigation from '../components/FooterNavigation';

import { useQuote } from '../hooks/useQuote'
import { db } from '../util/firebase'

const Existing = ( { navigateTo }) =>{

  const [id, setId] = useLocalStorage("id", "");
  const [isLoaded, setIsLoaded] = useState(false);
  const [err_message, setErrMessage] = useState("");

  const [techStack, setTechStack] = useState("wordpress");

  const [ quote, setQuote] = useQuote(
    db
      .collection('quote')
      .doc(id)
    );

  // useEffect to handle initialising
  useEffect(() => {  
    setTechStack(quote?.TechStack ? quote?.TechStack : "wordpress");
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

      switch (techStack)
      {
        case "squarespace": case "wix": case "drupal": case "joomla":
          navigateTo('notsupported');
          break;

        default:
          navigateTo('domain-names');
          break;
      }
    }
  }

  const onSaveStep = () =>{
    quote["TechStack"] = techStack;
    setQuote(quote);
  }

  return (
     
      <div class="bg-gray-100 p-8">
                
          <p class="text-lg font-semibold">
            <TypeWriterText text="Perfect, so you've got a site already! <br />Do you know what technology your site is using?" onTextCompleted={setIsLoaded} />  
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
                    value="wordpress"
                    checked={techStack === 'wordpress'}
                    onChange={e => setTechStack(e.target.value)} 
                  />
                  <span class="ml-2">My site is a WordPress site</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio"
                    name="radio"
                    value="woocommerce"
                    checked={techStack === 'woocommerce'}
                    onChange={e => setTechStack(e.target.value)} 
                  />
                  <span class="ml-2">My site is a WooCommerce site</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio"
                    name="radio"
                    value="squarespace"
                    checked={techStack === 'squarespace'}
                    onChange={e => setTechStack(e.target.value)} 
                  />
                  <span class="ml-2">My site is a SquareSpace site</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio"
                    name="radio"
                    value="wix"
                    checked={techStack === 'wix'}
                    onChange={e => setTechStack(e.target.value)} 
                  />
                  <span class="ml-2">My site is a Wix site</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio"
                    name="radio"
                    value="drupal"
                    checked={techStack === 'drupal'}
                    onChange={e => setTechStack(e.target.value)} 
                  />
                  <span class="ml-2">My site is built with Drupal</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio"
                    name="radio"
                    value="joomla"
                    checked={techStack === 'joomla'}
                    onChange={e => setTechStack(e.target.value)} 
                  />
                  <span class="ml-2">My site is built with Joomla</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio"
                    name="radio"
                    value="custom"
                    checked={techStack === 'custom'}
                    onChange={e => setTechStack(e.target.value)} 
                  />
                  <span class="ml-2">My site is custom built</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio"
                    name="radio"
                    value="noidea"
                    checked={techStack === 'noidea'}
                    onChange={e => setTechStack(e.target.value)} 
                  />
                  <span class="ml-2">I've no idea, sorry!</span>
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

export default Existing;
