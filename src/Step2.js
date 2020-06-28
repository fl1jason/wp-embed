import React, { useState, useEffect } from 'react';
import {useLocalStorage} from './storage';
import './App.css';

function Step2 (props) {

  const [userName, setUserName] = useLocalStorage("username", "Jason");
  const [err_name, setErrName] = useState("");

  // useEffect to handle initialising
  useEffect(() => {
    
  }, []);

  const ValidateStep = () =>{
    if (userName === ''){
      setErrName('You must enter your name');
    }
    return (userName !=='');
  }

  const onStepBack = () =>
  {
    props.nav('signin');
  }

  const onStepNext = () =>
  {
    if (ValidateStep())
    {
      props.nav('about');
    }
  }

  return (
    <div>
      <div>
        <p>Ok, that's great, now tell us your name</p>
          <input 
              type="text" 
              onChange={e => setUserName(e.target.value)} 
              value={userName} 
          />
          <span className="input-error">{err_name}</span>
      </div>
      <div className="footer-nav">
        <button onClick={e =>onStepBack()} className="button">BACK</button>
        <button onClick={e =>onStepNext()} className="button">NEXT</button>
      </div>  
    </div>
  );
}

export default Step2;
