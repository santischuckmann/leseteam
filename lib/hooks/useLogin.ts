import { BuiltInProviderType } from 'next-auth/providers'
import { LiteralUnion, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export const useLogin = () => {
  const router = useRouter()

  const performLogin = async ({ loginPlatform }: { loginPlatform: LiteralUnion<BuiltInProviderType> }) => {
    await signIn(loginPlatform)

    router.replace('/')
  }

  return [ performLogin ]
}