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
const multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

/*
app.use('/a',express.static('/b'));
Above line would serve all files/folders inside of the 'b' directory
And make them accessible through http://localhost:3000/a.
*/

app.use('/uploads', express.static('uploads'));

app.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {
// req.file is the `profile-file` file
// req.body will hold the text fields, if there were any
console.log(JSON.stringify(req.file))
var response = '<a href="/">Home</a><br>'
response += "Files uploaded successfully.<br>"
response += `<img src="${req.file.path}" /><br>`
return res.send(response)
})

app.post('/profile-upload-multiple', upload.array('profile-files', 12), function (req, res, next) {
  // req.files is array of `profile-files` files
  // req.body will contain the text fields, if there were any
  var response = '<a href="/">Home</a><br>'
  response += "Files uploaded successfully.<br>"
  for(var i=0;i<req.files.length;i++){
      response += `<img src="${req.files[i].path}" /><br>`
  }
  
  return res.send(response)
})
// MULTER


app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});