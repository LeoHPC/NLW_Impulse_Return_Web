import React, { createContext, useContext, useState } from 'react';

interface ContextProps {
  applicationMainColor: string;
  setApplicationMainColor: (color: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

interface Props {
  children: React.ReactNode
}

const ColorsContext = createContext({} as ContextProps);

function ColorsProvider({ children }: Props) {
  const [applicationMainColor, setApplicationMainColor] = useState(
    localStorage.getItem('@Feedget:Color') ?
      String(localStorage.getItem('@Feedget:Color')) : 'brand-500'
  );
  const [theme, setTheme] = useState(
    localStorage.getItem('@Feedget:Theme') ?
      String(localStorage.getItem('@Feedget:Theme')) : 'white'
  )

  return (
    <ColorsContext.Provider value={{
      applicationMainColor,
      setApplicationMainColor,
      theme,
      setTheme
    }}>
      {children}
    </ColorsContext.Provider>
  )
}

function useColors(): ContextProps {
  const context = useContext(ColorsContext);

  if (!context) {
    throw new Error('useColors must be used within an ColorsProvider');
  }

  return context;
}

export { ColorsProvider, useColors }

