import { Popover } from '@headlessui/react';
import { ChatTeardropDots } from 'phosphor-react';

import { useColors } from '../hooks/ColorsContext';
import { WidgetForm } from './WidgetForm';

export function Widget() {
  const {
    applicationMainColor
  } = useColors()

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