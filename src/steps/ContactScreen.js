import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../util/storage'
import FooterNavigation from '../components/FooterNavigation';
import Fade from '@material-ui/core/Fade';
import { db } from '../util/firebase'
import TypeWriterText from '../components/TypeWriterText';

import { useQuote } from '../hooks/useQuote'

const ContactScreen = ( { navigateTo }) =>{

  const [id, setId] = useLocalStorage("id", "");
  const [option, setOption] = useState("new");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const [isLoaded, setIsLoaded] = useState(false);
  const [err_message, setErrMessage] = useState("");

  const [ quote, setQuote] = useQuote(
    db
      .collection('quote')
      .doc(id)
    );

  // useEffect to handle initialising
  useEffect(() => {
    setOption(quote?.Option)
    setName(quote?.Name)
    setEmail(quote?.Email)
    setMessage(quote?.Message)
  }, [quote]);


  const ValidateStep = () =>{
    if (name === ''){
      setErrorName('Pleae enter your name');
    }
    if (email === ''){
      setErrorEmail('Pleae enter your Email address');
    }
    return (name !=='' && email !=='');
  }

  const onStepBack = () =>
  {
    onSaveStep();
    switch (option)
    {
      case 'new': navigateTo('features'); break;
      case 'existing': navigateTo('requirements'); break;
      default: navigateTo('intro'); break;
    }
  }

  const onStepFinish = () =>
  {
    if (ValidateStep())
    {
      onSaveStep();
      navigateTo('thank-you'); 
    }
  }

  const onSaveStep = () =>{
    quote["Name"] = `${name}`;
    quote["Email"] = `${email}`;
    quote["Message"] = `${message}`;
    
    setQuote(quote);
  }

  return (
      <div class="bg-gray-100 p-8">
          <p class="text-lg font-semibold">
            <TypeWriterText text="Thanks for all that. <br />Can you leave some contact details so we can get in touch?" onTextCompleted={setIsLoaded} />
          </p>
          <Fade direction="up" in={isLoaded} timeout={1000}>
          <div class="block">
          <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                  Name
                </label>
                <input 
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-first-name" 
                  type="text" 
                  placeholder="Jane" 
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  />
                {errorName && <p class="text-red-500 text-xs italic">{errorName}</p>}
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                  E-mail
                </label>
                <input 
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}  
                />
                {errorName && <p class="text-red-500 text-xs italic">{errorEmail}</p>}
                <p class="text-gray-600 text-xs italic">We need this so we can contact you with costs and options</p>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                  Message
                </label>
                <textarea 
                  class=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" 
                  id="message"
                  value={message}
                  onChange={(e)=>setMessage(e.target.value)}  
                  >
                </textarea>
              </div>
            </div>
          </form>
          </div>
          </Fade>
            
          <FooterNavigation onStepBack={onStepBack} onStepFinish={onStepFinish} />
          
      </div>
  );
}

export default ContactScreen;
