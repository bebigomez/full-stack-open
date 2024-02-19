import { useState } from 'react'
import { useDispatch } from 'react-redux'

import Togglable from './Togglable'

import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { clearNotification } from '../reducers/notificationReducer'
import { Button } from './StyledComponents'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = async (blogObject) => {
    dispatch(createBlog(blogObject))
    dispatch(
      setNotification({
        text: `A new blog that you won't need by ${blogObject.author}`,
        className: 'success',
      })
    )
    setTimeout(() => {
      dispatch(clearNotification())
    }, 3000)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Togglable id={'new-blog-button'} buttonLabel="create new blog">
      <h2>create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div className='inputs-container'>
          <div>
            title:
            <input
              id="title"
              value={title}
              name="title"
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div>
            author:
            <input
              id="author"
              value={author}
              name="author"
              onChange={(event) => setAuthor(event.target.value)}
            />
          </div>
          <div>
            url:
            <input
              id="url"
              value={url}
              name="url"
              onChange={(event) => setUrl(event.target.value)}
            />
          </div>
        </div>
        <Button variant="secondary" id="save-button" type="submit">
          save
        </Button>
      </form>
    </Togglable>
  )
}

export default BlogForm
