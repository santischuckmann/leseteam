// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sourceConnection from '@/lib/backing/connections/mongo'
import BookReviewModel from '@/lib/models/BookReview'
import { BookReviewStatus, DefaultOperationFields } from '@/constants'
import { sendErrorMessage } from '@/lib/utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query : { statuses = Object.values(BookReviewStatus), page, limit, search = '' } } = req
  await sourceConnection()

  switch (req.method) {
    case 'GET': {
      try {
        const bookReviews = await BookReviewModel.find({
          status: { $in: statuses },
          ...DefaultOperationFields
        })
        .lean()

        console.log('bookReviews', bookReviews)

        return res.status(200).json({ bookReviews })
      } catch (error) {
        throw error
        return res.status(500).json({ message: sendErrorMessage(error), success: false })
      }
    }
    case 'POST': {
      try {
        const { bookTitle } = req.body

        const existsBookReview = await BookReviewModel.exists({
          bookTitle,
          ...DefaultOperationFields
        })
  
        if (existsBookReview)
          throw new Error('Ya existe un libro con ese titulo')
  
        const newBookReview = await BookReviewModel.create({
          bookTitle,
          status: BookReviewStatus.Pending
        })
  
        return res.status(200).json({ data: newBookReview, success: true})
      } catch (error) {
        return res.status(500).json({ message: sendErrorMessage(error), success: false })
      }
    }
  }
}
