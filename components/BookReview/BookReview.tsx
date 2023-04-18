import { FC, MouseEventHandler, useState } from 'react'
import styles from '@/styles/components/BookReview.module.scss'
import { 
  Edit as EditButton,
  Delete as DeleteIcon 
} from '@mui/icons-material'
import { Box, Button, CircularProgress, Dialog, IconButton, TextField } from '@mui/material'
import { textFields } from '@/views/Home'
import { onChangeInput } from '@/lib/utils'
import { BookReview } from '@/constants'
import { ScrollAnimatedDiv } from '../ScrollAnimatedDiv'
import globalStyles from '@/styles/components/globals.module.scss'

interface BookReviewProps {
  bookReview: BookReview
  onRemoveBookReview?: () => Promise<void>;
  onConfirmEdition?: (newBookReview: BookReview) => Promise<void>;
  loading?: boolean;
}

const BookReview: FC<BookReviewProps> = ({
  bookReview: {
    bookTitle, 
    status = 'PENDING',
    review
  },
  onRemoveBookReview,
  onConfirmEdition,
  loading
}) => {
  const [ anchorEl, setAnchorEl ] = useState<HTMLButtonElement | null>(null)
  const [ editableBookReview, setEditableBookReview ] = useState({
    bookTitle,
    status,
    review
  })

  const _handleChangeNewBookReview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = event

    onChangeInput({ update: setEditableBookReview, name, value })
  }

  const _handleConfirmBookReviewEdition = async () => {
    if (onConfirmEdition)
      onConfirmEdition(editableBookReview)

    setAnchorEl(null)
  }

  const _handleOpen: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()

    setAnchorEl(event.currentTarget)
  }

  const _handleRemoveBookReview = async () => {
    if (onRemoveBookReview)
      onRemoveBookReview()
  }

  return (
    <>
      <ScrollAnimatedDiv
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.75 } }
        }}
        initial={'hidden'}
        inViewCallback={(control) => control.start('visible')}
        containerClassName={styles.root}>
        {onConfirmEdition && onRemoveBookReview && (
          <Box className={styles.content} display='flex' flexDirection='row' justifyContent='space-between' width='100%'>
            <IconButton onClick={_handleOpen}>
              <EditButton />
            </IconButton>
            <IconButton onClick={_handleRemoveBookReview}>
              {loading ? <CircularProgress /> : <DeleteIcon /> }
            </IconButton>
          </Box>
        )}
        <h2>{bookTitle}</h2>
        <p>{review}</p>
        <span>{status}</span>
      </ScrollAnimatedDiv>
      <Dialog
        classes={{
          paper: globalStyles.dialogPaper
        }}
        onClose={() => setAnchorEl(null)}
        open={Boolean(anchorEl)}>
        {textFields.map(({ name, placeholder }) => (
          <TextField
            key={`bookReview-${name}`}
            variant='outlined'
            name={name}
            value={editableBookReview[name as keyof typeof editableBookReview]}
            onChange={_handleChangeNewBookReview}
            placeholder={placeholder}/>
        ))}
        <Button onClick={_handleConfirmBookReviewEdition}>
          {loading ? <CircularProgress /> : 'Guardar reseña' }
        </Button>
      </Dialog>
    </>
  )
} 

export default BookReview