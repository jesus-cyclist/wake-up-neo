import { combineReducers } from 'redux'

import settingsReducer from './reducers/settingsReducer'
import socketChatReducer from './reducers/socketChatReducer'

export const rootReducer = combineReducers({
  settings: settingsReducer,
  socketChat: socketChatReducer,
})
