import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/blog.css';
import BlogMenuBar from './blog/blogMenuBar';
import bannerImage from '../img/blog/img_blog_banner.jfif';
import BlogPostListByCat from './blog/blogPostListByCat';

// Component for displaying blog
function Blog() {
    // State to store the list of blog categories
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const { categoryPath } = useParams(); 

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
                console.error('Error fetching data:', error);
            }
        };
        fetchCategoryData();
        fetchPostData();
        
    }, []);
    const filteredPosts = posts.filter(post => post.blogCategoryPath === categoryPath);
    
    // JSX for rendering the component
    return (
        <>
            <BlogMenuBar categories={categories} />
            <div className="banner-container">
                <div><img src={bannerImage} alt="Banner" className="banner-img" /></div>
                <div className="featured-label">FEATURED</div>
                <div className="banner-overlay">
                    {/*
                        Example of rendering specific content for the category "beauty-wellness"
                    */}
                    {categoryPath === 'beauty-wellness' && (
                        <div className="overlay-content">
                            <div className="blog-category">
                                <Link to="/blog/beauty-wellness" className="category-link">Lifestyle</Link>
                            </div>
                            <div className="blog-topic">
                                <h2>How alcohol is affecting your hormones and causing you depression</h2>
                            </div>
                            <div className="read-now">
                                <Link to="/blog-post" className="read-now-link">Read Now</Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* 
                Render the filtered posts
                <BlogPostListByCat posts={filteredPosts} />
            */}
        </>
    );
}

export default Blog;