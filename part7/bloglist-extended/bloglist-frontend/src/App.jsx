import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Routes, Route } from 'react-router-dom'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NavigationBar from './components/NavigationBar'
import Header from './components/Header'
import BlogList from './components/BlogList'
import UsersList from './components/UsersList'
import BlogDetails from './components/BlogDetails'
import UserDetails from './components/UserDetails'
import Footer from './components/Footer'

import { initLoggedUser } from './reducers/loginReducer'
import { initAllUsers } from './reducers/UsersReducer'
import { initBlogs } from './reducers/blogReducer'
import { Page } from './components/StyledComponents'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initLoggedUser())
    dispatch(initAllUsers())
    dispatch(initBlogs())
  }, [])

  const loggedUser = useSelector((state) => state.loggedUser)

  return (
    <div>
      <Notification />

      {!loggedUser && <LoginForm />}

      {loggedUser && (
        <div>
          <NavigationBar loggedUser={loggedUser} />
        <Page>
          <Header />

          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/users/:id" element={<UserDetails />} />
          </Routes>
        </Page>
        </div>
      )}
    </div>
  )
}

export default App
