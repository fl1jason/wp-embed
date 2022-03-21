import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../util/storage'
import FooterNavigation from '../components/FooterNavigation';
import Fade from '@material-ui/core/Fade';
import { db } from '../util/firebase'
import TypeWriterText from '../components/TypeWriterText';

const Intro = ( { navigateTo }) =>{

  const [id, setId] = useLocalStorage("id", "");
  const [option, setOption] = useState("new");
  const [quote, setQuote] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [err_message, setErrMessage] = useState("");

  // useEffect to handle initialising
  useEffect(() => {
    const quote = { Option: option }
    if ((!id) && (db))
    {
      db.collection("quote").add({quote})
      .then((docRef)=> {
        setQuote(quote);
        setId(docRef.id);
        //setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    }
    else
    {
      db.collection('quote').doc(id).get()
      .then((docRef) => { 
        const data = docRef.data();
        setQuote(data.quote);
        setOption(data.quote.Option)
        //setIsLoaded(true);
      })
    }
  }, []);

  const ValidateStep = () =>{
    if (option === ''){
      setErrMessage('You must select an option');
    }
    return (option !=='');
  }

  const onStepNext = () =>
  {
    if (ValidateStep())
    {
      onSaveStep();

      switch (option)
      {
        case 'advice': navigateTo('requirements'); break;
        default:  navigateTo(option); 
      }
    }
  }

  const onSaveStep = () =>{
    quote["Option"] = option;
    if (db)
    { 
      db.collection("quote").doc(id).set({quote})
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
    }
  }

  return (
      <div class="bg-gray-100 p-8">
          <p class="text-lg font-semibold">
            <TypeWriterText text="Welcome to FL1 Digital, how can we help you?" onTextCompleted={setIsLoaded} />
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
                    value="new"
                    checked={option === 'new'}
                    onChange={e => setOption(e.target.value)} 
                  />
                  <span class="ml-2">I'm looking to build a new website</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio"
                    name="radio"
                    value="existing"
                    checked={option === 'existing'}
                    onChange={e => setOption(e.target.value)} 
                  />
                  <span class="ml-2">I have an existing website and need some help or work on it</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio"
                    name="radio"
                    value="training"
                    checked={option === 'training'}
                    onChange={e => setOption(e.target.value)} 
                  />
                  <span class="ml-2">I'm looking for some training</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio"
                    name="radio"
                    value="advice"
                    checked={option === 'advice'}
                    onChange={e => setOption(e.target.value)} 
                  />
                  <span class="ml-2">I'm looking for some general advice</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio"
                    name="radio"
                    value="contact"
                    checked={option === 'contact'}
                    onChange={e => setOption(e.target.value)} 
                  />
                  <span class="ml-2">None of these, I'd like to speak to someone</span>
                </label>
              </div>
              {err_message && <span className="">{err_message}</span>}
            </div>
          </div>
          </Fade>
            
          <FooterNavigation onStepNext={onStepNext} />
          
      </div>
  );
}

export default Intro;
