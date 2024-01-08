import { useClickOutside } from 'hooks/useClickOutside'
import { FC, ReactNode, useRef, useState } from 'react'
import { getActiveClassName } from 'utils/getActiveClassName'
import styles from './Dropdown.module.scss'

type DropdownItem = {
  component: ReactNode
  description: string
  onClick: () => void
}

type DropdownProps = {
  rows: number
  columns: number
  button: ReactNode
  options: Array<DropdownItem>
  close: () => void
  open: () => void
  isActive: boolean
}

const Dropdown: FC<DropdownProps> = (props) => {
  const { rows, columns, button, options, isActive, close, open } = props

  const listRef = useRef<HTMLUListElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const [coordinate, setCoordinate] = useState({
    top: `-10000px`,
    left: `-10000px`,
  })

  const componentRef = useRef<HTMLDivElement>(null)
  useClickOutside(componentRef, (e: Event) => {
    close()
  })

  const getCorrdinateY = () => {
    const listRect = listRef.current!.getBoundingClientRect()
    const buttonRect = buttonRef.current!.getBoundingClientRect()
    const screenHeight =
      window.innerHeight || document.documentElement.clientHeight

    if (screenHeight / 2 > buttonRect.top + buttonRect.height / 2) {
      return `${buttonRect.height}px`
    } else {
      return `-${listRect.height}px`
    }
  }

  const getCorrdinateX = () => {
    const listRect = listRef.current!.getBoundingClientRect()
    const buttonRect = buttonRef.current!.getBoundingClientRect()
    const screenWidth =
      window.innerWidth || document.documentElement.clientWidth

    if (screenWidth / 2 > buttonRect.left + buttonRect.width / 2) {
      return `${buttonRect.width}px`
    } else {
      return `${-listRect.width}px`
    }
  }

  const getTableStyle = () => {
    return {
      gridTemplateRows: `repeat(${rows},1fr)`,
      gridTemplateColumns: `repeat(${columns},1fr)`,
    }
  }

  return (
    <div className={styles.container} ref={componentRef}>
      <div
        className={getActiveClassName(styles, 'button', isActive)}
        onClick={() => {
          setCoordinate({
            top: getCorrdinateY(),
            left: getCorrdinateX(),
          })
          open()
        }}
        ref={buttonRef}
      >
        {button}
      </div>
      <ul
        className={getActiveClassName(styles, 'list', isActive)}
        style={{
          ...getTableStyle(),
          top: coordinate.top,
          left: coordinate.left,
        }}
        ref={listRef}
      >
        {options.map((option: DropdownItem) => (
          <li
            className={styles.list__item}
            key={option.description}
            onClick={() => {
              option.onClick()
              close()
            }}
          >
            {option.component}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dropdown
