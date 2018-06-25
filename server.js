'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');
// require and use "multer"...

var bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//var storage = multer.memoryStorage()
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.png')
  }
})

var upload = multer({ storage: storage })
//var upload = multer({ storage: storage })

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));


app.post('/api/fileanalyse', upload.single('upfile'),function(req,res,next){
  
  console.log(req.file)
  if(!req.file){
    res.json({"error":"no file choosen"})
  }
  else{
  res.json({
    "filename":req.file.originalname,
    "mimetype":req.file.mimetype,
    "size":req.file.size/1000 +" kb"
  })
  }
 
 

})














app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
