'use client'
import HomeView from '@/views/Home'
import { BookReview } from '@/constants'
import { AuthorizedPage } from '@/containers/AuthorizedPage'
import Providers from './providers'

export interface HomeProps {
  bookReviews: BookReview[];
}


export default function HomePage ({ bookReviews }: HomeProps) {
  return (
    <Providers bookReviews={bookReviews}>
      <AuthorizedPage>
        <HomeView />
      </AuthorizedPage>
    </Providers>
  ) 
}