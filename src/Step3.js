import React, { useState, useEffect } from 'react';
import {useLocalStorage} from './storage';
import './App.css';

function Step3 (props) {

  const [bio, setBio] = useLocalStorage("bio", "");
  const username = useLocalStorage("username", "");
  const [err_bio, setErrBio] = useState("");

  // useEffect to handle initialising
  useEffect(() => {
    
  }, []);

  const ValidateStep = () =>{
    if (bio === ''){
      setErrBio('You must enter a Bio');
    }
    return (bio !=='');
  }

  const onStepBack = () =>
  {
    props.nav('signup');
  }

  const onStepFinish = () =>
  {
    if (ValidateStep())
    {
      props.nav('finish');
    }
  }

  return (
    <div>
      <div>
        <p>Perfect, thanks {username}, now tell us a little something about yourself?</p>
          <input 
            type="text" 
            onChange={e => setBio(e.target.value)} 
            value={bio} 
          />
          <span className="input-error">{err_bio}</span>
      </div>
      <div className="footer-nav">
        <button onClick={e =>onStepBack()} className="button">BACK</button>
        <button onClick={e =>onStepFinish()} className="button">FINISH</button>
      </div>  
    </div>
  );
}

export default Step3;
