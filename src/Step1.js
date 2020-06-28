import React, { useState, useEffect } from 'react';
import {useLocalStorage} from './storage';
import './App.css';

function Step1 (props) {

  const [message, setMessage] = useLocalStorage("message", "");
  const [err_message, setErrMessage] = useState("");

  // useEffect to handle initialising
  useEffect(() => {
    
  }, []);

  useEffect(() => {
    
  }, [message]);

  const ValidateStep = () =>{
    if (message === ''){
      setErrMessage('You must enter a Message');
    }
    return (message !=='');
  }

  const onStepNext = () =>
  {
    if (ValidateStep())
    {
      props.nav('signup');
    }
  }

  return (
    <div>
      <div id="content">
        <p>This is Step 1</p>

        <p>What Message would you like to give us?</p>
        <input 
            type="text" 
            onChange={e => setMessage(e.target.value)} 
            value={message} 
        />
        <span className="input-error">{err_message}</span>
      </div>
      <div className="footer-nav">
        <button onClick={e =>onStepNext()} className="button">NEXT</button>
      </div>  
    </div>
  );
}

export default Step1;
