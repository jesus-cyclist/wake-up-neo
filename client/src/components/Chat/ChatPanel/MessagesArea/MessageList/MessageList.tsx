import { TMessageEvent, TUserEvent } from 'models/Message'
import { FC, ReactNode } from 'react'
import { useAppSelector } from 'store/hooks'
import { selectCurrentUser } from 'store/selectors'
import Message from './Message/Message'
import styles from './MessageList.module.scss'

type TMessageListProps = {
  list: Array<TMessageEvent | TUserEvent> | []
  openOwnerContextMenu: Function
  openRecepientContextMenu: Function
}

const MessageList: FC<TMessageListProps> = (props) => {
  const { list, openOwnerContextMenu, openRecepientContextMenu } = props
  const user = useAppSelector(selectCurrentUser)

  const getMessageList = (
    list: Array<TMessageEvent | TUserEvent> | []
  ): ReactNode => {
    return list.map((message: TMessageEvent | TUserEvent) => {
      switch (message.type) {
        case 'joinEvent':
          return (
            <div
              className={styles.joinMessage}
              key={message.data._id}
            >{`Пользователь ${message.data.user.name} вошел/ла в чат`}</div>
          )

        case 'leftEvent':
          return (
            <div
              className={styles.leftMessage}
              key={message.data._id}
            >{`Пользователь ${message.data.user.name} покинул/а чат`}</div>
          )

        case 'message':
          return (
            <Message
              message={message.data}
              isUserMessageOwner={message.data.user.name === user.name}
              key={message.data._id}
              openContextMenu={
                user.id === message.data.user.id
                  ? openOwnerContextMenu
                  : openRecepientContextMenu
              }
              align={user.id === message.data.user.id ? 'right' : 'left'}
            />
          )
        default:
          return <></>
      }
    })
  }

  return <div className={styles.container}>{getMessageList(list)} </div>
}

export default MessageList
