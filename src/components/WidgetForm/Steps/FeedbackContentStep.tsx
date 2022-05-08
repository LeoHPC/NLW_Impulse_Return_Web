import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import { FeedbackType, feedbackTypes } from ".."
import { useColors } from "../../../hooks/ColorsContext";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton"
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const {
    applicationMainColor,
    theme
  } = useColors();

  const { t } = useTranslation();

  async function handleSubmitFeedback(event: FormEvent) {
    setIsSendingFeedback(true);

    event.preventDefault();

    await api.post('feedbacks', {
      type: feedbackType,
      comment,
      screenshot
    })

    setIsSendingFeedback(false);
    onFeedbackSent();
  }

  return (
    <>
      <header>

        <button
          type="button"
          className={`top-5 left-5 absolute ${theme === 'light' ? 'text-zinc-800 hover:text-zinc-600' : 'text-zinc-400 hover:text-zinc-100'}`}
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="h-4 w-4" />
        </button>

        <span className={`text-xl leading-6 flex items-center gap-2 ${theme === 'light' ? 'text-zinc-800' : 'text-zinc-200'}`}>
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {t(`${feedbackTypeInfo.title}`)}
        </span>

        <CloseButton />
      </header>

      <form
        onSubmit={handleSubmitFeedback}
        className="my-4 w-full"
      >
        <textarea
          className={`min-w-[304px] w-full min-h-[112px] text-sm ${theme === 'light' ? 'placeholder-zinc-700 text-zinc-800'
            : 'placeholder-zinc-400 text-zinc-100'} border-zinc-600 bg-transparent rounded-md 
                  focus:border-${applicationMainColor} focus:ring-${applicationMainColor} focus:ring-1 
                  focus:outline-none resize-none scrollbar-thumb-zinc-700
                  scrollbar-track-transparent scrollbar-thin`}
          placeholder={feedbackType === 'BUG' ? t('Está tendo problemas? Conte para nós com mais detalhes!')
            : feedbackType === 'IDEIA' ? t('Tem alguma ideia bacana para nos dizer? Conta pra gente!')
              : t('Conte com detalhes o que está acontecendo para que possamos analisar posteriormente!')
          }
          onChange={event => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />

          <button
            disabled={comment.length === 0 || isSendingFeedback}
            type="submit"
            className={`p-2 bg-${applicationMainColor} rounded-md border-transparent flex-1 
                      flex justify-center items-center text-sm hover:border-${applicationMainColor}
                      focus:outline-none focus:ring-2 focus:ring-offset-2
                      focus:ring-offset-zinc-900 focus:ring-${applicationMainColor}
                      transition-colors disabled:opacity-50 disabled:brightness-75`}
          >
            {isSendingFeedback ? <Loading /> : t('Enviar feedback')}
          </button>
        </footer>
      </form>
    </>
  )
}