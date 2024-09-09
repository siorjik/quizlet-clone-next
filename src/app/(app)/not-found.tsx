import Link from 'next/link'

export default function NotFound () {
  return (
    <div className='w-full h-screen flex justify-center items-center text-xl text-red-300'>
      <h2>Page/resource not found, go to <Link className='text-red-600' href='/'>Home</Link> page...</h2>
    </div>
  )
}
