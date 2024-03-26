import React, { useState, useEffect } from 'react';
import { useParams  } from 'react-router-dom';
import '../../css/blog.css';
import BlogMenuBar from './blogMenuBar';
import backendBaseURL from './blogConfig';

// Component for displaying blog
function BlogViewPost() {
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [post, setPost] = useState(null);

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
                const response = await fetch(`${backendBaseURL}/blogposts/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post data');
                }
                const data = await response.json();
                //const selectedPost = data.find(p => p.blogPostId === parseInt(id));
                setPost(data);
                const selectedCategory = categories.find(cat => cat.blogCategoryId === post.blogCategoryId);
                setCategory(selectedCategory);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };
        fetchPostData();

        /*
        const fetchPostContent = async () => {
            try {
                //const response = await fetch(`/blog/blogPost_${id}.html`);
                const response = await fetch(`/blog/blogPost_1.html`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post content');
                }
                const htmlContent = await response.text();
                setPostContent(htmlContent);
            } catch (error) {
                console.error('Error fetching post content:', error);
            }
        };
        fetchPostContent();
        */
    }, [id, categories]);

    // Render the component only when post and category are available
    if (!post || !category) {
        return null;
    }

    // JSX for rendering the component
    return (
        <>
            <BlogMenuBar categories={categories} activeCategoryId={category.blogCategoryId} />
            {/* <div id="blog-post-container" className="blog-post-container" dangerouslySetInnerHTML={{ __html: postContent }}></div> */}
            <div id="blog-post-container" className="blog-post-container">
                <h2 className="blog-post-header">{post.topic}</h2>
                <div className="blog-post-spacer"></div>
                <div><img className="blog-post-image" src={`../../img/blog/${post.profileImgPath}`} alt="Post" /></div>
                <div className="blog-post-spacer"></div>
                <p className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.content }}>{/*post.content*/}</p>
            </div>
        </>
    );
    
}

export default BlogViewPost;