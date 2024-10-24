'use client'

import { useEffect, useState, useRef } from 'react'
import Slider from 'react-slick'

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import leftIcon from '@/../public/images/chevron-left.svg'
import rightIcon from '@/../public/images/chevron-right.svg'

import { SetType } from '@/types/SetTypes'
import useKeyPress from '@/hooks/useKeyPress'
import Image from 'next/image'

export default function SliderComp({ data }: { data: SetType }) {
  const [mode, setMode] = useState<'term' | 'definition'>('term')
  const [animation, setAnimation] = useState<string>('')
  const [counting, setCounting] = useState<{ amount: number, current: number }>({ amount: 0, current: 0 })
  const [isShowContent, setShowContent] = useState(true)

  const left = useKeyPress('ArrowLeft')
  const right = useKeyPress('ArrowRight')
  const up = useKeyPress('ArrowUp')
  const down = useKeyPress('ArrowDown')

  const sliderRef = useRef<Slider>(null)

  const xAnimation = 'animate-rotate-x'
  const yAnimation = 'animate-rotate-y'

  useEffect(() => {
    if (animation) {
      if (isShowContent) {
        setShowContent(false)

        setTimeout(() => setShowContent(true), 350)
      }

      if (animation === yAnimation && mode !== 'term') setMode('term')

      setTimeout(() => {
        setAnimation('')

        if (animation === xAnimation) setMode(mode === 'term' ? 'definition' : 'term')
      }, 300)
    }
  }, [animation])

  useEffect(() => {
    if (data) setCounting({ amount: data.list.length, current: 1 })
  }, [data])

  useEffect(() => {
    if (up || down) setAnimation(xAnimation)
  }, [up, down])

  useEffect(() => {
    if (left) previous()
    if (right) next()
  }, [left, right])

  const { list } = data as SetType || []

  const { amount, current } = counting

  const next = (): void => {
    if (current < amount) {
      setCounting({ ...counting, current: current + 1 })
      setAnimation(yAnimation)
    }


    sliderRef.current?.slickNext()
  }

  const previous = (): void => {
    if (current > 1) {
      setCounting({ ...counting, current: current - 1 })
      setAnimation(yAnimation)
    }

    sliderRef.current?.slickPrev()
  }

  const settings = {
    infinite: false,
    swipeToSlide: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    className: `
      w-[280px] sm:w-[550px] md:w-[680px] lg:w-[900px]
      ${animation ? '' : 'shadow-[20px_20px_25px_5px_rgba(0,0,0,0.1)] rounded-lg'}
    `
  }

  const arrowStyle = 'p-2 border-solid border-slate-300 rounded-full border-2 cursor-pointer'

  return (
    <>
      <div className='flex justify-center'>
        <Slider
          {...settings}
          ref={sliderRef}
        >
          {list.map((item, index) => (
            <div
              className={`
                h-60 lg:h-[400px] p-5 !flex items-center justify-center bg-slate-100 cursor-pointer rounded-lg ${animation}
              `}
              key={index}
              onClick={() => setAnimation(xAnimation)}
            ><span className='text-2xl text-center'>{isShowContent ? item[mode] : ''}</span>
            </div>
          ))}
        </Slider>
      </div>
      <div className='w-52 md:w-80 my-10 mx-auto flex justify-between items-center'>
        <span className={arrowStyle}><Image src={leftIcon} alt='left' onClick={previous} /></span>
        <div>{`${current} / ${amount}`}</div>
        <span className={arrowStyle}><Image className='cursor-pointer' src={rightIcon} alt='right' onClick={next} /></span>
      </div>
    </>
  )
}
