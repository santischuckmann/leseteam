import styles from '@/styles/Home.module.scss'
import { Session } from 'next-auth'

export const Header = ({
  session
}: { session: Session | null }) => {
  return (
    <header className={styles.header}>
      <span>Leseteam</span>
      {session && (
        <div>
          {session?.user?.name}
        </div>
      )}
    </header>
  )
}

export default Header