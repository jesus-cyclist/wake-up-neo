import { TUser } from './AuthResponse'

export type TMessageReceivedSuccessfully = {
  success: true
  message: 'Сообщение успешно добавлено'
}

export enum TMessageProcessing {
  ADD = 'add',
  EDIT = 'edit',
}

export type TProcessing =
  (typeof TMessageProcessing)[keyof typeof TMessageProcessing]

export type TMessageData = {
  _id?: string
  user: {
    id: string
    name: string
  }
  text: string
  timestamp: string
  read: boolean
  delivered: boolean
  type: string
  replyTo?: TMessageData | null
  edited: boolean
  typed: boolean
}

export type TMessage = {
  processing: TProcessing
  data: TMessageData
}

export type TConnectDataToOwner = {
  connectionsCount: number
  connectedUsers: Array<string>
}

export type TMessageEvent = {
  type: 'message'
  data: TMessageData
}

export type TUserEvent = {
  type: 'joinEvent' | 'leftEvent'
  data: {
    _id: string
    user: TUser
    timestamp: string
  }
}
