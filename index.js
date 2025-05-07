const express = require('express');
const axios = require('axios');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const EXTERNAL_API_URL = 'https://your-external-app.com/api/transcriptions'; // Replace this
const EXTERNAL_API_HEADERS = {
  Authorization: 'Bearer YOUR_EXTERNAL_API_TOKEN', //  Replace this
  'Content-Type': 'application/json',
};

// Connect to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Ensure table exists
const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS processed_events (
      id TEXT PRIMARY KEY,
      processed_at TIMESTAMP DEFAULT NOW()
    );
  `);
};

app.post('/webhook/transcription', async (req, res) => {
  const webhookEvent = req.body;
  const eventId = webhookEvent.id;

  try {
    const existing = await pool.query('SELECT 1 FROM processed_events WHERE id = $1', [eventId]);
    if (existing.rowCount > 0) {
      console.log(`Duplicate event ${eventId} ignored.`);
      return res.status(200).send('Duplicate');
    }

    await pool.query('INSERT INTO processed_events(id) VALUES ($1)', [eventId]);

    if (webhookEvent.type !== 'call:transcription:completed') {
      return res.status(400).send('Unsupported event');
    }

    const chunks = webhookEvent.data?.chunks || [];
    const transcriptionText = chunks.map(c => `[${c.time}] ${c.name}: ${c.text}`).join('\n');

    const payload = {
      callId: eventId,
      transcription: transcriptionText,
      participants: webhookEvent.data.call?.participants || [],
    };

    await axios.post(EXTERNAL_API_URL, payload, { headers: EXTERNAL_API_HEADERS });

    console.log(`✅ Sent transcription for ${eventId}`);
    res.sendStatus(200);
  } catch (err) {
    console.error(`❌ Error:`, err.message);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await initDb();
  console.log(`🚀 Listening on port ${PORT}`);
});
