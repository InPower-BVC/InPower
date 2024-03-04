import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../css/blog.css';
import BlogMenuBar from '../blog/blogMenuBar';
import bannerImage from '../../img/blog/img_blog_cat_banner.jfif';
import BlogPostPreview from '../blog/blogPostPreview';

function BlogCategory() {
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
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
                const selectedCategory = data.find(cat => cat.blogCategoryId === parseInt(id));
                setCategory(selectedCategory);
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
                const postsForCategory = data.filter(post => post.blogCategoryId === parseInt(id));
                setPosts(postsForCategory);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };
        fetchPostData();
    }, [id, categories]);

    const renderPostPreviews = () => {
        return posts.map(post => (
            <div key={post.blogPostId} className="blog-post-preview">
                <BlogPostPreview post={post} />
            </div>
        ));
    };
    
  return (
    <div>
        <BlogMenuBar categories={categories} activeCategoryId={parseInt(id)} />
        <div className="banner-container">
        <div><img src={bannerImage} alt="Banner" className="banner-img" /></div>
        <div className="banner-overlay">
            <div className="overlay-content">
            <div className="blog-category">
                <Link to="/blog/category/1" className="category-link">Lifestyle</Link>
            </div>
            <div className="blog-topic">
                <h2>How alcohol is affecting your hormones and causing you depression</h2>
            </div>
            <div className="read-now">
                <Link to="/viewPost/1" className="read-now-link">Read Now</Link>
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