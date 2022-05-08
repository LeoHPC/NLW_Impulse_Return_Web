import { Popover } from '@headlessui/react';
import { ChatTeardropDots } from 'phosphor-react';

import { useColors } from '../hooks/ColorsContext';
import { WidgetForm } from './WidgetForm';
import { initReactI18next } from "react-i18next";
import PTBR from '../i18n/locales/pt/pt-br.json';
import ENUS from '../i18n/locales/en/en-us.json';

import i18n from "i18next";
import { useEffect } from 'react';

export function Widget() {
  const {
    applicationMainColor,
    language
  } = useColors();

  const resources = {
    'pt': PTBR,
    'en': ENUS
  }

  useEffect(() => {
    i18n
      .use(initReactI18next)
      .init({
        resources,
        lng: language,
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false
        }
      })
  }, [language]);

  return (
    <Popover className='absolute bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col items-end'>

      <Popover.Panel>
        <WidgetForm />
      </Popover.Panel>

      <Popover.Button
        className={`bg-${applicationMainColor} rounded-full px-[0.7rem] h-12 text-white flex : ;
                    items-center group hover:brightness-110 transition-colors`} >
        <ChatTeardropDots className='w-7 h-7' />
        <span className='max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear'>
          <span className='pl-2'>
            Feedback
          </span>
        </span>
      </Popover.Button>
    </Popover>
  )
}