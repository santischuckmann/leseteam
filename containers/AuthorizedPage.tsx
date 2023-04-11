import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface AuthorizedPageProps {
  children: React.ReactNode;
}

export const AuthorizedPage = ({
  children
}: AuthorizedPageProps) => {
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('api/auth/signin')
  }, [ status ])

  if (status === 'authenticated') return (
    <>
      {children}
    </>  
  )

  return <div>redirecting</div>
}