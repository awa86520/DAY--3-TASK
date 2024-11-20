require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

const app = express();
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully '))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/enrollments', enrollmentRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
