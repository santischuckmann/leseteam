import { BookReviewStatus } from '@/constants'
import mongoose, { Schema } from 'mongoose'

const BookReviewSchema = new Schema({
  bookTitle: { type: String, required: true },
  status: { type: String, 'enum': Object.values(BookReviewStatus) },
  isDeleted: { type: Boolean, default: false },
  review: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
  isPublic: { type: Boolean, default: false }
})

const BookReviewModel = mongoose.models.BookReview || mongoose.model('BookReview', BookReviewSchema)

export default BookReviewModel