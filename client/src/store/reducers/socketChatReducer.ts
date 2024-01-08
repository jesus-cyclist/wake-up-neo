import { createSlice } from '@reduxjs/toolkit'
import uniqid from 'uniqid'
import { TMessageData, TMessageEvent, TUserEvent } from 'models/Message'
import {
  wsClose,
  wsConnecting,
  wsError,
  wsOpen,
} from 'store/actions/socketChat'
import { TUser } from 'models/AuthResponse'

enum WebsocketStatus {
  CONNECTING = 'CONNECTING',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

type TInitialState = {
  user: {
    isAuth: boolean
    id: string | null
    name: string | null
  }
  status: WebsocketStatus
  typingUsers: Array<TUser>
  error: string | null
  messages: Array<TUserEvent | TMessageEvent>
  allUsers: {
    connectionsCount: number
    connectedUsers: Array<TUser> | []
  }
  userEvents: {
    recentlyJoinedUsers: string | null
    recentlyLeftUsers: string | null
  }
}

const initialState: TInitialState = {
  user: {
    isAuth: false,
    id: null,
    name: null,
  },
  status: WebsocketStatus.OFFLINE,
  error: null,
  typingUsers: [],
  messages: [],
  allUsers: {
    connectionsCount: 0,
    connectedUsers: [],
  },
  userEvents: {
    recentlyJoinedUsers: null,
    recentlyLeftUsers: null,
  },
}

const socketChatReducer = createSlice({
  name: 'SOCKET_CHAT',
  initialState,
  reducers: {
    ADD_LEFT_USER_EVENT: (state, action) => {
      const _id = uniqid()
      const leftedUser: TUserEvent = {
        type: 'leftEvent',
        data: {
          _id,
          user: action.payload.user || 'unknown',
          timestamp: new Date().toISOString(),
        },
      }
      state.messages = [...state.messages, leftedUser]

      state.allUsers = {
        connectionsCount: action.payload.connectionsCount || 0,
        connectedUsers: action.payload.connectedUsers || [],
      }
    },
    ADD_JOIN_USER_EVENT: (state, action) => {
      const _id = uniqid()
      const joinedUser: TUserEvent = {
        type: 'joinEvent',
        data: {
          _id,
          user: action.payload.user || 'unknown',
          timestamp: new Date().toISOString(),
        },
      }
      state.messages = [...state.messages, joinedUser]

      state.allUsers = {
        connectionsCount: action.payload.connectionsCount || 0,
        connectedUsers: action.payload.connectedUsers || [],
      }
    },
    SET_USERS: (state, action) => {
      state.allUsers = {
        connectionsCount: action.payload.connectionsCount || 0,
        connectedUsers: action.payload.connectedUsers || [],
      }
    },
    SET_HISTORY_MESSAGES: (state, action) => {
      const modifiedMessages = [
        ...action.payload.map((message: TMessageData) => {
          return { type: 'message', data: message }
        }),
      ]
      state.messages = [...modifiedMessages]
    },
    ADD_MESSAGE: (state, action) => {
      state.messages = [
        ...state.messages,
        { type: 'message', data: action.payload },
      ]
    },
    UPDATE_MESSAGE: (state, action) => {
      state.messages = state.messages.map((messageEvent) => {
        if (
          messageEvent.type === 'message' &&
          messageEvent.data._id === action.payload._id
        ) {
          return { type: 'message', data: action.payload }
        }
        return messageEvent
      })
    },

    SET_CURRENT_USER: (state, action) => {
      state.user = {
        isAuth: true,
        ...action.payload.user,
      }
      localStorage.setItem('token', action.payload.accessToken)
    },
    LOG_OUT: (state) => {
      state.user = { isAuth: false, id: null, name: null }
      state.messages = []
      state.allUsers = {
        connectionsCount: 0,
        connectedUsers: [],
      }
      state.userEvents = {
        recentlyJoinedUsers: null,
        recentlyLeftUsers: null,
      }

      localStorage.removeItem('token')
    },

    LOG_OUT_FROM_ANOTHER_DEVISE: (state) => {
      state.user = { isAuth: false, id: null, name: null }
      state.messages = []
      state.allUsers = {
        connectionsCount: 0,
        connectedUsers: [],
      }
      state.userEvents = {
        recentlyJoinedUsers: null,
        recentlyLeftUsers: null,
      }
    },
    DELETE_MESSAGE: (state, action) => {
      if (!action.payload.success) {
        console.log('Удаление не произошло  - ошибка на сервере')
        return
      }
      state.messages = [...state.messages].filter(
        (message) => message.data._id !== action.payload._id
      )
    },
    SET_TYPING_USERS: (state, action) => {
      state.typingUsers = action.payload.filter(
        (user: TUser) => user.id !== state.user.id
      )
    },
  },
  extraReducers(builder) {
    builder
      .addCase(wsConnecting, (state) => {
        state.status = WebsocketStatus.CONNECTING
      })

      .addCase(wsOpen, (state) => {
        state.status = WebsocketStatus.ONLINE
      })

      .addCase(wsClose, (state) => {
        state.status = WebsocketStatus.OFFLINE
      })

      .addCase(wsError, (state, action) => {
        state.error = action.payload
      })
  },
})

export const socketChatAction = socketChatReducer.actions
export default socketChatReducer.reducer
