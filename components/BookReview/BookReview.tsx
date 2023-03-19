import { FC, MouseEventHandler, useState } from 'react'
import styles from '@/styles/components/BookReview.module.scss'
import { 
  Edit as EditButton,
  Delete as DeleteIcon 
} from '@mui/icons-material'
import { Box, Button, CircularProgress, Dialog, IconButton, TextField } from '@mui/material'
import { textFields } from '@/views/Home'
import { onChangeInput } from '@/lib/utils'
import { BookReview, defaultBookReview } from '@/constants'
import { ScrollAnimatedDiv } from '../ScrollAnimatedDiv'
import globalStyles from '@/styles/components/globals.module.scss'

interface BookReviewProps {
  bookReview: BookReview
  onRemoveBookReview: () => Promise<void>;
  onConfirmEdition: (newBookReview: BookReview) => Promise<void>;
  loading: boolean;
}

const BookReview: FC<BookReviewProps> = ({
  bookReview: {
    bookTitle, 
    status = 'PENDING'
  },
  onRemoveBookReview,
  onConfirmEdition,
  loading
}) => {
  const [ anchorEl, setAnchorEl ] = useState<HTMLButtonElement | null>(null)
  const [ bookReview, setBookReview ] = useState<typeof defaultBookReview>(defaultBookReview)

  const _handleChangeNewBookReview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = event

    onChangeInput({ update: setBookReview, name, value })
  }

  const _handleConfirmBookReviewEdition = async () => {
    onConfirmEdition(bookReview)

    setAnchorEl(null)
  }

  const _handleOpen: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()

    setAnchorEl(event.currentTarget)
  }

  const _handleRemoveBookReview = async () => {
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
        <Box display='flex' flexDirection='row' justifyContent='space-between' width='100%'>
          <IconButton onClick={_handleOpen}>
            <EditButton />
          </IconButton>
          <IconButton onClick={_handleRemoveBookReview}>
            {loading ? <CircularProgress /> : <DeleteIcon /> }
          </IconButton>
        </Box>
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
          {loading ? <CircularProgress /> : 'Guardar reseña' }
        </Button>
      </Dialog>
    </>
  )
} 

export default BookReview