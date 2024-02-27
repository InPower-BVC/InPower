import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/blog.css';

function BlogMenuBar({ categories, activeCategoryId }) {
  return (
    <div className="blog-menu-bar">
      { categories.map(category => {
        return (
          <Link 
            key={category.blogCategoryId} 
            to={`/blog/category/${category.blogCategoryId}`} 
            className={`blog-menu-item ${category.blogCategoryId === activeCategoryId ? 'active-category' : ''}`}
          >
            {category.blogCategoryName}
          </Link>
        );
      })}
    </div>
  );
}
  
export default BlogMenuBar;