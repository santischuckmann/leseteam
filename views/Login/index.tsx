import styles from '@/styles/Login.module.scss'
import { Box, IconButton, Typography } from '@mui/material'
import { GitHub as GithubIcon } from '@mui/icons-material'
import { Google as GoogleIcon } from '@mui/icons-material'
import { useLogin } from '@/lib/hooks'
import { LiteralUnion } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'

export const LoginView = () => {
  const [ login ] = useLogin()

  const performLogin = async (provider: LiteralUnion<BuiltInProviderType>) => await login({ loginPlatform: provider })

  return (
    <Box className={styles.root}>
      <Typography variant='h1' component='h1'>Empieza a reseñar tus libros favoritos</Typography>
      <IconButton 
        classes={{
          root: styles.buttonRoot
        }}
        onClick={() => performLogin('github')}>
        <GithubIcon />
        Entrá con Github
      </IconButton>
      <IconButton 
        classes={{
          root: styles.buttonRoot
        }}
        onClick={() => performLogin('google')}>
        <GoogleIcon />
        Entrá con Google  
      </IconButton>
    </Box>
  )
}