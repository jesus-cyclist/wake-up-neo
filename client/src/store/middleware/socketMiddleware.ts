import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  Middleware,
} from '@reduxjs/toolkit'
import { Socket, io } from 'socket.io-client'
import {
  TConnectDataToOwner,
  TMessage,
  TMessageData,
  TMessageProcessing,
} from 'models/Message'
import { RootState } from 'store/store'
import { socketChatAction } from 'store/reducers/socketChatReducer'
import uniqid from 'uniqid'

export type TSocketChatMiddlewareActions = {
  wsConnect: ActionCreatorWithPayload<string>
  wsDisconnect: ActionCreatorWithoutPayload<string>
  wsSendMessage: ActionCreatorWithPayload<TMessage>
  wsConnecting: ActionCreatorWithoutPayload<string>
  wsOnOpen: ActionCreatorWithoutPayload<string>
  wsOnClose: ActionCreatorWithoutPayload<string>
  wsOnError: ActionCreatorWithPayload<string>
  wsDeleteMessage: ActionCreatorWithPayload<TMessageData>
  wsStartTyping: ActionCreatorWithoutPayload<string>
  wsStopTyping: ActionCreatorWithoutPayload<string>
}

export const socketMiddleware = (
  wsActions: TSocketChatMiddlewareActions
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: Socket | null = null

    return (next) => (action) => {
      const { dispatch } = store
      const user = store.getState().rootReducer.socketChat.user
      const isTyped = store.getState().rootReducer.settings.isTyperActive
      const {
        wsConnect,
        wsDisconnect,
        wsSendMessage,
        wsConnecting,
        wsOnOpen,
        wsOnClose,
        wsOnError,
        wsDeleteMessage,
        wsStartTyping,
        wsStopTyping,
      } = wsActions

      if (wsConnect.match(action)) {
        console.log('connecting', socket)
        // socket = io('http://localhost:5000', {
        socket = io('https://wake-up-neo.ru:5000', {
          path: '/api/messages',
          transports: ['websocket'],
          reconnectionDelay: 5000,
          query: {
            user: JSON.stringify({
              id: user.id,
              name: user.name,
            }),
          },
        })

        dispatch(wsConnecting())
      }

      if (socket) {
        socket.removeAllListeners()

        socket.on('connect', () => {
          // console.log('socket open = ', socket!.id)
          dispatch(wsOnOpen())
        })

        socket.on('connect_error', (error) => {
          //   console.log('socket error', error.message)
          dispatch(wsOnError(`Error === ${error.message}`))
        })

        socket.on('disconnect', (reason: any) => {
          // console.log('socket close', reason)
          dispatch(wsOnClose())
        })

        //USER
        socket.on('login', (data) => {
          const parsedData: TConnectDataToOwner = JSON.parse(data)
          //console.log('login data', parsedData)
          dispatch(socketChatAction.SET_USERS(parsedData))
          socket!.emit('message:getHistoryMessage')
        })

        socket.on('user left', (data) => {
          const parsedData: TConnectDataToOwner = JSON.parse(data)
          // console.log('user left ===', parsedData)
          dispatch(socketChatAction.ADD_LEFT_USER_EVENT(parsedData))
        })

        socket.on('user joined', (data) => {
          const parsedData: TConnectDataToOwner = JSON.parse(data)
          //console.log('user joined ===', parsedData)
          dispatch(socketChatAction.ADD_JOIN_USER_EVENT(parsedData))
        })

        socket.on('message:recieveHistoryMessage', (data) => {
          const messages = JSON.parse(data)
          dispatch(socketChatAction.SET_HISTORY_MESSAGES(messages))
        })

        socket.on('loggingFromAnotherDevice', (data: string) => {
          dispatch(socketChatAction.LOG_OUT_FROM_ANOTHER_DEVISE())
          console.log(data)
        })

        if (wsSendMessage.match(action)) {
          const messageData = action.payload

          switch (messageData.processing) {
            case TMessageProcessing.ADD:
              const modifiedData = {
                ...messageData.data,
                _id: uniqid(),
                timestamp: new Date().toISOString(),
              }
              //  console.log('TMessageProcessing.ADD', modifiedData)
              dispatch(socketChatAction.ADD_MESSAGE(modifiedData))
              socket.emit(
                'message:createNewMessage',
                JSON.stringify(modifiedData)
              )
              break

            case TMessageProcessing.EDIT:
              console.log('na server', {
                ...messageData.data,
                timestamp: new Date().toISOString(),
                edited: true,
              })
              socket.emit(
                'message:editMessage',
                JSON.stringify({
                  ...messageData.data,
                  timestamp: new Date().toISOString(),
                  edited: true,
                })
              )
              break
          }
        }

        socket.on('message:updateMessage', (data) => {
          const message = JSON.parse(data)
          // console.log('getUpdatedMessage === ', socket)
          dispatch(socketChatAction.UPDATE_MESSAGE(message))
        })

        socket.on('message:getNewMessage', (data) => {
          const message = JSON.parse(data)
          //console.log('new message === ', message)

          if (isTyped) {
            message.typed = false
          }

          dispatch(socketChatAction.ADD_MESSAGE(message))
        })

        if (wsDeleteMessage.match(action)) {
          socket.emit('message:deleteMessage', JSON.stringify(action.payload))
        }

        socket.on('message:getDeletedMessageId', (data) => {
          // console.log('deletedResult', JSON.parse(data))

          dispatch(socketChatAction.DELETE_MESSAGE(JSON.parse(data)))
        })

        if (wsStartTyping.match(action)) {
          console.log('typing')

          socket.emit(
            'message:startTyping',
            JSON.stringify({
              id: user.id,
              name: user.name,
            })
          )
        }

        if (wsStopTyping.match(action)) {
          console.log('stop typing')

          socket.emit(
            'message:stopTyping',
            JSON.stringify({
              id: user.id,
              name: user.name,
            })
          )
        }

        socket.on('message:usersTyping', (data) => {
          const parsedData = JSON.parse(data)
          dispatch(socketChatAction.SET_TYPING_USERS(parsedData))
        })

        if (wsDisconnect.match(action)) {
          console.log('disconnect')
          socket.close()
          socket.disconnect()
          socket = null
          dispatch(wsOnClose())
        }
      }

      next(action)
    }
  }
}
