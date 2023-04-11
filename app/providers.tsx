import { BookReview } from '@/constants'
import { BookReviewsProvider } from '@/context/BookReviews/BookReviewsProvider'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode;
  bookReviews: BookReview[];
}

export default function Providers({ children, bookReviews }: ProvidersProps) {
  return (
    <BookReviewsProvider persistentBookReviews={bookReviews}>
      <SessionProvider>{children}</SessionProvider>
    </BookReviewsProvider>
  )
}