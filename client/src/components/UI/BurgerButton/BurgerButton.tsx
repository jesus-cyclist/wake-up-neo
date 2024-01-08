import { FC } from 'react'
import styles from './BurgerButton.module.scss'

type TBurgerButtonProps = {
  isActive: boolean
  onClick: Function
}

const BurgerButton: FC<TBurgerButtonProps> = (props) => {
  const { isActive, onClick } = props

  const getActiveClassName = (className: string, isActive: boolean) => {
    return isActive
      ? `${styles[className]} ${styles[`${className}Active`]}`
      : styles[className]
  }
  return (
    <div
      className={getActiveClassName('burgerButton', isActive)}
      onClick={(e) => onClick()}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default BurgerButton
