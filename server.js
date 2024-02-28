

const Express = require("express");
const { startDatabase, stopDatabase, isConnected } = require('./db');
const Games_List = require('./GameSchema')
require("dotenv").config();

const app = Express();
const cors = require('cors')

app.use(Express.json());
app.use(cors())


// Create operation
app.post("/api/data", async (req, res) => {
    try {
        const newItem = await Games_List.create(req.body); 
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
        console.log(data)

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

app.get("/ping", (req, res) => {
    res.send("pong");
});

app.get("/", (req, res) => {
    res.send(`Welcome and DB is ${isConnected() ? 'connected' : 'disconnected'}`);
});

app.listen(process.env.APP_PORT, async () => {
    try {
        await startDatabase();
        console.log(`Server running on PORT:${process.env.APP_PORT}`);
    } catch (err) {
        console.error('Error starting database:', err.message);
        process.exit(1); 
    }
});
