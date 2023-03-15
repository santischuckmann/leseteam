import { FC, MouseEventHandler, useState, useContext } from 'react'
import styles from '@/styles/components/BookReview.module.scss'
import { Edit as EditButton } from '@mui/icons-material'
import { Button, Dialog, IconButton, TextField } from '@mui/material'
import { textFields } from '@/views/Home'
import { onChangeInput, operate } from '@/utils'
import { BookReview, defaultBookReview, RequestMethods } from '@/constants'
import { ScrollAnimatedDiv } from '../ScrollAnimatedDiv'
import globalStyles from '@/styles/components/globals.module.scss'
import BookReviewsContext, { BookReviewsContextType } from '@/context/BookReviews'

interface BookReviewProps {
  bookReview: BookReview
}

const BookReview: FC<BookReviewProps> = ({
  bookReview: {
    bookTitle, 
    status = 'PENDING',
    _id: bookReviewId
  }
}) => {
  const { refetchBookReview } = useContext(BookReviewsContext) as BookReviewsContextType

  const [ anchorEl, setAnchorEl ] = useState<HTMLButtonElement | null>(null)
  const [ bookReview, setBookReview ] = useState<typeof defaultBookReview>(defaultBookReview)

  const _handleChangeNewBookReview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = event

    onChangeInput({ update: setBookReview, name, value })
  }

  const _handleConfirmBookReviewEdition = async () => {
    setAnchorEl(null)

    await operate({ 
      method: RequestMethods.Put, 
      url: '/bookReview', 
      data: { ...bookReview, bookReviewId }
    })

    await refetchBookReview(bookReviewId ?? '')
  }

  const _handleOpen: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()

    setAnchorEl(event.currentTarget)
  }

  return (
    <>
      <ScrollAnimatedDiv
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }}
        initial={'hidden'}
        inViewCallback={(control) => control.start('visible')}
        containerClassName={styles.root}>
        <IconButton onClick={_handleOpen}>
          <EditButton />
        </IconButton>
        <h1>{bookTitle}</h1>
        <span>{status}</span>
      </ScrollAnimatedDiv>
      <Dialog
        classes={{
          paper: globalStyles.dialogPaper
        }}
        onClose={() => setAnchorEl(null)}
        open={Boolean(anchorEl)}>
        {textFields.map(({ name, placeholder, value }) => (
          <TextField
            key={`bookReview-${name}`}
            variant='outlined'
            name={name}
            value={value(bookReview)}
            onChange={_handleChangeNewBookReview}
            placeholder={placeholder}/>
        ))}
        <Button onClick={_handleConfirmBookReviewEdition}>
          Guardar reseña
        </Button>
      </Dialog>
    </>
  )
} 

export default BookReview