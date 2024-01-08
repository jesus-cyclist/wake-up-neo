import Button from 'components/UI/Button/Button'
import Input from 'components/UI/Input/Input'
import { NAME, PASSWORD, TEXT } from 'constants/inputFieldType'
import { LOGIN_PATH } from 'constants/paths'
import { useFetching } from 'hooks/useFetching'
import { useForm } from 'hooks/useForm'
import React, { ChangeEvent, useState } from 'react'
import { NavLink } from 'react-router-dom'
import AuthService from 'services/AuthService'
import { useAppDispatch } from 'store/hooks'
import { socketChatAction } from 'store/reducers/socketChatReducer'
import { checkInputField } from 'utils/checkInputField'
import Hint from '../../components/UI/Hint/Hint'
import styles from './Registration.module.scss'

const Registration = () => {
  const { values, handleChange } = useForm({
    [NAME]: '',
    [PASSWORD]: '',
  })
  const [hint, setHint] = useState('')
  const dispatch = useAppDispatch()
  const [fetchingRegistration] = useFetching(
    async (name: string, password: string) => {
      await AuthService.registration(name, password)
        .then((response) => {
          dispatch(socketChatAction.SET_CURRENT_USER(response.data))
        })
        .catch((error) => {
          setHint(error.response.data.message)
        })
    }
  )

  const handleSendForm = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const isFormValid = checkInputField([values[PASSWORD], values[NAME]])

    if (isFormValid) {
      setHint('Длина должна быть не менее 5 символов')
      return
    }

    fetchingRegistration(values[NAME], values[PASSWORD])
  }

  return (
    <div className={styles.container}>
      <div className={styles.registration}>
        <h2 className={styles.title}>Регистрация</h2>
        <Input
          placeholder={'имя'}
          name={NAME}
          value={values[NAME]}
          type={TEXT}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <Input
          placeholder={'пароль'}
          name={PASSWORD}
          value={values[PASSWORD]}
          type={PASSWORD}
          onChange={handleChange}
        />
        <div className={styles.buttonContainer}>
          <Button
            title={'Зарегистрироваться'}
            onClick={handleSendForm}
            type={'submit'}
          />
        </div>
        <div className={styles.alternateAction}>
          У вас же есть аккаунт?
          <NavLink className={styles.link} to={LOGIN_PATH}>
            {'Войти'}
          </NavLink>
        </div>
        <Hint hint={hint} setHint={setHint} />
      </div>
    </div>
  )
}

export default Registration
