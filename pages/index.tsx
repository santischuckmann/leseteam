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
  return <HomeView {...props} />
}

export const getServerSideProps = async () => {
  const response = await axios.get(`${endpoints.nextServer!}/api/bookReview`)
  const { bookReviews } = response.data

  return {
    props: {
      bookReviews
    }
  }
}
