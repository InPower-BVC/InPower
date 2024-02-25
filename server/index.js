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

//PUT API for modifying the blog post
app.put('/blogposts/:blogPostId', upload.single('file'), async (req, res) => {
  let connection;
  try {
    const { blogPostId } = req.params;
    const { blogCategoryId, blogCategoryName, topic, content, createdDate } = req.body;

    // Check if an image is being uploaded
    const binaryImageData = req.file ? req.file.buffer : null;

    // Connect to the database
    connection = await db.connect();

    // Build the dynamic part of the query based on the presence of image data
    let query = db.query`UPDATE BlogPosts SET 
                          blogCategoryId = ${blogCategoryId},
                          blogCategoryName = ${blogCategoryName},
                          topic = ${topic},
                          content = ${content},
                          createdDate = ${createdDate}`;

    // Include image data in the query if available
    if (binaryImageData) {
      query = query.append`, profileImg = ${binaryImageData}`;
    }

    // Complete the query
    query = query.append` WHERE blogPostId = ${blogPostId};`;

    // Execute the query to update the blog post
    await query;

    // Send a success response
    res.status(200).json({ message: 'Blog post updated successfully' });
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

//DELETE API for deleting the blog post
//When there is no more blog post, the correspondent category will be deleted together
app.delete('/blogposts/:blogPostId', async (req, res) => {
  let connection;
  try {
    const { blogPostId } = req.params;

    // Connect to the database
    connection = await db.connect();

    // Check if there are any blog posts in the same category
    const categoryCheckResult = await db.query`
      SELECT blogCategoryId
      FROM BlogPosts
      WHERE blogPostId = ${blogPostId};
    `;

    if (!categoryCheckResult.recordset || categoryCheckResult.recordset.length === 0) {
      // No matching blog post found, send an error response
      return res.status(404).json({ error: 'Blog post not found' });
    }

    const blogCategoryId = categoryCheckResult.recordset[0].blogCategoryId;

    // Delete the blog post
    await db.query`DELETE FROM BlogPosts WHERE blogPostId = ${blogPostId};`;

    // Check if there are any remaining blog posts in the same category
    const remainingPostsResult = await db.query`
      SELECT COUNT(*) AS postCount
      FROM BlogPosts
      WHERE blogCategoryId = ${blogCategoryId};
    `;

    if (remainingPostsResult.recordset[0].postCount === 0) {
      // No remaining blog posts in the category, delete the category
      await db.query`DELETE FROM BlogCategories WHERE blogCategoryId = ${blogCategoryId};`;
    }

    // Send a success response
    res.status(200).json({ message: 'Blog post deleted successfully' });
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



//GET API to list the latest 10 blog posts including all categories
app.get('/latestblogposts', async (req, res) => {
  let connection;
  try {
    // Connect to the database
    connection = await db.connect();

    // Execute the query to get the latest 10 blog posts
    const result = await db.query`
      SELECT TOP 10 *
      FROM BlogPosts
      ORDER BY createdDate DESC;
    `;

    // Send the result as a JSON response
    res.json(result.recordset);
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


//GET API to list the latest 10 blog posts for each category (by category id)
app.get('/latestblogposts/:categoryId', async (req, res) => {
  const { categoryId } = req.params;

  let connection;
  try {
    // Connect to the database
    connection = await db.connect();

    // Execute the query to get the latest 10 blog posts for the specified category
    const result = await db.query`
      SELECT TOP 10 *
      FROM BlogPosts
      WHERE blogCategoryId = ${categoryId}
      ORDER BY createdDate DESC;
    `;

    // Send the result as a JSON response
    res.json(result.recordset);
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







// Get all blog categories with at least one blog post
app.get('/blogcategories', async (req, res) => {
  let connection;
  try {
    connection = await db.connect();

    // Use a subquery to filter categories with at least one associated blog post
    const result = await db.query`
      SELECT * FROM BlogCategories
      WHERE blogCategoryId IN (SELECT DISTINCT blogCategoryId FROM BlogPosts);
    `;

    res.json(result.recordset);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (connection) {
      connection.close();
    }
  }
});

// Add a new blog category
app.post('/blogcategories', async (req, res) => {
  let connection;
  try {
    const { blogCategoryId, blogCategoryName, blogCategoryPath } = req.body;

    connection = await db.connect();

    await db.query`
      INSERT INTO BlogCategories (blogCategoryId, blogCategoryName, blogCategoryPath)
      VALUES (${blogCategoryId}, ${blogCategoryName}, ${blogCategoryPath});
    `;

    res.status(201).json({ message: 'Blog category added successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (connection) {
      connection.close();
    }
  }
});

//PUT API for modifying category
app.put('/blogcategories/:id', async (req, res) => {
  let connection;
  try {
    const categoryId = req.params.id;
    const { blogCategoryName, blogCategoryPath } = req.body;

    connection = await db.connect();

    // Update the specified blog category
    await db.query`
      UPDATE BlogCategories
      SET
        blogCategoryName = ${blogCategoryName},
        blogCategoryPath = ${blogCategoryPath}
      WHERE blogCategoryId = ${categoryId};
    `;

    res.status(200).json({ message: 'Blog category updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (connection) {
      connection.close();
    }
  }
});


//DELETE API for deleting blog category
app.delete('/blogcategories/:id', async (req, res) => {
  let connection;
  try {
    const categoryId = req.params.id;

    connection = await db.connect();

    // Delete the specified blog category
    await db.query`
      DELETE FROM BlogCategories
      WHERE blogCategoryId = ${categoryId};
    `;

    res.status(200).json({ message: 'Blog category deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (connection) {
      connection.close();
    }
  }
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });