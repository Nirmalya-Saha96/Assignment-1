const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors')
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

connectDB();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', require('./routes/api/users'));

 if (process.env.NODE_ENV === 'production') {
   app.use(express.static('client/build'));

  app.get('*', (req, res) => {
     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
 }

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log("Server started on port " +  PORT));
