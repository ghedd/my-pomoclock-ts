import { useState, useEffect } from "react";

const useCountdownTimer = ( isRunning: boolean, isReset = false, duration: number, isDone: boolean ) => {
  const DEFAULT_POM = 25;

  const [minute, setMinute] = useState( duration || DEFAULT_POM );
  const [second, setSecond] = useState( 0 );


  useEffect( () => {
    if ( isDone ) {
      return setMinute( duration );
    }

    return () => {
      setMinute( 0 )
    }
  }, [duration, isDone] )

  useEffect( () => {
    let timer: any;
    if ( isRunning ) {
      timer = setInterval( () => {
        setSecond( second - 1 );
        if ( second === 0 ) {
          setSecond( 59 );
          setMinute( minute - 1 );
        }
        /*  if ( ( second === 0 && minute === 0 ) ) {
           setSecond( 0 );
           // setMinute( duration || DEFAULT_POM )
         } */

      }, 1000 )
    }
    if ( isReset ) {
      setSecond( 0 );
      setMinute( duration )
    }

    return () => {
      clearInterval( timer );
    }
  }, [duration, isRunning, isReset, minute, second] )

  return { isRunning, minute, second }
}

export default useCountdownTimer