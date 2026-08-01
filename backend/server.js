require('dotenv').config();
const express = require('express');
const cors = require('cors');

const booksRouter = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 3000;

// Allow your GitHub Pages frontend to call this API.
// Once deployed, replace '*' with your actual GitHub Pages URL for tighter security, e.g.
// origin: 'https://yourusername.github.io'
app.use(cors());
app.use(express.json());

app.use('/api/books', booksRouter);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Library API is running' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Library API running on port ${PORT}`);
});
