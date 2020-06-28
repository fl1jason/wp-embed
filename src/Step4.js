import React, { useState, useEffect } from 'react';
import {useLocalStorage} from './storage';
import './App.css';

function Step4 (props) {

  const message = useLocalStorage("message", "");
  const name    = useLocalStorage("username", "");
  const bio     = useLocalStorage("bio", "");
  const data    = useLocalStorage("", "");

  // useEffect to handle initialising
  useEffect(() => {
    
  }, []);

  return (
    <div>
      <div>
        <p>You're done....laters x</p>
        <p>So, you know your name is {name}, and you're {bio} and you're telling us {message}</p>
      </div>
    </div>
  );
}

export default Step4;
