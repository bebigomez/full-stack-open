import blogService from '../services/blogs'

export const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      const blogs = action.payload
      const blogsCopy = [...blogs]
      const sortedBlogs = blogsCopy.sort((a, b) => b.likes - a.likes)
      return sortedBlogs

    case 'APPEND_BLOG':
      return state.concat(action.payload)

    case 'REMOVE_BLOG':
      const id = action.payload
      return state.filter((blog) => blog.id !== id)

    case 'LIKE_BLOG':
      const updatedBlog = action.payload
      const newState = state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
      const sortedState = newState.sort((a, b) => b.likes - a.likes)
      return sortedState

    case 'COMMENT_BLOG':
      const newCommentedBlogObject = action.payload
      return state.map((blog) =>
        blog.id === newCommentedBlogObject.id ? newCommentedBlogObject : blog
      )

    default:
      return state
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({ type: 'SET_BLOGS', payload: blogs })
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch({ type: 'APPEND_BLOG', payload: newBlog })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch({ type: 'REMOVE_BLOG', payload: id })
  }
}

export const likeBlog = (blog) => {
  const modifiedBlog = { ...blog, likes: blog.likes + 1 }

  return async (dispatch) => {
    const updatedBlog = await blogService.update(modifiedBlog.id, modifiedBlog)
    dispatch({ type: 'LIKE_BLOG', payload: updatedBlog })
  }
}

export const commentBlog = (blog, newComment) => {
  return async (dispatch) => {
    await blogService.commentBlog(blog.id, newComment)
    const commentedBlog = { ...blog, comments: [...blog.comments, newComment] }
    dispatch({ type: 'COMMENT_BLOG', payload: commentedBlog })
  }
}
