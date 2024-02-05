import React, { useState, useEffect } from 'react';
import '../css/blog.css';
import BlogMenuBar from './blog/blogMenuBar';
import bannerImage from '../img/blog/img_blog_banner.jfif';
import BlogPostListByCat from './blog/blogPostListByCat';

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
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCategoryData();
        
        const fetchPostData = async () => {
            try {
                const response = await fetch('/blog/blogPost.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
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
                    <a href="/blog-category" className="category-link">Lifestyle</a>
                </div>
                <div className="blog-topic">
                    <h2>How alcohol is affecting your hormones and causing you depression</h2>
                </div>
                <div className="read-now">
                    <a href="/blog-post" className="read-now-link">Read Now</a>
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
                      <a href={`/category/${category.blogCategoryPath}`} className="view-more-link">View More</a>
                    </div>
                    <BlogPostListByCat posts={posts.filter(post => post.blogCategoryId === category.blogCategoryId)} />
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