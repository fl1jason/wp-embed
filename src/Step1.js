import React, { useState, useEffect } from 'react';
import './App.css';

import FooterNav from './FooterNav';

function Step1 (props) {

  const [message, setMessage] = useState("");

  let options = {
    back_step: '',
    next_step: 'signup'
  }

  // useEffect to handle initialising
  useEffect(() => {
    
  }, []);

  useEffect(() => {
    
  }, [message]);

  return (
    <div>
      <div id="content">
      <p>This is Step 1</p>
        <input 
            type="text" 
            onChange={e => setMessage(e.target.value)} 
            value={message} 
        />
        </div>
        <FooterNav step={props.step} nav={props.nav} options={options} />
    </div>
  );
}

export default Step1;
