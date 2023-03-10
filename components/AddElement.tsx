import { FC, forwardRef, MouseEventHandler } from "react";
import styles from '@/styles/components/AddElement.module.scss'
import { IconButton, Tooltip } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

interface AddElementProps {
  title: React.ReactNode;
  tooltipTitle: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>
}

const AddElement: FC<AddElementProps> = forwardRef(({
  title,
  tooltipTitle = 'holiwis',
  onClick
}) => {
  return (
    <Tooltip title={tooltipTitle}>
      <IconButton onClick={onClick} className={styles.root}>
        <AddIcon />
        <h3>{title}</h3>
      </IconButton>
    </Tooltip>
  )
}) 

export default AddElement