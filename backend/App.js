const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();


const app = express();





mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("DB CONNECTED"))
.catch(err => console.log("DB CONNECTION ERROR", err));



app.use(cors({origin:true, credentials:true}));
app.use(morgan("dev"));

const testRoutes = require("./routes/test");
app.use("/", testRoutes);


const PORT = process.env.PORT || 8080;



const server = app.listen(PORT, ()=>
    console.log(`Server running on port ${PORT}`)
);




// Import routes here
// const userRoutes = require('./routes/userRoutes.js');
// app.use('/api/users', userRoutes);

// const footprintRoutes = require('./routes/footprintRoute.js');
// app.use('/api/footprints', footprintRoutes);
