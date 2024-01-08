import { TUser } from 'models/AuthResponse'
import { FC, useEffect, useState } from 'react'
import { getActiveClassName } from 'utils/getActiveClassName'
import styles from './ChatTypers.module.scss'

type TChatTypersProps = {
  list: Array<TUser>
}

const ChatTypers: FC<TChatTypersProps> = (props) => {
  const { list } = props
  const [typersList, setTypersList] = useState<Array<string> | []>([])
  const [isTypeEffectActive, setIsTypeEffectActive] = useState(false)

  useEffect(() => {
    const typerNames: Array<string> = []
    list.forEach((user: TUser) => typerNames.push(user.name))
    setTypersList(typerNames)
  }, [list])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsTypeEffectActive((prevIsActive) => !prevIsActive)
    }, 500)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  switch (typersList.length) {
    case 0:
      return <div className={styles.chatTyper}></div>
    case 1:
      return (
        <div
          className={getActiveClassName(
            styles,
            'chatTyper',
            isTypeEffectActive
          )}
        >{`${typersList[0]} печатает`}</div>
      )

    case 2:
    case 3:
      return (
        <div
          className={getActiveClassName(
            styles,
            'chatTyper',
            isTypeEffectActive
          )}
        >{`${typersList.join(', ')} набирают сообщение`}</div>
      )

    default:
      const remains = [...typersList].slice(2).length
      const visibleTypers = [...typersList].slice(0, 2).join(', ')
      return (
        <div
          className={getActiveClassName(
            styles,
            'chatTyper',
            isTypeEffectActive
          )}
        >{`${visibleTypers} и еще ${remains} набирают сообщение`}</div>
      )
  }
}

export default ChatTypers
