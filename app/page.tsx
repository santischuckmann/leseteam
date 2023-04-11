import axios from 'axios'
import HomePage from './home-page'
import { endpoints } from '@/lib/config/endpoints'
import { headers } from 'next/headers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation'

async function getBookReviews() {
  try {
    const headersInstance = headers()
    const cookie = headersInstance.get('cookie')
    const response = await axios.get(`${endpoints.nextServer}/api/bookReview/getMany`, {
      withCredentials: true,
      headers: { cookie }
    })
  
    const { bookReviews } = response.data ?? {}
  
    return bookReviews
  } catch (error) {
    return []
  }
}

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  }

  const bookReviews = await getBookReviews()

  return <HomePage bookReviews={bookReviews} />
}