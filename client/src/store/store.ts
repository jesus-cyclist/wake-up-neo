import { configureStore } from '@reduxjs/toolkit'
import { Middleware } from 'redux'
import {
  wsClose as ChatWsClose,
  connect as ChatWsConnect,
  wsConnecting as ChatWsConnecting,
  disconnect as ChatWsDisconnect,
  wsError as ChatWsError,
  wsOpen as ChatWsOpen,
  wsSendMessage as ChatWsSendMessage,
  wsDeleteMessage as ChatWsDeleteMessage,
  wsStartTyping as ChatWsStartTyping,
  wsStopTyping as ChatWsStopTyping,
} from './actions/socketChat'
import { socketMiddleware } from './middleware/socketMiddleware'
import { rootReducer } from './rootReducer'

const messageFeedMiddleware: Middleware = socketMiddleware({
  wsConnect: ChatWsConnect,
  wsDisconnect: ChatWsDisconnect,
  wsSendMessage: ChatWsSendMessage,
  wsConnecting: ChatWsConnecting,
  wsOnOpen: ChatWsOpen,
  wsOnClose: ChatWsClose,
  wsOnError: ChatWsError,
  wsDeleteMessage: ChatWsDeleteMessage,
  wsStartTyping: ChatWsStartTyping,
  wsStopTyping: ChatWsStopTyping,
})

const store = configureStore({
  reducer: { rootReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(messageFeedMiddleware),
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
