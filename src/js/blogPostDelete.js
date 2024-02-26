

  return (
    <div>
      <h2>Delete Blog Post</h2>
      <form style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ marginBottom: '20px' }}>
            <label htmlFor="category" style={{ fontWeight: 'bold', marginRight: '20px' }}>Select Category:</label>
            <select id="category" onChange={handleCategoryChange} value={selectedCategory} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="">Select Category</option>
             {categories.map(category => (
            <option key={category.blogCategoryId} value={category.blogCategoryName}>{category.blogCategoryName}</option>
             ))}
            </select>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="post" style={{ fontWeight: 'bold', marginRight: '20px' }}>Select Post:</label>
          <select id="post" onChange={(e) => setSelectedPost(e.target.value)} value={selectedPost} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="">Select Post</option>
            {posts.map(post => (
              <option key={post.blogPostId} value={post.blogPostId}>{post.topic}</option>
            ))}
          </select>
        </div>
        <button type="button" onClick={handleDelete} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 20px', cursor: 'pointer' }}>Delete Post</button>
      </form>
    </div>
  );
}

export default BlogPostDelete;
