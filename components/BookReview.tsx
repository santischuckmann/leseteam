import { FC } from "react";
import styles from '@/styles/components/BookReview.module.scss'

interface BookReviewProps {
  bookReview: {
    bookTitle: string;
    status?: string;
  }
}

const BookReview: FC<BookReviewProps> = ({
  bookReview: {
    bookTitle, 
    status = 'PENDING'
  }
}) => {
  return (
    <div className={styles.root}>
      <h1>{bookTitle}</h1>
      <span>{status}</span>
    </div>
  )
} 

export default BookReview