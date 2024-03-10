import React from 'react';
import { Link } from 'react-router-dom';

function ContentManagement() {
  return (
    <div style={{ width: '40%', margin: '40px auto', backgroundColor: '#fff', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Content Management</h2>
      <form style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '10px', width: '50%' }}>
          <Link to="/blog/post" style={{ display: 'block', textDecoration: 'none', color: 'inherit', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f0f0f0', textAlign: 'center' }}>Create Blog</Link>
        </div>
        <div style={{ width: '50%' }}>
          <Link to="/blog/delete" style={{ display: 'block', textDecoration: 'none', color: 'inherit', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f0f0f0', textAlign: 'center' }}>Delete Blog</Link>
        </div>
      </form>
    </div>
  );
}

export default ContentManagement;
