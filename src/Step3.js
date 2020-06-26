import React, { useState, useEffect } from 'react';
import './App.css';

import FooterNav from './FooterNav';

function Step3 (props) {

  const [message, setMessage] = useState("");

  let options = {
    back_step: 'signup',
    next_step: '',
    finish_step: 'finish'
  }

  // useEffect to handle initialising
  useEffect(() => {
    
  }, []);

  return (
    <div>
      <div>
        <p>About you, so come on, how fucked really is your back?</p>
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

export default Step3;
