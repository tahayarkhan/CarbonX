const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("DB CONNECTED"))
.catch(err => console.log("DB CONNECTION ERROR", err));


app.use(cors({origin:true, credentials:true}));
app.use(morgan("dev"));


// Import routes here
const testRoutes = require("./routes/test");
const userRoutes = require("./routes/userRoutes");
const footprintRoutes = require("./routes/footprintRoute");
app.use("/", testRoutes);
app.use("/api/users", userRoutes);
app.use('/api/footprints', footprintRoutes);


const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>
    console.log(`Server running on port ${PORT}`)
);



