'use client'
import { BookReview } from '@/constants'
import { NewHomeView } from '@/views/NewHome'

export interface HomeProps {
  bookReviews: BookReview[];
}


export default function HomePage ({ bookReviews }: HomeProps) {
  return (
    <NewHomeView bookReviews={bookReviews} />
  ) 
}