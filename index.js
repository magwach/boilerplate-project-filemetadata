var express = require('express');
var cors = require('cors');
const multer = require('multer');
require('dotenv').config()
const bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Start of the challenge
const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { originalname, mimetype, size } = req.file;
  res.json({
    fileName: originalname,
    fileType: mimetype,
    fileSize: size,
  });
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
