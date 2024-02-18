var express=require("express");
const db = require('./db'); // Adjust the path based on your project structure

const app = express();

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
    } finally {
      // Close the connection pool only if the connection was successfully established
      if (connection) {
        connection.close();
      }
    }
  });


app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });