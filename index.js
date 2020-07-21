require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

app.listen(PORT, () => {
  console.log('Server running on PORT:' + PORT);
});
