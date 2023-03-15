import { BookReview } from '@/constants'
import { createContext } from 'react'

export interface BookReviewsContextType {
  bookReviews: BookReview[];
  refetchBookReview: (bookReviewId: string) => Promise<void>;
  addBookReview: (bookReview: Omit<BookReview, '_id'>) => void;
}

const BookReviewsContext = createContext<BookReviewsContextType | null>(null)

export default BookReviewsContext
