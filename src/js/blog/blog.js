import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/blog.css';
import BlogMenuBar from './blogMenuBar';
import bannerImage from '../../img/blog/img_blog_banner.jfif';
import BlogPostListByCat from './blogPostListByCat';

// Component for displaying blog
function Blog() {
    // State to store the list of blog categories
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const response = await fetch('/blog/blogCategory.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch category data');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching category data:', error);
            }
        };
        fetchCategoryData();
        
        const fetchPostData = async () => {
            try {
                const response = await fetch('/blog/blogPost.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch post data');
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };
        fetchPostData();
    }, []);

    // JSX for rendering the component
    return (
        <>
          <BlogMenuBar categories={categories} />
          <div className="banner-container">
            <div><img src={bannerImage} alt="Banner" className="banner-img" /></div>
            <div className="featured-label">FEATURED</div>
            <div className="banner-overlay">
                <div className="overlay-content">
                <div className="blog-category">
                    <Link to="/blog/category/1" className="category-link">Lifestyle</Link>
                </div>
                <div className="blog-topic">
                    <h2>How alcohol is affecting your hormones and causing you depression</h2>
                </div>
                <div className="read-now">
                    <Link to="/blog/viewPost/1" className="read-now-link">Read Now</Link>
                </div>
                </div>
            </div>
          </div>
          
          <div className="all-category-posts">
            {categories.map(category => {
                const postsForCategory = posts.filter(post => post.blogCategoryId === category.blogCategoryId);
                if (postsForCategory.length > 0) {
                return (
                    <div key={category.blogCategoryId}>
                    <div className="blog-post-list-spacer"></div>
                    <div className="category-header">
                      <h2>{category.blogCategoryName}</h2>
                      <Link to={`/blog/category/${category.blogCategoryId}`} className="view-more-link">View More</Link>
                    </div>
                    <BlogPostListByCat posts={postsForCategory} />
                    </div>
                );
                }
                return null;
            })}
            <div className="blog-post-list-spacer"></div>
            </div>
        </>
    );
    
}

export default Blog;