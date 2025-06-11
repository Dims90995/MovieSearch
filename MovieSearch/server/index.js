const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/users');
const ratingRoutes = require('./routes/ratings');
const authRoutes = require('./routes/auth');
const app = express();


app.use(cors({
  origin: '*', 
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/users', userRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/auth', authRoutes); 


app.get('/', (req, res) => res.send("API is working"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
