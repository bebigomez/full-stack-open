import { useField } from '../hooks'
import { useDispatch } from 'react-redux'

import { setNotification } from '../reducers/notificationReducer'
import { setLoggedUser } from '../reducers/loginReducer'
import { clearNotification } from '../reducers/notificationReducer'

import loginService from '../services/login'
import blogService from '../services/blogs'
import { Button } from './StyledComponents'

const LoginForm = () => {
  const dispatch = useDispatch()

  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })
      blogService.setToken(user.token)
      dispatch(setLoggedUser(user))
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    } catch (exception) {
      dispatch(setNotification({
        text: 'Wrong credentials',
        className: 'error',
      }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 3000)
    }
  }

  return (
    <div className='login-form'>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input id='username' {...username} />
        </div>
        <div>
          password
          <input id='password' {...password} />
          <div>
            <Button variant='primary' id="login-button" type="submit">
              login
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
