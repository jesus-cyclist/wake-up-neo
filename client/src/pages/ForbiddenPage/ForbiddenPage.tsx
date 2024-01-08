import { MAIN_PATH } from 'constants/paths'
import { NavLink } from 'react-router-dom'
import styles from './ForbiddenPage.module.scss'

const ForbiddenPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.glitch} data-text='Такой страницы не существует'>
        Такой страницы не существует
      </h1>
      <NavLink className={styles.link} to={MAIN_PATH}>
        {'Вернуться'}
      </NavLink>
    </div>
  )
}

export default ForbiddenPage
