require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const cors = require('cors');
const router = require('./router');

const app = express();

app.use(morgan('combined')); // logging framework, mostly debugging
app.use(cors()); // let requests through from other ports and subdomains
app.use(bodyParser.json()); // parse incoming  requests to json regardless of type

router(app);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});