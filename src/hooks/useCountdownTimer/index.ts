import { useState, useEffect } from "react";

const useCountdownTimer = ( isPaused: boolean, duration: number, isReset = false, ) => {
  const DEFAULT_POM = 25;
  const [isDone, setDone] = useState( false );
  const [isRunning, setRunning] = useState( false );
  const [minute, setMinute] = useState( duration || DEFAULT_POM );
  const [secondOnly, setSecondOnly] = useState( minute * 60 )
  const [second, setSecond] = useState( 0 );

  useEffect( () => {
    if ( isPaused ) {
      setRunning( false );
    } else {
      setRunning( true )
    }

  }, [isPaused] )

  useEffect( () => {
    if ( isDone ) {
      setRunning( false )
      // return () => setMinute( duration );
    }

    return () => {
      setMinute( duration )
      setDone( false )
    }
  }, [duration, isDone] )

  useEffect( () => {
    let timer: any;
    if ( isRunning ) {
      timer = setInterval( () => {
        setSecond( second - 1 );
        setSecondOnly( secondOnly => secondOnly - 1 )
        if ( second === 0 ) {
          setSecond( 59 );
          setMinute( minute - 1 );
        }
        if ( ( second === 0 && minute === 0 ) ) {
          setSecond( 0 );
          setSecondOnly( 0 );
          setDone( true )
          // setMinute( duration || DEFAULT_POM )
        }

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

  return { isRunning, minute, second, secondOnly, isDone }
}

export default useCountdownTimer