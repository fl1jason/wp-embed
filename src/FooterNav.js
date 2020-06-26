import React from 'react';

function FooterNav(props) {

  const renderOnClickBack = () =>{
    if ((props.options.back_step) && (props.options.back_step !== "")){
      return(<button onClick={e =>onClickBack(props.options.back_step)} className="button">BACK</button>);
    }
  }

  const renderOnClickNext = () =>{
    if ((props.options.next_step) && (props.options.next_step !== "")){
      return(<button onClick={e =>onClickNext(props.options.next_step)} className="button">NEXT</button>);
    }
  }

  const renderOnClickFinish = () =>{
    if ((props.options.finish_step) && (props.options.finish_step !== "")){
      return(<button onClick={e =>onClickFinish(props.options.finish_step)} className="button">FINISH</button>);
    }
  }
  

  const onClickBack = (step) =>{
    console.log(`Back was clicked, redirecting to ${step}`);
    props.nav(step);
  }

  const onClickNext = (step) =>{
    console.log(`Next was clicked, redirecting to ${step}`);
    props.nav(step);
  }

  const onClickFinish = (step) =>{
    console.log(`Finish was clicked, redirecting to ${step}`);
    props.nav(step);
  }

  return (
      <div className="footer-nav">
        {renderOnClickBack()}
        {renderOnClickNext()}
        {renderOnClickFinish()}
      </div>  
  );
}

export default FooterNav;
