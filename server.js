

const Express = require("express");
const { startDatabase, stopDatabase, isConnected } = require('./db');
const Games_List = require('./GameSchema')
require("dotenv").config();

const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const jwt = require("jsonwebtoken")


const mongoose = require('mongoose');

const app = Express();
const cors = require('cors')

app.use(Express.json());
app.use(cors())
app.use(cookieParser());

const usersFilePath = './users.json'

// DataBase CRUD operation endpoints --------------------------------------------------------------------------------------------------------------

// Create operation
const ObjectId = mongoose.Types.ObjectId;

app.post("/api/data", async (req, res) => {
    try {
        const { _id, ...rest } = req.body;
        const newItem = await Games_List.create({ _id: new ObjectId(), ...rest }); 
        res.json(newItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Read operation
app.get("/api/data", async (req, res) => {
    try {
        const data = await Games_List.find(); 
        res.json(data);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update operation
app.put("/api/data/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const newData = await Games_List.findByIdAndUpdate(id, req.body, { new: true }); 
        if (newData) {
            res.json(newData);
        } else {
            res.status(404).json({ message: "Item not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete operation
app.delete("/api/data/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Games_List.findByIdAndDelete(id); 
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//-------------------------------------------------------------------------------------------------------------------------------------------------






// simple end points ---------------------------------------------------------------------------------------------------------------------------------
app.get("/ping", (req, res) => {
    res.send("pong");
});

app.get("/", (req, res) => {
    res.send(`Welcome and DB is ${isConnected() ? 'connected' : 'disconnected'}`);
});


// -----------------------------------------------------------------------------------------------------------------------------------------------------





// Authentication Endpoints -------------------------------------------------------------------------------------------------------------------------

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();
    // Check if username already exists
    if ( users && users.find(user => user.username === username)) {
       res.status(404).json({ message: 'Username already exists' });
       return
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create new user
    const newUser = { username, password: hashedPassword };
    saveUsers(newUser);
  
    // Generate JWT token
    const token = jwt.sign({ username }, process.env.ACCESS_TOKEN);
    res.cookie('token', token)
    res.json({ token });
  });


  
  // Login endpoint
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const users = getUsers()
    // Find user by username
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
  
    // Generate JWT token
    const token = jwt.sign({ username }, process.env.ACCESS_TOKEN);
    res.cookie('token', token)
    res.json({ token });
  })


  
  // Protected route
  app.post('/protected', verifyToken, (req, res) => {
    if (req.user) {
        // If user is authenticated, return user information
        res.json({ authenticated: true, user: req.user });
      } else {
        // If user is not authenticated, return appropriate response
        res.json({ authenticated: false });
      }
  });
  
  // Middleware function to verify JWT token
  function verifyToken(req, res, next) {
    const token = req.body.token
   
    if (!token) {
      next()
      return
    }
  
    jwt.verify(token,  process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
  
      req.user = decoded;
      next();
    });
  }

  // Endpoint to clear the cookie
app.get('/logout', (req, res) => {
    // Clear the 'token' cookie by setting an empty value and an expiry date in the past
    res.clearCookie('token', { httpOnly: true, expires: new Date(0) });
    res.json({ message: 'Logged out successfully' });
});



  function getUsers() {
    try {
      const usersData = fs.readFileSync(usersFilePath, 'utf-8');
      return JSON.parse(usersData);
    } catch (error) {
      console.error('Error reading users data:', error);
      return [];
    }
  }

  // Function to save users to JSON file
  function saveUsers(users) {
    try {
        let existingUsers = [];
        if (fs.existsSync(usersFilePath)) {
            const data = fs.readFileSync(usersFilePath, 'utf8');
            existingUsers = JSON.parse(data);
        }
        existingUsers.push(users);
        fs.writeFileSync(usersFilePath, JSON.stringify(existingUsers, null, 2));
    } catch (error) {
        console.error('Error saving users data:', error);
    }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------





// server starting ---------------------------------------------------------------------------------------------------------------------------------

app.listen(process.env.APP_PORT, async () => {
    try {
        await startDatabase();
        console.log(`Server running on PORT:${process.env.APP_PORT}`);
    } catch (err) {
        console.error('Error starting database:', err.message);
        process.exit(1); 
    }
});
