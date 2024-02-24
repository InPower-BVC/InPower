var express = require("express");
var multer = require("multer"); // For handling file uploads
const cors = require("cors");
var fs = require("fs");
var path = require("path");
const db = require('./db'); // Adjust the path based on your project structure


const bodyParser = require('body-parser');
const app = express();

// Configure Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Middleware to parse JSON body
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


// Testing API
app.get('/persons', async (req, res) => {
    let connection;
    try {
      // Connect to the database
      connection = await db.connect();
  
      // Execute the query
      const result = await db.query`SELECT * FROM Persons`;
  
      // Send the result as JSON response
      res.json(result.recordset);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      // Close the connection pool only if the connection was successfully established
      if (connection) {
        connection.close();
      }
    }
  });


//-----------new post for blog-----------
// Get all blog posts
app.get('/blogposts', async (req, res) => {
  let connection;
  try {
    // Connect to the database
    connection = await db.connect();

    // Execute the query
    const result = await db.query`SELECT * FROM BlogPosts`;

    // Send the result as JSON response
    res.json(result.recordset);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the connection pool only if the connection was successfully established
    if (connection) {
      connection.close();
    }
  }
});


// Add a new blog post
app.post('/blogposts', upload.single('file'), async (req, res) => {
  let connection;
  try {
    const { blogPostId, blogCategoryId, blogCategoryName, topic, content, createdDate } = req.body;

    // Get the binary image data from the buffer
    const binaryImageData = req.file.buffer;

    // Connect to the database
    connection = await db.connect();

    // Execute the query to insert a new blog post with image data
    await db.query`
      INSERT INTO BlogPosts (blogPostId, blogCategoryId, blogCategoryName, topic, content, profileImg, createdDate)
      VALUES (${blogPostId}, ${blogCategoryId}, ${blogCategoryName}, ${topic}, ${content}, ${binaryImageData}, ${createdDate});
    `;

    // Send a success response
    res.status(201).json({ message: 'Blog post added successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Close the connection pool only if the connection was successfully established
    if (connection) {
      connection.close();
    }
  }
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });