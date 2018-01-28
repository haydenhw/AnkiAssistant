var express = require('express');
var app = express();
var path = require('path');

const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(PORT, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:/' + PORT);
});
