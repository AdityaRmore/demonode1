//import express from 'express';
//import dotenv from "dotenv";
//import mysql from 'mysql2/promise';
//dotenv.config();
//let connection;
//const app = express();
//
//async function checkDatabaseConnection() {
//  try {
//    // Create the connection using the DATABASE_URL from .env
//    const connection = await mysql.createConnection(process.env.DATABASE_URL);
//    // If the connection is successful, log a message
//    console.log('Connected to PlanetScale database!');
//
//app.listen(3001,(req,res)=> {
//console.log("Connected");
//})
//    connection.end();
//  } catch (error) {
//    console.error('Error connecting to PlanetScale:', error);
//    process.exit(1); // Exit the process if the connection fails
//  }
//}
//app.get('/',(req,res)=>{
//    res.json({msg:'Hello World'})
//})
//app.get('/users', (req, res) => {
//  const query1 = 'SELECT * FROM adityamore';
//  connection.query(query1);
//});
//
//checkDatabaseConnection();







// new chatgpt

import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();
const app = express();

app.get('/', (req, res) => {
  res.json({ msg: 'Hello World' });
});

// Declare the connection variable in a higher scope
let connection;

async function checkDatabaseConnection() {
  try {
    // Create the connection using the database configuration from .env
    connection = await mysql.createConnection(process.env.DATABASE_URL);

    // If the connection is successful, log a message
    console.log('Connected to PlanetScale database!');
  } catch (error) {
    console.error('Error connecting to PlanetScale:', error);
    process.exit(1); // Exit the process if the connection fails
  }
}

app.get('/users', async (req, res) => {
  try {
    const query = 'SELECT * FROM adityamore';
    const [rows] = await connection.query(query);
    res.send(rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Error executing query');
  }
});

const PORT = 3001;

checkDatabaseConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
