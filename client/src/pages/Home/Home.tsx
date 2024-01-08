import Chat from 'components/Chat/Chat'
import { WS_URL } from 'constants/paths'
import { useEffect } from 'react'
import { connect, disconnect } from 'store/actions/socketChat'
import { useAppDispatch } from 'store/hooks'
import styles from './Home.module.scss'

const Home = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log('mount')
    dispatch(connect(WS_URL))
    return () => {
      dispatch(disconnect())
    }
  }, [])

  return (
    <div className={styles.home}>
      <Chat />
    </div>
  )
}

export default Home
