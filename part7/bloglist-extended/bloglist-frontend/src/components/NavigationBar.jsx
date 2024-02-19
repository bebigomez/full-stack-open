import { useDispatch } from 'react-redux'
import { clearLoggedUser } from '../reducers/loginReducer'
import { Button, Navigation, StyledLink } from './StyledComponents'

const NavigationBar = ({ loggedUser }) => {
  const dispatch = useDispatch()

  const padding = {
    padding: 5,
  }

  return (
    <Navigation>
      <div>
        <StyledLink style={padding} to="/">
          Blogs
        </StyledLink>

        <StyledLink style={padding} to="/users">
          Users
        </StyledLink>
      </div>

      <div>
        <em style={padding}>
          {loggedUser.name} logged in{' '}
          <Button variant='primary'
            id="logout-button"
            onClick={() => dispatch(clearLoggedUser())}
          >
            logout
          </Button>
        </em>
      </div>
    </Navigation>
  )
}

export default NavigationBar
