import styles from '@/styles/Login.module.scss'
import { Box, IconButton, Typography } from '@mui/material'
import { GitHub as GithubIcon } from '@mui/icons-material'
import { Google as GoogleIcon } from '@mui/icons-material'
import { signIn } from 'next-auth/react'

export const LoginView = () => {
  return (
    <Box className={styles.root}>
      <Typography variant='h1' component='h1'>Empieza a reseñar tus libros favoritos</Typography>
      <IconButton 
        classes={{
          root: styles.buttonRoot
        }}
        onClick={() => signIn('github')}>
        <GithubIcon />
        Entrá con Github
      </IconButton>
      <IconButton 
        classes={{
          root: styles.buttonRoot
        }}
        onClick={() => signIn('google')}>
        <GoogleIcon />
        Entrá con Google  
      </IconButton>
    </Box>
  )
}