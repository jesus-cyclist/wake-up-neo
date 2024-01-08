import { FC, ReactNode, useState } from 'react'
import { getActiveClassName } from 'utils/getActiveClassName'
import Angle from '../../../assets/svg/Angle'
import styles from './Accordion.module.scss'

export type TAccordionProps = {
  isOpen?: boolean
  open?: Function
  onToggle?: Function
  children: ReactNode
  title: string
  innerControl: boolean
}

export const Accordion: FC<TAccordionProps> = (props) => {
  const {
    isOpen: isOpenProp = false,
    onToggle: onToggleProp,
    children,
    title,
    open,
    innerControl = true,
  } = props

  const [isOpenState, setIsOpenState] = useState(false)

  const onToggle = () => {
    if (innerControl) {
      setIsOpenState((prevIsOpen) => !prevIsOpen)
    } else {
      onToggleProp?.()
    }
  }

  const isOpen = innerControl ? isOpenState : isOpenProp

  return (
    <div className={getActiveClassName(styles, 'accordion', isOpen)}>
      <button
        onClick={(e) => onToggle()}
        className={getActiveClassName(styles, 'triggerButton', isOpen)}
      >
        <span className={styles.title}>{title}</span>

        <div className={getActiveClassName(styles, 'angle', isOpen)}>
          <Angle />
        </div>
      </button>

      <div className={getActiveClassName(styles, 'content', isOpen)}>
        {children}
      </div>
    </div>
  )
}
