import * as express from 'express';
import routes from './routes';
import * as passport from 'passport';

import './middleware/localstrategy';
import './middleware/bearerstrategy';

const path = require('path');
const app = express();
const morgan = require('morgan')


app.use(express.static('public'));
app.use(express.json());
//app.use(morgan('dev'));
//app.use(require('sanitize').middleware);
app.use(passport.initialize());
app.use(routes);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    });
  });
  
const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
