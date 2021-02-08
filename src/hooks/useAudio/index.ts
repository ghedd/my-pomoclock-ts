import { useState, useEffect } from "react";


export const useAudio = ( audioLink: string ) => {
  const [audio] = useState( new Audio( audioLink ) );
  const [isPlaying, setPlaying] = useState( false );

  const playAudio = () => {
    setPlaying( true );
  }

  useEffect( () => {
    isPlaying ? audio.play() : audio.pause()

  }, [isPlaying, audio] )

  useEffect( () => {
    audio.addEventListener( "ended", () => {
      setPlaying( false )
    } );
    return () => {
      audio.removeEventListener( "ended", () => setPlaying( false ) )
    }
  }, [audio] )
  return { playAudio }
}

