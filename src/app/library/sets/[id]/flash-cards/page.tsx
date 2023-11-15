'use client'

import { useEffect, useState, useRef } from 'react'
import { notFound } from 'next/navigation'
import Slider from 'react-slick'

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import leftIcon from '@/../public/chevron-left.svg'
import rightIcon from '@/../public/chevron-right.svg'

import BreadCrumbs from '@/components/Breadcrumbs'

import { getSetApiPath, getSetAppPath, libraryAppPath, setsAppPath } from '@/utils/paths'
import useSmartRequest from '@/hooks/useSmartRequest'
import { SetType } from '@/types/SetTypes'
import Spinner from '@/components/Spinner'
import useKeyPress from '@/hooks/useKeyPress'
import Image from 'next/image'

export default function FlashCards({ params }: { params: { id: string } }) {
  const [mode, setMode] = useState<'term' | 'definition'>('term')
  const [animation, setAnimation] = useState<string>('')
  const [counting, setCounting] = useState<{ all: number, current: number }>({ all: 0, current: 0 })

  const left = useKeyPress('ArrowLeft')
  const right = useKeyPress('ArrowRight')
  const up = useKeyPress('ArrowUp')
  const down = useKeyPress('ArrowDown')

  const { data, isLoading, error } = useSmartRequest<SetType>({
    key: `set/${params.id}`, url: `${getSetApiPath()}?id=${params.id}`, requiredProp: 'data', entity: 'set'
  })

  const sliderRef = useRef<Slider>(null)

  useEffect(() => {
    if (animation) {
      setTimeout(() => {
        setAnimation('')
        setMode(mode === 'term' ? 'definition' : 'term')
      }, 300)
    }
  }, [animation])

  useEffect(() => {
    if (data) setCounting({ all: data.list.length, current: 1 })
  }, [data])

  useEffect(() => {
    if (left) previous()
    if (right) next()
    if (up || down) setAnimation('animate-rotate-x animate-duration-500')
  }, [left, right, up, down])

  const { list, title } = data as SetType || []

  const { all, current } = counting

  const next = () => {
    if (current < all) setCounting({ ...counting, current: current + 1 })

    sliderRef.current?.slickNext()
  }

  const previous = () => {
    if (current > 1) setCounting({ ...counting, current: current - 1 })

    sliderRef.current?.slickPrev()
  }

  const breadCrumbsData: { title: string, path: string }[] = [
    {
      title: 'my library',
      path: libraryAppPath
    },
    {
      title: 'sets',
      path: setsAppPath
    },
    {
      title: 'set',
      path: getSetAppPath(params.id)
    }
  ]

  const settings = {
    infinite: false,
    swipeToSlide: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }

  const arrowStyle = 'p-2 border-solid border-black rounded-full border-2 cursor-pointer'

  if (isLoading) return <Spinner />
  else if (error) return notFound()

  return (
    <>
      <BreadCrumbs data={breadCrumbsData} />
      <h2 className='page-title'>{title}</h2>
      <div className='flex justify-center'>
        <Slider
          {...settings}
          ref={sliderRef}
          className={`w-[95%] ${animation ? '' : 'shadow-[20px_20px_25px_5px_rgba(0,0,0,0.1)] rounded-lg'}`}
        >
          {list.map((item, index) => (
            <div
              className={`h-60 p-5 !flex items-center justify-center bg-slate-100 cursor-pointer rounded-lg ${animation}`}
              key={index}
              onClick={() => setAnimation('animate-rotate-x animate-duration-500')}
            ><span className='text-2xl'>{item[mode]}</span>
            </div>
          ))}
        </Slider>
      </div>
      <div className='w-52 md:w-80 my-10 mx-auto flex justify-between items-center'>
        <span className={arrowStyle}><Image src={leftIcon} alt='left' onClick={previous} /></span>
        <div>{`${current} / ${all}`}</div>
        <span className={arrowStyle}><Image className='cursor-pointer' src={rightIcon} alt='right' onClick={next} /></span>
      </div>
    </>
  )
}
