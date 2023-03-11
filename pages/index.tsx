import { BookReviewsProvider } from '@/context/BookReviews/BookReviewsProvider'
import { endpoints } from '@/lib/config/endpoints'
import HomeView from '@/views/Home'
import axios from 'axios'

export interface HomeProps {
  bookReviews: {
    bookTitle: string;
    status: string;
  }[];
}


export default function Home (props: HomeProps) {
  return (
    <BookReviewsProvider persistentBookReviews={props.bookReviews}>
      <HomeView />
    </BookReviewsProvider>
  ) 
}

export const getServerSideProps = async () => {
  const response = await axios.get(`${endpoints.nextServer}/api/bookReview/getMany`)
  const { bookReviews } = response.data ?? []

  return {
    props: {
      bookReviews
    }
  }
}
