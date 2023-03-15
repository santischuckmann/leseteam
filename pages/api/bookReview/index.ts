// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sourceConnection from '@/lib/backing/connections/mongo'
import BookReviewModel from '@/lib/models/BookReview'
import { BookReviewStatus, DefaultOperationFields, RequestMethods } from '@/constants'
import { sendErrorMessage } from '@/lib/utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query : { bookReviewId } } = req
  await sourceConnection()

  switch (req.method) {
    case RequestMethods.Get: {
      try {
        const bookReview = await BookReviewModel.findOne({
          _id: bookReviewId
        })
        .lean()

        if (!bookReview)
          throw new Error('No se encontro bookReview con el id dado')
  
        return res.status(200).json({ data: bookReview })
      } catch (error) {
        return res.status(500).json({ message: sendErrorMessage(error), success: false })
      }
    }
    case RequestMethods.Post: {
      try {
        const { bookTitle } = req.body

        const existsBookReview = await BookReviewModel.exists({
          bookTitle
        })
  
        if (existsBookReview)
          throw new Error('Ya existe un libro con ese titulo')
  
        const newBookReview = await BookReviewModel.create({
          bookTitle,
          status: BookReviewStatus.Pending,
          ...DefaultOperationFields
        })
  
        return res.status(200).json({ data: newBookReview, success: true})
      } catch (error) {
        return res.status(500).json({ message: sendErrorMessage(error), success: false })
      }
    }
    case 'DELETE': {

    }
  }
}
