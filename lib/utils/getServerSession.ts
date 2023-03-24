import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'

export const getServerAuthSession = async (context: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res']
}) => {
  return await getServerSession(context.req, context.res, authOptions)
}