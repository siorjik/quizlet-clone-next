import Link from 'next/link'

import { setsAppPath, videosAppPath } from '../../../utils/paths'

export default function Library () {
  return (
    <>
      <p><Link className='link inline-block mb-5 text-xl' href={setsAppPath}>Sets</Link></p>
      <p><Link className='link inline-block text-xl' href={videosAppPath}>Videos</Link></p>
    </>
  )
}
