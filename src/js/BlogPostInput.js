import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import backendBaseURL from "./blog/blogConfig";

function BlogPostInput() {
  const [blogCategories, setBlogCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isFeatured, setIsFeatured] = useState(false); // State for the tick box
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogCategories();
  }, []);

  const fetchBlogCategories = async () => {
    try {
      const response = await fetch(`${backendBaseURL}/allblogcategories`);
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
  const handleContentChange = (value) => {
    setContent(value);
  };

  // Handle checkbox change for featured option
const handleIsFeaturedChange = (e) => {
  setIsFeatured(e.target.checked);
};

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const fileName = `${Date.now()}_${file.name}`; // Adding timestamp prefix to filename
    setImage({ file, fileName })
    console.log("File name:", fileName); 
  };

  useEffect(() => {
    console.log("Image state:", image);
  }, [image]);

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

    // Append the image file to the form data
    if (image) {
      formData.append("profileImgFile", image.file); // Append file
      formData.append("profileImgFileName", image.fileName); // Append file name
    }

    // Append isFeatured to formData only if it's true
    if (isFeatured) {
      formData.append("isFeatured", "True");
    }

    // Send formData to server using fetch
    const response = await fetch(`${backendBaseURL}/blogposts`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to submit blog post");
    }

    // Reset the form after successful submission
    e.target.reset();

    // Reset state variables
    setSelectedCategory(null);
    setTopic("");
    setContent("");
    setImage(null);
    setIsFeatured(false); 

    console.log("Blog post submitted successfully");

  } catch (error) {
    console.error("Error submitting blog post:", error);
    // Handle error, show error message to the user, etc.
  } finally {
    setLoading(false); 
  }
};

  useEffect(()=>{
    console.log(content)
  },[content]);

  return (
    <div>
      <h2>Create New Blog Post</h2>
      <form onSubmit={handleSubmit} style={{ width: '70%', margin: '0 auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
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

          <ReactQuill
            theme='snow'
            value={content}
            onChange={handleContentChange}
            required
            style={{ flex: '1', borderRadius: '4px', minHeight: '150px', height: "100%" }} // Adjust the height here
          />

        </div>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <label htmlFor="image" style={{ flex: '0 0 120px', fontWeight: 'bold', marginRight: '20px' }}>Upload Image:</label>
          <input
            type="file"
            id="image"
            // accept="image/png"
            onChange={handleImageUpload}
            required
            style={{ flex: '1', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <label htmlFor="isFeatured" style={{ flex: '0 0 120px', fontWeight: 'bold', marginRight: '20px' }}>Feature:</label>
          <input
            type="checkbox"
            id="isFeatured"
            checked={isFeatured}
            onChange={handleIsFeaturedChange}
            style={{ marginRight: '10px' }}
          />
          <label htmlFor="isFeatured"> Yes / No </label>
        </div>
        {/* Loading spinner */}
        {loading && <div className="spinner"></div>}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 20px', cursor: 'pointer' }}>Submit</button>
          <Link to="/contentManagement">
            <button style={{ backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 20px', cursor: 'pointer' }}>Return</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default BlogPostInput;
