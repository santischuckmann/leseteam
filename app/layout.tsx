import { authOptions } from '@/pages/api/auth/[...nextauth]'
import '@/styles/globals.css'
import Header from '@/views/Home/Header'
import { getServerSession } from 'next-auth'
import styles from '@/styles/Home.module.scss'


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
        {children}
        <footer className={styles.footer}>hola, soy el footer</footer>
      </body>
    </html>
  )
}