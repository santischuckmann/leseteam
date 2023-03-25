import { BookReviewsProvider } from '@/context/BookReviews/BookReviewsProvider'
import { endpoints } from '@/lib/config/endpoints'
import HomeView from '@/views/Home'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { SessionContextValue } from 'next-auth/react'
import { authOptions } from './api/auth/[...nextauth]'

export interface HomeProps {
  bookReviews: {
    bookTitle: string;
    status: string;
  }[];
  session: SessionContextValue
}


export default function Home (props: HomeProps) {
  return (
    <BookReviewsProvider persistentBookReviews={props.bookReviews}>
      <HomeView />
    </BookReviewsProvider>
  ) 
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: { destination: '/login', permanent: false }
    }
  }
  
  const response = await axios.get(`${endpoints.nextServer}/api/bookReview/getMany`, {
    withCredentials: true,
    headers: {
      Cookie: context.req.headers.cookie
    }
  })
  const { bookReviews } = response.data ?? []

  return {
    props: {
      bookReviews
    }
  }
}
