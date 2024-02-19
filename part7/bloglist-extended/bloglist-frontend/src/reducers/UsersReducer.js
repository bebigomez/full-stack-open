import getAllUsers from '../services/users'

export const UsersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USERS':
      return action.payload
    default:
      return state
  }
}

export const initAllUsers = () => {
  return async (dispatch) => {
    const allUsers = await getAllUsers()
    dispatch({ type: 'SET_USERS', payload: allUsers })
  }
}

export default initAllUsers
