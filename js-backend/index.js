const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/js/hello', (_req, res) => {
  res.json({ message: 'Hello from JS backend!' });
});

app.listen(port, () => {
  console.log(`JS backend listening on port ${port}`);
});
