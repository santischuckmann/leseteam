import { BookReview } from '@/constants'
import { useOperate } from '@/lib/hooks/useOperate'
import { deleteInArrayByIndex, findIndexByIdPropertyInArray, insertInArrayByIndex } from '@/lib/utils'
import React, { FC, useEffect, useState } from 'react'
import BookReviewsContext from '.'

interface BookReviewsProviderProps {
  children: React.ReactNode;
  persistentBookReviews: BookReview[];
}

export const BookReviewsProvider: FC<BookReviewsProviderProps> = ({ 
  children,
  persistentBookReviews = []
}) => {
  const [ bookReviews, setBookReviews ] = useState(persistentBookReviews)

  const [ operate ] = useOperate()

  const refetchBookReview = async (bookReviewId: string) => {
    const index = findIndexByIdPropertyInArray<BookReview>({ id: bookReviewId, array: bookReviews })

    const { bookReview } = await operate({
      url: `/bookReview?bookReviewId=${bookReviewId}`
    }) ?? {}

    const newBookReviews =  (() => {
      if (!bookReview) {
        return deleteInArrayByIndex({ index, array: bookReviews })
      }

      return insertInArrayByIndex<BookReview>({ index, array: bookReviews, item: bookReview })
    })()

    setBookReviews(newBookReviews)
  }

  const deleteBookReview = async (bookReviewId: string) => {
    const index = findIndexByIdPropertyInArray<BookReview>({ id: bookReviewId, array: bookReviews })

    const newBookReviews = deleteInArrayByIndex({ index, array: bookReviews })

    setBookReviews(newBookReviews)
  }

  useEffect(() => {
    (async() => {
      const { bookReviews } = await operate({
        url: '/bookReview/getMany'
      })
  
      setBookReviews(bookReviews)
    })()
  }, [])

  return (
    <BookReviewsContext.Provider
      value={{
        bookReviews,
        refetchBookReview, 
        addBookReview: (bookReview) => setBookReviews((prev) => ([ ...prev, bookReview ])),
        deleteBookReview
      }}>
      {children}
    </BookReviewsContext.Provider>
  )
}