import { FC, MouseEventHandler, useState } from 'react'
import styles from '@/styles/components/BookReview.module.scss'
import { 
  Edit as EditButton,
  Delete as DeleteIcon
} from '@mui/icons-material'
import { Box, Button, Checkbox, CircularProgress, Dialog, IconButton, TextField, Typography } from '@mui/material'
import { onChangeInput } from '@/lib/utils'
import { BookReview, textFields } from '@/constants'
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
    review,
    isPublic
  },
  onRemoveBookReview,
  onConfirmEdition,
  loading
}) => {
  const [ anchorEl, setAnchorEl ] = useState<HTMLButtonElement | null>(null)
  const [ editableBookReview, setEditableBookReview ] = useState({
    bookTitle,
    status,
    review,
    isPublic
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
        <span>{isPublic ? 'PUBLICO' : 'PRIVADO'}</span>
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
        <Box display='flex' alignItems='center'>
          <Checkbox checked={editableBookReview.isPublic} onChange={(event) => setEditableBookReview(prev => ({ ...prev, isPublic: event.target.checked }))}/>
          <Typography>Visible para la comunidad</Typography>
        </Box>
        <Button onClick={_handleConfirmBookReviewEdition}>
          {loading ? <CircularProgress /> : 'Guardar reseña' }
        </Button>
      </Dialog>
    </>
  )
} 

export default BookReview