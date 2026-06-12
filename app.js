// app.js (ESM) — fail early if DATABASE_URL missing
import 'dotenv/config';

console.log('Starting server...');

// Import the built server
import('./build/index.js') //
  .then(() => {
    console.log('Built server imported successfully.');
  })
  .catch((err) => {
    console.error('Failed to import built server:', err);
    process.exit(1);
  });
