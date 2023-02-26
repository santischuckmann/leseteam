import View from "@/components/View"
import Header from "./Header"
import styles from '@/styles/Home.module.scss'
import { HomeProps } from "@/pages"
import { FC } from "react"
import BookReview from "@/components/BookReview"

const HomeView: FC<HomeProps>= ({
  bookReviews
}) => {
  return (
    <View
      footer={<footer className={styles.footer}>hola, soy el footer</footer>}
      header={<Header />}>
        <div className={styles.container}>
          {bookReviews.map((bookReview, index) => 
            <BookReview 
              key={`${bookReview.bookTitle}-${index}`}
              bookReview={bookReview} />
          )}
        </div>
    </View>
  )
}

export default HomeView