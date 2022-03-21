import React from 'react';

function ProgresBar({ step, hide }) {

  return (
    <div>
      {!hide &&
        <p>You are at {step}</p>
      }
    </div>
  );
}

export default ProgresBar;
