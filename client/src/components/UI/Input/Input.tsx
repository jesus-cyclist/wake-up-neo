import { FC, useRef, useState } from 'react'
import styles from './Input.module.scss'

export type TInputProps = {
  value: string
  placeholder: string
  type: 'text' | 'email' | 'password'
  onChange: Function
  name: string
  disabled?: boolean
}

const Input: FC<TInputProps> = (props) => {
  const { value, placeholder, type, onChange, name, disabled = false } = props

  const inputRef = useRef<HTMLInputElement | null>(null)
  const placeholderRef = useRef(null)

  const handleClick = () => {
    inputRef.current && inputRef.current.focus()
  }

  const getActiveClassName = (className: string, isActive: boolean) => {
    return isActive
      ? `${styles[className]} ${styles[`${className}Active`]}`
      : styles[className]
  }

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        value={value}
        className={styles.input}
        placeholder={placeholder}
        type={'text'}
        onChange={(e) => onChange(e)}
        name={name}
        required
        disabled={disabled}
      ></input>

      <span
        className={getActiveClassName('placeholder', !!value)}
        onClick={handleClick}
        ref={placeholderRef}
      >
        {placeholder}
      </span>
    </div>
  )
}

export default Input
