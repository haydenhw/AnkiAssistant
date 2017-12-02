var express = require('express');
var app = express();
var path = require('path');

const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'dist')));

// app.get('*', function(req, res) {
//   res.sendFile(path.resolve(__dirname, 'public/index.html'));
// });

app.listen(PORT, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:/' + PORT);
});
