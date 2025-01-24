const BlogPage = () => {

const postBlog = () => {
  const title = document.getElementById('blog-title').value;
  const content = document.getElementById('blog-content').value;
  const blogList = document.getElementById('blog-list');
  const newBlogItem = document.createElement('li');
  newBlogItem.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
  blogList.appendChild(newBlogItem);
};

return(
<section className="blog-section">
<h1>Latest Blog Posts</h1>
<div className="blog-container">
    <h1 className="blog-header">Welcome to My Blog</h1>
    <div className="blog-form">
      <input type="text" id="blog-title" placeholder="Enter blog title" />
      <textarea id="blog-content" placeholder="Write your blog content here" rows="5"></textarea>
      <button onClick={() => postBlog()}>Post Blog</button>
    </div>
    <ul className="blog-list" id="blog-list">
      {/* Blog items will appear here */}
    </ul>
  </div>
    <div className="blog-cards">
      {/* Blog Post 1 */}
      <div className="blog-card">
        <img src="https://via.placeholder.com/300x200" alt="Blog Post Image" />
        <div className="blog-card-content">
          <h2>Blog Post Title 1</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean convallis quam.</p>
          <a href="#">Read More</a>
        </div>
      </div>
      {/* Blog Post 2 */}
      <div className="blog-card">
        <img src="https://via.placeholder.com/300x200" alt="Blog Post Image" />
        <div className="blog-card-content">
          <h2>Blog Post Title 2</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean convallis quam.</p>
          <a href="#">Read More</a>
        </div>
      </div>
      {/* Blog Post 3 */}
      <div className="blog-card">
        <img src="https://via.placeholder.com/300x200" alt="Blog Post Image" />
        <div className="blog-card-content">
          <h2>Blog Post Title 3</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean convallis quam.</p>
          <a href="#">Read More</a>
        </div>
      </div>
    </div>
</section>
);
};

export default BlogPage;