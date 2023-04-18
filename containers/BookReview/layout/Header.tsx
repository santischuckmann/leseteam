'use client'
import styles from '@/styles/Home.module.scss'
import styled from '@emotion/styled'
import { Session } from 'next-auth'
import { useRouter } from 'next/navigation'

const NameContainer = styled.div`
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

export const Header = ({
  session
}: { session: Session | null }) => {
  const router = useRouter()
  return (
    <header className={styles.header}>
      <span onClick={() => router.push('/')}>Leseteam</span>
      {session && (
        <NameContainer onClick={() => router.push('/user')}>
          {session?.user?.name}
        </NameContainer>
      )}
    </header>
  )
}

export default Header