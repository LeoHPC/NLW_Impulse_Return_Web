import { useState } from "react";
import { useTranslation } from "react-i18next";

import bugImageUrl from '../../assets/bug.svg';
import ideiaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';
import { useColors } from "../../hooks/ColorsContext";
import { ColoredButtons } from "../ColoredButtons";
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
    theme
  } = useColors();

  const { t } = useTranslation();

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className={`${theme === 'light' ? 'bg-zinc-200' : 'bg-zinc-900'}
                    p-4 relative rounded-2xl mb-4 flex flex-col items-center 
                    shadow-lg w-[calc(100vw-2rem)] md:w-auto`}>

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

      <footer className="text-xs text-neutral-400 justify-between items-center flex flex-row w-full px-3">
        <span className={`${theme === 'light' ? 'text-zinc-800' : 'text-zinc-200'}`}>
          {t('Feito por')} <a className="underline underline-offset-2" href="https://github.com/LeoHPC">@LeoHPC</a>
        </span>
        <div className="flex gap-1 items-center justify-center">
          <ColoredButtons />
        </div>
      </footer>
    </div>
  );
}