/* eslint-disable @typescript-eslint/no-non-null-assertion */
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const providerNames = {
  Credentials: 'CREDENTIALS'
}

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
}

export default NextAuth(authOptions)