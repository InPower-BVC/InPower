var express=require("express");
var express = require("express");
var multer = require("multer"); // For handling file uploads
const cors = require("cors");
var fs = require("fs");
var path = require("path");
const db = require('./db'); // Adjust the path based on your project structure

const app = express();
var upload = multer({ dest: "uploads/" }); // Define upload directory

// Middleware to parse JSON body
app.use(express.json());
app.use(cors());

// Use the 'db' connection pool in your routes or wherever needed
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

  // Handle POST request to add a new blog post
app.post("/api/blog/posts", upload.single("image"), async (req, res) => {
  var { title, content } = req.body;
  var image = req.file; // Uploaded image file

  try {
    // Check if title and content are provided
    if (!title || !content || !image) {
      return res
        .status(400)
        .json({ error: "Title, content, and image are required" });
    }

    // Rename the image file with a unique name
    var imageName = `${Date.now()}-${image.originalname}`;
    var imagePath = path.join(__dirname, "uploads", imageName);

  // Move the uploaded image file to a specific directory
fs.rename(image.path, imagePath, (err) => {
  if (err) {
    console.error("Error moving uploaded image:", err);
    return res.status(500).json({ error: "Error moving uploaded image" });
  }

  // Insert the new blog post into the database
  db.query(`INSERT INTO BlogPosts (title, content, imagePath) VALUES (?, ?, ?)`, [title, content, imageName], (dbErr, result) => {
    if (dbErr) {
      console.error("Error adding blog post to database:", dbErr);
      return res.status(500).json({ error: "Error adding blog post to database" });
    }

    // Return the inserted post data
    res.status(201).json({
      message: "Blog post added successfully",
      post: result.recordset[0],
    });
  });
});


    // Insert the new blog post into the database
    const result = await db.query`INSERT INTO BlogPosts (title, content, imagePath) VALUES (${title}, ${content}, ${imageName})`;

    // Return the inserted post data
    res.status(201).json({
      message: "Blog post added successfully",
      post: result.recordset[0],
    });
  } catch (error) {
    console.error("Error adding blog post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });