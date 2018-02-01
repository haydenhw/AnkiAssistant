const express = require('express');
const favicon = require('express-favicon');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.static('dist'));

app.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log(`Listening at http://localhost:/${PORT}`);
});
