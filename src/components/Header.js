import React from 'react';

const ProgresBar = (props) => {

  const renderHeading = () =>{
    switch (props.step)
    {
          case 'signin': return ("Sign In to Booking Process");
          case 'signup': return ("Sign Up as a new user");
          case 'about': return ("About you");
    }
  }

  return (
      <div className="progress">
        {renderHeading()}
      </div>
  );
}

export default ProgresBar;
