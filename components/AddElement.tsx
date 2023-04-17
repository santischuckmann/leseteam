import { MouseEventHandler } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import styled from '@emotion/styled'

interface AddElementProps {
  title: React.ReactNode;
  tooltipTitle: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>
}

const Button = styled(IconButton)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background-color: cornflowerblue;
  border: 1px solid #aaa;
  &:hover {
    border: 1px solid #10101d;
    color: #aaa;
  }
  transition: 0.3s all;
`

export const AddElement = ({
  title,
  tooltipTitle = 'Agrega el elemento',
  onClick
}: AddElementProps) => (
  <Tooltip title={tooltipTitle}>
    <Button onClick={onClick}>
      <AddIcon />
      <h3>{title}</h3>
    </Button>
  </Tooltip>
)
