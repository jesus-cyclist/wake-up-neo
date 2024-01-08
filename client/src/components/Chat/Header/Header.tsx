import { useAppDispatch, useAppSelector } from 'store/hooks'
import { settingsAction } from 'store/reducers/settingsReducer'
import { selectIsMenuOpen } from 'store/selectors'
import BurgerButton from '../../UI/BurgerButton/BurgerButton'
import styles from './Header.module.scss'

import Button from 'components/UI/Button/Button'
import { useFetching } from 'hooks/useFetching'
import AuthService from 'services/AuthService'
import { disconnect } from 'store/actions/socketChat'
import { socketChatAction } from 'store/reducers/socketChatReducer'

const Header = () => {
  const isMenuOpen = useAppSelector(selectIsMenuOpen)
  const [fetchingLogOut] = useFetching(async () => {
    await AuthService.logout().catch((e) =>
      console.log(e.response?.data?.message)
    )
  })
  const dispatch = useAppDispatch()

  const handleClickByrgerButton = () => dispatch(settingsAction.TOOGLE_MENU())

  const handleLOgOut = async () => {
    dispatch(disconnect())
    await fetchingLogOut()

    dispatch(socketChatAction.LOG_OUT())
  }

  return (
    <div className={styles.header}>
      <BurgerButton isActive={isMenuOpen} onClick={handleClickByrgerButton} />
      <Button title={'Выход'} onClick={handleLOgOut} type={'button'} />
    </div>
  )
}

export default Header
