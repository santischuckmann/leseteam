import { AddElement } from '@/components'
import BookReview from '@/components/BookReview/BookReview'
import { BookReview as BookReviewType } from '@/constants'
import styles from '@/styles/Home.module.scss'
import { useRouter } from 'next/navigation'

interface NewHomeViewProps {
  bookReviews: BookReviewType[];
}

export const NewHomeView = ({
  bookReviews
}: NewHomeViewProps) => {
  const router = useRouter()
  const handleRedirectToUserPage = () => {
    router.push('/user')
  }
  return (
    <div className={styles.container}>
      {bookReviews.map((bookReview, index) => (
        <BookReview key={`${index}-home-${bookReview.bookTitle}`} bookReview={bookReview} />
      ))}
      <AddElement
        onClick={handleRedirectToUserPage}
        title='Añadi una reseña' 
        tooltipTitle='La reseña debe tener al menos 150 caracteres' />
    </div>
  )
}