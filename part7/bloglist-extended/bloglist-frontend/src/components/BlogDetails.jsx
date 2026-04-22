import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { commentBlog, likeBlog } from '../reducers/blogReducer'
import { Button, Input, SubmitButton } from './StyledComponents'
import blogService from '../services/blogs'

const BlogDetails = () => {
  const [comment, setComment] = useState('')
  const [selectedBlog, setSelectedBlog] = useState(null)
  const { id } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getById(id).then(setSelectedBlog)
  }, [id])

  const handleComment = async (event) => {
    event.preventDefault()
    try {
      dispatch(commentBlog(selectedBlog, comment))
      setSelectedBlog((prev) => ({ ...prev, comments: [...prev.comments, comment] }))
      setComment('')
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  if (!selectedBlog) {
    return null
  }

  return (
    <div>
      
      <h2>{selectedBlog.title}</h2>
      <a>{selectedBlog.url}</a>
      <div>
        {selectedBlog.likes} likes {' '}
        <Button variant='primary' onClick={() => dispatch(likeBlog(selectedBlog))}>like</Button>
      </div>
      <div>added by {selectedBlog.author}</div>

      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <Input
          id="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <SubmitButton type="submit">add comment</SubmitButton>
      </form>

      <ul>
        {selectedBlog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>

    </div>
  )
}

export default BlogDetails
