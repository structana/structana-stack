// Simple Express app
const express = require('express');
const app = express();
const port = 3000;
app.get('/', (_, res) => res.send('Hello from Structana!'));
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
