import { FC, MouseEventHandler, useState } from "react";
import styles from '@/styles/components/BookReview.module.scss'
<<<<<<< Updated upstream:components/BookReview.tsx
import { Edit, Edit as EditButton } from "@mui/icons-material";
import { Button, Dialog, IconButton, TextField } from "@mui/material";
import { textFields } from "@/views/Home";
import { onChangeInput, operate } from "@/utils";
import { defaultBookReview, RequestMethods } from "@/constants";
=======
import { 
  Edit as EditButton,
  Delete as DeleteIcon 
} from '@mui/icons-material'
import { Box, Button, CircularProgress, Dialog, IconButton, TextField } from '@mui/material'
import { textFields } from '@/views/Home'
import { onChangeInput } from '@/utils'
import { BookReview, defaultBookReview, RequestMethods } from '@/constants'
import { ScrollAnimatedDiv } from '../ScrollAnimatedDiv'
import globalStyles from '@/styles/components/globals.module.scss'
import BookReviewsContext, { BookReviewsContextType } from '@/context/BookReviews'
import { useOperate } from '@/lib/hooks/useOperate'
>>>>>>> Stashed changes:components/BookReview/BookReview.tsx

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
<<<<<<< Updated upstream:components/BookReview.tsx
=======
  const { refetchBookReview } = useContext(BookReviewsContext) as BookReviewsContextType

  const [ operate, { loading } ] = useOperate()

>>>>>>> Stashed changes:components/BookReview/BookReview.tsx
  const [ anchorEl, setAnchorEl ] = useState<HTMLButtonElement | null>(null)
  const [ bookReview, setBookReview ] = useState<typeof defaultBookReview>(defaultBookReview)

  const _handleChangeNewBookReview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = event ?? {}

    onChangeInput({ update: setBookReview, name, value })
  }

  const _handleConfirmBookReviewEdition = async () => {
    await operate({ 
      method: RequestMethods.Put, 
      url: '/bookReview', 
      data: bookReview
    })
<<<<<<< Updated upstream:components/BookReview.tsx
=======

    setAnchorEl(null)

    await refetchBookReview(bookReviewId ?? '')
>>>>>>> Stashed changes:components/BookReview/BookReview.tsx
  }

  const _handleOpen: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()

    setAnchorEl(event.currentTarget)
  }

  const _handleRemoveBookReview = async () => {
    await operate({ 
      method: RequestMethods.Delete, 
      url: `/bookReview?bookReviewId=${bookReviewId}`, 
      data: { ...bookReview, bookReviewId }
    })

    await refetchBookReview(bookReviewId ?? '')
  }

  return (
    <>
<<<<<<< Updated upstream:components/BookReview.tsx
      <div className={styles.root}>
        <IconButton onClick={_handleOpen}>
          <EditButton />
        </IconButton>
=======
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
>>>>>>> Stashed changes:components/BookReview/BookReview.tsx
        <h1>{bookTitle}</h1>
        <span>{status}</span>
      </div>
      <Dialog
        classes={{
          paper: styles.dialogPaper
        }}
        onClose={() => setAnchorEl(null)}
        open={Boolean(anchorEl)}>
        {textFields.map(({ name, placeholder, value }) => (
          <TextField
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