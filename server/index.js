var express = require("express");
var multer = require("multer"); // For handling file uploads
const path = require('path');
const cors = require("cors");
// var fs = require("fs");
// var path = require("path");
const db = require("./db"); // Adjust the path based on your project structure

const bodyParser = require("body-parser");
const app = express();

const saltRounds = 10; // You can adjust the number of salt rounds as needed

// Middleware to parse JSON body and enable CORS
app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());

// Configure Multer storage
//const storage = multer.memoryStorage();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/img/blog'); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});
const upload = multer({ storage: storage });

// Multer configuration for Blogimage upload
const Blogimagestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads')); // Save files in the "uploads" folder within the server directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  }
});

// Middleware for handling blog image uploads
const uploadBlogImage = multer({ storage: Blogimagestorage }).single('profileImgFile');

// Log the root directory
console.log("__dirname:", __dirname);

// Testing API
app.get("/persons", async (req, res) => {
  let connection;
  try {
    // Connect to the database
    connection = await db.connect();

    // Execute the query
    const result = await db.query`SELECT * FROM Persons`;

    // Send the result as JSON response
    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error);
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
app.get("/blogposts", async (req, res) => {
  let connection;
  try {
    // Connect to the database
    connection = await db.connect();

    // Execute the query
    const result = await db.query`SELECT 
        blogPostId,
        blogCategoryId,
        blogCategoryName,
        topic,
        content,
        createdDate,
        blogCategoryPath,
        profileImgPath
      FROM BlogPosts`;

     // Send the result as JSON response
     res.json(result.recordset);
    
     // Close the connection
     connection.close();
   } catch (error) {
     console.error("Error:", error);
     res.status(500).json({ error: "Internal server error" });
   }
 });

// Get all blog posts by category name
app.get("/blogpostsbycategory", async (req, res) => {
  const { blogCategoryName } = req.query;
  let connection;
  try {
    // Connect to the database
    connection = await db.connect();

    // Execute the query to get the blog posts filtered by category name
    const result = await db.query`
      SELECT * FROM BlogPosts WHERE blogCategoryName = ${blogCategoryName};
    `;

    // Send the result as JSON response
    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the connection pool only if the connection was successfully established
    if (connection) {
      connection.close();
    }
  }
});

// Get blog post by topic
app.get("/blogpostsbytopic", async (req, res) => {
  const { topic } = req.query;
  let connection;
  try {
    // Connect to the database
    connection = await db.connect();

    // Execute the query to get the blog post by topic
    let result = await db.query`
      SELECT *
      FROM BlogPosts
      WHERE topic = ${topic};
    `;
    console.log(result.recordset[0]);
    if (result.recordset[0].profileImg) {
      result.recordset[0].profileImg = `data:image/png;base64,${result.recordset[0].profileImg.toString(
        "base64"
      )}`;
    }

    // Send the result as a JSON response
    res.json(result.recordset[0]); // Assuming there's only one post per topic
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the connection pool only if the connection was successfully established
    if (connection) {
      connection.close();
    }
  }
});

app.post("/blogposts", upload.single("profileImgFile"), async (req, res) => {
  let connection;
  try {
    const { blogCategoryId, blogCategoryName, topic, content, createdDate, isFeatured } = req.body;
    const profileImgFile = req.file; // Get the file object
    //const profileImgFileName = req.body.profileImgFileName; // Get the file name
    const profileImgFileName = profileImgFile.filename;
    //console.log("profileImgFile:", profileImgFile);
    //console.log("profileImgFileName:", profileImgFileName);

    // Validate required fields
    if (!blogCategoryId || !blogCategoryName || !topic || !content || !createdDate || !profileImgFile || !profileImgFileName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    //console.log("Profile image file:", profileImgFile);
    //console.log("profileImgFileName:", profileImgFileName);
    // Construct the path where the image file will be saved
    const imagePath = profileImgFileName ? `${profileImgFileName}` : null;
    console.log("Image path:", imagePath);

    // Connect to the database
    connection = await db.connect();

    // Execute the query to insert a new blog post with image data
    await db.query`
      INSERT INTO BlogPosts (blogCategoryId, blogCategoryName, topic, content, profileImgPath, createdDate, isFeatured)
      VALUES (${blogCategoryId}, ${blogCategoryName}, ${topic}, ${content}, ${imagePath}, ${createdDate}, ${isFeatured});
    `;

    // Send a success response
    res.status(201).json({ message: "Blog post added successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the connection pool only if the connection was successfully established
    if (
      connection &&
      connection._connecting === false &&
      connection._pool &&
      connection._pool._pendingRequests.length === 0
      ) {
      connection.close();
    }
  }
});




//PUT API for modifying the blog post
app.put("/blogposts/:blogPostId", upload.single("file"), async (req, res) => {
  let connection;
  try {
    const { blogPostId } = req.params;
    const { blogCategoryId, blogCategoryName, topic, content, createdDate } =
      req.body;

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
    res.status(200).json({ message: "Blog post updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the connection pool only if the connection was successfully established
    if (connection) {
      connection.close();
    }
  }
});

//DELETE API for deleting the blog post
//When there is no more blog post, the correspondent category will be deleted together
app.delete("/blogposts/:blogPostId", async (req, res) => {
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

    if (
      !categoryCheckResult.recordset ||
      categoryCheckResult.recordset.length === 0
    ) {
      // No matching blog post found, send an error response
      return res.status(404).json({ error: "Blog post not found" });
    }

    const blogCategoryId = categoryCheckResult.recordset[0].blogCategoryId;

    // Delete the blog post
    await db.query`DELETE FROM BlogPosts WHERE blogPostId = ${blogPostId};`;

    // Send a success response
    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the connection pool only if the connection was successfully established
    if (connection) {
      connection.close();
    }
  }
});

//GET API to list the latest 10 blog posts including all categories
app.get("/latestblogposts", async (req, res) => {
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
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the connection pool only if the connection was successfully established
    if (connection) {
      connection.close();
    }
  }
});

//GET API to list the latest 10 blog posts for each category (by category id)
app.get("/latesttenblogposts/:categoryId", async (req, res) => {
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
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the connection pool only if the connection was successfully established
    if (connection) {
      connection.close();
    }
  }
});

// Get all blog categories with at least one blog post
app.get("/blogcategories", async (req, res) => {
  let connection;

  try {
    connection = await db.connect();

    // Use a subquery to filter categories with at least one associated blog post
    const result = await db.query`
      SELECT DISTINCT
        bc.blogCategoryId,
        bc.blogCategoryName,
        bc.blogCategoryPath
      FROM BlogCategories bc
      LEFT JOIN BlogPosts bp ON bc.blogCategoryId = bp.blogCategoryId
      WHERE bp.blogCategoryId IS NOT NULL;
    `;

    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (
      connection &&
      connection._connecting === false &&
      connection._pool &&
      connection._pool._pendingRequests.length === 0
    ) {
      connection.close();
    }
  }
});

//Get the latest “Featured” blog post
app.get("/latestfeaturedblogpost", async (req, res) => {
  let connection;
  try {
    // Connect to the database
    connection = await db.connect();

    // Execute the query to get the latest 1 blog post
    const result = await db.query`
      SELECT TOP 1 *
      FROM BlogPosts
      WHERE isFeatured = 'true'
      ORDER BY createdDate DESC;
    `;

    // Send the result as a JSON response
    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the connection pool only if the connection was successfully established
    if (
      connection &&
      connection._connecting === false &&
      connection._pool &&
      connection._pool._pendingRequests.length === 0
      ) {
      connection.close();
    }
  }
});

//Get the latest “Featured” blog post by category id
app.get("/latestfeaturedblogpost/:categoryId", async (req, res) => {
  const { categoryId } = req.params;

  let connection;
  try {
    // Connect to the database
    connection = await db.connect();

    // Execute the query to get the latest 1 blog post for the specified category
    const result = await db.query`
      SELECT TOP 1 *
      FROM BlogPosts
      WHERE blogCategoryId = ${categoryId}
      AND isFeatured = 'true'
      ORDER BY createdDate DESC;
    `;

    // Send the result as a JSON response
    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the connection pool only if the connection was successfully established
    if (
      connection &&
      connection._connecting === false &&
      connection._pool &&
      connection._pool._pendingRequests.length === 0
      ) {
      connection.close();
    }
  }
});

//Get the full list of blog post by category id (sort in descending order by date)
app.get("/blogcategories/:categoryId/blogposts", async (req, res) => {
  let connection;

  try {
    const categoryId = req.params.categoryId;

    connection = await db.connect();

    const result = await db.query`
      SELECT *
      FROM BlogPosts
      WHERE blogCategoryId = ${categoryId}
      ORDER BY createdDate DESC;
    `;

    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.close();
    }
  }
});

//GET API for 1 particular blog post by post id
app.get("/blogposts/:postId", async (req, res) => {
  let connection;

  try {
    const postId = req.params.postId;

    connection = await db.connect();

    const result = await db.query`
      SELECT 
        blogPostId,
        blogCategoryId,
        blogCategoryName,
        topic,
        content,
        createdDate,
        blogCategoryPath,
        profileImgPath
      FROM BlogPosts
      WHERE blogPostId = ${postId};
    `;

    // Check if a blog post with the given post id exists
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    const blogPost = result.recordset[0];
    res.json(blogPost);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (
      connection &&
      connection._connecting === false &&
      connection._pool &&
      connection._pool._pendingRequests.length === 0
    ) {
      connection.close();
    }
  }
});

// Add a new blog category
app.post("/blogcategories", async (req, res) => {
  let connection;
  try {
    const { blogCategoryId, blogCategoryName, blogCategoryPath } = req.body;

    connection = await db.connect();

    await db.query`
      INSERT INTO BlogCategories (blogCategoryId, blogCategoryName, blogCategoryPath)
      VALUES (${blogCategoryId}, ${blogCategoryName}, ${blogCategoryPath});
    `;

    res.status(201).json({ message: "Blog category added successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.close();
    }
  }
});

//PUT API for modifying category
app.put("/blogcategories/:id", async (req, res) => {
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

    res.status(200).json({ message: "Blog category updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.close();
    }
  }
});

//DELETE API for deleting blog category
app.delete("/blogcategories/:id", async (req, res) => {
  let connection;
  try {
    const categoryId = req.params.id;

    connection = await db.connect();

    // Delete the specified blog category
    await db.query`
      DELETE FROM BlogCategories
      WHERE blogCategoryId = ${categoryId};
    `;

    res.status(200).json({ message: "Blog category deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.close();
    }
  }
});

//GET API to retrieve all blog categories
app.get("/allblogcategories", async (req, res) => {
  let connection;
  try {
    connection = await db.connect();

    const result = await db.query`SELECT * FROM BlogCategories`;

    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.close();
    }
  }
});

//Admin Login API
app.post("/admin/login", async (req, res) => {
  let connection;
  try {
    const { username, password } = req.body;

    console.log("Login attempt for username:", username); // Log the username attempting to log in

    // Connect to the database
    connection = await db.connect();

    // Check if the username exists in the database
    const userResult =
      await db.query`SELECT * FROM AdminCredentials WHERE username = ${username}`;
    //console.log(userResult);
    const user = userResult.recordset[0];

    if (!user) {
      console.log("User not found:", username);
      return res
        .status(401)
        .json({ result: false, message: "Invalid username or password" });
    }

    // Check if the provided password matches the stored hashed password
    // const passwordMatch = await bcrypt.compare(password, user.password);

    if (password !== user.password) {
      console.log("Incorrect password for user:", username);
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // You can include additional checks or data in the response if needed
    console.log("Login successful for user:", username);
    return res.json({ result: true, message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);

    // Return the detailed error message in the response for debugging
    return res.status(500).json({ error: error.message });
  } finally {
    // Close the database connection in the finally block
    if (
      connection &&
      connection._connecting === false &&
      connection._pool &&
      connection._pool._pendingRequests.length === 0
      ) {
      connection.close();
    }
  }
});


//Magazine API
//GET Magazine by Volume 

app.get("/magazine/:volumeNumber", async (req, res) => {
  const { volumeNumber } = req.params;

  let connection;
  try {
    // Connect to the database
    connection = await db.connect();

    // Execute the query to fetch cover page and content pages of the specified volume
    const result = await db.query`
      SELECT 
        mv.volume_number,
        mv.description AS volume_description,
        mv.coverpage_url,
        vi.image_id,
        vi.contentpage_url
      FROM 
        MagazineVolumes mv
      LEFT JOIN 
        VolumeImages vi 
      ON 
        mv.volume_id = vi.volume_id
      WHERE 
        mv.volume_number = ${volumeNumber}
    `;

    // Send the result as JSON response
    res.json(result.recordset);

    // Close the connection
    connection.close();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//POST Magazine by Volume
app.post("/magazine/:volumeNumber", upload.fields([{ name: 'coverpage', maxCount: 1 }, { name: 'contentpages', maxCount: 10 }]), async (req, res) => {
  const { volumeNumber, description } = req.body;

  // Get cover page URL from the uploaded file
  const coverpageUrl = req.files['coverpage'][0].path;

  // Get content page URLs from the uploaded files
  const contentpageUrls = req.files['contentpages'].map(file => file.path);

  let connection;
  try {
    // Connect to the database
    connection = await db.connect();

    // Begin transaction
    await db.beginTransaction();

    // Insert volume details into MagazineVolumes table
    const insertVolumeResult = await db.query`
      INSERT INTO MagazineVolumes (volume_number, description, coverpage_url)
      VALUES (${volumeNumber}, ${description}, ${coverpageUrl})
    `;

    // Get the volume_id of the newly inserted volume
    const volumeId = insertVolumeResult.recordset.insertId;

    // Insert content pages into VolumeImages table
    const insertContentPagesPromises = contentpageUrls.map(async (contentpageUrl) => {
      await db.query`
        INSERT INTO VolumeImages (volume_id, contentpage_url)
        VALUES (${volumeId}, ${contentpageUrl})
      `;
    });

    // Wait for all content page insertion queries to complete
    await Promise.all(insertContentPagesPromises);

    // Commit transaction
    await db.commit();

    // Send success response
    res.status(201).json({ message: "Volume created successfully" });

    // Close the connection
    connection.close();
  } catch (error) {
    // Rollback transaction if an error occurs
    await db.rollback();

    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });

    // Close the connection
    if (connection) {
      connection.close();
    }
  }
});



//DELETE Magazine by Volume Number
app.delete("/magazine/:volumeNumber", async (req, res) => {
  const { volumeNumber } = req.params;

  let connection;
  try {
    // Connect to the database
    connection = await db.connect();

    // Begin transaction
    await db.beginTransaction();

    // Get volume ID of the volume to delete
    const volumeResult = await db.query`
      SELECT volume_id FROM MagazineVolumes WHERE volume_number = ${volumeNumber}
    `;
    const volumeId = volumeResult.recordset[0].volume_id;

    if (!volumeId) {
      // If volume with the specified volume number doesn't exist, send 404 response
      return res.status(404).json({ error: "Volume not found" });
    }

    // Get cover page and content page URLs to delete
    const coverpageResult = await db.query`
      SELECT coverpage_url FROM MagazineVolumes WHERE volume_id = ${volumeId}
    `;
    const coverpageUrl = coverpageResult.recordset[0].coverpage_url;

    const contentpageResult = await db.query`
      SELECT contentpage_url FROM VolumeImages WHERE volume_id = ${volumeId}
    `;
    const contentpageUrls = contentpageResult.recordset.map(row => row.contentpage_url);

    // Delete volume from MagazineVolumes table
    await db.query`DELETE FROM MagazineVolumes WHERE volume_id = ${volumeId}`;

    // Delete cover page and content pages from filesystem
    if (coverpageUrl) {
      // Delete cover page
      // Implement your file deletion logic here (e.g., using fs.unlink)
    }
    if (contentpageUrls.length > 0) {
      // Delete content pages
      // Implement your file deletion logic here (e.g., using fs.unlink for each content page URL)
    }

    // Delete content pages from VolumeImages table
    await db.query`DELETE FROM VolumeImages WHERE volume_id = ${volumeId}`;

    // Commit transaction
    await db.commit();

    // Send success response
    res.status(200).json({ message: "Volume deleted successfully" });

    // Close the connection
    connection.close();
  } catch (error) {
    // Rollback transaction if an error occurs
    await db.rollback();

    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });

    // Close the connection
    if (connection) {
      connection.close();
    }
  }
});



//GET Magazine content by page Number
app.get("/magazine/:volumeNumber/:pageNumber", async (req, res) => {
  const { pageNumber } = req.params;

  let connection;
  try {
    // Connect to the database
    connection = await db.connect();

    // Execute the query to fetch the magazine volume details based on the page number
    const result = await db.query`
      SELECT 
        mv.volume_number,
        mv.description AS volume_description,
        mv.coverpage_url,
        vi.image_id,
        vi.contentpage_url
      FROM 
        MagazineVolumes mv
      LEFT JOIN 
        VolumeImages vi 
      ON 
        mv.volume_id = vi.volume_id
      WHERE 
        vi.image_id = ${pageNumber} OR vi.contentpage_url = ${pageNumber}
    `;

    // Send the result as JSON response
    res.json(result.recordset);

    // Close the connection
    connection.close();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });

    // Close the connection
    if (connection) {
      connection.close();
    }
  }
});



//POST Magazine content by page Number to specific volume
app.post("/magazine/:volumeNumber/:pageNumber", upload.single("page"), async (req, res) => {
  const { volumeNumber } = req.params;
  const { pageType } = req.body; // Assuming you have a field to specify page type (e.g., "cover" or "content")

  // Get the file path of the uploaded page
  const pageUrl = req.file.path;

  let connection;
  try {
    // Connect to the database
    connection = await db.connect();

    // Get the volume_id of the specified volume number
    const volumeResult = await db.query`
      SELECT volume_id
      FROM MagazineVolumes
      WHERE volume_number = ${volumeNumber}
    `;
    const volumeId = volumeResult.recordset[0].volume_id;

    // Insert the new page into the VolumeImages table
    await db.query`
      INSERT INTO VolumeImages (volume_id, ${pageType}_page_url)
      VALUES (${volumeId}, ${pageUrl})
    `;

    // Send success response
    res.status(201).json({ message: "Page added successfully" });

    // Close the connection
    connection.close();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });

    // Close the connection
    if (connection) {
      connection.close();
    }
  }
});



//PUT Magazine content by page Number
app.put("/magazine/:volumeNumber/:pageNumber", upload.single("page"), async (req, res) => {
  const { volumeNumber, pageNumber } = req.params;
  const { pageType } = req.body; // Assuming you have a field to specify page type (e.g., "cover" or "content")

  // Get the file path of the uploaded page
  const pageUrl = req.file.path;

  let connection;
  try {
    // Connect to the database
    connection = await db.connect();

    // Get the volume_id of the specified volume number
    const volumeResult = await db.query`
      SELECT volume_id
      FROM MagazineVolumes
      WHERE volume_number = ${volumeNumber}
    `;
    const volumeId = volumeResult.recordset[0].volume_id;

    // Update the page URL in the VolumeImages table based on the page number and type
    await db.query`
      UPDATE VolumeImages
      SET ${pageType}_page_url = ${pageUrl}
      WHERE volume_id = ${volumeId} AND image_id = ${pageNumber}
    `;

    // Send success response
    res.status(200).json({ message: "Page updated successfully" });

    // Close the connection
    connection.close();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });

    // Close the connection
    if (connection) {
      connection.close();
    }
  }
});



//DELETE Magazine content by page Number
app.delete("/magazine/:volumeNumber/:pageNumber", async (req, res) => {
  const { volumeNumber, pageNumber } = req.params;

  let connection;
  try {
    // Connect to the database
    connection = await db.connect();

    // Get the volume_id of the specified volume number
    const volumeResult = await db.query`
      SELECT volume_id
      FROM MagazineVolumes
      WHERE volume_number = ${volumeNumber}
    `;
    const volumeId = volumeResult.recordset[0].volume_id;

    // Delete the page from the VolumeImages table based on the page number
    await db.query`
      DELETE FROM VolumeImages
      WHERE volume_id = ${volumeId} AND image_id = ${pageNumber}
    `;

    // Send success response
    res.status(200).json({ message: "Page deleted successfully" });

    // Close the connection
    connection.close();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });

    // Close the connection
    if (connection) {
      connection.close();
    }
  }
});




app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
