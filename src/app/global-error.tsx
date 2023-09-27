'use client'

import Button from '@/components/Button'
import Link from 'next/link'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.log(error)
  return (
    <html>
      <body className='flex flex-col justify-center items-center'>
        <h2>Something went wrong!</h2>
        <div>
          <Button click={() => reset()}>Try again</Button>
          <Link href='/'>or go to home page</Link>
        </div>
      </body>
    </html>
  )
}
