import Button from 'components/UI/Button/Button'
import Hint from 'components/UI/Hint/Hint'
import Input from 'components/UI/Input/Input'
import { NAME, PASSWORD, TEXT } from 'constants/inputFieldType'
import { REGISTRATION_PATH } from 'constants/paths'
import { useFetching } from 'hooks/useFetching'
import { useForm } from 'hooks/useForm'
import React, { ChangeEvent, useState } from 'react'
import { NavLink } from 'react-router-dom'
import AuthService from 'services/AuthService'
import { useAppDispatch } from 'store/hooks'
import { socketChatAction } from 'store/reducers/socketChatReducer'
import { checkInputField } from 'utils/checkInputField'
import styles from './Login.module.scss'

const Login = () => {
  const { values, handleChange } = useForm({
    [NAME]: '',
    [PASSWORD]: '',
  })
  const [hint, setHint] = useState('')
  const dispatch = useAppDispatch()

  const [fetchingLogin] = useFetching(
    async (name: string, password: string) => {
      await AuthService.login(name, password)
        .then((response) =>
          dispatch(socketChatAction.SET_CURRENT_USER(response.data))
        )
        .catch((error) => setHint(error.response.data.message))
    }
  )

  const handleSendForm = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    const isFormValid = checkInputField([values[PASSWORD], values[NAME]])

    if (isFormValid) {
      setHint('Введите пароль и имя')
      return
    }

    fetchingLogin(values[NAME], values[PASSWORD])
  }

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h2 className={styles.title}>Войти</h2>
        <Input
          placeholder={'Имя'}
          name={NAME}
          value={values[NAME]}
          type={TEXT}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <Input
          placeholder={'Пароль'}
          name={PASSWORD}
          value={values[PASSWORD]}
          type={PASSWORD}
          onChange={handleChange}
        />
        <div className={styles.buttonContainer}>
          <Button title={'Вход'} onClick={handleSendForm} type={'submit'} />
        </div>
        <div className={styles.alternateAction}>
          У вас нет учетной записи?
          <NavLink className={styles.link} to={REGISTRATION_PATH}>
            {'Зарегистрироваться'}
          </NavLink>
        </div>
        <Hint hint={hint} setHint={setHint} />
      </div>
    </div>
  )
}

export default Login
