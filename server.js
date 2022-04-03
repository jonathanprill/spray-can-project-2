const express = require('express');
const routes = require('./controllers');
const path = require('path');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/uploads', express.static('uploads'));

//Cookies
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.use(session(sess));
//Cookies


// MULTER
const { Post } = require('./models');
const multer = require("multer");
const fs = require("fs");
__basedir = path.resolve(path.dirname(''));
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  },
})

const upload = multer({ storage: fileStorageEngine });

const uploadFiles = async (req, res) => {
  try {
    console.log(req.file, req.body);
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    Post.create({
      description: req.body.description,
      location: req.body.location,
      name: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/uploads/" + req.file.filename
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + "/uploads/" + image.name,
        image.data
      );
      //return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};



app.post('/api/posts', upload.single('file'), (req, res) => {
  uploadFiles(req, res);
  console.log(req.file);
  res.send('Success!');
  // uploadFiles();
})





// MULTER


app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});