'use client'

import { useRouter } from 'next/navigation'

import TrashIcon from '@/components/Icon/TrashIcon'

import { SetType } from '@/types/SetTypes'
import { getSetApiPath, getSetAppPath } from '@/utils/paths'
import apiService from '@/services/apiService'

export default function SetItem({ data }: { data: SetType }) {
  const { _id, title, list } = data
  const { push, refresh } = useRouter()

  const handleClick = (id: string): void => push(getSetAppPath(id))

  const remove = async (e: React.MouseEvent<HTMLSpanElement>, id: string): Promise<void> => {
    e.stopPropagation()

    await apiService({ url: `${getSetApiPath()}?id=${id}`, method: 'DELETE' })

    refresh()
  }

  return (
    <>
      <div
        className={`
          p-5 mb-2 bg-zinc-100 rounded-lg hover:bg-zinc-200 hover:mx-[-5px]
          cursor-pointer animate-fade-down animate-ease-in-out transition-all
        `}
        onClick={() => handleClick(_id as string)}
      >
        <div className='flex justify-between'>
          <div className='flex items-center w-[85%] whitespace-nowrap'>
            <span className='text-xs'>{list.length} items</span>
            &nbsp;|&nbsp;
            <span className='overflow-hidden text-ellipsis'>{title}</span>
          </div>
          <span onClick={async (e) => await remove(e, _id as string)}><TrashIcon /></span>
        </div>
      </div>
    </>
  )
}
