import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../util/storage'
import FooterNavigation from '../components/FooterNavigation';
import Fade from '@material-ui/core/Fade';
import { db } from '../util/firebase'
import TypeWriterText from '../components/TypeWriterText';

const ThanksScreen = ( { navigateTo }) =>{

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
      navigateTo(option); 
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
            <TypeWriterText text="Thanks for sending this through, we'll be back in touch very soon!" onTextCompleted={setIsLoaded} />
          </p>
          <Fade direction="up" in={isLoaded} timeout={1000}>
          <div class="block">
            <div class="mt-2">
              
              {err_message && <span className="">{err_message}</span>}
            </div>
          </div>
          </Fade>
            
      </div>
  );
}

export default ThanksScreen;
