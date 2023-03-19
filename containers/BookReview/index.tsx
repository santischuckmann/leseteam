import BookReview from '@/components/BookReview/BookReview'
import { BookReview as BookReviewType, RequestMethods } from '@/constants'
import BookReviewsContext, { BookReviewsContextType } from '@/context/BookReviews'
import { useOperate } from '@/lib/hooks/useOperate'
import { useContext } from 'react'

export const BookReviewContainer = ({
  bookReview
}: { bookReview: BookReviewType }) => {
  const { refetchBookReview } = useContext(BookReviewsContext) as BookReviewsContextType

  const [ operate, { loading } ] = useOperate()

  const _handleConfirmEdition = async (editedBookReview: BookReviewType) => {
    await operate({ 
      method: RequestMethods.Put, 
      url: '/bookReview', 
      data: { ...editedBookReview, bookReviewId: bookReview._id }
    })

    await refetchBookReview(bookReview._id ?? '')
  }

  const _handleRemoveBookReview = async () => {
    await operate({ 
      method: RequestMethods.Delete, 
      url: `/bookReview?bookReviewId=${bookReview._id}`, 
      data: { ...bookReview, bookReviewId: bookReview._id }
    })

    await refetchBookReview(bookReview._id ?? '')
  }

  return (
    <BookReview 
      bookReview={bookReview}
      loading={loading}
      onConfirmEdition={_handleConfirmEdition}
      onRemoveBookReview={_handleRemoveBookReview}/>
  )
}