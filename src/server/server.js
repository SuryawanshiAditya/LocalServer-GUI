const express = require('express');
const app = express();

// fs module to handle server files
const fs = require('fs');

// middleware for handling the files upload
const multer = require('multer');

// function to forward the local port
const forward_port = require("./port-forwarding/script/forward-port");

// exec module to execute the system commands
const {
  exec
} = require('child_process');

// Set up Multer for file server/uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/server/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, "LocalServer-file");
  },
});
const upload = multer({
  storage,
});

// Set CORS headers
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Serve static files
app.use(express.static('src/client/upload'));

// Serve static files
app.use(express.static('src/client/download'));

// Serve the HTML file
app.get('/upload', function (req, res) {
  fs.readFile('src/client/upload/index.html', function (err, data) {
    if (err) {
      res.status(500).send('Error loading download.html');
    } else {
      res.type('html').send(data);
    }
  });
});

// Serve the HTML file
app.get('/download', function (req, res) {
  try {
    //get the server status
    fs.readFile('src/client/download/index.html', function (err, data) {
      if (err) {
        res.status(500).send('Error loading download.html');
      } else {
        res.type('html').send(data);
      }
    });
  } catch (error) {
    console.log(error);
  }

});

// Serve static files
app.use(express.static('src/client/upload'));


// Add a new endpoint for file server/uploads
app.post('/upload-file', upload.single('file'), (req, res) => {
  // req.file is the file that was uploaded
  res.json({
    file: req.file,
  });
});

// list the uploads
app.get('/all-files', function (req, res) {
  fs.readdir('src/server/uploads', function (err, files) {
    if (err) {
      res.status(500).send('Error reading files');
    } else {
      res.json({
        files,
      });
    }
  });
});

// endpoint to download the given file
app.get('/download-file/:filename', function (req, res) {
  const filepath = `src/server/uploads/${req.params.filename}`;
  fs.readFile(filepath, function (err, data) {
    if (err) {
      res.status(404).send('Error downloading file');
    } else {
      res.setHeader('Content-disposition', 'attachment; filename=' + req.params.filename);
      res.setHeader('Content-type', 'application/octet-stream');
      res.send(data);
    }
  });
});

// endpoint to send the forwarded link
app.get("/generate-link", async (req, res) => {

  await forward_port(); // todo - handle await 

  // wait for 5 sec to generate the link
  setTimeout(() => {
    try {

      // get the link from the link.txt file
      const link = fs.readFileSync('src/server/port-forwarding/data/link.txt', 'utf8').toString().split('\n')[0];

      // send the response
      res.send(JSON.stringify({
        status: true,
        message: "successfully generated the link",
        link: link
      }));
    } catch (error) {

      // send error response
      res.send(JSON.stringify({
        status: false,
        message: error,
        link: null
      }));
    }

  }, 5000);
});

// // endpoint to terminate the server (forwarded port)
// app.get("/terminate-server", async (req, res) => {

//   try {
//     // set the server status server-close
//     fs.writeFile('src/server/port-forwarding/data/server-status.txt', "server-close");

//     res.send({
//       status: true,
//       message: "server terminated"
//     })

//   } catch (error) {
//     console.log(error);
//     res.send({
//       status: false,
//       message: error
//     })
//   }

// });


// start listener on port 3000
app.listen(7777, async () => {
  console.log('Server listening on port 7777');
});