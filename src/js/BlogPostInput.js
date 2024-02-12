import React, { useState } from "react";

function BlogPostInput() {
  // State variables to store the input values
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any necessary actions with the title and content values (e.g., send to server)
    console.log("Submitted:", { title, content });
    // Clear the input fields after submission
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <h1>Create a New Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BlogPostInput;
