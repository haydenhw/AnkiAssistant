const express = require('express');
const favicon = require('express-favicon');

const app = express();
const path = require('path');

const PORT = process.env.PORT || 3001;
app.use(express.static('dist'));

app.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log(`Listening at http://localhost:/${PORT}`);
});
