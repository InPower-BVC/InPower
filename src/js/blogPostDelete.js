import React, { useState, useEffect } from 'react';

function BlogPostDelete() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedPost, setSelectedPost] = useState('');
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const convertBufferToBase64 = (buffer) => {
    if (!buffer || buffer.length === 0) return '';

    // Convert buffer to base64 string
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return `data:image/jpeg;base64,${window.btoa(binary)}`;
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    // Fetch all categories from the server
    fetch('http://localhost:5000/blogcategories')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => console.error('Error fetching categories:', error));
  };

  const handleCategoryChange = (e) => {
    const categoryName = e.target.value;
    console.log('Selected Category Name:', categoryName);
    setSelectedCategory(categoryName);
    setSelectedTopic('');
    setSelectedPost('');
    setContent('');
    setImage(null);
    // Fetch topics based on the selected category name
    fetchTopicsByCategory(categoryName);
  };

  const fetchTopicsByCategory = (categoryName) => {
    fetch(`http://localhost:5000/blogpostsbycategory?blogCategoryName=${encodeURIComponent(categoryName)}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched topics:', data);
        setPosts(data);
      })
      .catch(error => console.error('Error fetching topics:', error));
  };

  const handleTopicChange = (e) => {
    const topic = e.target.value;
    console.log('Selected Topic:', topic);
    setSelectedTopic(topic);
    // Fetch post based on the selected topic
    fetchPostByTopic(topic);
  };

  const fetchPostByTopic = (topic) => {
    fetch(`http://localhost:5000/blogpostsbytopic?topic=${encodeURIComponent(topic)}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched post:', data);
        setContent(data.content);
        setSelectedPost(data.blogPostId);
        // Convert image data to a Blob URL
        if (data.profileImg) {
          // const blob = new Blob([data.profileImg], { type: 'image/jpeg' }); // Assuming the image type is JPEG
          setImage(data.profileImg);
        } else {
          setImage(null); // Set to null if no image data is available
        }
      })
      .catch(error => console.error('Error fetching post:', error));
  };
  
  

  const handlePostChange = (e) => {
    const postId = e.target.value;
    console.log('Selected Post:', postId);
    setSelectedPost(postId);
  };

  const handleDelete = () => {
    console.log(selectedPost)
    if (selectedPost) {
      // Send a DELETE request to the server to delete the selected post
      fetch(`http://localhost:5000/blogposts/${selectedPost}`, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            alert('Post deleted successfully.');
            setSelectedCategory('');
            setSelectedTopic('');
            setSelectedPost('');
            setContent('');
            setImage(null);
            fetchCategories(); // Refresh the categories after deletion
          } else {
            throw new Error('Failed to delete post.');
          }
        })
        .catch(error => console.error('Error deleting post:', error));
    } else {
      alert('Please select a post to delete.');
    }
  };

  return (
    <div>
      <h2>Delete Blog Post</h2>
      <form style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <label htmlFor="category" style={{ flex: '0 0 120px', fontWeight: 'bold', marginRight: '20px' }}>Category:</label>
          <select id="category" onChange={handleCategoryChange} value={selectedCategory} required style={{ flex: '1', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="">Please select a category</option>
            {categories.map(category => (
              <option key={category.blogCategoryId} value={category.blogCategoryName}>{category.blogCategoryName}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <label htmlFor="topic" style={{ flex: '0 0 120px', fontWeight: 'bold', marginRight: '20px' }}>Topic:</label>
          <select id="topic" onChange={handleTopicChange} value={selectedTopic} required style={{ flex: '1', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="">Please select a topic</option>
            {posts.map(post => (
              <option key={post.blogPostId} value={post.topic}>{post.topic}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <label htmlFor="content" style={{ flex: '0 0 120px', fontWeight: 'bold', marginRight: '20px' }}>Content:</label>
          <textarea id="content" value={content} readOnly style={{ flex: '1', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', height: '200px' }}></textarea>
        </div>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <label htmlFor="image" style={{ flex: '0 0 120px', fontWeight: 'bold', marginRight: '20px' }}>Image:</label>
        {image && (
        <img src={image} alt="Image" style={{ maxWidth: '100px', marginRight: '20px' }} />
          )}
       {!image && <span>No image available</span>}
</div>

        <button type="button" onClick={handleDelete} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 20px', cursor: 'pointer', marginLeft: '120px' }}>Delete Post</button>
      </form>
    </div>
  );
  
  
}

export default BlogPostDelete;
