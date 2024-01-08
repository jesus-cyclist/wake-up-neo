import { FC } from 'react'
import styles from './Button.module.scss'

type TButtonProps = {
  onClick: Function
  title: string
  type: 'button' | 'reset' | 'submit'
}

const Button: FC<TButtonProps> = (props) => {
  const { onClick, title, type } = props

  return (
    <button className={styles.button} onClick={(e) => onClick(e)} type={type}>
      {title}
    </button>
  )
}

export default Button
