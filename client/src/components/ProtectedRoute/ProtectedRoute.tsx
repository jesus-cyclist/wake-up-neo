import { LOGIN_PATH, MAIN_PATH } from 'constants/paths'
import { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { selectCurrentUser } from 'store/selectors'

type TProtectedRouteProps = {
  isAuthOnly: boolean
  component: ReactNode
}

const ProtectedRoute: FC<TProtectedRouteProps> = (props) => {
  const { isAuth } = useSelector(selectCurrentUser)
  const { isAuthOnly, component } = props
  const location = useLocation()

  if (isAuthOnly && !isAuth) {
    return <Navigate to={LOGIN_PATH} state={{ from: location }} replace />
  }

  if (!isAuthOnly && isAuth) {
    return <Navigate to={MAIN_PATH} replace />
  }

  return <>{component}</>
}

export default ProtectedRoute
