import React from 'react'
import Button from "@material-tailwind/react/Button";

const FooterNavigation = ({onStepBack, onStepNext, onStepFinish}) =>{
  return (
    <div>
      <div className="mt-5 inline-flex">
        {onStepBack && 
          <Button 
            color="red"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="light"
            onClick={e =>onStepBack()} 
            className="button-fade">
              BACK
          </Button>
        }
        
        {onStepNext && 
          <Button 
            color="red"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="light"
            onClick={e =>onStepNext()} 
            className="button ml-2">
              NEXT
          </Button>
        }

        {onStepFinish && 
          <Button 
            color="red"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="light"
            onClick={e =>onStepFinish()} 
            className="button ml-2">
              FINISH
          </Button>
        }
      </div>  
    </div>
  )
}

export default FooterNavigation;