var express = require('express');
const favicon = require('express-favicon');
var app = express();
var path = require('path');

const PORT = process.env.PORT || 3000;
// app.use(express.static(path.join(__dirname, 'dist')));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static('dist'));

app.listen(PORT, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:/' + PORT);
});
