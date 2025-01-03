'use client'

import { useRouter } from 'next/navigation'

import TrashIcon from '@/components/Icon/TrashIcon'

import { SetType } from '@/types/SetTypes'
import { getSetApiPath, getSetAppPath } from '@/utils/paths'
import apiService from '@/services/apiService'
import { languageOptions } from '@/utils/constants'

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
          p-5 mb-2 bg-zinc-100 dark:bg-zinc-500 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600
          cursor-pointer md:hover:!scale-[1.02] transition-all
        `}
        onClick={() => handleClick(_id as string)}
      >
        <div className='flex justify-between gap-5'>
          <div className='flex items-center w-[88%] md:w-[93%] whitespace-nowrap'>
            <div className='text-xs'>{list.length} items</div>
            &nbsp;|&nbsp;
            {
              data.source && data.target
              && <>
                <div className='text-xs'>
                  from {languageOptions.find(({ value }) => value === data.source)?.label}
                  &nbsp;to {languageOptions.find(({ value }) => value === data.target)?.label}
                </div>
                &nbsp;|&nbsp;
              </>
            }
            <div className='overflow-hidden text-ellipsis'>{title}</div>
          </div>
          <div className='w-[20px]' onClick={async (e) => await remove(e, _id as string)}><TrashIcon /></div>
        </div>
      </div>
    </>
  )
}
