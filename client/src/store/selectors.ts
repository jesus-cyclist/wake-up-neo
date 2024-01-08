import { createSelector } from 'reselect'
import { type RootState } from 'store/store'

const getSettingsMenuIsOpen = (state: RootState) => state.rootReducer.settings
export const selectIsMenuOpen = createSelector(
  getSettingsMenuIsOpen,
  (settings) => settings.isMenuOpen
)

const getSettingsIsNoiseActive = (state: RootState) =>
  state.rootReducer.settings
export const selectIsNoiseActive = createSelector(
  getSettingsIsNoiseActive,
  (settings) => settings.isNoiseActive
)

const getSettingsIsTyperActive = (state: RootState) =>
  state.rootReducer.settings
export const selectIsTyperActive = createSelector(
  getSettingsIsTyperActive,
  (settings) => settings.isTyperActive
)

const getUser = (state: RootState) => state.rootReducer.socketChat
export const selectCurrentUser = createSelector(getUser, (user) => user.user)

const getUserCount = (state: RootState) => state.rootReducer.socketChat
export const selectUsers = createSelector(
  getUserCount,
  (socketChat) => socketChat.allUsers
)

const getUserEvents = (state: RootState) => state.rootReducer.socketChat
export const selectUsersEvents = createSelector(
  getUserEvents,
  (socketChat) => socketChat.userEvents
)

const getMessages = (state: RootState) => state.rootReducer.socketChat
export const selectMessages = createSelector(
  getMessages,
  (socketChat) => socketChat.messages
)

const getTypingUsers = (state: RootState) => state.rootReducer.socketChat
export const selectTypingUsers = createSelector(
  getTypingUsers,
  (socketChat) => socketChat.typingUsers
)
