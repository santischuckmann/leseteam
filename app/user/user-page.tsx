'use client'
import HomeView from '@/views/Home'
import { BookReview } from '@/constants'
import Providers from '@/app/providers'

export interface HomeProps {
  bookReviews: BookReview[];
}


export default function HomePage ({ bookReviews }: HomeProps) {
  return (
    <Providers bookReviews={bookReviews}>
      <HomeView />
    </Providers>
  ) 
}