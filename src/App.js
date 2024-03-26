import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './js/landing';
import CommentPageA from './js/commentpage_a';
import CommentPageB from './js/commentpage_b';
import CommentPageC from './js/commentpage_c';
import Blog from './js/blog/blog';
import BlogCategory from './js/blog/blogCategory';
import BlogViewPost from './js/blog/blogViewPost';
import BlogPostInput from './js/BlogPostInput';
import BlogPostDelete from './js/blogPostDelete';
import AdminLogin from './js/admin-login';
import ContentManagement from './js/contentManagement';
import Invite from './js/invite';
import Volunteer from './js/volunteer';
import AboutUs from './js/Aboutus';
import Submitted from './js/Submitted';
import MagazineInformation from './js/MagazineInformation';
import MagazineInformation1 from './js/MagazineInformation1';
import MagazineInformation2 from './js/MagazineInformation2';
import MagazineInformation3 from './js/MagazineInformation3';
import Footer from './js/footer';
import Navbar from './js/navbar';
import ChatBotIcon from './js/chatbot';
import "./App.css"
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/discussion/a" element={<CommentPageA />} />
        <Route path="/discussion/b" element={<CommentPageB />} />
        <Route path="/discussion/c" element={<CommentPageC />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/category/:id" element={<BlogCategory />} />
        <Route path="/blog/viewPost/:id" element={<BlogViewPost />} />
        <Route path="/blog/post" element={<BlogPostInput />} />
        <Route path="/blog/delete" element={<BlogPostDelete />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/contentManagement" element={<ContentManagement />} />
        <Route path="/invite" element={<Invite />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/submitted" element={<Submitted />} />
        <Route path="/MagazineInformation" element={<MagazineInformation />} />
        <Route path="/MagazineInformation1" element={<MagazineInformation1 />} />
        <Route path="/MagazineInformation2" element={<MagazineInformation2 />} />
        <Route path="/MagazineInformation3" element={<MagazineInformation3 />} />
      </Routes>
      <Footer />
      <ChatBotIcon />
    </Router>
  );
}

export default App;
