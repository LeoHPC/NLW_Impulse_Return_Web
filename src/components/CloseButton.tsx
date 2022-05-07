import { Popover } from '@headlessui/react'
import { X } from 'phosphor-react'

import { useColors } from '../hooks/ColorsContext'

export function CloseButton() {
  const {
    theme
  } = useColors();

  return (
    <Popover.Button className={`top-5 right-5 absolute text-zinc-400
    ${theme === 'light' ? 'hover:text-zinc-700' : 'hover:text-zinc-100'}`} title='Fechar formulário de feedback'>
      <X className='w-4 h-4' weight='bold' />
    </Popover.Button>
  )
}