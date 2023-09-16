import Link from 'next/link'

type BreadCrumbsPropsType = {
  data: { title: string, path: string }[]
}

export default function BreadCrumbs (props: BreadCrumbsPropsType) {
  const { data } = props

  return (
    <div className='flex mb-8'>
      {data.map((item, index) => (
        <div className='text-sm text-yellow-600 hover:text-yellow-400 transition-all' key={index}>
          <Link className='cursor-pointer' href={item.path}>{item.title}</Link>&nbsp;/&nbsp;
        </div>
      ))}
      <span className='text-sm'>...</span>
    </div>
  )
}
