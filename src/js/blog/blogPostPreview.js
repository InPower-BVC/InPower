import React from 'react';
import '../../css/blog.css';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}.${day}.${year}`;
  }

const BlogPostPreview = ({ post }) => {
    const category = post.blogCategoryName ? post.blogCategoryName.toUpperCase() : '';
    const formattedDate = formatDate(post.createdDate);
  
  return (
    <div className="blog-post-preview">
        <div className="thumbnail-container">
        <img src={`../img/blog/${post.profileImg}`} alt="Thumbnail" className="thumbnail" />
        </div>
        <div className="post-info">
            <div className="blog-category">
                <a href={`/${post.blogCategoryPath}`} className="category-link">{category}</a>
            </div>
            <div className="blog-topic">
                <a href={`/blog/${post.blogPostId}`} className="topic-link">{post.topic}</a>
            </div>
            <div className="created-date">{formattedDate}</div>
        </div>
    </div>
  );
}

export default BlogPostPreview;
