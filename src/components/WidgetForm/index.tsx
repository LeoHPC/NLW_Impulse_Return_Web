import { useState } from "react";

import bugImageUrl from '../../assets/bug.svg';
import ideiaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';
import { useColors } from "../../hooks/ColorsContext";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Imagem de um inseto'
    }
  },
  IDEIA: {
    title: 'Ideia',
    image: {
      source: ideiaImageUrl,
      alt: 'Imagem de uma lâmpada'
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImageUrl,
      alt: 'Imagem de um balão de pensamento'
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {

  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const {
    setApplicationMainColor
  } = useColors();

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-200 dark:bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center 
                    shadow-lg w-[calc(100vw-2rem)] md:w-auto">

      {
        feedbackSent ? (
          <FeedbackSuccessStep
            onFeedbackRestartRequested={handleRestartFeedback}
          />
        ) : (
          <>
            {
              !feedbackType ?
                <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                :
                <FeedbackContentStep
                  feedbackType={feedbackType}
                  onFeedbackRestartRequested={handleRestartFeedback}
                  onFeedbackSent={() => setFeedbackSent(true)}
                />
            }
          </>
        )
      }

      <footer className="text-xs text-neutral-400 justify-between flex flex-row w-full px-3">
        <span className="text-zinc-700 dark:text-zinc-200">
          Feito por <a className="underline underline-offset-2" href="https://github.com/LeoHPC">@LeoHPC</a>
        </span>
        <div className="flex gap-1">
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
        </div>
      </footer>
    </div>
  );
}