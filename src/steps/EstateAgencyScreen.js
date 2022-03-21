import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../util/storage'
import FooterNavigation from '../components/FooterNavigation';
import Fade from '@material-ui/core/Fade';
import TypeWriterText from '../components/TypeWriterText';

import { useQuote } from '../hooks/useQuote'
import { db } from '../util/firebase'

import FeatureItem  from '../components/FeatureItem';

import availableFeatures from '../data/estateagent';

const EstateAgency = ( { navigateTo }) =>{

  const [id, setId] = useLocalStorage("id", "");
  const [isLoaded, setIsLoaded] = useState(false);
  const [err_message, setErrMessage] = useState("");

  const [features, setFeatures] = useState([]);

  const [ quote, setQuote] = useQuote(
    db
      .collection('quote')
      .doc(id)
    );

  // useEffect to handle initialising
  useEffect(() => {
    setFeatures(quote?.Features || []);
  }, [quote]);

  const ValidateStep = () =>{
    
    return (true);
  }

  const onStepBack = () =>
  {
    onSaveStep();
    navigateTo('new');
  }

  const onStepNext = () =>
  {
    if (ValidateStep())
    {
      onSaveStep();
      navigateTo('requirements');
    }
  }

  const onSelectFeature = (feature) =>{
    if (features.includes(feature))
    {
      const newFeature = features.filter(featureName => featureName !== feature);
      setFeatures(newFeature);
    }
    else
    {
      setFeatures(features => [...features, feature]);
    }
  }

  const onSaveStep = () =>{
    
    quote["EstateAgencyFeatures"] = features;
    setQuote(quote);
  }

  return (
     
      <div class="bg-gray-100 p-8">
                
          <p class="text-lg font-semibold">
          <TypeWriterText text="Brilliant, would any of the following be useful?" onTextCompleted={setIsLoaded} />  
          </p>
          
          <Fade direction="up" in={isLoaded} timeout={1000}>
          <div class="block">
            <div class="mt-2">
              
              {availableFeatures.map((feature, index) => (
                <FeatureItem feature={feature} features={features} onSelectFeature={onSelectFeature} />
              ))}
              
              {err_message && <span className="">{err_message}</span>}
            </div>
          </div>
          </Fade>
            
          <FooterNavigation onStepBack={onStepBack} onStepNext={onStepNext} />
          
      </div>
  );
}

export default EstateAgency;
