const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/users');
const ratingRoutes = require('./routes/ratings');

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.use('/users', userRoutes);
app.use('/api/ratings', ratingRoutes);


app.get('/', (req, res) => res.send("API is working"));


app.listen(5000, () => console.log('Server running on port 5000'));
