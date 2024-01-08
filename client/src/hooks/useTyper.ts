import { useLayoutEffect, useState, SetStateAction, Dispatch } from 'react'
import { useAppDispatch } from 'store/hooks'
import { settingsAction } from 'store/reducers/settingsReducer'

type TyperHook = [boolean, Dispatch<SetStateAction<boolean>>]

export const useTyper = (): TyperHook => {
  const localTyper = localStorage.getItem('app-settings-typer')
  const dispatch = useAppDispatch()

  const [isTyperActive, setIsTyperActive] = useState(
    localTyper === 'true' || localTyper === null ? true : false
  )

  useLayoutEffect(() => {
    if (isTyperActive) {
      localStorage.setItem('app-settings-typer', 'true')
      dispatch(settingsAction.ACTIVATE_TYPER())
      return
    }
    localStorage.setItem('app-settings-typer', 'false')
    dispatch(settingsAction.DEACTIVATE_TYPER())
  }, [isTyperActive])

  return [isTyperActive, setIsTyperActive]
}
