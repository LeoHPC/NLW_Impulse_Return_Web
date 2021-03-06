import html2canvas from 'html2canvas';
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";

import { useColors } from '../../hooks/ColorsContext';
import { Loading } from "../Loading";

interface ScreenshotButtonProps {
  screenshot: string | null;
  onScreenshotTook: (screenshot: string | null) => void
}

export function ScreenshotButton({ screenshot, onScreenshotTook }: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  const {
    applicationMainColor,
    theme
  } = useColors();

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector('html')!);
    const base64image = canvas.toDataURL('image/png');

    onScreenshotTook(base64image);
    setIsTakingScreenshot(false);
  }

  if (screenshot) {
    return (
      <button
        type="button"
        onClick={() => onScreenshotTook(null)}
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end 
                  text-zinc-400 hover:text-zinc-100 transition-colors"
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 180
        }}
      >
        <Trash weight="fill" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className={`p-2 ${theme === 'light' ? 'bg-zinc-300 hover:bg-zinc-400' : 'bg-zinc-800 hover:bg-zinc-700'}
              rounded-md border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
              focus:ring-offset-zinc-900 ${applicationMainColor === 'red-700' ? 'focus:ring-red-700' :
          `${applicationMainColor}` === 'brand-500' ? 'focus:ring-brand-500' : `${applicationMainColor}`
            === 'amber-500' ? 'focus:ring-amber-500' : 'focus:ring-blue-500'}  text-zinc-800 dark:text-zinc-100`}
    >
      {
        isTakingScreenshot ?
          <Loading />
          :
          <Camera className="w-6 h-6" />
      }
    </button>
  )
}