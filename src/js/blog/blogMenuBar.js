import React from 'react';
import '../../css/blog.css';

function BlogMenuBar({ categories }) {
    return (
      <div className="blog-menu-bar">
        {categories.map(category => (
          <a key={category.blogCategoryId} href={`/blog/${category.blogCategoryPath}`} className="blog-menu-item">
            {category.blogCategoryName}
          </a>
        ))}
      </div>
    );
  }
  
  export default BlogMenuBar;