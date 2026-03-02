const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Models
const SongSchema = new mongoose.Schema({
  title: String,
  lyrics: String, // Supports Amharic UTF-8
  audioUrl: String,
  youtubeLink: String,
  telegramLink: String,
  category: String
});

const MemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  committee: String, // e.g., "2023-2024"
  photoUrl: String,
  status: { type: String, enum: ['previous', 'current'] }
});

const AdminSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  role: { type: String, enum: ['SUPER_ADMIN', 'PARTNER_ADMIN'] },
  permissions: [String]
});

const Song = mongoose.model('Song', SongSchema);
const Member = mongoose.model('Member', MemberSchema);
const Admin = mongoose.model('Admin', AdminSchema);

// Auth Middleware
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access Denied');
  try {
    req.user = jwt.verify(token, 'secretKey');
    next();
  } catch (ex) { res.status(400).send('Invalid Token'); }
};

// Routes
app.get('/api/songs', async (req, res) => {
  const { q } = req.query; // Search query
  const query = q ? { lyrics: new RegExp(q, 'i') } : {};
  const songs = await Song.find(query);
  res.json(songs);
});

app.post('/api/songs', auth, async (req, res) => {
  const song = new Song(req.body);
  await song.save();
  res.status(201).json(song);
});

app.listen(3000, () => console.log('Server running on port 3000'));