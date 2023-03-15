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
      const bookReview = await BookReviewModel
        .findOne({
          _id: bookReviewId,
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
  
      return res.status(200).json({ newBookReview, success: true })
    } catch (error) {
      return res.status(500).json({ message: sendErrorMessage(error), success: false })
    }
  }
  case RequestMethods.Put: {
    try {
      const { bookReviewId, bookTitle, status } = req.body

      const existsBookReview = await BookReviewModel.exists({
        _id: bookReviewId
      })
  
      if (!existsBookReview)
        throw new Error('No se encontro reseña')
  
      const updatedBookReview = await BookReviewModel.updateOne({
        _id: bookReviewId
      }, {
        $set: {
          bookTitle,
          status
        }
      })
  
      return res.status(200).json({ updatedBookReview, success: true })
    } catch (error) {
      return res.status(500).json({ message: sendErrorMessage(error), success: false })
    }
  }
  case RequestMethods.Delete: {
    try {
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
