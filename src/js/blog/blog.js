import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/blog.css';
import BlogMenuBar from './blogMenuBar';
//import bannerImage from '../../img/blog/img_blog_banner.jfif';
import BlogPostListByCat from './blogPostListByCat';
import backendBaseURL from './blogConfig';

// Component for displaying blog
function Blog() {
    // State to store the list of blog categories
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [featuredPost, setFeaturedPost] = useState(null);

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                // For sample data
                //const response = await fetch('/blog/blogCategory.json');
                const response = await fetch(`${backendBaseURL}/blogcategories`);
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
                // For sample data
                //const response = await fetch('/blog/blogPost.json');
                const response = await fetch(`${backendBaseURL}/blogposts`);
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

        const fetchFeaturedPostData = async() => {
            try {
                const response = await fetch(`${backendBaseURL}/latestfeaturedblogpost`);
                if (!response.ok) {
                    throw new Error('Failed to fetch featured post data');
                }
                const data = await response.json();
                setFeaturedPost(data);
            } catch (error) {
                console.error('Error fetching featured post data:', error);
            }
        }
        fetchFeaturedPostData();
    }, []);

    // Render the component only when post and category are available
    if (!posts || !categories || !featuredPost) {
        return null;
    }

    // JSX for rendering the component
    return (
        <div className="blog-main">
          <BlogMenuBar categories={categories} />
          <div className="banner-container">
            <div><img src={`../../img/blog/${featuredPost.profileImgPath}`/*bannerImage*/} alt="Banner" className="banner-img" /></div>
            <div className="featured-label">FEATURED</div>
            <div className="banner-overlay">
                <div className="overlay-content">
                <div className="blog-category">
                    <Link to={`/blog/category/${featuredPost.blogCategoryId}`} className="category-link">{featuredPost.blogCategoryName}</Link>
                </div>
                <div className="blog-featured-topic">
                    <h2>{featuredPost.topic}</h2>
                </div>
                <div className="read-now">
                    <Link to={`/blog/viewPost/${featuredPost.blogPostId}`} className="read-now-link">Read Now</Link>
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
                      <Link to={`/blog/category/${category.blogCategoryId}`} className="view-more-link">view more</Link>
                    </div>
                    <BlogPostListByCat posts={postsForCategory} />
                    </div>
                );
                }
                return null;
            })}
            <div className="blog-post-list-spacer"></div>
            </div>
        </div>
    );
    
}

export default Blog;