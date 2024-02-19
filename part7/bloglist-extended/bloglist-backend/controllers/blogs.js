const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ? likes : 0,
  })

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  if (!title || !url) {
    return response.status(400).json({ error: 'Title and url are required' })
  }

  blog.user = user._id

  const createdBlog = await blog.save()

  await createdBlog.populate('user', { id: 1, name: 1, username: 1 })

  user.blogs = user.blogs.concat(createdBlog._id)
  await user.save()

  response.status(201).json(createdBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, url, author, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, url, author, likes },
    { new: true }
  )

  await updatedBlog.populate('user', { id: 1, name: 1, username: 1 })

  response.json(updatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  const user = request.user

  if (!user || blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  user.blogs = user.blogs.filter((b) => b.toString() !== blog.id.toString())

  await user.save()
  await Blog.deleteOne({ _id: blog.id })

  response.status(204).end()
})

blogsRouter.post('/:id/comments', userExtractor, async (request, response) => {
  const { comment } = request.body

  try {
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    blog.comments.push(comment)
    await blog.save()

    response.status(201).json(blog)
  } catch (error) {
    console.error('Error adding comment:', error)
    response.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = blogsRouter
