const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db'); 
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000; 

app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
const roleRoutes = require('./routes/rolepermission');
const userRoutes = require('./routes/users');

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api', roleRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!'); 
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
});
