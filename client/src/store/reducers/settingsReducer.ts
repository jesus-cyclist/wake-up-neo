import { createSlice } from '@reduxjs/toolkit'

type TInitialState = {
  isMenuOpen: boolean
  isNoiseActive: boolean
  isTyperActive: boolean
}

export const initialState: TInitialState = {
  isMenuOpen: false,
  isNoiseActive: true,
  isTyperActive: true,
}

const settingsReducer = createSlice({
  name: 'SETTINGS',
  initialState,
  reducers: {
    CHECK_SETTINGS(state) {
      const theme = localStorage.getItem('app-settings-theme')
      const localNoise = localStorage.getItem('app-settings-noise')
      const isNoiseActive =
        localNoise === 'true' || localNoise === null ? true : false

      const localTyper = localStorage.getItem('app-settings-noise')
      const isTyperActive =
        localTyper === 'true' || localTyper === null ? true : false

      if (theme) {
        document.documentElement.setAttribute('data-theme', theme)
      } else {
        document.documentElement.setAttribute('data-theme', 'green')
      }

      if (isNoiseActive) {
        document.documentElement.setAttribute('app-settings-noise', 'true')
        state.isNoiseActive = true
      } else {
        state.isNoiseActive = false
        document.documentElement.setAttribute('app-settings-noise', 'false')
      }

      if (isTyperActive) {
        document.documentElement.setAttribute('app-settings-typer', 'true')
        state.isTyperActive = true
      } else {
        state.isTyperActive = false
        document.documentElement.setAttribute('app-settings-typer', 'false')
      }
    },
    TOOGLE_MENU(state) {
      state.isMenuOpen = !state.isMenuOpen
    },
    CLOSE_MENU(state) {
      state.isMenuOpen = false
    },
    ACTIVATE_NOISE(state) {
      state.isNoiseActive = true
    },
    DEACTIVATE_NOISE(state) {
      state.isNoiseActive = false
    },
    ACTIVATE_TYPER(state) {
      state.isTyperActive = true
    },
    DEACTIVATE_TYPER(state) {
      state.isTyperActive = false
    },
  },
})

export const settingsAction = settingsReducer.actions
export default settingsReducer.reducer
