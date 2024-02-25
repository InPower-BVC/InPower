import React, { useState } from "react";

function BlogPostInput() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  // Handle title input change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
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

    try {
      const formData = new FormData();
      formData.append("blogPostId", /* value for blogPostId */);
      formData.append("blogCategoryId", /* value for blogCategoryId */);
      formData.append("blogCategoryName", /* value for blogCategoryName */);
      formData.append("topic", title);
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
      setTitle("");
      setContent("");
      setImage(null);

    } catch (error) {
      console.error("Error submitting blog post:", error);
      // Handle error, show error message to the user, etc.
    }
  };

  return (
    <div>
      <h2>Create New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
        </div>
        {image && (
          <div>
            <img src={URL.createObjectURL(image)} alt="Uploaded" />
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BlogPostInput;
