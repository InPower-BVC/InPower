import React, { useState, useEffect } from 'react';
import { useParams  } from 'react-router-dom';
import '../../css/blog.css';
import BlogMenuBar from './blogMenuBar';

// Component for displaying blog
function BlogViewPost() {
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [post, setPost] = useState(null);
    const [postContent, setPostContent] = useState('');

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
                const selectedPost = data.find(p => p.blogPostId === parseInt(id));
                setPost(selectedPost);
                const selectedCategory = categories.find(cat => cat.blogCategoryId === selectedPost.blogCategoryId);
                setCategory(selectedCategory);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };
        fetchPostData();

        const fetchPostContent = async () => {
            try {
                /*const response = await fetch(`/blog/blogPost_${id}.html`);*/
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
    }, [id, categories]);

    // Render the component only when post and category are available
    if (!post || !category || !postContent) {
        return null;
    }

    // JSX for rendering the component
    return (
        <>
            <BlogMenuBar categories={categories} activeCategoryId={category.blogCategoryId} />
            <div id="blog-post-container" className="blog-post-container" dangerouslySetInnerHTML={{ __html: postContent }}></div>
        </>
    );
    
}

export default BlogViewPost;