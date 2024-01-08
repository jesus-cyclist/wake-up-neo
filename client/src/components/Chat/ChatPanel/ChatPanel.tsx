import { TMessage, TMessageData, TMessageProcessing } from 'models/Message'
import { useState } from 'react'
import { useAppSelector } from 'store/hooks'
import { selectCurrentUser } from 'store/selectors'
import styles from './ChatPanel.module.scss'
import InputArea from './InputArea/InputArea'
import MessagesArea from './MessagesArea/MessagesArea'

const ChatPanel = () => {
  const user = useAppSelector(selectCurrentUser)

  const [textAreaMessage, setTextAreaMessage] = useState<TMessage>({
    processing: TMessageProcessing.ADD,
    data: {
      _id: '',
      user: {
        id: user.id!,
        name: user.name!,
      },
      text: '',
      timestamp: '',
      read: false,
      delivered: false,
      type: 'text',
      edited: false,
      typed: true,
    },
  })
  const [replyTo, setReplyTo] = useState<TMessageData | null>(null)

  return (
    <div className={styles.chatPanel}>
      <MessagesArea
        textAreaMessage={textAreaMessage}
        setTextAreaMessage={setTextAreaMessage}
        setReplyTo={setReplyTo}
      />
      <InputArea
        textAreaMessage={textAreaMessage}
        setTextAreaMessage={setTextAreaMessage}
        replyTo={replyTo}
        setReplyTo={setReplyTo}
      />
    </div>
  )
}

export default ChatPanel
