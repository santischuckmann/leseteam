import { BookReview } from '@/constants'
import { findIndexByIdPropertyInArray, insertInArrayByIndex, operate } from '@/utils'
import React, { FC, useState } from 'react'
import BookReviewsContext from '.'

interface BookReviewsProviderProps {
  children: React.ReactNode;
  persistentBookReviews: BookReview[];
}

export const BookReviewsProvider: FC<BookReviewsProviderProps> = ({ 
  children,
  persistentBookReviews
}) => {
  const [ bookReviews, setBookReviews ] = useState(persistentBookReviews)

  const refetchBookReview = async (bookReviewId: string) => {
    const { bookReview } = await operate({
      url: `/bookReview?bookReviewId=${bookReviewId}`
    })

    const index = findIndexByIdPropertyInArray<BookReview>({ id: bookReviewId, array: bookReviews })

    const newBookReviews = insertInArrayByIndex({ index, array: bookReviews, item: bookReview })
    
    setBookReviews(newBookReviews)
  }


  return (
    <BookReviewsContext.Provider
      value={{
        bookReviews,
        refetchBookReview, 
        addBookReview: (bookReview) => setBookReviews((prev) => ([ ...prev, bookReview ]))
      }}>
      {children}
    </BookReviewsContext.Provider>
  )
}