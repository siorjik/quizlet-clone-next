'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import trashIcon from '@/../public/trash.svg'
import { SetType } from '@/types/SetTypes'
import { getSetAppPath, getSetApiPath } from '@/utils/paths'
import apiService from '@/services/apiService'

export default function SetList({ data }: { data: SetType[] }) {
  const [list, setList] = useState<SetType[]>([])

  const { push } = useRouter()

  useEffect(() => {
    setList(data)
  }, [data])

  const remove = async (e: React.MouseEvent<HTMLImageElement>, id: string): Promise<void> => {
    e.stopPropagation()
    
    await apiService({ url: `${getSetApiPath()}?id=${id}`, method: 'DELETE' })

    setList(list.filter(item => item._id !== id))
  }

  const handleClick = (id: string): void => push(getSetAppPath(id))

  return (
    <>
      {
        list.length ? list.map((item: SetType) => (
          <div
            key={item._id}
            className='p-5 mb-2 bg-zinc-100 rounded-lg hover:bg-zinc-200 cursor-pointer transition-all'
            onClick={() => handleClick(item._id as string)}
          >
            <div className='flex justify-between'>
              <span>{item.title}</span>
              <span><Image src={trashIcon} alt='delete' onClick={(e) => remove(e, item._id as string)} /></span>
            </div>
          </div>
        )) : <div className='mt-5 text-center'>No data yet...</div>
      }
    </>
  )
}
