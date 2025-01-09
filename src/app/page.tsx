import { redirect } from 'next/navigation'

import { homeAppPath } from '@/utils/paths'

export default function Main() {
  redirect(homeAppPath)
}
