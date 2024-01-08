import { useAppSelector } from 'store/hooks'
import { selectIsMenuOpen } from 'store/selectors'
import styles from './Chat.module.scss'
import ChatPanel from './ChatPanel/ChatPanel'
import Header from './Header/Header'
import SettingsPanel from './SettingsPanel/SettingsPanel'

const Chat = () => {
  const isMenuOpen = useAppSelector(selectIsMenuOpen)

  const getActiveClassName = (className: string, isActive: boolean) => {
    return isActive
      ? `${styles[className]} ${styles[`${className}Active`]}`
      : styles[className]
  }

  return (
    <div className={getActiveClassName('chat', isMenuOpen)}>
      <Header />
      <SettingsPanel />
      <ChatPanel />
    </div>
  )
}

export default Chat
