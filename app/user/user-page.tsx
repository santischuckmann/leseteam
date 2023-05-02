'use client'
import { BookReview } from '@/constants'
import Providers from '@/app/providers'
import UserView from '@/views/User'

export interface UserPageProps {
  bookReviews: BookReview[];
}


export default function UserPage ({ bookReviews }: UserPageProps) {
  return (
    <Providers bookReviews={bookReviews}>
      <UserView />
    </Providers>
  ) 
}