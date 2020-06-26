import React, { useState, useEffect } from 'react';
import './App.css';

import FooterNav from './FooterNav';

function Step2 (props) {

  const [message, setMessage] = useState("");

  let options = {
    back_step: 'signin',
    next_step: 'about'
  }

  // useEffect to handle initialising
  useEffect(() => {
    
  }, []);

  return (
    <div>
    <div>
      <p>This is Step 2, here you can sign up</p>
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

export default Step2;
