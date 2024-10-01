const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Add Routes here


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});