import '@/styles/globals.css'

export const metadata = {
  title: 'Books application!',
  description: 'Welcome to Next.js',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}