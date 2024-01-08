import { createAction } from '@reduxjs/toolkit'
import { TConnectDataToOwner, TMessage, TMessageData } from 'models/Message'

export const connect = createAction<string, 'WS_CONNECT'>('WS_CONNECT')
export const disconnect = createAction('WS_DISCONNECT')

export const wsConnecting = createAction('WS_CONNECTING')
export const wsOpen = createAction('WS_OPEN')
export const wsClose = createAction('WS_CLOSE')
export const wsMessage = createAction<TMessage, 'WS_MESSAGE'>('WS_MESSAGE')
export const wsError = createAction<string, 'WS_ERROR'>('WS_ERROR')
export const wsSendMessage = createAction<TMessage, 'WS_SEND_MESSAGE'>(
  'WS_SEND_MESSAGE'
)

//users action
export const wsSetUsers = createAction<TConnectDataToOwner, 'WS_SET_USERS'>(
  'WS_SET_USERS'
)

export const wsUserJoined = createAction<string | null, 'WS_USER_JOINED'>(
  'WS_USER_JOINED'
)
export const wsUserLeft = createAction<string | null, 'WS_USER_LEFT'>(
  'WS_USER_LEFT'
)

//message action
export const wsRecieveAllMessages = createAction<
  Array<TMessageData>,
  'WS_RECIEVE_ALL_MESSAGES'
>('WS_RECIEVE_ALL_MESSAGES')

export const wsDeleteMessage = createAction<TMessageData, 'WS_DELETE_MESSAGE'>(
  'WS_DELETE_MESSAGE'
)

export const wsStartTyping = createAction('WS_START_TYPING')

export const wsStopTyping = createAction('WS_STOP_TYPING')

export type TFeedActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>
  | ReturnType<typeof wsSendMessage>
  | ReturnType<typeof wsSetUsers>
  | ReturnType<typeof wsUserJoined>
  | ReturnType<typeof wsUserLeft>
  | ReturnType<typeof wsRecieveAllMessages>
  | ReturnType<typeof wsDeleteMessage>
  | ReturnType<typeof wsStartTyping>
  | ReturnType<typeof wsStopTyping>
