'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import trashIcon from '@/../public/trash.svg'
import { SetType } from '@/types/SetTypes'
import { getSetPath, setApiPath } from '@/app/utils/paths'
import apiService from '@/services/apiService'

export default function SetList({ data }: { data: SetType[] }) {
  const [list, setList] = useState<SetType[]>(data)

  const { push } = useRouter()

  const remove = async (e: React.MouseEvent<HTMLImageElement>, id: string) => {
    e.stopPropagation()
    
    await apiService({ url: setApiPath, method: 'delete', body: { id } })

    setList(list.filter(item => item.id !== id))
  }

  const handleClick = (id: string) => push(getSetPath(id))

  return (
    <>
      {
        list.length ? list.map((item: SetType) => (
          <div
            key={item.id}
            className='p-5 mb-2 bg-zinc-100 rounded-lg hover:bg-zinc-200 cursor-pointer transition-all'
            onClick={() => handleClick(item.id as string)}
          >
            <div className='flex justify-between'>
              <span>{item.title}</span>
              <span><Image src={trashIcon} alt='delete' onClick={(e) => remove(e, item.id as string)} /></span>
            </div>
          </div>
        )) : <div className='mt-5 text-center'>No data yet...</div>
      }
    </>
  )
}
