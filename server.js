var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('dist'));

// app.get('*', function(req, res) {
//   res.sendFile(path.resolve(__dirname, 'public/index.html'));
// });

app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
