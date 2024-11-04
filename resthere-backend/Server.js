const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/UserRoutes');
const postRoutes = require('./routes/PostRoutes');
const journalRoutes = require('./routes/JournalRoutes');
const resourceRoutes = require('./routes/ResourcesRoutes');
const professionalRoutes = require('./routes/ProfessionalRoutes');
const chatRoutes = require('./routes/ChatRoutes');
const path = require('path');

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../resthere-frontend/build')));


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Serve static files from uploads folder
app.use('/uploads', express.static('uploads'));

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

app.use('/api/professional',professionalRoutes);

app.use('/api/chat',chatRoutes);




app.get('*', (req, res) => {
    console.log(`Received request for: ${req.url}`);
    res.sendFile(path.join(__dirname, '../resthere-frontend/build', 'index.html'));
  });

// Place the catch-all route after all others
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../resthere-frontend/build', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});