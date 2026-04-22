import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserById } from '../services/users'

const UserDetails = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUserById(id).then(setUser)
  }, [id])

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetails
