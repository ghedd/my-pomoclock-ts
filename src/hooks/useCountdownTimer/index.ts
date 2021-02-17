import { useState, useEffect } from "react";

const useCountdownTimer = ( isPaused: boolean, duration: number ) => {
  const DEFAULT_POM = 25;
  const [isDone, setDone] = useState( false );
  const [isReset, setReset] = useState( false )
  const [isRunning, setRunning] = useState( false );
  const [minute, setMinute] = useState( duration || DEFAULT_POM );
  const [secondOnly, setSecondOnly] = useState( minute * 60 )
  const [second, setSecond] = useState( 0 );

  // METHODS
  const resetTimer = () => {
    setReset( true )
  }
  /* --------------------------------------- */

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
    if ( isReset ) {
      setMinute( duration );
      setSecondOnly( duration * 60 )
      setSecond( 0 )
    }
    return () => {
      setReset( false )
    }
  }, [duration, isReset] )

  /* ------------ timer acttions ----------- */

  useEffect( () => {


    let timer: any;
    if ( isRunning && isReset === false ) {
      const mintoMilliseconds = ( min: number ) => min * 60000;
      const now = new Date().getTime();
      const countdowntDate = new Date( now + mintoMilliseconds( duration ) ).getTime();

      timer = setInterval( () => {
        const moment = new Date().getTime();
        let dis = countdowntDate - moment;

        let mins = Math.floor( ( dis % ( 1000 * 60 * 60 ) ) / ( 1000 * 60 ) );
        let secs = Math.floor( ( dis % ( 1000 * 60 ) ) / 1000 );
        setMinute( mins )
        setSecond( secs );
        setSecondOnly( secondOnly => Math.floor( dis / 1000 ) )
        if ( dis < 0 ) {
          setDone( true )
          return clearInterval( timer );

        }

      }, 990 )
      //NOTE: the interval was set just below 1000
      // to compansate for latency caused by
      // setInterval
    }

    return () => {
      clearInterval( timer );
    }
  }, [isRunning, isReset, duration] )
  /* --------------------------------------- */

  return { isRunning, minute, second, secondOnly, isDone, resetTimer }
}

export default useCountdownTimer