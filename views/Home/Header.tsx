import styles from '@/styles/Home.module.scss'
import { useSession } from 'next-auth/react'

const Header = () => {
  const { data: session } = useSession()
  return (
    <header className={styles.header}>
      <span>Leseteam</span>
      {session && (
        <div>
          {session.user?.name}
        </div>
      )}
    </header>
  )
}

export default Header