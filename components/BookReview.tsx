import { FC, MouseEventHandler, useState } from "react";
import styles from '@/styles/components/BookReview.module.scss'
import { Edit, Edit as EditButton } from "@mui/icons-material";
import { Button, Dialog, IconButton, TextField } from "@mui/material";
import { textFields } from "@/views/Home";
import { onChangeInput, operate } from "@/utils";
import { defaultBookReview, RequestMethods } from "@/constants";

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
  const [ anchorEl, setAnchorEl ] = useState<HTMLButtonElement | null>(null)
  const [ bookReview, setBookReview ] = useState<typeof defaultBookReview>(defaultBookReview)

  const _handleChangeNewBookReview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = event ?? {}

    onChangeInput({ update: setBookReview, name, value })
  }

  const _handleConfirmBookReviewEdition = async () => {
    setAnchorEl(null)

    await operate({ 
      method: RequestMethods.Put, 
      url: '/bookReview', 
      data: bookReview
    })
  }

  const _handleOpen: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()

    setAnchorEl(event.currentTarget)
  }

  return (
    <>
      <div className={styles.root}>
        <IconButton onClick={_handleOpen}>
          <EditButton />
        </IconButton>
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
          Guardar reseña
        </Button>
      </Dialog>
    </>
  )
} 

export default BookReview