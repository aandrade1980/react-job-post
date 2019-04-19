const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');

const Data = require('./data');

const API_PORT = process.env.PORT || 4000;
const app = express();
const router = express.Router();

const dbRoute = 'mongodb://root:Agustina.890@ds042128.mlab.com:42128/jobs-db';

mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(fileUpload());
app.use(express.static('public'));

router.get('/getJobs', (req, res) => {
  Data.find((err, data) => {
    if(err) return res.json({ success: false, error: err });
    return res.json({ success: true, data });
  })
});

router.get('/getJob/:id', (req, res) => {
  const { id } = req.params;
  Data.findOne( {_id: id}, (err, job) => {
    if(err) return res.json({ success: false, error: err });
    return res.json({
        success: true,
        job
      })
  });
});

router.put('/updateJob', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndUpdate(
    id,
    req.body,
    { new: true },
    (err, job) => {
      if(err) return res.json({ success: false, error: err });
      return res.json({
        success: true,
        job
      }) 
    }
  );
})

router.post('/putJob', (req, res) => {
  let data = new Data();

  const imageFile = req.files && req.files.file;

  if(imageFile) {
    imageFile.mv(`${__dirname}/tmp/img/${imageFile.name}`, err => {
      if (err) {
        return res.status(500).send(err);
      }
    });
  
    data.imgUrl = `img/${imageFile.name}`;
  }
  
  (async () => {
    await imagemin(
      [`${__dirname}/tmp/${data.imgUrl}`],
      `${__dirname}/public/img/`,
      { plugins: [imageminPngquant()] }
    );
    
    const { title, description } = req.body;
  
    data.title = title;
    data.description = description;
  
    data.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });

    fs.unlink(`${__dirname}/tmp/${data.imgUrl}`, (err) => {
      if (err) throw err;
    });
  })();
});

router.delete('/deleteJob/:id', (req, res) => {
  Data.findByIdAndRemove(req.params.id, (err, job) => {
    if (err) return res.status(500).send(err);
    // Remove Image
    if (job.imgUrl) {
      fs.unlink(`${__dirname}/public/${job.imgUrl}`, (err) => {
        if (err) throw err;
      });
    }
    
    const response = {
      message: "Job successfully deleted",
      id: job._id
    };
    return res.status(200).send(response);
  })
});

app.use("/api", router);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
