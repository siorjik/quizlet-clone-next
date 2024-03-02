import CreatePassword from '@/components/CreatePassword'

export default function CreatePasswordPage({ searchParams }: { searchParams: { token: string } }) {
  const { token } = searchParams

  return (
    <div className='h-[100dvh] flex flex-col justify-center items-center'>
      <h2 className='page-title'>Create Password</h2>
      <CreatePassword token={token} />
    </div>
  )
}
