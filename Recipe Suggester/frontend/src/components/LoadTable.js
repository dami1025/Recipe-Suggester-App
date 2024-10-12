// component that runs a function upon mounting. code from stack overflow
// https://stackoverflow.com/questions/58101018/react-calling-a-method-on-load-only-once

import React, {useEffect} from "react";
  
  function LoadTable(func){
    useEffect(()=>{
      func();
    }, [])
    return <div></div>
  }


  
  export default LoadTable