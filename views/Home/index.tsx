import View from "@/components/View"
import Header from "./Header"
import styles from '@/styles/Home.module.scss'
import { HomeProps } from "@/pages"
import React, { FC, MouseEventHandler, useState } from "react"
import BookReview from "@/components/BookReview"
import AddElement from "@/components/AddElement"
import { BookReviewStatus, RequestMethods } from "@/constants"
import { Button, Dialog, TextField } from "@mui/material"
import { onChangeInput, operate } from "@/utils"

const defaultBookReview = {
  bookTitle : '',
  status: BookReviewStatus.Pending
}

const textFields = [
  {
    name: 'bookTitle',
    value: function (state: typeof defaultBookReview) {
      return state.bookTitle
    },
    placeholder: 'Escribe el nombre del libro a reseñar'
  }
]

const HomeView: FC<HomeProps>= ({
  bookReviews
}) => {
  const [ anchorEl, setAnchorEl ] = useState<HTMLButtonElement | null>(null)
  const [ newBookReview, setNewBookReview ] = useState<typeof defaultBookReview>(defaultBookReview)
  const [ bookReviewsToRender, setBookReviewsToRender ] = useState(bookReviews)

  console.log({newBookReview})

  const _handleAddBookReview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()

    setAnchorEl(event.currentTarget)
  }

  const _handleChangeNewBookReview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = event ?? {}

    onChangeInput({ update: setNewBookReview, name, value })
  }

  const _handleSaveNewBookReview = async () => {
    setBookReviewsToRender(prev => [ ...prev, newBookReview ])

    setNewBookReview(defaultBookReview)

    setAnchorEl(null)

    await operate({ 
      method: RequestMethods.Post, 
      url: '/bookReview', 
      data: newBookReview
    })
  }

  return (
    <View
      footer={<footer className={styles.footer}>hola, soy el footer</footer>}
      header={<Header />}>
        <div className={styles.container}>
          <div className={styles.bookReviewContainer}>
            {bookReviewsToRender.map((bookReview, index) => 
              <BookReview 
                key={`${bookReview.bookTitle}-${index}`}
                bookReview={bookReview} />
            )}
          </div>
          <AddElement 
            onClick={_handleAddBookReview}
            title='Añadi una reseña' 
            tooltipTitle='La reseña debe tener al menos 150 caracteres' />
          <Dialog
            classes={{
              paper: styles.dialogPaper
            }}
            onClose={() => setAnchorEl(null)}
            open={Boolean(anchorEl)}>
            {textFields.map(({ name, placeholder, value}) => (
              <TextField
                name={name}
                value={value(newBookReview)}
                onChange={_handleChangeNewBookReview}
                placeholder={placeholder}/>
            ))}
            <Button onClick={_handleSaveNewBookReview}>
              Guardar reseña
            </Button>
          </Dialog>
        </div>
    </View>
  )
}

export default HomeView