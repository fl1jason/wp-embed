import React from 'react';

import Spinner from 'react-spinner-material';

const LoadingProgress = () =>{

    return(
    <div>
    <Spinner radius={20} color={"#333"} stroke={2} visible={true} />
    </div>
    )
}


export default LoadingProgress;
