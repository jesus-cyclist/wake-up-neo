import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute'
import { LOGIN_PATH, MAIN_PATH, REGISTRATION_PATH } from 'constants/paths'
import { useFetching } from 'hooks/useFetching'
import ForbiddenPage from 'pages/ForbiddenPage/ForbiddenPage'
import Home from 'pages/Home/Home'
import Login from 'pages/Login/Login'
import Registration from 'pages/Registration/Registration'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthService from 'services/AuthService'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { settingsAction } from 'store/reducers/settingsReducer'
import { socketChatAction } from 'store/reducers/socketChatReducer'
import { selectIsNoiseActive } from 'store/selectors'
import styles from './App.module.scss'

function App() {
  const dispatch = useAppDispatch()
  const isNoiseActive = useAppSelector(selectIsNoiseActive)

  const [fetchingCheckAuth] = useFetching(async () => {
    await AuthService.checkAuth()
      .then((response) =>
        dispatch(socketChatAction.SET_CURRENT_USER(response.data))
      )
      .catch((error) => console.log(error.response.data.message))
  })

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchingCheckAuth()
    }
    dispatch(settingsAction.CHECK_SETTINGS())
  }, [])

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
  }

  return (
    <div
      className={styles.container}
      onContextMenu={(e) => handleContextMenu(e)}
    >
      <div className={styles.app}>
        <Routes>
          <Route
            element={<ProtectedRoute component={<Home />} isAuthOnly={true} />}
            path={MAIN_PATH}
          />
          <Route
            element={
              <ProtectedRoute component={<Login />} isAuthOnly={false} />
            }
            path={LOGIN_PATH}
          />
          <Route
            element={
              <ProtectedRoute component={<Registration />} isAuthOnly={false} />
            }
            path={REGISTRATION_PATH}
          />
          <Route element={<ForbiddenPage />} path={'/*'} />
        </Routes>
      </div>
      {isNoiseActive && <div className={styles.scanlines}></div>}
    </div>
  )
}

export default App
