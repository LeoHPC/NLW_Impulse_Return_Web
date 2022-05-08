import moonImageUrl from '../assets/moon.svg';
import sunImageUrl from '../assets/sun.svg';
import { useColors } from "../hooks/ColorsContext";

import BrazilFlag from '../assets/br.png';
import USFlag from '../assets/us.png';

export function ColoredButtons() {
  const {
    setApplicationMainColor,
    theme,
    setTheme,
    language,
    setLanguage
  } = useColors();

  return (
    <>
      {
        language === 'en' ? (
          <button
            type="button"
            className="w-5 h-5 mr-1"
            onClick={() => {
              setLanguage('pt');
              localStorage.setItem('@Feedget:Language', 'pt');
            }}
          >
            <img src={BrazilFlag} alt="Bandeira do Brasil" />
          </button>
        ) : (
          <button
            type="button"
            className="w-5 h-5 mr-1"
            onClick={() => {
              setLanguage('en');
              localStorage.setItem('@Feedget:Language', 'en');
            }}
          >
            <img src={USFlag} alt="Bandeira do Estados Unidos" />
          </button>
        )
      }
      <button
        type="button"
        className="w-4 h-4 rounded-lg bg-red-700 hover:bg-red-600"
        onClick={() => {
          setApplicationMainColor('red-700');
          localStorage.setItem('@Feedget:Color', 'red-700');
        }}
      />
      <button
        type="button"
        className="w-4 h-4 rounded-lg bg-brand-500 hover:bg-brand-300"
        onClick={() => {
          setApplicationMainColor('brand-500');
          localStorage.setItem('@Feedget:Color', 'brand-500');
        }}
      />
      <button
        type="button"
        className="w-4 h-4 rounded-lg bg-amber-500 hover:bg-amber-500"
        onClick={() => {
          setApplicationMainColor('amber-500');
          localStorage.setItem('@Feedget:Color', 'amber-500');
        }}
      />
      <button
        type="button"
        className="w-4 h-4 rounded-lg bg-blue-500 hover:bg-blue-400"
        onClick={() => {
          setApplicationMainColor('blue-500');
          localStorage.setItem('@Feedget:Color', 'blue-500');
        }}
      />
      <button
        type="button"
        onClick={() => {
          if (theme === 'light') {
            setTheme('dark');
            localStorage.setItem('@Feedget:Theme', 'dark');
          } else {
            setTheme('light');
            localStorage.setItem('@Feedget:Theme', 'light');
          }
        }}
      >
        {
          theme === 'light' ? (
            <img src={moonImageUrl} alt="imagem de uma lua representado o tema escuro" className="w-7 h-7 ml-1 animate-pulse" />
          ) : (
            <img src={sunImageUrl} alt="imagem de um sol representado o tema claro" className="w-7 h-7 ml-1 animate-pulse" />
          )
        }
      </button>
    </>
  );
}