import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./js/navbar.js";
import "./App.css";
import CommentPageA from "./js/commentpage_a.js";
import CommentPageB from "./js/commentpage_b.js";
import CommentPageC from "./js/commentpage_c.js";
import Blog from "./js/blog.js";
import Landing from "./js/landing.js";
import Footer from "./js/footer.js";
import ChatBotIcon from "./js/chatbot.js";
import Invite from "./js/invite.js";
import Volunteer from "./js/volunteer.js";
import AboutUs from "./js/Aboutus.js";
import Submitted from "./js/Submitted.js";
import BlogPostInput from "./js/BlogPostInput.js";
import BlogPostDelete from "./js/blogPostDelete.js";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/discussion/a" element={<CommentPageA />} />
          <Route path="/discussion/b" element={<CommentPageB />} />
          <Route path="/discussion/c" element={<CommentPageC />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/post" element={<BlogPostInput />} />
          <Route path="/blog/delete" element={<BlogPostDelete />} />
          <Route path="/invite" element={<Invite />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/submitted" element={<Submitted />} />
        </Routes>
        <Footer />
        <ChatBotIcon />
      </Router>
    </div>
  );
}

export default App;
