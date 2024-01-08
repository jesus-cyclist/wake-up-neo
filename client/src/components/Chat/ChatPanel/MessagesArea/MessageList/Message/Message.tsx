import Check from 'assets/svg/Check'
import TextTyper from 'components/UI/TextTyper/TextTyper'
import { TMessageData } from 'models/Message'
import { FC } from 'react'
import { ReactComponent as Test } from '../../../../../../assets/svg/reply.svg'
import styles from './Message.module.scss'

type TMessageProps = {
  message: TMessageData
  isUserMessageOwner: boolean
  openContextMenu: Function
  align: 'left' | 'right'
}

const Message: FC<TMessageProps> = (props) => {
  const { message, isUserMessageOwner, openContextMenu, align } = props

  const getTimeStamp = (timestamp: string) => timestamp.slice(11, 16)

  const getAlign = () => {
    return align === 'left' ? { left: 0 } : { right: 0 }
  }

  return (
    <div
      className={
        isUserMessageOwner ? styles.receiverMessage : styles.senderMessage
      }
      key={message._id}
    >
      <span className={styles.username}>{`${message.user.name}`}</span>
      <div className={styles.message}>
        {message.replyTo && (
          <div className={styles.message__replyTo}>
            <div className={styles.message__replyToAuthor}>
              <Test width={'1rem'} height={'1rem'} />
              {message.replyTo.user.name}
            </div>

            <div className={styles.message__replyToText}>
              {message.replyTo.text}
            </div>
          </div>
        )}
        <div
          className={styles.message__text}
          onContextMenu={(e) => openContextMenu(e, message)}
        >
          <TextTyper
            speed={'high'}
            text={message.text}
            isActive={message.typed}
          />
        </div>

        <div className={styles.timestamp} style={getAlign()}>
          {message.edited && <div className={styles.editedMessage}>ред.</div>}
          {getTimeStamp(message.timestamp)}
          {isUserMessageOwner && (
            <div className={styles.status}>
              <Check />
              {message.delivered && <Check />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Message
