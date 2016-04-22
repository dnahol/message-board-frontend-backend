'use strict';
const PORT = process.env.PORT || 3000;

// requires: loading libraries
var express = require('express');
let moment = require('moment');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var uuid = require('uuid');

// var messages = [ {
//     text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus praesentium architecto, dolorum! Quia harum delectus vel neque repellat enim error assumenda rerum maxime voluptatibus, cum voluptatum impedit natus minus non?',
//     name: "Mindi",
//     date: moment().format(),
//     url: 'http://img.thrfun.com/img/114/722/bunny_losing_its_fur_ts1.jpg',
//     id: '92734485-0b55-4016-9f62-5b75656465e7'
//   },
//   {
//     text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus praesentium architecto, dolorum! Quia harum delectus vel neque repellat enim error assumenda rerum maxime voluptatibus, cum voluptatum impedit natus minus non?',
//     name: "Alicia",
//     date: moment().format(),
//     url: 'http://ccspca.com/wp-content/plugins/igit-related-posts-with-thumb-images-after-posts/timthumb.php?src=/wp-content/uploads/2013/06/SASHA-thumb-150x150.jpg&w=100&h=100&zc=0',
//     id: '81aff432-2891-4c16-96ef-944eb806e25d'
//   },
//   {
//     text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus praesentium architecto, dolorum! Quia harum delectus vel neque repellat enim error assumenda rerum maxime voluptatibus, cum voluptatum impedit natus minus non?',
//     name: "Denis",
//     date: moment().format(),
//     url: 'http://i308.photobucket.com/albums/kk354/iluffleshim2much/ferret.gif',
//     id: 'febe90e4-5451-4150-9880-bfba5c23be93'
//   },
//   {
//     text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus praesentium architecto, dolorum! Quia harum delectus vel neque repellat enim error assumenda rerum maxime voluptatibus, cum voluptatum impedit natus minus non?',
//     name: "Kim",
//     date: moment().format(),
//     url: 'http://www.thegreenhead.com/imgs/thumbs/lions-mane-cat-hat-2.jpg',
//     id: 'fa8733b5-3eb7-4e7e-a052-7ddbb06e8cd5'
//   },
//   {
//     text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus praesentium architecto, dolorum! Quia harum delectus vel neque repellat enim error assumenda rerum maxime voluptatibus, cum voluptatum impedit natus minus non?',
//     name: "Damon",
//     date: moment().format(),
//     url: 'http://www.calidris.photography/Birdscapes/2015-0528-WBI/i-NvWfv4w/2/Ti/DSC_3367-Ti.jpg',
//     id: '0a62c0c9-4874-4dcb-897b-9d3ec1f2b15f'
//   },
//   { text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus praesentium architecto, dolorum! Quia harum delectus vel neque repellat enim error assumenda rerum maxime voluptatibus, cum voluptatum impedit natus minus non?',
//     name: "Austin",
//     date: moment().format(),
//     url: 'http://ep.yimg.com/ay/yhst-63436268999074/lazybeans-bean-bag-polar-bear-10-fiesta-1.gif',
//     id: 'a9e21f2e-24d3-41f7-947b-1f0878388451'
//   }
// ]

var Message = require('./models/message');

// app declaration
var app = express();

//general purpose middleware
app.use( morgan('dev') );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use( express.static('public'));

app.set('view engine', 'jade');


// routes
app.route('/messages', authenticateMessage)
  .get((req, res, next) => {
    //get all messages
    Message.findAll((err, messages) => {

      res.status(err ? 400 : 200).send( err || messages );
    });
  })
  .post(authenticateMessage, (req, res, next) => {
    // create a new message
    // req.body =~ { text: 'messagetext', name: 'postername', url: 'avatarimageurl', id: 'universallyuniqueid' }
    Message.create(req.body, err => {

      res.status(err ? 400: 200).send(err || null);

    });
  });

app.route('/messages/:id')
  .get((req, res, next) => {
    //get one message
    //UUID: Universally Unique Identifier
    var id = req.params.id;
    Message.findById(id, (err, message) => {
      if(err || !message) {
        return res.status(400).send(err || 'Message not found, bro.');
      }
      res.send(message);
    });
  })
  .delete((req, res, next) => {
    var id = req.params.id;

    console.log( 'id: ', id );



    //we didn't remove any messages
    if(len === Message.length) {
      return res.status(400).send('Message not found, message.');
    }

    res.send();
  });


app.get('/', (req, res, next) => {
  res.render('index', {text: 'whatver you like'});
});

app.get('/messages', (req, res, next) => {
  res.render('messages', {text: 'whatver you like'});
});

app.get('/post', (req, res, next) => {
  res.render('newPost', {text: 'whatver you like'});
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).send('Not found.');
});


// create server
app.listen(PORT, err => {
  console.log( err || `Server listening on port ${PORT}` );
});

function authenticateMessage(req, res, next) {
  console.log('authenticateMessage');
  if(!req.body.name || !req.body.text) {
    return res.status(400).send( {error: 'Missing required field.'} );

  }
  next();
}
