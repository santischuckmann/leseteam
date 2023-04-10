import { BookReviewsProvider } from '@/context/BookReviews/BookReviewsProvider'
import { endpoints } from '@/lib/config/endpoints'
import HomeView from '@/views/Home'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import { SessionContextValue } from 'next-auth/react'
import { BookReview } from '@/constants'
import { AuthorizedPage } from '@/containers/AuthorizedPage'

export interface HomeProps {
  bookReviews: BookReview[];
  session: SessionContextValue
}


export default function Home (props: HomeProps) {
  return (
    <BookReviewsProvider persistentBookReviews={props.bookReviews}>
      <AuthorizedPage>
        <HomeView />
      </AuthorizedPage>
    </BookReviewsProvider>
  ) 
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
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
  } catch (error) {
    return {
      props: {
        bookReviews: []
      }
    }
  }
}
