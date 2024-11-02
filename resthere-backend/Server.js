const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/UserRoutes');
const postRoutes = require('./routes/PostRoutes');
const journalRoutes = require('./routes/JournalRoutes');
const resourceRoutes = require('./routes/ResourcesRoutes');
const professionalRoutes = require('./routes/ProfessionalRoutes');
const chatRoutes = require('./routes/ChatRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Use CORS middleware
app.use(cors());
app.use(express.json());

// Serve static files from uploads folder
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error: ', err));

// Use the various routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/resource', resourceRoutes);
app.use('/api/professional', professionalRoutes);
app.use('/api/chat', chatRoutes);

// Serve the frontend files for any route not caught by API routes
app.use(express.static(path.resolve(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
