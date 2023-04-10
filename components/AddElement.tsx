import { MouseEventHandler } from 'react'
import styles from '@/styles/components/AddElement.module.scss'
import { IconButton, Tooltip } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

interface AddElementProps {
  title: React.ReactNode;
  tooltipTitle: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const AddElement = ({
  title,
  tooltipTitle = 'Agrega el elemento',
  onClick
}: AddElementProps) => (
  <Tooltip title={tooltipTitle}>
    <IconButton onClick={onClick} classes={{ root: styles.root }}>
      <AddIcon />
      <h3>{title}</h3>
    </IconButton>
  </Tooltip>
)
