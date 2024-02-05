import React, {useRef, useState, useEffect} from 'react';
import '../../css/blog.css';
import BlogPostPreview from './blogPostPreview';

const BlogPostListByCat = ({ posts }) => {
    const scrollContainerRef = useRef(null);
    const [scrollable, setScrollable] = useState(false);
  
    useEffect(() => {
      if (scrollContainerRef.current) {
        //setScrollable(scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth);
        setScrollable(posts.length > 3);
      }
    }, [posts]);
  
    const scrollLeft = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft -= 200; // Adjust scroll distance as needed
      }
    };
  
    const scrollRight = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += 200; // Adjust scroll distance as needed
      }
    };

  return (
    <>
        <div className="blog-post-list-container">
        {scrollable && <button className="scroll-button" onClick={scrollLeft}>{'<'}</button>}
        <div className="scroll-container" ref={scrollContainerRef}>
            <div className="blog-post-list">
            {posts.map(post => (
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
