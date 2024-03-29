import { useState } from 'react'

const Blog = ({ blog, loggedUser, handleLike, handleDeletion }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div style={blogStyle}>
      <p>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>{showDetails ? 'hide' : 'show'}</button>
      </p>

      {showDetails && (
        <div className="showingDetails">
          <p>{blog.url}</p>
          <p>
            Likes: {blog.likes}
            <button onClick={handleLike}>like</button>
          </p>
          <p>{blog.user.name}</p>

          {(blog.user.username === loggedUser.username) ? (
            <button id='delete-button' onClick={handleDeletion}>delete</button>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default Blog
