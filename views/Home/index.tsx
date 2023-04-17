import styles from '@/styles/Home.module.scss'
import React, { MouseEventHandler, useContext, useState } from 'react'
import { defaultBookReview, RequestMethods } from '@/constants'
import { Box, Button, Dialog, TextField, Typography } from '@mui/material'
import { AddElement } from '@/components'
import globalStyles from '@/styles/components/globals.module.scss'
import BookReviewsContext, { BookReviewsContextType } from '@/context/BookReviews'
import { useOperate } from '@/lib/hooks/useOperate'
import { BookReviewContainer } from '@/containers/BookReview'
import { onChangeInput } from '@/lib/utils'

export const textFields = [
  {
    name: 'bookTitle',
    value: (state: typeof defaultBookReview) => state.bookTitle,
    placeholder: 'Escribe el nombre del libro a reseñar'
  },
  {
    name: 'review',
    value: (state: typeof defaultBookReview) => state.review,
    placeholder: 'Escribe la reseña',
    props: {
      multiline: true
    }
  }
]

const HomeView = () => {
  const {
    bookReviews,
    addBookReview
  } = useContext(BookReviewsContext) as BookReviewsContextType

  const [ operate ] = useOperate()

  const [ anchorEl, setAnchorEl ] = useState<HTMLButtonElement | null>(null)
  const [ newBookReview, setNewBookReview ] = useState<typeof defaultBookReview>(defaultBookReview)

  const _handleAddBookReview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()

    setAnchorEl(event.currentTarget)
  }

  const _handleChangeNewBookReview = function (event: React.ChangeEvent<HTMLInputElement>) {
    const { target: { name, value } } = event ?? {}

    onChangeInput({ update: setNewBookReview, name, value })
  }

  const _handleSaveNewBookReview = async () => {
    addBookReview(newBookReview)

    setNewBookReview(defaultBookReview)

    setAnchorEl(null)

    await operate({ 
      method: RequestMethods.Post, 
      url: '/bookReview', 
      data: newBookReview
    })
  }

  return (
    <div className={styles.container}>
      <Box display='flex' justifyContent='flex-start' width='90%'>
        <Typography>Tus reseñas:</Typography>
      </Box>
      <div className={styles.bookReviewContainer}>
        {!bookReviews.length && (
          <Typography>Añadí tu primer reseña!</Typography>
        )}
        {bookReviews.map((bookReview, index) => 
          <BookReviewContainer 
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
          paper: globalStyles.dialogPaper
        }}
        onClose={() => setAnchorEl(null)}
        open={Boolean(anchorEl)}>
        {textFields?.map(({ name, placeholder, value, props = {} }) => (
          <TextField
            key={`homeView-${name}`}
            name={name}
            value={value(newBookReview)}
            onChange={_handleChangeNewBookReview}
            placeholder={placeholder}
            {...props} />
        ))}
        <Button onClick={_handleSaveNewBookReview}>
              Guardar reseña
        </Button>
      </Dialog>
    </div>
  )
}

export default HomeView