import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../css/blog.css';
import BlogMenuBar from '../blog/blogMenuBar';
//import bannerImage from '../../img/blog/img_blog_cat_banner.jfif';
import BlogPostPreview from '../blog/blogPostPreview';
import backendBaseURL from './blogConfig';

function BlogCategory() {
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
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
                const selectedCategory = data.find(cat => cat.blogCategoryId === parseInt(id));
                setCategory(selectedCategory);
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
                const postsForCategory = data.filter(post => post.blogCategoryId === parseInt(id));
                setPosts(postsForCategory);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };
        fetchPostData();

        const fetchFeaturedPostData = async() => {
            try {
                const response = await fetch(`${backendBaseURL}/latestfeaturedblogpost/${parseInt(id)}`);
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
    }, [id, categories]);

    // Render the component only when post and category are available
    if (!posts || !category || !featuredPost) {
        return null;
    }

    const renderPostPreviews = () => {
        return posts.map(post => (
            <div key={post.blogPostId} className="blog-post-preview">
                <BlogPostPreview post={post} />
            </div>
        ));
    };
    
  return (
    <div className="blog-main">
        <BlogMenuBar categories={categories} activeCategoryId={parseInt(id)} />
        <div className="banner-container">
        <div><img src={`../../img/blog/${featuredPost.profileImgPath}`/*bannerImage*/} alt="Banner" className="banner-img" /></div>
        <div className="banner-overlay">
            <div className="overlay-content">
            <div className="blog-category">
                <Link to={`/blog/category/${featuredPost.blogCategoryId}`} className="category-link">{category.blogCategoryName}</Link>
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
        <div className="blog-post-list-spacer"></div>
        <div className="category-header-2">{category.blogCategoryName}</div>
        <div className="category-posts">
            {renderPostPreviews()}
        </div>

    </div>
  );
}

export default BlogCategory;