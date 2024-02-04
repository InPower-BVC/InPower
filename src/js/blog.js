import React, { useState, useEffect } from 'react';
import '../css/commentpage_c.css';
import '../css/blog.css';
import BlogMenuBar from './blog/blogMenuBar';
import bannerImage from '../img/blog/img_blog_banner.jfif';

// Component for displaying blog
function Blog() {
    // State to store the list of blog categories
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
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

        fetchData();
    }, []);

    
    // JSX for rendering the component
    return (
        <>
          <BlogMenuBar categories={categories} />
            <div className="banner-container">
            <div className="featured-label">FEATURED</div>
            <img src={bannerImage} alt="Banner" className="banner-img" />
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
        </>
    );
    
}

export default Blog;