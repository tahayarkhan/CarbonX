import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import Post from './models/post.model.js';
import testRoutes from './routes/test.js';
import userRoutes from './routes/userRoutes.js';
import friendRoutes from './routes/friendRoutes.js';
import footprintRoutes from './routes/footprintRoute.js';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';

// Configure dotenv-
dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));  // You can adjust the limit as necessary
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));



// Sample GET route
app.get("/", async (req, res) => {
    try {
        const data = await Post.find({});
        res.json(data);
    } catch (error) {
        res.status(408).json({ error });
    }
});

// POST route to upload
app.post("/uploads", async (req, res) => {
    const { myFile } = req.body;  // The base64 string sent from the frontend

    if (!myFile) {
        return res.status(400).json({ message: "No image provided" });
    }

    try {
        // Remove the prefix data:image/jpeg;base64, from the base64 string (if it exists)
        const base64Data = myFile.replace(/^data:image\/jpeg;base64,/, '').replace(/^data:image\/png;base64,/, '');

        // Define a file path to save the image
        const filePath = path.join(__dirname, 'uploads', Date.now() + '.jpg');  // or .png, depending on the image type

        // Write the decoded image to the file system
        fs.writeFile(filePath, base64Data, 'base64', (err) => {
            if (err) {
                return res.status(500).json({ message: "Error saving the image" });
            }
            res.status(201).json({ msg: "Image uploaded successfully", filePath });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error processing the image" });
    }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log("DB CONNECTED"))
    .catch(err => console.log("DB CONNECTION ERROR", err));

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));

// Import routes
app.use("/", testRoutes);
app.use("/api/users", userRoutes);
app.use('/api/footprints', footprintRoutes);
app.use("/api/friends", friendRoutes);




// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
