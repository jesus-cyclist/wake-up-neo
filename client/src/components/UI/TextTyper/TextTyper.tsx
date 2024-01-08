import { FC, useEffect, useState } from 'react'
import { getActiveClassName } from 'utils/getActiveClassName'
import { getRandomInteger } from '../../../utils/getRandomInteger'
import styles from './TextTyper.module.scss'

export type TTextTyperProps = {
  isActive: boolean
  text: string
  speed: 'high' | 'low' | 'normal'
}

const typerSpeed = {
  high: { start: 50, end: 150 },
  normal: { start: 150, end: 250 },
  low: { start: 250, end: 400 },
}

const TextTyper: FC<TTextTyperProps> = (props) => {
  const { text, speed, isActive } = props

  const [textProp, setTextProp] = useState('')
  const [visibleText, setVisibleText] = useState({
    text: '',
    ind: 0,
  })
  const [isKaretVisible, setIsKaretVisible] = useState(false)

  useEffect(() => {
    if (text !== '') {
      setTextProp(text)
    }
  }, [text])

  useEffect(() => {
    if (textProp !== '') {
      activateKaret()
      setTimeout(() => {
        activateTyper()
      }, 2000)
    }
  }, [textProp])

  const activateTyper = () => {
    setTimeout(() => {
      if (visibleText.text === textProp) {
        setIsKaretVisible(false)
        return
      }

      setVisibleText({
        text: (visibleText.text += textProp[visibleText.ind]),
        ind: (visibleText.ind += 1),
      })
      activateTyper()
    }, getRandomInteger(typerSpeed[speed]))
  }

  const activateKaret = () => {
    setTimeout(() => {
      if (visibleText.text === textProp) {
        setIsKaretVisible(false)
        return
      }

      setIsKaretVisible((prevIsKaretVisible) => !prevIsKaretVisible)
      activateKaret()
    }, 500)
  }

  if (isActive) {
    return <>{text}</>
  }

  return (
    <div className={getActiveClassName(styles, 'textTyper', isKaretVisible)}>
      {visibleText.text}
    </div>
  )
}

export default TextTyper
