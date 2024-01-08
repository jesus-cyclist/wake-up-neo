import { FC } from 'react'
import { getActiveClassName } from 'utils/getActiveClassName'
import { ReactComponent as Check } from '../../../assets/svg/check.svg'
import styles from './Checkbox.module.scss'

type TCheckboxProps = {
  isActive: boolean
  id: string
  toggle: Function
  title: string
}

const Checkbox: FC<TCheckboxProps> = (props) => {
  const { id, isActive, toggle, title } = props
  return (
    <div className={styles.container}>
      <label
        className={getActiveClassName(styles, 'title', !isActive)}
        htmlFor={id}
      >
        {title}
      </label>
      <div className={styles.inputWrapper}>
        <div
          className={getActiveClassName(styles, 'fakeInput', !isActive)}
          onClick={() => toggle()}
        >
          <Check />
        </div>
        <input type={'checkbox'} id={id} onChange={() => toggle()} />
      </div>
    </div>
  )
}

export default Checkbox
