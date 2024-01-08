import Close from 'assets/svg/Close'
import Reply from 'assets/svg/Reply'
import { useTyping } from 'hooks/useTyping'
import { TMessageData, TMessageProcessing, type TMessage } from 'models/Message'
import React, { ChangeEvent, FC, ReactNode, useEffect, useRef } from 'react'
import {
  wsSendMessage,
  wsStartTyping,
  wsStopTyping,
} from 'store/actions/socketChat'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectCurrentUser } from 'store/selectors'
import { getActiveClassName } from 'utils/getActiveClassName'
import Angle from '../../../../assets/svg/Angle'
import EmojiDropdown from './EmojiDropdown/EmojiDropdown'
import styles from './InputArea.module.scss'

type TInputAreaProps = {
  textAreaMessage: TMessage
  setTextAreaMessage: Function
  replyTo: TMessageData | null
  setReplyTo: Function
}

const InputArea: FC<TInputAreaProps> = (props) => {
  const { textAreaMessage, setTextAreaMessage, replyTo, setReplyTo } = props
  const user = useAppSelector(selectCurrentUser)

  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const dispatch = useAppDispatch()

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaMessage((prevMessage: TMessage) => {
      return {
        ...textAreaMessage,
        data: { ...textAreaMessage.data, text: e.target.value },
      }
    })
    updateTextareaHeight()
  }

  useEffect(() => {
    updateTextareaHeight()
  }, [textAreaMessage])

  const handleAddEmoji = (smile: ReactNode) => {
    const selectionStart = textAreaRef.current!.selectionStart
    const selectionEnd = textAreaRef.current!.selectionEnd
    const textAreaValue = textAreaRef.current!.value

    const prevValue = textAreaValue!.slice(0, selectionStart)
    const nextValue = textAreaValue!.slice(selectionEnd)

    const modifiedValue = prevValue + smile + nextValue

    setTextAreaMessage((prevMessage: TMessage) => {
      return {
        ...prevMessage,
        data: {
          ...prevMessage.data,
          text: modifiedValue,
          typed: false,
        },
      }
    })
    textAreaRef.current!.focus()
    updateTextareaHeight()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }

    if (
      e.key === 'Enter' &&
      e.shiftKey === false &&
      e.ctrlKey === false &&
      e.altKey === false &&
      e.metaKey === false
    ) {
      handleSendMessage()

      if (textAreaRef.current) {
        updateTextareaHeight()
      }

      textAreaRef.current!.style.height = `${1 * 1.15}rem`
    }

    if (e.key === 'Backspace') {
      updateTextareaHeight()
    }
  }

  const updateTextareaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }
  }

  const handleSendMessage = () => {
    if (!textAreaMessage.data.text || !user.id || !user.name) {
      return
    }

    dispatch(
      wsSendMessage({
        ...textAreaMessage,
        data: {
          ...textAreaMessage.data,
          edited: false,
          replyTo: replyTo,
        },
      })
    )
    setTextAreaMessage({
      ...textAreaMessage,
      data: { ...textAreaMessage.data, text: '' },
      processing: TMessageProcessing.ADD,
    })
    updateTextareaHeight()
    setReplyTo(null)
  }

  const isTyping = useTyping()
  useEffect(() => {
    if (isTyping) {
      dispatch(wsStartTyping())
    }
    if (!isTyping) {
      dispatch(wsStopTyping())
    }
  }, [isTyping])

  return (
    <div className={styles.container}>
      {replyTo && (
        <div
          className={styles.replyTo}
          style={{
            left: `${textAreaRef.current?.offsetLeft}px`,
            width: `${textAreaRef.current?.offsetWidth}px`,
            maxWidth: `${textAreaRef.current?.offsetWidth}px`,
          }}
        >
          <div className={styles.replyToIcon}>
            <Reply />
          </div>

          <div className={styles.replyToAuthor}>
            <span>{`Ответ на сообщение ${replyTo?.user.name}`}</span>
            <span>{replyTo?.text}</span>
          </div>

          <div
            className={styles.deleteReplyToIcon}
            onClick={() => {
              setReplyTo(null)
            }}
          >
            <Close />
          </div>
        </div>
      )}

      <div className={styles.inputArea}>
        <div className={styles.textarea}>
          <label className={styles.name} htmlFor='inputTextarea'>
            {user.name}
            {'>\u00A0'}
          </label>
          <textarea
            value={textAreaMessage.data.text}
            onChange={(e) => handleChange(e)}
            rows={1}
            style={{ height: `calc(1 * 1.15)rem` }}
            ref={textAreaRef}
            onKeyDown={(e) => handleKeyDown(e)}
            id='inputTextarea'
            onBlur={() => {
              if (!textAreaMessage.data.text) {
                setTextAreaMessage({
                  ...textAreaMessage,
                  data: { ...textAreaMessage.data, text: '' },
                  processing: TMessageProcessing.ADD,
                })
              }
            }}
          />
          <div
            className={getActiveClassName(
              styles,
              'angleButton',
              !!textAreaMessage.data.text
            )}
            onClick={(e) => {
              handleSendMessage()
              textAreaRef.current!.style.height = `${1 * 1.15}rem`
            }}
          >
            <Angle />
          </div>
        </div>

        <EmojiDropdown addEmoji={handleAddEmoji} />
      </div>
    </div>
  )
}

export default InputArea
