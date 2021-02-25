import { useState, useEffect } from 'react';

export const useLocalStorage = ( key: string, defaultValue: any, subkey?: string ) => {
  const stored = localStorage.getItem( key );
  // const initial = stored ? JSON.parse( stored ) : defaultValue;
  const initial = stored ? subkey ? JSON.parse( stored )[subkey] : JSON.parse( stored ) : defaultValue
  const [value, setValue] = useState( initial );

  useEffect( () => {
    localStorage.setItem( key, JSON.stringify( value ) );
  }, [key, value] );

  return [value, setValue];
};