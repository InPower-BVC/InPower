import React, { useState, useEffect } from "react";

function BlogPostInput() {
  const [blogCategories, setBlogCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch blog categories
  useEffect(() => {
    fetchBlogCategories();
  }, []);

  const fetchBlogCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/blogcategories");
      if (!response.ok) {
        throw new Error("Failed to fetch blog categories");
      }
      const data = await response.json();
      setBlogCategories(data);
    } catch (error) {
      console.error("Error fetching blog categories:", error);
    }
  };

  // Handle category selection
  const handleCategorySelect = (e) => {
    const categoryId = parseInt(e.target.value);
    const selectedCategory = blogCategories.find(
      (category) => category.blogCategoryId === categoryId
    );
    setSelectedCategory(selectedCategory);
  };

  // Handle topic input change
  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  // Handle content input change
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("blogCategoryId", selectedCategory.blogCategoryId);
      formData.append("blogCategoryName", selectedCategory.blogCategoryName);
      formData.append("topic", topic);
      formData.append("content", content);
      formData.append("createdDate", new Date().toISOString());
      formData.append("file", image);

      // Send formData to server using fetch
      const response = await fetch("http://localhost:5000/blogposts", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit blog post");
      }

      // Clear form fields after successful submission
      setSelectedCategory(null);
      setTopic("");
      setContent("");
      setImage(null);

    } catch (error) {
      console.error("Error submitting blog post:", error);
      // Handle error, show error message to the user, etc.
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <h2>Create New Blog Post</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <label htmlFor="category" style={{ flex: '0 0 120px', fontWeight: 'bold', marginRight: '20px' }}>Category:</label>
          <select id="category" onChange={handleCategorySelect} required style={{ flex: '1', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="">Please select the Blog category</option>
            {blogCategories.map((category) => (
              <option key={category.blogCategoryId} value={category.blogCategoryId}>
                {category.blogCategoryName}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <label htmlFor="topic" style={{ flex: '0 0 120px', fontWeight: 'bold', marginRight: '20px' }}>Topic:</label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={handleTopicChange}
            required
            style={{ flex: '1', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <label htmlFor="content" style={{ flex: '0 0 120px', fontWeight: 'bold', marginRight: '20px' }}>Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            required
            style={{ flex: '1', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', height: '200px' }} // Adjust the height here
          ></textarea>
        </div>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <label htmlFor="image" style={{ flex: '0 0 120px', fontWeight: 'bold', marginRight: '20px' }}>Upload Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            required
            style={{ flex: '1', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        {image && (
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ maxWidth: '100%' }} />
          </div>
        )}
        {/* Loading spinner */}
        {loading && <div className="spinner"></div>}
        <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 20px', cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
  );
  
  
  
}

export default BlogPostInput;
