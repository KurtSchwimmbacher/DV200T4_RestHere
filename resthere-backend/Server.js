const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/UserRoutes');
const postRoutes = require('./routes/PostRoutes');
const journalRoutes = require('./routes/JournalRoutes');
const resourceRoutes = require('./routes/ResourcesRoutes');

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
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error: ', err));
  


// use the user routes
app.use('/api/users', userRoutes);

// use the Posts route
app.use('/api/posts', postRoutes);

// use the Journal route
app.use('/api/journal',journalRoutes);

// use the Resource route
app.use('/api/resource',resourceRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});