import mongoose, { Schema } from 'mongoose'

export const BookReviewStatus = {
  Pending: 'PENDING',
  Published: 'PUBLISHED'
}

const BookReviewSchema = new Schema({
  bookTitle: { type: String, required: true },
  status: { type: String, 'enum': Object.values(BookReviewStatus)}
})

const BookReviewModel = mongoose.models.BookReview || mongoose.model('BookReview', BookReviewSchema)

export default BookReviewModel