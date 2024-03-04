import React, {useState, useEffect} from 'react';
import '../../css/blog.css';
import BlogPostPreview from './blogPostPreview';

const BlogPostListByCat = ({ posts }) => {
    const [scrollable, setScrollable] = useState(false);
    const [visiblePosts, setVisiblePosts] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
  
    useEffect(() => {
        // Check if the number of posts is greater than 3
        if (posts.length > 3) {
            setScrollable(true);
            // Set the initial visible posts to the first three posts
            setVisiblePosts(retrieveVisiblePosts());
        } else {
            setVisiblePosts(posts);
        }
    }, [posts, startIndex]);
  
    const scrollLeft = () => {
        //let nextStartIndex = Math.max((startIndex + posts.length - 1) % posts.length, 0);
        let nextStartIndex = (startIndex + posts.length - 1) % posts.length;
        setStartIndex(nextStartIndex);
    };
  
    const scrollRight = () => {
        //let nextStartIndex = Math.max((startIndex + 1) % posts.length, 0);
        let nextStartIndex = (startIndex + 1) % posts.length;
        setStartIndex(nextStartIndex);
    };

    const retrieveVisiblePosts = () => {
        const numPosts = posts.length;
        if (numPosts <= 3) {
            // If there are 3 or fewer posts, display all of them
            return posts;
        } else {
            // If there are more than 3 posts
            if (startIndex <= numPosts - 3) {
                // Display posts from startIndex to startIndex + 2
                return posts.slice(startIndex, startIndex + 3);
            } else {
                // If startIndex exceeds numPosts - 3, wrap around to the beginning
                const wrappedIndex = (startIndex + 3) % numPosts;
                return posts.slice(startIndex, numPosts).concat(posts.slice(0, wrappedIndex));
            }
        }
    }

  return (
    <>
        <div className="blog-post-list-container">
        {scrollable && <button className="scroll-button" onClick={scrollLeft}>{'<'}</button>}
        <div className="scroll-container">
            <div className="blog-post-list">
            {visiblePosts.map(post => (
                <BlogPostPreview key={post.blogPostId} post={post} />
            ))}
            </div>
        </div>
        {scrollable && <button className="scroll-button" onClick={scrollRight}>{'>'}</button>}
        </div>
    </>
  );
}

export default BlogPostListByCat;
