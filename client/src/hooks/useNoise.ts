import { useLayoutEffect, useState, SetStateAction, Dispatch } from 'react'
import { useAppDispatch } from 'store/hooks'
import { settingsAction } from 'store/reducers/settingsReducer'

type NoiseHook = [boolean, Dispatch<SetStateAction<boolean>>]

export const useNoise = (): NoiseHook => {
  const localNoise = localStorage.getItem('app-settings-noise')
  const dispatch = useAppDispatch()

  const [isNoiseActive, setIsNoiseActive] = useState(
    localNoise === 'true' || localNoise === null ? true : false
  )

  useLayoutEffect(() => {
    if (isNoiseActive) {
      localStorage.setItem('app-settings-noise', 'true')
      dispatch(settingsAction.ACTIVATE_NOISE())
      return
    }
    localStorage.setItem('app-settings-noise', 'false')
    dispatch(settingsAction.DEACTIVATE_NOISE())
  }, [isNoiseActive])

  return [isNoiseActive, setIsNoiseActive]
}
