import moonImageUrl from '../assets/moon.svg';
import sunImageUrl from '../assets/sun.svg';
import { useColors } from "../hooks/ColorsContext";

export function ColoredButtons() {
  const {
    setApplicationMainColor,
    theme,
    setTheme
  } = useColors();

  return (
    <>
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