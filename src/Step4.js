import React, { useState, useEffect } from 'react';
import './App.css';

import FooterNav from './FooterNav';

function Step4 (props) {

  const [message, setMessage] = useState("");

  let options = {
    back_step: '',
    next_step: '',
    finish_step: ''
  }

  // useEffect to handle initialising
  useEffect(() => {
    
  }, []);

  return (
    <div>
      <div>
        <p>You're done....laters x</p>
      </div>
      <FooterNav step={props.step} nav={props.nav} options={options} />
    </div>
  );
}

export default Step4;
