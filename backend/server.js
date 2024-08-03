const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Import routes here
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const footprintRoutes = require('./routes/footprintRoutes');
app.use('/api/footprints', footprintRoutes);
