import { FeedbackType, feedbackTypes } from "..";
import { useColors } from "../../../hooks/ColorsContext";
import { CloseButton } from "../../CloseButton";

interface FeedbackTypeStepProps {
  onFeedbackTypeChanged: (type: FeedbackType) => void
}

export function FeedbackTypeStep({ onFeedbackTypeChanged }: FeedbackTypeStepProps) {
  const {
    applicationMainColor,
    theme
  } = useColors();

  return (
    <>
      <header>
        <span className={`text-xl leading-6 ${theme === 'light' ? 'text-zinc-800' : 'text-zinc-200'}`}>Deixe seu feedback</span>

        <CloseButton />
      </header>

      <div className="flex py-8 gap-2 w-full">
        {
          Object.entries(feedbackTypes).map(([key, value]) => {
            return (
              <button
                key={key}
                className={`${theme === 'light' ? 'bg-zinc-300' : 'bg-zinc-800'} rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 
                          border-2 border-transparent ${applicationMainColor === 'red-700' ? 'hover:border-red-700 focus:border-red-700' :
                    `${applicationMainColor}` === 'brand-500' ? 'hover:border-brand-500 focus:border-brand-500' : `${applicationMainColor}`
                      === 'amber-500' ? 'hover:border-amber-500 focus:border-amber-500' : 'hover:border-blue-500 focus:border-blue-500'}
                          focus:outline-none`}
                type="button"
                onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
              >
                <img src={value.image.source} alt={value.image.alt} />
                <span className={`${theme === 'light' ? 'text-zinc-800' : 'text-zinc-200'}`}>{value.title}</span>
              </button>
            )
          })
        }
      </div>
    </>
  )
}