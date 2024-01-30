'use client'

import { useRouter } from 'next/navigation'
import { memo } from 'react'

import TrashIcon from '@/components/Icon/TrashIcon'
import { SetType } from '@/types/SetTypes'
import { getSetAppPath } from '@/utils/paths'

export default memo(function SetList({ data, remove }: { data: SetType[], remove: (id: string) => Promise<void> }) {
  const { push } = useRouter()

  const deleteSet = async (e: React.MouseEvent<HTMLSpanElement>, id: string): Promise<void> => {
    e.stopPropagation()

    await remove(id)
  }

  const handleClick = (id: string): void => push(getSetAppPath(id))

  return (
    <>
      {
        data.length ? data.map((item: SetType) => (
          <div
            key={item._id}
            className='p-5 mb-2 bg-zinc-100 rounded-lg hover:bg-zinc-200 hover:mx-[-5px] cursor-pointer transition-all'
            onClick={() => handleClick(item._id as string)}
          >
            <div className='flex justify-between'>
              <div className='flex items-center w-[85%] whitespace-nowrap'>
                <span className='text-xs'>{item.list.length} items</span>
                &nbsp;|&nbsp;
                <span className='overflow-hidden text-ellipsis'>{item.title}</span>
              </div>
              <span onClick={async (e) => await deleteSet(e, item._id as string)}><TrashIcon /></span>
            </div>
          </div>
        )) : <div className='mt-5 text-center'>No data yet...</div>
      }
    </>
  )
})
