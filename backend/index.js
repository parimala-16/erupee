const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

app = express()
app.use(cors());
app.use(express.json())

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'mouni',
    database:'demo'
});

db.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }

    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      name VARCHAR(255),
      email VARCHAR(255),
      password VARCHAR(255),
      balance DECIMAL(10, 2)
    )`;
    connection.query(createTableQuery, (err) => {
        connection.release();
        if (err) {
          console.error('Error creating table:', err);
        } else {
          console.log('Table "users" created successfully (if not exists)');
        }
      });


    console.log('MySQL connected successfully!');
 
  });

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.post('/register', (req, res) => {
    const { name, email, password, balance } = req.body;
    const sql = 'INSERT INTO users (name, email, password, balance) VALUES (?, ?, ?, ?)';
    const values = [name, email, password, balance];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('MySQL error:', err);
        return res.status(500).json({ error: 'Error registering user.' });
      }
      return res.status(200).json({ message: 'User registered successfully!' });
    });
  });
  



app.listen(4000,()=>{
    console.log("listening on port 4000");
})