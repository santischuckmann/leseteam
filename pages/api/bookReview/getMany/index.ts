// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sourceConnection from '@/lib/backing/connections/mongo'
import BookReviewModel from '@/lib/models/BookReview'
import { BookReviewStatus, DefaultOperationFields, RequestMethods } from '@/constants'
import { sendErrorMessage } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query : { statuses = Object.values(BookReviewStatus), page, limit, search = '' } } = req
  await sourceConnection()

  const session = await getServerSession(req, res, authOptions)

  switch (req.method) {
  case RequestMethods.Get: {
    try {

      if (!session) {
        throw new Error ('Error de autenticacion')
      }

      const bookReviews = await BookReviewModel
        .find({
          status: { $in: statuses },
          ...DefaultOperationFields,
          email: session.user?.email
        })
        .lean()
  
      return res.status(200).json({ bookReviews })
    } catch (error) {
      return res.status(500).json({ message: sendErrorMessage(error), success: false })
    }
  }
  }
}
