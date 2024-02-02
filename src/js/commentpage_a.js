import React, { useState } from 'react';
import '../css/commentpage_a.css';

// Component for displaying and managing comments
function CommentPageA() {
        // State to store the list of comments
    const [comments, setComments] = useState([
        // Sample comments are stored in an array of objects having various attributes
        { id: 1, author: 'Om', preview: 'This is a...', fullText: 'This is a rough design of the comments page which will be updated multiple times. It might span multiple lines and have more details.' },
        
        { id: 2, author: 'Khokhar', preview: 'This is also...', fullText: 'This is also a rough design of the comments page which will be updated multiple times. It might have even more details and span multiple paragraphs.' },
        
        { id: 3, author: 'Janhvi', preview: 'Recently, I have...', fullText: 'Recently, I have noticed that there have been significant improvements to the design and layout. It is becoming more user-friendly, which is always a plus. Great job team!' },
        
        { id: 4, author: 'Tiwari', preview: 'Has anyone else...', fullText: 'Has anyone else experienced glitches in the new update? While I love the added features, sometimes it lags on my device. Any solutions?' },
        
        { id: 5, author: 'Razan', preview: 'Loved the new...', fullText: 'Loved the new color scheme introduced in the latest version. It feels fresh and modern. I am looking forward to seeing more updates like this!' },
    ]);
    
    // Helper function to trim and shorten the text
    const trimText = (text, length) => {
        // If the text is shorter than the specified length, return it as-is
        if (text.length <= length) {
            return text;
        }
        // Otherwise, trim the text to the specified length and append '...'
        return text.substr(0, length) + '...';
    };    
    
    // State to manage the visibility of the modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    // State to store the currently selected comment for the modal
    const [selectedComment, setSelectedComment] = useState(null);

    // Function to open the modal and set the selected comment
    const openModal = (comment) => {
        setIsModalOpen(true);
        setSelectedComment(comment);
    }

    // JSX for rendering the component
    return (
        <>
            <div className="heading-section">
                <h1 className="main-heading">Welcome to InPower</h1>
                <h2 className="sub-heading">Let's see what's trending and join the conversation on InPower</h2>
            </div>
            
            <div className="comments-container">
                {comments.map(comment => (
                    <div key={comment.id} className="comment" onClick={() => openModal(comment)}>
                        <strong className="author-name">{comment.author}</strong>
                        <div className="comment-preview">{trimText(comment.fullText, 150)}</div>
                    </div>
                ))}
            </div>
    
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</span>
                        <h2>{selectedComment.author}</h2>
                        <p>{selectedComment.fullText}</p>
                    </div>
                </div>
            )}
        </>
    );
    
}

// Exporting the CommentPageA component for use in other parts of the application
export default CommentPageA;