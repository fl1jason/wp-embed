import React from 'react';

function ProgresBar(props) {

  return (
      <div className="progress">
        You are at Step {props.step}
      </div>
  );
}

export default ProgresBar;
