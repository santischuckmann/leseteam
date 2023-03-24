import { SessionContextValue } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface AuthorizedPageProps {
  children: React.ReactNode;
  session: SessionContextValue
}

export const AuthorizedPage = ({
  children,
  session
}: AuthorizedPageProps) => {
  const router = useRouter()

  console.log(session.status)

  useEffect(() => {
    if (session.status === 'unauthenticated') router.replace('api/auth/signin')
  }, [ session.status ])

  if (session.status === 'authenticated') return (
    <>
      {children}
    </>  
  )

  return <div>redirecting</div>
}