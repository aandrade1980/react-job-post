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
const Category = require('./categories');

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
  Data.findOne({ _id: id }, (err, job) => {
    if(err) return res.json({ success: false, error: err });
    return res.json({
        success: true,
        job
      })
  });
});

router.put('/updateJob', (req, res) => {
  const { id } = req.body;
  Data.findOneAndUpdate(
    { _id: id },
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
  const tmpPath = `${__dirname}/public/tmp`;

  (async () => {
    if(imageFile) {
      // If the folder does not exist, create it
      !fs.existsSync(tmpPath) && fs.mkdirSync(tmpPath);
      imageFile.mv(`${tmpPath}/${imageFile.name}`, err => {
        if (err) return res.status(500).send(err)
      });
    
      data.imgUrl = `img/${imageFile.name}`;

      await imagemin(
        [`${tmpPath}/${imageFile.name}`],
        `${__dirname}/public/img/`,
        { plugins: [imageminPngquant()] }
      );

      // Remove img from the tmp folder
      fs.unlink(`${tmpPath}/${imageFile.name}`, err => {
        if (err) throw err;
      });
    }
    
    const { title, description, email, company, category } = req.body;
  
    data.title = title;
    data.description = description;
    data.email = email;
    data.company = company;
    data.category = category;
  
    data.save(error => {
      if (error) return res.json({ success: false, error });
      return res.json({ success: true });
    });
  })();
});

router.delete('/deleteJob/:id', (req, res) => {
  Data.findOneAndDelete({ _id: req.params.id }, (err, job) => {
    if (err) return res.status(500).send(err);
    // Remove Image
    if (job.imgUrl) {
      fs.unlink(`${__dirname}/public/${job.imgUrl}`, (err) => {
        if (err) console.log('Error on deleteing job: ', err);
      });
    }
    
    const response = {
      message: "Job successfully deleted",
      id: job._id
    };
    return res.status(200).send(response);
  })
});

// Categories
router.post('/putCategory', (req, res) => {
  const category = new Category();

  const { label } = req.body;

  category.label = label;

  category.save(error => {
    if (error) {
      return res.json({ success: false, error });
    }
    return res.json({ success: true });
  });

});

router.get('/getCategories', (req, res) => {
  Category.find((error, data) => {
    if(error) return res.json({ success: false, error });
    return res.json({ success: true, data });
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
