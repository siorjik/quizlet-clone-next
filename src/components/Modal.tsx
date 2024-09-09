'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import Button from './Button'

type ModalPropsType = {
  isShow: boolean,
  close: () => void,
  title?: string,
  content: React.ReactElement
}

export default function Modal({ isShow, close, title, content }: ModalPropsType) {
  const [animation, setAnimation] = useState('')
  const [isShowModal, setShowModal] = useState(false)

  useEffect(() => {
    if (isShow) {
      setAnimation('animate-fade-down')
      setShowModal(true)
    } else {
      setAnimation('animate-fade-up animate-reverse')
      setTimeout(() => setShowModal(false), 1000)
    }
  }, [isShow])

  const modalContent = (
    <div
      className={`
        min-w-80 md:min-w-[500px] max-w-3xl max-h-[calc(100dvh-150px)] ${animation}
        px-10 py-5 overflow-auto flex flex-col bg-violet-200 rounded-md animate-ease-in
      `}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
    >
      {title && <h3 className='mb-5 pb-5 border-b border-violet-300 text-xl'>{title}</h3>}
      <div>{content}</div>
      <div className='mt-5 pt-5 border-t border-violet-300'>
        <Button click={close} hoverColor='hover:bg-violet-300'>Close</Button>
      </div>
    </div>
  )

  const layout = (
    <div
      className='fixed top-0 h-[100dvh] w-full z-40 flex justify-center items-center bg-violet-200/[0.5]'
      onClick={() => close()}
    >
      {modalContent}
    </div>
  )

  return (
    <>
      {isShowModal ? createPortal(layout, document?.body as Element) : null}
    </>
  )
}
