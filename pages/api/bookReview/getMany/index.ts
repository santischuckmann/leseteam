// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sourceConnection from '@/lib/backing/connections/mongo'
import BookReviewModel from '@/lib/models/BookReview'
import { BookReviewStatus, DefaultOperationFields, RequestMethods } from '@/constants'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query : { statuses = Object.values(BookReviewStatus), page, limit, search = '' } } = req
  await sourceConnection()

  switch (req.method) {
  case RequestMethods.Get: {
    const bookReviews = await BookReviewModel.find({
      status: { $in: statuses },
      ...DefaultOperationFields
    })
      .lean()

    return res.status(200).json({ bookReviews })
  }
  }
}
