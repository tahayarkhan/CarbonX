import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import Post from '../models/post.model.js';
import testRoutes from '../routes/test.js';
import userRoutes from '../routes/userRoutes.js';
import friendRoutes from '../routes/friendRoutes.js';
import footprintRoutes from '../routes/footprintRoute.js';

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(morgan('dev'));

// Connect to MongoDB once
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB CONNECTED"))
  .catch(err => console.log("DB CONNECTION ERROR", err));

// Routes
app.get("/", async (req, res) => {
  try {
    const data = await Post.find({});
    res.json(data);
  } catch (error) {
    res.status(408).json({ error });
  }
});

app.post("/uploads", async (req, res) => {
  const { myFile } = req.body;

  if (!myFile) {
    return res.status(400).json({ message: "No image provided" });
  }

  try {
    const base64Data = myFile.replace(/^data:image\/\w+;base64,/, '');
    const filePath = path.join(process.cwd(), 'uploads', `${Date.now()}.jpg`);
    fs.writeFileSync(filePath, base64Data, 'base64');
    res.status(201).json({ msg: "Image uploaded successfully", filePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing the image" });
  }
});

app.use("/api/users", userRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/footprints", footprintRoutes);
app.use("/", testRoutes);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


export default app;
