import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import { blogReducer } from './reducers/blogReducer'
import { loginReducer } from './reducers/loginReducer'
import { UsersReducer } from './reducers/UsersReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    loggedUser: loginReducer,
    users: UsersReducer
  },
})

export default store
