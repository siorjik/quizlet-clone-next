'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { toast } from 'react-toastify'

import Spinner from '@/components/Spinner'
import userIcon from '@/../public/images/user.svg'
import Button from '@/components/Button'

import apiService from '@/services/apiService'
import useFileStorage from '@/hooks/useFileStorage'

export default function ChangeImage() {
  const [image, setImage] = useState<{ file: File | null, url: string | ArrayBuffer | null }>({ file: null, url: null })
  const [isLoading, setLoading] = useState(false)

  const { data: session, update } = useSession()
  const { getAuthUrl } = useFileStorage()

  const getAuthUrlCallback = useCallback(() => getAuthUrl(session?.user?.image as string), [])

  useEffect(() => {
    if (session?.user?.image && !image.url) setImage({ ...image, url: getAuthUrlCallback() })
  }, [getAuthUrlCallback, session?.user?.image, image.url])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileMb = 1024 * 1024 * 10 // 10Mb

    if (e.target.files) {
      const file = e.target.files[0]
      const ext = file.name.substring(file.name.lastIndexOf('.') + 1)
      const isAllowedSize = file.size < fileMb

      if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
        toast.error('File type not supported! Need to be .png, .jpg or .jpeg', { position: 'bottom-center', type: 'error' })
        return
      }

      if (!isAllowedSize) {
        toast.error('File size too large! Need to be less than 10Mb', { position: 'bottom-center', type: 'error' })
        return
      }

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setImage({ file, url: reader.result })
      }
    }
  }

  const upload = async () => {
    setLoading(true)

    try {
      const res = await fetch('/api/files', {
        method: 'POST',
        body: JSON.stringify({ file: image.url }),
        headers: { 'X-File-Name': image.file?.name! }
      })

      if (!res.ok) throw new Error('Uploading error')

      const { url } = await res.json()

      if (!url) throw new Error('Uploaded image url not found')

      await apiService({ url: '/api/users', method: 'PATCH', body: { image: url } })

      update({ image: url })

      setImage({ file: null, url: getAuthUrl(url) })
      setLoading(false)

      toast.success('Image was uploaded', { position: 'bottom-center', type: 'success' })
    } catch (error) {
      console.log(error)

      const err = error as Error

      setLoading(false)

      toast.error(err.message || 'Something went wrong', { position: 'bottom-center', type: 'error' })
    }
  }

  const showControlBlock = image.url && !String(image.url).includes('https')

  return (
    <>
      <h3 className='mb-5'>Image updating:</h3>
      <div className='flex flex-col justify-center items-center'>
        <div>
          <input
            className='absolute h-[200px] w-[200px] opacity-0 cursor-pointer rounded-full'
            type='file'
            onChange={onChange}
          />
          <Image
            className='rounded-full border-4 border-pink-400 object-cover w-[200px] h-[200px]'
            src={image.url ?? userIcon}
            width={200}
            height={200}
            alt='user'
          />
          {showControlBlock && <div className='mt-5 gap-5 flex justify-center'>
            <Button click={() => setImage({ file: null, url: null })}>Cancel</Button>
            <Button click={upload}>Save</Button>
          </div>}
        </div>
        {isLoading && <Spinner />}
      </div>
    </>
  )
}
