import { memo } from 'react'

const Blog = memo(function Blog({ blog }) {
  return (
    <section className="section blog-section" id="blog">
      <div className="container">
        <span className="section-label">// BLOG</span>
        <h2 className="section-title">Technical Blog</h2>
        <div className="blog-grid">
          {blog.map((post, i) => (
            <article className="blog-card" key={i}>
              <div className="blog-card-meta">
                <span className="blog-card-category">[ {post.category} ]</span>
                <span className="blog-card-readtime">{post.readTime}</span>
              </div>
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-preview">{post.preview}</p>
              <a href="#" className="blog-card-link">[ Read &rarr; ]</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
})

export default Blog
