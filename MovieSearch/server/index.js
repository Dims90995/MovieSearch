const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// User routes
app.use('/users', userRoutes);

// (Optional) Root test route
app.get('/', (req, res) => res.send("API is working"));

app.listen(5000, () => console.log('Server running on port 5000'));
