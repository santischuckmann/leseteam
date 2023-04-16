import { authOptions } from '@/pages/api/auth/[...nextauth]'
import '@/styles/globals.css'
import { getServerSession } from 'next-auth'
import styles from '@/styles/Home.module.scss'
import { Footer, Header } from '@/containers/BookReview/layout'


export const metadata = {
  title: 'Books application!',
  description: 'Welcome to Next.js',
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
        <Header session={session} />
        <main className={styles.main}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}