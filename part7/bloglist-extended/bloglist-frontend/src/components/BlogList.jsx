import { useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import Footer from './Footer'
import { BlogItem } from './StyledComponents'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      <BlogForm />

      <div className="bloglist-container">
        {blogs.map((blog) => (
          <div className="blog" key={blog.id}>
            <BlogItem to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </BlogItem>
          </div>
        ))}

        <Footer />
      </div>
    </div>
  )
}

export default BlogList
