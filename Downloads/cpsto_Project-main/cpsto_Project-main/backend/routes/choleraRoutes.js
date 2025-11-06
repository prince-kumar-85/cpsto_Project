const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/all', async (req, res) => {
  try {
    console.log("Mongoose readyState:", mongoose.connection.readyState); // 1 = connected
    console.log("Connected DB:", mongoose.connection.db?.databaseName);

    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not ready');

    const collections = await db.listCollections().toArray();
    console.log("Available collections:", collections.map(c => c.name));

    const collection = db.collection('CHOLERA'); // 👈 match exactly
    const data = await collection.find().toArray();
    res.json(data);
  } catch (err) {
    console.error('❌ Direct MongoDB fetch error:', err);
    res.status(500).json({ message: err.message });
  }
});

router.get('/ping', (req, res) => {
  res.send('Cholera route works');
});

module.exports = router;

