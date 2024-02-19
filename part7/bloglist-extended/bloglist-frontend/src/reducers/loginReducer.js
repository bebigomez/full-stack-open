import blogService from '../services/blogs'

const initialState = null

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    case 'CLEAR_USER':
      return null
    default:
      return state
  }
}

export const initLoggedUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const setLoggedUser = (user) => {
  return {
    type: 'SET_USER',
    payload: user,
  }
}

export const clearLoggedUser = () => {
  try {
    window.localStorage.removeItem('loggedUser')
    alert('user logged out')
  } catch (exception) {
    alert('Something wrong happened')
  }
  return {
    type: 'CLEAR_USER',
  }
}
