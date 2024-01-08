import ContextMenu from 'components/UI/ContextMenu/ContextMenu'
import { TUser } from 'models/AuthResponse'
import {
  TMessage,
  TMessageData,
  TMessageEvent,
  TMessageProcessing,
  TUserEvent,
} from 'models/Message'
import { FC, useEffect, useRef, useState } from 'react'
import { wsDeleteMessage } from 'store/actions/socketChat'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectMessages, selectTypingUsers } from 'store/selectors'
import ChatTypers from './ChatTypers/ChatTypers'
import MessageList from './MessageList/MessageList'
import styles from './MessagesArea.module.scss'

type TMessagesAreaProps = {
  textAreaMessage: TMessage
  setTextAreaMessage: Function
  setReplyTo: Function
}

type TCoordinate = {
  clientX: number
  clientY: number
}

const MessagesArea: FC<TMessagesAreaProps> = (props) => {
  const { setTextAreaMessage, setReplyTo, textAreaMessage } = props
  const dispatch = useAppDispatch()

  const messages = useAppSelector(selectMessages)

  const [messagesList, setMessagesList] = useState<
    Array<TMessageEvent | TUserEvent> | []
  >([])

  const messageAreaRef = useRef<HTMLDivElement | null>(null)
  const [choosenMessage, setChoosenMessage] = useState<TMessageData | null>(
    null
  )
  const [isOwnerContextMenuOpen, setIsOwnerContextMenuOpen] = useState(false)
  const [isRecepientContextMenuOpen, setIsRecepientContextMenuOpen] =
    useState(false)
  const [contextMenuCoordinate, setContextMenuCoordinate] =
    useState<TCoordinate>({
      clientX: -1000,
      clientY: -1000,
    })

  useEffect(() => {
    setMessagesList([...messages])
  }, [messages])

  useEffect(() => {
    setMessagesList(messages)
    messageAreaRef.current!.scrollTop = messageAreaRef.current!.scrollHeight
  }, [messagesList, messages])

  const openContextMenu = (e: MouseEvent, message: TMessageData) => {
    e.preventDefault()

    setChoosenMessage(() => message)

    setContextMenuCoordinate({
      clientX: e.clientX,
      clientY: e.clientY,
    })
  }

  const closeContextMenu = () => {
    setIsOwnerContextMenuOpen(false)
    setIsRecepientContextMenuOpen(false)
    setChoosenMessage(null)
    setContextMenuCoordinate({
      clientX: -1000,
      clientY: -1000,
    })
  }

  const [typingList, setTypingList] = useState<Array<TUser>>([])
  const typingUsers = useAppSelector(selectTypingUsers)
  useEffect(() => {
    setTypingList(typingUsers)
  }, [typingUsers])

  return (
    <div className={styles.messagesArea} ref={messageAreaRef}>
      <MessageList
        list={messagesList}
        openOwnerContextMenu={(e: MouseEvent, message: TMessageData) => {
          setIsOwnerContextMenuOpen(true)
          openContextMenu(e, message)
        }}
        openRecepientContextMenu={(e: MouseEvent, message: TMessageData) => {
          setIsRecepientContextMenuOpen(true)
          openContextMenu(e, message)
        }}
      />

      <ChatTypers list={typingList} />

      <ContextMenu
        options={[
          {
            text: 'ответить',
            onClick: () => {
              setReplyTo(choosenMessage)
              closeContextMenu()
            },
          },
        ]}
        contextMenuCoordinate={contextMenuCoordinate}
        closeContextMenu={closeContextMenu}
        isContextMenuOpen={isRecepientContextMenuOpen}
      />
      <ContextMenu
        options={[
          {
            text: 'ответить',
            onClick: () => {
              setReplyTo(choosenMessage)
              closeContextMenu()
            },
          },
          {
            text: 'редактировать',
            onClick: () => {
              console.log('to edit', {
                data: { ...choosenMessage },
                processing: TMessageProcessing.EDIT,
              })

              setTextAreaMessage({
                data: { ...choosenMessage },
                processing: TMessageProcessing.EDIT,
              })

              if (choosenMessage?.replyTo) {
                setReplyTo(choosenMessage.replyTo)
              }

              closeContextMenu()
            },
          },
          {
            text: 'удалить',
            onClick: () => {
              if (choosenMessage) {
                dispatch(wsDeleteMessage(choosenMessage))
                closeContextMenu()
              }
            },
          },
        ]}
        contextMenuCoordinate={contextMenuCoordinate}
        closeContextMenu={closeContextMenu}
        isContextMenuOpen={isOwnerContextMenuOpen}
      />
    </div>
  )
}

export default MessagesArea
