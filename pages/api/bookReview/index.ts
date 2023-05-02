// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sourceConnection from '@/lib/backing/connections/mongo'
import BookReviewModel from '@/lib/models/BookReview'
import { BookReviewStatus, DefaultOperationFields, RequestMethods } from '@/constants'
import { sendErrorMessage } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query : { bookReviewId } } = req
  await sourceConnection()

  const session = await getServerSession(req, res, authOptions)

  switch (req.method) {
  case RequestMethods.Get: {
    try {
      if (!session) {
        throw new Error ('Error de autenticacion')
      }

      const bookReview = await BookReviewModel
        .findOne({
          _id: bookReviewId,
          userId: session.user?.id,
          ...DefaultOperationFields
        })
        .lean()

      if (!bookReview)
        throw new Error('No se encontro bookReview con el id dado')
  
      return res.status(200).json({ bookReview })
    } catch (error) {
      return res.status(500).json({ message: sendErrorMessage(error), success: false })
    }
  }
  case RequestMethods.Post: {
    try {
      if (!session) {
        throw new Error ('Error de autenticacion')
      }

      const { bookTitle, review } = req.body

      const existsBookReview = await BookReviewModel.exists({
        bookTitle,
        userId: session.user?.id,
        isDeleted: false
      })
  
      if (existsBookReview)
        throw new Error('Ya escribiste una reseña para este libro')
  
      const newBookReview = await BookReviewModel.create({
        bookTitle,
        review,
        status: BookReviewStatus.Pending,
        userId: session.user?.id
      })
  
      return res.status(200).json({ newBookReview, success: true })
    } catch (error) {
      return res.status(500).json({ message: sendErrorMessage(error), success: false })
    }
  }
  case RequestMethods.Put: {
    try {
      if (!session) {
        throw new Error ('Error de autenticacion')
      }

      const { bookReviewId, bookTitle, status, review, isPublic } = req.body

      const existsBookReview = await BookReviewModel.exists({
        _id: bookReviewId
      })
  
      if (!existsBookReview)
        throw new Error('No se encontro reseña')
  
      const updatedBookReview = await BookReviewModel
        .updateOne({
          _id: bookReviewId
        }, {
          $set: {
            review,
            bookTitle,
            status,
            isPublic
          }
        })
        .lean()
  
      return res.status(200).json({ updatedBookReview, success: true })
    } catch (error) {
      return res.status(500).json({ message: sendErrorMessage(error), success: false })
    }
  }
  case RequestMethods.Delete: {
    try {
      if (!session) {
        throw new Error ('Error de autenticacion')
      }

      const existsBookReview = await BookReviewModel.exists({
        _id: bookReviewId
      })
  
      if (!existsBookReview)
        throw new Error('No se encontro reseña')
  
      await BookReviewModel.updateOne({
        _id: bookReviewId
      }, {
        $set: {
          isDeleted: true
        }
      })
  
      return res.status(200).json({ success: true })
    } catch (error) {
      return res.status(500).json({ message: sendErrorMessage(error), success: false })
    }
  }
  }
}
