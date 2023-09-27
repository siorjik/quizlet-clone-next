import { redirect } from 'next/navigation'

import { setsAppPath } from '../../utils/paths'

export default function Library () {
  redirect(setsAppPath)
}
