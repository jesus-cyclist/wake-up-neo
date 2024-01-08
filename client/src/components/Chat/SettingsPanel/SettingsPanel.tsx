import Checkbox from 'components/UI/Checkbox/Checkbox'
import { useNoise } from 'hooks/useNoise'
import { useTyper } from 'hooks/useTyper'
import { FC } from 'react'
import { useAppSelector } from 'store/hooks'
import { selectIsMenuOpen, selectUsers } from 'store/selectors'
import { Accordion } from '../../UI/Accordion/Accordion'
import styles from './SettingsPanel.module.scss'
import Theme from './Theme/Theme'

const SettingsPanel: FC = () => {
  const isMenuOpen = useAppSelector(selectIsMenuOpen)
  const users = useAppSelector(selectUsers)

  const [isNoiseActive, setIsNoiseActive] = useNoise()
  const [isTyperActive, setIsTyperActive] = useTyper()

  const getActiveClassName = (className: string, isActive: boolean) => {
    return isActive
      ? `${styles[className]} ${styles[`${className}Active`]}`
      : styles[className]
  }

  return (
    <div className={getActiveClassName('settingsPanel', isMenuOpen)}>
      <div className={styles.test}></div>
      <Accordion
        title={`Пользователи(${users.connectionsCount})`}
        innerControl={true}
      >
        {users.connectedUsers.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </Accordion>
      <Accordion title={`Настройки`} innerControl={true}>
        <Checkbox
          id={'noise'}
          title={'Помехи'}
          isActive={isNoiseActive}
          toggle={() => setIsNoiseActive(!isNoiseActive)}
        />
        <Checkbox
          id={'typer'}
          title={'Имитация печати'}
          isActive={isTyperActive}
          toggle={() => setIsTyperActive(!isTyperActive)}
        />
        <Theme />
      </Accordion>
    </div>
  )
}

export default SettingsPanel
