import View from "@/components/View"
import Header from "./Header"
import styles from '@/styles/Home.module.scss'
import { HomeProps } from "@/pages"
import { FC } from "react"

const HomeView: FC<HomeProps>= ({
  bookReviews
}) => {
  return (
    <View
      footer={<footer className={styles.footer}>hola, soy el footer</footer>}
      header={<Header />}>
        
        {bookReviews.map((bookReview, index) => 
          <div key={`${bookReview.bookTitle}-${index}`}>
            <h1>{bookReview.bookTitle}</h1>
            <span>{bookReview.status}</span>
          </div>)}
    </View>
  )
}

export default HomeView