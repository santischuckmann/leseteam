/* eslint-disable @typescript-eslint/no-non-null-assertion */
import NextAuth, { AuthOptions, Session } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from '@/lib/backing/connections/nextAuthMongo'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'



export const authOptions: AuthOptions = {
  secret: process.env.SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    })
  ],
  callbacks: {
    async session({ session, user }) {
      if (!session.user) {
        return session
      }

      const improvedSession: Session & { user: { id: string; }} = { 
        ...session,
        user: {
          ...session.user,
          id: user.id
        }
      }
      
      return improvedSession
    }
  },
  debug: process.env.NODE_ENV === 'development',
  adapter: MongoDBAdapter(clientPromise)
}

export default NextAuth(authOptions)